import redis, { RedisClient } from 'redis';
import CONSTANTS from '../../../constants';
import { Logger } from '../../../utils';

export interface RedisProvider {
  redis: RedisClient;
}

const l = new Logger('redis module');

const sequelizeProvider = {
  provide: CONSTANTS.REDIS,
  useFactory: async (): Promise<RedisProvider> => {
    try {
      const resolvedRedisClient = await redis.createClient({
        host: process.env.REDIS_HOST || 'localhost',
      });

      return {
        redis: resolvedRedisClient,
      };
    } catch (e) {
      l.err('Error creating redis client.', e);

      throw e;
    }
  },
};

export default sequelizeProvider;
