const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Validate file type and size
 * @param file - File to validate
 * @returns Error message if validation fails, null otherwise
 */
export const validateFile = (file: File | null | undefined): string | null => {
  if (!file) {
    return null; // File is optional
  }

  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`;
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
  }

  return null;
};

/**
 * Get accepted file types for input attribute
 */
export const getAcceptedFileTypes = (): string => {
  return ALLOWED_IMAGE_TYPES.join(",");
};

