/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `assignors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `receivables` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "assignors_id_key" ON "assignors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "receivables_id_key" ON "receivables"("id");
