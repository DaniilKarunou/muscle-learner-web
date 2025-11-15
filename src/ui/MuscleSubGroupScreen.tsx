import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MuscleData } from "../data/MuscleData";
import type { MuscleSubGroup } from "../model/Muscle";

const MuscleSubGroupScreen: React.FC = () => {
    const { subGroupId } = useParams<{ subGroupId: string }>();
    const navigate = useNavigate();

    const subGroup: MuscleSubGroup | undefined = MuscleData.muscleSystems
        .flatMap((s) => s.regions)
        .flatMap((r) => r.subGroups)
        .find((sg) => sg.id === Number(subGroupId));

    if (!subGroup) return <div style={{ padding: 16 }}>Podgrupa nie znaleziona</div>;

    const primaryGradient = "linear-gradient(135deg, #1976d2, #42a5f5)";
    const primaryHover = "linear-gradient(135deg, #1565c0, #1e88e5)";

    const buttonStyle = (bg: string, color: string) => ({
        padding: "12px 22px",
        borderRadius: 12,
        border: "none",
        background: bg,
        color: color,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "block",
        margin: "0 auto 24px auto",
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
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
            <h1 style={{
                textAlign: "center",
                marginBottom: 24,
                fontSize: "2rem",
                color: "#1976d2",
                fontWeight: 700
            }}>
                {subGroup.name}
            </h1>

            <button
                onClick={() => navigate(`/quiz/subgroup/${subGroup.id}`)}
                style={buttonStyle(primaryGradient, "#fff")}
                onMouseEnter={(e) => handleHover(e, primaryHover)}
                onMouseLeave={(e) => handleLeave(e, primaryGradient)}
            >
                Quiz dla podgrupy
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                {subGroup.muscles.map((muscle) => (
                    <div
                        key={muscle.id}
                        onClick={() => navigate(`/detail/${muscle.id}`)}
                        style={{
                            padding: 16,
                            borderRadius: 16,
                            background: "linear-gradient(135deg, #ffffff, #f0f4f8)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                        }}
                    >
                        {muscle.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MuscleSubGroupScreen;