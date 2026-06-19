import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  gradient,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-lg`}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-xl" />
      <div className="relative flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/30">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs text-white/80">{label}</p>
          <p className="text-xl font-bold tracking-tight">{value}</p>
        </div>
      </div>
    </div>
  );
}
