import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import RatingStars from "../components/RatingStars";
import Reviews from "../components/Reviews";
import SimilarProducts from "../components/SimilarProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [autoSlide, setAutoSlide] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setIsWishlisted(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  // Auto-slide images every 5 seconds
  useEffect(() => {
    if (!autoSlide || !product) return;

    const images =
      product.images && product.images.length > 0 ? product.images : [];
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoSlide, product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/products/${id}`);
      setProduct(response.data);
      setSelectedImageIndex(0);
    } catch (err) {
      console.error("Error fetching product:", err);
      Swal.fire("Error", "Product not found", "error");
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageUrl) => {
    // Handle both local uploads and external URLs
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }
    return `${API_URL}${imageUrl}`;
  };

  const handleAddToCart = () => {
    if (quantity <= 0) {
      Swal.fire("Error", "Please select a valid quantity", "error");
      return;
    }

    if (quantity > product.stock) {
      Swal.fire(
        "Error",
        `Only ${product.stock} items available in stock`,
        "error",
      );
      return;
    }

    addToCart(product, quantity);
    Swal.fire({
      title: "Added to Cart!",
      text: `${quantity} × ${product.name} added to your cart`,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Go to Cart",
      cancelButtonText: "Continue Shopping",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/cart");
      } else {
        setQuantity(1);
      }
    });
  };

  const handleWishlist = () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  // Get images array
  const images =
    product.images && product.images.length > 0 ? product.images : [];
  const currentImage = images.length > 0 ? images[selectedImageIndex] : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600">Product not found</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images Section */}
        <div className="flex flex-col gap-4">
          {/* Main Image with Auto-Slide Controls */}
          <div className="bg-gray-100 rounded-lg p-4 flex justify-center items-center min-h-96 relative group">
            {currentImage ? (
              <>
                <img
                  src={getImageUrl(currentImage.image_url)}
                  alt={currentImage.alt_text || product.name}
                  className="max-w-full max-h-96 object-contain"
                  onError={(e) => {
                    console.error(
                      "Image failed to load:",
                      currentImage.image_url,
                    );
                    e.target.src =
                      "https://via.placeholder.com/400?text=No+Image";
                  }}
                />
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        setAutoSlide(false);
                        setSelectedImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1,
                        );
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition opacity-0 group-hover:opacity-100"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => {
                        setAutoSlide(false);
                        setSelectedImageIndex(
                          (prev) => (prev + 1) % images.length,
                        );
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition opacity-0 group-hover:opacity-100"
                    >
                      ›
                    </button>
                  </>
                )}
                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImageIndex + 1} / {images.length}
                  </div>
                )}
                {/* Auto-Slide Toggle */}
                {images.length > 1 && (
                  <button
                    onClick={() => setAutoSlide(!autoSlide)}
                    className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs hover:bg-opacity-80 transition"
                  >
                    {autoSlide ? "⏸ Pause" : "▶ Play"}
                  </button>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-center">
                <div>
                  <p className="text-xl font-semibold mb-2">
                    No Images Available
                  </p>
                  <p className="text-sm">This product has no images yet</p>
                </div>
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setAutoSlide(false);
                  }}
                  className={`flex-shrink-0 p-2 rounded-lg border-2 transition ${selectedImageIndex === index
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                  <img
                    src={getImageUrl(img.image_url)}
                    alt={`Product ${index + 1}`}
                    className="h-24 w-24 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100?text=Img";
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image Count */}
          {images.length > 0 && (
            <p className="text-sm text-gray-600 text-center">
              Image {selectedImageIndex + 1} of {images.length}
            </p>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>

            {/* Rating and Sales Stats */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-yellow-500">{Number(product.average_rating || 0).toFixed(1)}</span>
                <RatingStars rating={Number(product.average_rating || 0)} />
                <span className="text-sm text-gray-500 decoration-slice">({product.review_count || 0} reviews)</span>
              </div>
              <div className="w-px h-5 bg-gray-300"></div>
              <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                🔥 {product.sales_count || 0} Sold
              </div>
            </div>

            <p className="text-gray-600 text-lg">{product.description}</p>
          </div>

          {/* Price and Stock */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-3xl font-bold text-green-600 mb-2">
              ₹{product.price}
            </p>
            <p
              className={`text-lg font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>

          {/* Product Attributes */}
          <div className="space-y-3">
            {product.color && (
              <div>
                <label className="text-gray-700 font-semibold">Color:</label>
                <p className="text-gray-600">{product.color}</p>
              </div>
            )}
            {product.size && (
              <div>
                <label className="text-gray-700 font-semibold">Size:</label>
                <p className="text-gray-600">{product.size}</p>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Quantity:
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.min(Math.max(val, 1), product.stock));
                    }}
                    className="w-20 px-3 py-2 border rounded text-center"
                  />
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className={`w-full py-3 rounded-lg font-bold text-lg transition ${isWishlisted
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
              >
                {isWishlisted
                  ? "❤️ Remove from Wishlist"
                  : "🤍 Add to Wishlist"}
              </button>
            </div>
          )}

          {/* Out of Stock Message */}
          {product.stock === 0 && (
            <div className="space-y-4">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                This product is currently out of stock
              </div>
              <button
                onClick={handleWishlist}
                className={`w-full py-3 rounded-lg font-bold text-lg transition ${isWishlisted
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
              >
                {isWishlisted
                  ? "❤️ Remove from Wishlist"
                  : "🤍 Add to Wishlist"}
              </button>
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">✓ Free Shipping</h3>
            <h3 className="font-bold text-blue-900 mb-2">✓ 30-Day Returns</h3>
            <h3 className="font-bold text-blue-900">
              ✓ Cash on Delivery Available
            </h3>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews productId={id} />

      {/* Similar Products */}
      {product && <SimilarProducts categoryId={product.category_id} currentProductId={product.id} />}
    </div>
  );
};

export default ProductDetails;
