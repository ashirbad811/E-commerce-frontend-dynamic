import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import NewArrivals from "../components/NewArrivals";
import PopularProducts from "../components/PopularProducts";
import HeroSection from "../components/HeroSection";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white">
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your products delivered quickly to your doorstep
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💯</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                Premium materials and excellent craftsmanship
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Safe and encrypted transactions for your peace of mind
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <NewArrivals />

      {/* Popular Products Section */}
      <PopularProducts />

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Exclusive Offers Waiting For You
          </h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Sign up today and get 20% off on your first purchase. Limited time
            offer!
          </p>
          {!user && (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-purple-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Join Now & Get 20% Off
            </button>
          )}
          {user && (
            <Link
              to="/shop"
              className="inline-block bg-white text-purple-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Start Shopping
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
