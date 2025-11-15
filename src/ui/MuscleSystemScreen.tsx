import React from "react";
import type { MuscleSystem } from "../model/Muscle";
import { useNavigate } from "react-router-dom";
import { MuscleData } from "../data/MuscleData";

const MuscleSystemScreen: React.FC = () => {
    const navigate = useNavigate();
    const muscleSystems: MuscleSystem[] = MuscleData.muscleSystems;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
            <h1 style={{
                textAlign: "center",
                marginBottom: 24,
                fontSize: "2rem",
                color: "#1976d2",
                fontWeight: 700
            }}>
                Układ mięśniowy
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                {muscleSystems.map((system) => (
                    <div
                        key={system.id}
                        onClick={() => navigate(`/region/${system.regions[0].id}`)}
                        style={{
                            padding: 16,
                            borderRadius: 16,
                            background: "linear-gradient(135deg, #ffffff, #f0f4f8)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                        <span style={{ fontWeight: 600, fontSize: "1rem", color: "#1a1a1a" }}>
                            {system.name}
                        </span>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/quiz/region/${system.id}`);
                            }}
                            style={{
                                padding: "10px 20px",
                                borderRadius: 12,
                                border: "none",
                                background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                                color: "#fff",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "linear-gradient(135deg, #1565c0, #1e88e5)";
                                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "linear-gradient(135deg, #1976d2, #42a5f5)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                            }}
                        >
                            Quiz
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MuscleSystemScreen;