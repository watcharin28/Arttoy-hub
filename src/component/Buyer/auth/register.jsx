import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [step, setStep] = useState(1); // Step 1: ฟอร์มกรอกข้อมูล, Step 2: กรอก OTP
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  async function handleSubmitRequestOTP(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register/request-otp`, {
        username: username,
        gmail: email,
        phonenumber: phonenumber,
        password: password,
        confirmPassword: confirmPassword
      });

      if (response.data.message === 'OTP sent to email') {
        setStep(2);
        setSuccess('OTP sent to your email. Please check your inbox.');
      } else {
        setError(response.data.error || 'Request OTP failed');
      }
    } catch (err) {
      setError('Request OTP failed. Please try again.');
    }
  }

  async function handleVerifyOTP(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/register/verify-otp`, {
        gmail: email,
        otp: otp
      });

      if (response.data.message === 'Register successful') {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/Login');
        }, 2000);
      } else {
        setError(response.data.error || 'OTP verification failed');
      }
    } catch (err) {
      setError('OTP verification failed. Please try again.');
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-violet-300 min-h-screen flex items-center justify-center px-4 md:px-12 lg:px-24 ">
        <div className="px-16 py-12 bg-white rounded-2xl shadow-lg w-full max-w-xl">
          <div className="flex items-center justify-center">
            <img src="/images/AThub.png" alt="Art Toy Hub" className="w-32 h-20" />
          </div>
          <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {step === 1 ? (
            <form onSubmit={handleSubmitRequestOTP} className="space-y-2 w-full px-6">
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
              </div>
              <button
                type='submit'
                className="w-full p-3 bg-violet-400 text-white rounded hover:bg-violet-600 transition"
              >
                Send OTP
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account? <a href="/Login" className="text-black font-bold underline">Log in</a>
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4 w-full px-6">
              <div>
                <h1 className='text-gray-500'>Enter OTP from email</h1>
                <input
                  type='text'
                  name='otp'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-slate-200 w-full p-2 rounded-lg border focus:outline-none focus:border-violet-400"
                />
              </div>
              <button
                type='submit'
                className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-700 transition"
              >
                Verify & Register
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="w-1/2 bg-violet-300 relative flex flex-col">
        <div className="flex-1 flex items-center justify-center relative">
          <img
            src="/images/dino.png"
            alt="Cartoon"
            className="w-4/5 z-10 mr-24"
          />
        </div>
      </div>
    </div>
  );
}
