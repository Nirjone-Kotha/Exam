"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SUBJECTS_DATA } from "@/data/subjects";
import { getAllNotesLocal } from "@/lib/notesStorage";
import { SubjectNote } from "@/lib/types";
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
  HelpCircle
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
  const [allNotes, setAllNotes] = useState<SubjectNote[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dbStatus, setDbStatus] = useState<{
    neonConnected: boolean;
    upstashConnected: boolean;
  }>({ neonConnected: false, upstashConnected: false });

  useEffect(() => {
    setAllNotes(getAllNotesLocal());

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

  const totalNotesCount = allNotes.length;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] sm:text-xs font-semibold border border-indigo-500/30 backdrop-blur-sm">
            <NotebookPen className="w-3.5 h-3.5 text-indigo-400" />
            <span>High-Yield Subject Notes Directory</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Important Notes & High-Yield Topics
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Save and organize high-yield textbook topics, page numbers, and priority tags across all 11 medical subjects. Notes are automatically sorted by page number in ascending order with instant filtering by Difficult, Important to read, and Frequently coming question.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 font-bold">
              Total Saved Notes: <strong className="text-indigo-300">{totalNotesCount}</strong>
            </span>
            <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 font-bold">
              Subjects: <strong className="text-emerald-300">{SUBJECTS_DATA.length}</strong>
            </span>

            {dbStatus.neonConnected ? (
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Neon Postgres Active
              </span>
            ) : (
              <span className="px-3 py-1 rounded-xl bg-slate-500/20 text-slate-300 border border-slate-500/30 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Local Storage Active
              </span>
            )}

            {dbStatus.upstashConnected && (
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Upstash Redis Cached
              </span>
            )}
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Search and Subject Cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Select a Subject to View & Add Notes
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any subject below to open its Important Note workspace
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredSubjects.map((sub) => {
            const IconComponent = ICON_MAP[sub.icon] || BookOpen;
            const subNotes = allNotes.filter((n) => n.subjectId === sub.id);
            const difficultCount = subNotes.filter((n) => n.category === "Difficult").length;
            const importantCount = subNotes.filter((n) => n.category === "Important to read").length;
            const freqCount = subNotes.filter((n) => n.category === "Frequently coming question").length;

            return (
              <Link
                key={sub.id}
                href={`/notes/${sub.slug}`}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {subNotes.length} {subNotes.length === 1 ? "Note" : "Notes"}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {sub.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {sub.description}
                  </p>
                </div>

                {/* Categories Breakdown */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 flex-wrap text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 mb-3">
                    {difficultCount > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900 font-semibold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-rose-500" />
                        {difficultCount} Difficult
                      </span>
                    )}
                    {importantCount > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                        {importantCount} Important
                      </span>
                    )}
                    {freqCount > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        {freqCount} Frequent
                      </span>
                    )}
                    {subNotes.length === 0 && (
                      <span className="text-slate-400 italic">No notes added yet</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 dark:text-indigo-400">
                    <span>Open Important Note</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
