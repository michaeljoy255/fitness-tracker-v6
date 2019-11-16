import { ConvertConstant, UnitPrefType } from "../../enums/enums";
import { IWeightUnits } from "../../interfaces/interfaces";

/**
 * @todo
 */
export class WeightUnits implements IWeightUnits {
  pounds: number;
  kilograms: number;

  constructor(unitPref: UnitPrefType, weight: number) {
    this.pounds = this.getPounds(unitPref, weight);
    this.kilograms = this.getKilograms(unitPref, weight);
  }

  getPounds(unitPref: UnitPrefType, weight: number) {
    return Number(
      (unitPref === "Imperial"
        ? weight
        : weight * ConvertConstant.KG_TO_LBS
      ).toFixed(2)
    );
  }

  getKilograms(unitPref: UnitPrefType, weight: number) {
    return Number(
      (unitPref === "Imperial"
        ? weight * ConvertConstant.LBS_TO_KG
        : weight
      ).toFixed(2)
    );
  }
}
