'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  type: 'signin' | 'signup';
  onSubmit: (data: { email: string; password: string; fullName?: string }) => void;
  isLoading?: boolean;
}

export default function AuthForm({ type, onSubmit, isLoading = false }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name - Only for Sign Up */}
      {type === 'signup' && (
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-dark-900 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-colors duration-200"
            required
          />
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark-900 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className="w-full px-4 py-3 border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-colors duration-200"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-dark-900 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={type === 'signup' ? 'minimum 8 characters' : 'Enter your password'}
            className="w-full px-4 py-3 pr-12 border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-colors duration-200"
            required
            minLength={type === 'signup' ? 8 : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-500 hover:text-dark-700 transition-colors duration-200"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-dark-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-dark-700 disabled:bg-dark-500 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? 'Loading...' : type === 'signin' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
}
