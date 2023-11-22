/*
  Warnings:

  - Added the required column `updateAt` to the `Payable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Assignor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "Payable_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "Assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payable" ("assignorId", "createdAt", "emissionDate", "id", "value") SELECT "assignorId", "createdAt", "emissionDate", "id", "value" FROM "Payable";
DROP TABLE "Payable";
ALTER TABLE "new_Payable" RENAME TO "Payable";
CREATE TABLE "new_Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);
INSERT INTO "new_Assignor" ("createdAt", "document", "email", "id", "name", "phone") SELECT "createdAt", "document", "email", "id", "name", "phone" FROM "Assignor";
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
CREATE UNIQUE INDEX "Assignor_email_key" ON "Assignor"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
