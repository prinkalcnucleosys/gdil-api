import { Router } from "express";

import {
  getInvestorTableFormats,
  getInvestorTableFormatById,
  createInvestorTableFormat,
  updateInvestorTableFormat,
  deleteInvestorTableFormat,
  updateInvestorTableFormatStatus,

  getInvestorTableColumns,
  createInvestorTableColumn,
  updateInvestorTableColumn,
  deleteInvestorTableColumn,

  getInvestorTableFormatAssignments,
  createInvestorTableFormatAssignment,
  updateInvestorTableFormatAssignment,
  deleteInvestorTableFormatAssignment,
} from "../controllers/investor-table-format.controller";

import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

/**
 * |--------------------------------------------------------------------------
 * | TABLE FORMAT ASSIGNMENTS
 * |--------------------------------------------------------------------------
 */

/**
 * GET assignments
 *
 * Examples:
 * GET /api/investor/admin/table-formats/assignments
 * GET /api/investor/admin/table-formats/assignments?categoryId=1
 * GET /api/investor/admin/table-formats/assignments?subCategoryId=2
 * GET /api/investor/admin/table-formats/assignments?financialYearId=3
 * GET /api/investor/admin/table-formats/assignments?quarterId=4
 */
router.get(
  "/assignments",
  getInvestorTableFormatAssignments
);

/**
 * CREATE assignment
 */
router.post(
  "/assignments",
  authenticateJWT,
  createInvestorTableFormatAssignment
);

/**
 * UPDATE assignment
 */
router.put(
  "/assignments/:id",
  authenticateJWT,
  updateInvestorTableFormatAssignment
);

/**
 * DELETE assignment
 */
router.delete(
  "/assignments/:id",
  authenticateJWT,
  deleteInvestorTableFormatAssignment
);


/**
 * |--------------------------------------------------------------------------
 * | TABLE COLUMNS
 * |--------------------------------------------------------------------------
 */

/**
 * GET columns
 */
router.get(
  "/:tableFormatId/columns",
  getInvestorTableColumns
);

/**
 * CREATE column
 */
router.post(
  "/:tableFormatId/columns",
  authenticateJWT,
  createInvestorTableColumn
);

/**
 * UPDATE column
 */
router.put(
  "/columns/:id",
  authenticateJWT,
  updateInvestorTableColumn
);

/**
 * DELETE column
 */
router.delete(
  "/columns/:id",
  authenticateJWT,
  deleteInvestorTableColumn
);


/**
 * |--------------------------------------------------------------------------
 * | TABLE FORMATS
 * |--------------------------------------------------------------------------
 */

/**
 * GET all table formats
 */
router.get(
  "/",
  getInvestorTableFormats
);

/**
 * GET single table format
 */
router.get(
  "/:id",
  getInvestorTableFormatById
);

/**
 * CREATE table format
 */
router.post(
  "/",
  authenticateJWT,
  createInvestorTableFormat
);

/**
 * UPDATE table format
 */
router.put(
  "/:id",
  authenticateJWT,
  updateInvestorTableFormat
);

/**
 * DELETE table format
 */
router.delete(
  "/:id",
  authenticateJWT,
  deleteInvestorTableFormat
);

/**
 * UPDATE table format status
 */
router.patch(
  "/:id/status",
  authenticateJWT,
  updateInvestorTableFormatStatus
);

export default router;