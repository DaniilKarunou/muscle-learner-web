interface StatBadgeProps {
    label: string;
    value: string | number;
}

export default function StatBadge({ label, value }: StatBadgeProps) {
    return (
        <div className="rounded-full border border-atlas-100 bg-white/75 px-3 py-2 text-sm shadow-sm">
            <span className="font-bold text-ink-900">{value}</span>
            <span className="ml-2 text-ink-500">{label}</span>
        </div>
    );
}
