import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import PropertyTable from "@/features/property/components/PropertyTable";
import { getProperties } from "@/features/property/services/property.service";
import PageHeader from "@/components/PageHeader";

type PropertyPageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function PropertyPage({
  searchParams,
}: PropertyPageProps) {
  const { search } = await searchParams;

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