'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount } = useCartStore();

  const navigationLinks = [
    { name: 'Men', href: '/men' },
    { name: 'Women', href: '/women' },
    { name: 'Kids', href: '/kids' },
    { name: 'Collections', href: '/collections' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-light-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Nike Logo"
              width={60}
              height={24}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-dark-900 hover:text-dark-700 transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="hidden sm:flex items-center text-dark-900 hover:text-dark-700 transition-colors duration-200">
              <Search className="h-5 w-5" />
              <span className="ml-2 font-medium">Search</span>
            </button>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative flex items-center text-dark-900 hover:text-dark-700 transition-colors duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-2 font-medium">
                My Cart{getItemCount() > 0 && ` (${getItemCount()})`}
              </span>
            </Link>

            {/* Sign In */}
            <Link 
              href="/sign-in" 
              className="flex items-center text-dark-900 hover:text-dark-700 transition-colors duration-200"
            >
              <span className="font-medium">Sign In</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-dark-900 hover:text-dark-700 hover:bg-light-200 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-light-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-dark-900 hover:text-dark-700 hover:bg-light-200 rounded-md transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-light-300 pt-2 mt-2">
                <button className="flex items-center w-full px-3 py-2 text-dark-900 hover:text-dark-700 hover:bg-light-200 rounded-md transition-colors duration-200 font-medium">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
