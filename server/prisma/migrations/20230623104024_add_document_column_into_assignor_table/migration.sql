/*
  Warnings:

  - Added the required column `document` to the `Assignor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Assignor" ("email", "id", "name", "phone") SELECT "email", "id", "name", "phone" FROM "Assignor";
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
CREATE UNIQUE INDEX "Assignor_email_key" ON "Assignor"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
