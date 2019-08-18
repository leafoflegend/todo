import { join } from 'path';

const enum UserTypes {
  ADMIN = 'USER_TYPE_ADMIN',
  LEADER = 'USER_TYPE_LEADER',
  STANDARD = 'USER_TYPE_STANDARD',
  READONLY = 'USER_TYPE_READONLY',
}

const enum RoleTypes {
  ADMIN = 'ROLE_TYPE_ADMIN',
  LEADER = 'ROLE_TYPE_LEADER',
  STANDARD = 'ROLE_TYPE_STANDARD',
  READONLY = 'ROLE_TYPE_READONLY',
}

const enum RedisValues {
  NO_USER = 'NO_USER',
}

const CONSTANTS = {
  SEQUELIZE: 'SEQUELIZE',
  REDIS: 'REDIS',
  TIMEOUTS: {
    REDIS: 10000,
  },
  USER_TYPES: {
    ADMIN: UserTypes.ADMIN,
    LEADER: UserTypes.LEADER,
    STANDARD: UserTypes.STANDARD,
    READONLY: UserTypes.READONLY,
  },
  ROLE_TYPES: {
    ADMIN: RoleTypes.ADMIN,
    LEADER: RoleTypes.LEADER,
    STANDARD: RoleTypes.STANDARD,
    READONLY: RoleTypes.READONLY,
  },
  AUTHENTICATION: {
    SALT_ROUNDS: 12,
  },
  DIST_PATH: {
    FOLDER: process.env.NODE_ENV === 'development'
      ? join(__dirname, '..', '..', '..', './client/dist')
      : join(__dirname, '..', './dist'),
  },
  REDIS_VALUES: {
    NO_USER: RedisValues.NO_USER,
  },
};

export { UserTypes, RoleTypes };
export default CONSTANTS;
