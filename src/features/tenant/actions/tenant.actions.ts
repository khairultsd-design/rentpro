"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireStaff } from "@/lib/auth";

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
  const staff = await requireStaff();

  const tenant =
    await createTenantService(
      data,
      staff.id
    );

  revalidatePath(`/property/${propertyId}`);

  redirect(
    `/property/${propertyId}/tenant/${tenant.id}`
  );
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
  const staff = await requireStaff();

  await updateTenantService(
    tenantId,
    data,
    staff.id
  );

  revalidatePath(`/property/${propertyId}`);

  redirect(`/property/${propertyId}`);
}