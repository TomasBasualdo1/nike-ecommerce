'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingCart, Heart } from 'lucide-react';

export interface CardProps {
  id: string;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  inStock?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviewCount?: number;
  href?: string;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
  variant?: 'default' | 'compact' | 'featured';
}

export default function Card({
  id,
  title,
  description,
  price,
  originalPrice,
  image,
  category,
  inStock = true,
  isNew = false,
  isSale = false,
  rating,
  reviewCount,
  href,
  onAddToCart,
  onAddToWishlist,
  variant = 'default',
}: CardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id,
      name: title,
      price,
      image,
    });
    onAddToCart?.();
  };

  const handleAddToWishlist = () => {
    onAddToWishlist?.();
  };

  const CardContent = () => (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              NEW
            </span>
          )}
          {isSale && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4 text-dark-900" />
        </button>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="w-full bg-white text-dark-900 py-2 px-4 rounded-md font-medium hover:bg-light-200 disabled:bg-light-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {category && (
          <p className="text-dark-500 text-sm font-medium mb-1">{category}</p>
        )}

        {/* Title */}
        <h3 className="text-dark-900 font-medium mb-2 line-clamp-2 group-hover:text-dark-700 transition-colors duration-200">
          {title}
        </h3>

        {/* Description - only show in featured variant */}
        {variant === 'featured' && description && (
          <p className="text-dark-500 text-sm mb-3 line-clamp-2">{description}</p>
        )}

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? 'text-orange-500' : 'text-light-400'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {reviewCount && (
              <span className="text-dark-500 text-sm">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-dark-900 font-bold text-lg">
            ${price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-dark-500 line-through text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {!inStock && (
          <p className="text-red-500 text-sm font-medium mt-2">Out of Stock</p>
        )}
      </div>
    </div>
  );

  // If href is provided, wrap in Link
  if (href) {
    return (
      <Link href={href} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}
