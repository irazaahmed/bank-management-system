import { ArrowRightLeft, ShieldAlert, Users, Wallet } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";
import { SiteHeader } from "@/app/ui/site-header";
import { SectionCard } from "@/app/ui/section-card";
import { StatCard } from "@/app/ui/stat-card";
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={Wallet}
            label="Total Money in Bank"
            value={formatCurrency(totalMoney)}
            gradient="from-blue-600 to-indigo-600"
          />
          <StatCard
            icon={Users}
            label="Total Customers"
            value={String(users.length)}
            gradient="from-violet-600 to-purple-600"
          />
          <StatCard
            icon={ArrowRightLeft}
            label="Total Transactions"
            value={String(transactions.length)}
            gradient="from-emerald-600 to-teal-600"
          />
        </div>

        <SectionCard
          icon={Users}
          title="All Customers & Balances"
          iconClassName="bg-violet-50 text-violet-700"
        >
          <UsersTable users={users} />
        </SectionCard>

        <SectionCard
          icon={ArrowRightLeft}
          title="All Transactions"
          iconClassName="bg-emerald-50 text-emerald-700"
        >
          <AllTransactionsTable transactions={transactions} />
        </SectionCard>

        <section className="rounded-2xl border-2 border-red-200 bg-white p-6 shadow-sm">
          <div className="mb-1 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-700">
              <ShieldAlert className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold text-red-700">Danger Zone</h2>
          </div>
          <p className="mb-4 ml-[46px] text-sm text-gray-500">
            Wipe all customer accounts and transactions, and reset the bank to
            its initial state.
          </p>
          <ResetButton />
        </section>
      </main>
    </div>
  );
}
