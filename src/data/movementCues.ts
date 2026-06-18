import type { Muscle } from "../model/Muscle";

function addUnique(target: string[], value: string) {
    if (!target.includes(value)) {
        target.push(value);
    }
}

export function getMovementExamples(muscle: Muscle): string[] {
    if (muscle.movementExamples && muscle.movementExamples.length > 0) {
        return muscle.movementExamples;
    }

    const lowerFunction = muscle.function.toLowerCase();
    const lowerTags = muscle.tags.map((tag) => tag.toLowerCase());
    const examples: string[] = [];

    if (lowerFunction.includes("zgi") && lowerTags.some((tag) => tag.includes("szyi") || tag.includes("głowy"))) {
        addUnique(examples, "Skłon głowy do przodu albo ustawienie brody bliżej mostka.");
    }
    if (lowerFunction.includes("rot") && (lowerTags.some((tag) => tag.includes("głowy")) || muscle.region === "Szyja")) {
        addUnique(examples, "Obrót głowy, kiedy patrzysz przez ramię.");
    }
    if (lowerTags.includes("łopatka") || lowerFunction.includes("łopatk")) {
        addUnique(examples, "Ściąganie barków do tyłu albo unoszenie obręczy barkowej.");
    }
    if (lowerTags.includes("oddech") || lowerFunction.includes("wdech") || lowerFunction.includes("wydech")) {
        addUnique(examples, "Pogłębiony wdech albo aktywna praca klatki piersiowej przy oddechu.");
    }
    if (lowerTags.includes("core") || muscle.region === "Brzuch") {
        addUnique(examples, "Napinanie brzucha przy planku, siadzie albo ochronie odcinka lędźwiowego.");
    }
    if (lowerFunction.includes("przywodzi")) {
        addUnique(
            examples,
            "Dociąganie kończyny do linii ciała, jak przy ściąganiu drążka lub ściskaniu piłki między kolanami.",
        );
    }
    if (lowerFunction.includes("odwodzi")) {
        addUnique(examples, "Odwodzenie kończyny na bok, jak przy unoszeniu ręki albo nogi.");
    }
    if (lowerFunction.includes("prostuje") && muscle.region.includes("Kończyna")) {
        addUnique(examples, "Wyprost w stawie podczas wypchnięcia ciężaru albo wybicia w chodzie.");
    }
    if (lowerFunction.includes("zgina") && muscle.region.includes("Kończyna")) {
        addUnique(examples, "Zgięcie stawu przy podnoszeniu kończyny, chwytaniu albo przyciąganiu ciężaru.");
    }
    if (lowerTags.includes("chwyt") || lowerTags.includes("precyzja") || muscle.subGroup.includes("ręki")) {
        addUnique(examples, "Precyzyjny chwyt, trzymanie długopisu albo szczypcowy ruch palców.");
    }
    if (lowerTags.includes("chód") || muscle.region === "Kończyna dolna") {
        addUnique(examples, "Stabilizacja i napęd podczas chodu, biegu albo wchodzenia po schodach.");
    }
    if (lowerTags.includes("paluch") || lowerTags.includes("stopa")) {
        addUnique(examples, "Wybicie ze stopy albo kontrola ustawienia stopy i palców przy kroku.");
    }
    if (lowerTags.includes("kciuk") || lowerTags.includes("dłoń")) {
        addUnique(examples, "Ustawienie dłoni i kciuka podczas chwytu, ścisku albo pracy precyzyjnej.");
    }
    if (lowerTags.includes("postawa") || lowerTags.includes("stabilizacja")) {
        addUnique(examples, "Utrzymanie stabilnej postawy i kontroli ustawienia segmentów ciała.");
    }

    if (examples.length === 0) {
        addUnique(examples, "Ruch opisany w funkcji mięśnia podczas codziennych zadań i nauki palpacyjnej.");
    }

    return examples.slice(0, 3);
}
