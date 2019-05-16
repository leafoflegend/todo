import db from './db';
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
import { Sequelize } from 'sequelize-typescript';

const l = new Logger('root db');

const setupDb = (force: boolean = false, seed: boolean = false): Promise<Sequelize> => {
  if (force) l.info('forcing database wipe.');
  if (seed) l.info('running seeding operation.');

  return new Promise((res, rej) => {
    l.info('Beginning connection to DB.');

    db.sync({ force })
      .then(() => db.authenticate())
      .then(() => {
        l.info('Successfully connected to DB.');
        if (!seed) {
          res(db);
        } else {
          return seedData();
        }
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

class DBManager {
  initialized: boolean;
  db: null | Sequelize;
  constructor() {
    this.initialized = false;
    this.db = null;
  }

  setup = async (force: boolean = false, seed: boolean = false): Promise<Sequelize> => {
    if (this.db) return this.db;
    try {
      const db = await setupDb(force, seed);
      this.db = db;

      return db;
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

const dbManager = new DBManager();

export { setupDb, dbManager, models };
