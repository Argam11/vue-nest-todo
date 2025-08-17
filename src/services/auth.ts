import type { LoginInput } from "@/types/login";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = (input: LoginInput) => {
  const url = BASE_URL + "auth/login";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  }).then((res) => res.json());
};
