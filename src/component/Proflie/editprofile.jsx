import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function EditProfile() {
  const [username, setUsername] = useState('');
  const [gmail, setGmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  // const user_id = Cookies.get('user_id');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/Profile`, {
          withCredentials: true, // สำคัญ: ต้องใส่ตัวนี้เพื่อส่ง cookie
          
        });
        setUsername(response.data.username || '');
        setGmail(response.data.gmail || '');
        setPhonenumber(response.data.phonenumber || '');
        setPreviewImage(response.data.profile_image || null);
      } catch (err) {
        console.error(err);
        setError('Unable to load profile data.');
      }
    };

    fetchProfile();
  }, );

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('gmail', gmail);
    formData.append('phonenumber', phonenumber);

    if (imageFile) {
      formData.append('profile_image', imageFile);
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/user/Profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.data.message === 'Update Successful') {
        setSuccess(true);
        setTimeout(() => {
          navigate('/Profile'); // ไปที่หน้า Profile หลังการอัปเดต
        }, 2000);
      } else {
        setError(response.data.error || 'Failed to update profile.');
      }
    } catch (error) {
      console.error(error);
      setError('Error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="text-lg font-bold mb-4 p-4">Edit Profile</h1>
      <div className="flex gap-6 py-8 pl-24">
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">User Name:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400 mb-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number:</label>
            <input
              type="text"
              name="phonenumber"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400 mb-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Gmail:</label>
            <input
              type="gmail"
              name="gmail"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400 mb-2"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-1">Data saved successfully!</p>}

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </form>

        <div className="flex flex-col items-center pr-24">
          <img
            src={previewImage || '/images/user.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-3"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
          >
            Upload
          </button>
          <input
            type="file"
            id="file-input"
            name="profileImage"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

