import Link from "next/link";

type PageProps = {
  params: Promise<{
    id: string;
    tenantId: string;
  }>;
};

export default async function TenantDetailsPage({
  params,
}: PageProps) {
  const { id, tenantId } = await params;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Tenant Details
      </h1>

      <Link
        href={`/property/${id}/tenant/${tenantId}/check-in`}
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
      >
        Check In
      </Link>
    </div>
  );
}