/*
  Warnings:

  - You are about to drop the `UserPayable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserPayable";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserAssignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "assignorId" TEXT NOT NULL,
    CONSTRAINT "UserAssignor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserAssignor_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "Assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAssignor_userId_assignorId_key" ON "UserAssignor"("userId", "assignorId");
