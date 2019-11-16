import { UnitPrefType } from "./enums/enums";
import { User } from "./classes/user";
import "./styles.scss";

console.log("Hello");

/**
 * @todo list below in comments
 */

// ----- Class methods -----
// User - create exercise, routine, and measurement

// Create routine list home page
// Start a routine
// Record exercise and routine records (clipboard function)

/**
 * Main
 */
document.addEventListener("DOMContentLoaded", e => {
  let user = new User({ units: UnitPrefType.IMPERIAL });

  // Fetch fitness JSON data for seeding user exercises and routines
  fetch(
    "https://michaeljoy255.github.io/fitness-tracker-v6/fitness-data.json",
    {
      method: "GET"
    }
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      user.exercises = data.exercises;
      user.routines = data.routines;
    })
    .catch(err => {
      console.error(`Problem fetching JSON data: ${err}`);
    });

  console.log(user);
});
