import { OneSet } from "./oneSet";

/**
 * @todo
 */
export class ExerciseRecord {
  readonly createdAt: Date;
  sets: OneSet[];

  constructor({ sets = [] } = {}) {
    this.createdAt = new Date();
    this.sets = sets;
  }
}
