import {
  IOneSet,
  IDistanceUnits,
  IWeightUnits
} from "../../interfaces/interfaces";

/**
 * @todo
 */
export class OneSet implements IOneSet {
  duration: string; // hours : minutes : seconds
  distance: IDistanceUnits; // DistanceUnits
  weight: IWeightUnits; // WeightUnits
  reps: number;

  constructor(
    duration: string,
    distance: IDistanceUnits,
    weight: IWeightUnits,
    reps: number
  ) {
    this.duration = duration;
    this.distance = distance;
    this.weight = weight;
    this.reps = reps;
  }
}
