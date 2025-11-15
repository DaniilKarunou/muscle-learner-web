export const Scope = {
    System: "system",
    Region: "region",
    SubGroup: "subgroup",
} as const;

export type Scope = (typeof Scope)[keyof typeof Scope];