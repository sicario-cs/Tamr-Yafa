import React from 'react';
import { ShoppingCart } from 'lucide-react';

export function ProductCard({ product, onViewDetails, onAddToCart }) {
    const { id, name, price, image, description, highlights, cacaoPercent, available = true } = product;

    return (
        <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#7A4B2A]/10">
            <button
                type="button"
                onClick={() => onViewDetails?.(id)}
                className="relative w-full aspect-square overflow-hidden"
            >
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-white text-[#5A2D0C] px-3 py-1 rounded text-sm font-medium">
                            Out of Stock
                        </span>
                    </div>
                )}
                {cacaoPercent && (
                    <span className="absolute top-3 right-3 bg-[#B8860B] text-white px-2 py-1 rounded text-xs font-medium">
                        {cacaoPercent}% pistachio
                    </span>
                )}
            </button>

            <div className="p-4">
                <button
                    type="button"
                    onClick={() => onViewDetails?.(id)}
                    className="text-left w-full mb-2"
                >
                    <h3 className="font-heading text-[#5A2D0C] mb-1 group-hover:text-[#B8860B] transition-colors">
                        {name}
                    </h3>
                    {description && (
                        <p className="text-sm text-[#7A4B2A]/70 line-clamp-2 mb-3">
                            {description}
                        </p>
                    )}
                </button>

                {highlights && highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {highlights.slice(0, 2).map((highlight, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 bg-[#7FB069]/10 text-[#7FB069] rounded"
                            >
                                {highlight}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-[#5A2D0C] font-heading text-xl">
                        ₪{price}
                    </span>
                    <button
                        type="button"
                        onClick={() => onAddToCart?.(product)}
                        disabled={!available}
                        className="flex items-center gap-1 bg-[#7A4B2A] hover:bg-[#5A2D0C] disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
