"use client";

import React from "react";
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
  if (!isOpen) return null;

  return (
    <aside aria-label="Question Navigator" className="fixed bottom-4 right-4 z-40 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Question Navigator
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click to scroll directly to question
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Close Navigator"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs py-2.5 text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/60">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Answered
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Marked
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" /> Skipped
        </span>
      </div>

      {/* Grid of question buttons */}
      <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto pt-3 pr-1">
        {questions.map((q, idx) => {
          const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== -1;
          const isMarked = markedForReview.includes(q.id);

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(idx, q.id)}
              className={`h-9 rounded-xl text-xs font-bold transition-all transform active:scale-95 flex items-center justify-center relative ${
                isMarked
                  ? "bg-amber-100 text-amber-900 border-2 border-amber-400 dark:bg-amber-950 dark:text-amber-200"
                  : isAnswered
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/30 hover:bg-emerald-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {idx + 1}
              {isMarked && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
