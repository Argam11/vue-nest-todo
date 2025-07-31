import type { LoginInput } from "@/types/login";

export const login = (input: LoginInput) => {
  console.log("input", input);
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej(new Error("Something went wrong!"));
    }, 1000);
  });
};
