"use client";

import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import { signIn } from "@/lib/auth/actions";

export default function SignInPage() {
  return (
    <div className="space-y-8">
      {/* Main Content */}
      <div className="space-y-6">
        {/* Email/Password Form */}
        <AuthForm mode="sign-in" onSubmit={signIn} />

        {/* Forgot Password */}
        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-dark-500 hover:text-dark-700 underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
