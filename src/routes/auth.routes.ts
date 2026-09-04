import { Router } from "express";

import {
  login,
} from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Admin authentication APIs
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin login
 *     description: Login using admin email and password and receive a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@gdil.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid email or password
 *       403:
 *         description: Admin account is inactive
 */
router.post(
  "/login",
  login,
);

export default router;