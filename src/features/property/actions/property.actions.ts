"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createProperty as createPropertyService,
  updateProperty as updatePropertyService,
  deleteProperty as deletePropertyService,
} from "../services/property.service";

import type {
  CreatePropertyDto,
} from "../types/property";

export async function createProperty(formData: FormData) {
  const dto: CreatePropertyDto = {
    name: formData.get("name") as string,
    type: formData.get("type") as string,
    address: formData.get("address") as string,

    agreementStart: new Date(
      formData.get("agreementStart") as string
    ),

    agreementEnd: new Date(
      formData.get("agreementEnd") as string
    ),

    totalRooms: Number(
      formData.get("totalRooms")
    ),

    availableRooms: Number(
      formData.get("availableRooms")
    ),

    status: formData.get("status") as string,
  };

 await createPropertyService(dto);

revalidatePath("/property");

redirect("/property");
}

export async function updateProperty(
  id: string,
  formData: FormData
) {
  const dto: CreatePropertyDto = {
    name: formData.get("name") as string,
    type: formData.get("type") as string,
    address: formData.get("address") as string,

    agreementStart: new Date(
      formData.get("agreementStart") as string
    ),

    agreementEnd: new Date(
      formData.get("agreementEnd") as string
    ),

    totalRooms: Number(
      formData.get("totalRooms")
    ),

    availableRooms: Number(
      formData.get("availableRooms")
    ),

    status: formData.get("status") as string,
  };

  
  await updatePropertyService(id, dto);

revalidatePath("/property");
revalidatePath(`/property/${id}`);

redirect("/property");
}export async function deleteProperty(id: string) {
  try {
    await deletePropertyService(id);

    revalidatePath("/property");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to delete property.",
    };
  }
}
