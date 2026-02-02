import React, { useState } from 'react';
import Logo from './Logo';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
    const languages = ['বাংলা', 'EN'];
    const [currentLanguage, setCurrentLanguage] = useState('বাংলা');
    const [cartCount, setCartCount] = useState(3);

    const handleLanguageChange = () => {
        const currentIndex = languages.indexOf(currentLanguage);
        const nextIndex = (currentIndex + 1) % languages.length;
        setCurrentLanguage(languages[nextIndex]);
    };




    return (
        <nav className="w-full bg-slate-900 border-b border-gray-200 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left side - Logo */}
                <div className="flex items-center">
                    <Logo />
                </div>

                {/* Right side - Language and Cart */}
                <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-4">
                    {/* Language Selector */}
                    <button
                        onClick={handleLanguageChange}
                        className="px-3 py-1 w-15 border border-gray-300 rounded-md text-sm font-medium text-white transition-colors duration-200 cursor-pointer"
                    >
                        {currentLanguage}
                    </button>

                    {/* Cart Icon */}
                    <div className="relative">
                        <button className="p-2 text-white hover:text-cyan-300 rounded-full transition-colors duration-200 cursor-pointer">
                            <ShoppingCart />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;