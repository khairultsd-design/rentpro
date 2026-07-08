import { prisma } from "@/lib/prisma";
import type { CreatePropertyDto } from "../types/property";

export async function getProperties(
  search?: string
) {
  return prisma.property.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              address: {
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

export async function getPropertyById(id: string) {
  return prisma.property.findUnique({
    where: {
      id,
    },
  });
}

export async function getPropertyWithRooms(id: string) {
  return prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      rooms: {
        orderBy: {
          roomNumber: "asc",
        },
      },
    },
  });
}

export async function createProperty(data: CreatePropertyDto) {
  return prisma.property.create({
    data,
  });
}

export async function updateProperty(
  id: string,
  data: CreatePropertyDto
) {
  return prisma.property.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteProperty(id: string) {
  const roomCount = await prisma.room.count({
    where: {
      propertyId: id,
    },
  });

  if (roomCount > 0) {
    throw new Error(
      "This property still contains rooms. Delete all rooms first."
    );
  }

  return prisma.property.delete({
    where: {
      id,
    },
  });
}