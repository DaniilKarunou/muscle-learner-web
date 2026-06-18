import { useNavigate } from "react-router-dom";
import { countMusclesInSystem, getAllMuscles, getAllSystems } from "../data/muscleSelectors";
import { PrimaryButton, SecondaryButton } from "./components/ActionButton";
import Screen from "./components/Screen";
import SectionCard from "./components/SectionCard";
import StatBadge from "./components/StatBadge";

export default function MuscleSystemScreen() {
    const navigate = useNavigate();
    const muscleSystems = getAllSystems();
    const muscleCount = getAllMuscles().length;

    return (
        <Screen
            eyebrow="Premium atlas anatomii"
            title="Ucz się mięśni tak, jak chcesz je później rozpoznawać"
            subtitle="Wejdź w jeden z głównych obszarów, przejdź od regionu do konkretnego mięśnia i kończ każdą sesję krótkim quizem bez zbędnego chaosu."
            actions={
                <>
                    <StatBadge label="sekcji" value={muscleSystems.length} />
                    <StatBadge label="mięśni" value={muscleCount} />
                </>
            }
        >
            <div className="grid gap-4 lg:grid-cols-2">
                {muscleSystems.map((system) => (
                    <SectionCard
                        key={system.id}
                        eyebrow="Główna sekcja"
                        title={system.name}
                        description={system.description}
                        stats={
                            <>
                                <StatBadge label="mięśni" value={countMusclesInSystem(system)} />
                                <StatBadge label="regionów" value={system.regions.length} />
                            </>
                        }
                        actions={
                            <>
                                <PrimaryButton onClick={() => navigate(`/system/${system.id}`)}>Otwórz atlas</PrimaryButton>
                                <SecondaryButton onClick={() => navigate(`/quiz/system/${system.id}/mixed`)}>
                                    Quiz mieszany
                                </SecondaryButton>
                            </>
                        }
                    >
                        <p className="rounded-3xl bg-atlas-50 px-4 py-4 text-sm leading-6 text-ink-500">{system.hero}</p>
                        <div className="flex flex-wrap gap-2">
                            {system.regions.map((region) => (
                                <span
                                    key={region.id}
                                    className="rounded-full border border-atlas-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-atlas-700"
                                >
                                    {region.name}
                                </span>
                            ))}
                        </div>
                    </SectionCard>
                ))}
            </div>
        </Screen>
    );
}
