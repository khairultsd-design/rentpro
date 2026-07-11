import PropertyForm from "@/features/property/components/PropertyForm";
import { createProperty } from "@/features/property/actions/property.actions";

export default function NewPropertyPage() {
  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        Add Property
      </h1>

      <PropertyForm
        mode="create"
        action={createProperty}
      />
    </>
  );
}