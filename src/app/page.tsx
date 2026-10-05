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
  Clock,
  Shuffle,
  AlertCircle,
  FileCheck2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Award
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold border border-emerald-500/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>BCS & Post-Graduate Medical Residency Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            High-Yield Medical & BCS Exam Simulation
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Test yourself under real exam conditions. Experience dynamic question shuffling on every attempt, a sticky live countdown timer (MCQ ÷ 2 mins), -0.5 negative marking, instant explanations, and multi-attempt performance tracking.
          </p>

          {/* Key Features Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-xs font-medium border border-white/10">
              <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Time: MCQs ÷ 2 mins</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-xs font-medium border border-white/10">
              <Shuffle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Randomized Sequence</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-xs font-medium border border-white/10">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>-0.5 Negative Mark</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl text-xs font-medium border border-white/10">
              <TrendingUp className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>Attempt Comparison</span>
            </div>
          </div>
        </div>

        {/* Decorative backdrop shapes */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Recent Attempts Quick View */}
      {recentAttempts.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentAttempts.map((attempt) => (
              <Link
                key={attempt.id}
                href={`/result/${attempt.id}`}
                className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all block group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {attempt.subjectName}
                  </span>
                  <span>{new Date(attempt.timestamp).toLocaleDateString()}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-emerald-600 transition-colors">
                  {attempt.examTitle}
                </h4>
                <div className="flex items-center justify-between mt-3 text-xs">
                  <span className="font-extrabold text-base text-slate-900 dark:text-white">
                    {attempt.netScore} <span className="text-xs font-normal text-slate-500">/ {attempt.totalQuestions}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                    {attempt.accuracy}% Acc
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 11 Subjects Directory */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              11 Medical Examination Subjects
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Select a subject below to access dedicated examination papers and high-yield questions
            </p>
          </div>

          {/* Quick Search */}
          <input
            type="text"
            placeholder="Search subjects or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((sub, index) => {
            const IconComponent = ICON_MAP[sub.icon] || FileCheck2;
            const totalMCQs = sub.exams.reduce((acc, e) => acc + e.questions.length, 0);

            return (
              <div
                key={sub.id}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {sub.exams.length} {sub.exams.length === 1 ? "Paper" : "Papers"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {sub.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {totalMCQs} MCQs Bank
                  </span>

                  <Link
                    href={`/subject/${sub.slug}`}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-700 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-emerald-600 text-xs font-bold transition-all"
                  >
                    <span>View Exams</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
