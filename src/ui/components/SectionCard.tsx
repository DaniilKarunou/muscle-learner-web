import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface SectionCardProps {
    title: string;
    description: string;
    eyebrow?: string;
    stats?: ReactNode;
    actions?: ReactNode;
    children?: ReactNode;
    className?: string;
}

export default function SectionCard({
    title,
    description,
    eyebrow,
    stats,
    actions,
    children,
    className,
}: SectionCardProps) {
    return (
        <article className={cn("surface-panel-subtle flex flex-col gap-4 p-5 sm:p-6", className)}>
            <div className="space-y-3">
                {eyebrow ? (
                    <p className="text-xs font-bold tracking-[0.18em] text-atlas-700 uppercase">{eyebrow}</p>
                ) : null}
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-ink-900">{title}</h2>
                    <p className="text-sm leading-6 text-ink-500">{description}</p>
                </div>
            </div>
            {stats ? <div className="flex flex-wrap gap-2">{stats}</div> : null}
            {children}
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </article>
    );
}
