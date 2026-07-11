import SearchBox from "@/components/SearchBox";
import PageHeader from "@/components/PageHeader";
import TenancyTable from "@/features/tenancy/components/TenancyTable";
import { getTenancies } from "@/features/tenancy/services/tenancy.service";

type PageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function TenanciesPage({
  searchParams,
}: PageProps) {
  const { search } = await searchParams;

  const tenancies = await getTenancies(search);

  return (
    <>
      <PageHeader
        title="Tenancies"
        description="Manage active tenancies"
      >
        <SearchBox
          placeholder="Search tenant..."
          defaultValue={search}
        />
      </PageHeader>

      <TenancyTable tenancies={tenancies} />
    </>
  );
}