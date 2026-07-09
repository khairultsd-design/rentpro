import { prisma } from "@/lib/prisma";
import { RoomStatus } from "@prisma/client";


export async function createRoom(data: {
  roomNumber: string;
  floor?: string;
  monthlyRent: number;
status: RoomStatus;
  propertyId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const room = await tx.room.create({
      data,
    });

    await tx.property.update({
      where: {
        id: data.propertyId,
      },
      data: {
        totalRooms: {
          increment: 1,
        },
availableRooms: {
  increment: data.status === "AVAILABLE" ? 1 : 0,
},
      },
    });

    return room;
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
  include: {
    tenancies: true,
  },
});

  if (!room) {
    return null;
  }
if (room.tenancies.length > 0) {
  throw new Error(
    "This room has tenancy history and cannot be deleted."
  );
}
  if (room.tenancies.length > 0) {
    throw new Error(
      "Room still has active tenancy. Check out tenant first."
    );
  }
if (room.tenancies.length > 0) {
  throw new Error(
    "Room still contains tenancy records. Delete or complete tenancy first."
  );
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
        decrement:
          room.status === "AVAILABLE" ? 1 : 0,
      },
    },
  });

  return room.propertyId;
}
export async function getAvailableRooms(propertyId: string) {
  return prisma.room.findMany({
    where: {
      propertyId,
      status: RoomStatus.AVAILABLE,
    },
    orderBy: {
      roomNumber: "asc",
    },
  });
}