import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InstallAppBanner from "./InstallAppBanner";

describe("InstallAppBanner", () => {
    it("renders install CTA when native prompt is available", () => {
        render(<InstallAppBanner canInstall ios={false} onInstall={vi.fn()} onDismiss={vi.fn()} />);

        expect(screen.getByRole("button", { name: "Zainstaluj" })).toBeInTheDocument();
        expect(screen.getByText(/obsługiwanych przeglądarkach/i)).toBeInTheDocument();
    });

    it("renders iPhone add-to-home-screen hint when prompt is unavailable", () => {
        render(<InstallAppBanner canInstall={false} ios onInstall={vi.fn()} onDismiss={vi.fn()} />);

        expect(screen.getByText(/dodaj do ekranu głównego/i)).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Zainstaluj" })).not.toBeInTheDocument();
    });
});
