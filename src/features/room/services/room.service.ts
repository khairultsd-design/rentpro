import { prisma } from "@/lib/prisma";
import { RoomStatus } from "@prisma/client";

import {
  AuditAction,
  AuditModule,
} from "@/lib/audit";

import { createAuditLog } from "@/features/audit/services/audit-log.service";

export async function createRoom(
  data: {
    roomNumber: string;
    floor?: string;
    monthlyRent: number;
    status: RoomStatus;
    propertyId: string;
  },
  auditUserId: string
) {
  const room = await prisma.$transaction(async (tx) => {
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
          increment:
            data.status === RoomStatus.AVAILABLE
              ? 1
              : 0,
        },
      },
    });

    return room;
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.ROOM,
    action: AuditAction.CREATE,
    description: `Created room ${room.roomNumber}`,
  });

  return room;
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
  },
  auditUserId: string
) {
  const room = await prisma.room.update({
    where: {
      id,
    },
    data: {
      roomNumber: data.roomNumber,
      floor: data.floor,
      monthlyRent: data.monthlyRent,
    },
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.ROOM,
    action: AuditAction.UPDATE,
    description: `Updated room ${room.roomNumber}`,
  });

  return room;
}

export async function deleteRoom(
  id: string,
  auditUserId: string
) {
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
      "This room contains tenancy records and cannot be deleted."
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.room.delete({
      where: {
        id,
      },
    });

    await tx.property.update({
      where: {
        id: room.propertyId,
      },
      data: {
        totalRooms: {
          decrement: 1,
        },
        availableRooms: {
          decrement:
            room.status === RoomStatus.AVAILABLE
              ? 1
              : 0,
        },
      },
    });
  });

  await createAuditLog({
    userId: auditUserId,
    module: AuditModule.ROOM,
    action: AuditAction.DELETE,
    description: `Deleted room ${room.roomNumber}`,
  });

  return room.propertyId;
}

export async function getAvailableRooms(
  propertyId: string
) {
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