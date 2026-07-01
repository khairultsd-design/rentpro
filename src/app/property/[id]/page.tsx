import RoomTable from "@/features/room/components/RoomTable";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPropertyWithRooms } from "@/features/property/services/property.service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const property = await getPropertyWithRooms(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {property.name}
          </h1>

          <p className="text-slate-500 mt-2">
            {property.address}
          </p>
        </div>

       <div className="flex gap-3">
  <Link
    href={`/property/${property.id}/edit`}
    className="rounded-lg bg-amber-500 px-5 py-3 text-white hover:bg-amber-600"
  >
    ✏️ Edit Property
  </Link>

  <Link
    href={`/property/${property.id}/room/new`}
    className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
  >
    + Add Room
  </Link>
</div>
      </div>

      {/* Property Information */}
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-500">
              Property Type
            </p>

            <p className="font-semibold">
              {property.type}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            <p className="font-semibold">
              {property.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Total Rooms
            </p>

            <p className="font-semibold">
              {property.totalRooms}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Available Rooms
            </p>

            <p className="font-semibold">
              {property.availableRooms}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Agreement Start
            </p>

            <p className="font-semibold">
              {property.agreementStart.toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Agreement End
            </p>

            <p className="font-semibold">
              {property.agreementEnd.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Room List */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">
          Rooms
        </h2>

       <RoomTable
  propertyId={property.id}
  rooms={property.rooms}
/>
      </div>
    </div>
  );
}