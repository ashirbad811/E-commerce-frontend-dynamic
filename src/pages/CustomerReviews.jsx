import React, { useState } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight, FiCheckCircle } from 'react-icons/fi';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      rating: 5,
      comment: "The quality of these t-shirts is outstanding! The fabric is soft and durable, and the prints are vibrant. My favorite online store for custom tees!",
      date: "2 days ago",
      verified: true,
      avatarColor: "bg-pink-500"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Graphic Designer",
      rating: 5,
      comment: "As a designer, I appreciate the attention to detail. The custom printing service is excellent - colors match perfectly with my designs.",
      date: "1 week ago",
      verified: true,
      avatarColor: "bg-blue-500"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "University Student",
      rating: 4,
      comment: "Great collection and affordable prices. The delivery was faster than expected. Will definitely order again!",
      date: "3 weeks ago",
      verified: true,
      avatarColor: "bg-green-500"
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Fitness Trainer",
      rating: 5,
      comment: "Perfect for gym wear! The material breathes well and the fit is just right. Ordered 5 tees for my workouts.",
      date: "1 month ago",
      verified: true,
      avatarColor: "bg-purple-500"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Event Organizer",
      rating: 5,
      comment: "Ordered custom t-shirts for my team event. The process was smooth, and the final product exceeded expectations!",
      date: "2 months ago",
      verified: true,
      avatarColor: "bg-orange-500"
    }
  ];

  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`text-lg ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who love our premium quality t-shirts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Review Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg">
            <div className="text-5xl font-bold text-blue-600 mb-4">4.8</div>
            <div className="flex mb-4">
              {renderStars(5)}
            </div>
            <div className="text-gray-700 mb-2">Overall Rating</div>
            <div className="text-sm text-gray-500">Based on 2,458 reviews</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg">
            <div className="text-5xl font-bold text-green-600 mb-4">98%</div>
            <div className="text-gray-700 mb-2">Customer Satisfaction</div>
            <div className="text-sm text-gray-500">Would recommend to friends</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg">
            <div className="text-5xl font-bold text-purple-600 mb-4">24h</div>
            <div className="text-gray-700 mb-2">Fast Delivery</div>
            <div className="text-sm text-gray-500">Average delivery time</div>
          </div>
        </div>

        {/* Main Review Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-3xl p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Review Content */}
              <div className="flex-1">
                <div className="flex mb-6">
                  {renderStars(reviews[currentReview].rating)}
                </div>
                
                <blockquote className="text-2xl text-gray-800 mb-8 leading-relaxed">
                  "{reviews[currentReview].comment}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`${reviews[currentReview].avatarColor} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}>
                        {reviews[currentReview].name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg text-gray-900">
                            {reviews[currentReview].name}
                          </h4>
                          {reviews[currentReview].verified && (
                            <FiCheckCircle className="text-blue-500" />
                          )}
                        </div>
                        <p className="text-gray-600">{reviews[currentReview].role}</p>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {reviews[currentReview].date}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={prevReview}
                      className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center hover:scale-105"
                    >
                      <FiChevronLeft className="text-xl" />
                    </button>
                    <button
                      onClick={nextReview}
                      className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center hover:scale-105"
                    >
                      <FiChevronRight className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentReview 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Reviews Grid */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recent Reviews
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${review.avatarColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.role}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">{review.comment}</p>
                
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;