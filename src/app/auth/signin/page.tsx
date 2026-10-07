"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { clientSignIn, parseIdentifier, validateSixDigitPassword } from "@/lib/auth";
import {
  LogIn,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Award,
  Sparkles,
  Smartphone
} from "lucide-react";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const parsed = parseIdentifier(identifier);
    if (!parsed.isValid) {
      setErrorMessage("অনুগ্রহ করে একটি সঠিক ইমেইল অথবা মোবাইল ফোন নম্বর দিন।");
      return;
    }

    const passCheck = validateSixDigitPassword(password);
    if (!passCheck.isValid) {
      setErrorMessage(passCheck.message);
      return;
    }

    setIsLoading(true);

    try {
      const res = await clientSignIn(identifier, password);
      if (res.success && res.user) {
        setSuccessMessage(`স্বাগতম, ${res.user.name}! লগইন সফল হয়েছে।`);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([15, 50, 15]);
        }
        setTimeout(() => {
          router.push(redirectUrl);
          router.refresh();
        }, 800);
      } else {
        setErrorMessage(res.error || "লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করে আবার চেষ্টা করুন।");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "একটি অনাকাঙ্ক্ষিত সমস্যা দেখা দিয়েছে।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setIdentifier("01700123456");
    setPassword("123456");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> হোম পেজে ফিরে যান (Back to Home)
        </Link>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
              <Award className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Sign In (সাইন ইন)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              যেকোনো ডিভাইস থেকে এক্সেস করতে আপনার ইমেইল বা ফোন নম্বর এবং ৬ ডিজিটের পাসওয়ার্ড ব্যবহার করুন
            </p>
          </div>

          {/* Alert Messages */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 dark:bg-rose-950/60 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            
            {/* Identifier: Email or Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                ইমেইল অথবা মোবাইল নম্বর (Email or Phone Number)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  {identifier.includes("@") ? (
                    <Mail className="w-4 h-4" />
                  ) : (
                    <Phone className="w-4 h-4" />
                  )}
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="01XXXXXXXXX অথবা email@example.com"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-medium"
                />
              </div>
              <span className="text-[10px] text-slate-400 block">
                * ফোন নাম্বার (১১ ডিজিট) অথবা ইমেইল এড্রেস
              </span>
            </div>

            {/* 6-Digit Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  ৬ ডিজিটের পাসওয়ার্ড (6-Digit Password)
                </label>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  ৬ ডিজিট
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  maxLength={32}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="৬ ডিজিটের পাসওয়ার্ড (যেমন 123456)"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 touch-manipulation min-h-[46px]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In (লগইন করুন)</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="w-full py-2 px-3 rounded-xl border border-dashed border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100/60 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>ডেমো টেস্ট ডাটা দিয়ে অটো-ফিল করুন (Auto Fill Demo)</span>
            </button>
          </div>

          {/* Switch to Sign Up */}
          <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <span>অ্যাকাউন্ট নেই? </span>
            <Link
              href={`/auth/signup?redirect=${encodeURIComponent(redirectUrl)}`}
              className="font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2 ml-1"
            >
              Sign Up (নতুন একাউন্ট খুলুন)
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <React.Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center text-xs text-slate-400">Loading Sign In...</div>}>
      <SignInContent />
    </React.Suspense>
  );
}
