"use client";

import { useState } from "react";
export default function Home() {
  const [propertyCount, setPropertyCount] = useState(0);
  const addProperty = () => {
  setPropertyCount(propertyCount + 1);
};
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-blue-700 text-white p-5 shadow">
        <h1 className="text-3xl font-bold">🏠 RentPro</h1>
        <p className="text-sm">Rent-to-Rent Management System</p>
      </header>

      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Properties</h3>
          <p className="text-3xl font-bold mt-2">
  {propertyCount}
</p> 
<button
  onClick={addProperty}
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
>
  Add Property
</button>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Rooms</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Tenants</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Monthly Income</h3>
            <p className="text-3xl font-bold mt-2">RM 0</p>
          </div>

        </div>
      </section>
    </main>
  );
}