-- AlterTable
ALTER TABLE `investorquarter` ADD COLUMN `releaseDate` DATE NULL;

-- CreateIndex
CREATE INDEX `InvestorQuarter_releaseDate_idx` ON `InvestorQuarter`(`releaseDate`);

-- CreateIndex
CREATE INDEX `InvestorQuarter_isActive_idx` ON `InvestorQuarter`(`isActive`);

-- CreateIndex
CREATE INDEX `InvestorQuarter_sortOrder_idx` ON `InvestorQuarter`(`sortOrder`);
