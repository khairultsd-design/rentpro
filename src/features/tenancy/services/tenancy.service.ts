import { prisma } from "@/lib/prisma";
import {
  RoomStatus,
  TenantStatus,
  TenancyStatus,
} from "@prisma/client";

type CreateTenancyInput = {
  tenantId: string;
  roomId: string;
  moveInDate: Date;
  moveOutDate?: Date;
  monthlyRental: number;
  securityDeposit: number;
  utilityDeposit: number;
};

export async function createTenancy(data: CreateTenancyInput) {
  return prisma.$transaction(async (tx) => {
    // Pastikan room masih available
    const room = await tx.room.findUnique({
      where: {
        id: data.roomId,
      },
      include: {
        property: true,
      },
    });

    if (!room) {
      throw new Error("Room not found.");
    }

    if (room.status !== RoomStatus.AVAILABLE) {
      throw new Error("Room is not available.");
    }
    console.log("CreateTenancy Data:", data);
console.log("Room ID:", data.roomId);

const activeTenancy = await tx.tenancy.findFirst({
  where: {
    tenantId: data.tenantId,
    status: TenancyStatus.ACTIVE,
  },
});

if (activeTenancy) {
  throw new Error("Tenant already has an active tenancy.");
}
    // Cipta tenancy
    const tenancy = await tx.tenancy.create({
      data: {
        ...data,
        status: TenancyStatus.ACTIVE,
      },
    });

    // Update room
    await tx.room.update({
      where: {
        id: room.id,
      },
      data: {
        status: RoomStatus.OCCUPIED,
      },
    });

    // Update tenant
    await tx.tenant.update({
      where: {
        id: data.tenantId,
      },
      data: {
        status: TenantStatus.ACTIVE,
      },
    });

    // Update property
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

    return tenancy;
  });
}