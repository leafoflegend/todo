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

  @BelongsTo(() => Process)
  process!: Process;

  @ForeignKey(() => Process)
  @Column({
    type: DataType.UUID,
  })
  process_id!: number;

  @HasMany(() => AssignmentStage)
  assignment_stages!: AssignmentStage[];

  @HasMany(() => TaskTemplate)
  templated_tasks!: TaskTemplate[];
}

export default Stage;
