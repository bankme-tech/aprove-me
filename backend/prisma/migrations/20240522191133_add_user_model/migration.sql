-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "assignorId" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Assignor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("username") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Assignor" ("document", "email", "id", "name", "phone") SELECT "document", "email", "id", "name", "phone" FROM "Assignor";
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
CREATE UNIQUE INDEX "Assignor_userId_key" ON "Assignor"("userId");
PRAGMA foreign_key_check("Assignor");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_assignorId_key" ON "User"("assignorId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
