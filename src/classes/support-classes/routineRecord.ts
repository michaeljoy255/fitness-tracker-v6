/**
 * @todo
 */
export class RoutineRecord {
  readonly createdAt: Date;
  startTime: number;
  endTime: number;

  constructor(startTime?: number, endTime?: number) {
    this.createdAt = new Date();
    this.startTime = startTime || null;
    this.endTime = endTime || null;
  }
}
