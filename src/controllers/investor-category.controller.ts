import type { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

/**
 * =====================================================================
 * INVESTOR CATEGORY CONTROLLER
 * =====================================================================
 *
 * Prisma Model:
 *
 * model InvestorCategory {
 *   id        Int     @id @default(autoincrement())
 *   name      String  @unique
 *   sortOrder Int     @default(0)
 *   isActive  Boolean @default(true)
 *
 *   subCategories  InvestorSubCategory[]
 *   financialYears InvestorFinancialYear[]
 *   documents      InvestorDocument[]
 *
 *   createdAt DateTime @default(now())
 *   updatedAt DateTime @updatedAt
 * }
 *
 * =====================================================================
 */


/**
 * =====================================================================
 * GET ALL CATEGORIES
 * GET /api/investor/categories
 * GET /api/investor/admin/categories
 * =====================================================================
 */
export async function getInvestorCategories(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { includeInactive } = req.query;

    const where =
      includeInactive === "true"
        ? {}
        : {
            isActive: true,
          };

    const categories =
      await prisma.investorCategory.findMany({
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
          subCategories: {
            where:
              includeInactive === "true"
                ? {}
                : {
                    isActive: true,
                  },
            orderBy: [
              {
                sortOrder: "asc",
              },
              {
                name: "asc",
              },
            ],
          },
        },
      });

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}


/**
 * =====================================================================
 * GET CATEGORY BY ID
 * GET /api/investor/categories/:id
 * GET /api/investor/admin/categories/:id
 * =====================================================================
 */
export async function getInvestorCategoryById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category =
      await prisma.investorCategory.findUnique({
        where: {
          id,
        },
        include: {
          subCategories: {
            orderBy: [
              {
                sortOrder: "asc",
              },
              {
                name: "asc",
              },
            ],
          },
          financialYears: {
            orderBy: {
              year: "desc",
            },
          },
          documents: true,
        },
      });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Investor category not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
}


/**
 * =====================================================================
 * CREATE CATEGORY
 * POST /api/investor/admin/categories
 * =====================================================================
 */
export async function createInvestorCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      name,
      sortOrder,
      isActive,
    } = req.body;

    /**
     * ---------------------------------------------------------------
     * Validation
     * ---------------------------------------------------------------
     */

    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const categoryName = name.trim();

    /**
     * ---------------------------------------------------------------
     * Check duplicate category
     * ---------------------------------------------------------------
     */

    const existing =
      await prisma.investorCategory.findUnique({
        where: {
          name: categoryName,
        },
      });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Investor category already exists",
      });
    }

    /**
     * ---------------------------------------------------------------
     * Validate sortOrder
     * ---------------------------------------------------------------
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
     * ---------------------------------------------------------------
     * Validate isActive
     * ---------------------------------------------------------------
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
     * ---------------------------------------------------------------
     * Create category
     * ---------------------------------------------------------------
     */

    const category =
      await prisma.investorCategory.create({
        data: {
          name: categoryName,
          sortOrder: finalSortOrder,
          isActive: finalIsActive,
        },
        include: {
          subCategories: true,
        },
      });

    return res.status(201).json({
      success: true,
      message:
        "Investor category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
}


/**
 * =====================================================================
 * UPDATE CATEGORY
 * PUT /api/investor/admin/categories/:id
 * =====================================================================
 */
export async function updateInvestorCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);

    /**
     * ---------------------------------------------------------------
     * Validate ID
     * ---------------------------------------------------------------
     */

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    /**
     * ---------------------------------------------------------------
     * Check category
     * ---------------------------------------------------------------
     */

    const existing =
      await prisma.investorCategory.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Investor category not found",
      });
    }

    const {
      name,
      sortOrder,
      isActive,
    } = req.body;

    /**
     * ---------------------------------------------------------------
     * Build update data
     * ---------------------------------------------------------------
     */

    const updateData: {
      name?: string;
      sortOrder?: number;
      isActive?: boolean;
    } = {};

    /**
     * ---------------------------------------------------------------
     * Name
     * ---------------------------------------------------------------
     */

    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Category name cannot be empty",
        });
      }

      const categoryName = name.trim();

      /**
       * Check duplicate name
       */
      const duplicate =
        await prisma.investorCategory.findFirst({
          where: {
            name: categoryName,
            NOT: {
              id,
            },
          },
        });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "Another investor category with this name already exists",
        });
      }

      updateData.name = categoryName;
    }

    /**
     * ---------------------------------------------------------------
     * Sort Order
     * ---------------------------------------------------------------
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
     * ---------------------------------------------------------------
     * Active Status
     * ---------------------------------------------------------------
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
     * ---------------------------------------------------------------
     * Update
     * ---------------------------------------------------------------
     */

    const category =
      await prisma.investorCategory.update({
        where: {
          id,
        },
        data: updateData,
        include: {
          subCategories: {
            orderBy: [
              {
                sortOrder: "asc",
              },
              {
                name: "asc",
              },
            ],
          },
        },
      });

    return res.status(200).json({
      success: true,
      message:
        "Investor category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
}


/**
 * =====================================================================
 * DELETE CATEGORY
 * DELETE /api/investor/admin/categories/:id
 * =====================================================================
 *
 * Because your Prisma relation uses:
 *
 * onDelete: Cascade
 *
 * deleting a category will also delete its
 * related subcategories and related records
 * according to your Prisma relations.
 *
 * =====================================================================
 */
export async function deleteInvestorCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);

    /**
     * ---------------------------------------------------------------
     * Validate ID
     * ---------------------------------------------------------------
     */

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    /**
     * ---------------------------------------------------------------
     * Check category
     * ---------------------------------------------------------------
     */

    const existing =
      await prisma.investorCategory.findUnique({
        where: {
          id,
        },
        include: {
          subCategories: true,
          financialYears: true,
          documents: true,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Investor category not found",
      });
    }

    /**
     * ---------------------------------------------------------------
     * Delete
     * ---------------------------------------------------------------
     */

    await prisma.investorCategory.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Investor category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}


/**
 * =====================================================================
 * UPDATE CATEGORY STATUS
 * PATCH /api/investor/admin/categories/:id/status
 * =====================================================================
 */
export async function updateInvestorCategoryStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);

    const { isActive } = req.body;

    /**
     * ---------------------------------------------------------------
     * Validate ID
     * ---------------------------------------------------------------
     */

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    /**
     * ---------------------------------------------------------------
     * Validate status
     * ---------------------------------------------------------------
     */

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be boolean",
      });
    }

    /**
     * ---------------------------------------------------------------
     * Check category
     * ---------------------------------------------------------------
     */

    const existing =
      await prisma.investorCategory.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Investor category not found",
      });
    }

    /**
     * ---------------------------------------------------------------
     * Update status
     * ---------------------------------------------------------------
     */

    const category =
      await prisma.investorCategory.update({
        where: {
          id,
        },
        data: {
          isActive,
        },
      });

    return res.status(200).json({
      success: true,
      message: isActive
        ? "Investor category activated successfully"
        : "Investor category deactivated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
}