export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed (0: A, 1: B, 2: C, 3: D)
  explanation: string;
  subject: string;
  topic?: string;
  year?: string;
}

export interface Exam {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  description: string;
  questions: Question[];
  customTimeMinutes?: number; // default is Math.ceil(questions.length / 2)
  negativeMark: number; // default: 0.5
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  accentColor: string;
  exams: Exam[];
}

export interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  subjectName: string;
  timestamp: number;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  positiveMarks: number;
  negativeMarks: number;
  netScore: number;
  accuracy: number;
  timeSpentSeconds: number;
  timeLimitSeconds: number;
  userAnswers: Record<string, number>; // questionId -> selectedOptionIndex (0-3)
  orderedQuestions: Question[]; // stores the shuffled order presented to user
  markedForReview: string[];
}

export interface AttemptComparison {
  currentAttempt: ExamAttempt;
  previousAttempt?: ExamAttempt;
  bestAttempt?: ExamAttempt;
  totalAttempts: number;
  scoreDelta?: number;
  accuracyDelta?: number;
  timeDelta?: number;
  wrongCountDelta?: number;
}
