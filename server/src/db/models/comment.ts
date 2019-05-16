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
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id!: number;

  @HasMany(() => Comment, 'parent_comment_id')
  child_comments!: Comment[];

  @BelongsTo(() => Comment, 'parent_comment_id')
  parent_comment!: Comment;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.UUID,
  })
  parent_comment_id!: number;

  @BelongsTo(() => Task)
  task!: Task;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
  })
  task_id!: number;
}

export default Comment;
