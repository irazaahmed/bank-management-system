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
    <header className="flex items-center justify-between bg-blue-700 px-6 py-4 text-white shadow">
      <div>
        <p className="text-lg font-semibold">AR Bank Limited</p>
        <p className="text-sm text-blue-100">
          {isAdmin ? "Administrator" : "Welcome"}, {username}
        </p>
      </div>
      <div className="flex items-center gap-4">
        {balance !== undefined && (
          <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
            Balance: {formatCurrency(balance)}
          </span>
        )}
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-lg border border-white/30 px-3 py-1.5 text-sm font-medium hover:bg-white/10"
          >
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
