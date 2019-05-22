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
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public description!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public complete!: boolean;

  @Column({
    type: DataType.DATE,
  })
  public completed_date!: Date;

  @Column({
    type: DataType.DATE,
  })
  public due_date!: Date;

  @HasMany(() => AssignmentStage)
  public assignment_stages!: AssignmentStage[];

  @BelongsTo(() => Process)
  public process!: Process;

  @ForeignKey(() => Process)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public process_id!: number;

  @BelongsTo(() => User)
  public user!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public assigned_user_id!: number;

  @BelongsTo(() => Team)
  public team!: Team;

  @ForeignKey(() => Team)
  @Column({
    type: DataType.UUID,
  })
  public assigned_team_id!: Team;

  @BelongsToMany(() => User, () => UserWatcher)
  public user_watchers!: User[];

  @BelongsToMany(() => Team, () => TeamWatcher)
  public team_watchers!: Team[];
}

export default Assignment;
