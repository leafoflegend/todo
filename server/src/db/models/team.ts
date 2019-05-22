import { Table, Column, DataType, Model, BelongsToMany, HasMany } from 'sequelize-typescript';
import UserTeam from './user-team';
import User from './user';
import Task from './task';
import Assignment from './assignment';
import TeamAssignmentWatcher from './team-assignment-watcher';
import TeamTaskWatcher from './team-task-watcher';

@Table({
  timestamps: true,
  tableName: 'team',
})
class Team extends Model<Team> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name!: string;

  @BelongsToMany(() => User, () => UserTeam)
  public users!: User[];

  @HasMany(() => Task)
  public owned_tasks!: Task[];

  @HasMany(() => Assignment)
  public assignments!: Assignment[];

  @BelongsToMany(() => Task, () => TeamTaskWatcher)
  public watched_tasks!: Task[];

  @BelongsToMany(() => Assignment, () => TeamAssignmentWatcher)
  public assignment_tasks!: Task[];
}

export default Team;
