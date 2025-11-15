export interface Muscle {
    id: number;
    name: string;
    function: string;
    attachmentProximal: string;
    attachmentDistal: string;
    imageRes: string; // ścieżka do obrazu w public/images/
}

export interface MuscleSubGroup {
    id: number;
    name: string;
    muscles: Muscle[];
}

export interface MuscleRegion {
    id: number;
    name: string;
    subGroups: MuscleSubGroup[];
}

export interface MuscleSystem {
    id: number;
    name: string;
    regions: MuscleRegion[];
}