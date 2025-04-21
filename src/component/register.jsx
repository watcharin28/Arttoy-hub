import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // ตรวจสอบให้แน่ใจว่ารหัสผ่านทั้งสองตรงกัน
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // ส่งข้อมูลไปยัง API
      const response = await axios.post(`http://localhost:8080/Register`, {
        username: username,       // ใช้ตัวแปรที่ถูกต้อง
        email: email,             // ใช้ตัวแปรที่ถูกต้อง
        phonenumber: phonenumber, // ใช้ตัวแปรที่ถูกต้อง
        password: password,       // ใช้ตัวแปรที่ถูกต้อง
        confirmPassword: confirmPassword // ใช้ตัวแปรที่ถูกต้อง
      });

      if (response.data.message === "Register Successful") {
        setSuccess(true);
        setTimeout(() => {
          navigate('/Login');  // เมื่อการลงทะเบียนเสร็จสิ้น, ไปที่หน้า Login
        }, 2000);
      } else {
        setError(response.data.error || 'Register Failed!');
      }
    } catch (error) {
      setError('Register Failed! Please try again.');
    }
  }

  return (
    <div className="bg-violet-400 min-h-screen flex items-center justify-start px-4 md:px-12 lg:px-24">
      <div className="px-16 py-12 bg-white rounded-2xl shadow-lg w-full max-w-lg">
        <div className="flex items-center justify-center">
          <img src="/images/AThub.png" alt="Art Toy Hub" className="w-32 h-20" />
        </div>
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        {success && <p className="text-green-500 text-center mb-4">Registration successful! You can now log in.</p>}
        <form onSubmit={handleSubmit} className="space-y-2 w-full">
          <div>
            <h1 className='text-gray-500'>Username</h1>
            <input
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400"
            />
          </div>
          <div>
            <h1 className='text-gray-500'>Email</h1>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400"
            />
          </div>
          <div>
            <h1 className='text-gray-500'>Phone Number</h1>
            <input
              type='text'
              name='phonenumber'
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400"
            />
          </div>
          <div>
            <h1 className='text-gray-500'>Password</h1>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400"
            />
          </div>
          <div>
            <h1 className='text-gray-500'>Confirm Password</h1>
            <input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400 mb-4"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <button
            type='submit'
            className="w-full p-3 bg-violet-400 text-white rounded hover:bg-violet-600 transition"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <a href="/Login" className="text-black font-bold underline">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
