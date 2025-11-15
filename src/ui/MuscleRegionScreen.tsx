import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MuscleData } from "../data/MuscleData";
import type { MuscleRegion } from "../model/Muscle";

const MuscleRegionScreen: React.FC = () => {
    const { regionId } = useParams<{ regionId: string }>();
    const navigate = useNavigate();

    const region: MuscleRegion | undefined = MuscleData.muscleSystems
        .flatMap((s) => s.regions)
        .find((r) => r.id === Number(regionId));

    if (!region) return <div style={{ padding: 16 }}>Region nie znaleziony</div>;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
            <h1 style={{
                textAlign: "center",
                marginBottom: 24,
                fontSize: "2rem",
                color: "#1976d2",
                fontWeight: 700
            }}>
                {region.name}
            </h1>

            <button
                onClick={() => navigate(`/quiz/region/${region.id}`)}
                style={{
                    display: "block",
                    margin: "0 auto 24px auto",
                    padding: "10px 22px",
                    borderRadius: 12,
                    border: "none",
                    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
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
                Quiz dla regionu
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                {region.subGroups.map((sg) => (
                    <div
                        key={sg.id}
                        onClick={() => navigate(`/subgroup/${sg.id}`)}
                        style={{
                            padding: 16,
                            borderRadius: 16,
                            background: "linear-gradient(135deg, #ffffff, #f0f4f8)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            transition: "all 0.3s ease"
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
                            {sg.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MuscleRegionScreen;