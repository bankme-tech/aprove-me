-- CreateTable
CREATE TABLE "auths" (
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
    "auth_id" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "assignors_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "auths" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_assignors" ("createdAt", "document", "email", "id", "name", "phone", "updatedAt") SELECT "createdAt", "document", "email", "id", "name", "phone", "updatedAt" FROM "assignors";
DROP TABLE "assignors";
ALTER TABLE "new_assignors" RENAME TO "assignors";
CREATE TABLE "new_payables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emission_date" DATETIME NOT NULL,
    "assignor_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payed_at" DATETIME,
    "canceled_at" DATETIME,
    CONSTRAINT "payables_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "assignors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_payables" ("assignor_id", "canceled_at", "created_at", "emission_date", "id", "payed_at", "value") SELECT "assignor_id", "canceled_at", "created_at", "emission_date", "id", "payed_at", "value" FROM "payables";
DROP TABLE "payables";
ALTER TABLE "new_payables" RENAME TO "payables";
CREATE INDEX "payables_assignor_id_idx" ON "payables"("assignor_id");
PRAGMA foreign_key_check("assignors");
PRAGMA foreign_key_check("payables");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "auths_login_key" ON "auths"("login");
