import {
  Table,
  Model,
  DataType,
  Column,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import Stage from './stage';
import Task from './task';
import Assignment from './assignment';

@Table({
  timestamps: true,
  tableName: 'assignment_stage',
})
class AssignmentStage extends Model<AssignmentStage> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: number;

  @BelongsTo(() => Stage)
  stage!: Stage;

  @ForeignKey(() => Stage)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  stage_id!: number;

  @BelongsTo(() => Assignment)
  assignment!: Assignment;

  @ForeignKey(() => Assignment)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  assignment_id!: number;

  @HasMany(() => Task)
  tasks!: Task[];
}

export default AssignmentStage;
