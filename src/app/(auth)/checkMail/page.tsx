
"use client";

import { Mail, ArrowLeft } from "lucide-react";

import { useRouter } from "next/navigation";

const CheckMail = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
          {/* Email Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/10 border border-pink-500/20">
            <Mail className="h-8 w-8 text-pink-400" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-semibold text-white mb-3">
            Check your email
          </h1>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-6 mb-6">
            We have sent a password reset link to your email address.
            Please check your inbox and click the link to reset your password.
          </p>

          {/* Resend */}
          <button
            onClick={() => router.push("/forgotPasswordLink")}
            type="button"
            className="w-full rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-medium py-2.5 transition-colors duration-200"
          >
            Resend reset link
          </button>

          {/* Back to Login */}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckMail;
