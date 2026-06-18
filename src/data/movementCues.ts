import type { Muscle } from "../model/Muscle";

function addUnique(target: string[], value: string) {
    if (!target.includes(value)) {
        target.push(value);
    }
}

function buildExamplesFromActions(muscle: Muscle): string[] {
    const examples: string[] = [];

    for (const action of muscle.actions ?? []) {
        const lowerAction = action.toLowerCase();

        if (lowerAction.includes("rotacja głowy")) {
            addUnique(examples, "Obrót głowy, kiedy patrzysz przez ramię albo odwracasz się do rozmowy.");
            continue;
        }

        if (lowerAction.includes("zgięcie szyi")) {
            addUnique(examples, "Skłon głowy do przodu, jak przy czytaniu albo przyciąganiu brody do mostka.");
            continue;
        }

        if (lowerAction.includes("boczne zgięcie szyi")) {
            addUnique(examples, "Pochylenie głowy do boku, jak przy zbliżaniu ucha do barku.");
            continue;
        }

        if (lowerAction.includes("unoszenie żeber") || lowerAction.includes("wdech")) {
            addUnique(examples, "Pogłębiony wdech, kiedy obręcz barkowa jest ustabilizowana.");
            continue;
        }

        if (lowerAction.includes("retrakcja łopatki")) {
            addUnique(examples, "Ściąganie barków do tyłu podczas wiosłowania albo poprawy postawy.");
            continue;
        }

        if (lowerAction.includes("protrakcja łopatki")) {
            addUnique(examples, "Wysuwanie barku do przodu, jak przy ciosie albo podporze na rękach.");
            continue;
        }

        if (lowerAction.includes("zgięcie biodra")) {
            addUnique(examples, "Unoszenie kolana do góry podczas chodu, biegu albo wejścia po schodach.");
            continue;
        }

        if (lowerAction.includes("zgięcie kolana")) {
            addUnique(examples, "Przyciąganie pięty w stronę pośladka albo faza przenoszenia nogi w biegu.");
            continue;
        }

        if (lowerAction.includes("wyprost kolana")) {
            addUnique(examples, "Prostowanie kolana przy wstawaniu, kopnięciu albo wypchnięciu z nogi.");
            continue;
        }

        if (lowerAction.includes("wyprost tułowia") || lowerAction.includes("wyprost kręgosłupa")) {
            addUnique(examples, "Utrzymanie wyprostowanej sylwetki podczas stania, martwego ciągu albo unoszenia tułowia.");
            continue;
        }

        if (lowerAction.includes("zgięcie podeszwowe")) {
            addUnique(examples, "Wspięcie na palce i wybicie ze stopy podczas chodu lub skoku.");
            continue;
        }

        if (lowerAction.includes("zgięcie grzbietowe")) {
            addUnique(examples, "Unoszenie przodostopia przy stawianiu kroku i kontroli fazy przenoszenia.");
            continue;
        }

        if (lowerAction.includes("chwyt") || lowerAction.includes("palce") || lowerAction.includes("kciuk")) {
            addUnique(examples, "Precyzyjne ustawienie dłoni przy pisaniu, ścisku albo pracy chwytnej.");
        }
    }

    return examples;
}

export function getMovementExamples(muscle: Muscle): string[] {
    if (muscle.movementExamples && muscle.movementExamples.length > 0) {
        return muscle.movementExamples;
    }

    const actionExamples = buildExamplesFromActions(muscle);
    if (actionExamples.length > 0) {
        return actionExamples.slice(0, 3);
    }

    return ["Praktyczne przykłady ruchu dla tego mięśnia będą uzupełniane w bazie treści atlasu."];
}
