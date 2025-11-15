import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizData } from "../data/QuizData";
import type { QuizQuestion } from "../model/QuizQuestion";
import { Scope } from "../model/Scope";

interface AnswerRecord {
    question: string;
    selected: string;
    correct: string;
}

const QuizScreen: React.FC = () => {
    const { scope, id } = useParams<{ scope: string; id: string }>();
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answersHistory, setAnswersHistory] = useState<AnswerRecord[]>([]);

    const scopeEnum: Scope | null =
        scope === Scope.System ? Scope.System :
            scope === Scope.Region ? Scope.Region :
                scope === Scope.SubGroup ? Scope.SubGroup :
                    null;

    const questions: QuizQuestion[] = scopeEnum && id
        ? QuizData.getQuestions(scopeEnum, Number(id), 10)
        : [];

    if (!scopeEnum || !id) return <div>Invalid quiz parameters</div>;
    if (questions.length === 0) return <div>No questions available</div>;

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        const isCorrect = answer === currentQuestion.correctAnswer;
        if (isCorrect) setScore(score + 1);

        // zapisz odpowiedź do historii
        setAnswersHistory([...answersHistory, {
            question: currentQuestion.question,
            selected: answer,
            correct: currentQuestion.correctAnswer
        }]);

        setTimeout(() => {
            setSelectedAnswer(null);
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                navigate(`/quizResult/${score + (isCorrect ? 1 : 0)}/${questions.length}`, { state: { answersHistory: [...answersHistory, {
                            question: currentQuestion.question,
                            selected: answer,
                            correct: currentQuestion.correctAnswer
                        }] } });
            }
        }, 800);
    };

    const getButtonStyle = (opt: string) => {
        const base = {
            padding: "12px 16px",
            borderRadius: 12,
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            textAlign: "left" as const,
        };
        if (!selectedAnswer) return { ...base, background: "linear-gradient(135deg, #1976d2, #42a5f5)", color: "#fff" };
        if (opt === currentQuestion.correctAnswer) return { ...base, background: "linear-gradient(135deg, #03dac6, #00bfa5)", color: "#000" };
        if (opt === selectedAnswer) return { ...base, background: "linear-gradient(135deg, #b00020, #f44336)", color: "#fff" };
        return { ...base, background: "#f0f0f0", color: "#000" };
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 480, margin: "0 auto" }}>
            <h2 style={{ color: "#1976d2", fontSize: "1.75rem", fontWeight: 700, textAlign: "center", marginBottom: 8 }}>
                Pytanie {currentIndex + 1} / {questions.length}
            </h2>

            <p style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 16, color: "#1a1a1a", textAlign: "center" }}>
                {currentQuestion.question}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {currentQuestion.options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        style={getButtonStyle(opt)}
                        disabled={!!selectedAnswer}
                        onMouseEnter={(e) => { if (!selectedAnswer) e.currentTarget.style.background = "linear-gradient(135deg, #1565c0, #1e88e5)"; }}
                        onMouseLeave={(e) => { if (!selectedAnswer) e.currentTarget.style.background = "linear-gradient(135deg, #1976d2, #42a5f5)"; }}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizScreen;