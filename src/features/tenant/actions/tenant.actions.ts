"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createTenant as createTenantService,
} from "../services/tenant.service";

type CreateTenantInput = {
  fullName: string;
  phone: string;
  email?: string;
  icPassport: string;
  checkInDate: Date;
  checkOutDate?: Date;
  roomId: string;
};

export async function createTenant(
  propertyId: string,
  data: CreateTenantInput
) {
  await createTenantService({
    ...data,
    status: "Active",
  });

  revalidatePath(`/property/${propertyId}`);
  redirect(`/property/${propertyId}`);
}