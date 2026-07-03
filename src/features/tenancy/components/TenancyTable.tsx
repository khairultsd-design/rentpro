import Link from "next/link";

type Tenancy = {
  id: string;
  moveInDate: Date;
  monthlyRental: number;
  status: string;

  tenant: {
    fullName: string;
  };

  room: {
    roomNumber: string;

    property: {
      name: string;
    };
  };
};

type Props = {
  tenancies: Tenancy[];
};

export default function TenancyTable({
  tenancies,
}: Props) {
  if (!tenancies.length) {
    return (
      <p className="text-slate-500">
        No tenancies found.
      </p>
    );
  }

  return (
    <table className="w-full">
      <thead className="border-b">
        <tr>
          <th className="py-3 text-left">Tenant</th>
          <th className="py-3 text-left">Property</th>
          <th className="py-3 text-left">Room</th>
          <th className="py-3 text-left">Rental</th>
          <th className="py-3 text-left">Status</th>
          <th className="py-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {tenancies.map((tenancy) => (
          <tr key={tenancy.id} className="border-b">
            <td className="py-3">
              {tenancy.tenant.fullName}
            </td>

            <td>
              {tenancy.room.property.name}
            </td>

            <td>
              {tenancy.room.roomNumber}
            </td>

            <td>
              RM {tenancy.monthlyRental}
            </td>

            <td>
              {tenancy.status}
            </td>

            <td className="text-center">
              <Link
                href={`/dashboard/tenancies/${tenancy.id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}