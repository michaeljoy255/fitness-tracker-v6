import { IRoutineRecord } from "../../interfaces/interfaces";

/**
 * @todo
 */
export class RoutineRecord implements IRoutineRecord {
  readonly createdAt: string;
  startTime: number;
  endTime: number;

  constructor() {}
}
