import { Inject, Injectable } from '@nestjs/common';
import CONSTANTS from '../../../constants';
import { Logger } from '../../../utils';

const l = new Logger('health service');

@Injectable()
class HealthService {
  constructor(@Inject(CONSTANTS.SEQUELIZE) private readonly SEQUELIZE) {}

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
