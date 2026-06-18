import type { Muscle } from "../model/Muscle";
import type { QuizMode, QuizQuestion, QuizQuestionKind, QuizSession } from "../model/Quiz";
import type { Scope } from "../model/Scope";
import { getAllMuscles, getMusclesByScope, getScopeTitle } from "./muscleSelectors";

const QUESTION_KINDS: QuizQuestionKind[] = ["function", "attachmentProximal", "attachmentDistal"];

const MODE_LABELS: Record<QuizMode, string> = {
    mixed: "Mieszany",
    function: "Funkcje",
    attachmentProximal: "Przyczep początkowy",
    attachmentDistal: "Przyczep końcowy",
    review: "Powtórka błędów",
};

export function getQuizModeLabel(mode: QuizMode): string {
    return MODE_LABELS[mode];
}

export function isQuizMode(value: string | undefined): value is QuizMode {
    return value !== undefined && quizModeList.includes(value as QuizMode);
}

export const quizModeList: QuizMode[] = ["mixed", ...QUESTION_KINDS, "review"];

function getQuestionKinds(mode: QuizMode): QuizQuestionKind[] {
    if (mode === "mixed" || mode === "review") {
        return QUESTION_KINDS;
    }

    return [mode];
}

function shuffleArray<T>(items: T[], rng: () => number): T[] {
    const clone = [...items];

    for (let index = clone.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(rng() * (index + 1));
        [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
    }

    return clone;
}

function uniqueValues(values: string[]): string[] {
    return [...new Set(values.filter(Boolean))];
}

function buildOptions(correctAnswer: string, pool: string[], rng: () => number): string[] {
    const wrongAnswers = uniqueValues(pool.filter((entry) => entry !== correctAnswer));
    const sampledWrongAnswers = shuffleArray(wrongAnswers, rng).slice(0, 3);
    return shuffleArray(uniqueValues([...sampledWrongAnswers, correctAnswer]), rng);
}

function toQuestion(muscle: Muscle, kind: QuizQuestionKind, rng: () => number): QuizQuestion {
    const allMuscles = getAllMuscles();
    let prompt = "";
    let correctAnswer = "";
    let answerPool: string[] = [];
    let explanation = "";

    if (kind === "function") {
        prompt = `Jaka jest główna funkcja mięśnia ${muscle.name}?`;
        correctAnswer = muscle.function;
        answerPool = allMuscles.map((entry) => entry.function);
        explanation = `${muscle.name}: ${muscle.function}`;
    } else if (kind === "attachmentProximal") {
        prompt = `Gdzie znajduje się przyczep początkowy mięśnia ${muscle.name}?`;
        correctAnswer = muscle.attachmentProximal;
        answerPool = allMuscles.map((entry) => entry.attachmentProximal);
        explanation = `${muscle.name}: przyczep początkowy to ${muscle.attachmentProximal}.`;
    } else {
        prompt = `Gdzie znajduje się przyczep końcowy mięśnia ${muscle.name}?`;
        correctAnswer = muscle.attachmentDistal;
        answerPool = allMuscles.map((entry) => entry.attachmentDistal);
        explanation = `${muscle.name}: przyczep końcowy to ${muscle.attachmentDistal}.`;
    }

    return {
        id: `${muscle.id}-${kind}`,
        muscleId: muscle.id,
        muscleName: muscle.name,
        kind,
        prompt,
        options: buildOptions(correctAnswer, answerPool, rng),
        correctAnswer,
        explanation,
    };
}

function buildQuestionPool(muscles: Muscle[], kinds: QuizQuestionKind[], rng: () => number): QuizQuestion[] {
    const shuffledMuscles = shuffleArray(muscles, rng);
    const questions: QuizQuestion[] = [];

    for (const muscle of shuffledMuscles) {
        for (const kind of shuffleArray(kinds, rng)) {
            questions.push(toQuestion(muscle, kind, rng));
        }
    }

    return shuffleArray(questions, rng);
}

export function createQuizSession(input: {
    scope: Scope;
    scopeId: number;
    mode: QuizMode;
    limit?: number;
    rng?: () => number;
    reviewQuestions?: QuizQuestion[];
}): QuizSession | null {
    const rng = input.rng ?? Math.random;
    const contextTitle = getScopeTitle(input.scope, input.scopeId);

    if (input.mode === "review") {
        const reviewQuestions = input.reviewQuestions ?? [];
        if (reviewQuestions.length === 0) {
            return null;
        }

        return {
            id: `review-${input.scope}-${input.scopeId}-${Date.now()}`,
            scope: input.scope,
            scopeId: input.scopeId,
            mode: input.mode,
            contextTitle,
            questions: [...reviewQuestions],
        };
    }

    const muscles = getMusclesByScope(input.scope, input.scopeId);
    if (muscles.length === 0) {
        return null;
    }

    const kinds = getQuestionKinds(input.mode);
    const questions = buildQuestionPool(muscles, kinds, rng).slice(0, input.limit ?? 10);

    return {
        id: `${input.scope}-${input.scopeId}-${input.mode}-${Date.now()}`,
        scope: input.scope,
        scopeId: input.scopeId,
        mode: input.mode,
        contextTitle,
        questions,
    };
}
