import type { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";
import prisma from "../lib/prisma";

/**
 * |--------------------------------------------------------------------------
 * | HELPERS
 * |--------------------------------------------------------------------------
 */

const VALID_FIELD_TYPES = [
  "TEXT",
  "DATE",
  "DATETIME",
  "NUMBER",
  "LINK",
  "DOCUMENT",
  "FINANCIAL_YEAR",
  "QUARTER",
] as const;

const VALID_FINANCIAL_YEAR_MODES = [
  "NONE",
  "COLUMN",
  "GROUP",
] as const;

const VALID_DISPLAY_MODES = [
  "TABLE",
] as const;

type InvestorTableFieldType =
  (typeof VALID_FIELD_TYPES)[number];

const isValidFieldType = (
  value: unknown
): value is InvestorTableFieldType => {
  return (
    typeof value === "string" &&
    VALID_FIELD_TYPES.includes(
      value as InvestorTableFieldType
    )
  );
};

const isValidFinancialYearMode = (
  value: unknown
): boolean => {
  return (
    typeof value === "string" &&
    VALID_FINANCIAL_YEAR_MODES.includes(
      value as (typeof VALID_FINANCIAL_YEAR_MODES)[number]
    )
  );
};

const isValidDisplayMode = (
  value: unknown
): boolean => {
  return (
    typeof value === "string" &&
    VALID_DISPLAY_MODES.includes(
      value as (typeof VALID_DISPLAY_MODES)[number]
    )
  );
};

const parseId = (value: unknown): number | null => {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
};

const parseBoolean = (
  value: unknown,
  defaultValue: boolean
): boolean => {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true" || value === "1" || value === 1) {
    return true;
  }

  if (value === "false" || value === "0" || value === 0) {
    return false;
  }

  return defaultValue;
};

const parseSortOrder = (
  value: unknown,
  defaultValue = 0
): number => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : defaultValue;
};

/**
 * |--------------------------------------------------------------------------
 * | GET ALL TABLE FORMATS
 * |--------------------------------------------------------------------------
 * | Public/admin reusable list
 * |--------------------------------------------------------------------------
 */

export const getInvestorTableFormats = async (
  req: Request,
  res: Response
) => {
  try {
    const includeInactive =
      req.query.includeInactive === "true";

    const formats =
      await prisma.investorTableFormat.findMany({
        where: includeInactive
          ? undefined
          : {
              isActive: true,
            },

        include: {
          columns: {
            orderBy: {
              sortOrder: "asc",
            },
          },

          assignments: {
            include: {
              category: true,
              subCategory: true,
              financialYear: true,
              quarter: true,
            },
          },
        },

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
      data: formats,
    });
  } catch (error) {
    console.error(
      "Error fetching investor table formats:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch investor table formats",
    });
  }
};

/**
 * |--------------------------------------------------------------------------
 * | GET SINGLE TABLE FORMAT
 * |--------------------------------------------------------------------------
 */

export const getInvestorTableFormatById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid table format ID",
      });
    }

    const format =
      await prisma.investorTableFormat.findUnique({
        where: {
          id,
        },

        include: {
          columns: {
            orderBy: {
              sortOrder: "asc",
            },
          },

          assignments: {
            include: {
              category: true,
              subCategory: true,
              financialYear: true,
              quarter: true,
            },
          },
        },
      });

    if (!format) {
      return res.status(404).json({
        success: false,
        message: "Investor table format not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: format,
    });
  } catch (error) {
    console.error(
      "Error fetching investor table format:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch investor table format",
    });
  }
};

/**
 * |--------------------------------------------------------------------------
 * | CREATE TABLE FORMAT
 * |--------------------------------------------------------------------------
 */

