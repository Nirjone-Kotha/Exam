"use client";

import React from "react";
import { Clock, AlertTriangle, CheckCircle2, Bookmark, Send, ListFilter } from "lucide-react";
import { formatTime } from "../lib/evaluation";

interface StickyExamHeaderProps {
  examTitle: string;
  subjectName: string;
  totalQuestions: number;
  answeredCount: number;
  markedCount: number;
  secondsRemaining: number;
  timeLimitSeconds: number;
  onOpenSubmitModal: () => void;
  onTogglePalette?: () => void;
  isPaletteOpen?: boolean;
}

export default function StickyExamHeader({
  examTitle,
  subjectName,
  totalQuestions,
  answeredCount,
  markedCount,
  secondsRemaining,
  timeLimitSeconds,
  onOpenSubmitModal,
  onTogglePalette,
  isPaletteOpen,
}: StickyExamHeaderProps) {
  const isUrgent = secondsRemaining <= 60; // < 1 min
  const isWarning = secondsRemaining <= 300 && !isUrgent; // < 5 mins
  const progressPercent = Math.min(100, Math.round((answeredCount / totalQuestions) * 100));

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-md transition-all">
      {/* Top micro progress bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5">
        <div
          className="bg-emerald-500 h-1.5 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Exam info (Left) */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 truncate">
                {subjectName}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden md:inline">
                • {totalQuestions} MCQs (Time: {Math.ceil(timeLimitSeconds / 60)} mins)
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate mt-0.5">
              {examTitle}
            </h1>
          </div>

          {/* Sticky Countdown Timer (Center / Focus) */}
          <div className="flex items-center">
            <div
              className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-base sm:text-xl font-bold border transition-all shadow-sm ${
                isUrgent
                  ? "bg-red-500 text-white border-red-600 animate-timer-alert shadow-red-500/30"
                  : isWarning
                  ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800"
                  : "bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-800"
              }`}
            >
              {isUrgent ? (
                <AlertTriangle className="w-5 h-5 text-white animate-bounce" />
              ) : (
                <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${isWarning ? "text-amber-600" : "text-emerald-600 dark:text-emerald-400"}`} />
              )}
              <span className="tracking-wider">{formatTime(secondsRemaining)}</span>
            </div>
          </div>

          {/* Stats & Actions (Right) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Answered indicator */}
            <div className="hidden lg:flex items-center space-x-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                {answeredCount}/{totalQuestions}
              </span>
              {markedCount > 0 && (
                <span className="flex items-center text-amber-600 dark:text-amber-400 border-l border-slate-300 dark:border-slate-600 pl-2">
                  <Bookmark className="w-3.5 h-3.5 mr-1" />
                  {markedCount}
                </span>
              )}
            </div>

            {/* Toggle Quick Jump Palette */}
            {onTogglePalette && (
              <button
                type="button"
                onClick={onTogglePalette}
                className={`p-2 rounded-lg border text-sm font-medium transition-colors flex items-center gap-1 ${
                  isPaletteOpen
                    ? "bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-700 dark:text-emerald-300"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                }`}
                title="Question Navigator"
              >
                <ListFilter className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-semibold">Jump</span>
              </button>
            )}

            {/* Submit Exam Button */}
            <button
              type="button"
              onClick={onOpenSubmitModal}
              className="flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Submit</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
