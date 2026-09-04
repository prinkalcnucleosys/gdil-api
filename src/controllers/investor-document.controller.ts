import { Request, Response } from "express";
import prisma from "../lib/prisma";

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

/**
 * Parse positive integer safely
 */
function parseId(value: unknown): number | null {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

/**
 * Parse optional date
 *
 * undefined = not supplied
 * null / "" = remove date
 * Date = valid date
 */
function parseDate(
  value: unknown,
): Date | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

/**
 * Convert boolean values safely
 */
function parseBoolean(
  value: unknown,
  defaultValue = true,
): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    if (value.toLowerCase() === "true") {
      return true;
    }

    if (value.toLowerCase() === "false") {
      return false;
    }
  }

  return defaultValue;
}

/*
|--------------------------------------------------------------------------
| VALIDATE DOCUMENT HIERARCHY
|--------------------------------------------------------------------------
|
| Supported:
|
| Category
| Category + Subcategory
| Category + Financial Year
| Category + Subcategory + Financial Year
| Category + Financial Year + Quarter
| Category + Subcategory + Financial Year + Quarter
|
|--------------------------------------------------------------------------
*/
/**
 * Parse custom dynamic table metadata
 *
 * Expected:
 * {
 *   "form_name": "Form ISR 1",
 *   "purpose": "Declaration under section 197A",
 *   "applicable_to": "Resident individuals"
 * }
 */
function parseMetadata(value: unknown): Record<string, unknown> | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return null;
  }

  return value as Record<string, unknown>;
}

async function validateDocumentHierarchy(
  categoryId: number,
  subCategoryId: number | null,
  financialYearId: number | null,
  quarterId: number | null,
) {
  /*
  |--------------------------------------------------------------------------
  | CATEGORY
  |--------------------------------------------------------------------------
  */

  const category =
    await prisma.investorCategory.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
        name: true,
        isActive: true,
      },
    });

  if (!category) {
    return {
      valid: false,
      message: "Category not found",
    };
  }

  /*
  |--------------------------------------------------------------------------
  | SUBCATEGORY
  |--------------------------------------------------------------------------
  */

  let subCategory: {
    id: number;
    name: string;
    categoryId: number;
    isActive: boolean;
  } | null = null;

  if (subCategoryId !== null) {
    subCategory =
      await prisma.investorSubCategory.findUnique({
        where: {
          id: subCategoryId,
        },
        select: {
          id: true,
          name: true,
          categoryId: true,
          isActive: true,
        },
      });

    if (!subCategory) {
      return {
        valid: false,
        message: "Subcategory not found",
      };
    }

    /*
     * Subcategory MUST belong to selected category
     */
    if (
      subCategory.categoryId !== categoryId
    ) {
      return {
        valid: false,
        message:
          "Selected subcategory does not belong to the selected category",
      };
    }
  }

  /*
  |--------------------------------------------------------------------------
  | FINANCIAL YEAR
  |--------------------------------------------------------------------------
  */

  let financialYear: {
    id: number;
    categoryId: number | null;
    subCategoryId: number | null;
    year: string;
    isActive: boolean;
  } | null = null;

  if (financialYearId !== null) {
    financialYear =
      await prisma.investorFinancialYear.findUnique({
        where: {
          id: financialYearId,
        },
        select: {
          id: true,
          categoryId: true,
          subCategoryId: true,
          year: true,
          isActive: true,
        },
      });

    if (!financialYear) {
      return {
        valid: false,
        message: "Financial year not found",
      };
    }

    /*
     * Financial year MUST belong to category
     */
    /*
  * Financial year hierarchy validation
  */
    if (subCategoryId !== null) {
      // Financial year must belong to selected subcategory
      if (
        financialYear.subCategoryId !== subCategoryId
      ) {
        return {
          valid: false,
          message:
            "Selected financial year does not belong to the selected subcategory",
        };
      }

      // Also make sure the subcategory belongs to selected category
      if (
        financialYear.categoryId !== null &&
        financialYear.categoryId !== categoryId
      ) {
        return {
          valid: false,
          message:
            "Selected financial year does not belong to the selected category",
        };
      }
    } else {
      // Without subcategory, financial year must be directly under category
      if (
        financialYear.categoryId !== categoryId ||
        financialYear.subCategoryId !== null
      ) {
        return {
          valid: false,
          message:
            "This financial year belongs to a subcategory. Please select the subcategory first.",
        };
      }
    }
  }
  /*
  |--------------------------------------------------------------------------
  | QUARTER
  |--------------------------------------------------------------------------
  */

  let quarter: {
    id: number;
    financialYearId: number;
    name: string;
    code: string;
    releaseDate: Date | null;
    isActive: boolean;
  } | null = null;

  if (quarterId !== null) {
    /*
     * Quarter cannot exist without financial year
     */
    if (financialYearId === null) {
      return {
        valid: false,
        message:
          "Financial year is required when selecting a quarter",
      };
    }

    quarter =
      await prisma.investorQuarter.findUnique({
        where: {
          id: quarterId,
        },
        select: {
          id: true,
          financialYearId: true,
          name: true,
          code: true,
          releaseDate: true,
          isActive: true,
        },
      });

    if (!quarter) {
      return {
        valid: false,
        message: "Quarter not found",
      };
    }

    /*
     * Quarter MUST belong to selected financial year
     */
    if (
      quarter.financialYearId !==
      financialYearId
    ) {
      return {
        valid: false,
        message:
          "Selected quarter does not belong to the selected financial year",
      };
    }
  }

  return {
    valid: true,
    category,
    subCategory,
    financialYear,
    quarter,
  };
}