export const createInvestorTableFormat = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      description,
      financialYearMode,
      isActive,
      sortOrder,
      columns,
    } = req.body;

    /**
     * Validate name
     */
    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Table format name is required",
      });
    }

    /**
     * Validate financial year mode
     */
    const finalFinancialYearMode =
      financialYearMode ?? "NONE";

    if (
      !isValidFinancialYearMode(
        finalFinancialYearMode
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid financial year mode. Allowed values: NONE, COLUMN, GROUP",
      });
    }

    /**
     * Validate columns
     */
    if (
      columns !== undefined &&
      !Array.isArray(columns)
    ) {
      return res.status(400).json({
        success: false,
        message: "Columns must be an array",
      });
    }

    if (Array.isArray(columns)) {
      for (const column of columns) {
        if (
          !column ||
          typeof column !== "object"
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid column data",
          });
        }

        if (
          typeof column.label !== "string" ||
          !column.label.trim()
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Every column must have a label",
          });
        }

        if (
          typeof column.key !== "string" ||
          !column.key.trim()
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Every column must have a key",
          });
        }

        const fieldType =
          column.fieldType ?? "TEXT";

        if (!isValidFieldType(fieldType)) {
          return res.status(400).json({
            success: false,
            message:
              `Invalid field type for column "${column.label}"`,
          });
        }
      }
    }

    /**
     * Check duplicate column keys
     */
    if (Array.isArray(columns)) {
      const keys = columns.map(
        (column) =>
          String(column.key).trim()
      );

      const uniqueKeys = new Set(keys);

      if (uniqueKeys.size !== keys.length) {
        return res.status(400).json({
          success: false,
          message:
            "Column keys must be unique within a table format",
        });
      }
    }

    const format =
      await prisma.investorTableFormat.create({
        data: {
          name: name.trim(),

          description:
            typeof description === "string"
              ? description.trim() || null
              : null,

          financialYearMode:
            finalFinancialYearMode,

          isActive: parseBoolean(
            isActive,
            true
          ),

          sortOrder: parseSortOrder(
            sortOrder
          ),

          columns: {
            create: Array.isArray(columns)
              ? columns.map(
                  (
                    column: any,
                    index: number
                  ) => ({
                    key: String(
                      column.key
                    ).trim(),

                    label: String(
                      column.label
                    ).trim(),

                    fieldType:
                      column.fieldType ??
                      "TEXT",

                    sortOrder:
                      column.sortOrder !==
                      undefined
                        ? parseSortOrder(
                            column.sortOrder,
                            index
                          )
                        : index,

                    isVisible:
                      parseBoolean(
                        column.isVisible,
                        true
                      ),
                  })
                )
              : [],
          },
        },

        include: {
          columns: {
            orderBy: {
              sortOrder: "asc",
            },
          },
        },
      });

    return res.status(201).json({
      success: true,
      message:
        "Investor table format created successfully",
      data: format,
    });
  } catch (error) {
    console.error(
      "Error creating investor table format:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create investor table format",
    });
  }
};

/**
 * |--------------------------------------------------------------------------
 * | UPDATE TABLE FORMAT
 * |--------------------------------------------------------------------------
 */

