import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-red-700 to-red-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/admin" className="text-2xl font-bold">
          🛠️ Admin Panel
        </Link>

        <div className="flex items-center gap-6">
          <span className="text-sm">Welcome, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
