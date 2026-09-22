-- AlterTable
ALTER TABLE `blog_posts` MODIFY `date` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `industry_participation_gallery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blogPostId` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `industry_participation_gallery_blogPostId_idx`(`blogPostId`),
    INDEX `industry_participation_gallery_blogPostId_sortOrder_idx`(`blogPostId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `industry_participation_gallery` ADD CONSTRAINT `industry_participation_gallery_blogPostId_fkey` FOREIGN KEY (`blogPostId`) REFERENCES `blog_posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