export const updateInvestorTableFormat = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid table format ID",
      });
    }

    const existing =
      await prisma.investorTableFormat.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message:
          "Investor table format not found",
      });
    }

    const {
      name,
      description,
      financialYearMode,
      isActive,
      sortOrder,
      columns,
    } = req.body;

    if (
      name !== undefined &&
      (
        typeof name !== "string" ||
        !name.trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Table format name cannot be empty",
      });
    }

    if (
      financialYearMode !== undefined &&
      !isValidFinancialYearMode(
        financialYearMode
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid financial year mode. Allowed values: NONE, COLUMN, GROUP",
      });
    }

    if (
      columns !== undefined &&
      !Array.isArray(columns)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Columns must be an array",
      });
    }

    /**
     * Validate columns when supplied
     */
    if (Array.isArray(columns)) {
      for (const column of columns) {
        if (
          !column ||
          typeof column !== "object"
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid column data",
          });
        }

        if (
          typeof column.key !== "string" ||
          !column.key.trim()
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Every column must have a key",
          });
        }

        if (
          typeof column.label !== "string" ||
          !column.label.trim()
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Every column must have a label",
          });
        }

        if (
          column.fieldType !== undefined &&
          !isValidFieldType(
            column.fieldType
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              `Invalid field type for column "${column.label}"`,
          });
        }
      }

      /**
       * Check duplicate keys
       */
      const keys = columns.map(
        (column) =>
          String(column.key).trim()
      );

      if (
        new Set(keys).size !== keys.length
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Column keys must be unique within a table format",
        });
      }
    }

    /**
     * Transaction:
     *
     * 1. Update format
     * 2. If columns supplied:
     *      delete old columns
     *      create new columns
     */
    const updated =
      await prisma.$transaction(
        async (tx) => {
          await tx.investorTableFormat.update({
            where: {
              id,
            },

            data: {
              ...(name !== undefined && {
                name: name.trim(),
              }),

              ...(description !== undefined && {
                description:
                  typeof description ===
                  "string"
                    ? description.trim() ||
                      null
                    : null,
              }),

              ...(financialYearMode !==
                undefined && {
                financialYearMode,
              }),

              ...(isActive !== undefined && {
                isActive: parseBoolean(
                  isActive,
                  existing.isActive
                ),
              }),

              ...(sortOrder !== undefined && {
                sortOrder:
                  parseSortOrder(
                    sortOrder,
                    existing.sortOrder
                  ),
              }),
            },
          });

          if (Array.isArray(columns)) {
            await tx.investorTableColumn.deleteMany(
              {
                where: {
                  tableFormatId: id,
                },
              }
            );

            if (columns.length > 0) {
              await tx.investorTableColumn.createMany(
                {
                  data: columns.map(
                    (
                      column: any,
                      index: number
                    ) => ({
                      tableFormatId: id,

                      key: String(
                        column.key
                      ).trim(),

                      label: String(
                        column.label
                      ).trim(),

                      fieldType:
                        column.fieldType ??
                        "TEXT",

                      sortOrder:
                        column.sortOrder !==
                        undefined
                          ? parseSortOrder(
                              column.sortOrder,
                              index
                            )
                          : index,

                      isVisible:
                        parseBoolean(
                          column.isVisible,
                          true
                        ),
                    })
                  ),
                }
              );
            }
          }

          return tx.investorTableFormat.findUnique(
            {
              where: {
                id,
              },

              include: {
                columns: {
                  orderBy: {
                    sortOrder: "asc",
                  },
                },

                assignments: true,
              },
            }
          );
        }
      );

    return res.status(200).json({
      success: true,
      message:
        "Investor table format updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(
      "Error updating investor table format:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update investor table format",
    });
  }
};

/**
 * |--------------------------------------------------------------------------
 * | DELETE TABLE FORMAT
 * |--------------------------------------------------------------------------
 */

export const deleteInvestorTableFormat = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid table format ID",
      });
    }

    const existing =
      await prisma.investorTableFormat.findUnique({
        where: {
          id,
        },

        include: {
          assignments: true,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message:
          "Investor table format not found",
      });
    }

    await prisma.investorTableFormat.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Investor table format deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error deleting investor table format:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete investor table format",
    });
  }
};

/**
 * |--------------------------------------------------------------------------
 * | UPDATE TABLE FORMAT STATUS
 * |--------------------------------------------------------------------------
 */

export const updateInvestorTableFormatStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid table format ID",
      });
    }

    const {
      isActive,
    } = req.body;

    if (
      typeof isActive !== "boolean" &&
      isActive !== "true" &&
      isActive !== "false" &&
      isActive !== 1 &&
      isActive !== 0 &&
      isActive !== "1" &&
      isActive !== "0"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "isActive must be a boolean value",
      });
    }

    const format =
      await prisma.investorTableFormat.update({
        where: {
          id,
        },

        data: {
          isActive: parseBoolean(
            isActive,
            true
          ),
        },
      });

    return res.status(200).json({
      success: true,
      message:
        "Investor table format status updated successfully",
      data: format,
    });
  } catch (error) {
    console.error(
      "Error updating investor table format status:",
      error
    );

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Investor table format not found",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update investor table format status",
    });
  }
};

/**
 * |--------------------------------------------------------------------------
 * | GET TABLE COLUMNS
 * |--------------------------------------------------------------------------
 */

