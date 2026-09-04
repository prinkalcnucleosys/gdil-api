import { Request, Response } from "express";
import prisma from "../lib/prisma";

/*
|--------------------------------------------------------------------------
| Allowed Quarter Codes
|--------------------------------------------------------------------------
*/

const ALLOWED_QUARTERS = [
  "Q1",
  "Q2",
  "Q3",
  "Q4",
] as const;

type QuarterCode =
  (typeof ALLOWED_QUARTERS)[number];

/*
|--------------------------------------------------------------------------
| Normalize Quarter Code
|--------------------------------------------------------------------------
*/

function normalizeQuarterCode(
  value: unknown,
): QuarterCode | null {
  if (typeof value !== "string") {
    return null;
  }

  const code = value.trim().toUpperCase();

  if (
    !ALLOWED_QUARTERS.includes(
      code as QuarterCode,
    )
  ) {
    return null;
  }

  return code as QuarterCode;
}

/*
|--------------------------------------------------------------------------
| Get Default Quarter Name
|--------------------------------------------------------------------------
*/

function getQuarterName(
  code: QuarterCode,
): string {
  const names: Record<
    QuarterCode,
    string
  > = {
    Q1: "Quarter 1",
    Q2: "Quarter 2",
    Q3: "Quarter 3",
    Q4: "Quarter 4",
  };

  return names[code];
}

/*
|--------------------------------------------------------------------------
| Parse Release Date
|--------------------------------------------------------------------------
|
| undefined = field not supplied
| null      = remove release date
| Date      = valid release date
|--------------------------------------------------------------------------
*/

function parseReleaseDate(
  value: unknown,
): Date | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (
    value === null ||
    value === ""
  ) {
    return null;
  }

  if (typeof value !== "string") {
    return null;
  }

  /*
   * Accept YYYY-MM-DD
   */
  const dateOnlyRegex =
    /^\d{4}-\d{2}-\d{2}$/;

  if (dateOnlyRegex.test(value)) {
    const [year, month, day] =
      value.split("-").map(Number);

    const date = new Date(
      Date.UTC(
        year,
        month - 1,
        day,
      ),
    );

    /*
     * Validate actual date
     */
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      return null;
    }

    return date;
  }

  /*
   * Also support normal ISO date
   */
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

/*
|--------------------------------------------------------------------------
| GET PUBLIC INVESTOR QUARTERS
|--------------------------------------------------------------------------
|
| GET /api/investor/quarters
|
| Optional:
|
| GET /api/investor/quarters?financialYearId=1
|--------------------------------------------------------------------------
*/

export async function getInvestorQuarters(
  req: Request,
  res: Response,
) {
  try {
    let financialYearId:
      | number
      | undefined;

    if (
      req.query.financialYearId !==
      undefined
    ) {
      financialYearId = Number(
        req.query.financialYearId,
      );

      if (
        Number.isNaN(financialYearId) ||
        !Number.isInteger(
          financialYearId,
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid financial year ID",
        });
      }
    }

    const quarters =
      await prisma.investorQuarter.findMany(
        {
          where: {
            isActive: true,

            ...(financialYearId !==
            undefined
              ? {
                  financialYearId,
                }
              : {}),
          },

          orderBy: [
            {
              financialYearId: "asc",
            },
            {
              sortOrder: "asc",
            },
            {
              code: "asc",
            },
          ],

          include: {
            financialYear: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
      );

    return res.status(200).json({
      success: true,
      message:
        "Investor quarters retrieved successfully",
      data: quarters,
    });
  } catch (error) {
    console.error(
      "getInvestorQuarters error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve investor quarters",
    });
  }
}

/*
|--------------------------------------------------------------------------
| GET ADMIN INVESTOR QUARTERS
|--------------------------------------------------------------------------
|
| GET /api/investor/admin/quarters
|
| Optional:
|
| GET /api/investor/admin/quarters?financialYearId=1
|--------------------------------------------------------------------------
*/

export async function getAdminInvestorQuarters(
  req: Request,
  res: Response,
) {
  try {
    let financialYearId:
      | number
      | undefined;

    if (
      req.query.financialYearId !==
      undefined
    ) {
      financialYearId = Number(
        req.query.financialYearId,
      );

      if (
        Number.isNaN(financialYearId) ||
        !Number.isInteger(
          financialYearId,
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid financial year ID",
        });
      }
    }

    const quarters =
      await prisma.investorQuarter.findMany(
        {
          where: {
            ...(financialYearId !==
            undefined
              ? {
                  financialYearId,
                }
              : {}),
          },

          orderBy: [
            {
              financialYearId: "asc",
            },
            {
              sortOrder: "asc",
            },
            {
              code: "asc",
            },
          ],

          include: {
            financialYear: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
      );

    return res.status(200).json({
      success: true,
      message:
        "Investor quarters retrieved successfully",
      data: quarters,
    });
  } catch (error) {
    console.error(
      "getAdminInvestorQuarters error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve investor quarters",
    });
  }
}

