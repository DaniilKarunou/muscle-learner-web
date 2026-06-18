import { useLocation, useNavigate } from "react-router-dom";
import { getLearningRoute } from "../data/muscleSelectors";
import type { QuizQuestion, QuizResultState } from "../model/Quiz";
import { PrimaryButton, SecondaryButton } from "./components/ActionButton";
import EmptyState from "./components/EmptyState";
import Screen from "./components/Screen";
import SectionCard from "./components/SectionCard";
import StatBadge from "./components/StatBadge";

function getSummaryLabel(score: number, total: number): string {
    const percent = total === 0 ? 0 : Math.round((score / total) * 100);

    if (percent >= 90) {
        return "Świetny poziom";
    }

    if (percent >= 70) {
        return "Bardzo dobry progres";
    }

    if (percent >= 50) {
        return "Dobra baza do powtórki";
    }

    return "Warto wrócić do atlasu";
}

export default function QuizResultScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const result = location.state as QuizResultState | null;

    if (!result) {
        return (
            <EmptyState
                title="Brak wyniku quizu"
                description="Ten ekran wymaga aktywnej sesji quizu. Wróć do atlasu i uruchom quiz ponownie."
                action={<SecondaryButton onClick={() => navigate("/")}>Powrót do atlasu</SecondaryButton>}
            />
        );
    }

    const total = result.session.questions.length;
    const percent = total === 0 ? 0 : Math.round((result.score / total) * 100);
    const wrongAnswers = result.answers.filter((answer) => answer.selected !== answer.correct);
    const wrongQuestions: QuizQuestion[] = result.session.questions.filter((question) =>
        wrongAnswers.some((answer) => answer.questionId === question.id),
    );

    return (
        <Screen
            eyebrow="Wynik sesji"
            title={result.session.contextTitle}
            subtitle="Zobacz wynik, przejrzyj tylko to, co wymaga poprawy, i wróć od razu do kolejnej rundy."
            actions={
                <>
                    <StatBadge label="wynik" value={`${result.score}/${total}`} />
                    <StatBadge label="procent" value={`${percent}%`} />
                    <StatBadge label="status" value={getSummaryLabel(result.score, total)} />
                </>
            }
        >
            <div className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
                <SectionCard
                    title={wrongAnswers.length === 0 ? "Sesja bez błędów" : "Co robimy dalej?"}
                    description={
                        wrongAnswers.length === 0
                            ? "Świetna robota. Możesz powtórzyć ten sam tryb dla utrwalenia albo wejść poziom wyżej i rozszerzyć zakres."
                            : "Masz gotową ścieżkę: powtórz tę samą sesję, przerób same błędy albo wróć do nauki w atlasie."
                    }
                    actions={
                        <>
                            <PrimaryButton
                                onClick={() =>
                                    navigate(`/quiz/${result.session.scope}/${result.session.scopeId}/${result.session.mode}`)
                                }
                            >
                                Powtórz tę sesję
                            </PrimaryButton>
                            {wrongQuestions.length > 0 ? (
                                <SecondaryButton
                                    onClick={() =>
                                        navigate(`/quiz/${result.session.scope}/${result.session.scopeId}/review`, {
                                            state: { reviewQuestions: wrongQuestions },
                                        })
                                    }
                                >
                                    Powtórz błędy
                                </SecondaryButton>
                            ) : null}
                            <SecondaryButton
                                onClick={() => navigate(getLearningRoute(result.session.scope, result.session.scopeId))}
                            >
                                Wróć do nauki
                            </SecondaryButton>
                        </>
                    }
                >
                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-3xl bg-atlas-50 px-4 py-4">
                            <div className="text-xs font-bold tracking-[0.18em] text-atlas-700 uppercase">Skuteczność</div>
                            <div className="mt-2 text-3xl font-extrabold text-ink-900">{percent}%</div>
                        </div>
                        <div className="rounded-3xl bg-atlas-50 px-4 py-4">
                            <div className="text-xs font-bold tracking-[0.18em] text-atlas-700 uppercase">Dobre odpowiedzi</div>
                            <div className="mt-2 text-3xl font-extrabold text-ink-900">{result.score}</div>
                        </div>
                        <div className="rounded-3xl bg-atlas-50 px-4 py-4">
                            <div className="text-xs font-bold tracking-[0.18em] text-atlas-700 uppercase">Do poprawy</div>
                            <div className="mt-2 text-3xl font-extrabold text-ink-900">{wrongAnswers.length}</div>
                        </div>
                    </div>
                </SectionCard>

                <div className="grid gap-4">
                    {wrongAnswers.length === 0 ? (
                        <SectionCard
                            eyebrow="Perfekcyjna runda"
                            title="Nie masz żadnych błędów do przejrzenia"
                            description="Ta sesja jest czysta. Jeśli chcesz podbić poziom, odpal inny tryb quizu albo przejdź do szerszego zakresu."
                        />
                    ) : (
                        wrongAnswers.map((answer) => (
                            <SectionCard
                                key={answer.questionId}
                                eyebrow="Do poprawy"
                                title={answer.prompt}
                                description={answer.explanation}
                                className="border-coral-400/40"
                            >
                                <div className="space-y-2 text-sm leading-6 text-ink-500">
                                    <p>
                                        <span className="font-semibold text-ink-900">Twoja odpowiedź:</span>{" "}
                                        {answer.selected}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-ink-900">Poprawna odpowiedź:</span>{" "}
                                        {answer.correct}
                                    </p>
                                </div>
                            </SectionCard>
                        ))
                    )}
                </div>
            </div>
        </Screen>
    );
}
