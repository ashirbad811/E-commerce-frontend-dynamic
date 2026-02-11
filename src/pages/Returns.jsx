import React from "react";

const Returns = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Return & Refund Policy</h1>

            <div className="space-y-6 text-gray-600">
                <p className="text-lg">
                    We want you to be completely satisfied with your purchase. If you're not happy, we're here to help.
                </p>

                <section className="bg-gray-50 p-6 rounded-xl">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">30-Day Money Back Guarantee</h2>
                    <p>
                        You have 30 calendar days to return an item from the date you received it.
                        To be eligible for a return, your item must be unused and in the same condition that you received it.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">Refunds</h2>
                    <p>
                        Once we receive your item, we will inspect it and notify you that we have received your returned item.
                        We will immediately notify you on the status of your refund after inspecting the item.
                        If your return is approved, we will initiate a refund to your credit card (or original method of payment).
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">Shipping</h2>
                    <p>
                        You will be responsible for paying for your own shipping costs for returning your item.
                        Shipping costs are nonrefundable.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">Contact Us</h2>
                    <p>
                        If you have any questions on how to return your item to us, contact us at <span className="font-semibold text-blue-600">support@teestore.com</span>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Returns;
