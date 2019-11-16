/**
 * @todo
 */
export class Measurement {
  readonly createdAt: Date;
  bodyWeight: number;
  bodyFat: number;
  /**
   * @todo @feature include other measurements like chest, arms, waist, etc.
   */

  constructor(bodyWeight: number, bodyFat: number) {
    this.createdAt = new Date();
    this.bodyWeight = bodyWeight || null;
    this.bodyFat = bodyFat || null;
  }
}
