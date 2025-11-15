import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MuscleData } from "../data/MuscleData";
import type { Muscle } from "../model/Muscle";

const MuscleDetail: React.FC = () => {
    const { muscleId } = useParams<{ muscleId: string }>();
    const navigate = useNavigate();

    const muscle: Muscle | undefined = MuscleData.muscleSystems
        .flatMap((s) => s.regions)
        .flatMap((r) => r.subGroups)
        .flatMap((sg) => sg.muscles)
        .find((m) => m.id === Number(muscleId));

    if (!muscle) return <div style={{ padding: 16 }}>Muscle not found</div>;

    const primaryGradient = "linear-gradient(135deg, #1976d2, #42a5f5)";
    const primaryHover = "linear-gradient(135deg, #1565c0, #1e88e5)";

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
        display: "block",
        marginBottom: 24,
        maxWidth: 200,
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
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 480, margin: "0 auto" }}>
            <button
                onClick={() => navigate(-1)}
                style={buttonStyle(primaryGradient, "#fff")}
                onMouseEnter={(e) => handleHover(e, primaryHover)}
                onMouseLeave={(e) => handleLeave(e, primaryGradient)}
            >
                ← Back
            </button>

            <h1 style={{ textAlign: "center", marginBottom: 16, fontSize: "2rem", color: "#1976d2", fontWeight: 700 }}>
                {muscle.name}
            </h1>

            <div
                style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    marginBottom: 24,
                }}
            >
                <img
                    src={muscle.imageRes}
                    alt={muscle.name}
                    style={{ width: "100%", height: 250, objectFit: "cover" }}
                />
            </div>

            <div
                style={{
                    background: "linear-gradient(135deg, #ffffff, #f0f4f8)",
                    borderRadius: 16,
                    padding: 16,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                }}
            >
                <p><strong>Funkcja:</strong> {muscle.function}</p>
                <p><strong>P (przyczep początkowy):</strong> {muscle.attachmentProximal}</p>
                <p><strong>K (przyczep końcowy):</strong> {muscle.attachmentDistal}</p>
            </div>
        </div>
    );
};

export default MuscleDetail;