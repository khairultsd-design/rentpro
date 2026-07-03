type Tenant = {
  id: string;
  fullName: string;
  phone: string;
  status: string;
};

type Props = {
  tenants: Tenant[];
};

export default function TenantTable({
  tenants,
}: Props) {
  if (!tenants.length) {
    return (
      <p className="text-slate-500">
        No tenants found.
      </p>
    );
  }

  return (
    <table className="w-full">
      <thead className="border-b">
        <tr>
          <th className="py-3 text-left">Name</th>
          <th className="py-3 text-left">Phone</th>
          <th className="py-3 text-left">Status</th>
          <th className="py-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {tenants.map((tenant) => (
          <tr key={tenant.id} className="border-b">
            <td className="py-3">
              {tenant.fullName}
            </td>

            <td>{tenant.phone}</td>

            <td>{tenant.status}</td>

            <td className="text-center">
              View
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}