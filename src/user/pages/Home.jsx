// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiChevronRight, FiZap, FiAward, FiTruck } from "react-icons/fi";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";

// const Home = () => {
//   const [categories, setCategories] = useState([]);
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch categories
//         const catResponse = await axios.get(`${API_URL}/api/categories`);
//         setCategories(catResponse.data);

//         // Fetch featured products
//         const prodResponse = await axios.get(`${API_URL}/api/products`);
//         setFeaturedProducts(prodResponse.data.slice(0, 8));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [API_URL]);

//   return (
//     <div className="bg-gray-50">
//       {/* Hero Banner */}
//       <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 text-white py-12 md:py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//             <div className="space-y-4 md:space-y-6">
//               <h1 className="text-3xl md:text-5xl font-bold leading-tight">
//                 Welcome to ShopHub
//               </h1>
//               <p className="text-base md:text-lg text-blue-100">
//                 Discover millions of products at great prices. Shop now and save
//                 big!
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3 pt-4">
//                 <Link
//                   to="/products"
//                   className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition text-center transform hover:scale-105"
//                 >
//                   Shop Now
//                 </Link>
//                 <Link
//                   to="/products"
//                   className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition text-center transform hover:scale-105"
//                 >
//                   View Catalog
//                 </Link>
//               </div>
//             </div>
//             <div className="hidden md:block">
//               <img
//                 src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=400&fit=crop"
//                 alt="Shopping"
//                 className="rounded-lg shadow-xl object-cover w-full h-96"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Benefits */}
//       <div className="bg-white py-8">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="flex items-center space-x-4 text-center md:text-left p-4 rounded-lg hover:bg-blue-50 transition">
//               <FiTruck className="text-blue-600 flex-shrink-0" size={32} />
//               <div>
//                 <h3 className="font-bold text-gray-900">Free Shipping</h3>
//                 <p className="text-gray-600 text-sm">On orders over ₹500</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4 text-center md:text-left p-4 rounded-lg hover:bg-blue-50 transition">
//               <FiAward className="text-blue-600 flex-shrink-0" size={32} />
//               <div>
//                 <h3 className="font-bold text-gray-900">Best Quality</h3>
//                 <p className="text-gray-600 text-sm">100% authentic products</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4 text-center md:text-left p-4 rounded-lg hover:bg-blue-50 transition">
//               <FiZap className="text-blue-600 flex-shrink-0" size={32} />
//               <div>
//                 <h3 className="font-bold text-gray-900">Fast Delivery</h3>
//                 <p className="text-gray-600 text-sm">Delivered in 2-3 days</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Categories Carousel */}
//       {categories.length > 0 && (
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//               Browse Categories
//             </h2>
//             <Link
//               to="/products"
//               className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-bold group"
//             >
//               <span>See All</span>
//               <FiChevronRight className="group-hover:translate-x-1 transition" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//             {categories.map((cat) => (
//               <Link
//                 key={cat.id}
//                 to={`/products?category=${cat.id}`}
//                 className="group bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300 overflow-hidden"
//               >
//                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
//                   <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
//                     {cat.icon}
//                   </div>
//                   <h3 className="text-gray-900 font-bold text-sm group-hover:text-blue-600 transition line-clamp-2">
//                     {cat.name}
//                   </h3>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Featured Products */}
//       {featuredProducts.length > 0 && (
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//                 Featured Products
//               </h2>
//               <p className="text-gray-600 mt-1">
//                 Handpicked products just for you
//               </p>
//             </div>
//             <Link
//               to="/products"
//               className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-bold group"
//             >
//               <span>View All</span>
//               <FiChevronRight className="group-hover:translate-x-1 transition" />
//             </Link>
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading products...</p>
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {featuredProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Deals & Offers Banner */}
//       <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-8 md:py-12 mt-12 mx-4 md:mx-auto rounded-lg max-w-7xl">
//         <div className="px-4 py-6 text-center">
//           <div className="text-3xl md:text-4xl font-bold mb-2">
//             🎉 Special Offers
//           </div>
//           <p className="text-base md:text-lg text-red-100 mb-4">
//             Get up to 50% off on selected items
//           </p>
//           <Link
//             to="/products"
//             className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition transform hover:scale-105"
//           >
//             Shop Deals Now
//           </Link>
//         </div>
//       </div>

