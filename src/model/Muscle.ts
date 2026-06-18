export type MuscleMediaKind = "image" | "gif";
export type MuscleDifficulty = "podstawowy" | "średni" | "zaawansowany";

export interface MuscleMedia {
    src: string;
    kind: MuscleMediaKind;
    alt: string;
    placeholder?: boolean;
    caption?: string;
    sourceUrl?: string;
}

export interface Muscle {
    id: number;
    slug: string;
    name: string;
    latinName?: string;
    region: string;
    subGroup: string;
    function: string;
    attachmentProximal: string;
    attachmentDistal: string;
    tags: string[];
    actions?: string[];
    movementExamples?: string[];
    difficulty: MuscleDifficulty;
    media: MuscleMedia[];
}

export interface MuscleSubGroup {
    id: number;
    name: string;
    description: string;
    muscles: Muscle[];
}

export interface MuscleRegion {
    id: number;
    name: string;
    description: string;
    subGroups: MuscleSubGroup[];
}

export interface MuscleSystem {
    id: number;
    name: string;
    description: string;
    hero: string;
    regions: MuscleRegion[];
}
