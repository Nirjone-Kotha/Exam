"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award, History, Layers, PlusCircle, NotebookPen } from "lucide-react";
import PWAInstallPrompt from "./PWAInstallPrompt";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Exams", fullLabel: "Exams (12)", icon: Layers },
    { href: "/notes", label: "Notes", fullLabel: "Important Notes", icon: NotebookPen },
    { href: "/history", label: "History", fullLabel: "My Analytics", icon: History },
    { href: "/manage", label: "Upload", fullLabel: "Question Manager", icon: PlusCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-hidden border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 shadow-sm touch-manipulation">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 w-full">
          
          {/* Logo & Brand - Always fully visible and never pushed off */}
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

          {/* Right Action: Desktop Nav Links (hidden on mobile) + Install Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Desktop Navigation Links - Hidden on Mobile because of Bottom Navigation */}
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

            {/* PWA Install Button (Responsive for both Mobile & Desktop) */}
            <PWAInstallPrompt />
          </div>

        </div>
      </div>
    </header>
  );
}
