import { Table, Column, DataType, Model, ForeignKey } from 'sequelize-typescript';
import User from './user';
import Assignment from './assignment';

@Table({
  timestamps: true,
  tableName: 'user_assignment_watcher',
})
class UserAssignmentWatcher extends Model<UserAssignmentWatcher> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id!: number;

  @ForeignKey(() => Assignment)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public assignment_id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public user_id!: number;
}

export default UserAssignmentWatcher;
