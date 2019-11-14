import { ObjectiveType } from "../../enums/enums";
import { IObjective } from "../../interfaces/interfaces";

/**
 * @todo
 */
export class Objective implements IObjective {
  type: ObjectiveType;
  text: string;

  constructor() {}
}
