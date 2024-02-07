/*
  Warnings:

  - The primary key for the `Assignor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Assignor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Assignor" ("document", "email", "name", "phone") SELECT "document", "email", "name", "phone" FROM "Assignor";
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
