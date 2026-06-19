import { redirect } from "next/navigation";
import { ArrowLeftRight, History, KeyRound, Wallet } from "lucide-react";
import { getCurrentUser } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";
import { SiteHeader } from "@/app/ui/site-header";
import { SectionCard } from "@/app/ui/section-card";
import { TransferForm } from "@/app/ui/transfer-form";
import { ChangePasswordForm } from "@/app/ui/change-password-form";
import { TransactionTable } from "@/app/ui/transaction-table";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (user.isAdmin) {
    redirect("/admin");
  }

  const transactions = await prisma.transaction.findMany({
    where: { OR: [{ senderId: user.id }, { receiverId: user.id }] },
    include: { sender: true, receiver: true },
    orderBy: { timestamp: "desc" },
  });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader username={user.username} isAdmin={false} balance={user.balance} />

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8">
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-6 text-white shadow-lg">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30">
              <Wallet className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm text-blue-100">Current Balance</p>
              <p className="text-3xl font-bold tracking-tight">
                {formatCurrency(user.balance)}
              </p>
            </div>
          </div>
        </section>

        <SectionCard
          icon={ArrowLeftRight}
          title="Transfer Money"
          iconClassName="bg-blue-50 text-blue-700"
        >
          <TransferForm />
        </SectionCard>

        <SectionCard
          icon={History}
          title="Transaction History"
          iconClassName="bg-violet-50 text-violet-700"
        >
          <TransactionTable
            transactions={transactions}
            currentUsername={user.username}
          />
        </SectionCard>

        <SectionCard
          icon={KeyRound}
          title="Change Password"
          iconClassName="bg-amber-50 text-amber-700"
        >
          <ChangePasswordForm />
        </SectionCard>
      </main>
    </div>
  );
}
