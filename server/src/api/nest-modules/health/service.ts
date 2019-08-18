import { Inject, Injectable } from '@nestjs/common';
import CONSTANTS from '../../../constants';
import { Logger } from '../../../utils';
import { SequelizeProvider } from '../databases/sequelize';
import { RedisProvider } from '../databases/redis';

const l = new Logger('health service');

@Injectable()
class HealthService {
  private readonly SEQUELIZE: SequelizeProvider;
  private readonly REDIS: RedisProvider;

  public constructor(
    @Inject(CONSTANTS.SEQUELIZE) SEQUELIZE,
    @Inject(CONSTANTS.REDIS) REDIS,
  ) {
    this.SEQUELIZE = SEQUELIZE;
    this.REDIS = REDIS;
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

  public checkRedisHealth = async (): Promise<boolean> => {
    const isReadyPromise = new Promise<boolean>((res, rej) => {
      this.REDIS.client.ping(e => {
        if (e) {
          l.err('Error checking health of redis', e);
          rej(e);
        }

        res(true);
      });
    });

    const timeoutPromise = new Promise<boolean>(res => {
      setTimeout(() => res(false), CONSTANTS.TIMEOUTS.REDIS);
    });

    try {
      const isReady = await Promise.race([isReadyPromise, timeoutPromise]);

      return isReady;
    } catch (e) {
      return false;
    }
  };
}

export default HealthService;
