"use server";

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
  nationality?: string;
  gender?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
};

export async function createTenant(
  propertyId: string,
  data: CreateTenantInput
) {
  const tenant = await createTenantService(data);

  revalidatePath(`/property/${propertyId}`);

  redirect(`/property/${propertyId}/tenant/${tenant.id}`);
}

export async function updateTenant(
  tenantId: string,
  propertyId: string,
  data: {
    fullName: string;
    phone: string;
    email?: string;
    icPassport: string;
    nationality?: string;
    gender?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
  }
) {
  await updateTenantService(tenantId, data);

  revalidatePath(`/property/${propertyId}`);

  redirect(`/property/${propertyId}`);
}