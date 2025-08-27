import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Dark Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-dark-900 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 to-dark-700"></div>
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          {/* Top Section */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="Nike Logo"
                width={80}
                height={32}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Center Section */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Just Do It
            </h1>
            <p className="text-xl text-light-400 max-w-md leading-relaxed">
              Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-start space-y-6">
            {/* Carousel Dots */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-light-400 rounded-full"></div>
              <div className="w-2 h-2 bg-light-400 rounded-full"></div>
            </div>
            
            {/* Copyright */}
            <p className="text-sm text-light-400">
              © 2024 Nike. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - White Background */}
      <div className="flex-1 lg:w-1/2 bg-white flex flex-col justify-center p-8 lg:p-12">
        <div className="max-w-md mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
