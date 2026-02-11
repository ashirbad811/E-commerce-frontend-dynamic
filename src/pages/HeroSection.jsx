import React from 'react';
import { FiShoppingBag, FiStar, FiTruck, FiShield } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Wear Your <span className="text-yellow-300">Style</span> With Premium T-Shirts
            </h1>
            <p className="text-xl text-blue-800 mb-8">
              Discover custom-designed t-shirts that express your personality. 
              High-quality fabrics, unique designs, and unbeatable comfort.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                <FiShoppingBag className="inline mr-2" />
                Shop Now
              </button>
              <button className="bg-transparent border-2 border-white text-blue-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Custom Design
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12">
              <div className="flex items-center">
                <FiStar className="text-yellow-400 text-2xl mr-2" />
                <div>
                  <div className="text-2xl font-bold text-white">4.8/5</div>
                  <div className="text-blue-200">Customer Rating</div>
                </div>
              </div>
              <div className="flex items-center">
                <FiTruck className="text-white text-2xl mr-2" />
                <div>
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-blue-200">Shipping</div>
                </div>
              </div>
              <div className="flex items-center">
                <FiShield className="text-white text-2xl mr-2" />
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-blue-200">Quality Guarantee</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-pink-500 to-orange-500 rounded-full flex items-center justify-center transform rotate-12">
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-2">50% OFF</div>
                    <div className="text-xl">Summer Collection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,170.7C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;