import type { LoginInput } from "@/types/auth";
import { request } from "./request";

export const login = async (input: LoginInput) => {
  return request<LoginInput>({
    input,
    method: "POST",
    path: "auth/login",
  });
};

export const me = async () => {
  return request({
    method: "GET",
    path: "auth/me",
  });
};
