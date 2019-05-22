import { Inject, Injectable } from '@nestjs/common';
import CONSTANTS from '../../../constants';
import { Logger } from '../../../utils';
import { SequelizeProvider } from '../databases/sequelize';

const l = new Logger('health service');

@Injectable()
class HealthService {
  private readonly SEQUELIZE: SequelizeProvider;

  public constructor(@Inject(CONSTANTS.SEQUELIZE) SEQUELIZE) {
    this.SEQUELIZE = SEQUELIZE;
  }

  public checkDbHealth = async (): Promise<boolean> => {
    try {
      await this.SEQUELIZE.db.authenticate();
      return true;
    } catch (e) {
      l.err('Error checking health of database.', e);
      return false;
    }
  };
}

export default HealthService;
