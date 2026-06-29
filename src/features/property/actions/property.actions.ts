"use server";

import { redirect } from "next/navigation";

import {
  createProperty as createPropertyService,
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

  redirect("/property");
}