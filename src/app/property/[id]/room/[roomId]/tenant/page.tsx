import { notFound } from "next/navigation";
import { getTenantByRoom } from "@/features/tenant/services/tenant.service";
type PageProps = {
  params: Promise<{
    id: string;
    roomId: string;
  }>;
};

export default async function TenantPage({
  params,
}: PageProps) {
  const { roomId } = await params;

const tenant = await getTenantByRoom(roomId);

if (!tenant) {
  notFound();
}

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        Tenant Details
      </h1>

      <div className="space-y-3 rounded-lg bg-white p-6 shadow">
  <p>
    <strong>Full Name:</strong> {tenant.fullName}
  </p>

  <p>
    <strong>Phone:</strong> {tenant.phone}
  </p>

  <p>
    <strong>Email:</strong> {tenant.email ?? "-"}
  </p>

  <p>
    <strong>IC / Passport:</strong> {tenant.icPassport}
  </p>

  <p>
    <strong>Check In:</strong>{" "}
    {tenant.checkInDate.toLocaleDateString()}
  </p>

  <p>
    <strong>Status:</strong> {tenant.status}
  </p>
</div>
    </>
  );
}