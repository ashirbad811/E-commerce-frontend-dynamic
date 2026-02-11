import React, { useState } from "react";
import { FiX, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );

      if (response.data.user) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome ${response.data.user.name}`,
          timer: 1500,
        });

        setEmail("");
        setPassword("");
        onClose();
        onLoginSuccess();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/register`,
        {
          name: registerName,
          email,
          password,
          phone: registerPhone,
        },
        { withCredentials: true },
      );

      if (response.data.user) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: `Welcome ${response.data.user.name}`,
          timer: 1500,
        });

        setEmail("");
        setPassword("");
        setRegisterName("");
        setRegisterPhone("");
        setIsRegister(false);
        onClose();
        onLoginSuccess();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Unable to register",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex justify-between items-center rounded-t-lg">
          <h2 className="text-white text-xl font-bold">
            {isRegister ? "Create Account" : "Login to Your Account"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 p-1 rounded transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={isRegister ? handleRegister : handleLogin}>
            {isRegister && (
              <>
                {/* Name Field */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  required
                  minLength={isRegister ? 8 : 1}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {isRegister && (
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isRegister ? "Creating Account..." : "Logging in..."}
                </span>
              ) : isRegister ? (
                "Create Account"
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Toggle Register/Login */}
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setEmail("");
                  setPassword("");
                  setRegisterName("");
                  setRegisterPhone("");
                }}
                className="text-blue-600 font-bold hover:text-blue-800"
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </p>
          </div>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 border-2 border-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
