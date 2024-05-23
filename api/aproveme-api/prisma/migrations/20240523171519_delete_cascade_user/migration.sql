-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Assignor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Assignor" ("document", "email", "id", "name", "phone", "userId") SELECT "document", "email", "id", "name", "phone", "userId" FROM "Assignor";
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
CREATE UNIQUE INDEX "Assignor_document_key" ON "Assignor"("document");
CREATE UNIQUE INDEX "Assignor_email_key" ON "Assignor"("email");
CREATE UNIQUE INDEX "Assignor_userId_key" ON "Assignor"("userId");
PRAGMA foreign_key_check("Assignor");
PRAGMA foreign_keys=ON;
