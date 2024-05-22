-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_receivables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emission_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignor_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "receivables_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "assignors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_receivables" ("assignor_id", "emission_date", "id", "value") SELECT "assignor_id", "emission_date", "id", "value" FROM "receivables";
DROP TABLE "receivables";
ALTER TABLE "new_receivables" RENAME TO "receivables";
PRAGMA foreign_key_check("receivables");
PRAGMA foreign_keys=ON;
