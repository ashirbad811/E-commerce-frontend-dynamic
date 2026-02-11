import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const ReviewModal = ({ isOpen, onClose, product, userId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            Swal.fire("Rating required", "Please select a star rating.", "warning");
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/reviews/${product.id}`,
                {
                    user_id: userId,
                    rating,
                    comment,
                }
            );
            Swal.fire("Success", "Review submitted successfully!", "success");
            onReviewSubmitted();
            onClose();
        } catch (error) {
            // Check if error is because it's already reviewed
            if (error.response?.data?.message?.includes("already reviewed")) {
                Swal.fire("Already Reviewed", "You have already reviewed this product.", "info");
                onClose();
            } else {
                Swal.fire(
                    "Error",
                    error.response?.data?.message || "Failed to submit review",
                    "error"
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                <h3 className="text-xl font-bold mb-4">Review {product.name}</h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating
                        </label>
                        <div className="flex gap-2 justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`text-3xl focus:outline-none transition-colors duration-200 ${star <= rating ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                >
                                    <FaStar />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Comment
                        </label>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows="4"
                            placeholder="What did you like or dislike?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-300 transition"
                    >
                        {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
