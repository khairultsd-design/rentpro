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

export async function getTenants(
  search?: string
) {
  return prisma.tenant.findMany({
    where: search
      ? {
          OR: [
            {
              fullName: {
                contains: search,
              },
            },
            {
              phone: {
                contains: search,
              },
            },
            {
              icPassport: {
                contains: search,
              },
            },
          ],
        }
      : undefined,

    orderBy: {
      createdAt: "desc",
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