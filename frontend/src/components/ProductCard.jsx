import React from 'react'
import { Star } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden bg-gray-100">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400">No image</div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <span className="font-semibold">${product.price?.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4" />
            <Star className="w-4 h-4" />
          </div>
          <button
            onClick={() => onAdd?.(product)}
            className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
