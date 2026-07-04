"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createInvoice } from "@/features/invoice/services/invoice.service";

import {
  createTenancy,
  checkOutTenancy,
} from "../services/tenancy.service";

export async function checkInTenant(
  propertyId: string,
  tenantId: string,
  formData: FormData
) {
  console.log("roomId =", formData.get("roomId"));
console.log("moveInDate =", formData.get("moveInDate"));
console.log("All form entries =", Object.fromEntries(formData.entries()));
  
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

  await createInvoice({
  tenancyId: tenancy.id,
  billingMonth: new Date(formData.get("moveInDate") as string).getMonth() + 1,
  billingYear: new Date(formData.get("moveInDate") as string).getFullYear(),
  amount: Number(formData.get("monthlyRental")),
  dueDate: new Date(formData.get("moveInDate") as string),
  remarks: "First month rental",
});
console.log("Invoice created successfully");
  revalidatePath(`/property/${propertyId}`);
  redirect(`/property/${propertyId}`);
}

export async function checkOutTenant(
  propertyId: string,
  tenancyId: string
) {
  await checkOutTenancy(tenancyId);

  revalidatePath("/dashboard/tenancies");
  revalidatePath(`/dashboard/tenancies/${tenancyId}`);
  revalidatePath(`/property/${propertyId}`);

  redirect("/dashboard/tenancies");
}