"use server";

import { TenantStatus } from "@prisma/client";
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
  console.log("DEBUG STATUS:", TenantStatus.ACTIVE);

  try {
    await createTenantService({
      ...data,
      status: TenantStatus.ACTIVE,
    });

    revalidatePath(`/property/${propertyId}`);
    redirect(`/property/${propertyId}`);
  } catch (error) {
    console.error("TENANT ERROR:", error);
    throw error;
  }
}