export const Scope = {
    System: "system",
    Region: "region",
    SubGroup: "subgroup",
} as const;

export type Scope = (typeof Scope)[keyof typeof Scope];

export const scopeLabels: Record<Scope, string> = {
    [Scope.System]: "układu",
    [Scope.Region]: "regionu",
    [Scope.SubGroup]: "podgrupy",
};
