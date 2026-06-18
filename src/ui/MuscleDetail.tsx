import { useNavigate, useParams } from "react-router-dom";
import { getMovementExamples } from "../data/movementCues";
import { findMuscleTrail } from "../data/muscleSelectors";
import BackButton from "./components/BackButton";
import { PrimaryButton, SecondaryButton } from "./components/ActionButton";
import EmptyState from "./components/EmptyState";
import MediaFrame from "./components/MediaFrame";
import Screen from "./components/Screen";
import SectionCard from "./components/SectionCard";
import StatBadge from "./components/StatBadge";

export default function MuscleDetail() {
    const { muscleId } = useParams<{ muscleId: string }>();
    const navigate = useNavigate();
    const trail = findMuscleTrail(Number(muscleId));

    if (!trail) {
        return (
            <EmptyState
                title="Nie znaleziono mięśnia"
                description="Ten mięsień nie istnieje w aktualnym atlasie albo prowadzi do niego niepoprawny link."
                action={<SecondaryButton onClick={() => navigate("/")}>Wróć do atlasu</SecondaryButton>}
            />
        );
    }

    const { muscle, region, subGroup, system } = trail;
    const movementExamples = getMovementExamples(muscle);

    return (
        <Screen
            eyebrow={muscle.latinName ?? "Mięsień"}
            title={muscle.name}
            subtitle={muscle.function}
            actions={
                <>
                    <BackButton />
                    <PrimaryButton onClick={() => navigate(`/quiz/subgroup/${subGroup.id}/mixed`)}>
                        Quiz z tej podgrupy
                    </PrimaryButton>
                </>
            }
        >
            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <MediaFrame media={muscle.media} title={muscle.name} />

                <div className="grid gap-4">
                    <SectionCard
                        title="Szybki profil"
                        description="Najważniejsze informacje do pierwszego przejścia przez atlas i szybkiego połączenia mięśnia z ruchem."
                        stats={
                            <>
                                <StatBadge label="układ" value={system.name} />
                                <StatBadge label="trudność" value={muscle.difficulty} />
                            </>
                        }
                    >
                        <div className="space-y-5 text-sm leading-7 text-ink-500">
                            <p>
                                <span className="font-semibold text-ink-900">Przyczep początkowy:</span>{" "}
                                {muscle.attachmentProximal}
                            </p>
                            <p>
                                <span className="font-semibold text-ink-900">Przyczep końcowy:</span>{" "}
                                {muscle.attachmentDistal}
                            </p>
                            <div className="space-y-2">
                                <p className="font-semibold text-ink-900">Jak ten mięsień pracuje w praktyce</p>
                                <ul className="space-y-2">
                                    {movementExamples.map((example) => (
                                        <li key={example} className="rounded-2xl bg-atlas-50 px-3 py-2">
                                            {example}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        title="Tagi nauki"
                        description="Krótki zestaw skojarzeń, który pomaga szybciej odnaleźć mięsień przy kolejnej powtórce."
                        stats={
                            <>
                                <StatBadge label="region" value={region.name} />
                                <StatBadge label="podgrupa" value={subGroup.name} />
                            </>
                        }
                    >
                        <div className="flex flex-wrap gap-2">
                            {muscle.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-atlas-100 bg-white/80 px-3 py-2 text-xs font-semibold text-atlas-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </SectionCard>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <SectionCard
                    eyebrow="Ucz się dalej"
                    title={subGroup.name}
                    description={subGroup.description}
                    actions={
                        <>
                            <PrimaryButton onClick={() => navigate(`/subgroup/${subGroup.id}`)}>Wróć do podgrupy</PrimaryButton>
                            <SecondaryButton onClick={() => navigate(`/quiz/subgroup/${subGroup.id}/attachmentProximal`)}>
                                Trening przyczepów
                            </SecondaryButton>
                        </>
                    }
                />

                <SectionCard
                    eyebrow="Szerszy kontekst"
                    title={region.name}
                    description="Przejdź poziom wyżej i zobacz mięsień w kontekście całego regionu."
                    actions={
                        <>
                            <PrimaryButton onClick={() => navigate(`/region/${region.id}`)}>Otwórz region</PrimaryButton>
                            <SecondaryButton onClick={() => navigate(`/quiz/region/${region.id}/mixed`)}>
                                Quiz regionu
                            </SecondaryButton>
                        </>
                    }
                />
            </div>
        </Screen>
    );
}
