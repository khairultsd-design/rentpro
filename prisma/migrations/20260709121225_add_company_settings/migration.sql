/*
  Warnings:

  - A unique constraint covering the columns `[tenancyId,billingMonth,billingYear]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "CompanySetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "companyLogo" TEXT,
    "registrationNo" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'MYR',
    "invoicePrefix" TEXT NOT NULL DEFAULT 'INV',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_tenancyId_billingMonth_billingYear_key" ON "Invoice"("tenancyId", "billingMonth", "billingYear");
