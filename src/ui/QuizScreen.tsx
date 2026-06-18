import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { createQuizSession, getQuizModeLabel, isQuizMode, quizModeList } from "../data/QuizData";
import { cn } from "../lib/cn";
import type { QuizAnswerRecord, QuizQuestion, QuizResultState } from "../model/Quiz";
import { Scope, type Scope as ScopeType } from "../model/Scope";
import BackButton from "./components/BackButton";
import { SecondaryButton } from "./components/ActionButton";
import EmptyState from "./components/EmptyState";
import ProgressBar from "./components/ProgressBar";
import QuizOption from "./components/QuizOption";
import Screen from "./components/Screen";
import StatBadge from "./components/StatBadge";

interface ReviewLocationState {
    reviewQuestions?: QuizQuestion[];
}

function parseScope(scope: string | undefined): ScopeType | null {
    if (scope === Scope.System || scope === Scope.Region || scope === Scope.SubGroup) {
        return scope;
    }

    return null;
}

export default function QuizScreen() {
    const { scope, id, mode } = useParams<{ scope: string; id: string; mode?: string }>();
    const parsedScope = parseScope(scope);
    const parsedMode = isQuizMode(mode) ? mode : "mixed";
    const scopeId = Number(id);
    const navigate = useNavigate();
    const location = useLocation();
    const timerRef = useRef<number | null>(null);
    const scoreRef = useRef(0);
    const answersRef = useRef<QuizAnswerRecord[]>([]);
    const reviewState = location.state as ReviewLocationState | null;

    const [session] = useState(() => {
        if (!parsedScope || Number.isNaN(scopeId)) {
            return null;
        }

        return createQuizSession({
            scope: parsedScope,
            scopeId,
            mode: parsedMode,
            reviewQuestions: reviewState?.reviewQuestions,
        });
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [, setAnswers] = useState<QuizAnswerRecord[]>([]);

    useEffect(() => {
        return () => {
            if (timerRef.current !== null) {
                window.clearTimeout(timerRef.current);
            }
        };
    }, []);

    const currentQuestion = useMemo(() => session?.questions[currentIndex], [currentIndex, session]);

    if (!parsedScope || Number.isNaN(scopeId) || !session || session.questions.length === 0 || !currentQuestion) {
        return (
            <EmptyState
                title="Nie udało się uruchomić quizu"
                description="Ten tryb nie ma jeszcze dostępnych pytań albo adres quizu jest niepoprawny."
                action={<SecondaryButton onClick={() => navigate("/")}>Wróć do atlasu</SecondaryButton>}
            />
        );
    }

    const handleAnswer = (answer: string) => {
        if (selectedAnswer) {
            return;
        }

        const isCorrect = answer === currentQuestion.correctAnswer;
        const nextRecord: QuizAnswerRecord = {
            questionId: currentQuestion.id,
            prompt: currentQuestion.prompt,
            selected: answer,
            correct: currentQuestion.correctAnswer,
            explanation: currentQuestion.explanation,
            muscleId: currentQuestion.muscleId,
            muscleName: currentQuestion.muscleName,
            kind: currentQuestion.kind,
        };

        setSelectedAnswer(answer);
        setScore((value) => {
            const nextValue = value + Number(isCorrect);
            scoreRef.current = nextValue;
            return nextValue;
        });
        setAnswers((value) => {
            const nextValue = [...value, nextRecord];
            answersRef.current = nextValue;
            return nextValue;
        });

        timerRef.current = window.setTimeout(() => {
            setSelectedAnswer(null);

            if (currentIndex < session.questions.length - 1) {
                setCurrentIndex((value) => value + 1);
                return;
            }

            const resultState: QuizResultState = {
                session,
                answers: answersRef.current,
                score: scoreRef.current,
            };

            navigate("/quiz-result", { state: resultState });
        }, 750);
    };

    return (
        <Screen
            eyebrow={parsedMode === "review" ? "Powtórka błędów" : "Interaktywny quiz"}
            title={session.contextTitle}
            subtitle="Jedna sesja, jeden zestaw pytań i pełne skupienie na tym, co naprawdę warto zapamiętać."
            actions={
                <>
                    <BackButton fallbackTo="/" label="Wyjdź z quizu" />
                    <StatBadge label="tryb" value={getQuizModeLabel(session.mode)} />
                    <StatBadge label="pytań" value={session.questions.length} />
                </>
            }
        >
            {session.mode !== "review" ? (
                <div className="surface-panel-subtle flex flex-wrap gap-2 p-3">
                    {quizModeList
                        .filter((entry) => entry !== "review")
                        .map((entry) => (
                            <NavLink
                                key={entry}
                                to={`/quiz/${parsedScope}/${scopeId}/${entry}`}
                                className={({ isActive }) =>
                                    cn(
                                        "interactive-reset rounded-full px-4 py-2 text-sm font-semibold transition",
                                        isActive ? "bg-ink-900 text-white" : "bg-white/70 text-ink-500 hover:bg-atlas-50",
                                    )
                                }
                            >
                                {getQuizModeLabel(entry)}
                            </NavLink>
                        ))}
                </div>
            ) : null}

            <div className="surface-panel flex flex-col gap-5 px-5 py-6 sm:px-7">
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-ink-500">
                        <span>
                            Pytanie {currentIndex + 1} z {session.questions.length}
                        </span>
                        <span>{score} pkt</span>
                    </div>
                    <ProgressBar value={currentIndex} max={session.questions.length} />
                </div>

                <div className="space-y-3">
                    <div className="text-xs font-bold tracking-[0.2em] text-atlas-700 uppercase">
                        {getQuizModeLabel(currentQuestion.kind)}
                    </div>
                    <h2 className="text-balance text-2xl font-bold text-ink-900">{currentQuestion.prompt}</h2>
                </div>

                <div className="grid gap-3">
                    {currentQuestion.options.map((option) => (
                        <QuizOption
                            key={option}
                            label={option}
                            selectedAnswer={selectedAnswer}
                            correctAnswer={currentQuestion.correctAnswer}
                            onClick={() => handleAnswer(option)}
                        />
                    ))}
                </div>
            </div>

            <SecondaryButton block onClick={() => navigate("/")}>
                Przerwij i wróć do atlasu
            </SecondaryButton>
        </Screen>
    );
}
