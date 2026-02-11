import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import RatingStars from "./RatingStars";
import Swal from "sweetalert2";

const Reviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
    const [submitting, setSubmitting] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/reviews/${productId}`
            );
            setReviews(res.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire("Please login", "You need to be logged in to review.", "warning");
            return;
        }
        if (newReview.rating === 0) {
            Swal.fire("Rating required", "Please select a star rating.", "warning");
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/reviews/${productId}`,
                {
                    user_id: user.id,
                    rating: newReview.rating,
                    comment: newReview.comment,
                }
            );
            Swal.fire("Success", "Review submitted successfully!", "success");
            setNewReview({ rating: 0, comment: "" });
            fetchReviews(); // Refresh reviews
        } catch (error) {
            Swal.fire(
                "Error",
                error.response?.data?.message || "Failed to submit review",
                "error"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>

            {/* Review Form */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Write a Review</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Rating
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                    className={`text-2xl focus:outline-none transition-colors duration-200 ${star <= newReview.rating ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                >
                                    <FaStar />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review
                        </label>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            rows="4"
                            placeholder="Share your thoughts about this product..."
                            value={newReview.comment}
                            onChange={(e) =>
                                setNewReview({ ...newReview, comment: e.target.value })
                            }
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200 font-medium"
                    >
                        {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {loading ? (
                    <p className="text-gray-500 text-center py-4">Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-4 flex flex-col items-center">
                        <span className="text-4xl mb-2">📝</span>
                        No reviews yet. Be the first to review!
                    </p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-semibold text-gray-900">{review.user_name}</p>
                                    <RatingStars rating={review.rating} />
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-700 mt-2 leading-relaxed">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviews;
