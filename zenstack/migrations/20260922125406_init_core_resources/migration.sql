-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Journey` (
    `id` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,
    `start_city` VARCHAR(191) NOT NULL,
    `end_city` VARCHAR(191) NOT NULL,
    `totalPlaces` DECIMAL(15, 6) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `id` VARCHAR(191) NOT NULL,
    `journey_id` VARCHAR(191) NOT NULL,
    `account_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Journey` ADD CONSTRAINT `Journey_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_journey_id_fkey` FOREIGN KEY (`journey_id`) REFERENCES `Journey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
