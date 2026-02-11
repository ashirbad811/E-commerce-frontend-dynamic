import React from "react";

const ShippingPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Shipping Policy</h1>

            <div className="space-y-8 text-gray-600">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h2 className="text-xl font-bold text-blue-800 mb-2">Free Shipping</h2>
                    <p>We offer free standard shipping on all orders over $50 within the country.</p>
                </div>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">1. Processing Time</h2>
                    <p>
                        All orders are processed within 1–3 business days. Orders are not shipped or delivered on weekends or holidays.
                        If we are experiencing a high volume of orders, shipments may be delayed by a few days.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">2. Shipping Rates & Delivery Estimates</h2>
                    <p className="mb-4">
                        Shipping charges for your order will be calculated and displayed at checkout.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border-b text-left">Shipping Method</th>
                                    <th className="py-2 px-4 border-b text-left">Estimated Delivery Time</th>
                                    <th className="py-2 px-4 border-b text-left">Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-b">Standard</td>
                                    <td className="py-2 px-4 border-b">3-5 business days</td>
                                    <td className="py-2 px-4 border-b">$4.99</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b">Express</td>
                                    <td className="py-2 px-4 border-b">1-2 business days</td>
                                    <td className="py-2 px-4 border-b">$14.95</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">3. Shipment Confirmation & Order Tracking</h2>
                    <p>
                        You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s).
                        The tracking number will be active within 24 hours.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ShippingPolicy;
