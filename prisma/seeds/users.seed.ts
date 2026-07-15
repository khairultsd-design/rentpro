import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

export async function seedUsers(prisma: PrismaClient) {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@rentpro.my",
    },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@rentpro.my",
      password: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  console.log("👤 Admin User seeded");
}