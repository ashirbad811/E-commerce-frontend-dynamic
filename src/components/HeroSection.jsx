import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            title: "New Season Arrivals",
            subtitle: "Check out all the trends",
            color: "bg-blue-600",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            title: "Premium Tees Collection",
            subtitle: "Comfort meets style",
            color: "bg-purple-600",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1555529771-83ae9289205f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            title: "Exclusive Offers",
            subtitle: "Up to 50% off select items",
            color: "bg-pink-600",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[600px] w-full overflow-hidden bg-gray-900 text-white">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="text-center px-4 max-w-4xl mx-auto">
                            <p className="text-xl md:text-2xl mb-4 font-light tracking-wider uppercase animate-fade-in-down">
                                {slide.subtitle}
                            </p>
                            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in-up">
                                {slide.title}
                            </h1>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-2xl animate-bounce-slow"
                            >
                                Shop Now <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;
