'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

export default function Footer() {
  const navigationSections = [
    {
      title: 'Featured',
      links: [
        { name: 'Air Force 1', href: '/products/air-force-1' },
        { name: 'Huarache', href: '/products/huarache' },
        { name: 'Air Max 90', href: '/products/air-max-90' },
        { name: 'Air Max 95', href: '/products/air-max-95' },
      ],
    },
    {
      title: 'Shoes',
      links: [
        { name: 'All Shoes', href: '/shoes' },
        { name: 'Custom Shoes', href: '/custom-shoes' },
        { name: 'Jordan Shoes', href: '/jordan-shoes' },
        { name: 'Running Shoes', href: '/running-shoes' },
      ],
    },
    {
      title: 'Clothing',
      links: [
        { name: 'All Clothing', href: '/clothing' },
        { name: 'Modest Wear', href: '/modest-wear' },
        { name: 'Hoodies & Pullovers', href: '/hoodies-pullovers' },
        { name: 'Shirts & Tops', href: '/shirts-tops' },
      ],
    },
    {
      title: "Kids'",
      links: [
        { name: 'Infant & Toddler Shoes', href: '/kids/infant-toddler' },
        { name: "Kids' Shoes", href: '/kids/shoes' },
        { name: "Kids' Jordan Shoes", href: '/kids/jordan' },
        { name: "Kids' Basketball Shoes", href: '/kids/basketball' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'X (Twitter)', href: 'https://twitter.com/nike', icon: '/x.svg' },
    { name: 'Facebook', href: 'https://facebook.com/nike', icon: '/facebook.svg' },
    { name: 'Instagram', href: 'https://instagram.com/nike', icon: '/instagram.svg' },
  ];

  const legalLinks = [
    { name: 'Guides', href: '/guides' },
    { name: 'Terms of Sale', href: '/terms-of-sale' },
    { name: 'Terms of Use', href: '/terms-of-use' },
    { name: 'Nike Privacy Policy', href: '/privacy-policy' },
  ];

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Nike Logo */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo.svg"
                  alt="Nike Logo"
                  width={60}
                  height={24}
                  className="h-8 w-auto brightness-0 invert"
                />
              </Link>
            </div>

            {/* Navigation Columns */}
            {navigationSections.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h3 className="text-white font-bold text-lg mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-light-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Media Icons */}
            <div className="lg:col-span-1">
              <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-light-400 flex items-center justify-center hover:border-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={20}
                      height={20}
                      className="brightness-0 invert"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-light-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Left Side - Location and Copyright */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center text-light-400 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Croatia</span>
              </div>
              <div className="text-light-400 text-sm">
                © 2025 Nike, Inc. All Rights Reserved
              </div>
            </div>

            {/* Right Side - Legal Links */}
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-light-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
