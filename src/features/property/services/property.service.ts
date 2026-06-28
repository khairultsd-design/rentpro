import { prisma } from "@/lib/prisma";

export async function getProperties() {
  return await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}