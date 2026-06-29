import { prisma } from "@/lib/prisma";
import type { CreatePropertyDto } from "../types/property";

export async function getProperties() {
  return prisma.property.findMany({
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