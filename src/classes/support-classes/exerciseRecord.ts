import { OneSet } from "./oneSet";

/**
 * @todo
 */
export class ExerciseRecord {
  readonly createdAt: Date;
  sets: OneSet[];

  constructor(sets: OneSet[]) {
    this.createdAt = new Date();
    this.sets = sets;
  }
}
