import { UnitPrefType } from "./enums/enums";
import { User } from "./classes/user";
import { Exercise } from "./classes/exercise";
import "./styles.scss";
import { Measurement } from "./classes/measurement";
import { WeightUnits } from "./classes/support-classes/weightUnits";
import { Objective } from "./classes/support-classes/objective";

console.log("Hello");

/**
 * @todo list below in comments
 */

// NPM: gh-pages package so you can start using the json data

// ----- Class methods -----
// User - create exercise, routine, and measurement
// Should support classes automatically call constructors when parent class is made?

// When DOM ready:
// Create initial user and log it

// Create routine list home page

// Start a routine

// Record exercise and routine records (clipboard function)

/**
 * Main
 */
document.addEventListener("DOMContentLoaded", e => {
  let user = new User({ units: UnitPrefType.METRIC });
  user.measurements.push(new Measurement());
  console.log(user);

  let testw = new WeightUnits({ weight: 5 });
  console.log(testw);

  let obj = new Objective();
  console.log(obj);
});
