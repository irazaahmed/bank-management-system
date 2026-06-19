import { formatCurrency, formatDateTime } from "@/lib/format";

type TransactionRow = {
  id: number;
  amount: number;
  timestamp: Date;
  sender: { username: string };
  receiver: { username: string };
};

export function TransactionTable({
  transactions,
  currentUsername,
}: {
  transactions: TransactionRow[];
  currentUsername: string;
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
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Counterparty</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((tx) => {
            const isSent = tx.sender.username === currentUsername;
            return (
              <tr key={tx.id}>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      isSent
                        ? "bg-red-50 text-red-700"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {isSent ? "Sent" : "Received"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {isSent ? tx.receiver.username : tx.sender.username}
                </td>
                <td
                  className={`px-4 py-3 font-medium ${
                    isSent ? "text-red-700" : "text-green-700"
                  }`}
                >
                  {isSent ? "-" : "+"}
                  {formatCurrency(tx.amount)}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {formatDateTime(tx.timestamp)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
