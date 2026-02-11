import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wider hover:text-gray-300 transition"
        >
          TeeStore
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 flex-wrap">
          <Link to="/shop" className="hover:text-blue-400 transition">
            Shop
          </Link>

          <Link
            to="/cart"
            className="hover:text-blue-400 transition flex items-center gap-2"
          >
            <span>🛒 Cart</span>
            {getTotalItems() > 0 && (
              <span className="bg-red-500 text-xs font-bold rounded-full px-2 py-0.5">
                {getTotalItems()}
              </span>
            )}
          </Link>

          {/* Conditional Rendering based on Auth State */}
          {user ? (
            <>
              {/* Show Admin Dashboard if user is admin, otherwise User Dashboard */}
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="hover:text-blue-400 transition"
              >
                {user.role === "admin" ? "Admin" : "Dashboard"}
              </Link>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400 hidden md:block">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
