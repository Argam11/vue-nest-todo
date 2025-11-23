import type { RequestInput } from "@/types/auth";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const request = async <T>({ input, method, path }: RequestInput<T>) => {
  const url = BASE_URL + path;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...(method !== "GET" && { body: JSON.stringify(input) }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();

    throw new Error(errorResponse.message, {
      cause: { ...errorResponse, status: res.status },
    });
  }

  return res.json();
};

/**
 * Generic FormData request handler
 * Use this for endpoints that need file uploads or multipart/form-data
 */
export const requestWithFormData = async <T>(
  path: string,
  data: Record<string, string | File | null>,
  method: "POST" | "PUT" | "PATCH" = "POST",
): Promise<T> => {
  const formData = new FormData();

  // Append all data to FormData, skip null/undefined values
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      // Type guard to ensure only valid FormData values
      if (typeof value === "string" || value instanceof File) {
        formData.append(key, value);
      }
    }
  });

  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    method,
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message, {
      cause: { ...errorResponse, status: res.status },
    });
  }

  return res.json();
};
