import { ExceptionFilter, Catch, NotFoundException, HttpException, ArgumentsHost } from '@nestjs/common'
import { join } from 'path';
import CONSTANTS from '../../../../constants';

const { DIST_PATH: { FOLDER } } = CONSTANTS;

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.sendFile(join(FOLDER, './index.html'));
  }
}
