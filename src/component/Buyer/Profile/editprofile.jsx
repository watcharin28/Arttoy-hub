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
  const API_URL = process.env.API_URL;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/Profile`, {
          withCredentials: true, // สำคัญ: ต้องใส่ตัวนี้เพื่อส่ง cookie
          
        });
       // ถ้ายังไม่ได้เลือกไฟล์เอง ค่อยเซ็ตข้อมูลจาก server
      if (!imageFile) {
        setUsername(response.data.username || '');
        setGmail(response.data.gmail || '');
        setPhonenumber(response.data.phonenumber || '');
        setPreviewImage(response.data.profile_image || null);
      }
    } catch (err) {
      console.error(err);
      setError('Unable to load profile data.');
    }
  };

  fetchProfile();
}, [imageFile]); // เพิ่ม dependency เป็น imageFile

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
      const response = await axios.put(`${API_URL}/api/user/Profile`, formData, {
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
    <div className="mx-auto p-8 flex flex-col md:flex-row gap-8">
     

      {/* Form Section */}
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex justify-start">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Gmail</label>
            <input
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-1">Profile updated successfully!</p>}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 mt-4"
          >
            Save
          </button>
        </form>
      </div>
       {/* Image Section */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/3">
        <img
          src={previewImage || '/images/user.png'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover shadow mb-4"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600"
        >
          Upload Image
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
  );
}

