import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiShoppingCart, FiHeart } from 'react-icons/fi';

const ImageSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Summer Collection 2024",
      description: "Fresh designs for the sunny days ahead",
      color: "from-blue-400 to-cyan-400",
      discount: "30% OFF",
      imageColor: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Premium Cotton Tees",
      description: "Ultra-soft 100% cotton fabric",
      color: "from-purple-500 to-pink-500",
      discount: "BUY 2 GET 1 FREE",
      imageColor: "bg-gradient-to-r from-purple-600 to-pink-600"
    },
    {
      id: 3,
      title: "Custom Design Your Own",
      description: "Upload your design and create unique t-shirts",
      color: "from-orange-500 to-red-500",
      discount: "FREE SHIPPING",
      imageColor: "bg-gradient-to-r from-orange-600 to-red-600"
    },
    {
      id: 4,
      title: "Limited Edition",
      description: "Exclusive designs available for a short time",
      color: "from-green-500 to-teal-500",
      discount: "LIMITED STOCK",
      imageColor: "bg-gradient-to-r from-green-600 to-teal-600"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Featured Collections
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="w-full flex-shrink-0"
                >
                  <div className={`h-[500px] md:h-[600px] relative ${slide.color} flex items-center`}>
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full"></div>
                      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full"></div>
                    </div>
                    
                    <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
                      {/* Text Content */}
                      <div className="md:w-1/2 text-white mb-10 md:mb-0">
                        <div className="bg-white/20 backdrop-blur-sm inline-block px-6 py-2 rounded-full mb-6">
                          <span className="font-bold text-lg">{slide.discount}</span>
                        </div>
                        <h3 className="text-5xl font-bold mb-6 leading-tight">{slide.title}</h3>
                        <p className="text-xl mb-8 opacity-90">{slide.description}</p>
                        <div className="flex gap-4">
                          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all flex items-center">
                            <FiShoppingCart className="mr-2" />
                            Shop Collection
                          </button>
                          <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all flex items-center">
                            <FiHeart className="mr-2" />
                            Add to Wishlist
                          </button>
                        </div>
                      </div>

                      {/* Image/Graphic */}
                      <div className="md:w-1/2 flex justify-center">
                        <div className={`${slide.imageColor} w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center transform rotate-12 shadow-2xl`}>
                          <div className="text-center text-white transform -rotate-12">
                            <div className="text-6xl font-bold mb-4">T</div>
                            <div className="text-2xl font-bold">TeeStore</div>
                            <div className="text-lg">Premium Quality</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          >
            <FiChevronRight className="text-2xl" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;