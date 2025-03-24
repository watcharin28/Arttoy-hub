import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Phonenumber, setPhonenumber] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({}); // เก็บ error สำหรับแต่ละ field
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({}); // รีเซ็ต error ก่อนส่ง
    try {
      const response = await axios.post(`http://localhost:8080/register`, {
        username: Username,
        gmail: Email,
        phonenumber: Phonenumber,
        password: Password,
        confirmPassword: ConfirmPassword
      });
      console.log('Register Successful:', response.data);
      // ทำอะไรต่อหลังสมัครสำเร็จ เช่น redirect
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        const { error: message, field, details } = error.response.data;
        setErrors({ [field || 'general']: message || details || 'Something went wrong' });
      } else {
        setErrors({ general: 'Network error, please try again' });
      }
    }
  }

  return (
    <div className="bg-yellow-200 min-h-screen flex items-center justify-end px-8">
      <div className="p-12 bg-white rounded-2xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-left mb-6">Register</h1>
        {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h1 className="text-gray-500">Username</h1>
            <input
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-200 w-full p-3 rounded-lg border focus:outline-none focus:border-violet-400"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <h1 className="text-gray-500">Email</h1>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-200 w-full p-3 rounded-lg border focus:outline-none focus:border-violet-400"
            />
            {errors.gmail && <p className="text-red-500 text-sm">{errors.gmail}</p>}
          </div>
          <div className="mb-4">
            <h1 className="text-gray-500">Phone Number</h1>
            <input
              type="text"
              value={Phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="bg-slate-200 w-full p-3 rounded-lg border focus:outline-none focus:border-violet-400"
            />
            {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber}</p>}
          </div>
          <div className="mb-4">
            <h1 className="text-gray-500">Password</h1>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-200 w-full p-3 rounded-lg border focus:outline-none focus:border-violet-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <h1 className="text-gray-500">Confirm Password</h1>
            <input
              type="password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-slate-200 w-full p-3 rounded-lg border focus:outline-none focus:border-violet-400"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-violet-400 text-white rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}