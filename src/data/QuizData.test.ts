import { describe, expect, it } from "vitest";
import { Scope } from "../model/Scope";
import { createQuizSession } from "./QuizData";

describe("createQuizSession", () => {
    it("builds a stable session structure for mixed mode without duplicate question ids", () => {
        const session = createQuizSession({
            scope: Scope.System,
            scopeId: 2,
            mode: "mixed",
            limit: 8,
            rng: () => 0.42,
        });

        expect(session).not.toBeNull();
        expect(session?.questions).toHaveLength(8);
        expect(new Set(session?.questions.map((question) => question.id)).size).toBe(session?.questions.length);
    });

    it("always includes the correct answer and never produces duplicate options", () => {
        const session = createQuizSession({
            scope: Scope.SubGroup,
            scopeId: 1001,
            mode: "function",
            limit: 3,
            rng: () => 0.19,
        });

        expect(session).not.toBeNull();

        for (const question of session?.questions ?? []) {
            expect(question.options).toContain(question.correctAnswer);
            expect(new Set(question.options).size).toBe(question.options.length);
            expect(question.options.length).toBeGreaterThanOrEqual(2);
        }
    });

    it("keeps neck quiz distractors inside the same anatomical context", () => {
        const session = createQuizSession({
            scope: Scope.SubGroup,
            scopeId: 1001,
            mode: "function",
            limit: 4,
            rng: () => 0.19,
        });

        expect(session).not.toBeNull();

        for (const question of session?.questions ?? []) {
            expect(question.options.join(" | ").toLowerCase()).not.toContain("kolano");
            expect(question.options.join(" | ").toLowerCase()).not.toContain("biodro");
        }
    });

    it("builds movement quizzes only from explicit action data", () => {
        const session = createQuizSession({
            scope: Scope.System,
            scopeId: 2,
            mode: "movement",
            limit: 6,
            rng: () => 0.27,
        });

        expect(session).not.toBeNull();

        for (const question of session?.questions ?? []) {
            expect(question.correctAnswer.length).toBeGreaterThan(0);
            expect(question.prompt.toLowerCase()).toContain("ruch");
            expect(question.options).toContain(question.correctAnswer);
        }
    });

    it("returns null for movement mode when the scope has no curated action database yet", () => {
        const session = createQuizSession({
            scope: Scope.SubGroup,
            scopeId: 6004,
            mode: "movement",
            limit: 6,
            rng: () => 0.27,
        });

        expect(session).toBeNull();
    });

    it("creates a review session only from provided wrong questions", () => {
        const source = createQuizSession({
            scope: Scope.Region,
            scopeId: 301,
            mode: "mixed",
            limit: 4,
            rng: () => 0.11,
        });

        const wrongQuestions = source?.questions.slice(0, 2) ?? [];
        const review = createQuizSession({
            scope: Scope.Region,
            scopeId: 301,
            mode: "review",
            reviewQuestions: wrongQuestions,
            rng: () => 0.11,
        });

        expect(review?.mode).toBe("review");
        expect(review?.questions).toHaveLength(2);
        expect(review?.questions.map((question) => question.id)).toEqual(wrongQuestions.map((question) => question.id));
    });
});
