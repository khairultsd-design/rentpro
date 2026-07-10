import { prisma } from "@/lib/prisma";

export async function getTenancies(
  search?: string
) {
  return prisma.tenancy.findMany({
    where: search
      ? {
          OR: [
            {
              tenant: {
                fullName: {
                  contains: search,
                },
              },
            },
            {
              room: {
                roomNumber: {
                  contains: search,
                },
              },
            },
            {
              room: {
                property: {
                  name: {
                    contains: search,
                  },
                },
              },
            },
          ],
        }
      : undefined,

    include: {
      tenant: true,
      room: {
        include: {
          property: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}