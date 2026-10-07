"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { clientSignUp, parseIdentifier, validateSixDigitPassword } from "@/lib/auth";
import {
  UserPlus,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Award,
  ShieldCheck
} from "lucide-react";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim()) {
      setErrorMessage("অনুগ্রহ করে আপনার পুরো নাম লিখুন।");
      return;
    }

    const parsed = parseIdentifier(identifier);
    if (!parsed.isValid) {
      setErrorMessage("অনুগ্রহ করে একটি সঠিক ইমেইল অথবা মোবাইল নম্বর দিন (১১ ডিজিট)।");
      return;
    }

    const passCheck = validateSixDigitPassword(password);
    if (!passCheck.isValid) {
      setErrorMessage(passCheck.message);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না।");
      return;
    }

    setIsLoading(true);

    try {
      const res = await clientSignUp(name, identifier, password);
      if (res.success && res.user) {
        setSuccessMessage(`অভিনন্দন, ${res.user.name}! আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।`);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([20, 60, 20]);
        }
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 500);
      } else {
        setErrorMessage(res.error || "অ্যাকাউন্ট তৈরি করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "একটি অনাকাঙ্ক্ষিত ত্রুটি দেখা দিয়েছে।");
    } finally {
      setIsLoading(false);
    }
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
              Sign Up (নতুন অ্যাকাউন্ট)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ইমেইল বা ফোন নম্বর এবং ৬ ডিজিটের পাসওয়ার্ড দিয়ে সহজে অ্যাকাউন্ট তৈরি করুন
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
          <form onSubmit={handleSignUp} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                আপনার পুরো নাম (Full Name) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Shah Alam"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-medium"
                />
              </div>
            </div>

            {/* Identifier: Email or Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                ইমেইল অথবা মোবাইল নম্বর (Email or Phone Number) <span className="text-rose-500">*</span>
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
            </div>

            {/* 6-Digit Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  ৬ ডিজিটের পাসওয়ার্ড (6-Digit Password) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  কমপক্ষে ৬ ডিজিট
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
                  placeholder="৬ ডিজিটের যেকোনো পাসওয়ার্ড দিন"
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

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                কনফার্ম পাসওয়ার্ড (Confirm Password) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  maxLength={32}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="পাসওয়ার্ডটি পুনরায় লিখুন"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-mono"
                />
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
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account (অ্যাকাউন্ট তৈরি করুন)</span>
                </>
              )}
            </button>
          </form>

          {/* Switch to Sign In */}
          <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <span>ইতোমধ্যে অ্যাকাউন্ট আছে? </span>
            <Link
              href={`/auth/signin?redirect=${encodeURIComponent(redirectUrl)}`}
              className="font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2 ml-1"
            >
              Sign In (লগইন করুন)
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <React.Suspense fallback={<div className="min-h-[85vh] flex items-center justify-center text-xs text-slate-400">Loading Sign Up...</div>}>
      <SignUpContent />
    </React.Suspense>
  );
}
