/*
  Warnings:

  - You are about to drop the column `assignor` on the `Payable` table. All the data in the column will be lost.
  - Added the required column `assignorId` to the `Payable` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Payable_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "Assignor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Payable" ("createdAt", "emissionDate", "id", "updatedAt", "value") SELECT "createdAt", "emissionDate", "id", "updatedAt", "value" FROM "Payable";
DROP TABLE "Payable";
ALTER TABLE "new_Payable" RENAME TO "Payable";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