/*
|--------------------------------------------------------------------------
| GET SINGLE INVESTOR QUARTER
|--------------------------------------------------------------------------
|
| GET /api/investor/quarters/:id
|--------------------------------------------------------------------------
*/

export async function getInvestorQuarterById(
  req: Request,
  res: Response,
) {
  try {
    const id = Number(req.params.id);

    if (
      Number.isNaN(id) ||
      !Number.isInteger(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid quarter ID",
      });
    }

    const quarter =
      await prisma.investorQuarter.findUnique(
        {
          where: {
            id,
          },

          include: {
            financialYear: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
      );

    if (!quarter) {
      return res.status(404).json({
        success: false,
        message:
          "Investor quarter not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: quarter,
    });
  } catch (error) {
    console.error(
      "getInvestorQuarterById error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve investor quarter",
    });
  }
}

/*
|--------------------------------------------------------------------------
| CREATE INVESTOR QUARTER
|--------------------------------------------------------------------------
|
| POST /api/investor/admin/quarters
|--------------------------------------------------------------------------
|
| Body:
|
| {
|   "financialYearId": 1,
|   "code": "Q1",
|   "name": "Quarter 1",
|   "releaseDate": "2026-06-30",
|   "sortOrder": 1,
|   "isActive": true
| }
|--------------------------------------------------------------------------
*/

export async function createInvestorQuarter(
  req: Request,
  res: Response,
) {
  try {
    const {
      financialYearId,
      name,
      code,
      releaseDate,
      sortOrder,
      isActive,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Validate Financial Year
    |--------------------------------------------------------------------------
    */

    const parsedFinancialYearId =
      Number(financialYearId);

    if (
      financialYearId === undefined ||
      financialYearId === null ||
      financialYearId === "" ||
      Number.isNaN(
        parsedFinancialYearId,
      ) ||
      !Number.isInteger(
        parsedFinancialYearId,
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Financial year is required",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Check Financial Year Exists
    |--------------------------------------------------------------------------
    */

    const financialYear =
      await prisma.investorFinancialYear.findUnique(
        {
          where: {
            id: parsedFinancialYearId,
          },
        },
      );

    if (!financialYear) {
      return res.status(404).json({
        success: false,
        message:
          "Financial year not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate Quarter Code
    |--------------------------------------------------------------------------
    */

    const normalizedCode =
      normalizeQuarterCode(code);

    if (!normalizedCode) {
      return res.status(400).json({
        success: false,
        message:
          "Quarter code must be Q1, Q2, Q3 or Q4",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Parse Release Date
    |--------------------------------------------------------------------------
    */

    const parsedReleaseDate =
      parseReleaseDate(releaseDate);

    if (
      releaseDate !== undefined &&
      releaseDate !== null &&
      releaseDate !== "" &&
      parsedReleaseDate === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid release date. Use YYYY-MM-DD format.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Check Duplicate Quarter
    |--------------------------------------------------------------------------
    */

    const existingQuarter =
      await prisma.investorQuarter.findUnique(
        {
          where: {
            financialYearId_code: {
              financialYearId:
                parsedFinancialYearId,
              code: normalizedCode,
            },
          },
        },
      );

    if (existingQuarter) {
      return res.status(409).json({
        success: false,
        message:
          `${normalizedCode} already exists for this financial year`,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Quarter Name
    |--------------------------------------------------------------------------
    */

    const quarterName =
      typeof name === "string" &&
      name.trim().length > 0
        ? name.trim()
        : getQuarterName(
            normalizedCode,
          );

    /*
    |--------------------------------------------------------------------------
    | Sort Order
    |--------------------------------------------------------------------------
    */

    let parsedSortOrder = 0;

    if (sortOrder !== undefined) {
      parsedSortOrder =
        Number(sortOrder);

      if (
        Number.isNaN(
          parsedSortOrder,
        ) ||
        !Number.isInteger(
          parsedSortOrder,
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "sortOrder must be a valid integer",
        });
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Active Status
    |--------------------------------------------------------------------------
    */

    let parsedIsActive = true;

    if (isActive !== undefined) {
      if (
        typeof isActive ===
        "boolean"
      ) {
        parsedIsActive = isActive;
      } else if (
        isActive === "true"
      ) {
        parsedIsActive = true;
      } else if (
        isActive === "false"
      ) {
        parsedIsActive = false;
      } else {
        return res.status(400).json({
          success: false,
          message:
            "isActive must be a boolean",
        });
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Create Quarter
    |--------------------------------------------------------------------------
    */

    const quarter =
      await prisma.investorQuarter.create(
        {
          data: {
            financialYearId:
              parsedFinancialYearId,

            name: quarterName,

            code: normalizedCode,

            releaseDate:
              parsedReleaseDate ?? null,

            sortOrder:
              parsedSortOrder,

            isActive:
              parsedIsActive,
          },

          include: {
            financialYear: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
      );

    return res.status(201).json({
      success: true,
      message:
        "Investor quarter created successfully",
      data: quarter,
    });
  } catch (error) {
    console.error(
      "createInvestorQuarter error:",
      error,
    );

    /*
    |--------------------------------------------------------------------------
    | Prisma Unique Constraint
    |--------------------------------------------------------------------------
    */

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string })
        .code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message:
          "This quarter already exists for the selected financial year",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to create investor quarter",
    });
  }
}

/*
|--------------------------------------------------------------------------
| UPDATE INVESTOR QUARTER
|--------------------------------------------------------------------------
|
| PUT /api/investor/admin/quarters/:id
|--------------------------------------------------------------------------
*/

export async function updateInvestorQuarter(
  req: Request,
  res: Response,
) {
  try {
    const id = Number(req.params.id);

    if (
      Number.isNaN(id) ||
      !Number.isInteger(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid quarter ID",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Find Existing Quarter
    |--------------------------------------------------------------------------
    */

    const existingQuarter =
      await prisma.investorQuarter.findUnique(
        {
          where: {
            id,
          },
        },
      );

    if (!existingQuarter) {
      return res.status(404).json({
        success: false,
        message:
          "Investor quarter not found",
      });
    }

    const {
      financialYearId,
      name,
      code,
      releaseDate,
      sortOrder,
      isActive,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Financial Year
    |--------------------------------------------------------------------------
    */

    let parsedFinancialYearId:
      | number
      | undefined;

    if (
      financialYearId !== undefined
    ) {
      parsedFinancialYearId =
        Number(financialYearId);

      if (
        Number.isNaN(
          parsedFinancialYearId,
        ) ||
        !Number.isInteger(
          parsedFinancialYearId,
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid financial year ID",
        });
      }

      const financialYear =
        await prisma.investorFinancialYear.findUnique(
          {
            where: {
              id: parsedFinancialYearId,
            },
          },
        );

      if (!financialYear) {
        return res.status(404).json({
          success: false,
          message:
            "Financial year not found",
        });
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Quarter Code
    |--------------------------------------------------------------------------
    */

    let normalizedCode:
      | QuarterCode
      | undefined;

    if (code !== undefined) {
      normalizedCode =
        normalizeQuarterCode(code) ??
        undefined;

      if (!normalizedCode) {
        return res.status(400).json({
          success: false,
          message:
            "Quarter code must be Q1, Q2, Q3 or Q4",
        });
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Release Date
    |--------------------------------------------------------------------------
    */

    const parsedReleaseDate =
      parseReleaseDate(releaseDate);

    if (
      releaseDate !== undefined &&
      releaseDate !== null &&
      releaseDate !== "" &&
      parsedReleaseDate === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid release date. Use YYYY-MM-DD format.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Sort Order
    |--------------------------------------------------------------------------
    */

    let parsedSortOrder:
      | number
      | undefined;

    if (sortOrder !== undefined) {
      parsedSortOrder =
        Number(sortOrder);

      if (
        Number.isNaN(
          parsedSortOrder,
        ) ||
        !Number.isInteger(
          parsedSortOrder,
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "sortOrder must be a valid integer",
        });
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Active Status
    |--------------------------------------------------------------------------
    */

    let parsedIsActive:
      | boolean
      | undefined;

    if (isActive !== undefined) {
      if (
        typeof isActive ===
        "boolean"
      ) {
        parsedIsActive = isActive;
      } else if (
        isActive === "true"
      ) {
        parsedIsActive = true;
      } else if (
        isActive === "false"
      ) {
        parsedIsActive = false;
      } else {
        return res.status(400).json({
          success: false,
          message:
            "isActive must be a boolean",
        });
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Final Values
    |--------------------------------------------------------------------------
    */

    const finalFinancialYearId =
      parsedFinancialYearId ??
      existingQuarter.financialYearId;

    const finalCode =
      normalizedCode ??
      existingQuarter.code;

    /*
    |--------------------------------------------------------------------------
    | Check Duplicate
    |--------------------------------------------------------------------------
    */

    const duplicate =
      await prisma.investorQuarter.findFirst(
        {
          where: {
            financialYearId:
              finalFinancialYearId,

            code: finalCode,

            NOT: {
              id,
            },
          },
        },
      );

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message:
          `${finalCode} already exists for this financial year`,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Update Data
    |--------------------------------------------------------------------------
    */

    const updateData: any = {};

    if (
      parsedFinancialYearId !==
      undefined
    ) {
      updateData.financialYearId =
        parsedFinancialYearId;
    }

    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        !name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Quarter name cannot be empty",
        });
      }

      updateData.name =
        name.trim();
    }

    if (
      normalizedCode !==
      undefined
    ) {
      updateData.code =
        normalizedCode;
    }

    if (
      releaseDate !== undefined
    ) {
      updateData.releaseDate =
        parsedReleaseDate;
    }

    if (
      parsedSortOrder !==
      undefined
    ) {
      updateData.sortOrder =
        parsedSortOrder;
    }

    if (
      parsedIsActive !==
      undefined
    ) {
      updateData.isActive =
        parsedIsActive;
    }

    /*
    |--------------------------------------------------------------------------
    | Update Quarter
    |--------------------------------------------------------------------------
    */

    const quarter =
      await prisma.investorQuarter.update(
        {
          where: {
            id,
          },

          data: updateData,

          include: {
            financialYear: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
      );

    return res.status(200).json({
      success: true,
      message:
        "Investor quarter updated successfully",
      data: quarter,
    });
  } catch (error) {
    console.error(
      "updateInvestorQuarter error:",
      error,
    );

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string })
        .code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message:
          "This quarter already exists for the selected financial year",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update investor quarter",
    });
  }
}

/*
|--------------------------------------------------------------------------
| DELETE INVESTOR QUARTER
|--------------------------------------------------------------------------
|
| DELETE /api/investor/admin/quarters/:id
|--------------------------------------------------------------------------
*/

export async function deleteInvestorQuarter(
  req: Request,
  res: Response,
) {
  try {
    const id = Number(req.params.id);

    if (
      Number.isNaN(id) ||
      !Number.isInteger(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid quarter ID",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Check Quarter
    |--------------------------------------------------------------------------
    */

    const existingQuarter =
      await prisma.investorQuarter.findUnique(
        {
          where: {
            id,
          },
        },
      );

    if (!existingQuarter) {
      return res.status(404).json({
        success: false,
        message:
          "Investor quarter not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    await prisma.investorQuarter.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Investor quarter deleted successfully",
    });
  } catch (error) {
    console.error(
      "deleteInvestorQuarter error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete investor quarter",
    });
  }
}

/*
|--------------------------------------------------------------------------
| UPDATE QUARTER STATUS
|--------------------------------------------------------------------------
|
| PATCH /api/investor/admin/quarters/:id/status
|--------------------------------------------------------------------------
|
| Body:
|
| {
|   "isActive": true
| }
|--------------------------------------------------------------------------
*/

export async function updateInvestorQuarterStatus(
  req: Request,
  res: Response,
) {
  try {
    const id = Number(req.params.id);

    if (
      Number.isNaN(id) ||
      !Number.isInteger(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid quarter ID",
      });
    }

    const {
      isActive,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Validate Status
    |--------------------------------------------------------------------------
    */

    let parsedIsActive: boolean;

    if (
      typeof isActive ===
      "boolean"
    ) {
      parsedIsActive = isActive;
    } else if (
      isActive === "true"
    ) {
      parsedIsActive = true;
    } else if (
      isActive === "false"
    ) {
      parsedIsActive = false;
    } else {
      return res.status(400).json({
        success: false,
        message:
          "isActive must be a boolean",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Check Quarter
    |--------------------------------------------------------------------------
    */

    const existingQuarter =
      await prisma.investorQuarter.findUnique(
        {
          where: {
            id,
          },
        },
      );

    if (!existingQuarter) {
      return res.status(404).json({
        success: false,
        message:
          "Investor quarter not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Update Status
    |--------------------------------------------------------------------------
    */

    const quarter =
      await prisma.investorQuarter.update(
        {
          where: {
            id,
          },

          data: {
            isActive:
              parsedIsActive,
          },

          include: {
            financialYear: {
              include: {
                category: true,
                subCategory: true,
              },
            },
          },
        },
      );

    return res.status(200).json({
      success: true,
      message: parsedIsActive
        ? "Investor quarter activated successfully"
        : "Investor quarter deactivated successfully",
      data: quarter,
    });
  } catch (error) {
    console.error(
      "updateInvestorQuarterStatus error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update investor quarter status",
    });
  }
}