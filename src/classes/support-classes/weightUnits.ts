import { IWeightUnits } from "../../interfaces/interfaces";

/**
 * @todo
 */
export class WeightUnits implements IWeightUnits {
  pounds: number;
  kilograms: number;

  constructor(pounds: number, kilograms: number) {
    this.pounds = pounds;
    this.kilograms = kilograms;
  }
}
