-- AlterTable
ALTER TABLE `biodata` MODIFY `gender` VARCHAR(30) NULL;

-- AlterTable
ALTER TABLE `education` MODIFY `institute` VARCHAR(150) NOT NULL,
    MODIFY `major` VARCHAR(50) NOT NULL;
