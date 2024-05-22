-- CreateTable
CREATE TABLE "receivables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emission_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignor_id" TEXT NOT NULL,
    CONSTRAINT "receivables_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "assignors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "assignors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
