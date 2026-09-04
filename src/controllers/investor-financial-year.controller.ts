import type { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

/**
 * ============================================================
 * HELPER
 * ============================================================
 */

function parseId(value: unknown): number | null {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

/**
 * ============================================================
 * GET ALL FINANCIAL YEARS
 *
 * GET /api/investor-financial-years
 *
 * Optional:
 * ?categoryId=1
 * ?subCategoryId=2
 * ============================================================
 */
export async function getInvestorFinancialYears(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { categoryId, subCategoryId } = req.query;

    const where: {
      categoryId?: number;
      subCategoryId?: number;
    } = {};

    /**
     * Filter by category
     */
    if (categoryId !== undefined) {
      const parsedCategoryId = parseId(categoryId);

      if (!parsedCategoryId) {
        return res.status(400).json({
          success: false,
          message: "Invalid categoryId",
        });
      }

      where.categoryId = parsedCategoryId;
    }

    /**
     * Filter by subcategory
     */
    if (subCategoryId !== undefined) {
      const parsedSubCategoryId = parseId(subCategoryId);

      if (!parsedSubCategoryId) {
        return res.status(400).json({
          success: false,
          message: "Invalid subCategoryId",
        });
      }

      where.subCategoryId = parsedSubCategoryId;
    }

    const financialYears =
      await prisma.investorFinancialYear.findMany({
        where,
        include: {
          category: true,
          subCategory: true,
        },
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            year: "desc",
          },
        ],
      });

    return res.status(200).json({
      success: true,
      data: financialYears,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * ============================================================
 * GET FINANCIAL YEARS BY CATEGORY
 *
 * GET /api/investor-financial-years/category/:categoryId
 * ============================================================
 */
export async function getInvestorFinancialYearsByCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const categoryId = parseId(
      req.params.categoryId,
    );

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    /**
     * Check category exists
     */
    const category =
      await prisma.investorCategory.findUnique({
        where: {
          id: categoryId,
        },
      });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const financialYears =
      await prisma.investorFinancialYear.findMany({
        where: {
          categoryId,
        },
        include: {
          category: true,
          subCategory: true,
        },
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            year: "desc",
          },
        ],
      });

    return res.status(200).json({
      success: true,
      data: financialYears,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * ============================================================
 * GET FINANCIAL YEARS BY SUBCATEGORY
 *
 * GET /api/investor-financial-years/subcategory/:subCategoryId
 * ============================================================
 */
export async function getInvestorFinancialYearsBySubCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const subCategoryId = parseId(
      req.params.subCategoryId,
    );

    if (!subCategoryId) {
      return res.status(400).json({
        success: false,
        message: "Invalid subcategory ID",
      });
    }

    /**
     * Check subcategory exists
     */
    const subCategory =
      await prisma.investorSubCategory.findUnique({
        where: {
          id: subCategoryId,
        },
      });

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const financialYears =
      await prisma.investorFinancialYear.findMany({
        where: {
          subCategoryId,
        },
        include: {
          category: true,
          subCategory: true,
        },
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            year: "desc",
          },
        ],
      });

    return res.status(200).json({
      success: true,
      data: financialYears,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * ============================================================
 * GET SINGLE FINANCIAL YEAR
 *
 * GET /api/investor-financial-years/:id
 * ============================================================
 */
export async function getInvestorFinancialYearById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid financial year ID",
      });
    }

    const financialYear =
      await prisma.investorFinancialYear.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
          subCategory: true,
          quarters: true,
          documents: true,
        },
      });

    if (!financialYear) {
      return res.status(404).json({
        success: false,
        message: "Financial year not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: financialYear,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * ============================================================
 * CREATE FINANCIAL YEAR
 *
 * POST /api/investor-financial-years
 *
 * Directly under category:
 *
 * {
 *   "categoryId": 1,
 *   "subCategoryId": null,
 *   "year": "2025-26",
 *   "sortOrder": 0,
 *   "isActive": true
 * }
 *
 * Under category + subcategory:
 *
 * {
 *   "categoryId": 1,
 *   "subCategoryId": 2,
 *   "year": "2025-26",
 *   "sortOrder": 0,
 *   "isActive": true
 * }
 * ============================================================
 */
export async function createInvestorFinancialYear(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      categoryId,
      subCategoryId,
      year,
      sortOrder,
      isActive,
    } = req.body;

    /**
     * ========================================================
     * VALIDATE YEAR
     * ========================================================
     */

    if (
      year === undefined ||
      year === null ||
      String(year).trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Financial year is required",
      });
    }

    const cleanYear = String(year).trim();

    /**
     * ========================================================
     * CATEGORY
     * ========================================================
     */

    let parsedCategoryId: number | null = null;

    if (
      categoryId !== undefined &&
      categoryId !== null &&
      categoryId !== ""
    ) {
      parsedCategoryId = parseId(categoryId);

      if (!parsedCategoryId) {
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
          message: "Category not found",
        });
      }
    }

    /**
     * ========================================================
     * SUBCATEGORY
     * ========================================================
     */

    let parsedSubCategoryId: number | null = null;

    if (
      subCategoryId !== undefined &&
      subCategoryId !== null &&
      subCategoryId !== ""
    ) {
      parsedSubCategoryId =
        parseId(subCategoryId);

      if (!parsedSubCategoryId) {
        return res.status(400).json({
          success: false,
          message: "Invalid subCategoryId",
        });
      }

      const subCategory =
        await prisma.investorSubCategory.findUnique({
          where: {
            id: parsedSubCategoryId,
          },
        });

      if (!subCategory) {
        return res.status(404).json({
          success: false,
          message: "Subcategory not found",
        });
      }

      /**
       * Subcategory MUST belong to selected category
       */
      if (
        parsedCategoryId !== null &&
        subCategory.categoryId !==
          parsedCategoryId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Selected subcategory does not belong to the selected category",
        });
      }

      /**
       * If category was not supplied,
       * automatically use subcategory's category.
       */
      if (parsedCategoryId === null) {
        parsedCategoryId =
          subCategory.categoryId;
      }
    }

    /**
     * ========================================================
     * DUPLICATE CHECK
     * ========================================================
     */

    const existing =
      await prisma.investorFinancialYear.findFirst({
        where: {
          categoryId: parsedCategoryId,
          subCategoryId: parsedSubCategoryId,
          year: cleanYear,
        },
      });

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "This financial year already exists for the selected category/subcategory",
      });
    }

    /**
     * ========================================================
     * CREATE
     * ========================================================
     */

    const financialYear =
      await prisma.investorFinancialYear.create({
        data: {
          categoryId: parsedCategoryId,
          subCategoryId: parsedSubCategoryId,

          year: cleanYear,

          sortOrder:
            sortOrder !== undefined &&
            sortOrder !== null &&
            sortOrder !== ""
              ? Number(sortOrder) || 0
              : 0,

          isActive:
            typeof isActive === "boolean"
              ? isActive
              : true,
        },

        include: {
          category: true,
          subCategory: true,
        },
      });

    return res.status(201).json({
      success: true,
      message:
        "Financial year created successfully",
      data: financialYear,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * ============================================================
 * UPDATE FINANCIAL YEAR
 *
 * PUT /api/investor-financial-years/:id
 * ============================================================
 */
export async function updateInvestorFinancialYear(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid financial year ID",
      });
    }

    /**
     * Check existing
     */
    const existing =
      await prisma.investorFinancialYear.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Financial year not found",
      });
    }

    const {
      categoryId,
      subCategoryId,
      year,
      sortOrder,
      isActive,
    } = req.body;

    /**
     * ========================================================
     * FINAL CATEGORY ID
     * ========================================================
     */

    let finalCategoryId:
      | number
      | null =
      existing.categoryId;

    if (categoryId !== undefined) {
      if (
        categoryId === null ||
        categoryId === ""
      ) {
        finalCategoryId = null;
      } else {
        finalCategoryId =
          parseId(categoryId);

        if (!finalCategoryId) {
          return res.status(400).json({
            success: false,
            message: "Invalid categoryId",
          });
        }
      }
    }

    /**
     * ========================================================
     * VALIDATE FINAL CATEGORY
     * ========================================================
     */

    if (finalCategoryId !== null) {
      const category =
        await prisma.investorCategory.findUnique({
          where: {
            id: finalCategoryId,
          },
        });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    /**
     * ========================================================
     * FINAL SUBCATEGORY ID
     * ========================================================
     */

    let finalSubCategoryId:
      | number
      | null =
      existing.subCategoryId;

    if (subCategoryId !== undefined) {
      if (
        subCategoryId === null ||
        subCategoryId === ""
      ) {
        finalSubCategoryId = null;
      } else {
        finalSubCategoryId =
          parseId(subCategoryId);

        if (!finalSubCategoryId) {
          return res.status(400).json({
            success: false,
            message: "Invalid subCategoryId",
          });
        }
      }
    }

    /**
     * ========================================================
     * VALIDATE SUBCATEGORY
     * ========================================================
     */

    if (finalSubCategoryId !== null) {
      const subCategory =
        await prisma.investorSubCategory.findUnique({
          where: {
            id: finalSubCategoryId,
          },
        });

      if (!subCategory) {
        return res.status(404).json({
          success: false,
          message: "Subcategory not found",
        });
      }

      /**
       * If category is null, automatically use
       * subcategory's category.
       */
      if (finalCategoryId === null) {
        finalCategoryId =
          subCategory.categoryId;
      }

      /**
       * Make sure subcategory belongs
       * to selected category.
       */
      if (
        subCategory.categoryId !==
        finalCategoryId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Selected subcategory does not belong to the selected category",
        });
      }
    }

    /**
     * ========================================================
     * FINAL YEAR
     * ========================================================
     */

    const finalYear =
      year !== undefined
        ? String(year).trim()
        : existing.year;

    if (!finalYear) {
      return res.status(400).json({
        success: false,
        message: "Financial year is required",
      });
    }

    /**
     * ========================================================
     * DUPLICATE CHECK
     *
     * Ignore current record.
     * ========================================================
     */

    const duplicate =
      await prisma.investorFinancialYear.findFirst({
        where: {
          categoryId: finalCategoryId,
          subCategoryId: finalSubCategoryId,
          year: finalYear,

          NOT: {
            id,
          },
        },
      });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message:
          "This financial year already exists for the selected category/subcategory",
      });
    }

    /**
     * ========================================================
     * UPDATE
     * ========================================================
     */

    const financialYear =
      await prisma.investorFinancialYear.update({
        where: {
          id,
        },

        data: {
          categoryId: finalCategoryId,

          subCategoryId:
            finalSubCategoryId,

          year: finalYear,

          ...(sortOrder !== undefined && {
            sortOrder:
              Number(sortOrder) || 0,
          }),

          ...(isActive !== undefined && {
            isActive:
              Boolean(isActive),
          }),
        },

        include: {
          category: true,
          subCategory: true,
        },
      });

    return res.status(200).json({
      success: true,
      message:
        "Financial year updated successfully",
      data: financialYear,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * ============================================================
 * DELETE FINANCIAL YEAR
 *
 * DELETE /api/investor-financial-years/:id
 * ============================================================
 */
export async function deleteInvestorFinancialYear(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid financial year ID",
      });
    }

    const existing =
      await prisma.investorFinancialYear.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Financial year not found",
      });
    }

    await prisma.investorFinancialYear.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Financial year deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * ============================================================
 * UPDATE STATUS
 *
 * PATCH /api/investor-financial-years/:id/status
 *
 * Body:
 * {
 *   "isActive": true
 * }
 * ============================================================
 */
export async function updateInvestorFinancialYearStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid financial year ID",
      });
    }

    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message:
          "isActive must be boolean",
      });
    }

    const existing =
      await prisma.investorFinancialYear.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Financial year not found",
      });
    }

    const financialYear =
      await prisma.investorFinancialYear.update({
        where: {
          id,
        },

        data: {
          isActive,
        },

        include: {
          category: true,
          subCategory: true,
        },
      });

    return res.status(200).json({
      success: true,
      message: isActive
        ? "Financial year activated successfully"
        : "Financial year deactivated successfully",
      data: financialYear,
    });
  } catch (error) {
    next(error);
  }
}