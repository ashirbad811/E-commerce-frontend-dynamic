import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import axios from "axios";
import Swal from "sweetalert2";
import ReviewModal from "../components/ReviewModal";
import OrderTracker from "../components/OrderTracker";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import {
  FaBox,
  FaStar,
  FaUndo,
  FaUser,
  FaSignOutAlt,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaUserEdit,
  FaChartPie,
  FaHome,
  FaClipboardList
} from "react-icons/fa";

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Tabs: 'dashboard', 'orders', 'wishlist', 'cart', 'reviews', 'profile'
  const [activeTab, setActiveTab] = useState("dashboard");
  const [purchasedItems, setPurchasedItems] = useState([]);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: ""
  });

  // Review Logic
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewProduct, setReviewProduct] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchPurchasedItems();
  }, []);

  const fetchPurchasedItems = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/purchased-items`,
        { withCredentials: true }
      );
      setPurchasedItems(response.data);
    } catch (err) {
      console.error("Error fetching items to review", err);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        { withCredentials: true },
      );
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}`,
        { withCredentials: true },
      );
      setSelectedOrder(response.data);
      setOrderItems(response.data.items || []);
    } catch (err) {
      console.error("Error fetching order details:", err);
      Swal.fire("Error", "Failed to fetch order details", "error");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/auth/profile`, profileData, { withCredentials: true });
      Swal.fire("Success", "Profile updated successfully", "success");
      setProfileData({ ...profileData, currentPassword: "", newPassword: "" });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to update profile", "error");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "shipped": return "bg-blue-100 text-blue-800";
      case "confirmed": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Overview", icon: FaChartPie },
    { id: "orders", label: "My Orders", icon: FaBox },
    { id: "wishlist", label: "My Wishlist", icon: FaHeart },
    { id: "cart", label: "My Cart", icon: FaShoppingCart },
    { id: "reviews", label: "My Reviews", icon: FaStar },
    { id: "profile", label: "My Profile", icon: FaUser },
  ];

  // Stats for the "Dashboard" Overview tab
  const stats = [
    { title: "TOTAL ORDERS", value: orders.length, color: "border-l-4 border-blue-500", icon: FaClipboardList, text: "bg-blue-100 text-blue-600" },
    { title: "IN WISHLIST", value: wishlist.length, color: "border-l-4 border-pink-500", icon: FaHeart, text: "bg-pink-100 text-pink-600" },
    { title: "IN CART", value: cart.length, color: "border-l-4 border-green-500", icon: FaShoppingCart, text: "bg-green-100 text-green-600" },
    { title: "DELIVERED", value: orders.filter(o => o.status === 'delivered').length, color: "border-l-4 border-purple-500", icon: FaBox, text: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">

      {/* Sidebar - Dark Theme */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:block transition-all duration-300">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaUser className="text-blue-500" /> User Panel
          </h2>
        </div>

        <nav className="mt-6 px-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-4 font-semibold">User Menu</p>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => { setActiveTab(item.id); setSelectedOrder(null); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === item.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-105"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                >
                  <item.icon className={activeTab === item.id ? "text-white" : "text-slate-400"} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-6 border-t border-slate-800">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <FaSignOutAlt />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Header - Styled Red (Like Admin Panel) */}
        <header className="bg-red-700 text-white shadow-md h-16 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">User Dashboard</h1>
            <span className="bg-red-800 text-xs px-2 py-1 rounded text-red-100 hidden sm:inline-block">Welcome back!</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-sm">{user?.name}</p>
              <p className="text-xs text-red-200">{user?.email}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white text-red-700 flex items-center justify-center font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* Overview / Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className={`bg-white p-6 rounded-lg shadow-sm flex items-center justify-between ${stat.color}`}>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">{stat.title}</p>
                      <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                    </div>
                    <div className={`p-4 rounded-full ${stat.text}`}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity / Quick Orders */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-red-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-red-600 text-sm font-semibold hover:underline">View All</button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No recent orders found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-500 text-sm">
                          <th className="pb-3 font-semibold">Order ID</th>
                          <th className="pb-3 font-semibold">Date</th>
                          <th className="pb-3 font-semibold">Amount</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {orders.slice(0, 5).map(order => (
                          <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
                            <td className="py-4 font-medium text-blue-600">#{order.id}</td>
                            <td className="py-4 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                            <td className="py-4 font-bold text-gray-800">${order.total_amount}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <button
                                onClick={() => { setActiveTab('orders'); handleViewOrderDetails(order.id); }}
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* My Orders Tab */}
          {activeTab === 'orders' && !selectedOrder && (
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-600">
              <h2 className="text-xl font-bold mb-6 text-gray-800">My Orders</h2>
              {/* Uses existing card logic or table */}
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No orders found.</p>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition">
                      <div className="flex gap-4 items-center">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                          <FaBox size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <p className="font-bold text-lg">${order.total_amount}</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <button
                          onClick={() => handleViewOrderDetails(order.id)}
                          className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-black transition"
                        >
                          Track & Details
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Order Details (Detail View) */}
          {selectedOrder && (
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-600">
              <button onClick={() => setSelectedOrder(null)} className="mb-6 text-gray-500 hover:text-blue-600 flex items-center gap-2">← Back to Orders</button>

              <h3 className="text-2xl font-bold mb-6 text-gray-800">Order #{selectedOrder.id} Details</h3>
              <OrderTracker status={selectedOrder.status} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-600 text-sm uppercase mb-2">Shipping Address</h4>
                  <p className="font-semibold text-gray-800">{selectedOrder.name}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.address_line1}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.city}, {selectedOrder.zip_code}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-600 text-sm uppercase mb-2">Payment Info</h4>
                  <p className="text-sm text-gray-600">Method: <span className="font-semibold uppercase">{selectedOrder.payment_method || "COD"}</span></p>
                  <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-semibold">Paid</span> (if delivered)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-600 text-sm uppercase mb-2">Order Summary</h4>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Subtotal</span>
                    <span>${selectedOrder.total_amount}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2 border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>${selectedOrder.total_amount}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-bold text-gray-800 mb-4">Items</h4>
                <div className="space-y-4">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-0 border-gray-100">
                      <div className="flex gap-4 items-center">
                        <img src={item.image_url ? `http://localhost:5000${item.image_url}` : 'https://via.placeholder.com/80'} alt={item.name} className="w-16 h-16 object-cover rounded bg-gray-100" />
                        <div>
                          <p className="font-bold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        {selectedOrder.status === 'delivered' && (
                          <button
                            onClick={() => { setReviewProduct(item); setShowReviewModal(true); }}
                            className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full mt-2 font-semibold hover:bg-yellow-200"
                          >
                            Rate Product
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-pink-500">
              <Wishlist />
            </div>
          )}

          {/* Cart Tab */}
          {activeTab === 'cart' && (
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-500">
              <Cart />
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-gray-800">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Profile Settings</h2>
              <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Display Name</label>
                  <input type="text" value={profileData.name} onChange={e => setProfileData({ ...profileData, name: e.target.value })} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Email Address</label>
                  <input type="email" value={profileData.email} disabled className="w-full border p-3 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">New Password (Optional)</label>
                  <input type="password" placeholder="Leave blank to keep current" value={profileData.newPassword} onChange={e => setProfileData({ ...profileData, newPassword: e.target.value })} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">Current Password (Required for changes)</label>
                  <input type="password" placeholder="Enter strictly to save" value={profileData.currentPassword} onChange={e => setProfileData({ ...profileData, currentPassword: e.target.value })} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Save Changes</button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-yellow-400">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Review Your Purchases</h2>
              <div className="grid grid-cols-1 gap-4">
                {purchasedItems.length === 0 ? <p className="text-gray-500">No items to review.</p> : purchasedItems.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-gray-50">
                    <img src={item.image_url ? `http://localhost:5000${item.image_url}` : 'https://via.placeholder.com/80'} className="w-20 h-20 object-cover rounded bg-white" />
                    <div className="flex-1">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-gray-500">Delivered: {new Date(item.purchase_date).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={() => { setReviewProduct(item); setShowReviewModal(true); }}
                      disabled={item.has_reviewed}
                      className={`px-4 py-2 rounded font-semibold self-center ${item.has_reviewed ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white'}`}
                    >
                      {item.has_reviewed ? "✓ Reviewed" : "Write Review"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </main>

      {/* Review Modal */}
      {reviewProduct && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => {
            setShowReviewModal(false);
            setReviewProduct(null);
          }}
          product={reviewProduct}
          userId={user?.id || user?.userId}
          onReviewSubmitted={() => {
            fetchPurchasedItems();
          }}
        />
      )}
    </div>
  );
};

export default UserDashboard;
