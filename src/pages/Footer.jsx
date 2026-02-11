// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
// import { FaTshirt } from 'react-icons/fa';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gray-900 text-white pt-16 pb-8">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
//           {/* Brand Column */}
//           <div>
//             <img src="/logo.png" alt="TrendHive" className="h-12" />
//             <p className="text-gray-400 mb-6">
//               Premium custom t-shirts with exceptional quality and unique designs.
//               Wear your style with confidence.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
//                 <FiFacebook className="text-xl" />
//               </a>
//               <a href="#" className="bg-gray-800 hover:bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
//                 <FiTwitter className="text-xl" />
//               </a>
//               <a href="#" className="bg-gray-800 hover:bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
//                 <FiInstagram className="text-xl" />
//               </a>
//               <a href="#" className="bg-gray-800 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
//                 <FiLinkedin className="text-xl" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-xl font-bold mb-6">Quick Links</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link to="/" className="text-gray-400 hover:text-white transition-colors">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
//                   All Products
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="text-xl font-bold mb-6">Support</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
//                   FAQ
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
//                   Shipping Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
//                   Return & Refund
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
//                   Help Center
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-xl font-bold mb-6">Contact Info</h3>
//             <div className="space-y-4">
//               <div className="flex items-start space-x-3">
//                 <FiMapPin className="text-blue-400 mt-1" />
//                 <span className="text-gray-400">
//                   Bhubaneswar , Odisha<br />
//                   752024
//                 </span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <FiPhone className="text-blue-400" />
//                 <span className="text-gray-400">+91 9078496654</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <FiMail className="text-blue-400" />
//                 <span className="text-gray-400">support@trendhive.com</span>
//               </div>
//             </div>

