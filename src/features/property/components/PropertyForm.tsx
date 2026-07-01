import TextInput from "@/components/form/TextInput";

import type { Property } from "../types/property";

type PropertyFormProps = {
  mode: "create" | "edit";
  action: (formData: FormData) => void | Promise<void>;
  property?: Property;
};

export default function PropertyForm({
  mode,
  action,
  property,
}: PropertyFormProps) {
  return (
    <form
      action={action}
      className="bg-white rounded-xl shadow p-8 max-w-3xl"
    ><TextInput
  name="name"
  label="Property Name"
  placeholder="Example: Intan Apartment"
  defaultValue={property?.name}
/>

<div className="mb-6">
  <label className="block font-semibold mb-2">
    Property Type
  </label>

  <select
    name="type"
    defaultValue={property?.type}
    className="w-full rounded-lg border p-3"
  >
    <option>Apartment</option>
    <option>Condominium</option>
    <option>Landed</option>
    <option>Studio</option>
  </select>
</div>

<TextInput
  name="address"
  label="Address"
  placeholder="Full property address"
  defaultValue={property?.address}
/><div className="grid grid-cols-2 gap-4">
  <TextInput
    name="agreementStart"
    label="Agreement Start"
    type="date"
    defaultValue={
      property?.agreementStart
        ? new Date(property.agreementStart)
            .toISOString()
            .split("T")[0]
        : ""
    }
  />

  <TextInput
    name="agreementEnd"
    label="Agreement End"
    type="date"
    defaultValue={
      property?.agreementEnd
        ? new Date(property.agreementEnd)
            .toISOString()
            .split("T")[0]
        : ""
    }
  />
</div>

<div className="grid grid-cols-2 gap-4">
  <TextInput
    name="totalRooms"
    label="Total Rooms"
    type="number"
    defaultValue={property?.totalRooms}
  />

  <TextInput
    name="availableRooms"
    label="Available Rooms"
    type="number"
    defaultValue={property?.availableRooms}
  />
</div>

<div className="mb-8">
  <label className="block font-semibold mb-2">
    Status
  </label>

  <select
    name="status"
    defaultValue={property?.status}
    className="w-full rounded-lg border p-3"
  >
    <option>Active</option>
    <option>Expiring Soon</option>
    <option>Expired</option>
  </select>
</div>

<button
  type="submit"
  className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
>
  {mode === "create" ? "Save Property" : "Update Property"}
</button>
    </form>
  );
}