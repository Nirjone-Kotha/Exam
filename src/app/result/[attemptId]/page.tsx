"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { getAttemptComparison, getAttemptsForExam } from "../../../lib/storage";
import { AttemptComparison, ExamAttempt } from "../../../lib/types";
import ScoreSummaryCard from "../../../components/ScoreSummaryCard";
import AttemptComparisonCard from "../../../components/AttemptComparisonCard";
import ReviewQuestionCard from "../../../components/ReviewQuestionCard";
import {
  RotateCcw,
  ArrowLeft,
  Filter,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Layers,
  Printer
} from "lucide-react";

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = params.attemptId as string;

  const [comparison, setComparison] = useState<AttemptComparison | null>(null);
  const [allExamAttempts, setAllExamAttempts] = useState<ExamAttempt[]>([]);
  const [filterMode, setFilterMode] = useState<"all" | "wrong" | "correct" | "skipped">("all");

  useEffect(() => {
    const comp = getAttemptComparison(attemptId);
    if (!comp) return;

    setComparison(comp);
    const all = getAttemptsForExam(comp.currentAttempt.examId);
    setAllExamAttempts(all);

    // Trigger confetti celebration if accuracy >= 70%
    if (comp.currentAttempt.accuracy >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#06b6d4", "#3b82f6", "#f59e0b"],
      });
    }
  }, [attemptId]);

  if (!comparison) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Exam Result Not Found</h2>
        <p className="text-sm text-slate-500">Could not retrieve attempt data from local records.</p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Return to Home
        </Link>
      </div>
    );
  }

  const { currentAttempt } = comparison;

  // Filter questions based on filterMode
  const filteredQuestions = currentAttempt.orderedQuestions.filter((q) => {
    const userChoice = currentAttempt.userAnswers[q.id];
    const isSkipped = userChoice === undefined || userChoice === -1;
    const isCorrect = !isSkipped && userChoice === q.correctAnswer;
    const isWrong = !isSkipped && userChoice !== q.correctAnswer;

    if (filterMode === "wrong") return isWrong;
    if (filterMode === "correct") return isCorrect;
    if (filterMode === "skipped") return isSkipped;
    return true; // all
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href={`/`}
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Home Dashboard
        </Link>

        <div className="flex items-center space-x-3">
          {/* Print / Save PDF */}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          {/* Retake Button (freshly randomized questions) */}
          <Link
            href={`/exam/${currentAttempt.examId}`}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam (Shuffled)</span>
          </Link>
        </div>
      </div>

      {/* 1. Score Summary Card (+1.0, -0.5, Net Score, Accuracy, Time) */}
      <ScoreSummaryCard attempt={currentAttempt} />

      {/* 2. Multi-Attempt Comparison Engine (Current vs Previous Attempts) */}
      <AttemptComparisonCard
        comparison={comparison}
        allAttempts={allExamAttempts}
      />

      {/* 3. Detailed Answer & Explanation Review Section */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Instant Question Review & Medical Explanations
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Showing detailed breakdown of all questions with chosen answers, correct keys, and clinical rationale.
            </p>
          </div>

          {/* Review Filter Tabs */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl self-start sm:self-auto text-xs font-semibold">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterMode === "all"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              All ({currentAttempt.totalQuestions})
            </button>
            <button
              onClick={() => setFilterMode("wrong")}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                filterMode === "wrong"
                  ? "bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-red-600"
              }`}
            >
              <XCircle className="w-3.5 h-3.5" /> Mistakes ({currentAttempt.wrongCount})
            </button>
            <button
              onClick={() => setFilterMode("correct")}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                filterMode === "correct"
                  ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-emerald-600"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Correct ({currentAttempt.correctCount})
            </button>
            <button
              onClick={() => setFilterMode("skipped")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterMode === "skipped"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Skipped ({currentAttempt.skippedCount})
            </button>
          </div>
        </div>

        {/* Render Review Question Cards */}
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
            No questions match the selected filter.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((question, idx) => (
              <ReviewQuestionCard
                key={question.id}
                question={question}
                index={idx}
                userSelectedOption={currentAttempt.userAnswers[question.id]}
                negativeMarkRate={0.5}
              />
            ))}
          </div>
        )}

      </section>

      {/* Bottom Floating Navigation */}
      <div className="pt-8 text-center">
        <Link
          href={`/exam/${currentAttempt.examId}`}
          className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-base shadow-xl shadow-emerald-600/25 active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Retake Exam with Newly Shuffled Questions</span>
        </Link>
      </div>

    </div>
  );
}
