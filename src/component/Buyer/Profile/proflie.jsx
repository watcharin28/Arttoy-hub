import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [gmail, setGmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [profileImage, setProfileImage] = useState('/images/AThub.png');
  const [error, setError] = useState(null);
  const API_URL = process.env.VITE_API_URL;
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/Profile`, {
          withCredentials: true, //  ต้องใส่ตัวนี้เพื่อส่ง cookie
          
        });
        setUsername(response.data.username || '');
        setGmail(response.data.gmail || '');
        setPhonenumber(response.data.phonenumber || '');
        setProfileImage(response.data.profile_image || '/images/AThub.png');
      } catch (err) {
        console.error(err);
        setError('Unable to load profile data.');
      }
    };

    fetchProfile();
  }, );

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 p-4">My Profile</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex gap-6 py-8 pl-24">
        <div className="flex-1 space-y-4">
          <p>
            <span className="text-gray-500">Username : </span>
            <span className="font-bold p-2">{username}</span>
          </p>
          <p>
            <span className="text-gray-500">Email : </span>
            <span className="font-bold p-2">{gmail}</span>
          </p>
          <p>
            <span className="text-gray-500">Phone Number :</span>
            <span className="font-bold p-2">{phonenumber}</span>
          </p>
        </div>
        <div className="pr-24">
          <img
            src={profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
