"use client";

import React, { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";

export default function NetworkStatusIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3500);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowMessage(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showMessage && isOnline) return null;

  return (
    <div
      className={`fixed top-16 right-3 sm:right-6 z-50 transition-all duration-300 transform ${
        showMessage ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`px-3.5 py-2 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-semibold backdrop-blur-md border ${
          isOnline
            ? "bg-emerald-950/90 text-emerald-200 border-emerald-500/30"
            : "bg-slate-950/90 text-amber-200 border-amber-500/30"
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span>Connected • Offline PWA cache ready</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Offline Mode • Notes & exams work offline</span>
          </>
        )}
      </div>
    </div>
  );
}
