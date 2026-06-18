import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import MuscleSystemScreen from "./MuscleSystemScreen";

describe("MuscleSystemScreen", () => {
    it("renders the premium atlas landing content and system cards", () => {
        render(
            <MemoryRouter>
                <MuscleSystemScreen />
            </MemoryRouter>,
        );

        expect(
            screen.getByRole("heading", { name: /ucz się mięśni tak, jak chcesz je później rozpoznawać/i }),
        ).toBeInTheDocument();
        expect(screen.getByText(/mięśnie szyi/i)).toBeInTheDocument();
        expect(screen.getByText(/mięśnie kończyny dolnej/i)).toBeInTheDocument();
    });
});
