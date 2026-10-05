"use client";

import React, { useEffect } from "react";
import { Question } from "../lib/types";
import { X, CheckCircle2, Bookmark, HelpCircle } from "lucide-react";

interface QuestionPaletteProps {
  questions: Question[];
  userAnswers: Record<string, number>;
  markedForReview: string[];
  activeQuestionIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (index: number, questionId: string) => void;
}

export default function QuestionPalette({
  questions,
  userAnswers,
  markedForReview,
  isOpen,
  onClose,
  onSelectQuestion,
}: QuestionPaletteProps) {
  // Prevent body scrolling when mobile bottom sheet is open
  useEffect(() => {
    if (isOpen && typeof window !== "undefined" && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (idx: number, qId: string) => {
    onSelectQuestion(idx, qId);
    // Auto-close on mobile so the user sees the jumped question immediately
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      <div
        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm sm:hidden transition-opacity"
        onClick={onClose}
      />

      {/* Navigator: Bottom sheet on mobile, floating box on desktop */}
      <aside
        aria-label="Question Navigator"
        className="fixed z-50 bottom-0 left-0 right-0 sm:bottom-4 sm:right-4 sm:left-auto sm:w-80 max-h-[80vh] sm:max-h-[550px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 flex flex-col transition-transform animate-slideUp"
      >
        {/* Mobile drag handle */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base sm:text-sm text-slate-900 dark:text-white">
              Question Navigator ({questions.length} MCQs)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tap any number to jump directly
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close Navigator"
            aria-label="Close Navigator"
          >
            <X className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs py-2.5 text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/60 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" /> Answered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400" /> Marked
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" /> Skipped
          </span>
        </div>

        {/* Grid of question buttons: 6 columns on mobile, 5 on desktop */}
        <div className="grid grid-cols-6 sm:grid-cols-5 gap-2 overflow-y-auto pt-3 pb-2 flex-1 touch-pan-y">
          {questions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== -1;
            const isMarked = markedForReview.includes(q.id);

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSelect(idx, q.id)}
                className={`h-11 sm:h-9 rounded-xl text-sm sm:text-xs font-bold transition-all transform active:scale-95 flex items-center justify-center relative touch-manipulation shadow-sm ${
                  isMarked
                    ? "bg-amber-100 text-amber-900 border-2 border-amber-400 dark:bg-amber-950 dark:text-amber-200"
                    : isAnswered
                    ? "bg-emerald-600 text-white shadow-emerald-500/30 hover:bg-emerald-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {idx + 1}
                {isMarked && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-1 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}
