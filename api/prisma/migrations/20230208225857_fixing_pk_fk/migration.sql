/*
  Warnings:

  - The primary key for the `assignor` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_assignor" ("document", "email", "id", "name", "phone") SELECT "document", "email", "id", "name", "phone" FROM "assignor";
DROP TABLE "assignor";
ALTER TABLE "new_assignor" RENAME TO "assignor";
CREATE UNIQUE INDEX "assignor_document_key" ON "assignor"("document");
CREATE TABLE "new_receivable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emission_date" DATETIME NOT NULL,
    "assignorID" TEXT NOT NULL,
    CONSTRAINT "receivable_assignorID_fkey" FOREIGN KEY ("assignorID") REFERENCES "assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_receivable" ("assignorID", "emission_date", "id", "value") SELECT "assignorID", "emission_date", "id", "value" FROM "receivable";
DROP TABLE "receivable";
ALTER TABLE "new_receivable" RENAME TO "receivable";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