/*
|--------------------------------------------------------------------------
| INCLUDE RELATIONS
|--------------------------------------------------------------------------
*/

const documentInclude = {
  category: {
    select: {
      id: true,
      name: true,
      sortOrder: true,
      isActive: true,
    },
  },

  subCategory: {
    select: {
      id: true,
      name: true,
      categoryId: true,
      sortOrder: true,
      isActive: true,
    },
  },

  financialYear: {
    select: {
      id: true,
      categoryId: true,
      subCategoryId: true,
      year: true,
      sortOrder: true,
      isActive: true,
    },
  },

  quarter: {
    select: {
      id: true,
      financialYearId: true,
      name: true,
      code: true,
      releaseDate: true,
      sortOrder: true,
      isActive: true,
    },
  },
};

/*
|--------------------------------------------------------------------------
| GET INVESTOR DOCUMENTS
|--------------------------------------------------------------------------
|
| GET /api/investor/documents
|
| Optional:
|
| ?categoryId=1
| ?subCategoryId=2
| ?financialYearId=3
| ?quarterId=4
|
|--------------------------------------------------------------------------
*/

export const getInvestorDocuments = async (
  req: Request,
  res: Response,
) => {
  try {
    const categoryId =
      parseId(req.query.categoryId);

    const subCategoryId =
      parseId(req.query.subCategoryId);

    const financialYearId =
      parseId(req.query.financialYearId);

    const quarterId =
      parseId(req.query.quarterId);

    /*
     * Build filters
     */
    const where: any = {
      isPublished: true,
    };

    if (categoryId !== null) {
      where.categoryId = categoryId;
    }

    if (subCategoryId !== null) {
      where.subCategoryId = subCategoryId;
    }

    if (financialYearId !== null) {
      where.financialYearId =
        financialYearId;
    }

    if (quarterId !== null) {
      where.quarterId = quarterId;
    }

    const documents =
      await prisma.investorDocument.findMany({
        where,

        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            documentDate: "desc",
          },
          {
            createdAt: "desc",
          },
        ],

        include: documentInclude,
      });

    return res.status(200).json({
      success: true,
      message:
        "Investor documents retrieved successfully",
      data: documents,
    });
  } catch (error) {
    console.error(
      "getInvestorDocuments error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve investor documents",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ANNUAL REPORTS
|--------------------------------------------------------------------------
|
| GET /api/investor/annual-reports
|
|--------------------------------------------------------------------------
*/

export const getAnnualReports = async (
  req: Request,
  res: Response,
) => {
  try {
    const documents =
      await prisma.investorDocument.findMany({
        where: {
          isPublished: true,

          category: {
            name: "Annual Reports",
          },
        },

        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            documentDate: "desc",
          },
          {
            createdAt: "desc",
          },
        ],

        include: documentInclude,
      });

    return res.status(200).json({
      success: true,
      message:
        "Annual reports retrieved successfully",
      data: documents,
    });
  } catch (error) {
    console.error(
      "getAnnualReports error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve annual reports",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE INVESTOR DOCUMENT
|--------------------------------------------------------------------------
|
| GET /api/investor/documents/:id
|
|--------------------------------------------------------------------------
*/

export const getInvestorDocumentById = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid document ID",
      });
    }

    const document =
      await prisma.investorDocument.findFirst({
        where: {
          id,
          isPublished: true,
        },

        include: documentInclude,
      });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Investor document not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Investor document retrieved successfully",
      data: document,
    });
  } catch (error) {
    console.error(
      "getInvestorDocumentById error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve investor document",
    });
  }
};

