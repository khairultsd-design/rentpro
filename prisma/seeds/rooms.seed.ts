import { PrismaClient } from "@prisma/client";

export async function seedRooms(prisma: PrismaClient) {
  const properties = await prisma.property.findMany();

  for (const property of properties) {
    // Elak duplicate bila seed dijalankan semula
    const existingRooms = await prisma.room.count({
      where: {
        propertyId: property.id,
      },
    });

    if (existingRooms > 0) continue;

    for (let i = 1; i <= property.totalRooms; i++) {
    let status = "OCCUPIED";

if (i > property.totalRooms - property.availableRooms) {
  status = "AVAILABLE";
}

      await prisma.room.create({
        data: {
          roomNumber: i.toString().padStart(2, "0"),
          floor: Math.ceil(i / 5).toString(),
          monthlyRent: 550 + (i % 5) * 50,
          status: status as any,
          propertyId: property.id,
        },
      });
    }
  }

  console.log("🚪 Rooms seeded");
}