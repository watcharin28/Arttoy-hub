import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfile from './editprofile';
import Profile from './proflie';
import LikeList from './likelist';


export default function NavbarProfile() {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/Profile`, {
          withCredentials: true, // สำคัญ: ต้องใส่ตัวนี้เพื่อส่ง cookie
          
        });
  
        console.log(response.data)
        console.log("Image URL:", response.data.profile_image);
        setUsername(response.data.username || '');
        setProfileImage(response.data.profile_image || '');
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);


  const renderContent = () => {

    switch (activeTab) {
      case 'Editprofile':
        return <EditProfile />
      case 'changePassword':
        return <ChangePassword />;
      case 'purchase':
        return <MyPurchase />;
      case 'addresses':
        return <Addresses />;
      case 'likes':
        return <LikeList />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex  bg-gray-100 px-24 py-12">
      <div className="w-80 h-full bg-white rounded-xl shadow p-6 ">
        <div className="flex items-center text-center mb-6 space-x-4">
          <img
            src={profileImage || '/images/AThub.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-lg mb-4">{username}</h3>
            <button onClick={() => setActiveTab("Editprofile")} className="text-sm text-gray-500 mb-4 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
              Edit Profile</button>
            <button onClick={() => setActiveTab("changePassword")} className="text-sm text-red-500 mb-4 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>
 Change Password</button>
          </div>
        </div>

        <ul className="space-y-3 text-sm">
          <hr className="border-gray-300  w-full" />
          <li onClick={() => setActiveTab("purchase")} className="cursor-pointer hover:text-blue-500 p-2 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
            My Purchase</li>
          <hr className="border-gray-300  w-full" />
          <li onClick={() => setActiveTab("addresses")} className="cursor-pointer hover:text-blue-500 p-2 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
            Addresses</li>
          <hr className="border-gray-300  w-full" />
          <li onClick={() => setActiveTab("likes")} className="cursor-pointer hover:text-blue-500 p-2 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
            My Likes</li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-12 bg-white rounded-xl shadow p-6">
        {renderContent()}
      </div>
    </div>
  );
}




function MyPurchase() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">My Purchase</h2>

    </div>
  );
}

function Addresses() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Addresses</h2>
    </div>
  );
}

function MyLikes() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">My Likes</h2>

    </div>
  );
}

function ChangePassword() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Change Password</h2>
    </div>
  );
}


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import EditProfile from './editprofile';
// import Profile from './proflie';

// export default function NavbarProfile() {
//   const [username, setUsername] = useState('');
//   const [profileImage, setProfileImage] = useState('');
//   const [activeTab, setActiveTab] = useState('profile');

//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const user_id = Cookies.get('user_id'); // ดึง user_id จาก Cookies

//   // เช็คการล็อกอิน
//   useEffect(() => {
//     if (!user_id) {
//       // หากไม่มี user_id ใน cookies ให้รีไดเรกไปที่หน้าเข้าสู่ระบบ
//       navigate('/login');
//     } else {
//       // หากมี user_id, ดึงข้อมูลโปรไฟล์จาก API
//       const fetchProfile = async () => {
//         try {
//           const response = await axios.get(`http://localhost:8080/api/profile`, {
//             headers: {
//               Authorization: `Bearer ${user_id}`, // ส่ง token ถ้ามี
//             }
//           });
//           setUsername(response.data.username || '');
//           setProfileImage(response.data.profileImage || '');
//         } catch (err) {
//           console.error(err);
//           setError('Unable to load profile data.');
//         }
//       };

//       fetchProfile();
//     }
//   }, [user_id, navigate]);

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'Editprofile':
//         return <EditProfile />;
//       case 'changePassword':
//         return <ChangePassword />;
//       case 'purchase':
//         return <MyPurchase />;
//       case 'addresses':
//         return <Addresses />;
//       case 'likes':
//         return <MyLikes />;
//       default:
//         return <Profile />;
//     }
//   };

//   return (
//     <div className="flex bg-gray-100 px-24 py-12">
//       <div className="w-80 h-full bg-white rounded-xl shadow p-6">
//         <div className="flex items-center text-center mb-6 space-x-4">
//           <img
//             src={profileImage || '/images/AThub.png'}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover"
//           />
//           <div className="flex flex-col items-start">
//             <h3 className="font-semibold text-lg mb-4">{username}</h3>
//             <button onClick={() => setActiveTab("Editprofile")} className="text-sm text-gray-500 mb-4 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
//               <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
//             </svg>
//               Edit Profile</button>
//             <button onClick={() => setActiveTab("changePassword")} className="text-sm text-red-500 mb-4 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
//             </svg>
//               Change Password</button>
//           </div>
//         </div>

//         <ul className="space-y-3 text-sm">
//           <hr className="border-gray-300  w-full" />
//           <li onClick={() => setActiveTab("purchase")} className="cursor-pointer hover:text-blue-500 p-2 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
//           </svg>
//             My Purchase</li>
//           <hr className="border-gray-300  w-full" />
//           <li onClick={() => setActiveTab("addresses")} className="cursor-pointer hover:text-blue-500 p-2 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
//           </svg>
//             Addresses</li>
//           <hr className="border-gray-300  w-full" />
//           <li onClick={() => setActiveTab("likes")} className="cursor-pointer hover:text-blue-500 p-2 flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
//           </svg>
//             My Likes</li>

//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 ml-12 bg-white rounded-xl shadow p-6">
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// // แสดงรายการซื้อของผู้ใช้
// function MyPurchase() {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-2"> My Purchase</h2>
//     </div>
//   );
// }

// // แสดงที่อยู่ของผู้ใช้
// function Addresses() {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-2">My Addresses</h2>
//     </div>
//   );
// }

// // แสดงสินค้าที่ผู้ใช้กดถูกใจ
// function MyLikes() {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-2">My Likes</h2>
//       <p>แสดงสินค้าที่คุณกดถูกใจ</p>
//     </div>
//   );
// }

// // ฟังก์ชันเปลี่ยนรหัสผ่าน
// function ChangePassword() {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-2">🔐 Change Password</h2>
//     </div>
//   );
// }
