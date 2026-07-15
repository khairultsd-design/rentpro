import { PrismaClient } from "@prisma/client";
import { seedCompany } from "./seeds/company.seed";
import { seedUsers } from "./seeds/users.seed";
import { seedProperties } from "./seeds/properties.seed";
import { seedRooms } from "./seeds/rooms.seed";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 RentPro Demo Seed Started...");

  await seedCompany(prisma);
await seedUsers(prisma);
  await seedProperties(prisma);
  await seedRooms(prisma);
  console.log("🎉 Demo Seed Completed");
}

main()

  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });