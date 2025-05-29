import React from "react";
import AdminSidebar from "../../component/Admin/Sidebar";

export default function AdminProducts() {
  const products = [
    { name: "BEARBRICK 1000%", price: 3500, status: "available" },
    { name: "Kubrick Darth Vader", price: 500, status: "sold" }
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h2 className="text-xl font-bold mb-4">📦 สินค้าทั้งหมด</h2>
        <table className="w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">ชื่อสินค้า</th>
              <th className="p-3 text-left">ราคา</th>
              <th className="p-3 text-left">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.price} ฿</td>
                <td className="p-3">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
