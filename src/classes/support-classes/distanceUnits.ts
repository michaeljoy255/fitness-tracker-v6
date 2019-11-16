import { ConvertConstant, UnitPrefType } from "../../enums/enums";

/**
 * @todo
 */
export class DistanceUnits {
  miles: number;
  kilometers: number;

  constructor(unitPref: UnitPrefType, distance: number) {
    this.miles = this.getMiles(unitPref, distance);
    this.kilometers = this.getKilometers(unitPref, distance);
  }

  getMiles(unitPref: UnitPrefType, distance: number) {
    return Number(
      (unitPref === "Imperial"
        ? distance
        : distance * ConvertConstant.KM_TO_MILE
      ).toFixed(2)
    );
  }

  getKilometers(unitPref: UnitPrefType, distance: number) {
    return Number(
      (unitPref === "Imperial"
        ? distance * ConvertConstant.MILE_TO_KM
        : distance
      ).toFixed(2)
    );
  }
}
