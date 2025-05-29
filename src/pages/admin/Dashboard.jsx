import React from "react";
import AdminSidebar from "../../component/Admin/Sidebar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">ภาพรวมระบบ</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow text-center">
            <p className="text-lg font-semibold">👥 ผู้ใช้</p>
            <p className="text-3xl font-bold text-purple-700">132</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow text-center">
            <p className="text-lg font-semibold">📦 สินค้า</p>
            <p className="text-3xl font-bold text-purple-700">245</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow text-center">
            <p className="text-lg font-semibold">🧾 คำสั่งซื้อ</p>
            <p className="text-3xl font-bold text-purple-700">58</p>
          </div>
        </div>
      </div>
    </div>
  );
}
