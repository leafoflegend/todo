import { Module } from '@nestjs/common';
import HealthModule from './health';
import DatabaseModule from './databases';

@Module({
  imports: [DatabaseModule, HealthModule],
})
class ApplicationModule {}

export default ApplicationModule;
