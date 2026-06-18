import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "./ActionButton";

interface BackButtonProps {
    fallbackTo?: string;
    label?: string;
}

export default function BackButton({ fallbackTo = "/", label = "Wróć" }: BackButtonProps) {
    const navigate = useNavigate();

    return (
        <SecondaryButton
            className="self-start"
            onClick={() => {
                if (window.history.length > 1) {
                    navigate(-1);
                    return;
                }

                navigate(fallbackTo);
            }}
        >
            <span aria-hidden="true">←</span>
            {label}
        </SecondaryButton>
    );
}
