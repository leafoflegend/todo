import { Module } from '@nestjs/common';
import sequelizeProvider from './sequelize';

const databaseProviders = [sequelizeProvider];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
class Database {}

export default Database;
