/*
  Warnings:

  - You are about to drop the `blogpost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `blogpost`;

-- CreateTable
CREATE TABLE `blog_posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `type` ENUM('INAUGURATION', 'PRESS_RELEASE', 'NEWSLETTER_ARCHIVE', 'POLITICAL_LEADERSHIP', 'DEFENCE_MILITARY_LEADERSHIP', 'INDUSTRY_PARTICIPATION') NOT NULL,
    `excerpt` TEXT NULL,
    `content` TEXT NULL,
    `image` VARCHAR(191) NULL,
    `documentUrl` VARCHAR(191) NULL,
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

    UNIQUE INDEX `blog_posts_slug_key`(`slug`),
    INDEX `blog_posts_type_idx`(`type`),
    INDEX `blog_posts_date_idx`(`date`),
    INDEX `blog_posts_isPublished_idx`(`isPublished`),
    INDEX `blog_posts_type_isPublished_idx`(`type`, `isPublished`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
