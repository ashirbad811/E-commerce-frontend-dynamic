import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Swal from "sweetalert2";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } =
    useContext(CartContext);

  const handleRemove = (productId) => {
    Swal.fire({
      title: "Remove Item?",
      text: "Are you sure you want to remove this item from cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId);
        Swal.fire("Removed!", "Item removed from cart.", "success");
      }
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <Link
          to="/shop"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Shopping Cart ({cart.length} items)
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-center">Price</th>
                  <th className="px-4 py-3 text-center">Quantity</th>
                  <th className="px-4 py-3 text-center">Total</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {item.image_url && (
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${item.image_url}`}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-sm md:text-base">
                            {item.name}
                          </p>
                          {item.color && (
                            <p className="text-xs text-gray-600">
                              Color: {item.color}
                            </p>
                          )}
                          {item.size && (
                            <p className="text-xs text-gray-600">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">₹{item.price}</td>
                    <td className="px-4 py-4 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className="w-16 border rounded text-center p-1"
                      />
                    </td>
                    <td className="px-4 py-4 text-center font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6 border-b pb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>₹0</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total:</span>
            <span>₹{getTotalPrice()}</span>
          </div>
          <Link
            to="/checkout"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 text-center block font-semibold"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
