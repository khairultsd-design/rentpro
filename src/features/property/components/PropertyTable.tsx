import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { Property } from "../types/property";
import DeletePropertyButton from "./DeletePropertyButton";

type PropertyTableProps = {
  properties: Property[];
};

export default function PropertyTable({
  properties,
}: PropertyTableProps) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
  <tr>
    <th className="text-left p-4">Property</th>
    <th className="text-left p-4">Type</th>
    <th className="text-center p-4">Rooms</th>
    <th className="text-center p-4">Available</th>
    <th className="text-left p-4">Agreement</th>
    <th className="text-center p-4">Status</th>
    <th className="text-center p-4">Actions</th>
  </tr>
</thead>

        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border-t hover:bg-slate-50">

              <td className="p-4 font-semibold">
                <Link
                 href={`/property/${property.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {property.name}
                </Link>
              </td>

              <td className="p-4">
                {property.type}
              </td>

              <td className="text-center p-4">
                {property.totalRooms}
              </td>

              <td className="text-center p-4">
                {property.availableRooms}
              </td>

              <td className="p-4">
                {new Date(property.agreementEnd).toLocaleDateString()}
              </td>

              <td className="text-center p-4">
                <StatusBadge status={property.status as any} />
              </td>
              <td className="p-4">
  <div className="flex justify-center gap-2">
    <Link
      href={`/property/${property.id}/edit`}
      className="rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"
    >
      Edit
    </Link>

    <DeletePropertyButton
      propertyId={property.id}
    />
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}