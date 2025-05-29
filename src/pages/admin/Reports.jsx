import React from "react";
import AdminSidebar from "../../component/Admin/Sidebar";

export default function AdminReports() {
  const reports = [
    { from: "user01", issue: "สินค้าไม่ตรงปก", status: "รอตรวจสอบ" },
    { from: "buyer88", issue: "ไม่ได้รับของ", status: "กำลังตรวจสอบ" }
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h2 className="text-xl font-bold mb-4">🚨 รายงาน/ร้องเรียน</h2>
        <table className="w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">ผู้ร้องเรียน</th>
              <th className="p-3 text-left">รายละเอียด</th>
              <th className="p-3 text-left">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{r.from}</td>
                <td className="p-3">{r.issue}</td>
                <td className="p-3">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
