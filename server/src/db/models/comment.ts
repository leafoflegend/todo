import {
  Table,
  Model,
  DataType,
  Column,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import User from './user';
import Task from './task';

@Table({
  timestamps: true,
  tableName: 'comment',
})
class Comment extends Model<Comment> {
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
  public content!: string;

  @BelongsTo(() => User)
  public user!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public user_id!: number;

  @HasMany(() => Comment, 'parent_comment_id')
  public child_comments!: Comment[];

  @BelongsTo(() => Comment, 'parent_comment_id')
  public parent_comment!: Comment;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.UUID,
  })
  public parent_comment_id!: number;

  @BelongsTo(() => Task)
  public task!: Task;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
  })
  public task_id!: number;
}

export default Comment;
