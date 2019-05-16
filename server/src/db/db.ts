import { Sequelize } from 'sequelize-typescript';

// @ts-ignore
const connection = new Sequelize({
  database: process.env.DATABASE_NAME || 'todobe',
  username: process.env.DATABASE_USERNAME || 'eszwajkowski',
  password: process.env.DATABASE_PASSWORD || '',
  dialect: 'postgres',
  logging: process.env.DATABASE_LOGGING || false,
  modelPaths: [`${__dirname}/models`],
});

export default connection;
