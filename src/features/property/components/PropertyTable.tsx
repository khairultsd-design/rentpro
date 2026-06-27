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
            <tr key={property.id} className="border-t">
              <td className="p-4 font-semibold">
                {property.name}
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
                {property.agreementEnd}
              </td>

              <td className="text-center p-4">
                {property.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}