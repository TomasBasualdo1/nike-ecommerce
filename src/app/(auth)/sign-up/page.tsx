'use client';

import Link from 'next/link';
import SocialProviders from '@/components/SocialProviders';
import AuthForm from '@/components/AuthForm';

export default function SignUpPage() {
  const handleGoogleSignIn = () => {
    console.log('Google sign up clicked');
    // TODO: Implement Google sign up
  };

  const handleAppleSignIn = () => {
    console.log('Apple sign up clicked');
    // TODO: Implement Apple sign up
  };

  const handleFormSubmit = (data: { email: string; password: string; fullName?: string }) => {
    console.log('Sign up form submitted:', data);
    // TODO: Implement email/password sign up
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-right">
        <p className="text-sm text-dark-500">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-semibold underline text-dark-900 hover:text-dark-700">
            Sign In
          </Link>
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 mb-2">
            Join Nike Today!
          </h1>
          <p className="text-dark-500">
            Create your account to start your fitness journey
          </p>
        </div>

        {/* Social Providers */}
        <SocialProviders
          onGoogleSignIn={handleGoogleSignIn}
          onAppleSignIn={handleAppleSignIn}
          variant="signup"
        />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-light-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-dark-500">Or sign up with</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <AuthForm
          type="signup"
          onSubmit={handleFormSubmit}
        />
      </div>

      {/* Terms */}
      <div className="text-center">
        <p className="text-xs text-dark-400">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-dark-600">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-dark-600">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
