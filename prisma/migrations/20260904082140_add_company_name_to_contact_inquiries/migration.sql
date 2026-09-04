/*
  Warnings:

  - You are about to drop the column `audience` on the `contact_inquiries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contact_inquiries` DROP COLUMN `audience`,
    ADD COLUMN `companyName` VARCHAR(255) NULL;
