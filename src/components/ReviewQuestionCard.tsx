"use client";

import React, { useState } from "react";
import { Question } from "../lib/types";
import { CheckCircle2, XCircle, MinusCircle, Lightbulb, Bookmark } from "lucide-react";
import { toggleBookmark } from "../lib/storage";

interface ReviewQuestionCardProps {
  question: Question;
  index: number;
  userSelectedOption: number | undefined;
  negativeMarkRate: number;
  isInitiallyBookmarked?: boolean;
}

const OPTION_LABELS = ["A", "B", "C", "D", "E"];

export default function ReviewQuestionCard({
  question,
  index,
  userSelectedOption,
  negativeMarkRate,
  isInitiallyBookmarked = false,
}: ReviewQuestionCardProps) {
  const [bookmarked, setBookmarked] = useState(isInitiallyBookmarked);

  const isSkipped = userSelectedOption === undefined || userSelectedOption === -1;
  const isCorrect = !isSkipped && userSelectedOption === question.correctAnswer;
  const isWrong = !isSkipped && userSelectedOption !== question.correctAnswer;

  const handleToggleBookmark = () => {
    const nextState = toggleBookmark(question.id);
    setBookmarked(nextState);
  };

  return (
    <article className={`p-4 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all bg-white dark:bg-slate-900 shadow-sm ${
      isCorrect
        ? "border-emerald-200 dark:border-emerald-800/80"
        : isWrong
        ? "border-red-200 dark:border-red-800/80"
        : "border-slate-200 dark:border-slate-800"
    }`}>
      {/* Top Status Bar */}
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700">
            {index + 1}
          </span>
          {question.topic && (
            <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 truncate max-w-[140px] sm:max-w-none">
              {question.topic}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Status Badge */}
          {isCorrect && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>+1.0 Correct</span>
            </span>
          )}

          {isWrong && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-300 dark:border-red-800">
              <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>-{negativeMarkRate}</span>
            </span>
          )}

          {isSkipped && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <MinusCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Skipped</span>
            </span>
          )}

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleToggleBookmark}
            className={`p-1.5 rounded-lg border transition-colors touch-manipulation min-h-[32px] ${
              bookmarked
                ? "bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-400"
                : "border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:border-slate-700"
            }`}
            title="Bookmark for later review"
            aria-label="Bookmark Question"
          >
            <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${bookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
          </button>
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-sm sm:text-base md:text-lg font-medium text-slate-900 dark:text-white leading-relaxed mb-4">
        {question.question}
      </h3>

      {/* Options - Responsive Stack for badges on mobile */}
      <div className="space-y-2 sm:space-y-3 mb-4">
        {question.options.map((optText, optIdx) => {
          const isTheCorrectAnswer = optIdx === question.correctAnswer;
          const isUserPick = userSelectedOption === optIdx;

          let optionStyle = "bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300";
          let labelBadge = "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";

          if (isTheCorrectAnswer) {
            optionStyle = "bg-emerald-50/90 border-emerald-400 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-600 dark:text-emerald-100 font-medium ring-1 ring-emerald-300/50";
            labelBadge = "bg-emerald-600 text-white font-bold";
          } else if (isUserPick && isWrong) {
            optionStyle = "bg-red-50/90 border-red-300 text-red-950 dark:bg-red-950/40 dark:border-red-700 dark:text-red-100 line-through opacity-85";
            labelBadge = "bg-red-600 text-white font-bold";
          }

          return (
            <div
              key={optIdx}
              className={`flex items-start p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all ${optionStyle}`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0 ${labelBadge}`}
              >
                {OPTION_LABELS[optIdx]}
              </div>

              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs sm:text-sm md:text-base leading-snug">
                  {optText}
                </span>

                <div className="flex-shrink-0 self-start sm:self-auto pt-0.5 sm:pt-0">
                  {isTheCorrectAnswer && (
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md inline-block">
                      Correct Answer ✔
                    </span>
                  )}
                  {isUserPick && isWrong && (
                    <span className="text-[10px] sm:text-xs font-bold text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950 px-2 py-0.5 rounded-md inline-block">
                      Your Choice ✖
                    </span>
                  )}
                  {isUserPick && isCorrect && (
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md inline-block">
                      Your Choice ✔
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* In-depth Medical Explanation */}
      <div className="p-3.5 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
        <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs sm:text-sm mb-1.5">
          <Lightbulb className="w-4 h-4 flex-shrink-0" />
          <span>Clinical Rationale & Explanation:</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {question.explanation}
        </p>
      </div>
    </article>
  );
}
