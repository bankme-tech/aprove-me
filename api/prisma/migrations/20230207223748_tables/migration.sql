-- CreateTable
CREATE TABLE "admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "assignor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "receivable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emission_date" DATETIME NOT NULL,
    "assignorID" INTEGER NOT NULL,
    CONSTRAINT "receivable_assignorID_fkey" FOREIGN KEY ("assignorID") REFERENCES "assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_login_key" ON "admin"("login");

-- CreateIndex
CREATE UNIQUE INDEX "assignor_document_key" ON "assignor"("document");
