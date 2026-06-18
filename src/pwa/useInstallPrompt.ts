import { useEffect, useMemo, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const DISMISS_KEY = "muscle-learner-install-dismissed";

function isStandaloneMode() {
    if (typeof window === "undefined") {
        return false;
    }

    const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };

    return window.matchMedia("(display-mode: standalone)").matches || navigatorWithStandalone.standalone === true;
}

function isIosDevice() {
    if (typeof navigator === "undefined") {
        return false;
    }

    return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function useInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [dismissed, setDismissed] = useState(() => {
        if (typeof window === "undefined") {
            return false;
        }

        return window.localStorage.getItem(DISMISS_KEY) === "1";
    });
    const [standalone, setStandalone] = useState(isStandaloneMode);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const mediaQuery = window.matchMedia("(display-mode: standalone)");
        const handleStandaloneChange = () => setStandalone(isStandaloneMode());
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setDeferredPrompt(event as BeforeInstallPromptEvent);
        };
        const handleInstalled = () => {
            setDeferredPrompt(null);
            setStandalone(true);
        };

        handleStandaloneChange();
        mediaQuery.addEventListener("change", handleStandaloneChange);
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleInstalled);

        return () => {
            mediaQuery.removeEventListener("change", handleStandaloneChange);
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleInstalled);
        };
    }, []);

    const ios = useMemo(() => isIosDevice(), []);
    const canInstall = Boolean(deferredPrompt);
    const showIosHint = ios && !standalone;
    const visible = !dismissed && !standalone && (canInstall || showIosHint);

    const install = async () => {
        if (!deferredPrompt) {
            return;
        }

        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        if (choice.outcome === "accepted") {
            setStandalone(true);
        }
    };

    const dismiss = () => {
        setDismissed(true);

        if (typeof window !== "undefined") {
            window.localStorage.setItem(DISMISS_KEY, "1");
        }
    };

    return {
        canInstall,
        ios,
        standalone,
        visible,
        install,
        dismiss,
    };
}
