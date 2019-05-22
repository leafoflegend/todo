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
  public id!: number;

  // TODO: Should be an ENUM
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public type!: string;

  // TODO: Could probably be refined...
  @Column({
    type: DataType.BLOB,
    allowNull: false,
  })
  public data!: any;

  @BelongsTo(() => Task)
  public task!: Task;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public task_id!: number;

  @BelongsTo(() => User)
  public user!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public user_id!: number;
}

export default Contribution;