//       {/* Newsletter CTA Section */}
//       <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-12 md:py-16 mt-12">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Get Exclusive Deals & Offers
//           </h2>
//           <p className="text-base md:text-lg mb-6 text-gray-800">
//             Subscribe to our newsletter for the latest updates and special
//             discounts
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
//             />
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition transform hover:scale-105">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Why Shop With Us */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
//           Why Shop With Us?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//             <div className="text-4xl mb-4">💳</div>
//             <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
//             <p className="text-gray-600">
//               Multiple payment options with secure checkout
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//             <div className="text-4xl mb-4">🔄</div>
//             <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
//             <p className="text-gray-600">
//               30-day return policy for peace of mind
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//             <div className="text-4xl mb-4">💬</div>
//             <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
//             <p className="text-gray-600">Customer support team ready to help</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { 
//   FiChevronRight, 
//   FiZap, 
//   FiAward, 
//   FiTruck,
//   FiShoppingBag,
//   FiTag,
//   FiClock,
//   FiStar,
//   FiShoppingCart,
//   FiHeart
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";

// const Home = () => {
//   const [categories, setCategories] = useState([]);
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [trendingProducts, setTrendingProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState({
//     hours: 23,
//     minutes: 59,
//     seconds: 59
//   });
//   const [email, setEmail] = useState("");
//   const [isSubscribing, setIsSubscribing] = useState(false);
//   const navigate = useNavigate();
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   // Timer for deals
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev.seconds > 0) {
//           return { ...prev, seconds: prev.seconds - 1 };
//         } else if (prev.minutes > 0) {
//           return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
//         } else if (prev.hours > 0) {
//           return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
//         }
//         return prev;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch categories
//         const catResponse = await axios.get(`${API_URL}/api/categories`);
//         const categoriesWithIcons = catResponse.data.map(cat => ({
//           ...cat,
//           icon: getCategoryIcon(cat.name)
//         }));
//         setCategories(categoriesWithIcons.slice(0, 8));

//         // Fetch featured products
//         const prodResponse = await axios.get(`${API_URL}/api/products`);
//         const products = prodResponse.data;
//         setFeaturedProducts(products.slice(0, 4));
//         setTrendingProducts(products.slice(4, 12));
        
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [API_URL]);

//   const getCategoryIcon = (name) => {
//     const icons = {
//       Electronics: "📱",
//       Fashion: "👕",
//       Home: "🏠",
//       Beauty: "💄",
//       Sports: "⚽",
//       Books: "📚",
//       Toys: "🧸",
//       Food: "🍕"
//     };
//     return icons[name] || "🛍️";
//   };

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     if (!email) return;
    
//     setIsSubscribing(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       alert("Thanks for subscribing! Check your email for a welcome discount.");
//       setEmail("");
//     } catch (error) {
//       console.error("Subscription error:", error);
//     } finally {
//       setIsSubscribing(false);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1
//     }
//   };

//   return (
//     <div className="bg-gray-50 overflow-hidden">
//       {/* Hero Banner with Swiper */}
//       <div className="relative overflow-hidden">
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           autoplay={{ delay: 5000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           className="h-[500px] md:h-[600px]"
//         >
//           {[
//             {
//               title: "Summer Sale Up to 70% Off",
//               subtitle: "Latest fashion trends at unbeatable prices",
//               image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=900&fit=crop",
//               color: "",
//               buttonText: "Shop Now"
//             },
//             {
//               title: "New Arrivals",
//               subtitle: "Discover our latest collection",
//               image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop",
//               color: "",
//               buttonText: "Explore"
//             },
//             {
//               title: "Free Shipping Worldwide",
//               subtitle: "On orders over $50",
//               image: "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?w=1600&h=900&fit=crop",
//               color: "",
//               buttonText: "Learn More"
//             }
//           ].map((slide, index) => (
//             <SwiperSlide key={index}>
//               <div className={`relative h-full bg-gradient-to-r ${slide.color}`}>
//                 <div className="absolute inset-0">
//                   <img
//                     src={slide.image}
//                     alt={slide.title}
//                     className="w-full h-full object-cover mix-blend-overlay opacity-30"
//                   />
//                 </div>
//                 <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
//                   <motion.div
//                     initial={{ opacity: 0, x: -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="text-white max-w-2xl"
//                   >
//                     <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
//                       {slide.title}
//                     </h1>
//                     <p className="text-xl md:text-2xl mb-8 opacity-90">
//                       {slide.subtitle}
//                     </p>
//                     <Link
//                       to="/products"
//                       className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
//                     >
//                       {slide.buttonText}
//                       <FiChevronRight className="ml-2" size={24} />
//                     </Link>
//                   </motion.div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Flash Sale Timer */}
//       <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-6">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="flex items-center space-x-4 mb-4 md:mb-0">
//               <FiClock size={32} className="animate-pulse" />
//               <div>
//                 <h3 className="text-xl font-bold">FLASH SALE</h3>
//                 <p className="text-sm opacity-90">Ends in:</p>
//               </div>
//             </div>
//             <div className="flex space-x-4">
//               {Object.entries(timeLeft).map(([key, value]) => (
//                 <div key={key} className="text-center">
//                   <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
//                     <span className="text-2xl font-bold">
//                       {value.toString().padStart(2, '0')}
//                     </span>
//                     <div className="text-xs uppercase mt-1">{key}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <Link
//               to="/products?flash=true"
//               className="mt-4 md:mt-0 bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
//             >
//               Shop Flash Sale
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Categories Grid */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="max-w-7xl mx-auto px-4 py-16"
//       >
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
//             Shop by Category
//           </h2>
//           <p className="text-gray-600 text-lg">
//             Discover products in your favorite categories
//           </p>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
//           {categories.map((cat, index) => (
//             <motion.div
//               key={cat.id}
//               variants={itemVariants}
//               custom={index}
//               whileHover={{ y: -8, scale: 1.02 }}
//               className="group"
//             >
//               <Link
//                 to={`/products?category=${cat.id}`}
//                 className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
//               >
//                 <div className="p-6 text-center">
//                   <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
//                     {cat.icon}
//                   </div>
//                   <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
//                     {cat.name}
//                   </h3>
//                   <div className="mt-2 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
//                     Shop now →
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Featured Products */}
//       <div className="bg-gradient-to-b from-white to-gray-50 py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                 Featured Products
//               </h2>
//               <p className="text-gray-600 text-lg">
//                 Curated collection of our best products
//               </p>
//             </div>
//             <Link
//               to="/products"
//               className="group inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-bold mt-4 md:mt-0 text-lg"
//             >
//               <span>View All Products</span>
//               <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
//             </Link>
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-20">
//               <div className="text-center">
//                 <div className="relative">
//                   <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
//                   <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
//                 </div>
//                 <p className="mt-4 text-gray-600 font-medium">Loading amazing products...</p>
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {featuredProducts.map((product, index) => (
//                 <motion.div
//                   key={product.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   whileHover={{ y: -5 }}
//                 >
//                   <ProductCard product={product} />
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Benefits Section */}
//       <div className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <FiTruck className="text-blue-600" size={40} />,
//                 title: "Free & Fast Delivery",
//                 description: "Free shipping on orders over $50. Same-day delivery available in select areas.",
//                 color: "bg-blue-50"
//               },
//               {
//                 icon: <FiAward className="text-green-600" size={40} />,
//                 title: "Quality Guaranteed",
//                 description: "All products are verified for quality. 30-day return policy for all items.",
//                 color: "bg-green-50"
//               },
//               {
//                 icon: <FiZap className="text-orange-600" size={40} />,
//                 title: "24/7 Support",
//                 description: "Round-the-clock customer support via chat, email, and phone.",
//                 color: "bg-orange-50"
//               }
//             ].map((benefit, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.2 }}
//                 whileHover={{ scale: 1.05 }}
//                 className={`${benefit.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
//               >
//                 <div className="mb-6">{benefit.icon}</div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {benefit.title}
//                 </h3>
//                 <p className="text-gray-600">
//                   {benefit.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Trending Products */}
//       <div className="py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
//             Trending Now 🔥
//           </h2>
          
//           <Swiper
//             modules={[Navigation]}
//             navigation
//             spaceBetween={20}
//             slidesPerView={1}
//             breakpoints={{
//               640: { slidesPerView: 2 },
//               768: { slidesPerView: 3 },
//               1024: { slidesPerView: 4 }
//             }}
//             className="pb-12"
//           >
//             {trendingProducts.map((product) => (
//               <SwiperSlide key={product.id}>
//                 <div className="px-2">
//                   <ProductCard product={product} />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>

//       {/* Newsletter Subscription */}
//       <div className="relative py-20 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-95"></div>
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600')] opacity-10"></div>
        
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative max-w-4xl mx-auto px-4 text-center"
//         >
//           <FiShoppingBag className="mx-auto text-white mb-6" size={48} />
//           <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
//             Join Our Community
//           </h2>
//           <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Subscribe to get exclusive offers, early access to sales, and style tips from our experts.
//           </p>
          
//           <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
//             <div className="flex flex-col sm:flex-row gap-3">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email address"
//                 className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-white/30 bg-white/90 placeholder-gray-500"
//                 required
//               />
//               <button
//                 type="submit"
//                 disabled={isSubscribing}
//                 className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
//               >
//                 {isSubscribing ? "Subscribing..." : "Subscribe Now"}
//               </button>
//             </div>
//             <p className="text-sm text-blue-200 mt-4">
//               By subscribing, you agree to our Privacy Policy
//             </p>
//           </form>
//         </motion.div>
//       </div>

//       {/* Testimonials */}
//       <div className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
//             What Our Customers Say
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Sarah Johnson",
//                 role: "Frequent Shopper",
//                 comment: "Best shopping experience ever! The quality is outstanding and delivery was super fast.",
//                 rating: 5,
//                 avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
//               },
//               {
//                 name: "Michael Chen",
//                 role: "Tech Enthusiast",
//                 comment: "Great prices on electronics and excellent customer support when I had questions.",
//                 rating: 5,
//                 avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w-100"
//               },
//               {
//                 name: "Emma Davis",
//                 role: "Fashion Blogger",
//                 comment: "Love the trendy collections and the easy return process makes shopping risk-free!",
//                 rating: 4,
//                 avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
//               }
//             ].map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.2 }}
//                 className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
//               >
//                 <div className="flex items-center mb-6">
//                   <img
//                     src={testimonial.avatar}
//                     alt={testimonial.name}
//                     className="w-12 h-12 rounded-full mr-4"
//                   />
//                   <div>
//                     <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
//                     <p className="text-gray-600 text-sm">{testimonial.role}</p>
//                   </div>
//                 </div>
//                 <div className="flex mb-4">
//                   {[...Array(5)].map((_, i) => (
//                     <FiStar
//                       key={i}
//                       className={`${
//                         i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
//                       }`}
//                       size={20}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-gray-700 italic">"{testimonial.comment}"</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiChevronRight, 
  FiZap, 
  FiAward, 
  FiTruck,
  FiShoppingBag,
  FiClock,
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiArrowRight
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Timer for deals
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const catResponse = await axios.get(`${API_URL}/api/categories`);
        const categoriesWithIcons = catResponse.data.map(cat => ({
          ...cat,
          icon: getCategoryIcon(cat.name),
          color: getCategoryColor(cat.name)
        }));
        setCategories(categoriesWithIcons.slice(0, 8));

        // Fetch featured products
        const prodResponse = await axios.get(`${API_URL}/api/products`);
        const products = prodResponse.data;
        setFeaturedProducts(products.slice(0, 4));
        setTrendingProducts(products.slice(4, 12));
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  const getCategoryIcon = (name) => {
    const icons = {
      Electronics: "📱",
      Fashion: "👕",
      Home: "🏠",
      Beauty: "💄",
      Sports: "⚽",
      Books: "📚",
      Toys: "🧸",
      Food: "🍕",
      Garden: "🌿",
      Pets: "🐾",
      Jewelry: "💎",
      Automotive: "🚗"
    };
    return icons[name] || "🛍️";
  };

  const getCategoryColor = (name) => {
    const colors = {
      Electronics: "from-blue-500 to-cyan-500",
      Fashion: "from-pink-500 to-rose-500",
      Home: "from-emerald-500 to-teal-500",
      Beauty: "from-purple-500 to-violet-500",
      Sports: "from-orange-500 to-amber-500",
      Books: "from-indigo-500 to-blue-500",
      Toys: "from-yellow-500 to-orange-500",
      Food: "from-red-500 to-pink-500"
    };
    return colors[name] || "from-gray-500 to-gray-700";
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Thanks for subscribing! Check your email for a welcome discount.");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const categoryVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateY: -90 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Hero Banner with Enhanced Swiper */}
      <div className="relative overflow-hidden rounded-b-3xl shadow-2xl">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ 
            delay: 5000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          speed={1000}
          className="h-[500px] md:h-[650px] lg:h-[700px]"
        >
          {[
            {
              title: "Summer Sale Up to 70% Off",
              subtitle: "Latest fashion trends at unbeatable prices",
              image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=900&fit=crop",
              buttonText: "Shop Now",
              bgColor: "bg-gradient-to-r from-blue-600/20 to-purple-600/20"
            },
            {
              title: "New Arrivals",
              subtitle: "Discover our latest collection",
              image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop",
              buttonText: "Explore",
              bgColor: "bg-gradient-to-r from-green-600/20 to-emerald-600/20"
            },
            {
              title: "Free Shipping Worldwide",
              subtitle: "On orders over $50",
              image: "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?w=1600&h=900&fit=crop",
              buttonText: "Learn More",
              bgColor: "bg-gradient-to-r from-orange-600/20 to-red-600/20"
            }
          ].map((slide, index) => (
            <SwiperSlide key={index}>
              <div className={`relative h-full ${slide.bgColor}`}>
                {/* Background Image */}
                <motion.div 
                  className="absolute inset-0"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 10 }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
                </motion.div>
                
                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.3 
                    }}
                    className="text-white max-w-2xl"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100px" }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mb-6 rounded-full"
                    ></motion.div>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                      {slide.title.split(' ').map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="inline-block mr-2"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-100">
                      {slide.subtitle}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/products"
                        className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 group"
                      >
                        {slide.buttonText}
                        <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={24} />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Floating Elements */}
        <motion.div
          animate={floatingAnimation}
          className="absolute top-10 right-10 hidden lg:block"
        >
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
            <div className="text-white font-bold">🔥 Hot Deal</div>
          </div>
        </motion.div>
      </div>

      {/* Flash Sale Timer - Enhanced */}
      <div className="relative -mt-16 z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 text-white py-6 px-8 rounded-2xl shadow-2xl border border-red-400/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FiClock size={36} className="text-yellow-300" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">FLASH SALE</h3>
                <p className="text-sm text-red-100">Limited time offers ending soon!</p>
              </div>
            </div>
            
            <div className="flex space-x-3 md:space-x-4">
              {Object.entries(timeLeft).map(([key, value]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[70px] border border-white/30 shadow-lg">
                    <span className="text-3xl font-bold block">
                      {value.toString().padStart(2, '0')}
                    </span>
                    <div className="text-xs uppercase mt-1 text-white/80">{key}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 md:mt-0"
            >
              <Link
                to="/products?flash=true"
                className="inline-flex items-center bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition-all shadow-lg group"
              >
                Shop Flash Sale
                <FiZap className="ml-2 group-hover:rotate-12 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Categories Grid with Unique Animations */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Browse through our curated collections tailored for every lifestyle
            </p>
          </motion.div>
        </div>

        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8"
          >
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                variants={categoryVariants}
                custom={index}
                whileHover="hover"
                whileTap="tap"
                onMouseEnter={() => setActiveCategory(cat.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className="relative"
              >
                {/* Hover Overlay */}
                <AnimatePresence>
                  {activeCategory === cat.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 bg-gradient-to-br ${cat.color} rounded-3xl blur-xl opacity-30 -z-10`}
                    />
                  )}
                </AnimatePresence>

                <Link
                  to={`/products?category=${cat.id}`}
                  className="block relative group"
                >
                  <motion.div
                    className={`bg-gradient-to-br ${cat.color} p-1 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300`}
                    animate={activeCategory === cat.id ? {
                      scale: [1, 1.02, 1],
                      transition: {
                        duration: 2,
                        repeat: Infinity
                      }
                    } : {}}
                  >
                    <div className="bg-white rounded-2xl p-6 text-center overflow-hidden">
                      {/* Icon Container with 3D Effect */}
                      <motion.div
                        className="relative mb-4"
                        animate={activeCategory === cat.id ? {
                          rotateY: 360,
                          transition: {
                            duration: 1,
                            ease: "easeInOut"
                          }
                        } : {}}
                      >
                        <div className="text-6xl transform transition-all duration-500 group-hover:scale-110">
                          {cat.icon}
                        </div>
                        
                        {/* Glowing Ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-blue-400/30 transition-all duration-500"></div>
                      </motion.div>

                      {/* Category Name */}
                      <motion.h3
                        className="font-bold text-gray-900 text-lg mb-2"
                        animate={activeCategory === cat.id ? {
                          scale: [1, 1.1, 1],
                          transition: {
                            duration: 0.5
                          }
                        } : {}}
                      >
                        {cat.name}
                      </motion.h3>

                      {/* Animated Arrow */}
                      <motion.div
                        className="text-blue-600"
                        animate={activeCategory === cat.id ? {
                          x: [0, 5, 0],
                          transition: {
                            duration: 0.5,
                            repeat: Infinity
                          }
                        } : {}}
                      >
                        <FiChevronRight className="inline opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                          Explore
                        </span>
                      </motion.div>

                      {/* Particle Effect on Hover */}
                      <AnimatePresence>
                        {activeCategory === cat.id && (
                          <>
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ 
                                  scale: 0,
                                  opacity: 0,
                                  x: 0,
                                  y: 0 
                                }}
                                animate={{ 
                                  scale: [0, 1, 0],
                                  opacity: [0, 1, 0],
                                  x: Math.random() * 100 - 50,
                                  y: Math.random() * 100 - 50
                                }}
                                transition={{ 
                                  duration: 1,
                                  delay: i * 0.1 
                                }}
                                className="absolute w-2 h-2 rounded-full bg-blue-400"
                                style={{
                                  left: '50%',
                                  top: '50%'
                                }}
                              />
                            ))}
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/categories"
            className="inline-flex items-center bg-gradient-to-r from-gray-900 to-black text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-300 group"
          >
            View All Categories
            <FiChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
        </motion.div>
      </div>

      {/* Featured Products - Enhanced */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Featured Products
                </h2>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl">
                Handpicked selection of premium products for the discerning shopper
              </p>
            </div>
            <Link
              to="/products"
              className="group inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-bold mt-6 md:mt-0 text-lg"
            >
              <span>Browse All</span>
              <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-blue-100 rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                </div>
                <p className="mt-6 text-gray-600 font-medium text-lg">Curating amazing products...</p>
              </div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, rotateX: -90 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      rotateX: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.1
                      }
                    }
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative">
                    <ProductCard product={product} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Benefits Section - Enhanced */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FiTruck size={48} />,
                title: "Free & Fast Delivery",
                description: "Free shipping on orders over $50. Same-day delivery available in select areas.",
                gradient: "from-blue-500 to-cyan-500",
                features: ["Free Shipping", "2-3 Day Delivery", "Track Orders"]
              },
              {
                icon: <FiAward size={48} />,
                title: "Quality Guaranteed",
                description: "All products are verified for quality. 30-day return policy for all items.",
                gradient: "from-green-500 to-emerald-500",
                features: ["Authentic Products", "30-Day Returns", "Warranty Included"]
              },
              {
                icon: <FiZap size={48} />,
                title: "24/7 Support",
                description: "Round-the-clock customer support via chat, email, and phone.",
                gradient: "from-orange-500 to-amber-500",
                features: ["Live Chat", "Phone Support", "Email Help"]
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${benefit.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500`}></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${benefit.gradient} text-white mb-6`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {benefit.description}
                  </p>
                  <ul className="space-y-2">
                    {benefit.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="flex items-center text-gray-700"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.gradient} mr-3`}></div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trending Products - Enhanced */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-4">
              <FiZap className="animate-pulse" />
              <span className="font-bold">TRENDING NOW</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hot Picks of the Week
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover what everyone is shopping for this week
            </p>
          </motion.div>
          
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ 
              delay: 3000,
              disableOnInteraction: false 
            }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }
            }}
            className="pb-16"
          >
            {trendingProducts.map((product, index) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="px-2"
                >
                  <ProductCard product={product} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Newsletter Subscription - Enhanced */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600"
            alt="Newsletter background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90"></div>
        </div>
        
        {/* Floating Elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"></div>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto px-4 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20"
          >
            <FiShoppingBag className="text-white" size={48} />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Join <span className="text-yellow-300">30,000+</span> Happy Shoppers
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter and be the first to know about exclusive deals, 
            new arrivals, and member-only discounts.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/30 bg-white/95 placeholder-gray-500 text-lg shadow-2xl"
                  required
                />
              </motion.div>
              <motion.button
                type="submit"
                disabled={isSubscribing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50"
              >
                {isSubscribing ? (
                  <span className="flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full mr-2"
                    ></motion.div>
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe Now"
                )}
              </motion.button>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
            </p>
          </form>
        </motion.div>
      </div>

      {/* Testimonials - Enhanced */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by <span className="text-blue-600">Thousands</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hear from our satisfied customers around the world
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Frequent Shopper",
                comment: "The quality is outstanding and delivery was super fast. Best shopping experience ever!",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50"
              },
              {
                name: "Michael Chen",
                role: "Tech Enthusiast",
                comment: "Great prices on electronics and excellent customer support. Will definitely shop again!",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bgColor: "bg-gradient-to-br from-green-50 to-emerald-50"
              },
              {
                name: "Emma Davis",
                role: "Fashion Blogger",
                comment: "Love the trendy collections! The easy return process makes shopping completely risk-free.",
                rating: 4,
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                bgColor: "bg-gradient-to-br from-pink-50 to-rose-50"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10 }}
                className={`${testimonial.bgColor} p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100`}
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white"></div>
                  </motion.div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <FiStar
                        className={`${
                          i < testimonial.rating 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300"
                        }`}
                        size={20}
                      />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-700 text-lg italic relative pl-4">
                  <span className="absolute left-0 top-0 text-4xl text-gray-300 leading-none">"</span>
                  {testimonial.comment}
                </p>
                
                {/* Verified Badge */}
                <div className="mt-6 inline-flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Verified Purchase</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Start Shopping?
          </motion.h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join millions of happy customers who shop with confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <FiShoppingCart className="mr-3" />
                Start Shopping
                <FiArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="inline-flex items-center border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Create Account
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;