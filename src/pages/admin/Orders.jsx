import React from "react";
import AdminSidebar from "../../component/Admin/Sidebar";

export default function AdminOrders() {
  const orders = [
    { orderId: "ORD001", buyer: "kong001", total: 3500, status: "paid" },
    { orderId: "ORD002", buyer: "test88", total: 500, status: "unpaid" }
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h2 className="text-xl font-bold mb-4">🧾 คำสั่งซื้อทั้งหมด</h2>
        <table className="w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">รหัสออเดอร์</th>
              <th className="p-3 text-left">ผู้ซื้อ</th>
              <th className="p-3 text-left">ยอดรวม</th>
              <th className="p-3 text-left">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{o.orderId}</td>
                <td className="p-3">{o.buyer}</td>
                <td className="p-3">{o.total} ฿</td>
                <td className="p-3">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
