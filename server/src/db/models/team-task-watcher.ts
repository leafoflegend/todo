import { Table, Column, DataType, Model, ForeignKey } from 'sequelize-typescript';
import Team from './team';
import Task from './task';

@Table({
  timestamps: true,
  tableName: 'team_task_watcher',
})
class TeamTaskWatcher extends Model<TeamTaskWatcher> {
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

  @ForeignKey(() => Team)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public team_id!: number;
}

export default TeamTaskWatcher;
