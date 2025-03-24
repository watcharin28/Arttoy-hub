import React, { useState } from 'react';
import axios from 'axios';


export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmPassword: ''
    });


    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${process.env.BASE_URL}/Register`, {
                username,
                Email,
                phonenumber,
                password
            });
            if (response.data.success) {
                setSuccess(true);
                console.log('Register Successful:', response.data);
            }
            else {
                setError(response.data.message || 'Register Failed:');
            }
        }
        catch (error) {
            setError('Register Failed! Please try again.');
        }

    }
    return (
        <div className="bg-yellow-200 min-h-screen flex items-center justify-end px-8">
            <div className="p-12 bg-white rounded-2xl shadow-lg w-96 ">
                <h2 className="text-3xl font-bold text-left mb-6">Create an Account</h2>
                {success && <p className="text-green-500 text-center mb-4">Registration successful! You can now log in.</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <h1 className='text-gray-400'>Username</h1>
                        <input
                            type='text'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <h1 className='text-gray-400'>Email</h1>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <h1 className='text-gray-400'>Phone Number</h1>
                        <input
                            type='text'
                            name='phonenumber'
                            value={formData.phonenumber}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <h1 className='text-gray-400'>Password</h1>
                        <input
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full"
                        /></div>
                    <div>
                        <h1 className='text-gray-400'>Confirm Password</h1>
                        <input
                            type='password'
                            password='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full"
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <button type="submit" className="w-full mt-4">Sign Up</button>
                </form>

            </div>
        </div>
    );
}

