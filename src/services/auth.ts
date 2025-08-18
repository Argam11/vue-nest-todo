import type { LoginInput } from "@/types/login";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (input: LoginInput) => {
  const url = BASE_URL + "auth/login";

  const res = await fetch(url, {
    method: "POST",
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
