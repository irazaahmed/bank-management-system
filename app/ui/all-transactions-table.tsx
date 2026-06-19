import { formatCurrency, formatDateTime } from "@/lib/format";

type TransactionRow = {
  id: number;
  amount: number;
  timestamp: Date;
  sender: { username: string };
  receiver: { username: string };
};

export function AllTransactionsTable({
  transactions,
}: {
  transactions: TransactionRow[];
}) {
  if (transactions.length === 0) {
    return (
      <p className="rounded-lg bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
        No transactions yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">From</th>
            <th className="px-4 py-3">To</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td className="px-4 py-3 text-gray-700">{tx.sender.username}</td>
              <td className="px-4 py-3 text-gray-700">
                {tx.receiver.username}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {formatCurrency(tx.amount)}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {formatDateTime(tx.timestamp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
