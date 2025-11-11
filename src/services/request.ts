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
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorResponse = await res.json();

    throw new Error(errorResponse.message, {
      cause: { ...errorResponse, status: res.status },
    });
  }

  return res.json();
};
