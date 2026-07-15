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
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Tenant" ("createdAt", "email", "emergencyContactName", "emergencyContactPhone", "fullName", "gender", "icPassport", "id", "nationality", "phone", "status", "updatedAt") SELECT "createdAt", "email", "emergencyContactName", "emergencyContactPhone", "fullName", "gender", "icPassport", "id", "nationality", "phone", "status", "updatedAt" FROM "Tenant";
DROP TABLE "Tenant";
ALTER TABLE "new_Tenant" RENAME TO "Tenant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
