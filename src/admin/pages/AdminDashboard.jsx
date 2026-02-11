import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FiTrendingUp,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiRefreshCw,
  FiCheckCircle,
  FiClock,
  FiTruck,
} from "react-icons/fi";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCategories: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("overview");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [ordersRes, productsRes, categoriesRes, messagesRes] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/admin/orders`,
          { withCredentials: true },
        ),
        axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products`,
          { withCredentials: true },
        ),
        axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/categories`,
          { withCredentials: true },
        ),
        axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact`,
          { withCredentials: true },
        ),
      ]);

      const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
      const products = Array.isArray(productsRes.data) ? productsRes.data : [];
      const categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];
      const msgs = Array.isArray(messagesRes.data) ? messagesRes.data : [];

      setMessages(msgs);

      const totalRevenue = orders
        .filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0);

      const pendingOrders = orders.filter((o) => o.status === "pending").length;
      const shippedOrders = orders.filter((o) => o.status === "shipped").length;
      const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

      setStats({
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        totalProducts: products.length,
        totalCategories: categories.length,
        pendingOrders: pendingOrders,
        shippedOrders: shippedOrders,
        deliveredOrders: deliveredOrders,
      });

      setRecentOrders(orders.slice(0, 8).sort((a, b) => b.id - a.id));
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      // Swal.fire("Error", "Failed to load dashboard data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMessageStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact/${id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      // Optimistic update or refresh
      setMessages(messages.map(msg => msg.id === id ? { ...msg, status: newStatus } : msg));
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Status updated',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      console.error("Error updating message status:", err);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  // ... (StatCard, getStatusColor, getStatusIcon components remain same)
  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-${color}-600`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
            {title}
          </p>
          <p
            className={`text-3xl md:text-4xl font-bold mt-3 text-${color}-600`}
          >
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
        </div>
        <div className={`bg-${color}-100 p-3 rounded-lg`}>
          <Icon className={`text-${color}-600`} size={32} />
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <FiClock size={16} className="inline mr-1" />;
      case "confirmed": return <FiCheckCircle size={16} className="inline mr-1" />;
      case "shipped": return <FiTruck size={16} className="inline mr-1" />;
      case "delivered": return <FiCheckCircle size={16} className="inline mr-1" />;
      default: return null;
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's your store overview.
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <FiRefreshCw size={18} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Tabs for Navigation */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 font-medium ${activeTab === 'messages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Contact Messages ({messages.filter(m => m.status === 'new').length})
          </button>
        </div>

        {activeTab === 'overview' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Orders" value={stats.totalOrders} icon={FiShoppingBag} color="blue" subtitle={`Revenue: ₹${stats.totalRevenue.toLocaleString()}`} />
              <StatCard title="Total Products" value={stats.totalProducts} icon={FiTrendingUp} color="green" subtitle={`Categories: ${stats.totalCategories}`} />
              <StatCard title="Total Revenue" value={`₹${(stats.totalRevenue / 1000).toFixed(1)}K`} icon={FiDollarSign} color="emerald" subtitle="From all orders" />
              <StatCard title="Delivered Orders" value={stats.deliveredOrders} icon={FiCheckCircle} color="green" subtitle={`Pending: ${stats.pendingOrders}`} />
            </div>

            {/* Order Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Pending Orders</p>
                    <p className="text-3xl font-bold mt-2 text-yellow-600">{stats.pendingOrders}</p>
                  </div>
                  <FiClock className="text-yellow-600" size={40} />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">In Transit</p>
                    <p className="text-3xl font-bold mt-2 text-purple-600">{stats.shippedOrders}</p>
                  </div>
                  <FiTruck className="text-purple-600" size={40} />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Delivered</p>
                    <p className="text-3xl font-bold mt-2 text-green-600">{stats.deliveredOrders}</p>
                  </div>
                  <FiCheckCircle className="text-green-600" size={40} />
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Order ID</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Date</th>
                      <th className="px-6 py-3 text-center text-sm font-bold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.length === 0 ? (
                      <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No orders yet</td></tr>
                    ) : (
                      recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 font-bold text-blue-600">#{order.id}</td>
                          <td className="px-6 py-4 font-semibold text-gray-900">₹{order.total_amount?.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString("en-IN")}</td>
                          <td className="px-6 py-4 text-center"><a href={`/admin/orders`} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">View</a></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Contact Messages</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Message</th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {messages.length === 0 ? (
                    <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No messages yet</td></tr>
                  ) : (
                    messages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{new Date(msg.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric", hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{msg.name}</td>
                        <td className="px-6 py-4 text-gray-600">{msg.email}</td>
                        <td className="px-6 py-4 text-gray-800 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold 
                                ${msg.status === 'new' ? 'bg-blue-100 text-blue-800' : ''}
                                ${msg.status === 'read' ? 'bg-gray-100 text-gray-800' : ''}
                                ${msg.status === 'replied' ? 'bg-green-100 text-green-800' : ''}
                            `}>
                            {msg.status?.toUpperCase() || 'NEW'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <select
                            value={msg.status || 'new'}
                            onChange={(e) => handleUpdateMessageStatus(msg.id, e.target.value)}
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

