/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `Assignor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Assignor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Assignor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Assignor_document_key" ON "Assignor"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Assignor_email_key" ON "Assignor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Assignor_phone_key" ON "Assignor"("phone");
