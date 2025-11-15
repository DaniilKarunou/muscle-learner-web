import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

interface AnswerRecord {
    question: string;
    selected: string;
    correct: string;
}

const QuizResultScreen: React.FC = () => {
    const { score, total } = useParams<{ score: string; total: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const answersHistory: AnswerRecord[] = location.state?.answersHistory || [];

    const primaryGradient = "linear-gradient(135deg, #1976d2, #42a5f5)";
    const primaryHover = "linear-gradient(135deg, #1565c0, #1e88e5)";
    const accentGradient = "linear-gradient(135deg, #03dac6, #00bfa5)";
    const accentHover = "linear-gradient(135deg, #00bfa5, #018786)";

    const buttonStyle = (bg: string, color: string) => ({
        padding: "12px 24px",
        borderRadius: 12,
        border: "none",
        background: bg,
        color: color,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        textAlign: "center" as const,
        width: "100%",
        maxWidth: 320,
    });

    const handleHover = (e: React.MouseEvent<HTMLButtonElement>, hoverBg: string) => {
        (e.currentTarget as HTMLButtonElement).style.background = hoverBg;
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
    };

    const handleLeave = (e: React.MouseEvent<HTMLButtonElement>, bg: string) => {
        (e.currentTarget as HTMLButtonElement).style.background = bg;
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", alignItems: "center", marginTop: 24 }}>
            <h1 style={{ color: "#1976d2", fontSize: "2rem", fontWeight: 700, marginBottom: 8, textAlign: "center" }}>
                Wynik quizu
            </h1>

            <p style={{ fontSize: 32, fontWeight: 700, marginBottom: 32, color: "#1a1a1a", textAlign: "center" }}>
                {score} / {total}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 480 }}>
                {answersHistory.map((a, idx) => (
                    <div key={idx} style={{ padding: 12, borderRadius: 12, background: "#f9f9f9", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
                        <p style={{ marginBottom: 8, fontWeight: 600 }}>{a.question}</p>
                        <p>
                            Twoja odpowiedź: <span style={{ color: a.selected === a.correct ? "#03dac6" : "#b00020", fontWeight: 600 }}>{a.selected}</span>
                        </p>
                        {a.selected !== a.correct && (
                            <p>
                                Poprawna odpowiedź: <span style={{ color: "#03dac6", fontWeight: 600 }}>{a.correct}</span>
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32, width: "100%", maxWidth: 320 }}>
                <button
                    onClick={() => navigate(-1)}
                    style={buttonStyle(primaryGradient, "#fff")}
                    onMouseEnter={(e) => handleHover(e, primaryHover)}
                    onMouseLeave={(e) => handleLeave(e, primaryGradient)}
                >
                    Powtórz quiz
                </button>

                <button
                    onClick={() => navigate("/")}
                    style={buttonStyle(accentGradient, "#000")}
                    onMouseEnter={(e) => handleHover(e, accentHover)}
                    onMouseLeave={(e) => handleLeave(e, accentGradient)}
                >
                    Powrót do układów mięśni
                </button>
            </div>
        </div>
    );
};

export default QuizResultScreen;