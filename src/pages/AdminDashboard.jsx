import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  // Dashboard Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  // Products
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    size: "M",
    color: "",
    stock: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);

  // Users
  const [users, setUsers] = useState([]);

  // Orders
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchStats();
    } else if (activeTab === "products") {
      fetchProducts();
    } else if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/stats/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setStats(response.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/admin/products",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setProducts(response.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUsers(response.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/admin/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setOrders(response.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (
      !productForm.name ||
      !productForm.price ||
      !productForm.stock ||
      !productForm.size
    ) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", productForm.name);
      formData.append("description", productForm.description);
      formData.append("price", productForm.price);
      formData.append("size", productForm.size);
      formData.append("color", productForm.color);
      formData.append("stock", productForm.stock);
      if (productImage) {
        formData.append("image", productImage);
      }

      if (editingProductId) {
        await axios.put(
          `http://localhost:5000/api/admin/products/${editingProductId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        Swal.fire("Success", "Product updated successfully", "success");
        setEditingProductId(null);
      } else {
        await axios.post("http://localhost:5000/api/admin/products", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire("Success", "Product added successfully", "success");
      }

      setProductForm({
        name: "",
        price: "",
        description: "",
        size: "M",
        color: "",
        stock: "",
      });
      setProductImage(null);
      fetchProducts();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to save product",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5000/api/admin/products/${productId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          Swal.fire("Deleted", "Product deleted successfully", "success");
          fetchProducts();
        } catch (err) {
          Swal.fire("Error", "Failed to delete product", "error");
        }
      }
    });
  };

  const handleViewOrder = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/orders/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setSelectedOrder(response.data);
      setOrderItems(response.data.items || []);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch order details", "error");
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      Swal.fire("Success", "Order status updated", "success");
      fetchOrders();
      setSelectedOrder(null);
    } catch (err) {
      Swal.fire("Error", "Failed to update order status", "error");
    }
  };

  const handleChangeUserRole = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      Swal.fire("Success", "User role updated", "success");
      fetchUsers();
    } catch (err) {
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5000/api/admin/users/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          Swal.fire("Deleted", "User deleted successfully", "success");
          fetchUsers();
        } catch (err) {
          Swal.fire("Error", "Failed to delete user", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {["dashboard", "products", "users", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded font-semibold transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-600 text-sm font-semibold">
                Total Users
              </h3>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-600 text-sm font-semibold">
                Total Products
              </h3>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-600 text-sm font-semibold">
                Total Orders
              </h3>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-600 text-sm font-semibold">
                Total Revenue
              </h3>
              <p className="text-3xl font-bold">
                ${parseFloat(stats.totalRevenue).toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add/Edit Product Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                <h3 className="text-lg font-bold mb-4">
                  {editingProductId ? "Edit Product" : "Add New Product"}
                </h3>
                <form onSubmit={handleProductSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    className="w-full border p-2 rounded text-sm"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded text-sm"
                    rows="3"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                    className="w-full border p-2 rounded text-sm"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stock: e.target.value })
                    }
                    className="w-full border p-2 rounded text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Color"
                    value={productForm.color}
                    onChange={(e) =>
                      setProductForm({ ...productForm, color: e.target.value })
                    }
                    className="w-full border p-2 rounded text-sm"
                  />
                  <select
                    value={productForm.size}
                    onChange={(e) =>
                      setProductForm({ ...productForm, size: e.target.value })
                    }
                    className="w-full border p-2 rounded text-sm"
                  >
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">Extra Large</option>
                  </select>
                  <div className="border-2 border-dashed p-3 rounded text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProductImage(e.target.files[0])}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-blue-600 text-sm"
                    >
                      {productImage ? productImage.name : "Upload Image"}
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 text-sm font-semibold"
                  >
                    {loading
                      ? "Saving..."
                      : editingProductId
                        ? "Update"
                        : "Add Product"}
                  </button>
                  {editingProductId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProductId(null);
                        setProductForm({
                          name: "",
                          price: "",
                          description: "",
                          size: "M",
                          color: "",
                          stock: "",
                        });
                      }}
                      className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Products List */}
            <div className="lg:col-span-2">
              {loading ? (
                <p className="text-center text-gray-600">Loading products...</p>
              ) : products.length === 0 ? (
                <p className="text-center text-gray-600">No products yet</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      {product.image_url && (
                        <img
                          src={`http://localhost:5000${product.image_url}`}
                          alt={product.name}
                          className="w-full h-40 object-cover rounded mb-2"
                        />
                      )}
                      <h4 className="font-bold text-sm">{product.name}</h4>
                      <p className="text-gray-600 text-xs mb-2">
                        {product.description?.substring(0, 50)}...
                      </p>
                      <p className="text-sm font-semibold">${product.price}</p>
                      <p className="text-xs text-gray-600">
                        Stock: {product.stock} | Size: {product.size}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => {
                            setProductForm(product);
                            setEditingProductId(product.id);
                          }}
                          className="flex-1 bg-blue-500 text-white py-1 rounded text-xs hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="flex-1 bg-red-500 text-white py-1 rounded text-xs hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <p className="p-4 text-center text-gray-600">Loading users...</p>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{user.name}</td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleChangeUserRole(user.id, e.target.value)
                          }
                          className="border p-1 rounded text-xs"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            {selectedOrder ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="mb-4 text-blue-600 hover:text-blue-800 font-semibold"
                >
                  ← Back to Orders
                </button>
                <h3 className="text-xl font-bold mb-4">
                  Order #{selectedOrder.id}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-600 text-sm">Customer</p>
                    <p className="font-semibold">{selectedOrder.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) =>
                        handleUpdateOrderStatus(
                          selectedOrder.id,
                          e.target.value,
                        )
                      }
                      className="border p-2 rounded font-semibold"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Delivery Address</p>
                    <p className="font-semibold">
                      {selectedOrder.address_line1}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.city}, {selectedOrder.zip_code}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Amount</p>
                    <p className="font-semibold text-lg">
                      ${selectedOrder.total_amount}
                    </p>
                  </div>
                </div>
                <h4 className="font-bold mb-3">Items:</h4>
                <table className="w-full border mb-6">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-sm">Product</th>
                      <th className="px-3 py-2 text-left text-sm">Qty</th>
                      <th className="px-3 py-2 text-left text-sm">Price</th>
                      <th className="px-3 py-2 text-left text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="px-3 py-2 text-sm">{item.name}</td>
                        <td className="px-3 py-2 text-sm">{item.quantity}</td>
                        <td className="px-3 py-2 text-sm">${item.price}</td>
                        <td className="px-3 py-2 text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                  <p className="p-4 text-center text-gray-600">
                    Loading orders...
                  </p>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Order ID
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Customer
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 text-sm font-semibold">
                            #{order.id}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {order.user_name}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            ${order.total_amount}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.status === "confirmed"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : order.status === "cancelled"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <button
                              onClick={() => handleViewOrder(order.id)}
                              className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