export const getInvestorTableColumns = async (
  req: Request,
  res: Response
) => {
  try {
    const tableFormatId = parseId(
      req.params.tableFormatId
    );

    if (!tableFormatId) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid table format ID",
      });
    }

    const format =
      await prisma.investorTableFormat.findUnique({
        where: {
          id: tableFormatId,
        },
      });

    if (!format) {
      return res.status(404).json({
        success: false,
        message:
          "Investor table format not found",
      });
    }

    const columns =
      await prisma.investorTableColumn.findMany({
        where: {
          tableFormatId,
        },

        orderBy: {
          sortOrder: "asc",
        },
      });

    return res.status(200).json({
      success: true,
      data: columns,
    });
  } catch (error) {
    console.error(
      "Error fetching investor table columns:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch investor table columns",
    });
  }
};

/**
 * |--------------------------------------------------------------------------
 * | CREATE TABLE COLUMN
 * |--------------------------------------------------------------------------
 */

export const createInvestorTableColumn = async (
  req: Request,
  res: Response
) => {
  try {
    const tableFormatId = parseId(
      req.params.tableFormatId
    );

    if (!tableFormatId) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid table format ID",
      });
    }

    const format =
      await prisma.investorTableFormat.findUnique({
        where: {
          id: tableFormatId,
        },
      });

    if (!format) {
      return res.status(404).json({
        success: false,
        message:
          "Investor table format not found",
      });
    }

    const {
      key,
      label,
      fieldType = "TEXT",
      sortOrder,
      isVisible,
    } = req.body;

    if (
      typeof key !== "string" ||
      !key.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Column key is required",
      });
    }

    if (
      typeof label !== "string" ||
      !label.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Column label is required",
      });
    }

    if (!isValidFieldType(fieldType)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid column field type",
      });
    }

    const column =
      await prisma.investorTableColumn.create({
        data: {
          tableFormatId,

          key: key.trim(),

          label: label.trim(),

          fieldType,

          sortOrder:
            sortOrder !== undefined
              ? parseSortOrder(
                  sortOrder
                )
              : 0,

          isVisible:
            parseBoolean(
              isVisible,
              true
            ),
        },
      });

    return res.status(201).json({
      success: true,
      message:
        "Investor table column created successfully",
      data: column,
    });
  } catch (error) {
    console.error(
      "Error creating investor table column:",
      error
    );

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message:
          "A column with this key already exists in this table format",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to create investor table column",
    });
  }
};

/**
 * |--------------------------------------------------------------------------
 * | UPDATE TABLE COLUMN
 * |--------------------------------------------------------------------------
 */

export const updateInvestorTableColumn = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid column ID",
      });
    }

    const existing =
      await prisma.investorTableColumn.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message:
          "Investor table column not found",
      });
    }

    const {
      key,
      label,
      fieldType,
      sortOrder,
      isVisible,
    } = req.body;

    if (
      key !== undefined &&
      (
        typeof key !== "string" ||
        !key.trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Column key cannot be empty",
      });
    }

    if (
      label !== undefined &&
      (
        typeof label !== "string" ||
        !label.trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Column label cannot be empty",
      });
    }

    if (
      fieldType !== undefined &&
      !isValidFieldType(fieldType)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid column field type",
      });
    }

    const column =
      await prisma.investorTableColumn.update({
        where: {
          id,
        },

        data: {
          ...(key !== undefined && {
            key: key.trim(),
          }),

          ...(label !== undefined && {
            label: label.trim(),
          }),

          ...(fieldType !== undefined && {
            fieldType,
          }),

          ...(sortOrder !== undefined && {
            sortOrder:
              parseSortOrder(
                sortOrder,
                existing.sortOrder
              ),
          }),

          ...(isVisible !== undefined && {
            isVisible:
              parseBoolean(
                isVisible,
                existing.isVisible
              ),
          }),
        },
      });

    return res.status(200).json({
      success: true,
      message:
        "Investor table column updated successfully",
      data: column,
    });
  } catch (error) {
    console.error(
      "Error updating investor table column:",
      error
    );

    if (
      error instanceof Prisma.PrismaClientKnownRequestError
    ) {
      if (error.code === "P2002") {
        return res.status(409).json({
          success: false,
          message:
            "A column with this key already exists in this table format",
        });
      }

      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          message:
            "Investor table column not found",
        });
      }
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update investor table column",
    });
  }
};

/**
 * |--------------------------------------------------------------------------
 * | DELETE TABLE COLUMN
 * |--------------------------------------------------------------------------
 */

