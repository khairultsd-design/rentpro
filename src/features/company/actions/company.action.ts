"use server";

import { revalidatePath } from "next/cache";
import { updateCompany } from "../services/company.service";

export async function saveCompanyAction(formData: FormData) {
 await updateCompany({
  companyName: formData.get("companyName") as string,
  registrationNo: formData.get("registrationNo") as string,
  address: formData.get("address") as string,
  phone: formData.get("phone") as string,
  email: formData.get("email") as string,
});

  revalidatePath("/dashboard/settings");
}