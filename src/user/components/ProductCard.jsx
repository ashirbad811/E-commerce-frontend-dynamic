import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const getImageUrl = () => {
    // Check if product has images array
    if (product.images && product.images.length > 0) {
      const primaryImage =
        product.images.find((img) => img.is_primary) || product.images[0];
      const imageUrl = primaryImage.image_url;
      // Handle both local and external URLs
      if (imageUrl.startsWith("http")) {
        return imageUrl;
      }
      return `${API_URL}${imageUrl}`;
    }
    // Fallback to old image_url field for backward compatibility
    if (product.image_url) {
      if (product.image_url.startsWith("http")) {
        return product.image_url;
      }
      return `${API_URL}${product.image_url}`;
    }
    return "https://via.placeholder.com/300?text=No+Image";
  };

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Out of Stock",
        text: "This product is currently unavailable",
      });
      return;
    }

    addToCart(product, quantity);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Added to cart",
      showConfirmButton: false,
      timer: 1500,
    });
    setQuantity(1);
  };

  const stockStatus =
    product.stock > 10
      ? "In Stock"
      : product.stock > 0
        ? "Low Stock"
        : "Out of Stock";
  const stockColor =
    product.stock > 10
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden flex flex-col h-full group">
      {/* Image Container */}
      <Link
        to={`/product/${product.id}`}
        className="relative overflow-hidden bg-gray-100 h-48"
      >
        <img
          src={getImageUrl()}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300?text=No+Image";
          }}
        />
        {/* Stock Badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${stockColor}`}
        >
          {stockStatus}
        </div>

        {/* Wishlist Icon */}
        <button className="absolute top-3 left-3 bg-white rounded-full p-2 hover:bg-blue-600 hover:text-white transition group-hover:scale-110">
          <FiHeart size={18} />
        </button>

        {/* Product Count Badge */}
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            +{product.images.length}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="group/link">
          <h3 className="font-bold text-sm md:text-base mb-2 line-clamp-2 group-hover/link:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-3">
          <span className="text-xl md:text-2xl font-bold text-blue-600">
            ₹{product.price}
          </span>
        </div>

        {/* Attributes */}
        <div className="mb-3 space-y-1">
          {product.color && (
            <p className="text-xs text-gray-600">🎨 Color: {product.color}</p>
          )}
          {product.size && (
            <p className="text-xs text-gray-600">📏 Size: {product.size}</p>
          )}
          {product.category_name && (
            <p className="text-xs text-gray-600">📂 {product.category_name}</p>
          )}
        </div>

        {/* Add to Cart Section */}
        <div className="mt-auto flex gap-2">
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            disabled={product.stock === 0}
            className="w-14 border border-gray-300 p-2 rounded-lg text-center text-sm focus:outline-none focus:border-blue-600 disabled:bg-gray-100"
          />
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105 disabled:hover:scale-100"
          >
            <FiShoppingCart size={18} />
            <span className="hidden sm:inline">
              {product.stock === 0 ? "Out of Stock" : "Add Cart"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
