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

  constructor({ bodyWeight = null, bodyFat = null } = {}) {
    this.createdAt = new Date();
    this.bodyWeight = bodyWeight;
    this.bodyFat = bodyFat;
  }
}
