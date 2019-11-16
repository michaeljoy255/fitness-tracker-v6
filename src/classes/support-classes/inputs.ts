/**
 * @todo
 */
export class Inputs {
  hasNotes: boolean; // 1 input
  hasDuration: boolean; // 3 inputs (H : M : S)
  hasDistance: boolean; // 1 input
  hasWeight: boolean; // 1 input
  hasReps: boolean; // 1 input

  constructor(
    hasNotes: boolean,
    hasDuration: boolean,
    hasDistance: boolean,
    hasWeight: boolean,
    hasReps: boolean
  ) {
    this.hasNotes = hasNotes;
    this.hasDuration = hasDuration;
    this.hasDistance = hasDistance;
    this.hasWeight = hasWeight;
    this.hasReps = hasReps;
  }
}
