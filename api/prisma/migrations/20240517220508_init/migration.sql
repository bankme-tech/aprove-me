-- CreateTable
CREATE TABLE "receivables" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignorId" TEXT NOT NULL,
    CONSTRAINT "receivables_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES "assignors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "assignors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "assignors_document_key" ON "assignors"("document");

-- CreateIndex
CREATE UNIQUE INDEX "assignors_email_key" ON "assignors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "assignors_phone_key" ON "assignors"("phone");
