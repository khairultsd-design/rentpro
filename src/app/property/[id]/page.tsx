import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      rooms: true,
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          {property.name}
        </h1>

        <p className="text-slate-500">
          {property.address}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">
            Property Type
          </p>

          <h2 className="text-xl font-semibold mt-2">
            {property.type}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">
            Status
          </p>

          <h2 className="text-xl font-semibold mt-2">
            {property.status}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">
            Total Rooms
          </p>

          <h2 className="text-xl font-semibold mt-2">
            {property.totalRooms}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">
            Available Rooms
          </p>

          <h2 className="text-xl font-semibold mt-2">
            {property.availableRooms}
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Rooms
        </h2>

        {property.rooms.length === 0 ? (
          <p className="text-slate-500">
            No rooms added yet.
          </p>
        ) : (
          <p>
            {property.rooms.length} room(s)
          </p>
        )}
      </div>

    </div>
  );
}