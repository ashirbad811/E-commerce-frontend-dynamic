import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } =
    useContext(WishlistContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "https://via.placeholder.com/200?text=No+Image";
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
    return `${API_URL}${imageUrl}`;
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    Swal.fire({
      title: "Removed",
      text: "Product removed from wishlist",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleClearWishlist = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all items from your wishlist",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearWishlist();
        Swal.fire("Cleared!", "Your wishlist has been cleared.", "success");
      }
    });
  };

  const handleAddToCart = (product) => {
    const CartContext = require("../context/CartContext").CartContext;
    const { addToCart } = useContext(CartContext);
    addToCart(product, 1);
    Swal.fire({
      title: "Added to Cart!",
      text: `${product.name} added to your cart`,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Go to Cart",
      cancelButtonText: "Continue Shopping",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/cart");
      }
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 py-20">
        <button
          onClick={() => navigate("/products")}
          className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to Products
        </button>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">My Wishlist</h1>
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <p className="text-xl text-gray-600 mb-6">Your wishlist is empty</p>
            <p className="text-gray-500 mb-8">
              Add products to your wishlist to save them for later!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <button
        onClick={() => navigate("/products")}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Back to Products
      </button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Wishlist</h1>
        <div className="flex gap-4">
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
            {wishlist.length} item{wishlist.length !== 1 ? "s" : ""}
          </span>
          {wishlist.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Clear Wishlist
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden group"
          >
            {/* Image Container */}
            <div
              className="bg-gray-100 h-64 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={getImageUrl(
                  product.images
                    ? product.images[0]?.image_url || product.image_url
                    : product.image_url,
                )}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/200?text=No+Image";
                }}
              />
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3
                className="font-bold text-lg text-gray-800 mb-2 cursor-pointer hover:text-blue-600 line-clamp-2"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.name}
              </h3>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <p className="text-2xl font-bold text-green-600">
                  ₹{product.price}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  View Details
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
