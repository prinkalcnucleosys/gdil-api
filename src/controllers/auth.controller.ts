import type {
  Request,
  Response,
  NextFunction,
} from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

import prisma from "../lib/prisma";

const loginSchema = z.object({
  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(1),
});

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    /*
    |--------------------------------------------------------------------------
    | VALIDATE REQUEST
    |--------------------------------------------------------------------------
    */

    const parsed =
      loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        errors: parsed.error.flatten(),
      });
    }

    const {
      email,
      password,
    } = parsed.data;

    /*
    |--------------------------------------------------------------------------
    | FIND ADMIN
    |--------------------------------------------------------------------------
    */

    const admin =
      await prisma.adminUser.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK ACTIVE
    |--------------------------------------------------------------------------
    */

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK PASSWORD
    |--------------------------------------------------------------------------
    */

    const passwordValid =
      await bcrypt.compare(
        password,
        admin.passwordHash,
      );

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | JWT
    |--------------------------------------------------------------------------
    */

    const secret =
      process.env.JWT_SECRET;

    if (!secret) {
      throw new Error(
        "JWT_SECRET is not configured",
      );
    }

    const expiresIn =
      process.env.JWT_EXPIRES_IN || "1d";

    const token =
      jwt.sign(
        {
          sub: admin.id,
          email: admin.email,
          role: "admin",
        },
        secret,
        {
          expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
        },
      );

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      success: true,
      message: "Login successful",

      data: {
        token,

        user: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: "admin",
        },
      },
    });
  } catch (error) {
    next(error);
  }
}