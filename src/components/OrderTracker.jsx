import React from "react";
import { FaClipboardList, FaBox, FaShippingFast, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const OrderTracker = ({ status }) => {
    const steps = [
        { id: "pending", label: "Order Placed", icon: FaClipboardList },
        { id: "confirmed", label: "Confirmed", icon: FaBox },
        { id: "shipped", label: "Shipped", icon: FaShippingFast },
        { id: "delivered", label: "Delivered", icon: FaCheckCircle },
    ];

    if (status === "cancelled") {
        return (
            <div className="flex items-center justify-center p-4 bg-red-50 text-red-600 rounded-lg">
                <FaTimesCircle className="text-2xl mr-2" />
                <span className="font-bold">This order has been cancelled</span>
            </div>
        );
    }

    // Determine current step index
    const getCurrentStep = () => {
        switch (status) {
            case "pending": return 0;
            case "confirmed": return 1;
            case "shipped": return 2;
            case "delivered": return 3;
            default: return 0;
        }
    };

    const currentStep = getCurrentStep();

    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative">
                {/* Progress Bar Background */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>

                {/* Active Progress Bar */}
                <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-green-500 -z-10 transition-all duration-500"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 border-4 transition-all duration-300 ${isActive
                                        ? "bg-green-500 border-green-500 text-white scale-110"
                                        : "bg-white border-gray-300 text-gray-400"
                                    }`}
                            >
                                <Icon size={16} />
                            </div>
                            <span className={`mt-2 text-xs md:text-sm font-semibold ${isActive ? "text-green-600" : "text-gray-400"}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderTracker;
