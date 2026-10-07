"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getExamById } from "../../../data/subjects";
import { Question, Exam } from "../../../lib/types";
import { randomizeExamQuestions } from "../../../lib/shuffle";
import { evaluateExam } from "../../../lib/evaluation";
import { saveAttempt } from "../../../lib/storage";
import StickyExamHeader from "../../../components/StickyExamHeader";
import QuestionCard from "../../../components/QuestionCard";
import QuestionPalette from "../../../components/QuestionPalette";
import ConfirmSubmitModal from "../../../components/ConfirmSubmitModal";
import { ShieldAlert, ListFilter } from "lucide-react";

export default function ExamRoomPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;

  const [examData, setExamData] = useState<{ exam: Exam; subjectName: string } | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  
  // Time limit (default: MCQs / 2 minutes)
  const [timeLimitSeconds, setTimeLimitSeconds] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Exam with dynamic randomization
  useEffect(() => {
    const found = getExamById(examId);
    if (!found) return;

    const { exam, subject } = found;
    setExamData({ exam, subjectName: subject.name });

    // Dynamic randomization: shuffle questions and options on every visit/retake
    const randomized = randomizeExamQuestions(exam.questions);
    setShuffledQuestions(randomized);

    // Calculate default time limit: Total questions / 2 minutes
    const minutes = exam.customTimeMinutes || Math.max(1, Math.ceil(exam.questions.length / 2));
    const totalSecs = minutes * 60;
    setTimeLimitSeconds(totalSecs);
    setSecondsRemaining(totalSecs);
  }, [examId]);

  // Countdown timer logic
  useEffect(() => {
    if (secondsRemaining <= 0 || isSubmitting) return;

    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAutoSubmitOnTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [secondsRemaining, isSubmitting]);

  // Protect against accidental tab close/refresh during active exam
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (Object.keys(userAnswers).length > 0 && !isSubmitting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [userAnswers, isSubmitting]);

  // Answer selection handler
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Clear chosen answer (to avoid -0.5 negative penalty if user is unsure)
  const handleClearOption = (questionId: string) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  // Toggle mark for review
  const handleToggleMarkReview = (questionId: string) => {
    setMarkedForReview((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  // Scroll to question
  const handleJumpToQuestion = (index: number, questionId: string) => {
    const el = document.getElementById(`q-${questionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Final evaluation and submission
  const executeSubmission = () => {
    if (!examData || shuffledQuestions.length === 0 || isSubmitting) return;
    setIsSubmitting(true);

    if (timerRef.current) clearInterval(timerRef.current);

    const timeSpent = timeLimitSeconds - secondsRemaining;

    const attempt = evaluateExam({
      exam: examData.exam,
      orderedQuestions: shuffledQuestions,
      userAnswers,
      markedForReview,
      timeSpentSeconds: timeSpent,
      timeLimitSeconds,
    });

    // Save to LocalStorage
    saveAttempt(attempt);

    // Redirect to Result Hub
    router.push(`/result/${attempt.id}`);
  };

  // Auto-submit when time expires
  const handleAutoSubmitOnTimeout = () => {
    alert("Time is up! Your exam will now be submitted automatically.");
    executeSubmission();
  };

  if (!examData || shuffledQuestions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Loading Exam Room...</h2>
        <p className="text-sm text-slate-500">Preparing randomized questions and timer</p>
      </div>
    );
  }

  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k] !== undefined && userAnswers[k] !== -1
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-28">
      {/* 
        Sticky Top Header: Stays fixed at the top while scrolling 
        Contains the live countdown timer, progress, and submit button
      */}
      <StickyExamHeader
        examTitle={examData.exam.title}
        subjectName={examData.subjectName}
        totalQuestions={shuffledQuestions.length}
        answeredCount={answeredCount}
        markedCount={markedForReview.length}
        secondsRemaining={secondsRemaining}
        timeLimitSeconds={timeLimitSeconds}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onTogglePalette={() => setIsPaletteOpen((prev) => !prev)}
        isPaletteOpen={isPaletteOpen}
      />

      {/* Main Questions Container: All questions rendered together on one scrollable page */}
      <main className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
        
        {/* Negative marking & timing instruction alert */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-3 sm:p-4 text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 flex items-start gap-2.5 sm:gap-3 shadow-sm">
          <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Exam Mode:</strong> All {shuffledQuestions.length} questions loaded. Scroll freely. Correct: <strong>+1.0</strong>, Wrong: <strong>-0.5</strong>. Clear option anytime to avoid penalty.
          </div>
        </div>

        {/* All Questions rendered sequentially without pagination */}
        <div className="space-y-4 sm:space-y-6">
          {shuffledQuestions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={idx}
              selectedOption={userAnswers[q.id]}
              isMarkedForReview={markedForReview.includes(q.id)}
              onSelectOption={(optIdx) => handleSelectOption(q.id, optIdx)}
              onClearOption={() => handleClearOption(q.id)}
              onToggleMarkReview={() => handleToggleMarkReview(q.id)}
            />
          ))}
        </div>

        {/* Bottom Final Submit Trigger */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Finished Answering Questions?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            You have answered {answeredCount} of {shuffledQuestions.length} questions.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 active:scale-95 transition-all min-h-[44px]"
          >
            Review & Finalize Submission
          </button>
        </div>
      </main>

      {/* Mobile Floating Action Button (FAB) for Question Navigator */}
      <button
        type="button"
        onClick={() => setIsPaletteOpen(true)}
        className="sm:hidden fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/40 flex items-center justify-center font-bold active:scale-90 border-2 border-white dark:border-slate-800 touch-manipulation transition-transform"
        aria-label="Open Question Navigator"
        title="Open Question Navigator"
      >
        <ListFilter className="w-5 h-5" />
      </button>

      {/* Floating / Bottom Sheet Question Jump Palette */}
      <QuestionPalette
        questions={shuffledQuestions}
        userAnswers={userAnswers}
        markedForReview={markedForReview}
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSelectQuestion={(idx, qId) => handleJumpToQuestion(idx, qId)}
      />

      {/* Confirmation Modal */}
      <ConfirmSubmitModal
        isOpen={isSubmitModalOpen}
        totalQuestions={shuffledQuestions.length}
        answeredCount={answeredCount}
        markedCount={markedForReview.length}
        secondsRemaining={secondsRemaining}
        onCancel={() => setIsSubmitModalOpen(false)}
        onConfirm={() => {
          setIsSubmitModalOpen(false);
          executeSubmission();
        }}
      />
    </div>
  );
}
