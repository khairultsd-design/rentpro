import TenancyTable from "@/features/tenancy/components/TenancyTable";
import { getTenancies } from "@/features/tenancy/services/tenancy.service";

export default async function TenanciesPage() {
  const tenancies = await getTenancies();

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Tenancies
      </h1>

      <TenancyTable tenancies={tenancies} />
    </div>
  );
}