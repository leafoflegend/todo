declare namespace Express {
  export interface Request {
    session: {
      id: string;
      timestamp: number;
      [key: string]: any;
      destroy: (res: Response) => Promise<void>;
    };
    cookies: {
      [key: string]: string;
    };
  }
}
