import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/cn";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const isQuizRoute = location.pathname.startsWith("/quiz");

    return (
        <div className="relative min-h-screen pb-[calc(7rem+env(safe-area-inset-bottom))]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-white/80 via-white/25 to-transparent" />

            <header className="sticky top-0 z-30 border-b border-white/60 bg-white/72 backdrop-blur-xl">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                    <NavLink to="/" className="interactive-reset space-y-1">
                        <div className="text-xs font-bold tracking-[0.22em] text-atlas-700 uppercase">Premium Atlas</div>
                        <div className="text-lg font-extrabold tracking-tight text-ink-900 sm:text-xl">Muscle Learner</div>
                    </NavLink>
                    <div className="rounded-full border border-atlas-100 bg-white/80 px-3 py-2 text-xs font-semibold text-ink-500">
                        Mobile-first nauka anatomii
                    </div>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-6xl flex-col px-4 pt-6 sm:px-6">{children}</main>

            <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4">
                <div className="pointer-events-auto flex w-full max-w-md items-center justify-between rounded-full border border-white/75 bg-white/85 px-4 py-3 shadow-2xl shadow-ink-900/10 backdrop-blur-xl">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            cn(
                                "interactive-reset rounded-full px-4 py-2 text-sm font-semibold transition",
                                isActive ? "bg-ink-900 text-white" : "text-ink-500 hover:bg-atlas-50",
                            )
                        }
                    >
                        Atlas
                    </NavLink>
                    <div className="text-center text-xs text-ink-300">{isQuizRoute ? "Tryb quizu" : "Tryb nauki"}</div>
                    <div className="rounded-full bg-atlas-50 px-4 py-2 text-sm font-semibold text-atlas-700">
                        {isQuizRoute ? "Skupienie" : "Przegląd"}
                    </div>
                </div>
            </div>
        </div>
    );
}
