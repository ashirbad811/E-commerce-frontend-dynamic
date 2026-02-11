// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { CartContext } from "../../context/CartContext";
// import { WishlistContext } from "../../context/WishlistContext";
// import {
//   FiSearch,
//   FiShoppingCart,
//   FiUser,
//   FiLogOut,
//   FiMenu,
//   FiX,
//   FiHome,
//   FiGrid,
//   FiPackage,
//   FiHeart,
// } from "react-icons/fi";
// import axios from "axios";
// import { FaUser } from "react-icons/fa";

// const UserNavbar = ({ onNeedLogin }) => {
//   const { user, logout } = useContext(AuthContext);
//   const { getTotalItems } = useContext(CartContext);
//   const { getTotalItems: getWishlistTotal } = useContext(WishlistContext);
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/categories`,
//         );
//         setCategories(response.data.slice(0, 6)); // Show top 6 categories
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       setMobileMenuOpen(false);
//     }
//   };

//   const handleLogout = async () => {
//     await logout();
//     navigate("/");
//     setShowProfileMenu(false);
//   };

//   const cartCount = getTotalItems();
//   const wishlistCount = getWishlistTotal();

//   return (
//     <>
//       {/* Header */}
//       <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-40 shadow-lg">
//         <div className="w-full">
//           {/* Top Bar - Desktop */}
//           <div className="hidden md:flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
//             {/* Logo */}
//             <Link
//               to="/"
//               className="flex items-center space-x-2 font-bold text-2xl hover:text-blue-100 transition"
//             >
//               {/* <FiGrid className="text-yellow-400" size={28} /> */}
//               <img src="/logo.png" alt="TrendHive" className="h-12" />
//               <span>TrendHive</span>
//             </Link>

//             {/* Search Bar */}
//             <form
//               onSubmit={handleSearch}
//               className="flex-1 mx-6 relative bg-white rounded-lg overflow-hidden shadow-md"
//             >
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search for products, brands, and more"
//                 className="w-full pl-10 pr-14 py-2 text-gray-800 focus:outline-none"
//               />
//               <button
//                 type="submit"
//                 className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-gray-800 p-2 rounded hover:bg-yellow-500 transition"
//               >
//                 <FiSearch size={18} />
//               </button>
//             </form>

//             {/* Right Actions */}
//             <div className="flex items-center space-x-4">
//               {user ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowProfileMenu(!showProfileMenu)}
//                     className="flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition"
//                   >
//                     <FiUser size={20} />
//                     <span className="text-sm font-medium">
//                       {user.name?.split(" ")[0]}
//                     </span>
//                   </button>

//                   {/* Profile Dropdown */}
//                   {showProfileMenu && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50">
//                       <Link
//                         to="/dashboard"
//                         className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 transition text-sm"
//                         onClick={() => setShowProfileMenu(false)}
//                       >
//                         <FaUser size={18} />
//                         <span>My Account  </span>
//                       </Link>
//                       <hr className="my-1" />
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 transition text-sm"
//                       >
//                         <FiLogOut size={18} />
//                         <span>Logout</span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition"
//                 >
//                   <FiUser size={20} />
//                   <span className="text-sm font-medium">Login</span>
//                 </button>
//               )}

//               {/* Wishlist */}
//               <Link
//                 to="/wishlist"
//                 className="relative flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition"
//               >
//                 <FiHeart size={20} />
//                 <span className="text-sm font-medium">Wishlist</span>
//                 {wishlistCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                     {wishlistCount}
//                   </span>
//                 )}
//               </Link>

//               {/* Cart */}
//               <Link
//                 to="/cart"
//                 className="relative flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded transition"
//               >
//                 <FiShoppingCart size={20} />
//                 <span className="text-sm font-medium">Cart</span>
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>

//           {/* Categories Bar */}
//           <div className="hidden md:flex items-center space-x-1 border-t border-blue-500 py-2 px-4 max-w-7xl mx-auto overflow-x-auto">
//             <Link
//               to="/"
//               className="flex items-center space-x-1 px-3 py-1 hover:bg-blue-700 rounded text-sm whitespace-nowrap transition"
//             >
//               <FiHome size={16} />
//               <span>Home</span>
//             </Link>

//             {categories.map((cat) => (
//               <Link
//                 key={cat.id}
//                 to={`/products?category=${cat.id}`}
//                 className="px-3 py-1 hover:bg-blue-700 rounded text-sm whitespace-nowrap transition"
//               >
//                 {cat.icon && <span>{cat.icon}</span>}
//                 {cat.name}
//               </Link>
//             ))}

//             <Link
//               to="/products"
//               className="px-3 py-1 hover:bg-blue-700 rounded text-sm whitespace-nowrap transition ml-auto"
//             >
//               View All
//             </Link>
//           </div>

//           {/* Mobile Header */}
//           <div className="md:hidden flex items-center justify-between h-14 px-4">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="hover:bg-blue-700 p-2 rounded transition"
//             >
//               {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//             </button>

//             <img src="/logo.png" alt="TrendHive" className="h-10" />

//             <div className="flex items-center space-x-2">
//               <Link
//                 to="/wishlist"
//                 className="relative flex items-center hover:bg-blue-700 p-2 rounded transition"
//               >
//                 <FiHeart size={20} />
//                 {wishlistCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                     {wishlistCount}
//                   </span>
//                 )}
//               </Link>

//               <Link
//                 to="/cart"
//                 className="relative flex items-center hover:bg-blue-700 p-2 rounded transition"
//               >
//                 <FiShoppingCart size={20} />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>

//               {user ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowProfileMenu(!showProfileMenu)}
//                     className="hover:bg-blue-700 p-2 rounded transition"
//                   >
//                     <FiUser size={20} />
//                   </button>

//                   {showProfileMenu && (
//                     <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
//                       <Link
//                         to="/dashboard"
//                         className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 text-sm transition"
//                         onClick={() => setShowProfileMenu(false)}
//                       >
//                         <FiPackage size={16} />
//                         <span>My Orders</span>
//                       </Link>
//                       <hr className="my-1" />
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 text-sm transition"
//                       >
//                         <FiLogOut size={16} />
//                         <span>Logout</span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="hover:bg-blue-700 p-2 rounded transition"
//                 >
//                   <FiUser size={20} />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white text-gray-800 border-b border-gray-200 shadow-md z-30 max-h-96 overflow-y-auto">
//           {/* Search */}
//           <form
//             onSubmit={handleSearch}
//             className="p-4 border-b border-gray-200"
//           >
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
//               />
//             </div>
//           </form>

//           {/* Links */}
//           <nav className="p-4 space-y-2">
//             <Link
//               to="/"
//               className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium p-2 hover:bg-blue-50 rounded transition"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               <FiHome size={20} />
//               <span>Home</span>
//             </Link>

//             {categories.map((cat) => (
//               <Link
//                 key={cat.id}
//                 to={`/products?category=${cat.id}`}
//                 className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium p-2 hover:bg-blue-50 rounded transition"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <span className="text-lg">{cat.icon}</span>
//                 <span>{cat.name}</span>
//               </Link>
//             ))}

//             <Link
//               to="/products"
//               className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium p-2 hover:bg-blue-50 rounded transition"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               <FiGrid size={20} />
//               <span>View All Products</span>
//             </Link>

//             <Link
//               to="/wishlist"
//               className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium p-2 hover:bg-blue-50 rounded transition"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               <FiHeart size={20} />
//               <span>My Wishlist</span>
//               {wishlistCount > 0 && (
//                 <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
//                   {wishlistCount}
//                 </span>
//               )}
//             </Link>

//             {!user && (
//               <Link
//                 to="/login"
//                 className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-bold mt-4 pt-4 p-2 border-t border-gray-200 hover:bg-blue-50 rounded transition"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <FiUser size={20} />
//                 <span>Login / Register</span>
//               </Link>
//             )}
//           </nav>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserNavbar;






import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiHome,
  FiGrid,
  FiPackage,
  FiHeart,
  FiChevronDown,
  FiBell,
  FiTrendingUp,
  FiStar,
  FiShoppingBag,
  FiTag,
  FiTruck
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const UserNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  const { getTotalItems: getWishlistTotal } = useContext(WishlistContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/categories`,
        );
        setCategories(response.data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu') && !event.target.closest('.profile-button')) {
        setShowProfileMenu(false);
      }
      if (!event.target.closest('.categories-dropdown') && !event.target.closest('.categories-button')) {
        setShowCategoriesDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const handleSearchChange = async (value) => {
    setSearchQuery(value);
    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products/search-suggestions?q=${value}`
        );
        setSearchSuggestions(response.data);
      } catch (error) {
        setSearchSuggestions([]);
      }
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setShowProfileMenu(false);
  };

  const cartCount = getTotalItems();
  const wishlistCount = getWishlistTotal();

  const navbarVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const getCategoryIcon = (name) => {
    const icons = {
      Electronics: "📱",
      Fashion: "👕",
      Home: "🏠",
      Beauty: "💄",
      Sports: "⚽",
      Books: "📚",
      Toys: "🧸",
      Food: "🍕"
    };
    return icons[name] || "🛍️";
  };

  return (
    <>
      {/* Header */}
      <motion.header
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-xl text-gray-800' 
            : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white'
        }`}
      >
        {/* Top Bar - Desktop */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between h-20 px-6 max-w-7xl mx-auto">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="flex items-center space-x-3 font-bold text-2xl hover:opacity-90 transition"
              >
                <div className={`relative ${scrolled ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-white'} p-2 rounded-xl`}>
                  <FiShoppingBag className={scrolled ? 'text-white' : 'text-blue-600'} size={28} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className={`font-bold ${scrolled ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : 'text-white'}`}>
                    TrendHive
                  </span>
                  <span className="text-xs opacity-75">Premium Shopping</span>
                </div>
              </Link>
            </motion.div>

            {/* Categories Dropdown */}
            <div className="relative categories-dropdown">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all ${
                  scrolled 
                    ? 'hover:bg-gray-100 text-gray-700' 
                    : 'hover:bg-blue-700/50 text-white'
                } categories-button`}
              >
                <FiGrid size={20} />
                <span className="font-medium">Categories</span>
                <FiChevronDown className={`transition-transform ${showCategoriesDropdown ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {showCategoriesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <FiTrendingUp /> Trending Categories
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {categories.map((cat, index) => (
                        <motion.div
                          key={cat.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={`/products?category=${cat.id}`}
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition-all group border-b border-gray-100 last:border-0"
                            onClick={() => setShowCategoriesDropdown(false)}
                          >
                            <span className="text-2xl transform group-hover:scale-110 transition-transform">
                              {getCategoryIcon(cat.name)}
                            </span>
                            <div className="flex-1">
                              <span className="font-medium text-gray-900 group-hover:text-blue-600">
                                {cat.name}
                              </span>
                              <p className="text-xs text-gray-500">Shop now →</p>
                            </div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </Link>
                        </motion.div>
                      ))}
                      <Link
                        to="/categories"
                        className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-all"
                        onClick={() => setShowCategoriesDropdown(false)}
                      >
                        <span>View All Categories</span>
                        <FiChevronRight />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Bar */}
            <div className="flex-1 mx-8 relative max-w-2xl">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search for products, brands, and more..."
                      className={`w-full pl-12 pr-32 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        scrolled 
                          ? 'bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-200' 
                          : 'bg-white/10 backdrop-blur-sm text-white placeholder-white/70 border border-white/20'
                      }`}
                    />
                    <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      scrolled ? 'text-gray-400' : 'text-white/70'
                    }`} size={20} />
                    
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-5 py-2 rounded-lg font-bold hover:shadow-lg transition-all hover:scale-105"
                    >
                      Search
                    </button>
                  </motion.div>

                  {/* Search Suggestions */}
                  <AnimatePresence>
                    {searchSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-40"
                      >
                        <div className="p-3 border-b border-gray-100 bg-gray-50">
                          <h4 className="font-bold text-gray-700">Popular Searches</h4>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {searchSuggestions.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                to={`/products?search=${encodeURIComponent(item)}`}
                                className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition-all border-b border-gray-100 last:border-0"
                                onClick={() => setSearchSuggestions([])}
                              >
                                <FiSearch className="text-gray-400" size={16} />
                                <span className="text-gray-700">{item}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-3 rounded-xl transition-all ${
                    scrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'hover:bg-blue-700/50 text-white'
                  }`}
                >
                  <FiBell size={22} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
              </motion.div>

              {/* Wishlist */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/wishlist"
                  className={`relative p-3 rounded-xl transition-all flex items-center space-x-2 ${
                    scrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'hover:bg-blue-700/50 text-white'
                  }`}
                >
                  <FiHeart size={22} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                      {wishlistCount}
                    </span>
                  )}
                  <span className="font-medium hidden sm:block">Wishlist</span>
                </Link>
              </motion.div>

              {/* Cart */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/cart"
                  className={`relative p-3 rounded-xl transition-all flex items-center space-x-2 ${
                    scrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'hover:bg-blue-700/50 text-white'
                  }`}
                >
                  <FiShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                      {cartCount}
                    </span>
                  )}
                  <span className="font-medium hidden sm:block">Cart</span>
                </Link>
              </motion.div>

              {/* Profile */}
              <div className="relative profile-menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`flex items-center space-x-2 p-3 rounded-xl transition-all profile-button ${
                    scrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'hover:bg-blue-700/50 text-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    scrolled ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white/20'
                  }`}>
                    <FiUser size={20} className={scrolled ? 'text-white' : ''} />
                  </div>
                  <div className="hidden md:block text-left">
                    <span className="font-medium block">
                      {user ? user.name?.split(" ")[0] : "Guest"}
                    </span>
                    <span className="text-xs opacity-75">
                      {user ? "Account" : "Login"}
                    </span>
                  </div>
                  <FiChevronDown className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <FiUser size={24} className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {user ? user.name : "Welcome!"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {user ? user.email : "Sign in for better experience"}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        {user ? (
                          <>
                            <Link
                              to="/dashboard"
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 rounded-lg transition-all text-gray-700"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FiPackage className="text-blue-600" />
                              </div>
                              <div>
                                <span className="font-medium">My Dashboard</span>
                                <p className="text-xs text-gray-500">Orders, profile & more</p>
                              </div>
                            </Link>
                            
                            <Link
                              to="/wishlist"
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 rounded-lg transition-all text-gray-700"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                <FiHeart className="text-pink-600" />
                              </div>
                              <div>
                                <span className="font-medium">My Wishlist</span>
                                <p className="text-xs text-gray-500">{wishlistCount} items</p>
                              </div>
                            </Link>
                            
                            <hr className="my-2 border-gray-200" />
                            
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-50 to-rose-50 text-red-600 hover:bg-red-100 rounded-lg transition-all font-medium"
                            >
                              <FiLogOut />
                              <span>Logout</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/login"
                              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg rounded-lg transition-all font-medium mb-2"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              <FiUser />
                              <span>Login / Register</span>
                            </Link>
                            <p className="text-center text-xs text-gray-500 px-4">
                              Get exclusive deals and faster checkout
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl ${
                scrolled 
                  ? 'hover:bg-gray-100 text-gray-700' 
                  : 'hover:bg-blue-700/50 text-white'
              }`}
            >
              {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${
                  scrolled ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-white'
                }`}>
                  <FiShoppingBag className={scrolled ? 'text-white' : 'text-blue-600'} size={24} />
                </div>
                <span className={`font-bold text-xl ${
                  scrolled ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : 'text-white'
                }`}>
                  TrendHive
                </span>
              </Link>
            </motion.div>

            <div className="flex items-center space-x-2">
              <Link
                to="/wishlist"
                className={`relative p-2 rounded-xl ${
                  scrolled 
                    ? 'hover:bg-gray-100 text-gray-700' 
                    : 'hover:bg-blue-700/50 text-white'
                }`}
              >
                <FiHeart size={22} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className={`relative p-2 rounded-xl ${
                  scrolled 
                    ? 'hover:bg-gray-100 text-gray-700' 
                    : 'hover:bg-blue-700/50 text-white'
                }`}
              >
                <FiShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto lg:hidden"
            >
              {/* Mobile Menu Header */}
              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <FiShoppingBag size={24} />
                    </div>
                    <div>
                      <h2 className="font-bold text-xl">TrendHive</h2>
                      <p className="text-sm opacity-90">Premium Shopping</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-xl"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* User Info */}
                {user ? (
                  <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <FiUser className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold">{user.name}</h3>
                      <p className="text-sm opacity-90">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center space-x-2 bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiUser />
                    <span>Login / Register</span>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Content */}
              <div className="p-4">
                {/* Search */}
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </form>

                {/* Navigation Links */}
                <nav className="space-y-1">
                  <Link
                    to="/"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiHome className="text-blue-600" size={22} />
                    <span className="font-medium">Home</span>
                  </Link>

                  <div className="border-b border-gray-200 my-3"></div>

                  <h3 className="px-4 text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Categories
                  </h3>
                  
                  {categories.map((cat, index) => (
                    <motion.div
                      key={cat.id}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={`/products?category=${cat.id}`}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition group"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-2xl transform group-hover:scale-110 transition-transform">
                          {getCategoryIcon(cat.name)}
                        </span>
                        <span className="font-medium flex-1">{cat.name}</span>
                        <FiChevronRight className="text-gray-400 group-hover:text-blue-600" />
                      </Link>
                    </motion.div>
                  ))}

                  <Link
                    to="/categories"
                    className="flex items-center justify-center space-x-2 px-4 py-3 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>View All Categories</span>
                    <FiChevronRight />
                  </Link>

                  <div className="border-b border-gray-200 my-3"></div>

                  {/* Quick Links */}
                  <Link
                    to="/wishlist"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiHeart className="text-pink-600" size={22} />
                    <span className="font-medium">My Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="ml-auto bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/cart"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiShoppingCart className="text-orange-600" size={22} />
                    <span className="font-medium">My Cart</span>
                    {cartCount > 0 && (
                      <span className="ml-auto bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {user && (
                    <>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FiPackage className="text-green-600" size={22} />
                        <span className="font-medium">My Dashboard</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 mt-6 bg-gradient-to-r from-red-50 to-rose-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition"
                      >
                        <FiLogOut />
                        <span>Logout</span>
                      </button>
                    </>
                  )}
                </nav>

                {/* App Features */}
                <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                  <h4 className="font-bold text-gray-900 mb-3">Why Shop With Us?</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <FiTruck className="text-green-600" />
                      <span className="text-gray-700">Free Shipping over $50</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <FiStar className="text-yellow-600" />
                      <span className="text-gray-700">Premium Quality Products</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <FiTag className="text-red-600" />
                      <span className="text-gray-700">Best Price Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20 lg:h-20"></div>
    </>
  );
};

// Add missing icon component
const FiChevronRight = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`feather feather-chevron-right ${className}`}
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default UserNavbar;