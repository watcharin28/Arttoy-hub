import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;



    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // const response = await axios.post(`http://localhost:8080/Login`
                const response = await axios.post(`${API_URL}/Login`, {
                phonenumber, //body json
                password

            }, {
                withCredentials: true  // <-- ต้องมีบรรทัดนี้!
            });
            console.log('API_URL:', API_URL);
            console.log('Login Successful:', response.data);
            // Cookies.set('user_id' , response.data.user_id);//แก้ user_id     
            navigate('/');

        }
        catch (error) {
            console.log('Login Failed:', error);
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white">
  {/* ซ้าย: Logo + รูป (เฉพาะจอ md ขึ้นไป) */}
  <div className="hidden md:flex w-full md:w-1/2 bg-purple-400 relative flex-col my-8 md:my-8 md:ml-8 rounded-lg">
    <div className="ml-8 mt-8">
      <img
        src="/images/logo.png"
        alt="Logo"
        className="w-48"
      />
    </div>
    <div className="flex-1 flex items-center justify-center relative">
      <img
        src="/images/cartoon.png"
        alt="Cartoon"
        className="w-4/5 z-10 m-0"
      />
    </div>
  </div>

  {/* ขวา: ฟอร์ม login */}
  <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 min-h-screen">
    <div className="w-full max-w-md">

      {/* โลโก้เฉพาะมือถือ */}
      <div className="md:hidden mb-2 flex justify-center">
        <img src="/images/logo.png" alt="Logo" className="w-40" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-8 md:text-start text-center text-black">Log in</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-gray-600 mb-2">Phone Number</label>
          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-violet-400 text-white font-semibold rounded-lg hover:bg-violet-600 transition"
        >
          Login
        </button>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-Black font-semibold underline hover:text-violet-600">
            Register
          </a>
        </p>
      </form>
    </div>
  </div>
</div>

    );

}