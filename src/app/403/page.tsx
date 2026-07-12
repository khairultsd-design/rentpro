import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6">
      <h1 className="text-6xl font-bold text-red-600">
        403
      </h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Access Denied
      </h2>

      <p className="mt-2 text-center text-gray-600">
        You do not have permission to access this page.
      </p>

      <Link
        href="/dashboard"
        className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}