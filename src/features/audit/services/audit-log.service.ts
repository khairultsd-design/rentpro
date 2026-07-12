import { prisma } from "@/lib/prisma";

export async function getAuditLogs() {
  return prisma.auditLog.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}