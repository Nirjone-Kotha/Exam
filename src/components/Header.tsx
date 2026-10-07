"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award, History, Layers, PlusCircle, NotebookPen, LogIn, User, LogOut, ChevronDown } from "lucide-react";
import PWAInstallPrompt from "./PWAInstallPrompt";
import { getCurrentUser, clientSignOut } from "@/lib/auth";
import { AppUser } from "@/lib/types";

export default function Header() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load current user
    setCurrentUser(getCurrentUser());

    // Listen to storage events to sync across tabs
    const handleStorage = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener("storage", handleStorage);

    // Also check server auth session
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});

    // Close dropdown on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await clientSignOut();
    setCurrentUser(null);
    setDropdownOpen(false);
    window.location.reload();
  };

  const navLinks = [
    { href: "/", label: "Exams", fullLabel: "Exams (12)", icon: Layers },
    { href: "/notes", label: "Notes", fullLabel: "Notes Directory", icon: NotebookPen },
    { href: "/history", label: "History", fullLabel: "My Analytics", icon: History },
    { href: "/manage", label: "Upload", fullLabel: "Question Manager", icon: PlusCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-hidden border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 shadow-sm touch-manipulation">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 w-full">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Award className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="flex items-center">
              <span className="font-extrabold text-base sm:text-xl tracking-tight bg-gradient-to-r from-slate-900 to-emerald-800 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent">
                MedExam BCS
              </span>
              <span className="hidden lg:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Post-Grad & BCS
              </span>
            </div>
          </Link>

          {/* Right Action: Desktop Nav Links + Auth Status + Install Button */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Desktop Navigation Links - Shown only for authenticated users */}
            {currentUser && (
              <nav className="hidden md:flex items-center space-x-1 sm:space-x-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive =
                    pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[38px] ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{link.fullLabel}</span>
                    </Link>
                  );
                })}
              </nav>
            )}

            {/* User Profile / Sign In Dropdown */}
            <div className="relative" ref={dropdownRef}>
              {currentUser ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors text-xs font-bold"
                  >
                    <div className="w-5 h-5 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline max-w-[100px] truncate">
                      {currentUser.name}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 text-xs">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="font-bold text-slate-900 dark:text-white truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate font-mono">
                          {currentUser.identifier}
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          Verified Candidate
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/notes"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                        >
                          <NotebookPen className="w-3.5 h-3.5 text-indigo-500" />
                          <span>আমার নোটস (My Notes)</span>
                        </Link>
                        <Link
                          href="/history"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                        >
                          <History className="w-3.5 h-3.5 text-emerald-500" />
                          <span>পরীক্ষার এনালাইটিক্স (Analytics)</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>লগআউট (Sign Out)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={`/auth/signin?redirect=${encodeURIComponent(pathname)}`}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all touch-manipulation min-h-[36px]"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            {/* PWA Install Button */}
            <PWAInstallPrompt />
          </div>

        </div>
      </div>
    </header>
  );
}
