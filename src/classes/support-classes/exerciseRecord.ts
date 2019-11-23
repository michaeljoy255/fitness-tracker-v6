import { OneSet } from "./oneSet";

/**
 * @todo
 */
export class ExerciseRecord {
  readonly createdAt: string;
  sets: OneSet[];

  constructor({ sets = [] } = {}) {
    this.createdAt = new Date().toISOString();
    this.sets = sets;
  }
}
