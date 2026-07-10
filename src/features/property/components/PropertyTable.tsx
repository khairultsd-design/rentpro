import {
  Table,
  EmptyState,
} from "@/components/ui";
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
  if (properties.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        description="Start by adding your first rental property."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Property</th>
            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Type</th>
            <th className="p-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Rooms</th>
            <th className="p-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Available</th>
            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Agreement</th>
            <th className="p-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            <th className="p-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
          </tr>
        </thead>

        <tbody>
          {properties.length === 0 ? (
  <tr>
    <td
      colSpan={7}
      className="py-10 text-center text-slate-500"
    >
      No properties found.
    </td>
  </tr>
) : (
            properties.map((property) => (
            <tr key={property.id} className="border-t border-slate-100 transition-colors hover:bg-slate-50">

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
      className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-amber-600"
    >
      Edit
    </Link>

    <DeletePropertyButton
      propertyId={property.id}
    />
  </div>
</td>

            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
}