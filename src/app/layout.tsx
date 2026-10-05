import type { Metadata } from "next";
import Header from "../components/Header";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "MedExam BCS - Modern Medical & BCS Examination Platform",
  description: "Advanced medical examination portal for FCPS, MD/MS, BCS Health and residency tests. Features randomized questions, sticky countdown timer, negative marking, instant answers with clinical explanations, and attempt comparisons.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} MedExam BCS Portal • Built for High Performance</span>
            <span>Vercel Free Tier Optimized • All Data Saved Locally</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
