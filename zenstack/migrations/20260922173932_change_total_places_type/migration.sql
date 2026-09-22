/*
  Warnings:

  - You are about to drop the column `totalPlaces` on the `Journey` table. All the data in the column will be lost.
  - Added the required column `total_places` to the `Journey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Journey` DROP COLUMN `totalPlaces`,
    ADD COLUMN `total_places` INTEGER NOT NULL;
