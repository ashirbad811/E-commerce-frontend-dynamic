import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 bg-gray-50 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
