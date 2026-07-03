import { notFound } from "next/navigation";

import CheckInForm from "@/features/tenancy/components/CheckInForm";
import { getAvailableRooms } from "@/features/room/services/room.service";

type PageProps = {
  params: Promise<{
    id: string;
    tenantId: string;
  }>;
};

export default async function CheckInPage({
  params,
}: PageProps) {
  const { id, tenantId } = await params;

  const rooms = await getAvailableRooms(id);

  if (!rooms.length) {
    notFound();
  }

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        Check In Tenant
      </h1>

      <CheckInForm
  propertyId={id}
  tenantId={tenantId}
  rooms={rooms}
/>
    </>
  );
}