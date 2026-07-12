import { prisma } from "@/lib/prisma";
import { TenantStatus } from "@prisma/client";

import {
  AuditAction,
  AuditModule,
} from "@/lib/audit";

import { createAuditLog } from "@/features/audit/services/audit-log.service";

export async function createTenant(
  data: {
    fullName: string;
    phone: string;
    email?: string;
    icPassport: string;
    nationality?: string;
    gender?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
  },
  auditUserId: string
) {
  const tenant = await prisma.tenant.create({
    data: {
      ...data,
      status: TenantStatus.PENDING,
    },
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.TENANT,
    action: AuditAction.CREATE,
    description: `Created tenant ${tenant.fullName}`,
  });

  return tenant;
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
  },
  auditUserId: string
) {
  const tenant = await prisma.tenant.update({
    where: {
      id,
    },
    data,
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.TENANT,
    action: AuditAction.UPDATE,
    description: `Updated tenant ${tenant.fullName}`,
  });

  return tenant;
}

export async function deleteTenant(
  id: string,
  auditUserId: string
) {
  const tenant = await prisma.tenant.delete({
    where: {
      id,
    },
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.TENANT,
    action: AuditAction.DELETE,
    description: `Deleted tenant ${tenant.fullName}`,
  });

  return tenant;
}