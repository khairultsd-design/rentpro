/*
  Warnings:

  - You are about to drop the column `checkInDate` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `checkOutDate` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Tenant` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Tenancy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "moveInDate" DATETIME NOT NULL,
    "monthlyRental" REAL NOT NULL,
    "securityDeposit" REAL NOT NULL,
    "utilityDeposit" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Tenancy_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tenancy_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tenant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "icPassport" TEXT NOT NULL,
    "nationality" TEXT,
    "gender" TEXT,
    "emergencyContactName" TEXT,
    "emergencyContactPhone" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Tenant" ("createdAt", "email", "emergencyContactName", "emergencyContactPhone", "fullName", "gender", "icPassport", "id", "nationality", "phone", "status", "updatedAt") SELECT "createdAt", "email", "emergencyContactName", "emergencyContactPhone", "fullName", "gender", "icPassport", "id", "nationality", "phone", "status", "updatedAt" FROM "Tenant";
DROP TABLE "Tenant";
ALTER TABLE "new_Tenant" RENAME TO "Tenant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
