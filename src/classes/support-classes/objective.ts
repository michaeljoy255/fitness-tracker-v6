import { ObjectiveType } from "../../enums/enums";

/**
 * @todo
 */
export class Objective {
  type: ObjectiveType;
  text: string;

  constructor(type: ObjectiveType, text: string) {
    this.type = type;
    this.text = text;
  }
}
