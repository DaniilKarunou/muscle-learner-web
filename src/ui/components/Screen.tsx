import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ScreenProps {
    eyebrow?: string;
    title: string;
    subtitle: string;
    actions?: ReactNode;
    children: ReactNode;
    className?: string;
}

export default function Screen({ eyebrow, title, subtitle, actions, children, className }: ScreenProps) {
    return (
        <section className={cn("mx-auto flex w-full max-w-6xl flex-col gap-6", className)}>
            <div className="surface-panel relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
                <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-atlas-200 to-transparent" />
                <div className="space-y-4">
                    {eyebrow ? (
                        <div className="text-xs font-bold tracking-[0.24em] text-atlas-700 uppercase">{eyebrow}</div>
                    ) : null}
                    <div className="space-y-3">
                        <h1 className="text-balance max-w-3xl text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                            {title}
                        </h1>
                        <p className="text-balance max-w-3xl text-sm leading-7 text-ink-500 sm:text-base">
                            {subtitle}
                        </p>
                    </div>
                    {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
                </div>
            </div>
            {children}
        </section>
    );
}
