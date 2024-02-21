-- CreateTable
CREATE TABLE "Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignorId" TEXT NOT NULL,
    CONSTRAINT "Payable_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "Assignor" ("document") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assignor" (
    "document" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Assignor_document_key" ON "Assignor"("document");
