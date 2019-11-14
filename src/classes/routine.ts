import { IRoutine, IRoutineRecord } from "../interfaces/interfaces";

/**
 * @todo
 */
export class Routine implements IRoutine {
  id: string;
  name: string;
  exerciseIds: string[];
  routineRecords: IRoutineRecord[];

  constructor() {}
}
