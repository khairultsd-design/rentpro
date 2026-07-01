import { notFound } from "next/navigation";
import { updateTenant } from "@/features/tenant/actions/tenant.actions";
import { getTenantByRoom } from "@/features/tenant/services/tenant.service";
import TextInput from "@/components/form/TextInput";
type PageProps = {
  params: Promise<{
    id: string;
    roomId: string;
  }>;
};

export default async function EditTenantPage({
  params,
}: PageProps) {
    const { id, roomId } = await params;

  const tenant = await getTenantByRoom(roomId);

  if (!tenant) {
    notFound();
  }
async function save(formData: FormData) {
  "use server";

  await updateTenant(
   tenant!.id,
    id,
    {
      fullName: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      email:
        (formData.get("email") as string) || undefined,
      icPassport: formData.get(
        "icPassport"
      ) as string,
      checkInDate: new Date(
        formData.get("checkInDate") as string
      ),
    }
  );
}
  
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        Edit Tenant
      </h1>

<form
  action={save}
  className="max-w-2xl rounded-xl bg-white p-8 shadow"
>
  <TextInput
    name="fullName"
    label="Full Name"
    defaultValue={tenant.fullName}
  />
  <TextInput
  name="phone"
  label="Phone"
  defaultValue={tenant.phone}
/><TextInput
  name="email"
  label="Email"
  defaultValue={tenant.email ?? ""}
  required={false}
/><TextInput
  name="icPassport"
  label="IC / Passport"
  defaultValue={tenant.icPassport}
/><TextInput
  name="checkInDate"
  label="Check In Date"
  type="date"
  defaultValue={tenant.checkInDate
    .toISOString()
    .split("T")[0]}
/><button
  type="submit"
  className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
>
  Save Changes
</button>
</form>
    </>
  );
}