//             {/* Newsletter */}
//             <div className="mt-8">
//               <h4 className="font-bold mb-4">Stay Updated</h4>
//               <div className="flex">
//                 <input
//                   type="email"
//                   placeholder="Your email"
//                   className="bg-gray-800 text-white px-4 py-3 rounded-l-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg font-bold transition-colors">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="text-center pt-8 border-t border-gray-800">
//           <p className="text-gray-400">
//             &copy; {currentYear} TrendHive. All rights reserved. |
//             <Link to="/privacy" className="text-blue-400 hover:text-blue-300 ml-2">Privacy Policy</Link> |
//             <Link to="/terms" className="text-blue-400 hover:text-blue-300 ml-2">Terms of Service</Link>
//           </p>
//           <p className="text-gray-500 text-sm mt-2">
//             Designed with ❤️ for t-shirt lovers everywhere
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiChevronRight,
  FiSend,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiCreditCard,
  FiHeart,
  FiHelpCircle,
  FiShoppingBag,
  FiStar
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Thanks for subscribing! You will receive updates and exclusive offers.');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const socialLinks = [
    { icon: <FiFacebook />, color: 'hover:bg-blue-600', href: '#', label: 'Facebook' },
    { icon: <FiTwitter />, color: 'hover:bg-blue-400', href: '#', label: 'Twitter' },
    { icon: <FiInstagram />, color: 'hover:bg-gradient-to-r from-pink-600 to-purple-600', href: '#', label: 'Instagram' },
    { icon: <FiLinkedin />, color: 'hover:bg-blue-700', href: '#', label: 'LinkedIn' },
    { icon: <FiMail />, color: 'hover:bg-red-500', href: '#', label: 'Email' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'New Arrivals', path: '/products?new=true' },
    { name: 'Best Sellers', path: '/products?best=true' },
    { name: 'Sales & Deals', path: '/products?sale=true' },
    { name: 'Custom Design', path: '/custom' }
  ];

  const customerLinks = [
    { name: 'My Account', path: '/dashboard' },
    { name: 'Order Tracking', path: '/track-order' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'Size Guide', path: '/size-guide' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Contact Support', path: '/contact' }
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Press', path: '/press' },
    { name: 'Store Locator', path: '/stores' },
    { name: 'Affiliate Program', path: '/affiliate' }
  ];

  const policies = [
    { name: 'Shipping Policy', path: '/shipping' },
    { name: 'Return Policy', path: '/returns' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' }
  ];

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-12 overflow-hidden"
    >
      {/* Top Pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      {/* Floating Elements */}
      <div className="absolute -top-10 left-10 opacity-10">
        <div className="text-6xl">🛍️</div>
      </div>
      <div className="absolute top-20 right-20 opacity-10">
        <div className="text-5xl">👕</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Brand & Newsletter */}
          <div>
            <div className="mb-8">
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-3 mb-6"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                  <FiShoppingBag className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    TrendHive
                  </h2>
                  <p className="text-gray-400 text-sm">Premium Fashion Destination</p>
                </div>
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className="text-gray-400 text-lg mb-8 max-w-xl"
              >
                Where style meets innovation. Discover curated collections, 
                exclusive designs, and premium quality that redefines your 
                fashion experience.
              </motion.p>
            </div>

            {/* Newsletter */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl">
                  <FiSend className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Join Our Style Tribe</h3>
                  <p className="text-gray-400">
                    Subscribe for exclusive offers, style tips, and early access to new collections
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubscribing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubscribing ? (
                      <span className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        ></motion.div>
                        Subscribing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Subscribe
                        <FiChevronRight className="ml-2" />
                      </span>
                    )}
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
              </form>
            </motion.div>
          </div>

          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <span>Shop</span>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white flex items-center space-x-2 group transition-all"
                    >
                      <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" size={16} />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Service */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                <span>Support</span>
              </h4>
              <ul className="space-y-3">
                {customerLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white flex items-center space-x-2 group transition-all"
                    >
                      <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400" size={16} />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <span>Company</span>
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white flex items-center space-x-2 group transition-all"
                    >
                      <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" size={16} />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Policies */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                <span>Policies</span>
              </h4>
              <ul className="space-y-3">
                {policies.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white flex items-center space-x-2 group transition-all"
                    >
                      <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-400" size={16} />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-12"
        >
          <h4 className="text-xl font-bold text-center mb-8">Why Shop With Confidence?</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <FiShield className="text-green-400" size={28} />,
                title: "Secure Payment",
                desc: "256-bit SSL encryption"
              },
              {
                icon: <FiTruck className="text-blue-400" size={28} />,
                title: "Free Shipping",
                desc: "On orders over $50"
              },
              {
                icon: <FiRefreshCw className="text-purple-400" size={28} />,
                title: "30-Day Returns",
                desc: "Hassle-free returns"
              },
              {
                icon: <FiHelpCircle className="text-yellow-400" size={28} />,
                title: "24/7 Support",
                desc: "Always here to help"
              }
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-4 hover:bg-gray-800/30 rounded-xl transition-all"
              >
                <div className="inline-flex p-3 bg-gray-800/50 rounded-xl mb-3">
                  {badge.icon}
                </div>
                <h5 className="font-bold mb-1">{badge.title}</h5>
                <p className="text-sm text-gray-400">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact & Social */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
          >
            <h4 className="text-xl font-bold mb-6">Get in Touch</h4>
            <div className="space-y-6">
              {[
                {
                  icon: <FiMapPin className="text-blue-400" size={24} />,
                  title: "Visit Us",
                  info: "Bhubaneswar, Odisha 752024",
                  sub: "Open Mon-Sat, 9AM-8PM"
                },
                {
                  icon: <FiPhone className="text-green-400" size={24} />,
                  title: "Call Us",
                  info: "+91 9078496654",
                  sub: "24/7 Customer Support"
                },
                {
                  icon: <FiMail className="text-yellow-400" size={24} />,
                  title: "Email Us",
                  info: "support@trendhive.com",
                  sub: "Response within 24 hours"
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 group hover:bg-gray-800/30 p-3 rounded-xl transition-all"
                >
                  <div className="p-3 bg-gray-800/50 rounded-xl group-hover:scale-110 transition-transform">
                    {contact.icon}
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">{contact.title}</h5>
                    <p className="text-gray-300">{contact.info}</p>
                    <p className="text-sm text-gray-500">{contact.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
          >
            <h4 className="text-xl font-bold mb-6">Connect With Us</h4>
            <p className="text-gray-400 mb-8">
              Follow us on social media for daily style inspiration, 
              behind-the-scenes content, and exclusive announcements.
            </p>
            
            <div className="grid grid-cols-5 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`bg-gray-800/50 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${social.color} group relative`}
                  aria-label={social.label}
                >
                  <span className="text-xl">{social.icon}</span>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {social.label}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* App Download */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h5 className="font-bold mb-4">Download Our App</h5>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-black hover:bg-gray-900 px-4 py-3 rounded-xl transition-all"
                >
                  <FiShoppingBag />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-black hover:bg-gray-900 px-4 py-3 rounded-xl transition-all"
                >
                  <FiShoppingBag />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                &copy; {currentYear} <span className="text-white font-bold">TrendHive</span>. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Crafted with <FiHeart className="inline text-red-500" /> for fashion enthusiasts worldwide
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <div className="text-gray-400 text-sm">Accepted Payments:</div>
              <div className="flex space-x-2">
                {['💳', '💰', '🏦', '💲', '💎'].map((icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="text-xl bg-gray-800/50 p-2 rounded-lg"
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Back to Top */}
            <motion.button
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
            >
              <FiChevronRight className="rotate-270" />
              <span>Back to Top</span>
            </motion.button>
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-8 pt-8 border-t border-gray-800">
          {[
            { text: "🔒 SSL Secure", color: "text-green-400" },
            { text: "⭐ 4.8/5 Rating", color: "text-yellow-400" },
            { text: "🚚 Free Shipping", color: "text-blue-400" },
            { text: "🔄 Easy Returns", color: "text-purple-400" },
            { text: "👑 Premium Quality", color: "text-pink-400" }
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2 text-sm"
            >
              <span className={`font-bold ${badge.color}`}>{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div> */}
    </motion.footer>
  );
};

// Rotate icon for back to top button
const Rotate270 = ({ size = 20, className = "" }) => (
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
    className={`transform rotate-270 ${className}`}
    style={{ transform: 'rotate(270deg)' }}
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

// Replace FiChevronRight with Rotate270 in the back to top button
const FiChevronRightRotated = Rotate270;

export default Footer;