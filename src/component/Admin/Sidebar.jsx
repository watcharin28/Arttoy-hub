import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-white p-4 shadow rounded-r-2xl min-h-screen">
      <h2 className="text-xl font-bold text-center mb-6">Admin Panel</h2>
      <ul className="space-y-3 text-gray-700">
        <li><Link to="/admin/dashboard">📊 Dashboard</Link></li>
        <li><Link to="/admin/users">👤 Users</Link></li>
        <li><Link to="/admin/products">📦 Products</Link></li>
        <li><Link to="/admin/orders">🧾 Orders</Link></li>
        <li><Link to="/admin/reports">🚨 Reports</Link></li>
      </ul>
    </div>
  );
}
