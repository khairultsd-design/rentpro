import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import PropertyTable from "@/features/property/components/PropertyTable";
import { getProperties } from "@/features/property/services/property.service";
import PageHeader from "@/components/PageHeader";
// Temporary stub for role requirement. Replace with real implementation as needed.
async function requireRole(roles: string[] | string) {
  // If your app provides an auth utility, import and use it instead of this stub.
  return;
}


type PropertyPageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function PropertyPage({
  searchParams,
}: PropertyPageProps) {
  const { search } = await searchParams;
await requireRole(["ADMIN", "MANAGER"]);
  const properties = await getProperties(search);

  return (
    <>
      <PageHeader
  title="Properties"
  description="Manage your rental properties"
  actions={
    <Link
      href="/property/new"
      className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
    >
      + Add Property
    </Link>
  }
>
  <SearchBox
    placeholder="Search property..."
    defaultValue={search}
  />
</PageHeader>

      <PropertyTable properties={properties} />
    </>
  );
}