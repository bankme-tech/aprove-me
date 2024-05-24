/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Assignor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Assignor_email_key" ON "Assignor"("email");
