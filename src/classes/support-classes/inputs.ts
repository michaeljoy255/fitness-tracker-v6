import { IInputs } from "../../interfaces/interfaces";

/**
 * @todo
 */
export class Inputs implements IInputs {
  hasNotes: boolean; // 1 input
  hasDuration: boolean; // 3 inputs (H : M : S)
  hasDistance: boolean; // 1 input
  hasWeight: boolean; // 1 input
  hasReps: boolean; // 1 input

  constructor() {}
}
