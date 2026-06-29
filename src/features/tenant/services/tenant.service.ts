import { prisma } from "@/lib/prisma";

export async function createTenant(data: {
  fullName: string;
  phone: string;
  email?: string;
  icPassport: string;
  checkInDate: Date;
  checkOutDate?: Date;
  status: string;
  roomId: string;
}) {
  return prisma.tenant.create({
    data,
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
    status: string;
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