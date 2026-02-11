import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [formData, setFormData] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    phone: "",
  });

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/addresses`,
        {
          withCredentials: true,
        },
      );
      setAddresses(response.data);
      if (response.data.length > 0) {
        setSelectedAddressId(response.data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    if (
      !formData.address_line1 ||
      !formData.city ||
      !formData.country ||
      !formData.zip_code
    ) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/addresses`,
        formData,
        {
          withCredentials: true,
        },
      );

      Swal.fire("Success", "Address added successfully", "success");
      setFormData({
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        country: "",
        zip_code: "",
        phone: "",
      });
      setShowAddressForm(false);
      fetchAddresses();
      setSelectedAddressId(response.data.addressId);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to add address",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!selectedAddressId) {
      Swal.fire("Error", "Please select or add a delivery address", "error");
      return;
    }

    if (cart.length === 0) {
      Swal.fire("Error", "Your cart is empty", "error");
      return;
    }

    try {
      setLoading(true);

      const orderItems = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        {
          addressId: selectedAddressId,
          items: orderItems,
          totalAmount: parseFloat(getTotalPrice()),
          paymentMethod: "cod",
          notes: "Cash on Delivery",
        },
        { withCredentials: true },
      );

      Swal.fire({
        title: "Order Placed Successfully!",
        text: `Order ID: ${response.data.orderId}\n\nPayment Method: Cash on Delivery\n\nYour order will be delivered soon.`,
        icon: "success",
        confirmButtonText: "Go to Dashboard",
      }).then(() => {
        clearCart();
        navigate("/dashboard");
      });
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to place order",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Address and Payment Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">Delivery Address</h3>

            {addresses.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Select Saved Address:</h4>
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className="flex items-start gap-3 p-3 border rounded cursor-pointer hover:bg-blue-50"
                    >
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{addr.address_line1}</p>
                        {addr.address_line2 && (
                          <p className="text-sm text-gray-600">
                            {addr.address_line2}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          {addr.city}, {addr.state} {addr.zip_code},{" "}
                          {addr.country}
                        </p>
                        {addr.phone && (
                          <p className="text-sm text-gray-600">
                            Phone: {addr.phone}
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
            >
              {showAddressForm ? "✕ Cancel" : "+ Add New Address"}
            </button>

            {showAddressForm && (
              <form
                onSubmit={handleAddAddress}
                className="bg-gray-50 p-4 rounded mb-4 space-y-3"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="address_line1"
                    placeholder="Address Line 1 *"
                    value={formData.address_line1}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="address_line2"
                    placeholder="Address Line 2"
                    value={formData.address_line2}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country *"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="zip_code"
                    placeholder="Zip Code *"
                    value={formData.zip_code}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                  {loading ? "Saving..." : "Save Address"}
                </button>
              </form>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Payment Method</h3>
            <div className="flex items-center gap-3 p-3 border rounded bg-blue-50">
              <input
                type="radio"
                name="payment"
                checked
                disabled
                className="cursor-pointer"
              />
              <div>
                <p className="font-semibold">Cash on Delivery (COD)</p>
                <p className="text-sm text-gray-600">
                  Pay when you receive your order
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>

            <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${getTotalPrice()}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading || !selectedAddressId}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
