import type { MuscleSystem } from "../model/Muscle";

// import obrazków np. z assets
import sternocleidomastoid from "../assets/sternocleidomastoid.png";
import scalenus_anterior from "../assets/scalenus_anterior.png";
import scalenus_middle from "../assets/scalenus_middle.png";
import scalenus_posterior from "../assets/scalenus_posterior.png";
import rectus_abdominis from "../assets/rectus_abdominis.png";
import external_oblique from "../assets/external_oblique.png";
import internal_oblique from "../assets/internal_oblique.png";
import latissimus_dorsi from "../assets/latissimus_dorsi.png";
import trapezius from "../assets/trapezius.png";

export const MuscleData: { muscleSystems: MuscleSystem[] } = {
    muscleSystems: [
        {
            id: 1,
            name: "Mięśnie szyi",
            regions: [
                {
                    id: 1,
                    name: "Mięśnie powierzchowne szyi",
                    subGroups: [
                        {
                            id: 1,
                            name: "Mięsień mostkowo-obojczykowo-sutkowy",
                            muscles: [
                                {
                                    id: 1,
                                    name: "Mięsień mostkowo-obojczykowo-sutkowy",
                                    function: "Obrót i zginanie głowy",
                                    attachmentProximal: "Mostek / obojczyk",
                                    attachmentDistal: "Wyrostek sutkowaty",
                                    imageRes: sternocleidomastoid
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Mięśnie środkowe szyi",
                    subGroups: [
                        {
                            id: 2,
                            name: "Mięśnie pochyłe",
                            muscles: [
                                {
                                    id: 2,
                                    name: "Mięsień pochyły przedni",
                                    function: "Zginanie szyi",
                                    attachmentProximal: "C3-C6",
                                    attachmentDistal: "I żebro",
                                    imageRes: scalenus_anterior
                                },
                                {
                                    id: 3,
                                    name: "Mięsień pochyły środkowy",
                                    function: "Zginanie szyi",
                                    attachmentProximal: "C2-C7",
                                    attachmentDistal: "I żebro",
                                    imageRes: scalenus_middle
                                },
                                {
                                    id: 4,
                                    name: "Mięsień pochyły tylny",
                                    function: "Zginanie boczne szyi",
                                    attachmentProximal: "C4-C6",
                                    attachmentDistal: "II żebro",
                                    imageRes: scalenus_posterior
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Mięśnie brzucha",
            regions: [
                {
                    id: 3,
                    name: "Mięśnie przednie brzucha",
                    subGroups: [
                        {
                            id: 3,
                            name: "Mięsień prosty brzucha",
                            muscles: [
                                {
                                    id: 5,
                                    name: "Mięsień prosty brzucha",
                                    function: "Zginanie tułowia w przód",
                                    attachmentProximal: "Wyrostki żebrowe V-VII, mostek",
                                    attachmentDistal: "Kość łonowa",
                                    imageRes: rectus_abdominis
                                }
                            ]
                        },
                        {
                            id: 4,
                            name: "Mięśnie skośne",
                            muscles: [
                                {
                                    id: 6,
                                    name: "Mięsień skośny zewnętrzny brzucha",
                                    function: "Rotacja i zginanie boczne tułowia",
                                    attachmentProximal: "Żebra 5-12",
                                    attachmentDistal: "Kresa biała, kość biodrowa",
                                    imageRes: external_oblique
                                },
                                {
                                    id: 7,
                                    name: "Mięsień skośny wewnętrzny brzucha",
                                    function: "Rotacja i zginanie boczne tułowia",
                                    attachmentProximal: "Kresa biodrowa, powięź piersiowo-lędźwiowa",
                                    attachmentDistal: "Żebra 10-12, kresa biała",
                                    imageRes: internal_oblique
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: "Mięśnie grzbietu",
            regions: [
                {
                    id: 4,
                    name: "Mięśnie powierzchowne grzbietu",
                    subGroups: [
                        {
                            id: 5,
                            name: "Mięsień najszerszy grzbietu",
                            muscles: [
                                {
                                    id: 8,
                                    name: "Mięsień najszerszy grzbietu",
                                    function: "Przywodzenie i prostowanie ramienia",
                                    attachmentProximal: "Wyrostki kolczyste Th7-L5, grzebień biodrowy",
                                    attachmentDistal: "Grzebień guzka mniejszego kości ramiennej",
                                    imageRes: latissimus_dorsi
                                }
                            ]
                        },
                        {
                            id: 6,
                            name: "Mięsień czworoboczny",
                            muscles: [
                                {
                                    id: 9,
                                    name: "Mięsień czworoboczny",
                                    function: "Unoszenie i cofanie łopatki",
                                    attachmentProximal: "Kość potyliczna, wyrostki kolczyste C1-Th12",
                                    attachmentDistal: "Boczny koniec obojczyka, wyrostek barkowy łopatki",
                                    imageRes: trapezius
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};