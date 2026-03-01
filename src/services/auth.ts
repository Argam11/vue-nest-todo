import type { TLoginInput } from "@/schemas";
import { request } from "./request";

interface ILoginResponse {
  username: string;
}

interface IMeResponse {
  username: string;
}

export const login = async (input: TLoginInput): Promise<ILoginResponse> => {
  return request<TLoginInput, ILoginResponse>({
    input,
    method: "POST",
    path: "auth/login",
  });
};

export const me = async () => {
  return request<void, IMeResponse>({
    method: "GET",
    path: "auth/me",
  });
};

export const logout = async () => {
  return request({
    method: "POST",
    path: "auth/logout",
  });
};
