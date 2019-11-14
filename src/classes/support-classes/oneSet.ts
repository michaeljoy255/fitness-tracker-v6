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

  constructor() {}
}
