import { Model } from 'sequelize-typescript';

export type ConstructableModel = (new () => Model<unknown, unknown>) & typeof Model;
