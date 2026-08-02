interface TechBadgeProps {
  label: string;
}

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:shadow-md">
      {label}
    </div>
  );
}
