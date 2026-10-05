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
      className={`scroll-mt-24 p-5 sm:p-6 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md ${
        isMarkedForReview
          ? "border-amber-400 dark:border-amber-500/60 ring-2 ring-amber-100 dark:ring-amber-950/40"
          : isAnswered
          ? "border-emerald-300 dark:border-emerald-800/80"
          : "border-slate-200 dark:border-slate-800"
      }`}
    >
      {/* Question Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2.5">
          <span
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm transition-colors ${
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
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {question.topic}
            </span>
          )}
        </div>

        {/* Action icons: Mark for Review & Clear selection */}
        <div className="flex items-center space-x-2">
          {isAnswered && (
            <button
              type="button"
              onClick={onClearOption}
              className="text-xs font-medium text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Clear chosen answer to avoid -0.5 negative mark"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleMarkReview}
            className={`text-xs font-medium flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-colors border ${
              isMarkedForReview
                ? "bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-300 font-semibold"
                : "border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isMarkedForReview ? "fill-amber-500 text-amber-500" : ""}`} />
            <span className="hidden sm:inline">{isMarkedForReview ? "Marked" : "Review"}</span>
          </button>
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed mb-5">
        {question.question}
      </h2>

      {/* Options List */}
      <div className="space-y-3">
        {question.options.map((optionText, optIndex) => {
          const isSelected = selectedOption === optIndex;
          return (
            <label
              key={optIndex}
              onClick={() => onSelectOption(optIndex)}
              className={`flex items-start p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all duration-150 select-none ${
                isSelected
                  ? "bg-emerald-50/90 border-emerald-500 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-600 dark:text-emerald-100 shadow-sm"
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold mr-3.5 mt-0.5 flex-shrink-0 transition-colors ${
                  isSelected
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600 border border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
                }`}
              >
                {OPTION_LABELS[optIndex] || optIndex + 1}
              </div>
              <span className="text-sm sm:text-base leading-snug flex-1 font-normal">
                {optionText}
              </span>
            </label>
          );
        })}
      </div>
    </article>
  );
}
