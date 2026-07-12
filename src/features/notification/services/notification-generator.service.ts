import { prisma } from "@/lib/prisma";
import { createNotification } from "./notification.service";

export async function generateOverdueNotifications() {
  const today = new Date();

  const overdueInvoices =
    await prisma.invoice.findMany({
      where: {
        dueDate: {
          lt: today,
        },
        status: {
          not: "PAID",
        },
      },
      include: {
        tenancy: {
          include: {
            tenant: true,
            room: true,
          },
        },
      },
    });

  let created = 0;

  for (const invoice of overdueInvoices) {
    await createNotification({
      title: "Invoice Overdue",
      message: `${invoice.tenancy.tenant.fullName} - Room ${invoice.tenancy.room.roomNumber}`,
      type: "OVERDUE",
      link: `/dashboard/invoices/${invoice.id}`,
    });

    created++;
  }

  return created;
}