/*
|--------------------------------------------------------------------------
| CREATE INVESTOR DOCUMENT
|--------------------------------------------------------------------------
|
| POST /api/investor/admin/documents
|
|--------------------------------------------------------------------------
*/

export const createInvestorDocument = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      categoryId,
      subCategoryId,
      financialYearId,
      quarterId,

      title,
      description,
      documentType,
      purpose,

      documentDate,
      disclosureDate,
      dueDate,

      storageType,
      externalUrl,

      isPublished,
      sortOrder,

      metadata,
    } = req.body;

    /*
     |--------------------------------------------------------------------------
     | BASIC VALIDATION
     |--------------------------------------------------------------------------
     */

    const parsedCategoryId =
      parseId(categoryId);

    const parsedSubCategoryId =
      parseId(subCategoryId);

    const parsedFinancialYearId =
      parseId(financialYearId);

    const parsedQuarterId =
      parseId(quarterId);

    if (!parsedCategoryId) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Document title is required",
      });
    }

    if (
      typeof externalUrl !== "string" ||
      !externalUrl.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Document URL is required",
      });
    }
    const parsedMetadata = parseMetadata(metadata);

    if (
      metadata !== undefined &&
      metadata !== null &&
      metadata !== "" &&
      parsedMetadata === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Metadata must be a valid object",
      });
    }

    /*
     |--------------------------------------------------------------------------
     | DATE VALIDATION
     |--------------------------------------------------------------------------
     */

    const parsedDocumentDate =
      parseDate(documentDate);

    const parsedDisclosureDate =
      parseDate(disclosureDate);

    const parsedDueDate =
      parseDate(dueDate);

    if (
      documentDate !== undefined &&
      parsedDocumentDate === null &&
      documentDate !== null &&
      documentDate !== ""
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid document date",
      });
    }

    if (
      disclosureDate !== undefined &&
      parsedDisclosureDate === null &&
      disclosureDate !== null &&
      disclosureDate !== ""
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid disclosure date",
      });
    }

    if (
      dueDate !== undefined &&
      parsedDueDate === null &&
      dueDate !== null &&
      dueDate !== ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid due date",
      });
    }

    /*
     |--------------------------------------------------------------------------
     | VALIDATE HIERARCHY
     |--------------------------------------------------------------------------
     */

    const hierarchy =
      await validateDocumentHierarchy(
        parsedCategoryId,
        parsedSubCategoryId,
        parsedFinancialYearId,
        parsedQuarterId,
      );

    if (!hierarchy.valid) {
      return res.status(400).json({
        success: false,
        message: hierarchy.message,
      });
    }

    /*
     |--------------------------------------------------------------------------
     | CREATE
     |--------------------------------------------------------------------------
     */

    const document =
      await prisma.investorDocument.create({
        data: {
          categoryId: parsedCategoryId,

          subCategoryId:
            parsedSubCategoryId,

          financialYearId:
            parsedFinancialYearId,

          quarterId:
            parsedQuarterId,

          title: title.trim(),

          description:
            typeof description === "string" &&
              description.trim()
              ? description.trim()
              : null,

          documentType:
            typeof documentType === "string" &&
              documentType.trim()
              ? documentType.trim()
              : null,

          purpose:
            typeof purpose === "string" &&
              purpose.trim()
              ? purpose.trim()
              : null,

          documentDate:
            parsedDocumentDate,

          disclosureDate:
            parsedDisclosureDate,

          dueDate:
            parsedDueDate,

          storageType:
            typeof storageType === "string" &&
              storageType.trim()
              ? storageType.trim()
              : "google_drive",

          externalUrl:
            externalUrl.trim(),

          isPublished:
            parseBoolean(
              isPublished,
              true,
            ),

          sortOrder:
            Number.isInteger(
              Number(sortOrder),
            )
              ? Number(sortOrder)
              : 0,

          ...(parsedMetadata !== null
            ? {
              metadata: JSON.parse(
                JSON.stringify(parsedMetadata),
              ),
            }
            : {}),
        },

        include: documentInclude,
      });

    return res.status(201).json({
      success: true,
      message:
        "Investor document created successfully",
      data: document,
    });
  } catch (error) {
    console.error(
      "createInvestorDocument error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create investor document",
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE INVESTOR DOCUMENT
|--------------------------------------------------------------------------
|
| PUT /api/investor/admin/documents/:id
|
|--------------------------------------------------------------------------
*/

export const updateInvestorDocument = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid document ID",
      });
    }

    const existing =
      await prisma.investorDocument.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Investor document not found",
      });
    }

    const {
      categoryId,
      subCategoryId,
      financialYearId,
      quarterId,

      title,
      description,
      documentType,
      purpose,

      documentDate,
      disclosureDate,
      dueDate,

      storageType,
      externalUrl,

      isPublished,
      sortOrder,

      metadata,
    } = req.body;

    /*
     |--------------------------------------------------------------------------
     | KEEP EXISTING VALUES IF NOT SUPPLIED
     |--------------------------------------------------------------------------
     */

    const parsedCategoryId =
      categoryId !== undefined
        ? parseId(categoryId)
        : existing.categoryId;

    const parsedSubCategoryId =
      subCategoryId !== undefined
        ? parseId(subCategoryId)
        : existing.subCategoryId;

    const parsedFinancialYearId =
      financialYearId !== undefined
        ? parseId(financialYearId)
        : existing.financialYearId;

    const parsedQuarterId =
      quarterId !== undefined
        ? parseId(quarterId)
        : existing.quarterId;

    if (!parsedCategoryId) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }


    let parsedMetadata:
      | Record<string, unknown>
      | null
      | undefined;

    if (metadata !== undefined) {
      parsedMetadata = parseMetadata(metadata);

      if (
        metadata !== null &&
        metadata !== "" &&
        parsedMetadata === null
      ) {
        return res.status(400).json({
          success: false,
          message: "Metadata must be a valid object",
        });
      }
    }

    /*
     |--------------------------------------------------------------------------
     | TITLE
     |--------------------------------------------------------------------------
     */

    let finalTitle = existing.title;

    if (title !== undefined) {
      if (
        typeof title !== "string" ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Document title is required",
        });
      }

      finalTitle = title.trim();
    }

    /*
     |--------------------------------------------------------------------------
     | EXTERNAL URL
     |--------------------------------------------------------------------------
     */

    let finalExternalUrl =
      existing.externalUrl;

    if (externalUrl !== undefined) {
      if (
        typeof externalUrl !== "string" ||
        !externalUrl.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Document URL is required",
        });
      }

      finalExternalUrl =
        externalUrl.trim();
    }

    /*
     |--------------------------------------------------------------------------
     | DATES
     |--------------------------------------------------------------------------
     */

    const parsedDocumentDate =
      documentDate !== undefined
        ? parseDate(documentDate)
        : existing.documentDate;

    const parsedDisclosureDate =
      disclosureDate !== undefined
        ? parseDate(disclosureDate)
        : existing.disclosureDate;

    const parsedDueDate =
      dueDate !== undefined
        ? parseDate(dueDate)
        : existing.dueDate;

    if (
      documentDate !== undefined &&
      documentDate !== null &&
      documentDate !== "" &&
      parsedDocumentDate === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid document date",
      });
    }

    if (
      disclosureDate !== undefined &&
      disclosureDate !== null &&
      disclosureDate !== "" &&
      parsedDisclosureDate === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid disclosure date",
      });
    }

    if (
      dueDate !== undefined &&
      dueDate !== null &&
      dueDate !== "" &&
      parsedDueDate === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid due date",
      });
    }

    /*
     |--------------------------------------------------------------------------
     | VALIDATE HIERARCHY
     |--------------------------------------------------------------------------
     */

    const hierarchy =
      await validateDocumentHierarchy(
        parsedCategoryId,
        parsedSubCategoryId,
        parsedFinancialYearId,
        parsedQuarterId,
      );

    if (!hierarchy.valid) {
      return res.status(400).json({
        success: false,
        message: hierarchy.message,
      });
    }

    /*
     |--------------------------------------------------------------------------
     | UPDATE DATA
     |--------------------------------------------------------------------------
     */

    const updateData: any = {
      categoryId: parsedCategoryId,

      subCategoryId:
        parsedSubCategoryId,

      financialYearId:
        parsedFinancialYearId,

      quarterId:
        parsedQuarterId,

      title: finalTitle,

      externalUrl:
        finalExternalUrl,

      documentDate:
        parsedDocumentDate,

      disclosureDate:
        parsedDisclosureDate,

      dueDate:
        parsedDueDate,
    };

    if (description !== undefined) {
      updateData.description =
        typeof description === "string" &&
          description.trim()
          ? description.trim()
          : null;
    }

    if (documentType !== undefined) {
      updateData.documentType =
        typeof documentType === "string" &&
          documentType.trim()
          ? documentType.trim()
          : null;
    }

    if (purpose !== undefined) {
      updateData.purpose =
        typeof purpose === "string" &&
          purpose.trim()
          ? purpose.trim()
          : null;
    }

    if (storageType !== undefined) {
      updateData.storageType =
        typeof storageType === "string" &&
          storageType.trim()
          ? storageType.trim()
          : "google_drive";
    }

    if (isPublished !== undefined) {
      updateData.isPublished =
        parseBoolean(
          isPublished,
          existing.isPublished,
        );
    }


    if (sortOrder !== undefined) {
      const parsedSortOrder =
        Number(sortOrder);

      if (
        !Number.isInteger(
          parsedSortOrder,
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Sort order must be an integer",
        });
      }

      updateData.sortOrder =
        parsedSortOrder;
    }

    if (metadata !== undefined) {
      updateData.metadata = parsedMetadata;
    }

    /*
     |--------------------------------------------------------------------------
     | UPDATE
     |--------------------------------------------------------------------------
     */

    const document =
      await prisma.investorDocument.update({
        where: {
          id,
        },

        data: updateData,

        include: documentInclude,
      });

    return res.status(200).json({
      success: true,
      message:
        "Investor document updated successfully",
      data: document,
    });
  } catch (error) {
    console.error(
      "updateInvestorDocument error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update investor document",
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE INVESTOR DOCUMENT
|--------------------------------------------------------------------------
|
| DELETE /api/investor/admin/documents/:id
|
|--------------------------------------------------------------------------
*/

export const deleteInvestorDocument = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid document ID",
      });
    }

    const existing =
      await prisma.investorDocument.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Investor document not found",
      });
    }

    await prisma.investorDocument.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Investor document deleted successfully",
    });
  } catch (error) {
    console.error(
      "deleteInvestorDocument error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete investor document",
    });
  }
};