import { useMemo } from "react";
import { cn } from "../../lib/cn";
import type { MuscleMedia } from "../../model/Muscle";

interface MediaFrameProps {
    media: MuscleMedia[];
    title: string;
    className?: string;
}

export default function MediaFrame({ media, title, className }: MediaFrameProps) {
    const activeMedia = useMemo(() => {
        const firstVisual = media.find((entry) => !entry.placeholder && entry.src);
        if (firstVisual) {
            return firstVisual;
        }

        return media[0];
    }, [media]);

    return (
        <div className={cn("surface-panel overflow-hidden", className)}>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-linear-to-br from-atlas-50 via-white to-coral-400/15">
                {activeMedia && activeMedia.src && !activeMedia.placeholder ? (
                    <img src={activeMedia.src} alt={activeMedia.alt} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
                        <div className="rounded-full border border-atlas-200 bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-atlas-700 uppercase">
                            Miejsce na media
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-ink-900">{title}</h3>
                            <p className="text-sm leading-6 text-ink-500">
                                Gdy dodasz plik obrazu albo GIF, pojawi się tutaj bez zmian w kodzie ekranu.
                            </p>
                        </div>
                    </div>
                )}

                {activeMedia?.kind === "gif" && activeMedia.src ? (
                    <div className="absolute right-4 top-4 rounded-full bg-ink-900/85 px-3 py-1 text-xs font-semibold text-white">
                        GIF
                    </div>
                ) : null}
            </div>
        </div>
    );
}
