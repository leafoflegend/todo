import { Sequelize } from 'sequelize-typescript';
import CONSTANTS from '../../../constants';
import { dbManager, models } from '../../../db';
import { Logger } from '../../../utils';

export interface SequelizeProvider {
  db: Sequelize;
  models: typeof models;
}

const l = new Logger('sequelize module');

const sequelizeProvider = {
  provide: CONSTANTS.SEQUELIZE,
  useFactory: async (): Promise<SequelizeProvider> => {
    try {
      const db = await dbManager.setup();

      return {
        db,
        models,
      };
    } catch (e) {
      l.err('Error setting up sequelize client.', e);

      throw e;
    }
  },
};

export default sequelizeProvider;
