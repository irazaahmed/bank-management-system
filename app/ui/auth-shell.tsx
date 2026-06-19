import { Landmark } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800 px-4 py-12">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-violet-400/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="relative bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-7 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30">
              <Landmark className="h-6 w-6" strokeWidth={2} />
            </span>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AR Bank Limited</h1>
              <p className="text-xs text-blue-100">Online Banking Made Simple</p>
            </div>
          </div>
        </div>
        <div className="px-8 py-8">
          <h2 className="mb-1 text-xl font-semibold text-gray-900">{title}</h2>
          <p className="mb-6 text-sm text-gray-500">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
