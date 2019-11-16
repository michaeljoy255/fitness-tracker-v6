import { CategoryType, ExerciseType } from "../enums/enums";
import { Inputs } from "./support-classes/inputs";
import { Objective } from "./support-classes/objective";
import { ExerciseRecord } from "./support-classes/exerciseRecord";
import uuid from "uuid";

/**
 * @todo
 */
export class Exercise {
  readonly id: string;
  name: ExerciseType;
  category: CategoryType;
  desc: string;
  inputs: Inputs[];
  objectives: Objective[];
  exerciseRecords: ExerciseRecord[];

  constructor(
    name: ExerciseType,
    category: CategoryType,
    desc: string,
    inputs: Inputs[],
    objectives: Objective[],
    exerciseRecords?: ExerciseRecord[]
  ) {
    this.id = uuid.v4();
    this.name = name;
    this.category = category || null;
    this.desc = desc || "";
    this.inputs = inputs || null;
    this.objectives = objectives || null;
    this.exerciseRecords = exerciseRecords || [];
  }
}
