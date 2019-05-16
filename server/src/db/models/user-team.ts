import { Table, Model, ForeignKey, Column, DataType } from 'sequelize-typescript';
import User from './user';
import Team from './team';
import CONSTANTS from '../../constants';
import { ValueOf } from 'types/utility';

const { STANDARD, ADMIN, LEADER, READONLY } = CONSTANTS.ROLE_TYPES;

@Table({
  timestamps: true,
  tableName: 'user_team',
})
class UserTeam extends Model<UserTeam> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id!: number;

  @ForeignKey(() => Team)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  team_id!: number;

  @Column({
    type: DataType.ENUM([STANDARD, ADMIN, LEADER, READONLY]),
    allowNull: false,
    defaultValue: STANDARD,
  })
  role!: ValueOf<typeof CONSTANTS.ROLE_TYPES>;
}

export default UserTeam;
