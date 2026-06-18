import type { MouseEventHandler } from "react";
import { cn } from "../../lib/cn";

interface QuizOptionProps {
    label: string;
    selectedAnswer: string | null;
    correctAnswer: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function QuizOption({ label, selectedAnswer, correctAnswer, onClick }: QuizOptionProps) {
    const isSelected = selectedAnswer === label;
    const isCorrect = correctAnswer === label;
    const revealAnswer = selectedAnswer !== null;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={revealAnswer}
            className={cn(
                "interactive-reset surface-panel-subtle w-full cursor-pointer px-4 py-4 text-left text-sm leading-6 font-semibold transition duration-200",
                !revealAnswer && "hover:-translate-y-0.5 hover:border-atlas-200 hover:bg-white",
                revealAnswer && isCorrect && "border-mint-400 bg-mint-400/20 text-ink-900",
                revealAnswer && isSelected && !isCorrect && "border-coral-400 bg-coral-400/20 text-ink-900",
                revealAnswer && !isSelected && !isCorrect && "opacity-75",
            )}
        >
            {label}
        </button>
    );
}
