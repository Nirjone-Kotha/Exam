import { ExamAttempt, AttemptComparison } from "./types";

const ATTEMPTS_STORAGE_KEY = "bcs_exam_attempts_v1";
const BOOKMARKS_STORAGE_KEY = "bcs_exam_bookmarks_v1";

/**
 * Retrieve all saved attempts from LocalStorage
 */
export function getAllAttempts(): ExamAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ExamAttempt[];
  } catch (error) {
    console.error("Failed to load exam attempts:", error);
    return [];
  }
}

/**
 * Save an exam attempt to LocalStorage
 */
export function saveAttempt(attempt: ExamAttempt): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getAllAttempts();
    // Add new attempt at the beginning
    const updated = [attempt, ...existing];
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save exam attempt:", error);
  }
}

/**
 * Retrieve a specific attempt by its unique attempt ID
 */
export function getAttemptById(attemptId: string): ExamAttempt | null {
  const attempts = getAllAttempts();
  return attempts.find((a) => a.id === attemptId) || null;
}

/**
 * Retrieve all past attempts for a specific exam
 */
export function getAttemptsForExam(examId: string): ExamAttempt[] {
  const attempts = getAllAttempts();
  return attempts
    .filter((a) => a.examId === examId)
    .sort((a, b) => b.timestamp - a.timestamp); // latest first
}

/**
 * Calculate attempt comparison statistics for an exam attempt
 */
export function getAttemptComparison(attemptId: string): AttemptComparison | null {
  const currentAttempt = getAttemptById(attemptId);
  if (!currentAttempt) return null;

  const allExamAttempts = getAttemptsForExam(currentAttempt.examId);
  
  // Find index of current attempt in sorted list
  const currentIndex = allExamAttempts.findIndex((a) => a.id === attemptId);
  
  // The immediate previous attempt is the one that occurred before this attempt chronologically
  const olderAttempts = allExamAttempts.filter((a) => a.timestamp < currentAttempt.timestamp);
  const previousAttempt = olderAttempts.length > 0 ? olderAttempts[0] : undefined;

  // Best attempt among all attempts of this exam
  const bestAttempt = [...allExamAttempts].sort((a, b) => b.netScore - a.netScore)[0];

  let scoreDelta: number | undefined;
  let accuracyDelta: number | undefined;
  let timeDelta: number | undefined;
  let wrongCountDelta: number | undefined;

  if (previousAttempt) {
    scoreDelta = Number((currentAttempt.netScore - previousAttempt.netScore).toFixed(2));
    accuracyDelta = Number((currentAttempt.accuracy - previousAttempt.accuracy).toFixed(1));
    timeDelta = currentAttempt.timeSpentSeconds - previousAttempt.timeSpentSeconds;
    wrongCountDelta = currentAttempt.wrongCount - previousAttempt.wrongCount;
  }

  return {
    currentAttempt,
    previousAttempt,
    bestAttempt,
    totalAttempts: allExamAttempts.length,
    scoreDelta,
    accuracyDelta,
    timeDelta,
    wrongCountDelta,
  };
}

/**
 * Bookmarked questions management
 */
export function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(questionId: string): boolean {
  if (typeof window === "undefined") return false;
  const bookmarks = getBookmarks();
  let updated: string[];
  let isBookmarked = false;
  if (bookmarks.includes(questionId)) {
    updated = bookmarks.filter((id) => id !== questionId);
  } else {
    updated = [...bookmarks, questionId];
    isBookmarked = true;
  }
  localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
  return isBookmarked;
}
