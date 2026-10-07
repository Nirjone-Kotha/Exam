import type { Metadata, Viewport } from "next";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import NetworkStatusIndicator from "../components/NetworkStatusIndicator";
import "../styles/globals.css";

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "MedExam BCS - Modern Medical & BCS Examination Platform",
  description: "Advanced medical examination portal for FCPS, MD/MS, BCS Health and residency tests. Features randomized questions, sticky countdown timer, negative marking, instant answers with clinical explanations, attempt comparisons, and high-yield subject notes.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MedExam BCS",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden max-w-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="MedExam BCS" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MedExam BCS" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white overflow-x-hidden max-w-full w-full">
        <Header />
        <NetworkStatusIndicator />
        <main className="flex-1 w-full max-w-full overflow-x-hidden pb-16 md:pb-0">{children}</main>
        <BottomNavBar />
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mb-14 md:mb-0 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} MedExam BCS Portal • Built for High Performance</span>
            <span>Vercel Optimized • Neon Postgres & Upstash Redis Ready</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
