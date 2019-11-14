import { IMeasurement } from "../interfaces/interfaces";

/**
 * @todo
 */
export class Measurement implements IMeasurement {
  readonly createdAt: string;
  bodyWeight: number;
  bodyFat: number;
  /**
   * @todo @feature include other measurements like chest, arms, waist, etc.
   */

  constructor() {}
}
