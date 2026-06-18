import type { Scope } from "./Scope";

export const quizModes = [
    "mixed",
    "movement",
    "function",
    "attachmentProximal",
    "attachmentDistal",
    "review",
] as const;

export type QuizMode = (typeof quizModes)[number];
export type QuizQuestionKind = Exclude<QuizMode, "mixed" | "review">;

export interface QuizQuestion {
    id: string;
    muscleId: number;
    muscleName: string;
    kind: QuizQuestionKind;
    prompt: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export interface QuizSession {
    id: string;
    scope: Scope;
    scopeId: number;
    mode: QuizMode;
    contextTitle: string;
    questions: QuizQuestion[];
}

export interface QuizAnswerRecord {
    questionId: string;
    prompt: string;
    selected: string;
    correct: string;
    explanation: string;
    muscleId: number;
    muscleName: string;
    kind: QuizQuestionKind;
}

export interface QuizResultState {
    session: QuizSession;
    answers: QuizAnswerRecord[];
    score: number;
}
