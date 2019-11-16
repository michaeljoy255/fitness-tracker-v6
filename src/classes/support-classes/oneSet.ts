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

  constructor(
    duration?: string,
    distance?: DistanceUnits,
    weight?: WeightUnits,
    reps?: number
  ) {
    this.duration = duration || null;
    this.distance = distance || null;
    this.weight = weight || null;
    this.reps = reps || null;
  }
}
