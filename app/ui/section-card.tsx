import type { LucideIcon } from "lucide-react";

export function SectionCard({
  icon: Icon,
  title,
  iconClassName = "bg-blue-50 text-blue-700",
  children,
}: {
  icon: LucideIcon;
  title: string;
  iconClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center gap-2.5">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}
