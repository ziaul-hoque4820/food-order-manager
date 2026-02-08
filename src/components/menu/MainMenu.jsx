import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { foods } from "../../data/food-data";
import { useOrder } from "../../context/OrderContext";
import { intentOptions } from "../../data/user-intent";

const CATEGORY_TABS = [
    { key: "starter", label: "Starter" },
    { key: "main", label: "Main" },
    { key: "dessert", label: "Dessert" },
    { key: "drinks", label: "Drinks" },
    { key: "breakfast", label: "Breakfast" },
];

function MainMenu({ language = "en" }) {
    const { intent } = useOrder();
    const [activeCategory, setActiveCategory] = useState("drinks");
    const [cartCount, setCartCount] = useState(2);
    const [cartTotal, setCartTotal] = useState(450);

    console.log(intent);

    const intentData = intentOptions.find(option => option.id === intent);
    console.log(intentData);
    
    

    const filteredFoods = useMemo(() => {
        return foods.filter(
            (food) => food.category === activeCategory && food.isAvailable
        );
    }, [activeCategory]);

    return (
        <div className="min-h-screen bg-neutral-100 relative">
            {/* Intent Banner */}
            <div className="bg-white px-6 py-4 border-b">
                <h2 className="text-2xl font-semibold text-gray-800">
                    {intentData.emoji} {intentData.title}
                </h2>
                <p className="text-sm text-gray-500">{intentData.subtitle}</p>
                <p className="text-sm text-gray-500">Choose your favorite items</p>
            </div>

            {/* Category Tabs */}
            <div className="bg-white px-4 py-3 flex gap-3 overflow-x-auto border-b">
                {CATEGORY_TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveCategory(tab.key)}
                        className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${activeCategory === tab.key
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Food Grid */}
            <div className="p-5 grid grid-cols-2 gap-4 pb-28">
                {filteredFoods.map((food) => (
                    <motion.div
                        key={food.id}
                        whileTap={{ scale: 0.96 }}
                        className="bg-white rounded-2xl shadow-sm overflow-hidden"
                    >
                        <div className="h-28 bg-gray-200">
                            {food.images?.[0] && (
                                <img
                                    src={food.images[0]}
                                    alt={food.name[language]}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        <div className="p-3">
                            <h3 className="font-semibold text-gray-800 text-sm">
                                {food.name[language]}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2">
                                {food.description[language]}
                            </p>

                            <div className="flex items-center justify-between mt-3">
                                <span className="font-semibold text-gray-900">৳{food.price}</span>
                                <button
                                    onClick={() => {
                                        setCartCount((c) => c + 1);
                                        setCartTotal((t) => t + food.price);
                                    }}
                                    className="bg-black text-white text-xs px-3 py-1.5 rounded-full"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Floating Cart Summary */}
            <motion.div
                initial={{ y: 80 }}
                animate={{ y: 0 }}
                className="fixed bottom-4 left-4 right-4 bg-black text-white rounded-2xl px-5 py-3 flex items-center justify-between shadow-lg"
            >
                <div className="text-sm">
                    <span className="font-medium">{cartCount} items</span> · ৳{cartTotal}
                </div>
                <button className="text-sm font-semibold underline">View Cart</button>
            </motion.div>
        </div>
    );
}

export default MainMenu;