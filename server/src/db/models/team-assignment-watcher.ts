import { Table, Column, DataType, Model, ForeignKey } from 'sequelize-typescript';
import Team from './team';
import Assignment from './assignment';

@Table({
  timestamps: true,
  tableName: 'team_assignment_watcher',
})
class TeamAssignmentWatcher extends Model<TeamAssignmentWatcher> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id!: number;

  @ForeignKey(() => Assignment)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public assignment_id!: number;

  @ForeignKey(() => Team)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public team_id!: number;
}

export default TeamAssignmentWatcher;
