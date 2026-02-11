import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiPackage, FiTruck, FiRefreshCw, FiCreditCard, FiShield } from 'react-icons/fi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for delivery within 1-2 business days. International shipping typically takes 7-14 business days depending on the destination.",
      icon: <FiTruck className="text-blue-600 text-xl" />
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn items with original tags attached. Custom designed t-shirts cannot be returned unless there's a manufacturing defect. Refunds are processed within 5-7 business days.",
      icon: <FiRefreshCw className="text-green-600 text-xl" />
    },
    {
      question: "How do custom t-shirt designs work?",
      answer: "You can upload your design through our design tool, choose the t-shirt color and size, preview the design, and place your order. Our team reviews all designs for print quality before production.",
      icon: <FiPackage className="text-purple-600 text-xl" />
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through encrypted connections.",
      icon: <FiCreditCard className="text-orange-600 text-xl" />
    },
    {
      question: "Are your t-shirts pre-shrunk?",
      answer: "Yes, all our t-shirts are made from pre-shrunk cotton to ensure minimal shrinkage (less than 3%). We recommend washing in cold water and tumble drying on low heat for best results.",
      icon: <FiShield className="text-red-600 text-xl" />
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes! We offer special pricing for bulk orders of 25+ t-shirts. For orders over 100 pieces, we provide dedicated account management and additional customization options. Contact our sales team for quotes.",
      icon: <FiPackage className="text-yellow-600 text-xl" />
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our products, services, and policies
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {faq.icon}
                    <h3 className="text-lg font-semibold text-gray-900 text-left">
                      {faq.question}
                    </h3>
                  </div>
                  {openIndex === index ? (
                    <FiChevronUp className="text-gray-600 text-xl" />
                  ) : (
                    <FiChevronDown className="text-gray-600 text-xl" />
                  )}
                </button>
                
                <div
                  className={`px-8 overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center">
              <div className="text-3xl font-bold text-blue-600 mb-4">24/7</div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Customer Support</h4>
              <p className="text-gray-600">Live chat and email support available round the clock</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl text-center">
              <div className="text-3xl font-bold text-green-600 mb-4">30 Days</div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Easy Returns</h4>
              <p className="text-gray-600">Hassle-free return policy for your peace of mind</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl text-center">
              <div className="text-3xl font-bold text-purple-600 mb-4">100%</div>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Quality Guarantee</h4>
              <p className="text-gray-600">Premium materials with satisfaction guarantee</p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-xl mb-8 opacity-90">
                Our customer support team is here to help you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all">
                  Chat with Support
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                  Email Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;