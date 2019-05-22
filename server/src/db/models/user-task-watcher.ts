import { Table, Column, DataType, Model, ForeignKey } from 'sequelize-typescript';
import User from './user';
import Task from './task';

@Table({
  timestamps: true,
  tableName: 'user_assignment_watcher',
})
class UserTaskWatcher extends Model<UserTaskWatcher> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id!: number;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public task_id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public user_id!: number;
}

export default UserTaskWatcher;
