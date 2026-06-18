import type { ReactNode } from "react";

interface EmptyStateProps {
    title: string;
    description: string;
    action?: ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
    return (
        <div className="surface-panel mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-10 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-atlas-100 text-2xl text-atlas-700">
                ?
            </div>
            <div className="space-y-2">
                <h2 className="text-balance text-2xl font-bold text-ink-900">{title}</h2>
                <p className="text-balance text-sm leading-6 text-ink-500">{description}</p>
            </div>
            {action}
        </div>
    );
}
