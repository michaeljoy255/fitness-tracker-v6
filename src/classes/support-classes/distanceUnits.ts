import { IDistanceUnits } from "../../interfaces/interfaces";

/**
 * @todo
 */
export class DistanceUnits implements IDistanceUnits {
  miles: number;
  kilometers: number;

  constructor(miles: number, kilometers: number) {
    this.miles = miles;
    this.kilometers = kilometers;
  }
}
