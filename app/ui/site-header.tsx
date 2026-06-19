import { LogOut, ShieldCheck, Wallet } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { formatCurrency } from "@/lib/format";

export function SiteHeader({
  username,
  isAdmin,
  balance,
}: {
  username: string;
  isAdmin: boolean;
  balance?: number;
}) {
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 px-6 py-4 text-white shadow-lg">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30">
          {isAdmin ? (
            <ShieldCheck className="h-5 w-5" />
          ) : (
            <Wallet className="h-5 w-5" />
          )}
        </span>
        <div>
          <p className="text-lg font-semibold tracking-tight">AR Bank Limited</p>
          <p className="text-sm text-blue-100">
            {isAdmin ? "Administrator" : "Welcome"}, {username}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {balance !== undefined && (
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium ring-1 ring-white/20">
            Balance: {formatCurrency(balance)}
          </span>
        )}
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-lg border border-white/30 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
