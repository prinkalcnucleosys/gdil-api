import type {
  Request,
  Response,
  NextFunction,
} from "express";

export function adminAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const adminKey = req.header("x-admin-key");

  if (!process.env.ADMIN_API_KEY) {
    return res.status(500).json({
      success: false,
      message: "ADMIN_API_KEY is not configured",
    });
  }

  if (adminKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
}