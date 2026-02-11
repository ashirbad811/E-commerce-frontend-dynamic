import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const SimilarProducts = ({ categoryId, currentProductId }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoryId) {
            fetchSimilarProducts();
        }
    }, [categoryId, currentProductId]);

    const fetchSimilarProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products?category_id=${categoryId}`
            );

            // Filter out current product and limit to 4 items
            const similar = response.data
                .filter((p) => p.id !== parseInt(currentProductId))
                .slice(0, 4);

            setProducts(similar);
        } catch (err) {
            console.error("Error fetching similar products:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading || products.length === 0) return null;

    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 relative inline-block">
                You May Also Like
                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-blue-600 rounded"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default SimilarProducts;
