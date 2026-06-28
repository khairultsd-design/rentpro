import Link from "next/link";
import PropertyTable from "@/features/property/components/PropertyTable";
import { getProperties } from "@/features/property/services/property.service";

export default async function PropertyPage() {
  const properties = await getProperties();

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          🏢 Properties
        </h1>

        <Link
          href="/property/new"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          + Add Property
        </Link>
      </div>

      <PropertyTable properties={properties} />
    </>
  );
}