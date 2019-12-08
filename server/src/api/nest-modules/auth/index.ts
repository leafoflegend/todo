import { Module } from '@nestjs/common';
import Controller from './controller';
import Service from './service';
import DatabaseModule from '../databases';

@Module({
  controllers: [Controller],
  imports: [DatabaseModule],
  providers: [Service],
})
class Auth {}

export default Auth;
