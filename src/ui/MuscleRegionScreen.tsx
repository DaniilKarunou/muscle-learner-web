import { useNavigate, useParams } from "react-router-dom";
import { countMusclesInRegion, getRegionById } from "../data/muscleSelectors";
import BackButton from "./components/BackButton";
import { PrimaryButton, SecondaryButton } from "./components/ActionButton";
import EmptyState from "./components/EmptyState";
import Screen from "./components/Screen";
import SectionCard from "./components/SectionCard";
import StatBadge from "./components/StatBadge";

export default function MuscleRegionScreen() {
    const { regionId } = useParams<{ regionId: string }>();
    const navigate = useNavigate();
    const region = getRegionById(Number(regionId));

    if (!region) {
        return (
            <EmptyState
                title="Nie znaleziono regionu"
                description="Ten region nie istnieje albo został jeszcze wyłączony z atlasu."
                action={<SecondaryButton onClick={() => navigate("/")}>Powrót do strony głównej</SecondaryButton>}
            />
        );
    }

    return (
        <Screen
            eyebrow="Region"
            title={region.name}
            subtitle={region.description}
            actions={
                <>
                    <BackButton />
                    <PrimaryButton onClick={() => navigate(`/quiz/region/${region.id}/mixed`)}>Quiz regionu</PrimaryButton>
                    <StatBadge label="mięśni" value={countMusclesInRegion(region)} />
                </>
            }
        >
            <div className="grid gap-4">
                {region.subGroups.map((subGroup) => (
                    <SectionCard
                        key={subGroup.id}
                        eyebrow="Podgrupa"
                        title={subGroup.name}
                        description={subGroup.description}
                        stats={<StatBadge label="mięśni" value={subGroup.muscles.length} />}
                        actions={
                            <>
                                <PrimaryButton onClick={() => navigate(`/subgroup/${subGroup.id}`)}>
                                    Otwórz podgrupę
                                </PrimaryButton>
                                <SecondaryButton onClick={() => navigate(`/quiz/subgroup/${subGroup.id}/mixed`)}>
                                    Quiz podgrupy
                                </SecondaryButton>
                            </>
                        }
                    >
                        <div className="flex flex-wrap gap-2">
                            {subGroup.muscles.slice(0, 5).map((muscle) => (
                                <span
                                    key={muscle.id}
                                    className="rounded-full bg-atlas-50 px-3 py-1.5 text-xs font-semibold text-atlas-700"
                                >
                                    {muscle.name}
                                </span>
                            ))}
                        </div>
                    </SectionCard>
                ))}
            </div>
        </Screen>
    );
}
