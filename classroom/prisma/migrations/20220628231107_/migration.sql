/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `authUserId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Student_authUserId_key` ON `Student`(`authUserId`);
