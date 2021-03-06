import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '../utils';
import ApplicationModule from './nest-modules';
import { UnwrapPromise } from '../../types/utility';
import CONSTANTS from '../constants';
import { NotFoundExceptionFilter } from './nest-modules/filters/not-found';

const {
  DIST_PATH: { FOLDER },
} = CONSTANTS;

const l = new Logger('nest root');
const PORT = typeof process.env.PORT === 'string' ? parseInt(process.env.PORT) : 3000;

type NestApplication = UnwrapPromise<ReturnType<typeof NestFactory.create>>;

const bootstrapNest = async (): Promise<NestApplication> => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
    l.info('Nest Application successfully created.');

    app.useStaticAssets(FOLDER);
    app.useGlobalFilters(new NotFoundExceptionFilter());

    await app.listen(PORT);
    l.info(`Nest Application listening on PORT ${PORT}`);

    return app;
  } catch (e) {
    l.err('Nest Application failed to start.', e);
    throw e;
  }
};

export default bootstrapNest;
