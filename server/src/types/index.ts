export interface IBaseEntity<T> {
  _id?: T;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBaseResponse {
  statusCode: number;
  message: string;
}

export interface IEnvConfig {
  APP_URL: string;
}
