import { UnitPrefType } from "../enums/enums";
import { Exercise } from "../classes/exercise";
import { Routine } from "../classes/routine";
import { Measurement } from "../classes/measurement";

/**
 * @todo
 */
export class User {
  units: UnitPrefType;
  exercises: Exercise[];
  routines: Routine[];
  measurements: Measurement[];

  constructor(
    units: UnitPrefType,
    exercises?: Exercise[],
    routines?: Routine[],
    measurements?: Measurement[]
  ) {
    this.units = units;
    this.exercises = exercises || [];
    this.routines = routines || [];
    this.measurements = measurements || [];
  }
}
