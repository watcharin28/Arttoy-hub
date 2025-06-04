// import React, { useState } from 'react';
// import axios from 'axios';

// export default function ChangePassword() {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     if (newPassword !== confirmPassword) {
//       setMessage('New password and confirm password do not match');
//       return;
//     }

//     try {
//       const res = await axios.put(
//         'http://localhost:8080/api/user/change-password',
//         {
//           oldPassword: oldPassword,
//           newPassword: newPassword,
//           confirmPassword: confirmPassword
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       setMessage(res.data.message || 'Password updated successfully!');
//       setTimeout(() => {
//         setMessage('');
//         setOldPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       }, 2000);
//     } catch (err) {
//       const errorMsg =
//         err.response?.data?.message || 'Failed to update password';
//       setMessage(errorMsg);
//     }
//   };

//   return (
   
//       <div className="px-12 py-6 max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold mb-4">Change Password</h1>
//         <form onSubmit={handleSubmit} className="px-20">
//           <div className="mb-4">
//             <label htmlFor="oldPassword" className="block text-gray-700 mb-2">Old Password</label>
//             <input
//               type="password"
//               id="oldPassword"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//               className="w-full p-3 border rounded focus:outline-none focus:border-violet-400"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="newPassword" className="block text-gray-700 mb-2">New Password</label>
//             <input
//               type="password"
//               id="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full p-3 border rounded focus:outline-none focus:border-violet-400"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm New Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full p-3 border rounded focus:outline-none focus:border-violet-400"
//               required
//             />
//           </div>

//           {message && (
//             <p className={`text-center text-sm mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
//               {message}
//             </p>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-violet-500 hover:bg-violet-600 text-white p-3 rounded"
//           >
//             Change Password
//           </button>
//         </form>
//       </div>
    
//   );
// }


import React, { useState } from 'react'; 
import axios from 'axios';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'old') setShowOldPassword(prev => !prev);
    if (field === 'new') setShowNewPassword(prev => !prev);
    if (field === 'confirm') setShowConfirmPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setType('');

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match');
      setType('error');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        'http://localhost:8080/api/user/change-password',
        {
          oldPassword,
          newPassword,
          confirmPassword
        },
        { withCredentials: true }
      );

      setMessage(res.data.message || 'Password updated successfully!');
      setType('success');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update password');
      setType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-12 py-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-left">
        Change Password
      </h2>
<div className="flex justify-center items-center w-full px-20">
  <form onSubmit={handleSubmit} className="space-y-5 w-full">
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Old Password</label>
          <div className="relative">
            <input
              type={showOldPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('old')}
              className="absolute right-3 top-3 text-gray-500 hover:text-black"
            >
              {showOldPassword ? (
                // Eye Off Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.047.167-2.052.475-3M6.634 6.634A9.965 9.965 0 0112 5c5.523 0 10 4.477 10 10a9.978 9.978 0 01-1.17 4.671M3 3l18 18" />
                </svg>
              ) : (
                // Eye Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-3 text-gray-500 hover:text-black"
            >
              {showNewPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.047.167-2.052.475-3M6.634 6.634A9.965 9.965 0 0112 5c5.523 0 10 4.477 10 10a9.978 9.978 0 01-1.17 4.671M3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-3 text-gray-500 hover:text-black"
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.047.167-2.052.475-3M6.634 6.634A9.965 9.965 0 0112 5c5.523 0 10 4.477 10 10a9.978 9.978 0 01-1.17 4.671M3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`text-center p-2 rounded-md text-sm font-medium ${
              type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
            }`}
          >
            {message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Updating...' : 'Change Password'}
        </button>
      </form>
    </div>
    </div>
  );
}
