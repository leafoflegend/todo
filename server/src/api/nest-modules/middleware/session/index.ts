import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: Function) {
    next();
  }
}
