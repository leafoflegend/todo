import { Sequelize } from 'sequelize-typescript';
import CONSTANTS from '../../../constants';
import { dbManager, models } from '../../../db';

interface SequelizeProvider {
  db: Sequelize;
  models: typeof models;
}

const sequelizeProvider = {
  provide: CONSTANTS.SEQUELIZE,
  useFactory: async (): Promise<SequelizeProvider> => {
    const db = await dbManager.setup();

    return {
      db,
      models,
    };
  },
};

export default sequelizeProvider;
