import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CartPage({ language = "en" }) {
    const navigate = useNavigate();

    // Dummy cart data for design
    const [cartItems] = useState([
        {
            id: "food_001",
            name: { en: "Chicken Alfredo Pasta", bn: "চিকেন আলফ্রেডো পাস্তা" },
            description: { en: "Creamy pasta with grilled chicken", bn: "গ্রিল করা চিকেন দিয়ে তৈরি ক্রিমি পাস্তা" },
            price: 420,
            discountPrice: 380,
            images: ["/images/foods/pasta1.jpg"],
            quantity: 2,
            selectedOptions: { size: "Large", taste: "Spicy" },
            optionPrice: 80,
            tastePrice: 15
        },
        {
            id: "food_002",
            name: { en: "Beef Steak", bn: "বিফ স্টেক" },
            description: { en: "Juicy grilled beef steak", bn: "রসালো গ্রিল করা বিফ স্টেক" },
            price: 850,
            images: ["/images/foods/steak.jpg"],
            quantity: 1,
            selectedOptions: { taste: "Mild" },
            optionPrice: 0,
            tastePrice: 0
        },
        {
            id: "food_003",
            name: { en: "Margherita Pizza", bn: "মার্গারিটা পিজা" },
            description: { en: "Classic Italian pizza", bn: "ক্লাসিক ইতালিয়ান পিজা" },
            price: 650,
            discountPrice: 580,
            images: ["/images/foods/pizza.jpg"],
            quantity: 1,
            selectedOptions: { size: "Large", taste: "Tasty" },
            optionPrice: 100,
            tastePrice: 0
        },
        {
            id: "food_004",
            name: { en: "Burger Deluxe", bn: "বার্গার ডিলাক্স" },
            description: { en: "Double patty burger with cheese", bn: "ডাবল প্যাটি বার্গার পনির সহ" },
            price: 450,
            discountPrice: 400,
            images: ["/images/foods/burger.jpg"],
            quantity: 3,
            selectedOptions: { size: "Large", taste: "Spicy" },
            optionPrice: 50,
            tastePrice: 15
        },
        {
            id: "food_005",
            name: { en: "Caesar Salad", bn: "সিজার সালাদ" },
            description: { en: "Fresh caesar salad with chicken", bn: "তাজা সিজার সালাদ চিকেন সহ" },
            price: 320,
            images: ["/images/foods/salad.jpg"],
            quantity: 1,
            selectedOptions: { taste: "Mild" },
            optionPrice: 0,
            tastePrice: 0
        },
    ]);

    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => {
        const itemPrice = item.discountPrice || item.price;
        return total + ((itemPrice + item.optionPrice + item.tastePrice) * item.quantity);
    }, 0);

    const deliveryFee = 60;
    const discount = 50;
    const totalAmount = subtotal + deliveryFee - discount;

    return (
        <div className="h-full bg-slate-800 flex flex-col overflow-y-auto">
            {/* Header - Sticky */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-900 to-slate-800 px-4 md:px-6 lg:px-8 py-4 border-b border-slate-700">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-all duration-300"
                        >
                            <span className="text-white text-xl">←</span>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-white">Shopping Cart</h1>
                            <p className="text-xs text-gray-400">{cartItems.length} items</p>
                        </div>
                    </div>
                    <button className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors">
                        Clear Cart
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                        

                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;