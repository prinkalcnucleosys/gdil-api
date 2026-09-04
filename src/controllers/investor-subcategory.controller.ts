import type { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

/**
 * =====================================================================
 * INVESTOR SUB CATEGORY CONTROLLER
 * =====================================================================
 *
 * Prisma Model:
 *
 * model InvestorSubCategory {
 *   id         Int     @id @default(autoincrement())
 *   categoryId Int
 *   name       String
 *   sortOrder  Int     @default(0)
 *   isActive   Boolean @default(true)
 *
 *   category InvestorCategory @relation(
 *     fields: [categoryId],
 *     references: [id],
 *     onDelete: Cascade
 *   )
 *
 *   financialYears InvestorFinancialYear[]
 *   documents      InvestorDocument[]
 *
 *   createdAt DateTime @default(now())
 *   updatedAt DateTime @updatedAt
 *
 *   @@unique([categoryId, name])
 *   @@index([categoryId])
 * }
 */

/**
 * =====================================================================
 * GET ALL SUBCATEGORIES
 * GET /api/investor/subcategories
 * GET /api/investor/admin/subcategories
 * =====================================================================
 */
export async function getInvestorSubCategories(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { includeInactive, categoryId } = req.query;

    const where: any = {};

    if (includeInactive !== "true") {
      where.isActive = true;
    }

    if (categoryId !== undefined) {
      const parsedCategoryId = Number(categoryId);

      if (!Number.isInteger(parsedCategoryId) || parsedCategoryId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }

      where.categoryId = parsedCategoryId;
    }

    const subCategories =
      await prisma.investorSubCategory.findMany({
        where,
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            name: "asc",
          },
        ],
        include: {
          category: true,
        },
      });

    return res.status(200).json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * =====================================================================
 * GET SUBCATEGORIES BY CATEGORY
 * GET /api/investor/categories/:categoryId/subcategories
 * GET /api/investor/admin/categories/:categoryId/subcategories
 * =====================================================================
 */
export async function getInvestorSubCategoriesByCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const categoryId = Number(req.params.categoryId);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const { includeInactive } = req.query;

    const category =
      await prisma.investorCategory.findUnique({
        where: {
          id: categoryId,
        },
      });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Investor category not found",
      });
    }

    const where: any = {
      categoryId,
    };

    if (includeInactive !== "true") {
      where.isActive = true;
    }

    const subCategories =
      await prisma.investorSubCategory.findMany({
        where,
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            name: "asc",
          },
        ],
      });

    return res.status(200).json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * =====================================================================
 * GET SUBCATEGORY BY ID
 * GET /api/investor/subcategories/:id
 * =====================================================================
 */
export async function getInvestorSubCategoryById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid subcategory ID",
      });
    }

    const subCategory =
      await prisma.investorSubCategory.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
          financialYears: true,
          documents: true,
        },
      });

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Investor subcategory not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * =====================================================================
 * CREATE SUBCATEGORY
 * POST /api/investor/admin/subcategories
 * =====================================================================
 */
