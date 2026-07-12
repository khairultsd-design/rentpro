import { prisma } from "@/lib/prisma";

export async function getRecentActivities(limit = 10) {
  return prisma.auditLog.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}