"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getSubjectBySlug } from "../../../data/subjects";
import { getAttemptsForExam } from "../../../lib/storage";
import { Clock, AlertCircle, Play, History, ArrowLeft, CheckCircle2, Award } from "lucide-react";

export default function SubjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const subject = getSubjectBySlug(slug);

  const [examStats, setExamStats] = useState<Record<string, { count: number; bestScore?: number }>>({});

  useEffect(() => {
    if (!subject) return;
    const stats: Record<string, { count: number; bestScore?: number }> = {};
    subject.exams.forEach((exam) => {
      const attempts = getAttemptsForExam(exam.id);
      if (attempts.length > 0) {
        const best = Math.max(...attempts.map((a) => a.netScore));
        stats[exam.id] = { count: attempts.length, bestScore: best };
      } else {
        stats[exam.id] = { count: 0 };
      }
    });
    setExamStats(stats);
  }, [subject]);

  if (!subject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Subject Not Found</h2>
        <p className="text-slate-500">The requested medical subject does not exist.</p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Subjects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button & Subject Title Header */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to 11 Subjects
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full mb-2">
              Medical Subject
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {subject.name}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              {subject.description}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-500">
            <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="block font-black text-base text-slate-900 dark:text-white">
                {subject.exams.length}
              </span>
              <span>Available Tests</span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Exams Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Examination Papers & Mocks
        </h2>

        <div className="space-y-4">
          {subject.exams.map((exam) => {
            const questionCount = exam.questions.length;
            // Default time rule: Total MCQs / 2 minutes
            const defaultMinutes = exam.customTimeMinutes || Math.max(1, Math.ceil(questionCount / 2));
            const stat = examStats[exam.id];

            return (
              <div
                key={exam.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Standard BCS / Post-Grad Format
                    </span>
                    {stat && stat.count > 0 && (
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <History className="w-3 h-3 text-indigo-500" />
                        {stat.count} previous {stat.count === 1 ? "attempt" : "attempts"}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {exam.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {exam.description}
                  </p>

                  {/* Rules and specs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <strong>{questionCount}</strong> MCQs
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <strong>{defaultMinutes}</strong> mins (MCQs ÷ 2)
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                      <strong>-{exam.negativeMark}</strong> negative mark per error
                    </span>
                    {stat && stat.bestScore !== undefined && (
                      <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        Best Score: <strong>{stat.bestScore}</strong> / {questionCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <Link
                    href={`/exam/${exam.id}`}
                    className="w-full md:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{stat && stat.count > 0 ? "Retake Exam (Shuffled)" : "Start Exam"}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
