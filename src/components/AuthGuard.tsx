"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Award, Lock } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isAuthRoute = pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup");

    const user = getCurrentUser();
    const hasCookie =
      typeof document !== "undefined" &&
      (document.cookie.includes("bcs_user_id") || document.cookie.includes("bcs_user_data"));

    const authenticated = Boolean(user || hasCookie);

    if (!authenticated) {
      if (!isAuthRoute) {
        setIsAuthorized(false);
        setIsChecking(false);
        router.replace(`/auth/signin?redirect=${encodeURIComponent(pathname)}`);
        return;
      }
      // On auth route without authentication: allow
      setIsAuthorized(true);
      setIsChecking(false);
    } else {
      if (isAuthRoute) {
        // Authenticated user trying to visit signin/signup: send to home
        setIsAuthorized(false);
        setIsChecking(false);
        router.replace("/");
        return;
      }
      setIsAuthorized(true);
      setIsChecking(false);
    }
  }, [pathname, router]);

  // While checking or redirecting unauthenticated users
  if (isChecking || !isAuthorized) {
    const isAuthRoute = pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup");
    if (isAuthRoute) {
      return <>{children}</>;
    }

    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 animate-pulse">
          <Award className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>লগইন যাচাই করা হচ্ছে (Verifying Access...)</span>
          </h2>
          <p className="text-xs text-slate-500">
            ওয়েবসাইটটিতে এক্সেস করার জন্য সাইন ইন পেজে রিডাইরেক্ট করা হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
