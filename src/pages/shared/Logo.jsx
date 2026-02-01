import React from 'react';
import logoImg from '../../assets/cooking.png'
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to={'/'} className="flex items-center space-x-2">
            {/* icon */}
            <img className='w-10 h-10 object-cover' src={logoImg} alt="logo-img" />

            {/* text logo */}
            <div className="font-bold text-4xl">
                <span className="text-gray-100">Food</span>
                <span className="text-[#7efff5]">Order</span>
            </div>
        </Link>
    );
};

export default Logo;