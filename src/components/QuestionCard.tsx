"use client";

import React from "react";
import { Question } from "../lib/types";
import { Bookmark, RotateCcw } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedOption: number | undefined;
  isMarkedForReview: boolean;
  onSelectOption: (optionIndex: number) => void;
  onClearOption: () => void;
  onToggleMarkReview: () => void;
}

const OPTION_LABELS = ["A", "B", "C", "D", "E"];

export default function QuestionCard({
  question,
  index,
  selectedOption,
  isMarkedForReview,
  onSelectOption,
  onClearOption,
  onToggleMarkReview,
}: QuestionCardProps) {
  const isAnswered = selectedOption !== undefined && selectedOption !== -1;

  return (
    <article
      id={`q-${question.id}`}
      className={`scroll-mt-20 sm:scroll-mt-24 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 bg-white dark:bg-slate-900 shadow-sm ${
        isMarkedForReview
          ? "border-amber-400 dark:border-amber-500/60 ring-2 ring-amber-100 dark:ring-amber-950/40"
          : isAnswered
          ? "border-emerald-300 dark:border-emerald-800/80"
          : "border-slate-200 dark:border-slate-800"
      }`}
    >
      {/* Question Header */}
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
        <div className="flex items-center space-x-2">
          <span
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm transition-colors ${
              isMarkedForReview
                ? "bg-amber-100 text-amber-900 border border-amber-300"
                : isAnswered
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            }`}
          >
            {index + 1}
          </span>
          {question.topic && (
            <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 truncate max-w-[160px] sm:max-w-none">
              {question.topic}
            </span>
          )}
        </div>

        {/* Action buttons: Clear & Bookmark Review */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {isAnswered && (
            <button
              type="button"
              onClick={onClearOption}
              className="text-xs font-semibold text-slate-500 hover:text-red-600 active:text-red-700 dark:text-slate-400 dark:hover:text-red-400 flex items-center space-x-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation min-h-[34px]"
              title="Clear chosen answer to avoid -0.5 negative mark"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleMarkReview}
            className={`text-xs font-semibold flex items-center space-x-1 px-2.5 py-1.5 rounded-lg transition-colors border touch-manipulation min-h-[34px] ${
              isMarkedForReview
                ? "bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-300"
                : "border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 active:bg-slate-100"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isMarkedForReview ? "fill-amber-500 text-amber-500" : ""}`} />
            <span className="hidden xs:inline">{isMarkedForReview ? "Marked" : "Review"}</span>
          </button>
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-sm sm:text-base md:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed mb-4 sm:mb-5">
        {question.question}
      </h2>

      {/* Options List - Large, comfortable mobile touch targets */}
      <div className="space-y-2.5 sm:space-y-3">
        {question.options.map((optionText, optIndex) => {
          const isSelected = selectedOption === optIndex;
          return (
            <label
              key={optIndex}
              onClick={() => onSelectOption(optIndex)}
              className={`flex items-start p-3 sm:p-4 rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-150 select-none touch-manipulation active:scale-[0.99] min-h-[48px] ${
                isSelected
                  ? "bg-emerald-50/90 border-emerald-500 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-600 dark:text-emerald-100 shadow-sm ring-1 ring-emerald-500/20"
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-200 active:bg-slate-50"
              }`}
            >
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0 transition-colors ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 border border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
                }`}
              >
                {OPTION_LABELS[optIndex] || optIndex + 1}
              </div>
              <span className="text-xs sm:text-sm md:text-base leading-relaxed flex-1 font-normal pt-0.5">
                {optionText}
              </span>
            </label>
          );
        })}
      </div>
    </article>
  );
}
