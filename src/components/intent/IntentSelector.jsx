import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { intentOptions } from "../../data/user-intent";

export default function IntentSelector() {
    const { setIntent } = useOrder();
    const [selectedIntent, setSelectedIntent] = useState("");

    const handleIntentSelect = (intentId) => {
        setSelectedIntent(intentId);
        setIntent(intentId);
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] bg-slate-800 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <p className="text-gray-100 text-xl font-bold md:text-xl">
                        How would you like to experience our cuisine today?
                    </p>
                    <p className="text-gray-300 mt-2">
                        Select your dining preference to get personalized recommendations
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {intentOptions.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleIntentSelect(option.id)}
                            className={`group relative h-80 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 transform ${selectedIntent === option.id ? "ring-4 ring-red-400 scale-[1.03]" : ""}
                            `}
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${option.image})` }}
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-500" />

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                                <div className="flex items-center justify-between group-hover:text-cyan-400 transition-colors duration-300">
                                    <div>
                                        <div className="text-4xl mb-2">{option.emoji}</div>
                                        <h3 className="text-2xl font-bold">{option.title}</h3>
                                        <p className="text-sm text-gray-200">{option.subtitle}</p>
                                    </div>

                                    {selectedIntent === option.id && (
                                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Light Sweep Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>

                {/* Confirmation Floating Box */}
                {selectedIntent && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
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
                                    onClick={() => setIntent(selectedIntent)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}