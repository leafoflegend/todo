import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import HealthModule from './health/index';
import DatabaseModule from './databases/index';
import middleware from './middleware/index';
import ConfiguredRouterModule from './routes';

@Module({
  imports: [ConfiguredRouterModule, DatabaseModule, HealthModule],
})
class ApplicationModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(...middleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

export default ApplicationModule;
