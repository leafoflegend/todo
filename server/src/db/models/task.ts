import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
  HasMany,
  BeforeCreate,
  BeforeUpdate,
  BelongsToMany,
  DefaultScope,
} from 'sequelize-typescript';
import { ValidationError } from 'sequelize';
import User from './user';
import Contributor from './contributor';
import Contribution from './contribution';
import Team from './team';
import Comment from './comment';
import AssignmentStage from './assignment-stage';
import UserWatcher from './user-task-watcher';
import TeamWatcher from './team-task-watcher';
import TaskTemplate from './task-template';

@DefaultScope({
  include: [
    {
      as: 'created_by',
      model: () => User,
    },
    {
      as: 'assigned_to',
      model: () => User,
    },
    {
      as: 'owned_by',
      model: () => User,
    },
  ],
})
@Table({
  timestamps: true,
  tableName: 'task',
})
class Task extends Model<Task> {
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
  name!: string;

  @Column({
    type: DataType.TEXT,
  })
  description!: string;

  @Column({
    type: DataType.DATE,
  })
  due_date!: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  complete!: boolean;

  @Column({
    type: DataType.DATE,
  })
  completed_date!: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  depth!: number;

  @BelongsTo(() => User, 'created_by_id')
  created_by!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  created_by_id!: number;

  @BelongsTo(() => User, 'assigned_to_id')
  assigned_to!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  assigned_to_id!: number;

  @BelongsTo(() => User, 'owned_by_id')
  owned_by!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  owned_by_id!: number;

  @BelongsToMany(() => User, () => UserWatcher)
  user_watchers!: User[];

  @BelongsToMany(() => Team, () => TeamWatcher)
  team_watchers!: Team[];

  @BelongsTo(() => Team)
  owning_team!: Team;

  @ForeignKey(() => Team)
  @Column({
    type: DataType.UUID,
  })
  team_id!: number;

  @BelongsToMany(() => User, () => Contributor)
  contributors!: Contributor[];

  @HasMany(() => Contribution)
  contributions!: Contribution[];

  @HasMany(() => Comment)
  comments!: Comment[];

  @HasMany(() => Task)
  child_tasks!: Task[];

  @BelongsTo(() => Task)
  parent_task!: Task;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
  })
  parent_task_id!: number;

  @BelongsTo(() => AssignmentStage)
  assignment_stage!: AssignmentStage;

  @ForeignKey(() => AssignmentStage)
  @Column({
    type: DataType.UUID,
  })
  assignment_stage_id!: number;

  @BelongsTo(() => TaskTemplate)
  based_on_task_template!: TaskTemplate;

  @ForeignKey(() => TaskTemplate)
  @Column({
    type: DataType.UUID,
  })
  task_template_id!: number;

  private static updateDepth = async (task: Task) => {
    if (task.parent_task_id) {
      try {
        const parentTask = await Task.findOne({
          where: {
            id: task.parent_task_id,
          },
        });

        if (!parentTask) {
          throw new ValidationError(
            `Cannot create/update a task using a parent_task_id that does not refer to an actual task. parent_task_id supplied: ${
              task.parent_task_id
            }`,
          );
        }

        task.depth = parentTask.depth + 1;
        return task;
      } catch (e) {
        if (e instanceof ValidationError) throw e;
        e.message = `Failure to fetch task from task table during validation. ${e.message}`;
        throw e;
      }
    }

    return task;
  };

  @BeforeCreate
  private static blockDepthAssignment = async (task: Task): Promise<Task> => {
    if (task.depth) {
      throw new ValidationError(
        `May not supply depth during creation to a task. depth supplied ${task.depth}.`,
      );
    }

    return await Task.updateDepth(task);
  };

  @BeforeUpdate
  private static findDepth = async (task: Task): Promise<Task> => {
    const attributeId = 'parent_task_id';

    if (!task.previous(attributeId) && task.changed(attributeId)) {
      return await Task.updateDepth(task);
    }

    return task;
  };
}

export default Task;
