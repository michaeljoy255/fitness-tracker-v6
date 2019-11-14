import { IExerciseRecord, IOneSet } from "../../interfaces/interfaces";

/**
 * @todo
 */
export class ExerciseRecord implements IExerciseRecord {
  readonly createdAt: string;
  sets: IOneSet[];

  constructor() {}
}
