import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiMail,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orderItems, setOrderItems] = useState([]);
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    shipped: 0,
    delivered: 0,
  });

  useEffect(() => {
    fetchOrders();
    fetchMessages();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
        withCredentials: true
      });
      const fetchedOrders = response.data;
      setOrders(fetchedOrders);

      // Calculate stats
      const stats = {
        total: fetchedOrders.length,
        pending: fetchedOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length,
        shipped: fetchedOrders.filter(o => o.status === 'shipped').length,
        delivered: fetchedOrders.filter(o => o.status === 'delivered').length,
      };
      setOrderStats(stats);

    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact/user`,
        { withCredentials: true }
      );
      setMessages(response.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleViewOrderDetails = async (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}`, {
          withCredentials: true
        });
        // The API might return { ...order, items: [...] } or just items. 
        // Based on previous code, let's assume we need to set items.
        // If the API returns the full order with items, we can use that too.
        // Let's check typical pattern. Assuming /api/orders/:id returns order details + items.
        if (response.data.items) {
          setOrderItems(response.data.items);
        } else {
          // Fallback or if API structure is different
          setOrderItems([]);
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
      }
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "confirmed": return "text-yellow-600 bg-yellow-100 border-yellow-200"; // Treat confirmed as pending/processing
      case "shipped": return "text-blue-600 bg-blue-100 border-blue-200";
      case "delivered": return "text-green-600 bg-green-100 border-green-200";
      case "cancelled": return "text-red-600 bg-red-100 border-red-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <FiPackage className="text-yellow-600" />;
      case "confirmed": return <FiPackage className="text-yellow-600" />;
      case "shipped": return <FiTruck className="text-blue-600" />;
      case "delivered": return <FiCheckCircle className="text-green-600" />;
      case "cancelled": return <FiXCircle className="text-red-600" />;
      default: return <FiPackage className="text-gray-600" />;
    }
  };

  // RENDER logic
  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-blue-600">My Account</h2>
            <p className="text-sm text-gray-500 mt-1">Welcome, {user?.name}</p>
          </div>

          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-1 px-4">
              <li>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${activeTab === 'orders'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <FiPackage size={20} />
                  <span>My Orders</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${activeTab === 'messages'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <div className="relative">
                    <FiMail size={20} />
                    {/* Optional: Add badge for new messages if applicable */}
                  </div>
                  <span>My Messages</span>
                  <span className="ml-auto bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs font-semibold">
                    {messages.length}
                  </span>
                </button>
              </li>
              {/* Placeholder for future links */}
              <li>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200">
                  <FiUser size={20} />
                  <span>Profile Settings</span>
                </button>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              // Add logout logic here if available or keep as placeholder
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <FiLogOut size={20} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay (Simple implementation) */}
        {/* For a fully responsive sidebar, we'd need a hamburger menu and state for 'sidebarOpen' */}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <header className="flex justify-between items-center mb-8 md:hidden">
            <h1 className="text-xl font-bold text-gray-800">My Dashboard</h1>
            {/* Mobile Menu Button would go here */}
          </header>

          <div className="max-w-5xl mx-auto">
            {activeTab === 'orders' && (
              <>
                <header className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                  <p className="text-gray-500 mt-2">View and track your order history</p>
                </header>

                {selectedOrder ? (
                  // Order Details View
                  <div className="animate-fade-in-up">
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
                    >
                      ← Back to Orders list
                    </button>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50">
                        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">Order #{selectedOrder.id}</h2>
                            <p className="text-gray-500 text-sm mt-1">
                              Placed on {new Date(selectedOrder.created_at).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          </div>
                          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(selectedOrder.status)}`}>
                            {selectedOrder.status.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 md:p-8">
                        {/* Order Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Delivery Address</h3>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-gray-600 text-sm leading-relaxed">
                              <p className="font-medium text-gray-900 mb-1">{user?.name}</p>
                              <p>{selectedOrder.address_line1}</p>
                              {selectedOrder.address_line2 && <p>{selectedOrder.address_line2}</p>}
                              <p>{selectedOrder.city}, {selectedOrder.state} {selectedOrder.zip_code}</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Payment Info</h3>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-gray-600 text-sm">
                              <div className="flex justify-between mb-2">
                                <span>Payment Method:</span>
                                <span className="font-medium text-gray-900">Cash on Delivery</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Payment Status:</span>
                                <span className="font-medium text-yellow-600">Pending</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Items Table */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                              <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4 text-center">Qty</th>
                                <th className="px-6 py-4 text-right">Price</th>
                                <th className="px-6 py-4 text-right">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {orderItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50">
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                      <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                                        {item.image_url ? (
                                          <img src={`${import.meta.env.VITE_API_BASE_URL}${item.image_url}`} alt={item.name} className="h-full w-full object-cover" />
                                        ) : (
                                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                                            <FiPackage />
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                        <p className="text-gray-500 text-xs">Size: {item.size || 'N/A'}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-center text-gray-600">{item.quantity}</td>
                                  <td className="px-6 py-4 text-right text-gray-600">₹{item.price}</td>
                                  <td className="px-6 py-4 text-right font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex justify-end">
                          <div className="w-full md:w-1/3 bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="flex justify-between items-center mb-2 text-gray-600">
                              <span>Subtotal</span>
                              <span>₹{selectedOrder.total_amount}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4 text-gray-600">
                              <span>Shipping</span>
                              <span>Free</span>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-lg font-bold text-gray-900">
                              <span>Total</span>
                              <span className="text-blue-600">₹{selectedOrder.total_amount}</span>
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                ) : (
                  // Orders List View
                  <div className="space-y-6">
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Orders</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">{orderStats.total}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-yellow-600 text-xs font-semibold uppercase tracking-wider">Processing</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">{orderStats.pending}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-blue-600 text-xs font-semibold uppercase tracking-wider">Shipped</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">{orderStats.shipped}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-green-600 text-xs font-semibold uppercase tracking-wider">Delivered</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">{orderStats.delivered}</div>
                      </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className="relative flex-1">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by Order ID..."
                          className="w-full pl-10 pr-4 py-2 bg-gray-50 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-shadow"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-700"
                      >
                        <option value="all">All Statuses</option>
                        <option value="confirmed">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Orders List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      {orders.length === 0 ? (
                        <div className="text-center py-16">
                          <div className="bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                            <FiPackage size={32} />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">No orders yet</h3>
                          <p className="text-gray-500 mt-1">Start shopping to create your first order.</p>
                          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Browse Products</button>
                        </div>
                      ) : filteredOrders.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          No orders found matching your filters.
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                              <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-center">Items</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                  <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                                  <td className="px-6 py-4 text-gray-500 text-sm">
                                    {new Date(order.created_at).toLocaleDateString()}
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                      {orders.find(o => o.id === order.id)?.items_count || orderItems.filter(i => i.order_id === order.id).length || '-'}
                                      {/* Note: Logic for items count might need adjustment if not available in basic order object */}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 font-medium text-gray-900">₹{order.total_amount}</td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                      {getStatusIcon(order.status)}
                                      <span className={`text-sm font-medium ${order.status === 'delivered' ? 'text-green-600' :
                                        order.status === 'shipped' ? 'text-blue-600' :
                                          order.status === 'cancelled' ? 'text-red-600' :
                                            'text-yellow-600'
                                        }`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <button
                                      onClick={() => handleViewOrderDetails(order.id)}
                                      className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
                                    >
                                      View Details
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
              </>
            )}

            {activeTab === 'messages' && (
              <>
                <header className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">My Messages</h1>
                  <p className="text-gray-500 mt-2">History of your inquiries sent to our team.</p>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Message</th>
                          <th className="px-6 py-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {messages.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                              <FiMail className="mx-auto h-8 w-8 text-gray-300 mb-3" />
                              <p>You haven't sent any messages yet.</p>
                            </td>
                          </tr>
                        ) : (
                          messages.map((msg) => (
                            <tr key={msg.id} className="hover:bg-gray-50/50">
                              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                {new Date(msg.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                                <br />
                                <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </td>
                              <td className="px-6 py-4 text-gray-900 text-sm max-w-lg">
                                {msg.message}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                    ${msg.status === 'replied' ? 'bg-green-100 text-green-800' :
                                    msg.status === 'read' ? 'bg-blue-100 text-blue-800' :
                                      'bg-yellow-100 text-yellow-800'}`}>
                                  {msg.status || 'New'}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Placeholder for Profile or other tabs */}
            {/* {activeTab === 'profile' && <ProfileComponent />} */}

          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
