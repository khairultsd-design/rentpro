import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
};

type UserTableProps = {
  users: User[];
};

export default function UserTable({
  users,
}: UserTableProps) {
  return (
    <div className="rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="border-b bg-slate-50">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b"
            >
              <td className="p-4">
                {user.name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">
                {user.role}
              </td>

              <td className="p-4">
                {user.isActive
                  ? "Active"
                  : "Inactive"}
              </td>

              <td className="p-4">
                <Link
                  href={`/dashboard/users/${user.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}