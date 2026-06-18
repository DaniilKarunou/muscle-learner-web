const catalog = import.meta.glob("../assets/miesnie/**/*.{png,jpg,jpeg,gif,webp,svg}", {
    eager: true,
    import: "default",
}) as Record<string, string>;

export function muscleAsset(relativePath: string): string {
    const normalized = relativePath.replace(/\\/g, "/");
    const key = `../assets/miesnie/${normalized}`;
    const resolved = catalog[key];

    if (!resolved) {
        throw new Error(`Brak assetu mięśnia: ${relativePath}`);
    }

    return resolved;
}
