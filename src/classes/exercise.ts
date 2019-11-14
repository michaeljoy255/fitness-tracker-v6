import { CategoryType, ExerciseType } from "../enums/enums";
import {
  IExercise,
  IInputs,
  IObjective,
  IExerciseRecord
} from "../interfaces/interfaces";

/**
 * @todo
 */
export class Exercise implements IExercise {
  id: string;
  name: ExerciseType;
  category: CategoryType;
  desc: string;
  inputs: IInputs[];
  objectives: IObjective[];
  exerciseRecords: IExerciseRecord[];

  constructor() {}
}
