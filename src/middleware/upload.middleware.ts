import multer from "multer";

const storage = multer.memoryStorage();

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_PDF_SIZE = 20 * 1024 * 1024;

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const blogImageUpload = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(
        new Error("Only JPG, JPEG, PNG and WebP images are allowed."),
      );
    }

    cb(null, true);
  },
});

export const blogDocumentUpload = multer({
  storage,
  limits: { fileSize: MAX_PDF_SIZE },
  fileFilter: (_req, file, cb) => {
    // if (file.mimetype !== "application/pdf") {
    //   return cb(new Error("Only PDF documents are allowed."));
    // }

    cb(null, true);
  },
});

export const investorDocumentUpload = multer({
  storage,
  limits: { fileSize: MAX_PDF_SIZE },
  fileFilter: (_req, file, cb) => {
    // if (file.mimetype !== "application/pdf") {
    //   return cb(new Error("Only PDF documents are allowed."));
    // }

    cb(null, true);
  },
});
