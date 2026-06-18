import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    icon?: ReactNode;
    tone?: "primary" | "secondary";
    block?: boolean;
}

function ActionButton({
    children,
    className,
    icon,
    tone = "primary",
    block = false,
    type = "button",
    ...props
}: ActionButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                "interactive-reset inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-300 disabled:cursor-not-allowed disabled:opacity-55",
                tone === "primary"
                    ? "bg-ink-900 text-white shadow-lg shadow-ink-900/10 hover:-translate-y-0.5 hover:bg-atlas-700"
                    : "border border-ink-100 bg-white/70 text-ink-900 hover:-translate-y-0.5 hover:border-atlas-200 hover:bg-white",
                block && "w-full",
                className,
            )}
            {...props}
        >
            {icon}
            <span>{children}</span>
        </button>
    );
}

export function PrimaryButton(props: ActionButtonProps) {
    return <ActionButton {...props} tone="primary" />;
}

export function SecondaryButton(props: ActionButtonProps) {
    return <ActionButton {...props} tone="secondary" />;
}
