import { useNavigate, useParams } from "react-router-dom";
import { countMusclesInRegion, countMusclesInSystem, getSystemById } from "../data/muscleSelectors";
import BackButton from "./components/BackButton";
import { PrimaryButton, SecondaryButton } from "./components/ActionButton";
import EmptyState from "./components/EmptyState";
import Screen from "./components/Screen";
import SectionCard from "./components/SectionCard";
import StatBadge from "./components/StatBadge";

export default function MuscleSystemDetailScreen() {
    const { systemId } = useParams<{ systemId: string }>();
    const navigate = useNavigate();
    const system = getSystemById(Number(systemId));

    if (!system) {
        return (
            <EmptyState
                title="Nie znaleziono układu mięśniowego"
                description="Sprawdź, czy link jest poprawny, albo wróć na stronę główną atlasu."
                action={<SecondaryButton onClick={() => navigate("/")}>Wróć do atlasu</SecondaryButton>}
            />
        );
    }

    return (
        <Screen
            eyebrow="Układ mięśniowy"
            title={system.name}
            subtitle={system.hero}
            actions={
                <>
                    <BackButton />
                    <PrimaryButton onClick={() => navigate(`/quiz/system/${system.id}/mixed`)}>
                        Zacznij quiz układu
                    </PrimaryButton>
                    <StatBadge label="mięśni" value={countMusclesInSystem(system)} />
                </>
            }
        >
            <div className="grid gap-4">
                {system.regions.map((region) => (
                    <SectionCard
                        key={region.id}
                        eyebrow="Region"
                        title={region.name}
                        description={region.description}
                        stats={
                            <>
                                <StatBadge label="podgrup" value={region.subGroups.length} />
                                <StatBadge label="mięśni" value={countMusclesInRegion(region)} />
                            </>
                        }
                        actions={
                            <>
                                <PrimaryButton onClick={() => navigate(`/region/${region.id}`)}>Wejdź do regionu</PrimaryButton>
                                <SecondaryButton onClick={() => navigate(`/quiz/region/${region.id}/mixed`)}>
                                    Quiz regionu
                                </SecondaryButton>
                            </>
                        }
                    >
                        <div className="flex flex-wrap gap-2">
                            {region.subGroups.slice(0, 4).map((subGroup) => (
                                <span
                                    key={subGroup.id}
                                    className="rounded-full bg-atlas-50 px-3 py-1.5 text-xs font-semibold text-atlas-700"
                                >
                                    {subGroup.name}
                                </span>
                            ))}
                        </div>
                    </SectionCard>
                ))}
            </div>
        </Screen>
    );
}
