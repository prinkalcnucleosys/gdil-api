import { Router } from "express";
import multer from "multer";

import {
  uploadBlogImage,
  uploadBlogDocument,
  uploadInvestorDocument,
} from "../controllers/upload.controller";

import {
  blogImageUpload,
  blogDocumentUpload,
  investorDocumentUpload,
} from "../middleware/upload.middleware";

import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

function handleMulter(upload: ReturnType<typeof multer>, errorMessage: string) {
  return (req: any, res: any, next: any) => {
    upload.single("file")(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);

        return res.status(400).json({
          success: false,
          message:
            err.code === "LIMIT_FILE_SIZE"
              ? errorMessage
              : err.message,
        });
      }

      if (err) {
        console.error("Upload validation error:", err);

        return res.status(400).json({
          success: false,
          message: err.message || "Invalid upload file.",
        });
      }

      next();
    });
  };
}

router.post(
  "/blog",
  authenticateJWT,
  handleMulter(blogImageUpload, "Image size must not exceed 5 MB."),
  uploadBlogImage,
);

router.post(
  "/blog-document",
  authenticateJWT,
  handleMulter(blogDocumentUpload, "PDF size must not exceed 10 MB."),
  uploadBlogDocument,
);

router.post(
  "/investor",
  authenticateJWT,
  handleMulter(investorDocumentUpload, "PDF size must not exceed 10 MB."),
  uploadInvestorDocument,
);

export default router;
