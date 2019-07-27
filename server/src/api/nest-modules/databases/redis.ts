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
      let resolvedRedisClient: RedisClient;

      if (!process.env.REDIS_URL) {
        resolvedRedisClient = await redis.createClient({
          host: process.env.REDIS_HOST || 'localhost',
          password: process.env.REDIS_PASSWORD || undefined,
        });
      } else {
        resolvedRedisClient = await redis.createClient(process.env.REDIS_URL);
      }

      const redisReady = new Promise((res, rej) => {
        resolvedRedisClient.ping(e => {
          if (e) {
            l.err('Error checking health of redis', e);
            rej(e);
          }

          res(true);
        });
      });

      await redisReady;

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
