import { createInvoice } from "@/features/invoice/services/invoice.service";
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


await createInvoice(
  {
    tenancyId: tenancy.id,
    billingMonth: data.moveInDate.getMonth() + 1,
    billingYear: data.moveInDate.getFullYear(),
    amount: data.monthlyRental,
    dueDate: data.moveInDate,
    remarks: "First month rental",
  },
  tx
);


    return tenancy;
  });
}

export async function getTenancies() {
  return prisma.tenancy.findMany({
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

export async function getTenancyById(id: string) {
  return prisma.tenancy.findUnique({
    where: {
      id,
    },
    include: {
      tenant: true,
      room: {
        include: {
          property: true,
        },
      },
    },
  });
}

export async function checkOutTenancy(id: string) {
  return prisma.$transaction(async (tx) => {
    const tenancy = await tx.tenancy.findUnique({
      where: {
        id,
      },
      include: {
        room: true,
      },
    });

    if (!tenancy) {
      throw new Error("Tenancy not found.");
    }

    if (tenancy.status !== TenancyStatus.ACTIVE) {
      throw new Error("Tenancy is not active.");
    }

    await tx.tenancy.update({
      where: {
        id,
      },
      data: {
        status: TenancyStatus.COMPLETED,
      },
    });

    await tx.room.update({
      where: {
        id: tenancy.roomId,
      },
      data: {
        status: RoomStatus.AVAILABLE,
      },
    });

    await tx.tenant.update({
      where: {
        id: tenancy.tenantId,
      },
      data: {
        status: TenantStatus.CHECKED_OUT,
      },
    });

    await tx.property.update({
      where: {
        id: tenancy.room.propertyId,
      },
      data: {
        availableRooms: {
          increment: 1,
        },
      },
    });
  });
}