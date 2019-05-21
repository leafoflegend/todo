import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
class CookieMiddleware extends CookieParserMiddleware implements NestMiddleware {}

export default CookieMiddleware;
