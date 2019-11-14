import {
  UnitPrefType,
  CategoryType,
  ObjectiveType,
  ExerciseType
} from "../enums/enums";

/**
 * @todo
 */
export interface IExercise {
  readonly id: string;
  name: ExerciseType;
  category: CategoryType;
  desc: string;
  inputs: IInputs[];
  objectives: IObjective[];
  exerciseRecords: IExerciseRecord[];
}

/**
 * @todo
 */
export interface IInputs {
  hasNotes: boolean; // 1 input
  hasDuration: boolean; // 3 inputs (H : M : S)
  hasDistance: boolean; // 1 input
  hasWeight: boolean; // 1 input
  hasReps: boolean; // 1 input
}

/**
 * @todo
 */
export interface IObjective {
  type: ObjectiveType;
  text: string;
}

/**
 * @todo
 */
export interface IExerciseRecord {
  readonly createdAt: string;
  sets: IOneSet[];
}

/**
 * @todo
 */
export interface IOneSet {
  duration: string; // hours : minutes : seconds
  distance: IDistanceUnits;
  weight: IWeightUnits;
  reps: number;
}

/**
 * @todo
 */
export interface IWeightUnits {
  pounds: number;
  kilograms: number;
}

/**
 * @todo
 */
export interface IDistanceUnits {
  miles: number;
  kilometers: number;
}

/**
 * @todo
 */
export interface IRoutine {
  readonly id: string;
  name: string;
  exerciseIds: string[];
  routineRecords: IRoutineRecord[];
}

/**
 * @todo
 */
export interface IRoutineRecord {
  readonly createdAt: string;
  startTime: number;
  endTime: number;
}

/**
 * @todo
 */
export interface IMeasurement {
  readonly createdAt: string;
  bodyWeight: number;
  bodyFat: number;
}

/**
 * @todo
 */
export interface IUser {
  units: UnitPrefType;
  exercises: IExercise[];
  routines: IRoutine[];
  measurements: IMeasurement[];
}
