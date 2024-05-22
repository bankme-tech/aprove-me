-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_receivables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignorId" TEXT NOT NULL,
    CONSTRAINT "receivables_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "assignors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_receivables" ("assignorId", "emissionDate", "id", "value") SELECT "assignorId", "emissionDate", "id", "value" FROM "receivables";
DROP TABLE "receivables";
ALTER TABLE "new_receivables" RENAME TO "receivables";
PRAGMA foreign_key_check("receivables");
PRAGMA foreign_keys=ON;
