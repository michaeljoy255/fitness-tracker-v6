import { IExerciseRecord, IOneSet } from "../../interfaces/interfaces";

/**
 * @todo
 */
export class ExerciseRecord implements IExerciseRecord {
  readonly createdAt: Date;
  sets: IOneSet[];

  constructor(sets: IOneSet[]) {
    this.createdAt = new Date();
    this.sets = sets;
  }
}
