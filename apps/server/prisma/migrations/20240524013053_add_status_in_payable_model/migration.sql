-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_payables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emission_date" DATETIME NOT NULL,
    "assignor_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payed_at" DATETIME,
    "canceled_at" DATETIME,
    CONSTRAINT "payables_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "assignors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_payables" ("assignor_id", "canceled_at", "created_at", "emission_date", "id", "payed_at", "value") SELECT "assignor_id", "canceled_at", "created_at", "emission_date", "id", "payed_at", "value" FROM "payables";
DROP TABLE "payables";
ALTER TABLE "new_payables" RENAME TO "payables";
CREATE INDEX "payables_assignor_id_idx" ON "payables"("assignor_id");
PRAGMA foreign_key_check("payables");
PRAGMA foreign_keys=ON;
