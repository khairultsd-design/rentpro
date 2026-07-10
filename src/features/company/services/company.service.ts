import { prisma } from "@/lib/prisma";

export async function getCompany() {
  let company = await prisma.companySetting.findFirst();

  if (!company) {
    company = await prisma.companySetting.create({
      data: {
        companyName: "My Company",
      },
    });
  }

  return company;
}

export async function updateCompany(data: {
  companyName: string;
  registrationNo?: string;
  address?: string;
  phone?: string;
  email?: string;
}) {
  const company = await getCompany();

  return prisma.companySetting.update({
    where: {
      id: company.id,
    },
    data,
  });
}