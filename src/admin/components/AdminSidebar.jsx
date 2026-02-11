import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-6">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-6">Admin Menu</h3>
      </div>

      <nav className="space-y-4">
        <Link
          to="/admin"
          className="block px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="block px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          📦 Products
        </Link>

        <Link
          to="/admin/orders"
          className="block px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          📋 Orders
        </Link>

        <Link
          to="/admin/users"
          className="block px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          👥 Users
        </Link>

        <Link
          to="/admin/analytics"
          className="block px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          📈 Analytics
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
