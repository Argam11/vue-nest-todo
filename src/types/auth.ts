export interface LoginInput {
  username: string;
  password: string;
}

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

export interface RequestInput<T> {
  input: T;
  method: Method;
  path: string;
}
