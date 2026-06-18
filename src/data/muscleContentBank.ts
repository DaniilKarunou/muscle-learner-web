import type { Muscle } from "../model/Muscle";

export type MuscleContentEntry = Partial<Pick<Muscle, "actions" | "movementExamples" | "media">>;

export const muscleContentBank: Record<string, MuscleContentEntry> = {
    czworoboczny: {
        actions: ["unoszenie łopatki", "retrakcja łopatki", "rotacja łopatki ku górze", "wyprost szyi"],
        movementExamples: [
            "Unoszenie barków przy wzruszeniu ramionami.",
            "Ściąganie łopatek do tyłu podczas wiosłowania albo poprawy postawy.",
            "Stabilizacja szyi i obręczy barkowej przy dłuższym siedzeniu lub noszeniu plecaka.",
        ],
    },
    rownolegloboczne: {
        actions: ["retrakcja łopatki", "rotacja łopatki ku dołowi", "stabilizacja łopatki"],
    },
    "dzwigacz-lopatki": {
        actions: ["unoszenie łopatki", "boczne zgięcie szyi"],
    },
    "najszerszy-grzbietu": {
        actions: ["przywodzenie ramienia", "wyprost ramienia", "rotacja wewnętrzna ramienia"],
        movementExamples: [
            "Przyciąganie ramienia do tułowia w podciąganiu albo ściąganiu drążka.",
            "Pchanie łokcia w dół i do tyłu podczas wspinania albo pływania.",
            "Pomoc przy podnoszeniu ciała, gdy chwytasz się poręczy lub drabinki.",
        ],
    },
    "zebaty-tylny-gorny": {
        actions: ["unoszenie żeber", "pomocniczy wdech"],
    },
    "zebaty-tylny-dolny": {
        actions: ["obniżanie żeber", "pomocniczy wydech"],
    },
    "prostownik-grzbietu": {
        actions: ["wyprost kręgosłupa", "wyprost tułowia", "stabilizacja postawy"],
        movementExamples: [
            "Utrzymywanie wyprostowanej sylwetki podczas stania i marszu.",
            "Prostowanie tułowia po skłonie, jak przy podnoszeniu czegoś z podłogi.",
            "Stabilizacja pleców podczas martwego ciągu albo przenoszenia ciężaru.",
        ],
    },
    "piersiowy-wiekszy": {
        actions: ["przywodzenie ramienia", "zgięcie ramienia", "rotacja wewnętrzna ramienia"],
        movementExamples: [
            "Przyciąganie ramienia do środka przy wyciskaniu albo obejmowaniu.",
            "Pchanie przedmiotów przed siebie z aktywną pracą barku.",
            "Dociskanie dłoni do siebie w ruchach wymagających siły klatki piersiowej.",
        ],
    },
    "piersiowy-mniejszy": {
        actions: ["obniżanie łopatki", "protrakcja łopatki", "pomocniczy wdech"],
    },
    "zebaty-przedni": {
        actions: ["protrakcja łopatki", "rotacja łopatki ku górze", "stabilizacja łopatki"],
        movementExamples: [
            "Wysuwanie barku do przodu przy ciosie albo podporze na rękach.",
            "Utrzymywanie łopatki przy klatce piersiowej podczas pompki lub planków.",
            "Współpraca przy unoszeniu ramienia ponad głowę.",
        ],
    },
    podobojczykowy: {
        actions: ["obniżanie obojczyka", "stabilizacja stawu mostkowo-obojczykowego"],
    },
    "miedzyzebrowe-zewnetrzne": {
        actions: ["unoszenie żeber", "pomocniczy wdech"],
    },
    "poprzeczny-klatki-piersiowej": {
        actions: ["obniżanie żeber", "pomocniczy wydech"],
    },
    "miedzyzebrowe-wewnetrzne": {
        actions: ["obniżanie żeber", "stabilizacja przestrzeni międzyżebrowych"],
    },
    podzebrowe: {
        actions: ["obniżanie żeber", "kontrola wydechu"],
    },
    "prosty-brzucha": {
        actions: ["zgięcie tułowia", "zwiększanie tłoczni brzusznej"],
        movementExamples: [
            "Unoszenie tułowia przy brzuszku albo siadaniu z leżenia.",
            "Usztywnienie brzucha przy kaszlu, śmiechu albo parciu.",
            "Kontrola ustawienia żeber i miednicy przy ćwiczeniach core.",
        ],
    },
    "skosny-zewnetrzny-brzucha": {
        actions: ["rotacja tułowia w stronę przeciwną", "boczne zgięcie tułowia", "zwiększanie tłoczni brzusznej"],
    },
    "skosny-wewnetrzny-brzucha": {
        actions: ["rotacja tułowia w tę samą stronę", "stabilizacja ściany brzucha", "boczne zgięcie tułowia"],
    },
    "poprzeczny-brzucha": {
        actions: ["napinanie ściany brzucha", "stabilizacja centralna"],
        movementExamples: [
            "Usztywnienie centrum ciała przed podniesieniem ciężaru.",
            "Kontrola brzucha i oddechu podczas deski albo ćwiczeń stabilizacyjnych.",
            "Budowanie ciśnienia w jamie brzusznej dla ochrony odcinka lędźwiowego.",
        ],
    },
    "czworoboczny-ledzwi": {
        actions: ["boczne zgięcie tułowia", "stabilizacja odcinka lędźwiowego", "stabilizacja XII żebra"],
    },
    miedzypoprzeczne: {
        actions: ["segmentalna stabilizacja kręgosłupa", "boczne ustawienie segmentów kręgosłupa"],
    },
    "wielodzielny-ledzwi": {
        actions: ["stabilizacja segmentów lędźwiowych", "wyprost tułowia", "kontrolowana rotacja tułowia"],
    },
    "skrecajace-ledzwi": {
        actions: ["drobna rotacja kręgosłupa", "kontrola ustawienia segmentów lędźwiowych"],
    },
    naramienny: {
        actions: ["odwodzenie ramienia", "zgięcie ramienia", "wyprost ramienia"],
        movementExamples: [
            "Unoszenie ręki bokiem przy sięganiu na półkę.",
            "Prowadzenie ramienia do przodu podczas rzutu albo wyciskania.",
            "Kontrola cofania ręki przy dynamicznym ruchu barku.",
        ],
    },
    nadgrzebieniowy: {
        actions: ["rozpoczęcie odwodzenia ramienia", "stabilizacja stawu ramiennego"],
    },
    podgrzebieniowy: {
        actions: ["rotacja zewnętrzna ramienia", "stabilizacja stawu ramiennego"],
    },
    podlopatkowy: {
        actions: ["rotacja wewnętrzna ramienia", "stabilizacja stawu ramiennego"],
    },
    "obly-mniejszy": {
        actions: ["rotacja zewnętrzna ramienia", "przywodzenie ramienia"],
    },
    "obly-wiekszy": {
        actions: ["przywodzenie ramienia", "wyprost ramienia", "rotacja wewnętrzna ramienia"],
    },
    "dwuglowy-ramienia": {
        actions: ["zgięcie łokcia", "supinacja przedramienia"],
        movementExamples: [
            "Przyciąganie dłoni do barku podczas uginania ramion.",
            "Odwracanie przedramienia tak, by dłoń kierowała się ku górze.",
            "Podnoszenie lekkiego przedmiotu z aktywną pracą łokcia i przedramienia.",
        ],
    },
    ramienny: {
        actions: ["zgięcie łokcia"],
    },
    "kruczo-ramienny": {
        actions: ["zgięcie ramienia", "przywodzenie ramienia"],
    },
    "trojglowy-ramienia": {
        actions: ["wyprost łokcia", "wyprost ramienia", "przywodzenie ramienia"],
        movementExamples: [
            "Prostowanie łokcia przy pompce, dipie albo wypychaniu ciężaru.",
            "Dociąganie ramienia do tyłu przy końcowej fazie podporu.",
            "Utrzymywanie stabilnego łokcia podczas podpór i pchnięć.",
        ],
    },
    lokciowy: {
        actions: ["wyprost łokcia", "stabilizacja stawu łokciowego"],
    },
    "posladkowy-wielki": {
        actions: ["wyprost biodra", "rotacja zewnętrzna uda", "stabilizacja miednicy"],
        movementExamples: [
            "Wstawanie z krzesła albo wychodzenie z przysiadu.",
            "Mocne wybicie biodra podczas biegu, skoku albo wejścia po schodach.",
            "Stabilizacja miednicy przy przenoszeniu ciężaru i pracy jednonóż.",
        ],
    },
    "posladkowy-sredni": {
        actions: ["odwodzenie uda", "stabilizacja miednicy"],
        movementExamples: [
            "Utrzymanie miednicy równo podczas stania na jednej nodze.",
            "Odwodzenie nogi w bok w marszu, biegu i ćwiczeniach biodra.",
            "Kontrola ustawienia kolana i biodra przy lądowaniu albo schodzeniu ze stopnia.",
        ],
    },
    "posladkowy-mniejszy": {
        actions: ["odwodzenie uda", "rotacja wewnętrzna uda", "stabilizacja miednicy"],
    },
    "napinacz-powiezi-szerokiej": {
        actions: ["napinanie pasma biodrowo-piszczelowego", "zgięcie biodra", "odwodzenie uda"],
    },
    biodrowy: {
        actions: ["zgięcie biodra"],
    },
    "ledzwiowy-wiekszy": {
        actions: ["zgięcie biodra", "stabilizacja odcinka lędźwiowego"],
    },
    "prosty-uda": {
        actions: ["wyprost kolana", "zgięcie biodra"],
        movementExamples: [
            "Wyprost kolana przy kopnięciu albo wstawaniu z siadu.",
            "Unoszenie uda do przodu podczas biegu lub wejścia po schodach.",
            "Praca w ruchach, gdzie jednocześnie potrzebujesz kontroli biodra i kolana.",
        ],
    },
    krawiecki: {
        actions: ["zgięcie biodra", "odwodzenie uda", "rotacja zewnętrzna uda", "zgięcie kolana"],
    },
    "przywodziciel-dlugi": {
        actions: ["przywodzenie uda", "zgięcie uda"],
    },
    "przywodziciel-wielki": {
        actions: ["przywodzenie uda", "wyprost uda"],
    },
    "dwuglowy-uda": {
        actions: ["zgięcie kolana", "wyprost biodra", "rotacja zewnętrzna podudzia"],
        movementExamples: [
            "Przyciąganie pięty do pośladka w biegu albo ćwiczeniach dwugłowych.",
            "Wypychanie biodra do wyprostu podczas martwego ciągu i sprintu.",
            "Kontrola tylnej strony uda przy hamowaniu kroku.",
        ],
    },
    polsciegnisty: {
        actions: ["zgięcie kolana", "wyprost biodra", "rotacja wewnętrzna podudzia"],
    },
    polbloniasty: {
        actions: ["zgięcie kolana", "wyprost biodra", "rotacja wewnętrzna podudzia"],
    },
    "glowa-krotka-dwuglowego-uda": {
        actions: ["zgięcie kolana", "rotacja zewnętrzna podudzia"],
    },
    "piszczelowy-przedni": {
        actions: ["zgięcie grzbietowe stopy", "odwracanie stopy do wewnątrz"],
        movementExamples: [
            "Unoszenie przodostopia podczas stawiania kroku.",
            "Kontrola opadania stopy po kontakcie pięty z podłożem.",
            "Ustawianie stopy do wewnątrz przy precyzyjnym prowadzeniu ruchu.",
        ],
    },
    "prostownik-dlugi-palucha": {
        actions: ["wyprost palucha", "zgięcie grzbietowe stopy"],
    },
    "prostownik-dlugi-palcow": {
        actions: ["wyprost palców II-V", "zgięcie grzbietowe stopy"],
    },
    "strzalkowy-dlugi": {
        actions: ["nawracanie stopy", "zgięcie podeszwowe stopy"],
    },
    "strzalkowy-krotki": {
        actions: ["nawracanie stopy", "zgięcie podeszwowe stopy"],
    },
    "piszczelowy-tylny": {
        actions: ["zgięcie podeszwowe stopy", "odwracanie stopy do wewnątrz", "podparcie łuku podłużnego"],
    },
    "zginacz-dlugi-palcow": {
        actions: ["zgięcie palców II-V", "zgięcie podeszwowe stopy"],
    },
    "zginacz-dlugi-palucha": {
        actions: ["zgięcie palucha", "wybicie stopy w chodzie"],
    },
    podkolanowy: {
        actions: ["odblokowanie kolana", "rotacja wewnętrzna podudzia"],
    },
    "brzuchaty-lydki": {
        actions: ["zgięcie podeszwowe stopy", "zgięcie kolana"],
        movementExamples: [
            "Wspięcie na palce podczas chodzenia, biegu albo skoku.",
            "Pomoc w odbiciu stopy od podłoża przy dynamicznym ruchu.",
            "Współpraca przy zgięciu kolana w fazie przenoszenia nogi.",
        ],
    },
    plaszczkowaty: {
        actions: ["zgięcie podeszwowe stopy", "stabilizacja postawy"],
        movementExamples: [
            "Długie stanie z kontrolą środka ciężkości nad stopą.",
            "Praca łydki przy spokojnym chodzie i utrzymaniu równowagi.",
            "Wspięcie na palce z naciskiem na stabilne podparcie stawu skokowego.",
        ],
    },
};
