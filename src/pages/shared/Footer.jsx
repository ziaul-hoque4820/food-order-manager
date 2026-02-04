import React from 'react'

function Footer() {
    return (
        <footer className="w-full bg-slate-900 border-t border-gray-700 py-4 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                <div className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} <span className="text-orange-500 font-semibold">CookFood</span>. All rights reserved.
                </div>

                <div className="flex space-x-6 text-sm text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-gray-400">System Online</span>
                </div>

            </div>
        </footer>
    )
}

export default Footer