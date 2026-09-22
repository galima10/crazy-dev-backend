/*
  Warnings:

  - You are about to drop the column `created_by` on the `Journey` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `Reservation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[journey_id,reserved_by_id]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created_by_id` to the `Journey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reserved_by_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Journey` DROP FOREIGN KEY `Journey_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_account_id_fkey`;

-- DropIndex
DROP INDEX `Journey_created_by_fkey` ON `Journey`;

-- DropIndex
DROP INDEX `Reservation_account_id_fkey` ON `Reservation`;

-- AlterTable
ALTER TABLE `Journey` DROP COLUMN `created_by`,
    ADD COLUMN `created_by_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `account_id`,
    ADD COLUMN `reserved_by_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Account_username_key` ON `Account`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `Reservation_journey_id_reserved_by_id_key` ON `Reservation`(`journey_id`, `reserved_by_id`);

-- AddForeignKey
ALTER TABLE `Journey` ADD CONSTRAINT `Journey_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_reserved_by_id_fkey` FOREIGN KEY (`reserved_by_id`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
