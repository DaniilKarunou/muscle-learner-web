import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MediaFrame from "./MediaFrame";

describe("MediaFrame", () => {
    it("renders a placeholder when media is missing", () => {
        render(
            <MediaFrame
                title="Mięsień testowy"
                media={[{ src: "", kind: "image", alt: "Brak grafiki", placeholder: true }]}
            />,
        );

        expect(screen.getByText("Miejsce na media")).toBeInTheDocument();
        expect(screen.getByText(/gdy dodasz plik obrazu albo gif/i)).toBeInTheDocument();
    });

    it("renders gif media and a gif badge", () => {
        render(
            <MediaFrame
                title="Mięsień testowy"
                media={[{ src: "/demo.gif", kind: "gif", alt: "Animacja testowa" }]}
            />,
        );

        expect(screen.getByRole("img", { name: "Animacja testowa" })).toBeInTheDocument();
        expect(screen.getByText("GIF")).toBeInTheDocument();
    });

    it("prefers the first static image when image and gif are both available", () => {
        render(
            <MediaFrame
                title="Mięsień testowy"
                media={[
                    { src: "/demo-image.png", kind: "image", alt: "Ilustracja testowa" },
                    { src: "/demo.gif", kind: "gif", alt: "Animacja testowa" },
                ]}
            />,
        );

        expect(screen.getByRole("img", { name: "Ilustracja testowa" })).toBeInTheDocument();
        expect(screen.queryByRole("img", { name: "Animacja testowa" })).not.toBeInTheDocument();
    });
});
