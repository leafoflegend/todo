import { Sequelize } from 'sequelize-typescript';
import getConnection from './db';
import Assignment from './models/assignment';
import AssignmentStage from './models/assignment-stage';
import Comment from './models/comment';
import Contribution from './models/contribution';
import Contributor from './models/contributor';
import Process from './models/process';
import Stage from './models/stage';
import Task from './models/task';
import Team from './models/team';
import User from './models/user';
import UserTeam from './models/user-team';
import { Logger } from '../utils';
import { seedData } from './utils';

const l = new Logger('root db');

let firstResolvedDb: Sequelize;

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

const models = {
  Assignment,
  AssignmentStage,
  Comment,
  Contribution,
  Contributor,
  Process,
  Stage,
  Task,
  Team,
  User,
  UserTeam,
};

export { DBManager, models };
