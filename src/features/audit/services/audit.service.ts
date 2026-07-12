import {
  AuditAction,
  AuditModule,
} from "@/lib/audit";
import { prisma } from "@/lib/prisma";

type AuditLogInput = {
  userId: string;
  module: (typeof AuditModule)[keyof typeof AuditModule];
  action: (typeof AuditAction)[keyof typeof AuditAction];
  description: string;
};

export async function createAuditLog({
  userId,
  module,
  action,
  description,
}: AuditLogInput) {
  await prisma.auditLog.create({
    data: {
      userId,
      module,
      action,
      description,
    },
  });
}