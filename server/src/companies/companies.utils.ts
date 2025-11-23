import * as fs from "fs";
import * as path from "path";
import { BadRequestException } from "@nestjs/common";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  UPLOAD_DIR,
} from "./companies.constants";

/**
 * Generate a unique filename using timestamp and original extension
 */
export function generateUniqueFilename(originalname: string): string {
  const extension = path.extname(originalname);
  const timestamp = Date.now();
  return `${timestamp}${extension}`;
}

/**
 * Safely delete file from filesystem if it exists
 */
export function deleteFileIfExists(filepath: string): void {
  try {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  } catch (error) {
    console.error(`Error deleting file ${filepath}:`, error);
  }
}

/**
 * Validate uploaded image file type and size
 * File is optional - only validates if file is provided
 */
export function validateImageFile(file?: Express.Multer.File): void {
  // File is optional, so only validate if provided
  if (!file) {
    return;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    throw new BadRequestException(
      `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new BadRequestException(
      `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    );
  }
}

/**
 * Construct full absolute image URL from filename
 */
export function getImageUrl(baseUrl: string, filename: string): string {
  return `${baseUrl}/${UPLOAD_DIR}/${filename}`;
}
