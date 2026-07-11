import { notFound } from "next/navigation";

import PropertyForm from "@/features/property/components/PropertyForm";

import {
  getPropertyById,
} from "@/features/property/services/property.service";

import {
  updateProperty,
} from "@/features/property/actions/property.actions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPropertyPage({
  params,
}: PageProps) {
  const { id } = await params;

  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">
        Edit Property
      </h1>

      <PropertyForm
        mode="edit"
        property={property}
        action={updateProperty.bind(null, id)}
      />
    </>
  );
}