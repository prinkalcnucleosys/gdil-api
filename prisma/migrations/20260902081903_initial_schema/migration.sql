-- CreateTable
CREATE TABLE `AdminUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AdminUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_inquiries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `audience` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `subject` VARCHAR(255) NULL,
    `message` TEXT NOT NULL,
    `status` VARCHAR(30) NOT NULL DEFAULT 'new',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `contact_inquiries_email_idx`(`email`),
    INDEX `contact_inquiries_status_idx`(`status`),
    INDEX `contact_inquiries_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsletter_subscribers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `subscribedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `newsletter_subscribers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogPost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `type` ENUM('INAUGURATION', 'PRESS_RELEASE', 'LEADERSHIP_VISIT', 'INDUSTRY_EVENT') NOT NULL,
    `excerpt` TEXT NULL,
    `content` TEXT NULL,
    `image` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NULL,
    `tags` JSON NULL,
    `personName` VARCHAR(191) NULL,
    `personRole` VARCHAR(191) NULL,
    `eventName` VARCHAR(191) NULL,
    `link` VARCHAR(191) NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BlogPost_slug_key`(`slug`),
    INDEX `BlogPost_type_idx`(`type`),
    INDEX `BlogPost_date_idx`(`date`),
    INDEX `BlogPost_isPublished_idx`(`isPublished`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvestorCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `InvestorCategory_name_key`(`name`),
    INDEX `InvestorCategory_isActive_idx`(`isActive`),
    INDEX `InvestorCategory_sortOrder_idx`(`sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvestorSubCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `InvestorSubCategory_categoryId_idx`(`categoryId`),
    UNIQUE INDEX `InvestorSubCategory_categoryId_name_key`(`categoryId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvestorFinancialYear` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NULL,
    `subCategoryId` INTEGER NULL,
    `year` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `InvestorFinancialYear_categoryId_idx`(`categoryId`),
    INDEX `InvestorFinancialYear_subCategoryId_idx`(`subCategoryId`),
    INDEX `InvestorFinancialYear_year_idx`(`year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvestorQuarter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `financialYearId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `InvestorQuarter_financialYearId_idx`(`financialYearId`),
    UNIQUE INDEX `InvestorQuarter_financialYearId_code_key`(`financialYearId`, `code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvestorDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `subCategoryId` INTEGER NULL,
    `financialYearId` INTEGER NULL,
    `quarterId` INTEGER NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `documentType` VARCHAR(191) NULL,
    `purpose` TEXT NULL,
    `documentDate` DATETIME(3) NULL,
    `disclosureDate` DATETIME(3) NULL,
    `dueDate` DATETIME(3) NULL,
    `storageType` VARCHAR(191) NOT NULL DEFAULT 'google_drive',
    `externalUrl` VARCHAR(191) NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `InvestorDocument_categoryId_idx`(`categoryId`),
    INDEX `InvestorDocument_subCategoryId_idx`(`subCategoryId`),
    INDEX `InvestorDocument_financialYearId_idx`(`financialYearId`),
    INDEX `InvestorDocument_quarterId_idx`(`quarterId`),
    INDEX `InvestorDocument_isPublished_idx`(`isPublished`),
    INDEX `InvestorDocument_sortOrder_idx`(`sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InvestorSubCategory` ADD CONSTRAINT `InvestorSubCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `InvestorCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvestorFinancialYear` ADD CONSTRAINT `InvestorFinancialYear_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `InvestorCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvestorFinancialYear` ADD CONSTRAINT `InvestorFinancialYear_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `InvestorSubCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvestorQuarter` ADD CONSTRAINT `InvestorQuarter_financialYearId_fkey` FOREIGN KEY (`financialYearId`) REFERENCES `InvestorFinancialYear`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvestorDocument` ADD CONSTRAINT `InvestorDocument_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `InvestorCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvestorDocument` ADD CONSTRAINT `InvestorDocument_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `InvestorSubCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvestorDocument` ADD CONSTRAINT `InvestorDocument_financialYearId_fkey` FOREIGN KEY (`financialYearId`) REFERENCES `InvestorFinancialYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvestorDocument` ADD CONSTRAINT `InvestorDocument_quarterId_fkey` FOREIGN KEY (`quarterId`) REFERENCES `InvestorQuarter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
