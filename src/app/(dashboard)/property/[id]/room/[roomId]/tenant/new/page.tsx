

import TextInput from "@/components/form/TextInput";
import { createTenant } from "@/features/tenant/actions/tenant.actions";

type PageProps = {
  params: Promise<{
    id: string;
    roomId: string;
  }>;
};

export default async function NewTenantPage({
  params,
}: PageProps) {
  const { id } = await params;

  async function saveTenant(formData: FormData) {
    "use server";

await createTenant(id, {
  fullName: formData.get("fullName") as string,
  phone: formData.get("phone") as string,
  email:
    (formData.get("email") as string) || undefined,
  icPassport: formData.get("icPassport") as string,
});


  }

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        Add Tenant
      </h1>

      <form
        action={saveTenant}
        className="max-w-2xl rounded-xl bg-white p-8 shadow"
      >
        <TextInput
          name="fullName"
          label="Full Name"
        />

        <TextInput
          name="phone"
          label="Phone"
        />

        <TextInput
          name="email"
          label="Email"
          required={false}
        />

        <TextInput
          name="icPassport"
          label="IC / Passport"
        />



        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Tenant
        </button>
      </form>
    </>
  );
}