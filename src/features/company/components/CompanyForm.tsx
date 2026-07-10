"use client";

import { saveCompanyAction } from "../actions/company.action";

type Company = {
  companyName: string;
  registrationNo: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
};

export default function CompanyForm({
  company,
}: {
  company: Company;
}) {
  return (
    <form action={saveCompanyAction} className="space-y-4 max-w-2xl">
      <input
        name="companyName"
        defaultValue={company.companyName}
        placeholder="Company Name"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="registrationNo"
        defaultValue={company.registrationNo ?? ""}
        placeholder="Registration No"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="phone"
        defaultValue={company.phone ?? ""}
        placeholder="Phone"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="email"
        defaultValue={company.email ?? ""}
        placeholder="Email"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="website"
        defaultValue={company.website ?? ""}
        placeholder="Website"
        className="w-full border rounded-lg p-3"
      />

      <input
  name="address"
  defaultValue={company.address ?? ""}
  placeholder="Address"
  className="w-full border rounded-lg p-3"
/>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Save
      </button>
    </form>
  );
}