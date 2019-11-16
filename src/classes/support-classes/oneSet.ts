import { DistanceUnits } from "./distanceUnits";
import { WeightUnits } from "./weightUnits";

/**
 * @todo
 */
export class OneSet {
  duration: string; // hours : minutes : seconds
  distance: DistanceUnits; // DistanceUnits
  weight: WeightUnits; // WeightUnits
  reps: number;

  constructor({
    duration = null,
    distance = null,
    weight = null,
    reps = null
  } = {}) {
    this.duration = duration;
    this.distance = distance;
    this.weight = weight;
    this.reps = reps;
  }
}
