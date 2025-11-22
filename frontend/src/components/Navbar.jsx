import React from 'react'
import { ShoppingCart, Search } from 'lucide-react'

export default function Navbar({ cartCount = 0, onSearch }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="font-bold text-xl">FlameShop</div>
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full rounded-md border border-gray-200 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
