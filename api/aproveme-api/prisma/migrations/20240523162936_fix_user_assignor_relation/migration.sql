/*
  Warnings:

  - You are about to drop the column `assignorId` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Assignor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assignor" ("document", "email", "id", "name", "phone", "userId") SELECT "document", "email", "id", "name", "phone", "userId" FROM "Assignor";
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
CREATE UNIQUE INDEX "Assignor_document_key" ON "Assignor"("document");
CREATE UNIQUE INDEX "Assignor_email_key" ON "Assignor"("email");
CREATE UNIQUE INDEX "Assignor_userId_key" ON "Assignor"("userId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "login", "password") SELECT "id", "login", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
PRAGMA foreign_key_check("Assignor");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
