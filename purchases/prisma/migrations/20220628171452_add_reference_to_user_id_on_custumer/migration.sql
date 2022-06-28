/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `customer` ADD COLUMN `authUserId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_authUserId_key` ON `Customer`(`authUserId`);
