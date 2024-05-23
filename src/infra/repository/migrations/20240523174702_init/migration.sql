-- CreateTable
CREATE TABLE "assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "receivable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignorId" TEXT NOT NULL,
    CONSTRAINT "receivable_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "assignor_document_key" ON "assignor"("document");
