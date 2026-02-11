import React from "react";

const TermsOfService = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Terms of Service</h1>

            <div className="space-y-6 text-gray-600">
                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">1. Introduction</h2>
                    <p>
                        Welcome to TeeStore. By accessing our website, you agree to these terms and conditions.
                        Please read them carefully before using our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">2. Use of Site</h2>
                    <p>
                        You may not use our products for any illegal or unauthorized purpose nor may you,
                        in the use of the Service, violate any laws in your jurisdiction.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">3. Products and Services</h2>
                    <p>
                        We reserve the right to limit the sales of our products or services to any person,
                        geographic region, or jurisdiction. We may exercise this right on a case-by-case basis.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">4. Pricing</h2>
                    <p>
                        Prices for our products are subject to change without notice. We reserve the right at
                        any time to modify or discontinue the Service without notice at any time.
                    </p>
                </section>

                <p className="items-center mt-8 text-sm text-gray-500">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default TermsOfService;