export const deleteInvestorTableColumn = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid column ID",
      });
    }

    const existing =
      await prisma.investorTableColumn.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message:
          "Investor table column not found",
      });
    }

    await prisma.investorTableColumn.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Investor table column deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error deleting investor table column:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete investor table column",
    });
  }
};

/**
 * |--------------------------------------------------------------------------
 * | GET TABLE FORMAT ASSIGNMENTS
 * |--------------------------------------------------------------------------
 */

export const getInvestorTableFormatAssignments =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const formatId = req.query.tableFormatId
        ? parseId(req.query.tableFormatId)
        : null;

      const categoryId = req.query.categoryId
        ? parseId(req.query.categoryId)
        : null;

      const subCategoryId =
        req.query.subCategoryId
          ? parseId(
              req.query.subCategoryId
            )
          : null;

      const financialYearId =
        req.query.financialYearId
          ? parseId(
              req.query.financialYearId
            )
          : null;

      const quarterId =
        req.query.quarterId
          ? parseId(
              req.query.quarterId
            )
          : null;

      const where: Prisma.InvestorTableFormatAssignmentWhereInput =
        {};

      if (req.query.tableFormatId && !formatId) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid tableFormatId",
        });
      }

      if (req.query.categoryId && !categoryId) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid categoryId",
        });
      }

      if (
        req.query.subCategoryId &&
        !subCategoryId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid subCategoryId",
        });
      }

      if (
        req.query.financialYearId &&
        !financialYearId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid financialYearId",
        });
      }

      if (
        req.query.quarterId &&
        !quarterId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid quarterId",
        });
      }

      if (formatId) {
        where.tableFormatId =
          formatId;
      }

      if (categoryId) {
        where.categoryId =
          categoryId;
      }

      if (subCategoryId) {
        where.subCategoryId =
          subCategoryId;
      }

      if (financialYearId) {
        where.financialYearId =
          financialYearId;
      }

      if (quarterId) {
        where.quarterId =
          quarterId;
      }

      const assignments =
        await prisma.investorTableFormatAssignment.findMany(
          {
            where,

            include: {
              tableFormat: {
                include: {
                  columns: {
                    orderBy: {
                      sortOrder: "asc",
                    },
                  },
                },
              },

              category: true,
              subCategory: true,
              financialYear: true,
              quarter: true,
            },

            orderBy: {
              createdAt: "desc",
            },
          }
        );

      return res.status(200).json({
        success: true,
        data: assignments,
      });
    } catch (error) {
      console.error(
        "Error fetching table format assignments:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch table format assignments",
      });
    }
  };

/**
 * |--------------------------------------------------------------------------
 * | CREATE TABLE FORMAT ASSIGNMENT
 * |--------------------------------------------------------------------------
 */

