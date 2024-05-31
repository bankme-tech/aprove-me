-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignorId" TEXT NOT NULL,
    CONSTRAINT "Payable_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "Assignor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Payable" ("assignorId", "emissionDate", "id", "value") SELECT "assignorId", "emissionDate", "id", "value" FROM "Payable";
DROP TABLE "Payable";
ALTER TABLE "new_Payable" RENAME TO "Payable";
CREATE TABLE "new_UserPayable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "payableId" TEXT NOT NULL,
    CONSTRAINT "UserPayable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserPayable_payableId_fkey" FOREIGN KEY ("payableId") REFERENCES "Payable" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserPayable" ("id", "payableId", "userId") SELECT "id", "payableId", "userId" FROM "UserPayable";
DROP TABLE "UserPayable";
ALTER TABLE "new_UserPayable" RENAME TO "UserPayable";
CREATE UNIQUE INDEX "UserPayable_userId_payableId_key" ON "UserPayable"("userId", "payableId");
PRAGMA foreign_key_check("Payable");
PRAGMA foreign_key_check("UserPayable");
PRAGMA foreign_keys=ON;
