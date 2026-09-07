import type { Request, Response } from "express";
import prisma from "../lib/prisma";

function parseOptionalId(
  value: unknown,
): number | null {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0
    ? parsed
    : null;
}

/**
 * GET /api/investor/table-formats/resolve
 *
 * Public API used by the Investor Relations website.
 *
 * Resolves the most specific Table Format assigned to:
 *
 * Category
 * Subcategory
 * Financial Year
 * Quarter
 */
export async function resolvePublicInvestorTableFormat(
  req: Request,
  res: Response,
) {
  try {
    const categoryId = parseOptionalId(
      req.query.categoryId,
    );

    const subCategoryId = parseOptionalId(
      req.query.subCategoryId,
    );

    const financialYearId = parseOptionalId(
      req.query.financialYearId,
    );

    const quarterId = parseOptionalId(
      req.query.quarterId,
    );

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "categoryId is required",
      });
    }

    /*
     * Get all active table-format assignments
     * together with their columns.
     */
    const assignments =
      await prisma.investorTableFormatAssignment.findMany(
        {
          where: {
            tableFormat: {
              isActive: true,
            },
          },

          include: {
            tableFormat: {
              include: {
                columns: {
                  where: {
                    isVisible: true,
                  },

                  orderBy: {
                    sortOrder: "asc",
                  },
                },
              },
            },
          },
        },
      );

    /*
     * Find assignments matching the selected
     * investor hierarchy.
     *
     * NULL means that level is not restricted.
     */
    const matches = assignments.filter(
      (assignment) => {
        if (
          assignment.categoryId !== null &&
          assignment.categoryId !== categoryId
        ) {
          return false;
        }

        if (
          assignment.subCategoryId !== null &&
          assignment.subCategoryId !== subCategoryId
        ) {
          return false;
        }

        if (
          assignment.financialYearId !== null &&
          assignment.financialYearId !== financialYearId
        ) {
          return false;
        }

        if (
          assignment.quarterId !== null &&
          assignment.quarterId !== quarterId
        ) {
          return false;
        }

        return true;
      },
    );

    /*
     * Specificity:
     *
     * Category       = 1
     * Financial Year = 2
     * Subcategory    = 4
     * Quarter        = 8
     *
     * Therefore:
     *
     * Quarter
     *    >
     * Subcategory + FY
     *    >
     * Category + FY
     *    >
     * Subcategory
     *    >
     * Category
     */
    const resolved = matches
      .map((assignment) => {
        const specificity =
          (assignment.categoryId !== null
            ? 1
            : 0) +
          (assignment.financialYearId !== null
            ? 2
            : 0) +
          (assignment.subCategoryId !== null
            ? 4
            : 0) +
          (assignment.quarterId !== null
            ? 8
            : 0);

        return {
          assignment,
          specificity,
        };
      })
      .sort(
        (a, b) =>
          b.specificity -
            a.specificity ||
          a.assignment.tableFormat.sortOrder -
            b.assignment.tableFormat.sortOrder ||
          a.assignment.tableFormat.id -
            b.assignment.tableFormat.id,
      )[0];

    /*
     * No format assigned.
     */
    if (!resolved) {
      return res.status(200).json({
        success: true,
        data: null,
      });
    }

    /*
     * Return the complete Table Format,
     * including its configured columns.
     */
    return res.status(200).json({
      success: true,
      data: resolved.assignment.tableFormat,
    });
  } catch (error) {
    console.error(
      "resolvePublicInvestorTableFormat error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to resolve investor table format",
    });
  }
}