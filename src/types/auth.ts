export type TMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

export interface IRequestInput<T> {
  input?: T;
  method: TMethod;
  path: string;
}
