"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, NotebookPen, History, PlusCircle } from "lucide-react";

export default function BottomNavBar() {
  const pathname = usePathname();

  // If in active exam mode with timer (/exam/[id]), hide bottom bar to prevent distraction
  if (pathname.startsWith("/exam/")) {
    return null;
  }

  const navItems = [
    {
      href: "/",
      label: "Exams",
      icon: Layers,
      isActive: pathname === "/" || (pathname.startsWith("/subject/") && !pathname.startsWith("/notes")),
    },
    {
      href: "/notes",
      label: "Notes",
      icon: NotebookPen,
      isActive: pathname.startsWith("/notes"),
    },
    {
      href: "/history",
      label: "Analytics",
      icon: History,
      isActive: pathname.startsWith("/history") || pathname.startsWith("/result/"),
    },
    {
      href: "/manage",
      label: "Manager",
      icon: PlusCircle,
      isActive: pathname.startsWith("/manage"),
    },
  ];

  const handleTouch = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(8);
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-[max(env(safe-area-inset-bottom),0px)]"
    >
      <div className="grid grid-cols-4 h-14 max-w-lg mx-auto px-2 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleTouch}
              className={`flex flex-col items-center justify-center h-full py-1 rounded-xl transition-all select-none touch-manipulation active:scale-95 ${
                active
                  ? "text-emerald-700 dark:text-emerald-400 font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium"
              }`}
            >
              <div
                className={`flex items-center justify-center px-3 py-1 rounded-full transition-colors ${
                  active
                    ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] leading-tight mt-0.5 tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
