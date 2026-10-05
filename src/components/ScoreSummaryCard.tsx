"use client";

import React from "react";
import { ExamAttempt } from "../lib/types";
import { formatTimeLong } from "../lib/evaluation";
import { CheckCircle, XCircle, MinusCircle, Clock, Zap, Target } from "lucide-react";

interface ScoreSummaryCardProps {
  attempt: ExamAttempt;
}

export default function ScoreSummaryCard({ attempt }: ScoreSummaryCardProps) {
  const percentage = Math.max(0, Math.round((attempt.netScore / attempt.totalQuestions) * 100));

  let badgeColor = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
  let gradeText = "Excellent Performance!";
  if (percentage < 40) {
    badgeColor = "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
    gradeText = "Needs Revision";
  } else if (percentage < 60) {
    badgeColor = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
    gradeText = "Good Effort - Room to Improve";
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-slate-200 dark:border-slate-800">
        
        {/* Main Score Block */}
        <div className="flex items-center space-x-3.5 sm:space-x-5">
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex flex-col items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
            <span className="text-xl sm:text-3xl font-extrabold tracking-tight">
              {attempt.netScore}
            </span>
            <span className="text-[9px] sm:text-xs uppercase font-medium opacity-85">
              /{attempt.totalQuestions}
            </span>
          </div>

          <div className="min-w-0">
            <div className={`inline-block text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full mb-1 ${badgeColor}`}>
              {gradeText}
            </div>
            <h2 className="text-base sm:text-2xl font-bold text-slate-900 dark:text-white truncate">
              {attempt.examTitle}
            </h2>
            <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 truncate">
              Subject: <strong className="text-slate-700 dark:text-slate-300">{attempt.subjectName}</strong> • {new Date(attempt.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="flex items-center gap-2 sm:gap-3 self-start md:self-auto">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-800 text-center min-w-[80px] sm:min-w-[90px]">
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto text-emerald-500 mb-0.5" />
            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {attempt.accuracy}%
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500">Accuracy</div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-800 text-center min-w-[80px] sm:min-w-[90px]">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto text-blue-500 mb-0.5" />
            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {formatTimeLong(attempt.timeSpentSeconds)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500">Time Taken</div>
          </div>
        </div>

      </div>

      {/* Breakdown Grid - 2x2 on mobile, 4 columns on tablet/desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-5 sm:mt-6">
        
        {/* Correct */}
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] sm:text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              Correct (+1.0)
            </span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
            {attempt.correctCount}
          </div>
          <div className="text-[10px] sm:text-xs text-emerald-600/80 mt-0.5">
            +{attempt.positiveMarks} marks
          </div>
        </div>

        {/* Wrong */}
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] sm:text-xs font-semibold text-red-800 dark:text-red-300">
              Wrong (-0.5)
            </span>
            <XCircle className="w-3.5 h-3.5 text-red-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-red-700 dark:text-red-400">
            {attempt.wrongCount}
          </div>
          <div className="text-[10px] sm:text-xs text-red-600/80 mt-0.5">
            -{attempt.negativeMarks} marks
          </div>
        </div>

        {/* Skipped */}
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300">
              Skipped (0.0)
            </span>
            <MinusCircle className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-700 dark:text-slate-300">
            {attempt.skippedCount}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
            No penalty
          </div>
        </div>

        {/* Final Net Score */}
        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] sm:text-xs font-semibold text-indigo-800 dark:text-indigo-300">
              Net Score
            </span>
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-indigo-700 dark:text-indigo-400">
            {attempt.netScore}
          </div>
          <div className="text-[10px] sm:text-xs text-indigo-600/80 mt-0.5">
            {percentage}% total
          </div>
        </div>

      </div>
    </div>
  );
}
