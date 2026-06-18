import { PrimaryButton, SecondaryButton } from "./ActionButton";

interface InstallAppBannerProps {
    canInstall: boolean;
    ios: boolean;
    onInstall: () => void | Promise<unknown>;
    onDismiss: () => void;
}

export default function InstallAppBanner({ canInstall, ios, onInstall, onDismiss }: InstallAppBannerProps) {
    return (
        <div className="surface-panel-subtle flex flex-col gap-4 border-atlas-200/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
                <div className="text-xs font-bold tracking-[0.22em] text-atlas-700 uppercase">Zainstaluj aplikację</div>
                <div className="text-sm font-semibold text-ink-900 sm:text-base">
                    Dodaj atlas do ekranu głównego i otwieraj go jak normalną apkę na telefonie.
                </div>
                <p className="text-sm leading-6 text-ink-500">
                    {canInstall
                        ? "Na Androidzie i w obsługiwanych przeglądarkach wystarczy jedno kliknięcie."
                        : ios
                          ? "Na iPhonie użyj Udostępnij, a potem wybierz Dodaj do ekranu głównego."
                          : "Jeśli przeglądarka nie pokazuje jeszcze instalacji, po prostu przypnij stronę do ekranu głównego."}
                </p>
            </div>

            <div className="flex flex-wrap gap-3">
                {canInstall ? <PrimaryButton onClick={onInstall}>Zainstaluj</PrimaryButton> : null}
                {ios && !canInstall ? <SecondaryButton onClick={onDismiss}>Rozumiem</SecondaryButton> : null}
                {!ios ? (
                    <SecondaryButton onClick={onDismiss}>
                        {canInstall ? "Może później" : "Ukryj podpowiedź"}
                    </SecondaryButton>
                ) : null}
            </div>
        </div>
    );
}