export const createInvestorTableFormatAssignment =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        tableFormatId,
        categoryId,
        subCategoryId,
        financialYearId,
        quarterId,
        displayMode = "TABLE",
      } = req.body;

      const parsedTableFormatId =
        parseId(tableFormatId);

      if (!parsedTableFormatId) {
        return res.status(400).json({
          success: false,
          message:
            "tableFormatId is required and must be valid",
        });
      }

      /**
       * At least one hierarchy scope is required.
       */
      const parsedCategoryId =
        categoryId !== undefined &&
        categoryId !== null &&
        categoryId !== ""
          ? parseId(categoryId)
          : null;

      const parsedSubCategoryId =
        subCategoryId !== undefined &&
        subCategoryId !== null &&
        subCategoryId !== ""
          ? parseId(subCategoryId)
          : null;

      const parsedFinancialYearId =
        financialYearId !== undefined &&
        financialYearId !== null &&
        financialYearId !== ""
          ? parseId(financialYearId)
          : null;

      const parsedQuarterId =
        quarterId !== undefined &&
        quarterId !== null &&
        quarterId !== ""
          ? parseId(quarterId)
          : null;

      if (
        categoryId !== undefined &&
        categoryId !== null &&
        categoryId !== "" &&
        !parsedCategoryId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid categoryId",
        });
      }

      if (
        subCategoryId !== undefined &&
        subCategoryId !== null &&
        subCategoryId !== "" &&
        !parsedSubCategoryId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid subCategoryId",
        });
      }

      if (
        financialYearId !== undefined &&
        financialYearId !== null &&
        financialYearId !== "" &&
        !parsedFinancialYearId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid financialYearId",
        });
      }

      if (
        quarterId !== undefined &&
        quarterId !== null &&
        quarterId !== "" &&
        !parsedQuarterId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid quarterId",
        });
      }

      if (!isValidDisplayMode(displayMode)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid display mode",
        });
      }

      /**
       * Validate table format exists
       */
      const format =
        await prisma.investorTableFormat.findUnique(
          {
            where: {
              id: parsedTableFormatId,
            },
          }
        );

      if (!format) {
        return res.status(404).json({
          success: false,
          message:
            "Investor table format not found",
        });
      }

      /**
       * Validate hierarchy references
       */
      if (parsedCategoryId) {
        const category =
          await prisma.investorCategory.findUnique(
            {
              where: {
                id: parsedCategoryId,
              },
            }
          );

        if (!category) {
          return res.status(404).json({
            success: false,
            message:
              "Investor category not found",
          });
        }
      }

      if (parsedSubCategoryId) {
        const subCategory =
          await prisma.investorSubCategory.findUnique(
            {
              where: {
                id: parsedSubCategoryId,
              },
            }
          );

        if (!subCategory) {
          return res.status(404).json({
            success: false,
            message:
              "Investor sub category not found",
          });
        }

        /**
         * If category is also supplied,
         * ensure subcategory belongs to it.
         */
        if (parsedCategoryId) {
          if (
            subCategory.categoryId !==
            parsedCategoryId
          ) {
            return res.status(400).json({
              success: false,
              message:
                "Sub category does not belong to the selected category",
            });
          }
        }
      }

      if (parsedFinancialYearId) {
        const financialYear =
          await prisma.investorFinancialYear.findUnique(
            {
              where: {
                id: parsedFinancialYearId,
              },
            }
          );

        if (!financialYear) {
          return res.status(404).json({
            success: false,
            message:
              "Investor financial year not found",
          });
        }

        if (
          parsedSubCategoryId &&
          financialYear.subCategoryId !==
            parsedSubCategoryId
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Financial year does not belong to the selected sub category",
          });
        }

        if (
          !parsedSubCategoryId &&
          parsedCategoryId &&
          financialYear.categoryId !==
            parsedCategoryId
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Financial year does not belong to the selected category",
          });
        }
      }

      if (parsedQuarterId) {
        const quarter =
          await prisma.investorQuarter.findUnique(
            {
              where: {
                id: parsedQuarterId,
              },
            }
          );

        if (!quarter) {
          return res.status(404).json({
            success: false,
            message:
              "Investor quarter not found",
          });
        }

        if (
          !parsedFinancialYearId
        ) {
          return res.status(400).json({
            success: false,
            message:
              "quarterId requires financialYearId",
          });
        }

        if (
          quarter.financialYearId !==
          parsedFinancialYearId
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Quarter does not belong to the selected financial year",
          });
        }
      }

      /**
       * Prevent duplicate assignment
       *
       * Prisma nullable composite unique
       * constraints are not suitable here,
       * so we explicitly search for the same
       * exact hierarchy scope.
       */
      const duplicate =
        await prisma.investorTableFormatAssignment.findFirst(
          {
            where: {
              tableFormatId:
                parsedTableFormatId,

              categoryId:
                parsedCategoryId,

              subCategoryId:
                parsedSubCategoryId,

              financialYearId:
                parsedFinancialYearId,

              quarterId:
                parsedQuarterId,
            },
          }
        );

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "A table format is already assigned to this hierarchy",
        });
      }

      const assignment =
        await prisma.investorTableFormatAssignment.create(
          {
            data: {
              tableFormatId:
                parsedTableFormatId,

              categoryId:
                parsedCategoryId,

              subCategoryId:
                parsedSubCategoryId,

              financialYearId:
                parsedFinancialYearId,

              quarterId:
                parsedQuarterId,

              displayMode,
            },

            include: {
              tableFormat: {
                include: {
                  columns: {
                    orderBy: {
                      sortOrder: "asc",
                    },
                  },
                },
              },

              category: true,
              subCategory: true,
              financialYear: true,
              quarter: true,
            },
          }
        );

      return res.status(201).json({
        success: true,
        message:
          "Investor table format assigned successfully",
        data: assignment,
      });
    } catch (error) {
      console.error(
        "Error creating table format assignment:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to create table format assignment",
      });
    }
  };

