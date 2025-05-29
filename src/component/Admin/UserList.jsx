import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const res = await axios.get("http://localhost:8080/api/admin/users", {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">👤 รายชื่อผู้ใช้</h2>
      <table className="w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Gmail</th>
            <th className="p-3 text-left">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} className="border-t">
              <td className="p-3">{u.username}</td>
              <td className="p-3">{u.gmail}</td>
              <td className="p-3">{u.is_seller ? "seller" : "buyer"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
