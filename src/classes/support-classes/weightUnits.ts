import { ConvertConstant, UnitPrefType } from "../../enums/enums";

/**
 * @todo
 */
export class WeightUnits {
  pounds: number;
  kilograms: number;

  constructor({ unitPref = UnitPrefType.IMPERIAL, weight = null } = {}) {
    if (weight) {
      this.pounds = this.getPounds(unitPref, weight);
      this.kilograms = this.getKilograms(unitPref, weight);
    } else {
      this.pounds = null;
      this.kilograms = null;
    }
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
