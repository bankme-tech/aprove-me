/*
  Warnings:

  - You are about to drop the column `password` on the `assignors` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_assignors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_assignors" ("createdAt", "document", "email", "id", "name", "phone", "updatedAt") SELECT "createdAt", "document", "email", "id", "name", "phone", "updatedAt" FROM "assignors";
DROP TABLE "assignors";
ALTER TABLE "new_assignors" RENAME TO "assignors";
PRAGMA foreign_key_check("assignors");
PRAGMA foreign_keys=ON;
