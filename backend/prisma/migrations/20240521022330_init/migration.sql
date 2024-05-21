-- CreateTable
CREATE TABLE "payables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emission_date" DATETIME NOT NULL,
    "assignor_id" TEXT NOT NULL,
    CONSTRAINT "payables_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "assignors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "assignors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "assignors_email_document_idx" ON "assignors"("email", "document");

-- CreateIndex
CREATE UNIQUE INDEX "assignors_email_document_key" ON "assignors"("email", "document");
