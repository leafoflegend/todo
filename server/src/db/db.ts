import { Sequelize } from 'sequelize-typescript';

const getConnection = (): Sequelize =>
  // @ts-ignore
  new Sequelize({
    database: process.env.DATABASE_NAME || 'todobe',
    username: process.env.DATABASE_USERNAME || 'eszwajkowski',
    password: process.env.DATABASE_PASSWORD || '',
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'postgres',
    logging: process.env.DATABASE_LOGGING || false,
    modelPaths: [`${__dirname}/models`],
  });

export default getConnection;
