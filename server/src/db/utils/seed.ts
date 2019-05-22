import { install } from 'source-map-support';
import { Logger } from '../../utils';
import CONSTANTS from '../../constants';
import Assignment from '../models/assignment';
import Process from '../models/process';
import Stage from '../models/stage';
import TaskTemplate from '../models/task-template';
import Team from '../models/team';
import User from '../models/user';
import taskDescriptions from '../data/task-description.json';
install();
import moment = require('moment');

// @ts-ignore
const taskText = taskDescriptions.weekendAssignmentOne.description;

const { ADMIN, LEADER, STANDARD } = CONSTANTS.USER_TYPES;
const l = new Logger('seed function');

const generateUsersAndTeams = async (): Promise<[User, User, User, Team, Team]> => {
  const toBeEliot = new User({
    name: 'Eliot Szwajkowski',
    email: 'eliotpszw@gmail.com',
    type: ADMIN,
    password: 'cool_guy',
    phone_number: '9176341811',
  });

  const toBeProf = new User({
    name: 'Eric Katz',
    email: 'ericpkatz@gmail.com',
    type: LEADER,
    password: 'also_cool_guy',
    phone_number: '9171112222',
  });

  const toBeStudent = new User({
    name: 'Student McStudentface',
    email: 'student@student.com',
    type: STANDARD,
    password: '123',
    phone_number: '9173334444',
  });

  const toBeInstructors = new Team({
    name: 'Instructors',
  });

  const toBeStudents = new Team({
    name: 'Students',
  });

  try {
    const [eliot, prof, student, instructors, students] = await Promise.all([
      toBeEliot.save(),
      toBeProf.save(),
      toBeStudent.save(),
      toBeInstructors.save(),
      toBeStudents.save(),
    ]);

    await Promise.all([
      instructors.$add<User>('user', eliot),
      instructors.$add<User>('user', prof),
      students.$add<User>('user', student),
    ]);

    return [eliot, prof, student, instructors, students];
  } catch (e) {
    l.err('Failure seeding users and teams.');
    throw e;
  }
};

const generateProcessesAndStages = async (): Promise<[Process, Stage, Stage]> => {
  const toBeSimpleProcess = new Process({
    name: 'Homework',
    description: 'You must do the prescribed work, and then submit it.',
  });

  const toBeWork = new Stage({
    name: 'Assignment',
    description: 'The meta of doing work.',
  });

  const toBeSubmitted = new Stage({
    name: 'Submitted',
    description: 'The meta of completion.',
  });

  try {
    const [simpleProcess, work, submission] = await Promise.all([
      toBeSimpleProcess.save(),
      toBeWork.save(),
      toBeSubmitted.save(),
    ]);

    const toBeTaskWork = new TaskTemplate({
      name: 'Weekend Assignment 1',
      description: taskText,
      stage_id: work.id,
    });

    const toBeTaskSubmission = new TaskTemplate({
      name: 'Push to GitHub',
      description: 'Please push your work to GitHub.',
      stage_id: submission.id,
    });

    await Promise.all([toBeTaskWork.save(), toBeTaskSubmission.save()]);

    await Promise.all([
      simpleProcess.$add<Stage>('stage', work),
      simpleProcess.$add<Stage>('stage', submission),
    ]);

    return [simpleProcess, work, submission];
  } catch (e) {
    l.err('Failure seeding processes, task templates, and stages.');
    throw e;
  }
};

const seedData = async (): Promise<boolean> => {
  try {
    const [eliot, prof, student, instructors, students] = await generateUsersAndTeams();
    const [simpleProcess, work, submission] = await generateProcessesAndStages();
    simpleProcess.$set<Team>('team', instructors);

    await simpleProcess.update({
      order_of_stages: [work.id, submission.id],
    });

    const firstHomework = await simpleProcess.createAssignment({
      name: 'Weekend Assignment One',
      description: 'The first weekend assignment for the Flex class.',
      dueDate: moment().add(1, 'week'),
      user: student,
    });

    l.info('Successfully seeded DB.');
    return true;
  } catch (e) {
    l.err('Failure in seed func');
    l.err(e);
    return false;
  }
};

export default seedData;
