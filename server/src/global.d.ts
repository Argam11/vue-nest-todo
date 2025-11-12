declare global {
  declare namespace Express {
    export interface Request {
      user: {
        username: string;
      };
    }
  }
}

export {};
