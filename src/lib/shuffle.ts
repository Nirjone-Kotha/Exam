import { Question } from "./types";

/**
 * Modern Fisher-Yates (Knuth) Shuffle algorithm.
 * Guarantees unbiased random permutation.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Shuffles questions order for an exam attempt.
 * Also shuffles the options of each question, safely mapping the correctAnswer index.
 */
export function randomizeExamQuestions(questions: Question[]): Question[] {
  // First shuffle the order of the questions
  const shuffledQuestions = shuffleArray(questions);

  // Now randomize options inside each question while maintaining correct answer tracking
  return shuffledQuestions.map((q) => {
    // Map original options with their original index
    const indexedOptions = q.options.map((opt, idx) => ({
      text: opt,
      isCorrect: idx === q.correctAnswer,
    }));

    // Shuffle options
    const shuffledOptions = shuffleArray(indexedOptions);
    const newCorrectAnswerIndex = shuffledOptions.findIndex((o) => o.isCorrect);

    return {
      ...q,
      options: shuffledOptions.map((o) => o.text),
      correctAnswer: newCorrectAnswerIndex,
    };
  });
}
