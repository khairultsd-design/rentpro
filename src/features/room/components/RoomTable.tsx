import DeleteRoomButton from "./DeleteRoomButton";
import Link from "next/link";

type Room = {
  id: string;
  roomNumber: string;
  floor: string | null;
  monthlyRent: number;
  status: string;
};

type RoomTableProps = {
  propertyId: string;
  rooms: Room[];
};

export default function RoomTable({
  propertyId,
  rooms,
}: RoomTableProps) {
  if (rooms.length === 0) {
    return (
      <p className="text-slate-500">
        No rooms available.
      </p>
    );
  }

  return (
    <table className="w-full">
      <thead className="border-b">
        <tr>
          <th className="py-3 text-left">Room</th>
          <th className="py-3 text-left">Floor</th>
          <th className="py-3 text-left">Monthly Rent</th>
          <th className="py-3 text-left">Status</th>
          <th className="py-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {rooms.map((room) => (
          <tr
            key={room.id}
            className="border-b last:border-0"
          >
            <td className="py-3">
              {room.roomNumber}
            </td>

            <td className="py-3">
              {room.floor ?? "-"}
            </td>

            <td className="py-3">
              RM {room.monthlyRent.toFixed(2)}
            </td>

            <td className="py-3">
              {room.status}
            </td>

            <td className="py-3">
              <div className="flex justify-center gap-2">
  <Link
    href={`/property/${propertyId}/room/${room.id}`}
    className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
  >
    Edit
  </Link>

{room.status === "AVAILABLE" && (
    <Link
      href={`/property/${propertyId}/room/${room.id}/tenant/new`}
      className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
    >
      + Tenant
    </Link>
  )}

  <DeleteRoomButton roomId={room.id} />
</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}