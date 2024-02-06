/*
  Warnings:

  - The primary key for the `Payable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `document` on the `Payable` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Payable` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Payable` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Payable` table. All the data in the column will be lost.
  - The primary key for the `Assignor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignor` on the `Assignor` table. All the data in the column will be lost.
  - You are about to drop the column `emissionDate` on the `Assignor` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Assignor` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Assignor` table. All the data in the column will be lost.
  - Added the required column `assignor` to the `Payable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emissionDate` to the `Payable` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Payable` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `value` to the `Payable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `Assignor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Assignor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Assignor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Assignor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "assignor" INTEGER NOT NULL
);
DROP TABLE "Payable";
ALTER TABLE "new_Payable" RENAME TO "Payable";
CREATE TABLE "new_Assignor" (
    "document" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
