import { IBaseEntity, IBaseResponse } from "../../types";

export interface IUserEntity<T = string> extends IBaseEntity<T> {
  username: string;
  password: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse extends IBaseResponse {
  username: string;
}
