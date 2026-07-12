"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


import {
  createTenancy,
  checkOutTenancy,
} from "../services/tenancy.service";
import { requireStaff } from "@/lib/auth";
export async function checkInTenant(
  propertyId: string,
  tenantId: string,
  formData: FormData
) {
  await requireStaff();
  const tenancy = await createTenancy({
    tenantId,
    roomId: formData.get("roomId") as string,
    moveInDate: new Date(formData.get("moveInDate") as string),
    moveOutDate: formData.get("moveOutDate")
      ? new Date(formData.get("moveOutDate") as string)
      : undefined,
    monthlyRental: Number(formData.get("monthlyRental")),
    securityDeposit: Number(formData.get("securityDeposit")),
    utilityDeposit: Number(formData.get("utilityDeposit")),
  });


  revalidatePath(`/property/${propertyId}`);
  redirect(`/property/${propertyId}`);
}

export async function checkOutTenant(
  propertyId: string,
  tenancyId: string
) {
  await requireStaff();
  await checkOutTenancy(tenancyId);

  revalidatePath("/dashboard/tenancies");
  revalidatePath(`/dashboard/tenancies/${tenancyId}`);
  revalidatePath(`/property/${propertyId}`);

  redirect("/dashboard/tenancies");
}