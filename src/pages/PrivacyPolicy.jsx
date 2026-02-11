import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Privacy Policy</h1>

            <div className="space-y-6 text-gray-600">
                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, such as when you create an account,
                        update your profile, make a purchase, or communicate with us.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to operate, maintain, and provide the features and
                        functionality of the Service, to process and complete transactions, and to send you
                        related information.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">3. Sharing of Information</h2>
                    <p>
                        We do not share your personal information with third parties without your consent,
                        except as described in this policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">4. Creating Account</h2>
                    <p>
                        Your account information is password-protected for your privacy and security.
                        You are responsible for maintaining the confidentiality of your password and account.
                    </p>
                </section>

                <p className="items-center mt-8 text-sm text-gray-500">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
