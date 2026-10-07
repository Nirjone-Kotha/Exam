"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SUBJECTS_DATA } from "@/data/subjects";
import { getAllNotesLocal } from "@/lib/notesStorage";
import { getAllCollectedNotesLocal } from "@/lib/collectedNotesStorage";
import { SubjectNote, CollectedNote } from "@/lib/types";
import {
  NotebookPen,
  ArrowRight,
  BookOpen,
  Search,
  CheckCircle2,
  AlertTriangle,
  Flame,
  FileText,
  Activity,
  Bone,
  Stethoscope,
  Scissors,
  HeartHandshake,
  Dna,
  Users,
  Scale,
  Microscope,
  Pill,
  Bug,
  Download,
  FolderOpen,
  Sparkles
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  Scissors,
  HeartHandshake,
  Bone,
  Activity,
  Dna,
  Users,
  Scale,
  Microscope,
  Pill,
  Bug,
};

export default function NotesIndexPage() {
  const [activeTab, setActiveTab] = useState<"important" | "collected">("important");
  const [importantNotes, setImportantNotes] = useState<SubjectNote[]>([]);
  const [collectedNotes, setCollectedNotes] = useState<CollectedNote[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dbStatus, setDbStatus] = useState<{
    neonConnected: boolean;
    upstashConnected: boolean;
  }>({ neonConnected: false, upstashConnected: false });

  useEffect(() => {
    setImportantNotes(getAllNotesLocal());
    setCollectedNotes(getAllCollectedNotesLocal());

    fetch("/api/db-status")
      .then((res) => res.json())
      .then((data) => {
        setDbStatus({
          neonConnected: !!data?.neon?.connected,
          upstashConnected: !!data?.upstash?.connected,
        });
      })
      .catch(() => {});
  }, []);

  const filteredSubjects = SUBJECTS_DATA.filter((sub) =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] sm:text-xs font-semibold border border-indigo-500/30 backdrop-blur-sm">
            <NotebookPen className="w-3.5 h-3.5 text-indigo-400" />
            <span>High-Yield Subject Notes Directory</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Medical Notes Workspace
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            আপনার প্রস্তুতিকে নিখুঁত করতে নোট সেকশনকে দুইটি অংশে ভাগ করা হয়েছে: <strong>Important Note</strong> (টপিক্স ও পেজ নাম্বার ট্র্যাকার) এবং <strong>Collected Note</strong> (প্যারাগ্রাফ স্টাইলে বিস্তারিত সংগৃহীত নোট ও পিডিএফ ডাউনলোড)।
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 font-bold">
              Important Notes: <strong className="text-indigo-300">{importantNotes.length}</strong>
            </span>
            <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 font-bold">
              Collected Notes: <strong className="text-emerald-300">{collectedNotes.length}</strong>
            </span>

            {dbStatus.neonConnected ? (
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Neon Postgres Active
              </span>
            ) : (
              <span className="px-3 py-1 rounded-xl bg-slate-500/20 text-slate-300 border border-slate-500/30 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Local & Cloud Ready
              </span>
            )}
          </div>
        </div>

        <div className="absolute right-0 bottom-0 w-72 h-72 sm:w-80 sm:h-80 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* Two Part Segmented Switcher Requested by User */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {/* Part 1: Important note */}
          <button
            type="button"
            onClick={() => setActiveTab("important")}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === "important"
                ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <NotebookPen className="w-4 h-4" />
            <span>1. Important note ({importantNotes.length})</span>
          </button>

          {/* Part 2: Collected note */}
          <button
            type="button"
            onClick={() => setActiveTab("collected")}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === "collected"
                ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>2. Collected note ({collectedNotes.length})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search 12 subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Subjects Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>
                {activeTab === "important"
                  ? "Important Note: সিলেক্ট করুন সাবজেক্ট"
                  : "Collected Note: সিলেক্ট করুন সাবজেক্ট"}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activeTab === "important"
                ? "টপিক্স নেম, পেজ নাম্বার এবং ক্যাটাগরি ট্র্যাকিং"
                : "টপিক নেম, প্যারাগ্রাফ নোট সংগ্রহ ও একসাথে PDF ডাউনলোড"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredSubjects.map((sub) => {
            const IconComponent = ICON_MAP[sub.icon] || BookOpen;
            const subImportantNotes = importantNotes.filter((n) => n.subjectId === sub.id);
            const subCollectedNotes = collectedNotes.filter((n) => n.subjectId === sub.id);

            const isImportantTab = activeTab === "important";
            const noteCount = isImportantTab ? subImportantNotes.length : subCollectedNotes.length;

            return (
              <Link
                key={sub.id}
                href={`/notes/${sub.slug}?tab=${activeTab}`}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform ${
                        isImportantTab
                          ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                          : "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        isImportantTab
                          ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                          : "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                      }`}
                    >
                      {noteCount} {noteCount === 1 ? "Note" : "Notes"}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {sub.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {sub.description}
                  </p>
                </div>

                {/* Bottom Action Area */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {isImportantTab ? (
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 dark:text-indigo-400">
                      <span>Open Important Note</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700 dark:text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5" />
                        <span>Open Collected Note & PDF</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
