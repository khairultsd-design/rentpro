import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}) {
  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role ?? UserRole.STAFF,
    },
  });
}
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function updateUser(
  id: string,
  data: {
    name: string;
    email: string;
    role: UserRole;
  }
) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
}
export async function setUserStatus(
  id: string,
  isActive: boolean
) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive,
    },
  });
}
export async function getUsers(
  search?: string
) {
  return prisma.user.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              email: {
                contains: search,
              },
            },
            {
              role: {
  equals:
    search.toUpperCase() === "ADMIN"
      ? UserRole.ADMIN
      : search.toUpperCase() === "MANAGER"
      ? UserRole.MANAGER
      : search.toUpperCase() === "STAFF"
      ? UserRole.STAFF
      : undefined,
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