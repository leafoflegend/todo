import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import uuidv4 from 'uuid/v4';
import CONSTANTS from '../../../../constants';
import { ConstructableModel } from '../../../../../types/db';
import { Logger } from '../../../../utils';
import { SequelizeProvider } from '../../databases/sequelize';
import { RedisProvider } from '../../databases/redis';

const { SESSION_COOKE_NAME } = process.env;
const cookieName: string = SESSION_COOKE_NAME || 'SID';

const destroySession = async <M extends ConstructableModel>(
  sessionModel: M,
  sessionId: string,
  redisClient: RedisProvider['client'],
  res: Response,
) => {
  const mySession = await sessionModel.findByPk(sessionId);
  if (mySession) await mySession.destroy();
  await redisClient.asyncDel(sessionId);
  res.clearCookie(cookieName);
};

const createDestroySession = <M extends ConstructableModel>(
  sessionModel: M,
  sessionId: string,
  redisClient: RedisProvider['client'],
  res: Response,
): (() => Promise<void>) => {
  return async () => {
    await destroySession(sessionModel, sessionId, redisClient, res);
  };
};

const logger = new Logger('session middleware');

@Injectable()
class SessionMiddleware implements NestMiddleware {
  private readonly SEQUELIZE: SequelizeProvider;
  private readonly REDIS: RedisProvider;

  public constructor(@Inject(CONSTANTS.SEQUELIZE) SEQUELIZE, @Inject(CONSTANTS.REDIS) REDIS) {
    this.SEQUELIZE = SEQUELIZE;
    this.REDIS = REDIS;
  }

  public async use(req: Request, res: Response, next: Function) {
    const models = this.SEQUELIZE.models;

    if (req.cookies[cookieName]) {
      const sessionId: string = req.cookies[cookieName];

      const stringJSONSession: string = await this.REDIS.client.asyncGet(sessionId);

      const session: Request['session'] = {
        ...JSON.parse(stringJSONSession),
        destroy: createDestroySession<typeof models.Session>(
          this.SEQUELIZE.models.Session,
          sessionId,
          this.REDIS.client,
          res,
        ),
      };

      req.session = session;
    } else {
      const newSessionId = uuidv4();

      const createdSession = await models.Session.create({
        id: newSessionId,
      });

      const curTime = Date.now();

      const redisSession: string = JSON.stringify({
        timestamp: curTime,
        id: newSessionId,
        user: CONSTANTS.REDIS_VALUES.NO_USER,
      });
      await this.REDIS.client.asyncSet(newSessionId, redisSession);

      req.session = {
        id: newSessionId,
        timestamp: curTime,
        destroy: createDestroySession<typeof models.Session>(
          this.SEQUELIZE.models.Session,
          newSessionId,
          this.REDIS.client,
          res,
        ),
      };

      res.cookie(
        cookieName,
        newSessionId,
        {
          maxAge: 1000 * 60 * 60 * 24 * 31,
          path: '/',
          httpOnly: true,
        },
      );
    }

    next();
  }
}

export default SessionMiddleware;
