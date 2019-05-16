import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
  BeforeCreate,
  BeforeUpdate,
  DefaultScope,
  Scopes,
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

const { ADMIN, LEADER, READONLY, STANDARD } = CONSTANTS.USER_TYPES;

class AuthenticationError extends Error {
  constructor(message) {
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
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  email_verified!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number!: string;

  @Column({
    type: DataType.ENUM([ADMIN, LEADER, READONLY, STANDARD]),
    allowNull: false,
    defaultValue: STANDARD,
  })
  type!: UserTypes;

  @BelongsToMany(() => Team, () => UserTeam)
  teams!: Team[];

  @BelongsToMany(() => Task, () => Contributor)
  contributed_to_tasks!: Task[];

  @HasMany(() => Contribution)
  contributions!: Contribution[];

  @HasMany(() => Task, 'created_by_id')
  created_tasks!: Task[];

  @HasMany(() => Task, 'owned_by_id')
  owned_tasks!: Task[];

  @HasMany(() => Task, 'assigned_to_id')
  assigned_tasks!: Task[];

  @HasMany(() => Comment)
  comments!: Comment[];

  @HasMany(() => Assignment)
  assignments!: Assignment[];

  @BelongsToMany(() => Task, () => UserTaskWatcher)
  watched_tasks!: Task[];

  @BelongsToMany(() => Assignment, () => UserAssignmentWatcher)
  watched_assignments!: Assignment[];

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
  }): Promise<boolean> => {
    const { email, password } = loginInfo;

    try {
      const user = await User.scope('withPassword').findOne({
        where: {
          email,
        },
      });

      if (user) {
        return comparePassAndHash(password, user.password);
      }

      return false;
    } catch (e) {
      throw new AuthenticationError(`Failed to authenticate user. Error: ${e.message}`);
    }
  };
}

export default User;
