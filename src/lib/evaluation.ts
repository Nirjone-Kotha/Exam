import { Exam, ExamAttempt, Question } from "./types";

export interface EvaluationInput {
  exam: Exam;
  orderedQuestions: Question[];
  userAnswers: Record<string, number>;
  markedForReview: string[];
  timeSpentSeconds: number;
  timeLimitSeconds: number;
}

/**
 * Calculates exam results based on:
 * Correct: +1.0
 * Wrong: -0.5 (or exam.negativeMark)
 * Unattempted: 0.0
 */
export function evaluateExam(input: EvaluationInput): ExamAttempt {
  const {
    exam,
    orderedQuestions,
    userAnswers,
    markedForReview,
    timeSpentSeconds,
    timeLimitSeconds,
  } = input;

  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  const negativeMarkPerWrong = exam.negativeMark ?? 0.5;

  orderedQuestions.forEach((q) => {
    const selectedOption = userAnswers[q.id];
    if (selectedOption === undefined || selectedOption === -1) {
      skippedCount++;
    } else if (selectedOption === q.correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const positiveMarks = Number((correctCount * 1.0).toFixed(2));
  const negativeMarks = Number((wrongCount * negativeMarkPerWrong).toFixed(2));
  const netScore = Number((positiveMarks - negativeMarks).toFixed(2));

  const answeredCount = correctCount + wrongCount;
  const accuracy = answeredCount > 0 ? Number(((correctCount / answeredCount) * 100).toFixed(1)) : 0;

  const attemptId = `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    id: attemptId,
    examId: exam.id,
    examTitle: exam.title,
    subjectName: exam.subjectName,
    timestamp: Date.now(),
    totalQuestions: orderedQuestions.length,
    answeredCount,
    correctCount,
    wrongCount,
    skippedCount,
    positiveMarks,
    negativeMarks,
    netScore,
    accuracy,
    timeSpentSeconds,
    timeLimitSeconds,
    userAnswers,
    orderedQuestions,
    markedForReview,
  };
}

/**
 * Formats seconds into human-readable MM:SS or HH:MM:SS
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function formatTimeLong(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}
