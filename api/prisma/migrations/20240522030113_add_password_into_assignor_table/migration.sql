/*
  Warnings:

  - Added the required column `password` to the `assignors` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_assignors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_assignors" ("createdAt", "document", "email", "id", "name", "phone", "updatedAt") SELECT "createdAt", "document", "email", "id", "name", "phone", "updatedAt" FROM "assignors";
DROP TABLE "assignors";
ALTER TABLE "new_assignors" RENAME TO "assignors";
PRAGMA foreign_key_check("assignors");
PRAGMA foreign_keys=ON;
