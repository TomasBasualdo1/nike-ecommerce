"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, LogOut, Settings, Package } from "lucide-react";
import { useAuthStore } from "@/store/auth";

export default function UserButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isLoading, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    await logout();
    setIsDropdownOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center">
        <div className="w-8 h-8 bg-light-300 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/sign-in"
        className="flex items-center text-dark-900 hover:text-dark-700 transition-colors duration-200"
      >
        <span className="font-medium">Sign In</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 text-dark-900 hover:text-dark-700 transition-colors duration-200"
        aria-label="User menu"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-dark-900 text-white rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        )}
        <span className="hidden sm:block font-medium">{user.name}</span>
      </button>

      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-light-300 z-20">
            <div className="py-1">
              <div className="px-4 py-2 border-b border-light-300">
                <p className="text-sm font-medium text-dark-900">{user.name}</p>
                <p className="text-xs text-dark-700">{user.email}</p>
              </div>

              <Link
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-dark-900 hover:bg-light-200 transition-colors duration-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Profile Settings
              </Link>

              <Link
                href="/orders"
                className="flex items-center px-4 py-2 text-sm text-dark-900 hover:bg-light-200 transition-colors duration-200"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Package className="w-4 h-4 mr-2" />
                My Orders
              </Link>

              <div className="border-t border-light-300">
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-dark-900 hover:bg-light-200 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
