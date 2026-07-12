import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";

import {
  AuditAction,
  AuditModule,
} from "@/lib/audit";

import { createAuditLog } from "@/features/audit/services/audit-log.service";

export async function createUser(
  data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
  },
  auditUserId: string
) {
  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role ?? UserRole.STAFF,
    },
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.USER,
    action: AuditAction.CREATE,
    description: `Created user ${user.name} (${user.email})`,
  });

  return user;
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function updateUser(
  id: string,
  data: {
    name: string;
    email: string;
    role: UserRole;
  },
  auditUserId: string
) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.USER,
    action: AuditAction.UPDATE,
    description: `Updated user ${user.name} (${user.email})`,
  });

  return user;
}

export async function setUserStatus(
  id: string,
  isActive: boolean,
  auditUserId: string
) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive,
    },
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.USER,
    action: isActive
      ? AuditAction.ENABLE
      : AuditAction.DISABLE,
    description: `${isActive ? "Enabled" : "Disabled"} user ${user.name} (${user.email})`,
  });

  return user;
}

export async function getUsers(
  search?: string
) {
  return prisma.user.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              email: {
                contains: search,
              },
            },
            {
              role: {
                equals:
                  search.toUpperCase() === "ADMIN"
                    ? UserRole.ADMIN
                    : search.toUpperCase() === "MANAGER"
                    ? UserRole.MANAGER
                    : search.toUpperCase() === "STAFF"
                    ? UserRole.STAFF
                    : undefined,
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