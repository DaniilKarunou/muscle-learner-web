import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import QuizScreen from "./QuizScreen";

describe("QuizScreen", () => {
    it("shows an empty state for invalid route params", () => {
        render(
            <MemoryRouter initialEntries={["/quiz/not-a-scope/1/mixed"]}>
                <Routes>
                    <Route path="/quiz/:scope/:id/:mode" element={<QuizScreen />} />
                </Routes>
            </MemoryRouter>,
        );

        expect(screen.getByText(/nie udało się uruchomić quizu/i)).toBeInTheDocument();
    });

    it("starts quiz progress at zero percent for a new session", () => {
        render(
            <MemoryRouter initialEntries={["/quiz/system/1/mixed"]}>
                <Routes>
                    <Route path="/quiz/:scope/:id/:mode" element={<QuizScreen />} />
                </Routes>
            </MemoryRouter>,
        );

        expect(screen.getByText("0%")).toBeInTheDocument();
        expect(screen.getByText(/pytanie 1 z/i)).toBeInTheDocument();
    });
});
