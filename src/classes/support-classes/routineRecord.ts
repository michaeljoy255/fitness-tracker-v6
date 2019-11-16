import { IRoutineRecord } from "../../interfaces/interfaces";

/**
 * @todo
 */
export class RoutineRecord implements IRoutineRecord {
  readonly createdAt: Date;
  startTime: number;
  endTime: number;

  constructor(startTime: number, endTime: number) {
    this.createdAt = new Date();
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
