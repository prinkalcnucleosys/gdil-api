import { Router } from "express";

import {
  getInvestorSubCategories,
  getInvestorSubCategoriesByCategory,
  getInvestorSubCategoryById,
  createInvestorSubCategory,
  updateInvestorSubCategory,
  deleteInvestorSubCategory,
  updateInvestorSubCategoryStatus,
} from "../controllers/investor-subcategory.controller";

import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

/**
 * Public
 */
router.get(
  "/",
  getInvestorSubCategories,
);

/**
 * Public - by category
 */
router.get(
  "/category/:categoryId",
  getInvestorSubCategoriesByCategory,
);

/**
 * Get single
 */
router.get(
  "/:id",
  getInvestorSubCategoryById,
);

/**
 * Admin - create
 */
router.post(
  "/",
  authenticateJWT,
  createInvestorSubCategory,
);

/**
 * Admin - update
 */
router.put(
  "/:id",
  authenticateJWT,
  updateInvestorSubCategory,
);

/**
 * Admin - delete
 */
router.delete(
  "/:id",
  authenticateJWT,
  deleteInvestorSubCategory,
);

/**
 * Admin - status
 */
router.patch(
  "/:id/status",
  authenticateJWT,
  updateInvestorSubCategoryStatus,
);

export default router;