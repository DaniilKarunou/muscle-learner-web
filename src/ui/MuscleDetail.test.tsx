import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import MuscleDetail from "./MuscleDetail";

describe("MuscleDetail", () => {
    it("renders muscle details for a valid route", () => {
        render(
            <MemoryRouter initialEntries={["/detail/1"]}>
                <Routes>
                    <Route path="/detail/:muscleId" element={<MuscleDetail />} />
                </Routes>
            </MemoryRouter>,
        );

        expect(screen.getByRole("heading", { name: /mięsień mostkowo-obojczykowo-sutkowy/i })).toBeInTheDocument();
        expect(screen.getByText(/przyczep początkowy/i)).toBeInTheDocument();
        expect(screen.getByText(/jak ten mięsień pracuje w praktyce/i)).toBeInTheDocument();
        expect(screen.getByRole("img", { name: /mostkowo-obojczykowo-sutkowego/i })).toBeInTheDocument();
    });

    it("shows an empty state for an invalid muscle id", () => {
        render(
            <MemoryRouter initialEntries={["/detail/9999"]}>
                <Routes>
                    <Route path="/detail/:muscleId" element={<MuscleDetail />} />
                </Routes>
            </MemoryRouter>,
        );

        expect(screen.getByText(/nie znaleziono mięśnia/i)).toBeInTheDocument();
    });
});
