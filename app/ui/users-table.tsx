import { formatCurrency } from "@/lib/format";

type UserRow = {
  id: number;
  username: string;
  balance: number;
  isAdmin: boolean;
};

export function UsersTable({ users }: { users: UserRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Username</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-3 font-medium text-gray-900">
                {user.username}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {user.isAdmin ? "Admin" : "Customer"}
              </td>
              <td className="px-4 py-3 text-gray-700">
                {formatCurrency(user.balance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
