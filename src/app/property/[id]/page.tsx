import Link from "next/link";
import { notFound } from "next/navigation";

import { getPropertyById } from "@/features/property/services/property.service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const property = await getPropertyById(id);

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

        <Link
          href={`/property/${property.id}/room/new`}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Add Room
        </Link>
      </div>

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
    </div>
  );
}