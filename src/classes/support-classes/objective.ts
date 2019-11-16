import { ObjectiveType } from "../../enums/enums";

/**
 * @todo
 */
export class Objective {
  type: ObjectiveType;
  text: string;

  constructor({ type = null, text = null } = {}) {
    this.type = type;
    this.text = text;
  }
}
