/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `Assignor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Assignor_document_key" ON "Assignor"("document");
