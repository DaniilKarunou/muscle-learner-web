import type { Muscle } from "../model/Muscle";
import type { QuizQuestion } from "../model/QuizQuestion";
import { MuscleData } from "./MuscleData";
import { Scope } from "../model/Scope";

export const QuizData = {
    getQuestions: (scope: Scope, id: number, limit = 10): QuizQuestion[] => {
        let muscles: Muscle[] = [];

        if (scope === Scope.System) {
            const system = MuscleData.muscleSystems.find(s => s.id === id);
            muscles = system?.regions.flatMap(r => r.subGroups.flatMap(sg => sg.muscles)) ?? [];
        } else if (scope === Scope.Region) {
            const region = MuscleData.muscleSystems
                .flatMap(s => s.regions)
                .find(r => r.id === id);
            muscles = region?.subGroups.flatMap(sg => sg.muscles) ?? [];
        } else if (scope === Scope.SubGroup) {
            const subGroup = MuscleData.muscleSystems
                .flatMap(s => s.regions)
                .flatMap(r => r.subGroups)
                .find(sg => sg.id === id);
            muscles = subGroup?.muscles ?? [];
        }

        const allQuestions: QuizQuestion[] = muscles.flatMap(muscle =>
            ["function", "proximal", "distal"].map(type => muscleToQuestion(muscle, type as "function" | "proximal" | "distal"))
        );

        return shuffleArray(allQuestions).slice(0, limit);
    }
};

function muscleToQuestion(muscle: Muscle, type: "function" | "proximal" | "distal"): QuizQuestion {
    const allMuscles = MuscleData.muscleSystems.flatMap(s =>
        s.regions.flatMap(r =>
            r.subGroups.flatMap(sg => sg.muscles)
        )
    );

    let questionText: string;
    let correctAnswer: string;
    let wrongOptions: string[];

    switch(type) {
        case "function":
            questionText = `Jaka jest główna funkcja mięśnia ${muscle.name}?`;
            correctAnswer = muscle.function;
            wrongOptions = allMuscles.map(m => m.function);
            break;
        case "proximal":
            questionText = `Gdzie przyczepia się proksymalnie mięsień ${muscle.name}?`;
            correctAnswer = muscle.attachmentProximal;
            wrongOptions = allMuscles.map(m => m.attachmentProximal);
            break;
        case "distal":
            questionText = `Gdzie przyczepia się dystalnie mięsień ${muscle.name}?`;
            correctAnswer = muscle.attachmentDistal;
            wrongOptions = allMuscles.map(m => m.attachmentDistal);
            break;
    }

    const options = shuffleArray([...new Set(wrongOptions.filter(o => o !== correctAnswer))].slice(0, 3).concat(correctAnswer));

    return {
        id: muscle.id,
        question: questionText,
        options,
        correctAnswer
    };
}

// prosta funkcja do mieszania tablic
function shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
}