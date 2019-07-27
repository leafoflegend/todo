import { Sequelize } from 'sequelize-typescript';

const getConnection = (): Sequelize => {
  const defaultOptions: {
    dialect: 'postgres';
    logging: boolean;
    modelPaths: string[];
  } = {
    dialect: 'postgres',
    logging: process.env.DATABASE_LOGGING === 'true' || false,
    modelPaths: [`${__dirname}/models`],
  };

  if (!process.env.DATABASE_URL) {
    // @ts-ignore
    return new Sequelize({
      database: process.env.DATABASE_NAME || 'todobe',
      username: process.env.DATABASE_USERNAME || 'eszwajkowski',
      password: process.env.DATABASE_PASSWORD || '',
      host: process.env.DATABASE_HOST || 'localhost',
      ...defaultOptions,
    });
  }

  return new Sequelize(process.env.DATABASE_URL, defaultOptions);
};

export default getConnection;
