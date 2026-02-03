import { useState } from "react";
import { useOrder } from "../../context/OrderContext";

const intentOptions = [
    {
        id: "COUPLE",
        emoji: "❤️",
        title: "Couple Dining",
        subtitle: "Romantic table for two",
        color: "bg-red-50 border-red-200 hover:bg-red-100"
    },
    {
        id: "FRIENDS",
        emoji: "🎉",
        title: "Friends & Party",
        subtitle: "Group gatherings & celebrations",
        color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    },
    {
        id: "SNACKS",
        emoji: "☕",
        title: "Snacks & Coffee",
        subtitle: "Quick bites & beverages",
        color: "bg-amber-50 border-amber-200 hover:bg-amber-100"
    },
    {
        id: "BREAKFAST",
        emoji: "🍱",
        title: "Breakfast / Lunch",
        subtitle: "Morning & midday meals",
        color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
        id: "TAKEAWAY",
        emoji: "🥡",
        title: "Takeaway",
        subtitle: "Order to go",
        color: "bg-green-50 border-green-200 hover:bg-green-100"
    }
];

export default function IntentSelector() {
    const { setIntent } = useOrder();
    const [selectedIntent, setSelectedIntent] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    const handleIntentSelect = (intentId) => {
        setSelectedIntent(intentId);
        setIsAnimating(true);

        // Animation timeout
        setTimeout(() => {
            setIsAnimating(false);
            setIntent(intentId);
        }, 300);
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10 md:mb-16">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-1 bg-red-500 rounded-full mr-3"></div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            COOK FOOD
                        </h1>
                        <div className="w-12 h-1 bg-red-500 rounded-full ml-3"></div>
                    </div>
                    <p className="text-gray-600 text-lg md:text-xl">
                        How would you like to experience our cuisine today?
                    </p>
                    <p className="text-gray-500 mt-2">
                        Select your dining preference to get personalized recommendations
                    </p>
                </div>

                {/* Intent Selection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {intentOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleIntentSelect(option.id)}
                            className={`
                relative overflow-hidden rounded-2xl border-2 p-6 md:p-8 
                transition-all duration-300 transform hover:scale-[1.02] 
                hover:shadow-xl active:scale-[0.99]
                ${selectedIntent === option.id
                                    ? 'ring-4 ring-red-400 ring-opacity-50 shadow-lg border-red-300'
                                    : 'border-gray-200 shadow-md'
                                }
                ${option.color}
                ${isAnimating && selectedIntent === option.id ? 'animate-pulse' : ''}
              `}
                        >
                            {/* Selection Indicator */}
                            {selectedIntent === option.id && (
                                <div className="absolute top-4 right-4">
                                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {/* Emoji Container */}
                            <div className="mb-6 flex justify-center">
                                <div className="text-5xl md:text-6xl transform hover:scale-110 transition-transform duration-300">
                                    {option.emoji}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="text-center">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                                    {option.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {option.subtitle}
                                </p>

                                {/* Animated Button */}
                                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${selectedIntent === option.id
                                    ? 'bg-red-500 text-white'
                                    : 'bg-white text-gray-700 border border-gray-300'
                                    }`}>
                                    <span className="font-medium">
                                        {selectedIntent === option.id ? 'Selected' : 'Choose'}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 ${selectedIntent === option.id ? 'transform rotate-45' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    ))}
                </div>

                {/* Confirmation Section */}
                {selectedIntent && (
                    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">
                                        {intentOptions.find(o => o.id === selectedIntent)?.emoji}
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-gray-800">
                                            {intentOptions.find(o => o.id === selectedIntent)?.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {intentOptions.find(o => o.id === selectedIntent)?.subtitle}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIntent(selectedIntent);
                                        // You can add navigation or further action here
                                    }}
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                                >
                                    Confirm Selection
                                </button>
                            </div>
                            <p className="text-center text-sm text-gray-500">
                                Click confirm to proceed with your selected dining experience
                            </p>
                        </div>
                    </div>
                )}

                {/* Decorative Elements */}
                <div className="hidden lg:block">
                    <div className="absolute top-1/4 left-10 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-1/3 right-10 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* Custom Animation Styles */}
            <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
}