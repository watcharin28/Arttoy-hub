import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    
    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/Login`, {
                phonenumber, //body json
                password

            }, {
                withCredentials: true  // <-- ต้องมีบรรทัดนี้!
            });
            
            console.log('Login Successful:', response.data);
            // Cookies.set('user_id' , response.data.user_id);//แก้ user_id     
            navigate('/');

        }
        catch (error) {
            console.log('Login Failed:', error);
        }
    }

    return (

        <div className="bg-yellow-200 min-h-screen flex items-center justify-end pr-4 md:pr-12 lg:pr-24">
            <div className="p-12 bg-white rounded-2xl shadow-lg w-96 ">
                <h1 className="text-3xl font-bold text-left mb-6">Log in</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h1 className='text-gray-500'>Phone Number</h1>
                        <input
                            type='text'
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                            className="bg-slate-200 w-full p-3 rounded-lg border focus:outline-none focus:border-violet-400"
                        />
                    </div>
                    <div className="mb-4">
                        <h1 className='text-gray-500'>Password</h1>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-slate-200 w-full p-3 rounded-lg border focus:outline-none focus:border-violet-400"
                        />
                    </div>
                   
                    
                    <button
                        type='submit'
                        className="w-full p-3 bg-violet-400 text-white rounded hover:bg-violet-600 transition"

                    >
                        Login
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Don't have an account? <a href="/Register" className="text-black font-bold underline">Register</a>
                    </p>
                </form>

            </div>
        </div>
    );
}