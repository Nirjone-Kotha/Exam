"use client";

import React from "react";
import Link from "next/link";
import { AttemptComparison, ExamAttempt } from "../lib/types";
import { formatTimeLong } from "../lib/evaluation";
import { TrendingUp, TrendingDown, Minus, Trophy, History, ArrowRight } from "lucide-react";

interface AttemptComparisonCardProps {
  comparison: AttemptComparison;
  allAttempts: ExamAttempt[];
}

export default function AttemptComparisonCard({
  comparison,
  allAttempts,
}: AttemptComparisonCardProps) {
  const { currentAttempt, previousAttempt, bestAttempt, totalAttempts, scoreDelta, accuracyDelta, timeDelta } =
    comparison;

  // If this is the very first attempt ever on this exam
  if (totalAttempts <= 1 || !previousAttempt) {
    return (
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-sm">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-600/20">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              First Attempt Recorded
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Benchmark Score Established
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              This is your baseline attempt for this exam! When you retake this exam, our system will automatically randomize the question sequence and give you an in-depth comparison against this baseline score.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isScoreImproved = (scoreDelta ?? 0) > 0;
  const isScoreDropped = (scoreDelta ?? 0) < 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm space-y-5 sm:space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Comparative Analysis: Current vs Previous
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              Exam taken {totalAttempts} times • Comparing with immediate prior attempt
            </p>
          </div>
        </div>

        {bestAttempt && (
          <div className="text-[11px] sm:text-xs px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80 flex items-center gap-1.5 self-start sm:self-auto font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Best: <strong>{bestAttempt.netScore}</strong> / {bestAttempt.totalQuestions}</span>
          </div>
        )}
      </div>

      {/* Metric Delta Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
        
        {/* Score Delta */}
        <div className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border ${
          isScoreImproved
            ? "bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/60"
            : isScoreDropped
            ? "bg-red-50/70 border-red-200 dark:bg-red-950/30 dark:border-red-800/60"
            : "bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-800"
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
            <span>Score Change</span>
            {isScoreImproved ? (
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            ) : isScoreDropped ? (
              <TrendingDown className="w-4 h-4 text-red-600" />
            ) : (
              <Minus className="w-4 h-4 text-slate-400" />
            )}
          </div>
          <div className={`text-xl sm:text-2xl font-black ${
            isScoreImproved ? "text-emerald-700 dark:text-emerald-400" : isScoreDropped ? "text-red-700 dark:text-red-400" : "text-slate-700 dark:text-slate-300"
          }`}>
            {isScoreImproved ? `+${scoreDelta}` : scoreDelta}
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 mt-1">
            From <strong>{previousAttempt.netScore}</strong> to <strong>{currentAttempt.netScore}</strong>
          </div>
        </div>

        {/* Accuracy Delta */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
            <span>Accuracy Shift</span>
            {(accuracyDelta ?? 0) >= 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
          </div>
          <div className={`text-xl sm:text-2xl font-black ${(accuracyDelta ?? 0) >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>
            {(accuracyDelta ?? 0) >= 0 ? `+${accuracyDelta}%` : `${accuracyDelta}%`}
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 mt-1">
            Previous: {previousAttempt.accuracy}% → Current: {currentAttempt.accuracy}%
          </div>
        </div>

        {/* Time Delta */}
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
            <span>Speed Comparison</span>
            {(timeDelta ?? 0) <= 0 ? (
              <span className="text-emerald-600 font-bold text-xs">Faster</span>
            ) : (
              <span className="text-amber-600 font-bold text-xs">More Time</span>
            )}
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {formatTimeLong(currentAttempt.timeSpentSeconds)}
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 mt-1">
            {(timeDelta ?? 0) <= 0
              ? `${formatTimeLong(Math.abs(timeDelta ?? 0))} faster`
              : `${formatTimeLong(timeDelta ?? 0)} slower`}
          </div>
        </div>

      </div>

      {/* Detailed Attempts Log Table with smooth swipe on mobile */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            All Attempts History
          </h4>
          <span className="text-[10px] text-slate-400 sm:hidden">Swipe table ➔</span>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 -mx-1 sm:mx-0">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">Attempt</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">Date</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">Net Score</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">Accuracy</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">Result</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {allAttempts.map((att, idx) => {
                const attemptNum = allAttempts.length - idx;
                const isCurrent = att.id === currentAttempt.id;
                return (
                  <tr
                    key={att.id}
                    className={`transition-colors ${
                      isCurrent
                        ? "bg-emerald-50/60 dark:bg-emerald-950/20 font-semibold"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        #{attemptNum}
                        {isCurrent && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Current
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-slate-500 whitespace-nowrap">
                      {new Date(att.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {att.netScore} / {att.totalQuestions}
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                      {att.accuracy}%
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-xs text-slate-500 whitespace-nowrap">
                      <span className="text-emerald-600 font-semibold">{att.correctCount}✔</span>{" "}
                      • <span className="text-red-600 font-semibold">{att.wrongCount}✖</span>{" "}
                      • <span>{att.skippedCount}━</span>
                    </td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/result/${att.id}`}
                        className="inline-flex items-center text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                      >
                        View <ArrowRight className="w-3 h-3 ml-0.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
