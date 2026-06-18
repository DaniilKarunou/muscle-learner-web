import { useNavigate, useParams } from "react-router-dom";
import { getSubGroupById } from "../data/muscleSelectors";
import BackButton from "./components/BackButton";
import { PrimaryButton, SecondaryButton } from "./components/ActionButton";
import EmptyState from "./components/EmptyState";
import Screen from "./components/Screen";
import SectionCard from "./components/SectionCard";
import StatBadge from "./components/StatBadge";

export default function MuscleSubGroupScreen() {
    const { subGroupId } = useParams<{ subGroupId: string }>();
    const navigate = useNavigate();
    const subGroup = getSubGroupById(Number(subGroupId));

    if (!subGroup) {
        return (
            <EmptyState
                title="Nie znaleziono podgrupy"
                description="Ten obszar atlasu nie jest jeszcze dostępny albo adres jest niepoprawny."
                action={<SecondaryButton onClick={() => navigate("/")}>Wróć do atlasu</SecondaryButton>}
            />
        );
    }

    return (
        <Screen
            eyebrow="Podgrupa mięśni"
            title={subGroup.name}
            subtitle={subGroup.description}
            actions={
                <>
                    <BackButton />
                    <PrimaryButton onClick={() => navigate(`/quiz/subgroup/${subGroup.id}/mixed`)}>
                        Quiz podgrupy
                    </PrimaryButton>
                    <SecondaryButton onClick={() => navigate(`/quiz/subgroup/${subGroup.id}/movement`)}>
                        Quiz ruchów
                    </SecondaryButton>
                    <StatBadge label="mięśni" value={subGroup.muscles.length} />
                </>
            }
        >
            <div className="grid gap-4 lg:grid-cols-2">
                {subGroup.muscles.map((muscle) => (
                    <SectionCard
                        key={muscle.id}
                        eyebrow={muscle.latinName ?? "Mięsień"}
                        title={muscle.name}
                        description={muscle.function}
                        stats={<StatBadge label="trudność" value={muscle.difficulty} />}
                        actions={<PrimaryButton onClick={() => navigate(`/detail/${muscle.id}`)}>Zobacz detal</PrimaryButton>}
                    >
                        <div className="flex flex-wrap gap-2">
                            {muscle.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-atlas-50 px-3 py-1.5 text-xs font-semibold text-atlas-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </SectionCard>
                ))}
            </div>
        </Screen>
    );
}
