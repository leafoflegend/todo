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
    defaultValue: DataType.UUIDV4,
  })
  id!: number;

  @HasOne(() => User)
  user!: User;
}

export default Session;
