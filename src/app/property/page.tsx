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

        <p>No properties found.</p>

      </div>

    </>
  );
}