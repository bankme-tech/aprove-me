-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignor" TEXT NOT NULL,
    CONSTRAINT "Payable_assignor_fkey" FOREIGN KEY ("assignor") REFERENCES "Assignor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Payable" ("assignor", "emissionDate", "id", "value") SELECT "assignor", "emissionDate", "id", "value" FROM "Payable";
DROP TABLE "Payable";
ALTER TABLE "new_Payable" RENAME TO "Payable";
PRAGMA foreign_key_check("Payable");
PRAGMA foreign_keys=ON;
