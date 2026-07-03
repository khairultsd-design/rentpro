import { notFound } from "next/navigation";
import { getTenancyById } from "@/features/tenancy/services/tenancy.service";
import { checkOutTenant } from "@/features/tenancy/actions/tenancy.actions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TenancyDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const tenancy = await getTenancyById(id);

  if (!tenancy) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Tenancy Details
      </h1>

      <div className="space-y-3">
        <p>
          <strong>Tenant:</strong>{" "}
          {tenancy.tenant.fullName}
        </p>

        <p>
          <strong>Property:</strong>{" "}
          {tenancy.room.property.name}
        </p>

        <p>
          <strong>Room:</strong>{" "}
          {tenancy.room.roomNumber}
        </p>

        <p>
          <strong>Monthly Rental:</strong> RM{" "}
          {tenancy.monthlyRental}
        </p>

        <p>
          <strong>Security Deposit:</strong> RM{" "}
          {tenancy.securityDeposit}
        </p>

        <p>
          <strong>Utility Deposit:</strong> RM{" "}
          {tenancy.utilityDeposit}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {tenancy.status}
        </p>
        {tenancy.status === "ACTIVE" && (
  <form
    action={checkOutTenant.bind(
      null,
      tenancy.room.propertyId,
      tenancy.id
    )}
    className="mt-8"
  >
    <button
      type="submit"
      className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
    >
      Check Out
    </button>
  </form>
)}
      </div>
    </div>
  );
}