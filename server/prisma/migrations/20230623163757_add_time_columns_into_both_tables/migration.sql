/*
  Warnings:

  - Added the required column `created_by` to the `Payable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Payable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `Payable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Assignor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Assignor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `Assignor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "valueInCents" INTEGER NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignorId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "updated_by" TEXT NOT NULL,
    "deleted_at" DATETIME,
    "deleted_by" TEXT,
    CONSTRAINT "Payable_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "Assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payable" ("assignorId", "emissionDate", "id", "valueInCents") SELECT "assignorId", "emissionDate", "id", "valueInCents" FROM "Payable";
DROP TABLE "Payable";
ALTER TABLE "new_Payable" RENAME TO "Payable";
CREATE TABLE "new_Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "updated_by" TEXT NOT NULL,
    "deleted_at" DATETIME,
    "deleted_by" TEXT
);
INSERT INTO "new_Assignor" ("document", "email", "id", "name", "phone") SELECT "document", "email", "id", "name", "phone" FROM "Assignor";
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
CREATE UNIQUE INDEX "Assignor_email_key" ON "Assignor"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
