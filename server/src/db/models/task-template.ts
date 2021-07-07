import {
  Table,
  Column,
  DataType,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Task from './task';
import User from './user';
import Team from './team';
import AssignmentStage from './assignment-stage';
import Stage from './stage';

@Table({
  timestamps: true,
  tableName: 'task_template',
})
class TaskTemplate extends Model<TaskTemplate> {
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
  public name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public description!: string;

  @HasMany(() => TaskTemplate)
  public child_tasks!: TaskTemplate[];

  @BelongsTo(() => TaskTemplate)
  public parent_task!: TaskTemplate;

  @ForeignKey(() => TaskTemplate)
  @Column({
    type: DataType.UUID,
  })
  public parent_task_id!: number;

  @HasMany(() => Task)
  public created_tasks!: Task[];

  @BelongsTo(() => Stage)
  public stage!: Stage;

  @ForeignKey(() => Stage)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  public stage_id!: number;

  public createTask = async (taskObj: {
    stage: AssignmentStage;
    user?: User;
    team?: Team;
    parentTask?: TaskTemplate;
  }): Promise<Task> => {
    const { user, team, parentTask, stage } = taskObj;

    const taskConstructionObject: {
      name: string;
      description: string;
      task_template_id: number;
      assigned_to_id?: string;
      team_id?: number;
      stage_id: number;
    } = {
      name: this.name,
      description: this.description,
      task_template_id: this.id,
      stage_id: stage.id,
    };

    if (user) taskConstructionObject.assigned_to_id = user.id;
    if (team) taskConstructionObject.team_id = team.id;
    if (parentTask) taskConstructionObject.stage_id = parentTask.id;

    const toBeTask = new Task(taskConstructionObject);

    // TODO: Set createdTasks back to this.
    try {
      let myChildTasks = await TaskTemplate.findAll({
        where: {
          parent_task_id: this.id,
        },
      });

      if (myChildTasks) {
        if (!Array.isArray(myChildTasks)) {
          myChildTasks = [myChildTasks];
        }

        await Promise.all(
          myChildTasks.map(childTask => {
            return childTask.createTask({
              user,
              team,
              stage,
              parentTask: this,
            });
          }),
        );
      }

      return toBeTask.save();
    } catch (e) {
      // TODO: Better error handling.
      throw e;
    }
  };
}

export default TaskTemplate;
