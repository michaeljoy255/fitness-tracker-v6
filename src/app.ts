import { UnitPrefType } from "./enums/enums";
import { User } from "./classes/user";
import { Exercise } from "./classes/exercise";
import "./styles.scss";

console.log("Hello");

/**
 * @todo list below in comments
 */

// Class constructors with named parameters (IMPORTANT!!!)
function namedParams({ name = "default", amount = 0 } = {}) {
  console.log(name, amount);
}
namedParams({ name: "testing", amount: 175 });
// -------------------------------------------------------

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
  let user = new User(UnitPrefType.IMPERIAL);
  console.log(user);
});
