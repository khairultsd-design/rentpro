import { PrismaClient } from "@prisma/client";

export async function seedCompany(prisma: PrismaClient) {
  await prisma.companySetting.upsert({
    where: {
      id: "rentpro-company",
    },
    update: {},
    create: {
      id: "rentpro-company",
      companyName: "RentPro Property Management",
      registrationNo: "202601234567",
      address:
        "No. 18, Jalan Setiawangsa, 54200 Kuala Lumpur, Malaysia",
      phone: "+60 12-345 6789",
      email: "admin@rentpro.my",
      currency: "MYR",
      invoicePrefix: "INV",
    },
  });

  console.log("🏢 Company seeded");
}