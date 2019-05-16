import { Table, Model, DataType, Column, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Task from './task';
import User from './user';

@Table({
  timestamps: true,
  tableName: 'contribution',
})
class Contribution extends Model<Contribution> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: number;

  // TODO: Should be an ENUM
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string;

  // TODO: Could probably be refined...
  @Column({
    type: DataType.BLOB,
    allowNull: false,
  })
  data!: any;

  @BelongsTo(() => Task)
  task!: Task;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  task_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id!: number;
}

export default Contribution;
