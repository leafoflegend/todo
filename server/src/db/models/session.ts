import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import User from './user';

@Table({
  timestamps: true,
  tableName: 'session',
})
class Session extends Model<Session> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: number;

  @HasOne(() => User)
  public user!: User;
}

export default Session;
