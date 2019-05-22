import { Module } from '@nestjs/common';
import sequelizeProvider from './sequelize';
import redisProvider from './redis';

const databaseProviders = [sequelizeProvider, redisProvider];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
class Database {}

export default Database;
