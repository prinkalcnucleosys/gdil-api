import { Router } from "express";

import {
  createContactInquiry,
  getContactInquiries,
  getContactInquiryById,
  updateContactInquiryStatus,
  deleteContactInquiry,
} from "../controllers/contact.controller";

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

export default router;