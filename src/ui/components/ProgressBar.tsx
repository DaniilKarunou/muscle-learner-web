interface ProgressBarProps {
    value: number;
    max: number;
}

export default function ProgressBar({ value, max }: ProgressBarProps) {
    const ratio = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100));

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold tracking-[0.16em] text-ink-300 uppercase">
                <span>Postęp</span>
                <span>{ratio}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-atlas-100">
                <div
                    className="h-full rounded-full bg-linear-to-r from-coral-500 via-atlas-500 to-mint-500 transition-all duration-300"
                    style={{ width: `${ratio}%` }}
                />
            </div>
        </div>
    );
}
