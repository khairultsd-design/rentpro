"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateRoomInput = {
  propertyId: string;
  roomNumber: string;
  floor?: string;
  monthlyRent: number;
};

export async function createRoom(data: CreateRoomInput) {
  await prisma.room.create({
    data: {
      propertyId: data.propertyId,
      roomNumber: data.roomNumber,
      floor: data.floor || null,
      monthlyRent: data.monthlyRent,
      status: "Available",
    },
  });

  await prisma.property.update({
    where: {
      id: data.propertyId,
    },
    data: {
      totalRooms: {
        increment: 1,
      },
      availableRooms: {
        increment: 1,
      },
    },
  });

  revalidatePath(`/property/${data.propertyId}`);
}