import { prisma } from "@/lib/prisma";

export async function createRoom(data: {
  roomNumber: string;
  floor?: string;
  monthlyRent: number;
  status: string;
  propertyId: string;
}) {
  return prisma.room.create({
    data,
  });
}

export async function getRoomById(id: string) {
  return prisma.room.findUnique({
    where: {
      id,
    },
  });
}

export async function updateRoom(
  id: string,
  data: {
    roomNumber: string;
    floor?: string;
    monthlyRent: number;
  }
) {
  return prisma.room.update({
    where: {
      id,
    },
    data: {
      roomNumber: data.roomNumber,
      floor: data.floor,
      monthlyRent: data.monthlyRent,
    },
  });
}

export async function deleteRoom(id: string) {
  const room = await prisma.room.findUnique({
    where: {
      id,
    },
  });

  if (!room) {
    return null;
  }

  await prisma.room.delete({
    where: {
      id,
    },
  });

  await prisma.property.update({
    where: {
      id: room.propertyId,
    },
    data: {
      totalRooms: {
        decrement: 1,
      },
      availableRooms: {
        decrement: room.status === "Available" ? 1 : 0,
      },
    },
  });

  return room.propertyId;
}