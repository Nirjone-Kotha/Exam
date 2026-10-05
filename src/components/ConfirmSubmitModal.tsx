"use client";

import React, { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { formatTime } from "../lib/evaluation";

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  totalQuestions: number;
  answeredCount: number;
  markedCount: number;
  secondsRemaining: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmSubmitModal({
  isOpen,
  totalQuestions,
  answeredCount,
  markedCount,
  secondsRemaining,
  onCancel,
  onConfirm,
}: ConfirmSubmitModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-5 animate-slideUp sm:animate-none">
        
        {/* Mobile handle */}
        <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto sm:hidden" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Ready to Submit Exam?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Please review your exam progress before finalizing. Instant score, negative marking, and detailed clinical explanations will be generated.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
          <div className="p-1.5">
            <div className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              {answeredCount}
            </div>
            <div className="text-[11px] text-slate-500">Answered</div>
          </div>
          <div className="p-1.5 border-x border-slate-200 dark:border-slate-700">
            <div className={`text-base sm:text-lg font-extrabold ${unansweredCount > 0 ? "text-amber-500" : "text-slate-600"}`}>
              {unansweredCount}
            </div>
            <div className="text-[11px] text-slate-500">Unanswered</div>
          </div>
          <div className="p-1.5">
            <div className="text-base sm:text-lg font-extrabold text-slate-700 dark:text-slate-300 font-mono">
              {formatTime(secondsRemaining)}
            </div>
            <div className="text-[11px] text-slate-500">Time Left</div>
          </div>
        </div>

        {/* Penalty reminder alert */}
        <div className="text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 leading-relaxed">
          <strong>Negative Marking Reminder:</strong> Correct answer earns <strong>+1.0 mark</strong>. Wrong answer deducts <strong>-0.5 mark</strong>. Skipped questions incur no penalty.
        </div>

        {/* Thumb-friendly mobile action buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center gap-2 sm:gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-slate-100 transition-colors min-h-[44px]"
          >
            Review More
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-500/25 active:scale-95 transition-all min-h-[44px]"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
}
