import { properties } from "@/features/property/data";
import Link from "next/link";

export default function PropertyPage() {
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

 <div className="bg-white rounded-xl shadow p-6">

  {properties.map((property) => (
    <div
      key={property.id}
      className="border-b py-4"
    >
      <h2 className="text-xl font-semibold">
        {property.name}
      </h2>

      <p>{property.type}</p>

      <p className="text-gray-500">
        {property.address}
      </p>
    </div>
  ))}

</div>

    </>
  );
}