"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SUBJECTS_DATA } from "../data/subjects";
import { getAllAttempts } from "../lib/storage";
import { ExamAttempt } from "../lib/types";
import {
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
  FileCheck2,
  ArrowRight,
  Sparkles,
  Award,
  NotebookPen
} from "lucide-react";

// Icon mapping for subjects
const ICON_MAP: Record<string, any> = {
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

export default function HomePage() {
  const [recentAttempts, setRecentAttempts] = useState<ExamAttempt[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const attempts = getAllAttempts();
    setRecentAttempts(attempts.slice(0, 3));
  }, []);

  const totalQuestionsAvailable = SUBJECTS_DATA.reduce(
    (acc, sub) => acc + sub.exams.reduce((eAcc, e) => eAcc + e.questions.length, 0),
    0
  );

  const filteredSubjects = SUBJECTS_DATA.filter((sub) =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-5 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] sm:text-sm font-semibold border border-emerald-500/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span>BCS & Post-Graduate Medical Residency Portal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            High-Yield Medical & BCS Exam Simulation
          </h1>
        </div>

        {/* Decorative backdrop shapes */}
        <div className="absolute right-0 bottom-0 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* Recent Attempts Quick View */}
      {recentAttempts.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Recent Exam Attempts
              </h2>
            </div>
            <Link
              href="/history"
              className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center"
            >
              All History <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {recentAttempts.map((attempt) => (
              <Link
                key={attempt.id}
                href={`/result/${attempt.id}`}
                className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all block group touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {attempt.subjectName}
                  </span>
                  <span>{new Date(attempt.timestamp).toLocaleDateString()}</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-emerald-600 transition-colors">
                  {attempt.examTitle}
                </h4>
                <div className="flex items-center justify-between mt-2.5 text-xs">
                  <span className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                    {attempt.netScore} <span className="text-[10px] sm:text-xs font-normal text-slate-500">/{attempt.totalQuestions}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px] sm:text-xs">
                    {attempt.accuracy}% Acc
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Important Notes Feature Callout */}
      <section className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 border border-indigo-800/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center flex-shrink-0">
            <NotebookPen className="w-5 h-5" />
          </div>
          <div>
            <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full mb-1">
              New Section
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Subject Wise Important Notes
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Save textbook topics with page numbers. Automatically sorted in ascending page order, with instant filters for Difficult, Important to read, and Frequently coming questions.
            </p>
          </div>
        </div>
        <Link
          href="/notes"
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all touch-manipulation flex-shrink-0 min-h-[40px]"
        >
          <span>Open Important Notes</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 11 Subjects Directory */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {SUBJECTS_DATA.length} Medical Examination Subjects
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Select a subject to take authentic Previous BCS questions with explanations
            </p>
          </div>

          {/* Quick Search */}
          <input
            type="text"
            placeholder="Search subjects or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredSubjects.map((sub) => {
            const IconComponent = ICON_MAP[sub.icon] || FileCheck2;
            const totalMCQs = sub.exams.reduce((acc, e) => acc + e.questions.length, 0);

            return (
              <div
                key={sub.id}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {sub.exams.length} {sub.exams.length === 1 ? "Test" : "Tests"}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {sub.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    {totalMCQs} MCQs Bank
                  </span>

                  <Link
                    href={`/subject/${sub.slug}`}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-700 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-emerald-600 text-xs font-bold transition-all touch-manipulation min-h-[34px]"
                  >
                    <span>Exams</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
