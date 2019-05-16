import {
  Table,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import AssignmentStage from './assignment-stage';
import User from './user';
import Team from './team';
import Process from './process';
import UserWatcher from './user-assignment-watcher';
import TeamWatcher from './team-assignment-watcher';

@Table({
  timestamps: true,
  tableName: 'assignment',
})
class Assignment extends Model<Assignment> {
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
  })
  description!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  complete!: boolean;

  @Column({
    type: DataType.DATE,
  })
  completed_date!: Date;

  @Column({
    type: DataType.DATE,
  })
  due_date!: Date;

  @HasMany(() => AssignmentStage)
  assignment_stages!: AssignmentStage[];

  @BelongsTo(() => Process)
  process!: Process;

  @ForeignKey(() => Process)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  process_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  assigned_user_id!: number;

  @BelongsTo(() => Team)
  team!: Team;

  @ForeignKey(() => Team)
  @Column({
    type: DataType.UUID,
  })
  assigned_team_id!: Team;

  @BelongsToMany(() => User, () => UserWatcher)
  user_watchers!: User[];

  @BelongsToMany(() => Team, () => TeamWatcher)
  team_watchers!: Team[];
}

export default Assignment;
