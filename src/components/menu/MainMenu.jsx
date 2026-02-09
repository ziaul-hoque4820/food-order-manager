import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { foods } from "../../data/food-data";
import { useOrder } from "../../context/OrderContext";
import { intentOptions } from "../../data/user-intent";
import { useNavigate } from "react-router-dom";

const CATEGORY_TABS = [
    { key: "starter", label: "🥗 Starter", icon: "🥗" },
    { key: "main", label: "🍛 Main Course", icon: "🍛" },
    { key: "dessert", label: "🍰 Dessert", icon: "🍰" },
    { key: "drinks", label: "🥤 Drinks", icon: "🥤" },
    { key: "breakfast", label: "🍳 Breakfast", icon: "🍳" },
];

function MainMenu({ language = "en" }) {
    const { intent } = useOrder();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("drinks");

    const intentData = intentOptions.find(option => option.id === intent);

    const filteredFoods = useMemo(() => {
        return foods.filter(
            (food) => food.category === activeCategory && food.isAvailable
        );
    }, [activeCategory]);

    return (
        <div className="h-full bg-slate-800 flex flex-col overflow-hidden">
            {/* Intent Banner - Fixed */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 md:px-6 lg:px-8 py-5 border-b border-slate-700 flex-shrink-0">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">{intentData?.emoji}</span>
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                {intentData?.title}
                            </h2>
                            <p className="text-sm text-gray-400">{intentData?.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Tabs - Fixed */}
            <div className="bg-slate-900 px-4 md:px-6 lg:px-8 py-4 border-b border-slate-700 flex-shrink-0 scrollbar-hide">
                <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto scrollbar-hide">
                    {CATEGORY_TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveCategory(tab.key)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${activeCategory === tab.key
                                ? "bg-gradient-to-r from-[#079992] to-[#38ada9] text-white shadow-lg shadow-[#60a3bc]/50 scale-105"
                                : "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Food Grid - Scrollable */}
            <div className="flex-1 overflow-y-auto scrollbar-hide px-4 md:px-6 lg:px-8 py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-32">
                        {filteredFoods.map((food, index) => (
                            <motion.div
                                key={food.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate(`/product/${food.id}`)}
                                className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700 hover:border-[#079992] transition-all duration-300 group"
                            >
                                {/* Image Container */}
                                <div className="relative h-40 bg-slate-800 overflow-hidden">
                                    {food.images?.[0] ? (
                                        <img
                                            src={food.images[0]}
                                            alt={food.name[language]}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-6xl">
                                            🍽️
                                        </div>
                                    )}
                                    {/* Availability Badge */}
                                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        Available
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-bold text-white text-base mb-1 line-clamp-1">
                                        {food.name[language]}
                                    </h3>
                                    <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                                        {food.description[language]}
                                    </p>

                                    {/* Price and Add Button */}
                                    <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                                        <div>
                                            <p className="text-xs text-gray-500">Price</p>
                                            <span className="font-bold text-[#82ccdd] text-lg">
                                                ৳{food.price}
                                            </span>
                                        </div>
                                        <button
                                            className="bg-gradient-to-r from-[#079992] to-[#38ada9] hover:from-[#079992] hover:to-[#38ada9] text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#60a3bc]/50 hover:scale-105 cursor-pointer"
                                        >
                                            + Add
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Cart Summary - Fixed */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="fixed bottom-20 md:bottom-13 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4 z-50"
            >
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-5 backdrop-blur-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#079992] to-[#38ada9] rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white text-2xl">🛒</span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Your Cart</p>
                                <p className="font-bold text-white text-lg">
                                    0 items · <span className="text-[#079992">৳0</span>
                                </p>
                            </div>
                        </div>
                        <button className="bg-gradient-to-r from-[#079992] to-[#38ada9] hover:from-[#079992] hover:to-[#38ada9] text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-[#60a3bc]/50 hover:scale-105 cursor-pointer">
                            View Cart →
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default MainMenu;