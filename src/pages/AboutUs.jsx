import React from "react";

const AboutUs = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">About TeeStore</h1>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                <div className="h-64 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <h2 className="text-white text-5xl font-bold">Our Story</h2>
                </div>
                <div className="p-8 space-y-6 text-gray-600 leading-relaxed">
                    <p>
                        Founded in 2023, TeeStore began with a simple mission: to provide high-quality,
                        custom-designed t-shirts that allow people to express their unique personalities.
                        What started as a small garage operation has grown into a beloved brand serving
                        customers worldwide.
                    </p>
                    <p>
                        We believe that clothing is more than just fabric—it's a canvas for self-expression.
                        That's why we partner with talented artists and use only the finest materials
                        to ensure that every piece you buy from us is something you'll love to wear.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-blue-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🚀</div>
                    <h3 className="font-bold text-xl mb-2">Our Mission</h3>
                    <p className="text-gray-600">To inspire confidence and creativity through fashion.</p>
                </div>
                <div className="p-6 bg-indigo-50 rounded-xl">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⭐</div>
                    <h3 className="font-bold text-xl mb-2">Our Quality</h3>
                    <p className="text-gray-600">Premium materials that stand the test of time.</p>
                </div>
                <div className="p-6 bg-purple-50 rounded-xl">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🌍</div>
                    <h3 className="font-bold text-xl mb-2">Sustainability</h3>
                    <p className="text-gray-600">Committed to eco-friendly production practices.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
