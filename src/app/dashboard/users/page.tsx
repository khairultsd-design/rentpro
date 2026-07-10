import PageHeader from "@/components/PageHeader";
import SearchBox from "@/components/SearchBox";
import UserForm from "@/features/user/components/UserForm";
import { getUsers } from "@/features/user/services/user.service";

type PageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function UsersPage({
  searchParams,
}: PageProps) {
  const { search } = await searchParams;

  const users = await getUsers(search);

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage system users"
      >
        <SearchBox
          placeholder="Search user..."
          defaultValue={search}
        />
      </PageHeader>

      <UserForm />

      <div className="rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}