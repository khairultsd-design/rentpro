import { prisma } from "@/lib/prisma";
import { RoomStatus, TenantStatus } from "@prisma/client";

export async function createTenant(data: {
  fullName: string;
  phone: string;
  email?: string;
  icPassport: string;
  checkInDate: Date;
  checkOutDate?: Date;
status: TenantStatus;
  roomId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const room = await tx.room.findUnique({
      where: {
        id: data.roomId,
      },
    });

    if (!room) {
      throw new Error("Room not found.");
    }

    if (room.status !== "AVAILABLE") {
  throw new Error("Room is not available.");
}

    const tenant = await tx.tenant.create({
      data,
    });

    await tx.room.update({
      where: {
        id: room.id,
      },
      data: {
  status: RoomStatus.OCCUPIED,
},
    });

    await tx.property.update({
      where: {
        id: room.propertyId,
      },
      data: {
        availableRooms: {
          decrement: 1,
        },
      },
    });

    return tenant;
  });
}

export async function getTenantById(id: string) {
  return prisma.tenant.findUnique({
    where: {
      id,
    },
  });
}

export async function getTenantByRoom(roomId: string) {
  return prisma.tenant.findUnique({
    where: {
      roomId,
    },
  });
}

export async function updateTenant(
  id: string,
  data: {
    fullName: string;
    phone: string;
    email?: string;
    icPassport: string;
    checkInDate: Date;
    checkOutDate?: Date;
    status: TenantStatus;
  }
) {
  return prisma.tenant.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteTenant(id: string) {
  return prisma.tenant.delete({
    where: {
      id,
    },
  });
}