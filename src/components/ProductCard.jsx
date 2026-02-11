import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { FiHeart } from "react-icons/fi";
import RatingStars from "./RatingStars";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

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

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (product.stock <= 0) {
      Swal.fire(
        "Out of Stock",
        "This product is not available right now",
        "warning",
      );
      return;
    }

    addToCart(product, 1);
    Swal.fire({
      title: "Added to Cart!",
      text: `${product.name} has been added to your cart`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
      Swal.fire({
        title: "Removed from Wishlist!",
        text: `${product.name} removed from your wishlist`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      addToWishlist(product);
      setIsWishlisted(true);
      Swal.fire({
        title: "Added to Wishlist!",
        text: `${product.name} added to your wishlist`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer h-full flex flex-col relative">
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition"
        >
          <FiHeart
            size={20}
            fill={isWishlisted ? "#ef4444" : "none"}
            color={isWishlisted ? "#ef4444" : "#999"}
          />
        </button>

        <div className="relative mb-4 overflow-hidden rounded bg-gray-100">
          <img
            src={getImageUrl()}
            alt={product.name}
            className="w-full h-48 object-cover hover:scale-105 transition"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300?text=No+Image";
            }}
          />
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-1">
          {product.description?.substring(0, 60)}...
        </p>

        {/* Rating */}
        <div className="mb-2">
          <RatingStars rating={Number(product.average_rating || 0)} count={product.review_count} />
        </div>

        <p className="text-2xl font-bold text-green-600 mb-2">
          ₹{product.price}
        </p>

        <div className="text-xs text-gray-500 mb-3">
          {product.size && <span className="mr-2">Size: {product.size}</span>}
          {product.color && <span>Color: {product.color}</span>}
        </div>

        <p
          className={`text-sm font-semibold mb-4 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`mt-auto w-full py-2 rounded font-semibold transition ${product.stock > 0
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
