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
  public id!: number;

  @BelongsTo(() => Stage)
  public stage!: Stage;

  @ForeignKey(() => Stage)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public stage_id!: number;

  @BelongsTo(() => Assignment)
  public assignment!: Assignment;

  @ForeignKey(() => Assignment)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public assignment_id!: number;

  @HasMany(() => Task)
  public tasks!: Task[];
}

export default AssignmentStage;
