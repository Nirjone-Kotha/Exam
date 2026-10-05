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
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all touch-manipulation">
      {/* Top micro progress bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 sm:h-1.5">
        <div
          className="bg-emerald-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-1.5 sm:gap-4">
          
          {/* Exam info (Left) - Compact on Mobile */}
          <div className="min-w-0 flex-1 pr-1">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 truncate max-w-[110px] sm:max-w-none">
                {subjectName}
              </span>
              {/* Answered progress pill visible on mobile! */}
              <span className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {answeredCount}/{totalQuestions}
              </span>
            </div>
            <h1 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white truncate mt-0.5 leading-tight">
              {examTitle}
            </h1>
          </div>

          {/* Sticky Countdown Timer (Center / Focus) */}
          <div className="flex items-center flex-shrink-0">
            <div
              className={`flex items-center space-x-1 sm:space-x-2 px-2.5 sm:px-4 py-1 sm:py-2 rounded-xl font-mono text-sm sm:text-xl font-bold border transition-all shadow-sm ${
                isUrgent
                  ? "bg-red-500 text-white border-red-600 animate-timer-alert shadow-red-500/30"
                  : isWarning
                  ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800"
                  : "bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-800"
              }`}
            >
              {isUrgent ? (
                <AlertTriangle className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white animate-bounce" />
              ) : (
                <Clock className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${isWarning ? "text-amber-600" : "text-emerald-600 dark:text-emerald-400"}`} />
              )}
              <span className="tracking-wider">{formatTime(secondsRemaining)}</span>
            </div>
          </div>

          {/* Stats & Actions (Right) */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
            {/* Marked indicator (desktop) */}
            {markedCount > 0 && (
              <span className="hidden sm:inline-flex items-center text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
                <Bookmark className="w-3 h-3 mr-1 fill-amber-500" />
                {markedCount}
              </span>
            )}

            {/* Toggle Quick Jump Palette Button */}
            {onTogglePalette && (
              <button
                type="button"
                onClick={onTogglePalette}
                className={`p-1.5 sm:p-2 rounded-xl border text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1 min-h-[36px] ${
                  isPaletteOpen
                    ? "bg-emerald-100 border-emerald-300 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-700 dark:text-emerald-300"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 active:bg-slate-100"
                }`}
                title="Question Navigator"
                aria-label="Toggle Question Jump Navigator"
              >
                <ListFilter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden xs:inline">Jump</span>
              </button>
            )}

            {/* Submit Exam Button */}
            <button
              type="button"
              onClick={onOpenSubmitModal}
              className="flex items-center space-x-1 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 active:scale-95 transition-all min-h-[36px]"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Submit</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
