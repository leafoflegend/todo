import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import User from './user';
import Task from './task';

@Table({
  timestamps: true,
  tableName: 'contributor',
})
class Contributor extends Model<Contributor> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public contributor_id!: number;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public task_id!: number;
}

export default Contributor;
