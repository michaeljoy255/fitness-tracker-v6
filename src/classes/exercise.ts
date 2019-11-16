import { CategoryType, ExerciseType } from "../enums/enums";
import {
  IExercise,
  IInputs,
  IObjective,
  IExerciseRecord
} from "../interfaces/interfaces";
import uuid from "uuid";

/**
 * @todo
 */
export class Exercise implements IExercise {
  readonly id: string;
  name: ExerciseType;
  category: CategoryType;
  desc: string;
  inputs: IInputs[];
  objectives: IObjective[];
  exerciseRecords: IExerciseRecord[];

  constructor(
    name: ExerciseType,
    category: CategoryType,
    desc: string,
    inputs: IInputs[],
    objectives: IObjective[],
    exerciseRecords: IExerciseRecord[]
  ) {
    this.id = uuid.v4();
    this.name = name;
    this.category = category;
    this.desc = desc;
    this.inputs = inputs;
    this.objectives = objectives;
    this.exerciseRecords = exerciseRecords;
  }
}
