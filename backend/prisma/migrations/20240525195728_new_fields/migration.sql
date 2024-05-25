/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Payable` table. All the data in the column will be lost.
  - Added the required column `document` to the `Assignor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Assignor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Assignor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emissionDate` to the `Payable` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_Assignor" ("id", "name") SELECT "id", "name" FROM "Assignor";
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
CREATE TABLE "new_Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignorId" TEXT NOT NULL,
    CONSTRAINT "Payable_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "Assignor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Payable" ("amount", "assignorId", "description", "id") SELECT "amount", "assignorId", "description", "id" FROM "Payable";
DROP TABLE "Payable";
ALTER TABLE "new_Payable" RENAME TO "Payable";
PRAGMA foreign_key_check("Assignor");
PRAGMA foreign_key_check("Payable");
PRAGMA foreign_keys=ON;
