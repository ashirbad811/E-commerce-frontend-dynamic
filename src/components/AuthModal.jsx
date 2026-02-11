import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onClose();
    navigate("/login");
  };

  const handleSignupClick = () => {
    onClose();
    navigate("/register");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden animate-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
          <button
            onClick={onClose}
            className="float-right text-white text-2xl font-bold hover:text-gray-200 transition"
          >
            ✕
          </button>
          <h2 className="text-3xl font-bold mb-2">Welcome to TeeStore</h2>
          <p className="text-blue-100">
            Join us for the best shopping experience
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          {isLogin ? (
            <div className="space-y-4">
              <p className="text-gray-600 text-center mb-6">
                Sign in to access your account and track your orders
              </p>
              <button
                onClick={handleLoginClick}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
              >
                Go to Login
              </button>
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 font-semibold hover:text-blue-800"
                >
                  Sign up
                </button>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 text-center mb-6">
                Create an account to start shopping and enjoy exclusive offers
              </p>
              <button
                onClick={handleSignupClick}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
              >
                Go to Sign Up
              </button>
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 font-semibold hover:text-blue-800"
                >
                  Log in
                </button>
              </p>
            </div>
          )}

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full mt-6 border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