/**
 * |--------------------------------------------------------------------------
 * | UPDATE TABLE FORMAT ASSIGNMENT
 * |--------------------------------------------------------------------------
 */

export const updateInvestorTableFormatAssignment =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = parseId(req.params.id);

      if (!id) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid assignment ID",
        });
      }

      const existing =
        await prisma.investorTableFormatAssignment.findUnique(
          {
            where: {
              id,
            },
          }
        );

      if (!existing) {
        return res.status(404).json({
          success: false,
          message:
            "Investor table format assignment not found",
        });
      }

      const {
        tableFormatId,
        categoryId,
        subCategoryId,
        financialYearId,
        quarterId,
        displayMode,
      } = req.body;

      const data: Prisma.InvestorTableFormatAssignmentUpdateInput =
        {};

      if (tableFormatId !== undefined) {
        const parsed =
          parseId(tableFormatId);

        if (!parsed) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid tableFormatId",
          });
        }

        const format =
          await prisma.investorTableFormat.findUnique(
            {
              where: {
                id: parsed,
              },
            }
          );

        if (!format) {
          return res.status(404).json({
            success: false,
            message:
              "Investor table format not found",
          });
        }

        data.tableFormat = {
          connect: {
            id: parsed,
          },
        };
      }

      if (displayMode !== undefined) {
        if (
          !isValidDisplayMode(
            displayMode
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid display mode",
          });
        }

        data.displayMode =
          displayMode;
      }

      /**
       * For hierarchy fields, use the
       * existing value when omitted.
       */
      const finalCategoryId =
        categoryId !== undefined
          ? categoryId === null ||
            categoryId === ""
            ? null
            : parseId(categoryId)
          : existing.categoryId;

      const finalSubCategoryId =
        subCategoryId !== undefined
          ? subCategoryId === null ||
            subCategoryId === ""
            ? null
            : parseId(subCategoryId)
          : existing.subCategoryId;

      const finalFinancialYearId =
        financialYearId !== undefined
          ? financialYearId === null ||
            financialYearId === ""
            ? null
            : parseId(financialYearId)
          : existing.financialYearId;

      const finalQuarterId =
        quarterId !== undefined
          ? quarterId === null ||
            quarterId === ""
            ? null
            : parseId(quarterId)
          : existing.quarterId;

      if (
        categoryId !== undefined &&
        finalCategoryId === null &&
        categoryId !== null &&
        categoryId !== ""
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid categoryId",
        });
      }

      if (
        subCategoryId !== undefined &&
        finalSubCategoryId === null &&
        subCategoryId !== null &&
        subCategoryId !== ""
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid subCategoryId",
        });
      }

      if (
        financialYearId !== undefined &&
        finalFinancialYearId === null &&
        financialYearId !== null &&
        financialYearId !== ""
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid financialYearId",
        });
      }

      if (
        quarterId !== undefined &&
        finalQuarterId === null &&
        quarterId !== null &&
        quarterId !== ""
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid quarterId",
        });
      }

      /**
       * Validate hierarchy
       */
      if (finalCategoryId) {
        const category =
          await prisma.investorCategory.findUnique(
            {
              where: {
                id: finalCategoryId,
              },
            }
          );

        if (!category) {
          return res.status(404).json({
            success: false,
            message:
              "Investor category not found",
          });
        }
      }

      if (finalSubCategoryId) {
        const subCategory =
          await prisma.investorSubCategory.findUnique(
            {
              where: {
                id: finalSubCategoryId,
              },
            }
          );

        if (!subCategory) {
          return res.status(404).json({
            success: false,
            message:
              "Investor sub category not found",
          });
        }

        if (
          finalCategoryId &&
          subCategory.categoryId !==
            finalCategoryId
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Sub category does not belong to the selected category",
          });
        }
      }

      if (finalFinancialYearId) {
        const financialYear =
          await prisma.investorFinancialYear.findUnique(
            {
              where: {
                id: finalFinancialYearId,
              },
            }
          );

        if (!financialYear) {
          return res.status(404).json({
            success: false,
            message:
              "Investor financial year not found",
          });
        }

        if (
          finalSubCategoryId &&
          financialYear.subCategoryId !==
            finalSubCategoryId
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Financial year does not belong to the selected sub category",
          });
        }

        if (
          !finalSubCategoryId &&
          finalCategoryId &&
          financialYear.categoryId !==
            finalCategoryId
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Financial year does not belong to the selected category",
          });
        }
      }

      if (finalQuarterId) {
        const quarter =
          await prisma.investorQuarter.findUnique(
            {
              where: {
                id: finalQuarterId,
              },
            }
          );

        if (!quarter) {
          return res.status(404).json({
            success: false,
            message:
              "Investor quarter not found",
          });
        }

        if (!finalFinancialYearId) {
          return res.status(400).json({
            success: false,
            message:
              "quarterId requires financialYearId",
          });
        }

        if (
          quarter.financialYearId !==
          finalFinancialYearId
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Quarter does not belong to the selected financial year",
          });
        }
      }

      /**
       * Duplicate assignment check
       */
      const finalTableFormatId =
        tableFormatId !== undefined
          ? parseId(tableFormatId)
          : existing.tableFormatId;

      if (!finalTableFormatId) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid table format ID",
        });
      }

      const duplicate =
        await prisma.investorTableFormatAssignment.findFirst(
          {
            where: {
              id: {
                not: id,
              },

              tableFormatId:
                finalTableFormatId,

              categoryId:
                finalCategoryId,

              subCategoryId:
                finalSubCategoryId,

              financialYearId:
                finalFinancialYearId,

              quarterId:
                finalQuarterId,
            },
          }
        );

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "A table format is already assigned to this hierarchy",
        });
      }

      /**
       * Set nullable hierarchy relations.
       */
      if (categoryId !== undefined) {
        data.category =
          finalCategoryId
            ? {
                connect: {
                  id: finalCategoryId,
                },
              }
            : {
                disconnect: true,
              };
      }

      if (subCategoryId !== undefined) {
        data.subCategory =
          finalSubCategoryId
            ? {
                connect: {
                  id: finalSubCategoryId,
                },
              }
            : {
                disconnect: true,
              };
      }

      if (financialYearId !== undefined) {
        data.financialYear =
          finalFinancialYearId
            ? {
                connect: {
                  id: finalFinancialYearId,
                },
              }
            : {
                disconnect: true,
              };
      }

      if (quarterId !== undefined) {
        data.quarter =
          finalQuarterId
            ? {
                connect: {
                  id: finalQuarterId,
                },
              }
            : {
                disconnect: true,
              };
      }

      const assignment =
        await prisma.investorTableFormatAssignment.update(
          {
            where: {
              id,
            },

            data,

            include: {
              tableFormat: {
                include: {
                  columns: {
                    orderBy: {
                      sortOrder: "asc",
                    },
                  },
                },
              },

              category: true,
              subCategory: true,
              financialYear: true,
              quarter: true,
            },
          }
        );

      return res.status(200).json({
        success: true,
        message:
          "Investor table format assignment updated successfully",
        data: assignment,
      });
    } catch (error) {
      console.error(
        "Error updating table format assignment:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update table format assignment",
      });
    }
  };

/**
 * |--------------------------------------------------------------------------
 * | DELETE TABLE FORMAT ASSIGNMENT
 * |--------------------------------------------------------------------------
 */

export const deleteInvestorTableFormatAssignment =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = parseId(req.params.id);

      if (!id) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid assignment ID",
        });
      }

      const existing =
        await prisma.investorTableFormatAssignment.findUnique(
          {
            where: {
              id,
            },
          }
        );

      if (!existing) {
        return res.status(404).json({
          success: false,
          message:
            "Investor table format assignment not found",
        });
      }

      await prisma.investorTableFormatAssignment.delete(
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        success: true,
        message:
          "Investor table format assignment deleted successfully",
      });
    } catch (error) {
      console.error(
        "Error deleting table format assignment:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete investor table format assignment",
      });
    }
  };