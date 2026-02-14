import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { foods } from "../../data/food-data";
import { useOrder } from "../../context/OrderContext";

// Taste options that users can select
const TASTE_OPTIONS = [
    { id: "mild", label: "Mild", emoji: "😊", extraPrice: 0 },
    { id: "tasty", label: "Tasty", emoji: "😋", extraPrice: 0 },
    { id: "salty", label: "Salty", emoji: "🧂", extraPrice: 10 },
    { id: "spicy", label: "Spicy", emoji: "🌶️", extraPrice: 15 },
    { id: "extra-spicy", label: "Extra Spicy", emoji: "🔥", extraPrice: 20 },
];

function ProductDetails({ language = "en" }) {
    const { id } = useParams();
    const navigate = useNavigate();

    // Product finding - check korchi ID match hocche kina
    const product = foods.find(food => food.id === id);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedTaste, setSelectedTaste] = useState(TASTE_OPTIONS[0]);
    const [quantity, setQuantity] = useState(1);

    // Debug korar jonno
    useEffect(() => {
        console.log("URL ID:", id);
        console.log("Found Product:", product);
        console.log("All Foods:", foods);
    }, [id, product]);

    if (!product) {
        return (
            <div className="h-full bg-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
                    <p className="text-gray-400 mb-4">ID: {id}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gradient-to-r from-[#079992] to-[#38ada9] text-white px-6 py-3 rounded-full font-semibold"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const handleOptionChange = (optionName, choice) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionName]: choice
        }));
    };

    const calculateTotalPrice = () => {
        let total = product.discountPrice || product.price;
        
        // Add taste extra price
        total += selectedTaste.extraPrice;
        
        // Add options extra prices
        Object.values(selectedOptions).forEach(option => {
            if (option.extraPrice) {
                total += option.extraPrice;
            }
        });
        
        return total * quantity;
    };

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className="h-full bg-slate-800 flex flex-col overflow-y-auto">
            {/* Header - Sticky */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-900 to-slate-800 px-4 md:px-6 lg:px-8 py-4 border-b border-slate-700">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                        <span className="text-white text-xl">←</span>
                    </button>
                    <h1 className="text-xl font-bold text-white">Product Details</h1>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3">
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                        {/* Left Side - Images (Sticky on large screens) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4 lg:sticky lg:top-24 lg:self-start"
                        >
                            {/* Main Image */}
                            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 h-64 md:h-80 lg:h-[500px]">
                                {product.images?.[selectedImage] ? (
                                    <img
                                        src={product.images[selectedImage]}
                                        alt={product.name[language]}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-9xl">
                                        🍽️
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Images - 5 images in a row */}
                            <div className="grid grid-cols-5 gap-2">
                                {product.images && product.images.length > 0 ? (
                                    product.images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                                                ? "border-[#079992] scale-105 shadow-lg shadow-[#079992]/50"
                                                : "border-slate-700 hover:border-slate-600"
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${product.name[language]} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))
                                ) : (
                                    // Show placeholder thumbnails if no images
                                    [...Array(5)].map((_, index) => (
                                        <div
                                            key={index}
                                            className="aspect-square rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center"
                                        >
                                            <span className="text-2xl">🍽️</span>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Tags & Badges */}
                            <div className="flex flex-wrap gap-2">
                                {product.isPopular && (
                                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                        🔥 Popular
                                    </span>
                                )}
                                {product.isRecommended && (
                                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                        ⭐ Recommended
                                    </span>
                                )}
                                {product.isAvailable ? (
                                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                        ✓ Available
                                    </span>
                                ) : (
                                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                        ✗ Out of Stock
                                    </span>
                                )}
                            </div>
                        </motion.div>

                        {/* Right Side - Details (Scrollable) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4 pb-6"
                        >
                            {/* Product Name */}
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    {product.name[language]}
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {product.description[language]}
                                </p>
                            </div>

                            {/* Rating & Prep Time */}
                            <div className="flex items-center gap-6">
                                {product.rating && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-base ${i < Math.floor(product.rating.average)
                                                        ? "text-yellow-400"
                                                        : "text-gray-600"
                                                        }`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-gray-400 text-xs">
                                            {product.rating.average} ({product.rating.count})
                                        </span>
                                    </div>
                                )}
                                {product.preparationTime && (
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <span className="text-lg">⏱️</span>
                                        <span className="text-xs">{product.preparationTime} mins</span>
                                    </div>
                                )}
                            </div>

                            {/* Price */}
                            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                                <div className="flex items-center gap-3">
                                    {product.discountPrice ? (
                                        <>
                                            <span className="text-3xl font-bold text-[#079992]">
                                                ৳{product.discountPrice}
                                            </span>
                                            <span className="text-xl text-gray-500 line-through">
                                                ৳{product.price}
                                            </span>
                                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-3xl font-bold text-[#079992]">
                                            ৳{product.price}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Taste Options */}
                            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                                <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                                    <span className="text-lg">👅</span>
                                    Choose Your Taste
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {TASTE_OPTIONS.map((taste) => (
                                        <button
                                            key={taste.id}
                                            onClick={() => setSelectedTaste(taste)}
                                            className={`px-3 py-2 rounded-lg border-2 transition-all duration-300 ${selectedTaste.id === taste.id
                                                ? "border-[#079992] bg-[#079992]/10 text-white scale-105"
                                                : "border-slate-700 bg-slate-800 text-gray-400 hover:border-slate-600"
                                                }`}
                                        >
                                            <div className="text-xl mb-1">{taste.emoji}</div>
                                            <div className="text-xs font-semibold">{taste.label}</div>
                                            {taste.extraPrice > 0 && (
                                                <div className="text-[10px] text-[#82ccdd] mt-1">
                                                    +৳{taste.extraPrice}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Product Options (Size, etc.) */}
                            {product.options && product.options.length > 0 && (
                                <div className="space-y-3">
                                    {product.options.map((option, index) => (
                                        <div key={index} className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                                            <div className="flex items-center gap-2 mb-3">
                                                <h3 className="text-white font-semibold text-sm">
                                                    {option.name}
                                                </h3>
                                                {option.required && (
                                                    <span className="text-red-400 text-xs">*Required</span>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {option.choices.map((choice, choiceIndex) => (
                                                    <button
                                                        key={choiceIndex}
                                                        onClick={() => handleOptionChange(option.name, choice)}
                                                        className={`p-3 rounded-lg border-2 transition-all duration-300 ${selectedOptions[option.name]?.label === choice.label
                                                            ? "border-[#079992] bg-[#079992]/10 text-white"
                                                            : "border-slate-700 bg-slate-800 text-gray-400 hover:border-slate-600"
                                                            }`}
                                                    >
                                                        <div className="font-semibold text-sm">{choice.label}</div>
                                                        {choice.extraPrice > 0 && (
                                                            <div className="text-xs text-[#82ccdd] mt-1">
                                                                +৳{choice.extraPrice}
                                                            </div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                                <h3 className="text-white font-semibold mb-3 text-sm">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleQuantityChange('decrease')}
                                        disabled={quantity <= 1}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-300 ${
                                            quantity <= 1 
                                                ? 'bg-slate-800 text-gray-600 cursor-not-allowed' 
                                                : 'bg-slate-700 hover:bg-slate-600'
                                        }`}
                                    >
                                        −
                                    </button>
                                    <span className="text-xl font-bold text-white w-12 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange('increase')}
                                        className="w-10 h-10 bg-gradient-to-r from-[#079992] to-[#38ada9] hover:shadow-lg hover:shadow-[#60a3bc]/50 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Total Price & Add to Cart */}
                            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-5 border border-slate-700 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">Total Price</p>
                                        <p className="text-3xl font-bold text-[#079992]">
                                            ৳{calculateTotalPrice()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-400 text-xs">Quantity</p>
                                        <p className="text-lg font-semibold text-white">{quantity} item(s)</p>
                                    </div>
                                </div>

                                <button
                                    disabled={!product.isAvailable}
                                    className={`w-full py-3 rounded-xl font-bold text-base transition-all duration-300 ${product.isAvailable
                                        ? "bg-gradient-to-r from-[#079992] to-[#38ada9] hover:shadow-lg hover:shadow-[#60a3bc]/50 text-white hover:scale-105 cursor-pointer"
                                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    {product.isAvailable ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="text-xl">🛒</span>
                                            Add to Cart
                                        </span>
                                    ) : (
                                        "Out of Stock"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;