-- CreateTable
CREATE TABLE "payables" (
    "id" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "emission_date" DATETIME NOT NULL,
    "assignor_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payed_at" DATETIME NOT NULL,
    "canceled_at" DATETIME NOT NULL,
    CONSTRAINT "payables_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "assignors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "assignors" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "payables_id_key" ON "payables"("id");

-- CreateIndex
CREATE INDEX "payables_assignor_id_idx" ON "payables"("assignor_id");

-- CreateIndex
CREATE UNIQUE INDEX "assignors_id_key" ON "assignors"("id");
