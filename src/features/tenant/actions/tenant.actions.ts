"use server";

import { TenantStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createTenant as createTenantService,
  updateTenant as updateTenantService,
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
    status: TenantStatus.ACTIVE,
  });

  revalidatePath(`/property/${propertyId}`);
  redirect(`/property/${propertyId}`);
}
export async function updateTenant(
  tenantId: string,
  propertyId: string,
  data: {
    fullName: string;
    phone: string;
    email?: string;
    icPassport: string;
    checkInDate: Date;
  }
) {
  await updateTenantService(tenantId, {
    ...data,
    status: TenantStatus.ACTIVE,
  });

  revalidatePath(`/property/${propertyId}`);
  redirect(`/property/${propertyId}`);
}