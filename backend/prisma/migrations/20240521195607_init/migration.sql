/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserPayable` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password") SELECT "email", "id", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_UserPayable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "payableId" TEXT NOT NULL,
    CONSTRAINT "UserPayable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserPayable_payableId_fkey" FOREIGN KEY ("payableId") REFERENCES "Payable" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserPayable" ("id", "payableId", "userId") SELECT "id", "payableId", "userId" FROM "UserPayable";
DROP TABLE "UserPayable";
ALTER TABLE "new_UserPayable" RENAME TO "UserPayable";
CREATE UNIQUE INDEX "UserPayable_userId_payableId_key" ON "UserPayable"("userId", "payableId");
PRAGMA foreign_key_check("User");
PRAGMA foreign_key_check("UserPayable");
PRAGMA foreign_keys=ON;
