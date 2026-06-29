import type { CreateTenantDto } from "../types/tenant";

export function validateTenant(
  data: CreateTenantDto
) {
  const errors: string[] = [];

  if (!data.fullName.trim()) {
    errors.push("Full Name is required.");
  }

  if (!data.phone.trim()) {
    errors.push("Phone is required.");
  }

  if (!data.icPassport.trim()) {
    errors.push("IC / Passport is required.");
  }

  if (!data.roomId.trim()) {
    errors.push("Room is required.");
  }

  if (!(data.checkInDate instanceof Date)) {
    errors.push("Check In Date is invalid.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}