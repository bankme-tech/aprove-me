-- CreateTable
CREATE TABLE "Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignor" TEXT NOT NULL
);
