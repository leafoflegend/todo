import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
  DefaultScope,
  Scopes,
  ForeignKey,
} from 'sequelize-typescript';
import { ValidationError } from 'sequelize';
import CONSTANTS, { UserTypes } from '../../constants';
import { createSalt, createHash, comparePassAndHash } from '../../utils';
import Team from './team';
import UserTeam from './user-team';
import Comment from './comment';
import Task from './task';
import Assignment from './assignment';
import Contribution from './contribution';
import Contributor from './contributor';
import UserAssignmentWatcher from './user-assignment-watcher';
import UserTaskWatcher from './user-task-watcher';
import Session from './session';
import Logger from '../../utils/logger';

const l = new Logger('user model');
const { ADMIN, LEADER, READONLY, STANDARD } = CONSTANTS.USER_TYPES;

class AuthenticationError extends Error {
  public constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

@DefaultScope({
  attributes: {
    exclude: ['password'],
  },
})
@Scopes({
  withPassword: {},
})
@Table({
  timestamps: true,
  tableName: 'user',
})
class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  })
  public email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public email_verified!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public phone_number!: string;

  @Column({
    type: DataType.ENUM<UserTypes>(ADMIN, LEADER, READONLY, STANDARD),
    allowNull: false,
    defaultValue: STANDARD,
  })
  public type!: UserTypes;

  @BelongsTo(() => Session)
  public session!: Session;

  @ForeignKey(() => Session)
  @Column({
    type: DataType.UUID,
  })
  public session_id!: number;

  @BelongsToMany(() => Team, () => UserTeam)
  public teams!: Team[];

  @BelongsToMany(() => Task, () => Contributor)
  public contributed_to_tasks!: Task[];

  @HasMany(() => Contribution)
  public contributions!: Contribution[];

  @HasMany(() => Task, 'created_by_id')
  public created_tasks!: Task[];

  @HasMany(() => Task, 'owned_by_id')
  public owned_tasks!: Task[];

  @HasMany(() => Task, 'assigned_to_id')
  public assigned_tasks!: Task[];

  @HasMany(() => Comment)
  public comments!: Comment[];

  @HasMany(() => Assignment)
  public assignments!: Assignment[];

  @BelongsToMany(() => Task, () => UserTaskWatcher)
  public watched_tasks!: Task[];

  @BelongsToMany(() => Assignment, () => UserAssignmentWatcher)
  public watched_assignments!: Assignment[];

  @BeforeCreate
  private static hashPassword = async (user: User): Promise<User> => {
    try {
      const salt = await createSalt();
      user.password = await createHash(user.password, salt);
    } catch (e) {
      throw new ValidationError(`Failed to create user. Error: ${e.message}`);
    }

    return user;
  };

  @BeforeUpdate
  private static reHashPassword = async (user: User): Promise<User> => {
    if (user.changed('password')) {
      try {
        const salt = await createSalt();
        user.password = await createHash(user.password, salt);
      } catch (e) {
        throw new ValidationError(`Failed to update user. Error: ${e.message}`);
      }
    }

    return user;
  };

  public static authenticateUser = async (loginInfo: {
    email: string;
    password: string;
  }): Promise<User> => {
    const { email, password } = loginInfo;

    try {
      const user = await User.scope('withPassword').findOne({
        where: {
          email,
        },
      });

      if (user) {
        await comparePassAndHash(password, user.password);
        return user;
      }

      throw new Error('User not found!');
    } catch (e) {
      throw new AuthenticationError(`Failed to authenticate user. Error: ${e.message}`);
    }
  };

  public associateSession = async (sessionId): Promise<Session> => {
    // TODO: This should be a transaction block.
    try {
      let decidedSession: Session;
      const newSession = await Session.findByPk(sessionId);

      if (!newSession) throw new Error(`Current session not found for sessionId ${sessionId}`);

      if (this.session_id) {
        const restoreSession = await Session.findByPk(this.session_id);

        if (!restoreSession) {
          l.info(`While attempting to restore a users session ${this.session_id}, the session could not be discovered. Going to associate the new session ${sessionId} instead.`);
          decidedSession = newSession;
        } else {
          await newSession.destroy();
          decidedSession = restoreSession;
        }
      } else {
        decidedSession = newSession;
      }

      await this.update({
        session_id: decidedSession.id,
      });

      return decidedSession;
    } catch (e) {
      l.err(`Failed to associate session to user ${this.id}.`, e.message);
      throw e;
    }
  };
}

export default User;
