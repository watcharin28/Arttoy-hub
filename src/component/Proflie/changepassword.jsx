import React, { useState } from 'react';
import axios from 'axios';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match');
      return;
    }

    try {
      const res = await axios.put(
        'http://localhost:8080/api/user/change-password',
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword
        },
        {
          withCredentials: true,
        }
      );

      setMessage(res.data.message || 'Password updated successfully!');
      setTimeout(() => {
        setMessage('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 2000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Failed to update password';
      setMessage(errorMsg);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6">Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-gray-700 mb-2">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:border-violet-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:border-violet-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:border-violet-400"
              required
            />
          </div>

          {message && (
            <p className={`text-center text-sm mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-600 text-white p-3 rounded"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
