import { Sequelize } from 'sequelize-typescript';
import { Logger } from '../utils';
import { seedData } from './utils';

const l = new Logger('root db');

let firstResolvedDb: Sequelize;

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

class DBManager {
  private initialized: boolean;

  private internalDb: null | Sequelize;

  public constructor() {
    this.initialized = false;
    this.internalDb = firstResolvedDb ? firstResolvedDb : null;
  }

  private setupDb = (force: boolean = false, seed: boolean = false): Promise<Sequelize> => {
    if (force) l.info('forcing database wipe.');
    if (seed) l.info('running seeding operation.');

    return new Promise((res, rej) => {
      l.info('Beginning connection to DB.');

      const db = getConnection();

      db.sync({ force })
        .then(() => db.authenticate())
        .then(() => {
          l.info('Successfully connected to DB.');
          if (!seed) {
            res(db);
            return false;
          }

          return seedData();
        })
        .then(() => {
          if (seed) l.info('Seeding operation completed.');
          res(db);
        })
        .catch(e => {
          l.err('Error connecting to DB.', e);
          rej(e);
        });
    });
  };

  public setup = async (force: boolean = false, seed: boolean = false): Promise<Sequelize> => {
    if (this.internalDb) return this.internalDb;
    try {
      const resolvedDb = await this.setupDb(force, seed);
      this.internalDb = resolvedDb;
      firstResolvedDb = resolvedDb;

      return this.internalDb;
    } catch (e) {
      l.err('DB Manager Failed to Initialize.', e);
      throw new Error('Could not initialize DB');
    }
  };
}

export default DBManager;
