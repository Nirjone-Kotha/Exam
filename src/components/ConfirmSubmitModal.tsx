"use client";

import React from "react";
import { AlertCircle, CheckCircle2, Bookmark, HelpCircle } from "lucide-react";
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
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Ready to Submit Exam?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Please review your exam progress before finalizing. Once submitted, your score and detailed explanations will be calculated instantly.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
          <div className="p-2">
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {answeredCount}
            </div>
            <div className="text-xs text-slate-500">Answered</div>
          </div>
          <div className="p-2 border-x border-slate-200 dark:border-slate-700">
            <div className={`text-lg font-bold ${unansweredCount > 0 ? "text-amber-500" : "text-slate-600"}`}>
              {unansweredCount}
            </div>
            <div className="text-xs text-slate-500">Unanswered</div>
          </div>
          <div className="p-2">
            <div className="text-lg font-bold text-slate-700 dark:text-slate-300">
              {formatTime(secondsRemaining)}
            </div>
            <div className="text-xs text-slate-500">Time Left</div>
          </div>
        </div>

        {/* Penalty reminder alert */}
        <div className="text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 leading-relaxed">
          <strong>Note on Negative Marking:</strong> Every correct answer earns <strong>+1.0 mark</strong>. Every wrong answer deducts <strong>-0.5 mark</strong>. Unattempted questions incur no penalty.
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Review More
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm shadow-md shadow-emerald-500/25 active:scale-95 transition-all"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
}
