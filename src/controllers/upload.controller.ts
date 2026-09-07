import type {
  Request,
  Response,
} from "express";

import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

function sanitizeFolderName(
  value: string,
): string {
  return String(value || "general")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function sanitizeFileName(
  value: string,
): string {
  const extension =
    path.extname(value);

  const name = path
    .basename(value, extension)
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  const uniqueId =
    crypto.randomBytes(4).toString("hex");

  return `${name || "file"}-${uniqueId}${extension.toLowerCase()}`;
}

function getUploadRoot(): string {
  return path.join(
    process.cwd(),
    "uploads",
  );
}

/*
|--------------------------------------------------------------------------
| BLOG IMAGE UPLOAD
|--------------------------------------------------------------------------
*/

export async function uploadBlogImage(
  req: Request,
  res: Response,
) {
  try {
    console.log(
      "[BLOG IMAGE UPLOAD] Controller reached",
    );

    console.log(
      "[BLOG IMAGE UPLOAD] req.file:",
      req.file
        ? {
            fieldname:
              req.file.fieldname,
            originalname:
              req.file.originalname,
            mimetype:
              req.file.mimetype,
            size:
              req.file.size,
          }
        : null,
    );

    console.log(
      "[BLOG IMAGE UPLOAD] req.body:",
      req.body,
    );

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select an image.",
      });
    }

    const blogType =
      String(
        req.body.blogType ||
          "general",
      );

    const year =
      String(
        req.body.year ||
          new Date().getFullYear(),
      );

    const folder = path.join(
      getUploadRoot(),
      "blogs",
      sanitizeFolderName(blogType),
      sanitizeFolderName(year),
    );

    await fs.mkdir(folder, {
      recursive: true,
    });

    const fileName =
      sanitizeFileName(
        req.file.originalname,
      );

    const filePath =
      path.join(
        folder,
        fileName,
      );

    await fs.writeFile(
      filePath,
      req.file.buffer,
    );

    const relativePath =
      path
        .relative(
          process.cwd(),
          filePath,
        )
        .split(path.sep)
        .join("/");

    const url =
      `/${relativePath}`;

    console.log(
      "[BLOG IMAGE UPLOAD] Saved:",
      filePath,
    );

    console.log(
      "[BLOG IMAGE UPLOAD] URL:",
      url,
    );

    return res.status(201).json({
      success: true,
      message:
        "Blog image uploaded successfully.",

      data: {
        url,
        fileName,
        originalName:
          req.file.originalname,
        size:
          req.file.size,
        mimeType:
          req.file.mimetype,
        storageType:
          "local",
      },
    });
  } catch (error) {
    console.error(
      "[BLOG IMAGE UPLOAD] Controller error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload blog image.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| BLOG DOCUMENT / PDF UPLOAD
|--------------------------------------------------------------------------
|
| Used for:
| - Press Release
| - Newsletter Archive
|
| Storage:
| uploads/blogs/documents/{blogType}/{year}/
|
*/

export async function uploadBlogDocument(
  req: Request,
  res: Response,
) {
  try {
    console.log(
      "[BLOG DOCUMENT UPLOAD] Controller reached",
    );

    console.log(
      "[BLOG DOCUMENT UPLOAD] req.file:",
      req.file
        ? {
            fieldname:
              req.file.fieldname,
            originalname:
              req.file.originalname,
            mimetype:
              req.file.mimetype,
            size:
              req.file.size,
          }
        : null,
    );

    console.log(
      "[BLOG DOCUMENT UPLOAD] req.body:",
      req.body,
    );

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a PDF document.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate PDF
    |--------------------------------------------------------------------------
    */

    if (
      req.file.mimetype !==
      "application/pdf"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only PDF documents are allowed.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Blog Type
    |--------------------------------------------------------------------------
    */

    const blogType =
      String(
        req.body.blogType ||
          "general",
      );

    /*
    |--------------------------------------------------------------------------
    | Year
    |--------------------------------------------------------------------------
    */

    const year =
      String(
        req.body.year ||
          new Date().getFullYear(),
      );

    /*
    |--------------------------------------------------------------------------
    | Folder
    |--------------------------------------------------------------------------
    |
    | Example:
    |
    | uploads/
    |   blogs/
    |     documents/
    |       press_release/
    |         2026/
    |
    |       newsletter_archive/
    |         2026/
    |
    */

    const folder = path.join(
      getUploadRoot(),
      "blogs",
      "documents",
      sanitizeFolderName(
        blogType,
      ),
      sanitizeFolderName(
        year,
      ),
    );

    await fs.mkdir(folder, {
      recursive: true,
    });

    /*
    |--------------------------------------------------------------------------
    | File Name
    |--------------------------------------------------------------------------
    */

    const fileName =
      sanitizeFileName(
        req.file.originalname,
      );

    const filePath =
      path.join(
        folder,
        fileName,
      );

    /*
    |--------------------------------------------------------------------------
    | Save File
    |--------------------------------------------------------------------------
    */

    await fs.writeFile(
      filePath,
      req.file.buffer,
    );

    /*
    |--------------------------------------------------------------------------
    | Public URL
    |--------------------------------------------------------------------------
    */

    const relativePath =
      path
        .relative(
          process.cwd(),
          filePath,
        )
        .split(path.sep)
        .join("/");

    const url =
      `/${relativePath}`;

    console.log(
      "[BLOG DOCUMENT UPLOAD] Saved:",
      filePath,
    );

    console.log(
      "[BLOG DOCUMENT UPLOAD] URL:",
      url,
    );

    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    return res.status(201).json({
      success: true,

      message:
        "Blog document uploaded successfully.",

      data: {
        url,
        fileName,
        originalName:
          req.file.originalname,
        size:
          req.file.size,
        mimeType:
          req.file.mimetype,
        storageType:
          "local",
        blogType,
        year,
      },
    });
  } catch (error) {
    console.error(
      "[BLOG DOCUMENT UPLOAD] Controller error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload blog document.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| INVESTOR DOCUMENT UPLOAD
|--------------------------------------------------------------------------
*/

export async function uploadInvestorDocument(
  req: Request,
  res: Response,
) {
  try {
    console.log(
      "[INVESTOR DOCUMENT UPLOAD] Controller reached",
    );

    console.log(
      "[INVESTOR DOCUMENT UPLOAD] req.file:",
      req.file
        ? {
            fieldname:
              req.file.fieldname,
            originalname:
              req.file.originalname,
            mimetype:
              req.file.mimetype,
            size:
              req.file.size,
          }
        : null,
    );

    console.log(
      "[INVESTOR DOCUMENT UPLOAD] req.body:",
      req.body,
    );

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a PDF document.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate PDF
    |--------------------------------------------------------------------------
    */

    if (
      req.file.mimetype !==
      "application/pdf"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only PDF documents are allowed.",
      });
    }

    const category =
      String(
        req.body.category ||
          "general",
      );

    const subCategory =
      String(
        req.body.subCategory ||
          "",
      );

    const financialYear =
      String(
        req.body.financialYear ||
          "",
      );

    const quarter =
      String(
        req.body.quarter ||
          "",
      );

    const folderParts: string[] = [
      "investor",
      sanitizeFolderName(
        category,
      ),
    ];

    if (subCategory) {
      folderParts.push(
        sanitizeFolderName(
          subCategory,
        ),
      );
    }

    if (financialYear) {
      folderParts.push(
        sanitizeFolderName(
          financialYear,
        ),
      );
    }

    if (quarter) {
      folderParts.push(
        sanitizeFolderName(
          quarter,
        ),
      );
    }

    const folder = path.join(
      getUploadRoot(),
      ...folderParts,
    );

    await fs.mkdir(folder, {
      recursive: true,
    });

    const fileName =
      sanitizeFileName(
        req.file.originalname,
      );

    const filePath =
      path.join(
        folder,
        fileName,
      );

    await fs.writeFile(
      filePath,
      req.file.buffer,
    );

    const relativePath =
      path
        .relative(
          process.cwd(),
          filePath,
        )
        .split(path.sep)
        .join("/");

    const url =
      `/${relativePath}`;

    console.log(
      "[INVESTOR DOCUMENT UPLOAD] Saved:",
      filePath,
    );

    console.log(
      "[INVESTOR DOCUMENT UPLOAD] URL:",
      url,
    );

    return res.status(201).json({
      success: true,

      message:
        "Investor document uploaded successfully.",

      data: {
        url,
        fileName,
        originalName:
          req.file.originalname,
        size:
          req.file.size,
        mimeType:
          req.file.mimetype,
        storageType:
          "local",
      },
    });
  } catch (error) {
    console.error(
      "[INVESTOR DOCUMENT UPLOAD] Controller error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload investor document.",
    });
  }
}