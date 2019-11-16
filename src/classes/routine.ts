import { IRoutine, IRoutineRecord } from "../interfaces/interfaces";
import uuid from "uuid";

/**
 * @todo
 */
export class Routine implements IRoutine {
  readonly id: string;
  name: string;
  exerciseIds: string[];
  routineRecords: IRoutineRecord[];

  constructor(
    name: string,
    exerciseIds: string[],
    routineRecords: IRoutineRecord[]
  ) {
    this.id = uuid.v4();
    this.name = name;
    this.exerciseIds = exerciseIds;
    this.routineRecords = routineRecords;
  }
}
