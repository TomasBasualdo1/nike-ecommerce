'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingCart, User } from 'lucide-react';

export default function Header() {
  const { getItemCount } = useCartStore();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Nike Store
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-gray-900">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-gray-900">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>
            <Link href="/auth" className="p-2">
              <User className="h-6 w-6 text-gray-700" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
