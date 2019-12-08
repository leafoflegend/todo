import Assignment from './models/assignment';
import AssignmentStage from './models/assignment-stage';
import Comment from './models/comment';
import Contribution from './models/contribution';
import Contributor from './models/contributor';
import Process from './models/process';
import Session from './models/session';
import Stage from './models/stage';
import Task from './models/task';
import Team from './models/team';
import User from './models/user';
import UserTeam from './models/user-team';
import DBManager from './db';

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
  Session,
};

export { DBManager, models };
