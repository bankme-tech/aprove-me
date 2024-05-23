/*
  Warnings:

  - You are about to drop the column `assignor` on the `Payable` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignorId" TEXT,
    CONSTRAINT "Payable_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "Assignor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Payable" ("emissionDate", "id", "value") SELECT "emissionDate", "id", "value" FROM "Payable";
DROP TABLE "Payable";
ALTER TABLE "new_Payable" RENAME TO "Payable";
CREATE INDEX "Payable_assignorId_idx" ON "Payable"("assignorId");
PRAGMA foreign_key_check("Payable");
PRAGMA foreign_keys=ON;
