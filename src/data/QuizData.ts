import type { Muscle } from "../model/Muscle";
import type { QuizMode, QuizQuestion, QuizQuestionKind, QuizSession } from "../model/Quiz";
import type { Scope } from "../model/Scope";
import { findMuscleTrail, getAllMuscles, getMusclesByScope, getScopeTitle } from "./muscleSelectors";

const QUESTION_KINDS: QuizQuestionKind[] = ["movement", "function", "attachmentProximal", "attachmentDistal"];

const MODE_LABELS: Record<QuizMode, string> = {
    mixed: "Mieszany",
    movement: "Ruchy",
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
    return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function getPoolValue(muscle: Muscle, kind: QuizQuestionKind): string {
    if (kind === "movement") {
        return muscle.actions?.[0] ?? "";
    }

    if (kind === "function") {
        return muscle.function;
    }

    if (kind === "attachmentProximal") {
        return muscle.attachmentProximal;
    }

    return muscle.attachmentDistal;
}

function hasPoolValue(muscle: Muscle, kind: QuizQuestionKind): boolean {
    return getPoolValue(muscle, kind).length > 0;
}

function getFallbackMuscles(scope: Scope, muscle: Muscle, scopeMuscles: Muscle[]): Muscle[] {
    const trail = findMuscleTrail(muscle.id);
    if (!trail) {
        return scopeMuscles;
    }

    if (scope === "subgroup") {
        return trail.region.subGroups.flatMap((subGroup) => subGroup.muscles);
    }

    if (scope === "region") {
        return trail.system.regions.flatMap((region) => region.subGroups.flatMap((subGroup) => subGroup.muscles));
    }

    return getAllMuscles();
}

function buildOptions(
    correctAnswer: string,
    scopeMuscles: Muscle[],
    kind: QuizQuestionKind,
    muscle: Muscle,
    scope: Scope,
    rng: () => number,
): string[] {
    const scopedPool = uniqueValues(scopeMuscles.filter((entry) => hasPoolValue(entry, kind)).map((entry) => getPoolValue(entry, kind)));
    const fallbackPool = uniqueValues(
        getFallbackMuscles(scope, muscle, scopeMuscles)
            .filter((entry) => hasPoolValue(entry, kind))
            .map((entry) => getPoolValue(entry, kind)),
    );
    const pool = scopedPool.length >= 4 ? scopedPool : uniqueValues([...scopedPool, ...fallbackPool]);
    const wrongAnswers = pool.filter((entry) => entry !== correctAnswer);
    const sampledWrongAnswers = shuffleArray(wrongAnswers, rng).slice(0, 3);

    return shuffleArray(uniqueValues([...sampledWrongAnswers, correctAnswer]), rng);
}

function toQuestion(
    muscle: Muscle,
    kind: QuizQuestionKind,
    scopeMuscles: Muscle[],
    scope: Scope,
    rng: () => number,
): QuizQuestion {
    let prompt = "";
    let correctAnswer = "";
    let explanation = "";

    if (kind === "movement") {
        correctAnswer = getPoolValue(muscle, kind);
        prompt = `Który ruch najlepiej opisuje działanie mięśnia ${muscle.name}?`;
        explanation = `${muscle.name}: główny ruch do zapamiętania to ${correctAnswer}. Funkcja mięśnia: ${muscle.function}`;
    } else if (kind === "function") {
        prompt = `Jaka jest główna funkcja mięśnia ${muscle.name}?`;
        correctAnswer = muscle.function;
        explanation = `${muscle.name}: ${muscle.function}`;
    } else if (kind === "attachmentProximal") {
        prompt = `Gdzie znajduje się przyczep początkowy mięśnia ${muscle.name}?`;
        correctAnswer = muscle.attachmentProximal;
        explanation = `${muscle.name}: przyczep początkowy to ${muscle.attachmentProximal}.`;
    } else {
        prompt = `Gdzie znajduje się przyczep końcowy mięśnia ${muscle.name}?`;
        correctAnswer = muscle.attachmentDistal;
        explanation = `${muscle.name}: przyczep końcowy to ${muscle.attachmentDistal}.`;
    }

    return {
        id: `${muscle.id}-${kind}`,
        muscleId: muscle.id,
        muscleName: muscle.name,
        kind,
        prompt,
        options: buildOptions(correctAnswer, scopeMuscles, kind, muscle, scope, rng),
        correctAnswer,
        explanation,
    };
}

function buildQuestionPool(muscles: Muscle[], kinds: QuizQuestionKind[], scope: Scope, rng: () => number): QuizQuestion[] {
    const shuffledMuscles = shuffleArray(muscles, rng);
    const questions: QuizQuestion[] = [];

    for (const muscle of shuffledMuscles) {
        const availableKinds = shuffleArray(
            kinds.filter((kind) => hasPoolValue(muscle, kind)),
            rng,
        );

        for (const kind of availableKinds) {
            questions.push(toQuestion(muscle, kind, muscles, scope, rng));
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
    const questions = buildQuestionPool(muscles, kinds, input.scope, rng).slice(0, input.limit ?? 10);

    if (questions.length === 0) {
        return null;
    }

    return {
        id: `${input.scope}-${input.scopeId}-${input.mode}-${Date.now()}`,
        scope: input.scope,
        scopeId: input.scopeId,
        mode: input.mode,
        contextTitle,
        questions,
    };
}
