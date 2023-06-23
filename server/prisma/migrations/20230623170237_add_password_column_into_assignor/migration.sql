/*
  Warnings:

  - Added the required column `password` to the `Assignor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "updated_by" TEXT NOT NULL,
    "deleted_at" DATETIME,
    "deleted_by" TEXT
);
INSERT INTO "new_Assignor" ("created_at", "created_by", "deleted_at", "deleted_by", "document", "email", "id", "name", "phone", "updated_at", "updated_by") SELECT "created_at", "created_by", "deleted_at", "deleted_by", "document", "email", "id", "name", "phone", "updated_at", "updated_by" FROM "Assignor";
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
