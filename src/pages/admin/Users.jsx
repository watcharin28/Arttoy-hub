import React from "react";
import AdminSidebar from "../../component/Admin/Sidebar";
import UserList from "../../component/Admin/UserList";

export default function AdminUsers() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <UserList />
      </div>
    </div>
  );
}
