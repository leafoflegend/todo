import { NestFactory } from '@nestjs/core';
import { Logger } from '../utils';
import ApplicationModule from './nest-modules';
import { UnwrapPromise } from '../../types/utility';

const l = new Logger('nest root');
const PORT = typeof process.env.PORT === 'string' ? process.env.PORT : 3000;

type NestApplication = UnwrapPromise<ReturnType<typeof NestFactory.create>>;

const bootstrapNest = (): Promise<NestApplication> => {
  return new Promise((res, rej) => {
    let nestApp: NestApplication;

    NestFactory.create(ApplicationModule)
      .then(app => {
        l.info('Nest Application successfully created.');

        nestApp = app;

        return app.listen(PORT);
      })
      .then(() => {
        l.info(`Nest Application listening on PORT ${PORT}`);
        res(nestApp);
      })
      .catch(e => {
        l.err('Nest Application failed to start.', e);
        rej(e);
      });
  });
};

export default bootstrapNest;
