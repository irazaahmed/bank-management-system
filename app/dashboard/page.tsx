import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";
import { SiteHeader } from "@/app/ui/site-header";
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
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Current Balance</p>
          <p className="mt-1 text-3xl font-bold text-blue-700">
            {formatCurrency(user.balance)}
          </p>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Transfer Money
          </h2>
          <TransferForm />
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Transaction History
          </h2>
          <TransactionTable
            transactions={transactions}
            currentUsername={user.username}
          />
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Change Password
          </h2>
          <ChangePasswordForm />
        </section>
      </main>
    </div>
  );
}
