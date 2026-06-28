import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { Property } from "../types/property";

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

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}