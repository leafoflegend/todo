import redis, { RedisClient } from 'redis';
import { promisify } from 'util';
import CONSTANTS from '../../../constants';
import { Logger } from '../../../utils';

export interface PromisifiedRedisClient extends RedisClient {
  asyncGet: (key: string) => Promise<string>;
  asyncSet: (key: string, value: string) => Promise<unknown>;
  asyncDel: (key: string) => Promise<number>;
}

export interface RedisProvider {
  client: PromisifiedRedisClient;
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

      const promisifiedRedisClient: PromisifiedRedisClient = resolvedRedisClient as PromisifiedRedisClient;
      promisifiedRedisClient.asyncGet = promisify(resolvedRedisClient.get).bind(
        resolvedRedisClient,
      );
      promisifiedRedisClient.asyncSet = promisify(resolvedRedisClient.set).bind(
        resolvedRedisClient,
      );
      promisifiedRedisClient.asyncDel = promisify(resolvedRedisClient.del).bind(
        resolvedRedisClient,
      );

      return {
        client: promisifiedRedisClient,
      };
    } catch (e) {
      l.err('Error creating redis client.', e);

      throw e;
    }
  },
};

export default sequelizeProvider;