export async function createInvestorSubCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      categoryId,
      name,
      sortOrder,
      isActive,
    } = req.body;

    /**
     * Validate categoryId
     */
    const parsedCategoryId = Number(categoryId);

    if (
      !Number.isInteger(parsedCategoryId) ||
      parsedCategoryId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid categoryId is required",
      });
    }

    /**
     * Validate name
     */
    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name is required",
      });
    }

    const subCategoryName = name.trim();

    /**
     * Check parent category
     */
    const category =
      await prisma.investorCategory.findUnique({
        where: {
          id: parsedCategoryId,
        },
      });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Investor category not found",
      });
    }

    /**
     * Validate sortOrder
     */
    let finalSortOrder = 0;

    if (sortOrder !== undefined) {
      const parsedSortOrder = Number(sortOrder);

      if (
        !Number.isInteger(parsedSortOrder) ||
        parsedSortOrder < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "sortOrder must be a non-negative integer",
        });
      }

      finalSortOrder = parsedSortOrder;
    }

    /**
     * Validate isActive
     */
    let finalIsActive = true;

    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isActive must be boolean",
        });
      }

      finalIsActive = isActive;
    }

    /**
     * Check duplicate inside same category
     *
     * @@unique([categoryId, name])
     */
    const existing =
      await prisma.investorSubCategory.findFirst({
        where: {
          categoryId: parsedCategoryId,
          name: subCategoryName,
        },
      });

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "Subcategory already exists in this category",
      });
    }

    /**
     * Create
     */
    const subCategory =
      await prisma.investorSubCategory.create({
        data: {
          categoryId: parsedCategoryId,
          name: subCategoryName,
          sortOrder: finalSortOrder,
          isActive: finalIsActive,
        },
        include: {
          category: true,
        },
      });

    return res.status(201).json({
      success: true,
      message:
        "Investor subcategory created successfully",
      data: subCategory,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * =====================================================================
 * UPDATE SUBCATEGORY
 * PUT /api/investor/admin/subcategories/:id
 * =====================================================================
 */
export async function updateInvestorSubCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid subcategory ID",
      });
    }

    const existing =
      await prisma.investorSubCategory.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Investor subcategory not found",
      });
    }

    const {
      categoryId,
      name,
      sortOrder,
      isActive,
    } = req.body;

    const updateData: {
      categoryId?: number;
      name?: string;
      sortOrder?: number;
      isActive?: boolean;
    } = {};

    /**
     * Category
     */
    if (categoryId !== undefined) {
      const parsedCategoryId = Number(categoryId);

      if (
        !Number.isInteger(parsedCategoryId) ||
        parsedCategoryId <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid categoryId",
        });
      }

      const category =
        await prisma.investorCategory.findUnique({
          where: {
            id: parsedCategoryId,
          },
        });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Investor category not found",
        });
      }

      updateData.categoryId = parsedCategoryId;
    }

    /**
     * Name
     */
    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Subcategory name cannot be empty",
        });
      }

      updateData.name = name.trim();
    }

    /**
     * Sort Order
     */
    if (sortOrder !== undefined) {
      const parsedSortOrder = Number(sortOrder);

      if (
        !Number.isInteger(parsedSortOrder) ||
        parsedSortOrder < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "sortOrder must be a non-negative integer",
        });
      }

      updateData.sortOrder = parsedSortOrder;
    }

    /**
     * Active status
     */
    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isActive must be boolean",
        });
      }

      updateData.isActive = isActive;
    }

    /**
     * Check duplicate category + name
     */
    const finalCategoryId =
      updateData.categoryId ?? existing.categoryId;

    const finalName =
      updateData.name ?? existing.name;

    const duplicate =
      await prisma.investorSubCategory.findFirst({
        where: {
          categoryId: finalCategoryId,
          name: finalName,
          NOT: {
            id,
          },
        },
      });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message:
          "Another subcategory with this name already exists in this category",
      });
    }

    /**
     * Update
     */
    const subCategory =
      await prisma.investorSubCategory.update({
        where: {
          id,
        },
        data: updateData,
        include: {
          category: true,
        },
      });

    return res.status(200).json({
      success: true,
      message:
        "Investor subcategory updated successfully",
      data: subCategory,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * =====================================================================
 * DELETE SUBCATEGORY
 * DELETE /api/investor/admin/subcategories/:id
 * =====================================================================
 */
export async function deleteInvestorSubCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid subcategory ID",
      });
    }

    const existing =
      await prisma.investorSubCategory.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Investor subcategory not found",
      });
    }

    await prisma.investorSubCategory.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Investor subcategory deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * =====================================================================
 * UPDATE SUBCATEGORY STATUS
 * PATCH /api/investor/admin/subcategories/:id/status
 * =====================================================================
 */
export async function updateInvestorSubCategoryStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const { isActive } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid subcategory ID",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be boolean",
      });
    }

    const existing =
      await prisma.investorSubCategory.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Investor subcategory not found",
      });
    }

    const subCategory =
      await prisma.investorSubCategory.update({
        where: {
          id,
        },
        data: {
          isActive,
        },
        include: {
          category: true,
        },
      });

    return res.status(200).json({
      success: true,
      message: isActive
        ? "Investor subcategory activated successfully"
        : "Investor subcategory deactivated successfully",
      data: subCategory,
    });
  } catch (error) {
    next(error);
  }
}