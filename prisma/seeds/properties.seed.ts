import { PrismaClient } from "@prisma/client";

export async function seedProperties(prisma: PrismaClient) {
  const properties = [
    {
      name: "Setiawangsa Apartment",
      type: "Apartment",
      address: "Jalan Setiawangsa, Kuala Lumpur",
      totalRooms: 15,
      availableRooms: 4,
      status: "ACTIVE",
    },
    {
      name: "Wangsa Maju Residence",
      type: "Condominium",
      address: "Jalan Wangsa Maju, Kuala Lumpur",
      totalRooms: 10,
      availableRooms: 2,
      status: "ACTIVE",
    },
    {
      name: "Puchong Heights",
      type: "Terrace House",
      address: "Puchong, Selangor",
      totalRooms: 8,
      availableRooms: 3,
      status: "ACTIVE",
    },
  ];

  for (const property of properties) {
    const existing = await prisma.property.findFirst({ where: { name: property.name } });
    if (existing) {
      await prisma.property.update({ where: { id: existing.id }, data: property });
    } else {
      await prisma.property.create({
        data: {
          ...property,
          agreementStart: new Date("2026-01-01"),
          agreementEnd: new Date("2028-12-31"),
        },
      });
    }
  }

  console.log("🏠 Properties seeded");
}