import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Moment } from 'moment';
import Assignment from './assignment';
import AssignmentStage from './assignment-stage';
import Stage from './stage';
import Team from './team';
import User from './user';
import TaskTemplate from './task-template';
import { Logger } from '../../utils';
import moment = require('moment');

const l = new Logger('process model');

@Table({
  timestamps: true,
  tableName: 'process',
})
class Process extends Model<Process> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  public description!: string;

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    allowNull: false,
    defaultValue: [],
  })
  public order_of_stages!: number[];

  @BelongsTo(() => Team)
  public team!: Team;

  @ForeignKey(() => Team)
  @Column({
    type: DataType.UUID,
  })
  public team_id!: number;

  @HasMany(() => Assignment)
  public assignments!: Assignment[];

  @HasMany(() => Stage)
  public stages!: Stage[];

  public createAssignment = async (assignmentObj: {
    name: string;
    description: string;
    user: User;
    dueDate?: Moment;
  }): Promise<Assignment> => {
    const { name, description, user } = assignmentObj;
    const due_date = assignmentObj.dueDate || moment().add(1, 'years');
    try {
      let processStages = await Stage.findAll({
        where: {
          process_id: this.id,
        },
      });

      if (!Array.isArray(processStages)) processStages = [processStages];

      const toBeAssignment = new Assignment({
        name,
        description,
        due_date,
        assigned_user_id: user.id,
        process_id: this.id,
      });

      const createdAssignment = await toBeAssignment.save();

      const assignmentStageToBeCreated: PromiseLike<AssignmentStage>[] = [];
      const assignmentStageTaskMap: { [stage_id: string]: TaskTemplate[] } = {};

      for (let i = 0; i < processStages.length; ++i) {
        const processStage = processStages[i];

        let stageTasks = await TaskTemplate.findAll({
          where: {
            stage_id: processStage.id,
          },
        });

        if (!stageTasks) stageTasks = [];
        else if (!Array.isArray(stageTasks)) stageTasks = [stageTasks];

        assignmentStageTaskMap[processStage.id] = stageTasks;

        const toBeAssignmentStage = new AssignmentStage({
          stage_id: processStage.id,
          assignment_id: createdAssignment.id,
        });

        assignmentStageToBeCreated.push(toBeAssignmentStage.save());
      }

      const assignmentStages = await Promise.all(assignmentStageToBeCreated);

      await Promise.all(
        assignmentStages.map(assignmentStage => {
          const assignmentStageTasks = assignmentStageTaskMap[assignmentStage.stage_id];

          return Promise.all(
            assignmentStageTasks.map(assignmentStageTask => {
              return assignmentStageTask.createTask({ user, stage: assignmentStage });
            }),
          );
        }),
      );

      return createdAssignment;
    } catch (e) {
      // TODO: If failure occurs after assignment creation, should catch delete the assignment?
      l.err(e.stack);
      throw new Error(`Failed to create assignment from process. Error: ${e.message}`);
    }
  };
}

export default Process;
