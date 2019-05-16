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
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @BelongsToMany(() => User, () => UserTeam)
  users!: User[];

  @HasMany(() => Task)
  owned_tasks!: Task[];

  @HasMany(() => Assignment)
  assignments!: Assignment[];

  @BelongsToMany(() => Task, () => TeamTaskWatcher)
  watched_tasks!: Task[];

  @BelongsToMany(() => Assignment, () => TeamAssignmentWatcher)
  assignment_tasks!: Task[];
}

export default Team;
