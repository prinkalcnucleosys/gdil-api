import { Router } from "express";

import {
  createContactInquiry,
  getContactInquiries,
  getContactInquiryById,
  updateContactInquiryStatus,
  deleteContactInquiry,
} from "../controllers/contact.controller";
import {
  createCareerApplication,
  getCareerApplications,
  getCareerApplicationById,
  updateCareerApplicationStatus,
  deleteCareerApplication,
} from "../controllers/career.controller";


import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

/**
 * ==========================================================================
 * PUBLIC
 * ==========================================================================
 */

/**
 * Submit contact form
 *
 * POST /api/contact
 */
router.post(
  "/",
  createContactInquiry,
);
/**
 * Submit career application
 *
 * POST /api/contact/careers
 */
router.post(
  "/careers",
  createCareerApplication,
);

/**
 * ==========================================================================
 * ADMIN
 * ==========================================================================
 */

/**
 * Get all inquiries
 *
 * GET /api/contact/admin
 */
router.get(
  "/admin",
  authenticateJWT,
  getContactInquiries,
);

/**
 * Get single inquiry
 *
 * GET /api/contact/admin/:id
 */
router.get(
  "/admin/:id",
  authenticateJWT,
  getContactInquiryById,
);

/**
 * Update inquiry status
 *
 * PATCH /api/contact/admin/:id/status
 */
router.patch(
  "/admin/:id/status",
  authenticateJWT,
  updateContactInquiryStatus,
);

/**
 * Delete inquiry
 *
 * DELETE /api/contact/admin/:id
 */
router.delete(
  "/admin/:id",
  authenticateJWT,
  deleteContactInquiry,
);
/**
 * ==========================================================================
 * CAREER ADMIN
 * ==========================================================================
 */

/**
 * Get all career applications
 *
 * GET /api/contact/careers/admin
 */
router.get(
  "/careers/admin",
  authenticateJWT,
  getCareerApplications,
);

/**
 * Get single career application
 *
 * GET /api/contact/careers/admin/:id
 */
router.get(
  "/careers/admin/:id",
  authenticateJWT,
  getCareerApplicationById,
);

/**
 * Update career application status
 *
 * PATCH /api/contact/careers/admin/:id/status
 */
router.patch(
  "/careers/admin/:id/status",
  authenticateJWT,
  updateCareerApplicationStatus,
);

/**
 * Delete career application
 *
 * DELETE /api/contact/careers/admin/:id
 */
router.delete(
  "/careers/admin/:id",
  authenticateJWT,
  deleteCareerApplication,
);

export default router;