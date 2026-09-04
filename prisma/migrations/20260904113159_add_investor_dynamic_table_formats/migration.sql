-- AlterTable
ALTER TABLE `investordocument` ADD COLUMN `metadata` JSON NULL;

-- CreateTable
CREATE TABLE `investor_table_formats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `financialYearMode` VARCHAR(30) NOT NULL DEFAULT 'NONE',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `investor_table_formats_isActive_idx`(`isActive`),
    INDEX `investor_table_formats_sortOrder_idx`(`sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `investor_table_columns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tableFormatId` INTEGER NOT NULL,
    `key` VARCHAR(100) NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `fieldType` ENUM('TEXT', 'DATE', 'DATETIME', 'NUMBER', 'LINK', 'DOCUMENT', 'FINANCIAL_YEAR', 'QUARTER') NOT NULL DEFAULT 'TEXT',
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `investor_table_columns_tableFormatId_idx`(`tableFormatId`),
    INDEX `investor_table_columns_tableFormatId_sortOrder_idx`(`tableFormatId`, `sortOrder`),
    UNIQUE INDEX `investor_table_columns_tableFormatId_key_key`(`tableFormatId`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `investor_table_format_assignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tableFormatId` INTEGER NOT NULL,
    `categoryId` INTEGER NULL,
    `subCategoryId` INTEGER NULL,
    `financialYearId` INTEGER NULL,
    `quarterId` INTEGER NULL,
    `displayMode` VARCHAR(30) NOT NULL DEFAULT 'TABLE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `investor_table_format_assignments_categoryId_idx`(`categoryId`),
    INDEX `investor_table_format_assignments_subCategoryId_idx`(`subCategoryId`),
    INDEX `investor_table_format_assignments_financialYearId_idx`(`financialYearId`),
    INDEX `investor_table_format_assignments_quarterId_idx`(`quarterId`),
    INDEX `investor_table_format_assignments_tableFormatId_idx`(`tableFormatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `investor_table_columns` ADD CONSTRAINT `investor_table_columns_tableFormatId_fkey` FOREIGN KEY (`tableFormatId`) REFERENCES `investor_table_formats`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `investor_table_format_assignments` ADD CONSTRAINT `investor_table_format_assignments_tableFormatId_fkey` FOREIGN KEY (`tableFormatId`) REFERENCES `investor_table_formats`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `investor_table_format_assignments` ADD CONSTRAINT `investor_table_format_assignments_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `InvestorCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `investor_table_format_assignments` ADD CONSTRAINT `investor_table_format_assignments_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `InvestorSubCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `investor_table_format_assignments` ADD CONSTRAINT `investor_table_format_assignments_financialYearId_fkey` FOREIGN KEY (`financialYearId`) REFERENCES `InvestorFinancialYear`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `investor_table_format_assignments` ADD CONSTRAINT `investor_table_format_assignments_quarterId_fkey` FOREIGN KEY (`quarterId`) REFERENCES `InvestorQuarter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
