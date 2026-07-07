import { Prisma } from "@prisma/client";

export type InvoiceWithRelations =
  Prisma.InvoiceGetPayload<{
    include: {
      tenancy: {
        include: {
          tenant: true;
          room: {
            include: {
              property: true;
            };
          };
        };
      };
      payments: true;
    };
  }>;
export type PaymentWithInvoice =
  Prisma.PaymentGetPayload<{}>;