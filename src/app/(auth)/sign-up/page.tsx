"use client";
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/auth/actions";

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      {/* Main Content */}
      <div className="space-y-6">
        {/* Email/Password Form */}
        <AuthForm mode="sign-up" onSubmit={signUp} />
      </div>
    </div>
  );
}
