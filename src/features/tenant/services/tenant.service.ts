import { prisma } from "@/lib/prisma";
import { TenantStatus } from "@prisma/client";

export async function createTenant(data: {
  fullName: string;
  phone: string;
  email?: string;
  icPassport: string;
  nationality?: string;
  gender?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}) {
  return prisma.tenant.create({
    data: {
      ...data,
      status: TenantStatus.PENDING,
    },
  });
}

export async function getTenantById(id: string) {
  return prisma.tenant.findUnique({
    where: {
      id,
    },
  });
}

export async function updateTenant(
  id: string,
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
  return prisma.tenant.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteTenant(id: string) {
  return prisma.tenant.delete({
    where: {
      id,
    },
  });
}