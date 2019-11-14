import { UnitPrefType } from "../enums/enums";
import {
  IUser,
  IExercise,
  IRoutine,
  IMeasurement
} from "../interfaces/interfaces";

/**
 * @todo
 */
export class User implements IUser {
  units: UnitPrefType;
  exercises: IExercise[];
  routines: IRoutine[];
  measurements: IMeasurement[];

  constructor() {}
}
