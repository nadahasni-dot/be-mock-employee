-- CreateTable
CREATE TABLE `Education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `biodataId` INTEGER NULL,
    `level` VARCHAR(10) NOT NULL,
    `institute` VARCHAR(20) NOT NULL,
    `major` VARCHAR(20) NOT NULL,
    `year_graduated` VARCHAR(5) NOT NULL,
    `grade` VARCHAR(5) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Training` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `biodataId` INTEGER NULL,
    `course_name` VARCHAR(10) NOT NULL,
    `is_certificate` BOOLEAN NOT NULL,
    `year_start` VARCHAR(5) NOT NULL,
    `year_end` VARCHAR(5) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `biodataId` INTEGER NULL,
    `company_name` VARCHAR(20) NOT NULL,
    `position` VARCHAR(20) NOT NULL,
    `last_income` INTEGER NOT NULL,
    `year_start` VARCHAR(5) NOT NULL,
    `year_end` VARCHAR(5) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Biodata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `position` VARCHAR(100) NULL,
    `name` VARCHAR(150) NULL,
    `birth_place` VARCHAR(100) NULL,
    `birth_date` DATETIME(3) NULL,
    `gender` VARCHAR(10) NULL,
    `religion` VARCHAR(10) NULL,
    `blood_type` VARCHAR(2) NULL,
    `status` VARCHAR(50) NULL,
    `address_idcard` VARCHAR(255) NULL,
    `address_live` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `phone_relation` VARCHAR(20) NULL,
    `skills` TEXT NULL,
    `is_accept_all_placement` BOOLEAN NULL,
    `expected_income` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Biodata_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Education` ADD CONSTRAINT `Education_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `Biodata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Training` ADD CONSTRAINT `Training_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `Biodata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `Biodata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Biodata` ADD CONSTRAINT `Biodata_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
