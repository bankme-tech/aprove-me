/*
  Warnings:

  - Made the column `assignorId` on table `Payable` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
-- Populate assignorId for existing Payable records
UPDATE Payable
SET assignorId = (SELECT id FROM Assignor WHERE Assignor.id = Payable.assignorId LIMIT 1)
WHERE assignorId IS NULL;
