import {
  Table,
  Model,
  DataType,
  Column,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import Process from './process';
import AssignmentStage from './assignment-stage';
import TaskTemplate from './task-template';

@Table({
  timestamps: true,
  tableName: 'stage',
})
class Stage extends Model<Stage> {
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

  @BelongsTo(() => Process)
  public process!: Process;

  @ForeignKey(() => Process)
  @Column({
    type: DataType.UUID,
  })
  public process_id!: number;

  @HasMany(() => AssignmentStage)
  public assignment_stages!: AssignmentStage[];

  @HasMany(() => TaskTemplate)
  public templated_tasks!: TaskTemplate[];
}

export default Stage;
