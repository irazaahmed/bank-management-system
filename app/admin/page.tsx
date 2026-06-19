import { requireAdmin } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";
import { SiteHeader } from "@/app/ui/site-header";
import { UsersTable } from "@/app/ui/users-table";
import { AllTransactionsTable } from "@/app/ui/all-transactions-table";
import { ResetButton } from "@/app/ui/reset-button";

export default async function AdminPage() {
  const admin = await requireAdmin();

  const [users, transactions] = await Promise.all([
    prisma.user.findMany({ orderBy: { id: "asc" } }),
    prisma.transaction.findMany({
      include: { sender: true, receiver: true },
      orderBy: { timestamp: "desc" },
    }),
  ]);

  const totalMoney = users.reduce((sum, user) => sum + user.balance, 0);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader username={admin.username} isAdmin />

      <main className="mx-auto w-full max-w-4xl flex-1 space-y-6 px-4 py-8">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Money in Bank</p>
          <p className="mt-1 text-3xl font-bold text-blue-700">
            {formatCurrency(totalMoney)}
          </p>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            All Customers &amp; Balances
          </h2>
          <UsersTable users={users} />
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            All Transactions
          </h2>
          <AllTransactionsTable transactions={transactions} />
        </section>

        <section className="rounded-xl border-2 border-red-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-red-700">
            Danger Zone
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            Wipe all customer accounts and transactions, and reset the bank to
            its initial state.
          </p>
          <ResetButton />
        </section>
      </main>
    </div>
  );
}
