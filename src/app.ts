import { UnitPrefType } from "./enums/enums";
import { User } from "./classes/user";
import { getSeedData, buildHomePage } from "./helpers/helpers";
import "./styles.scss";

/**
 * Main
 */
document.addEventListener("DOMContentLoaded", e => {
  let user = new User({ units: UnitPrefType.IMPERIAL });

  /**
   * @todo get rid of placeholder data and use real seed data
   */
  // Seed user data by fetching fitness JSON data
  getSeedData(
    "https://michaeljoy255.github.io/fitness-tracker-v6/fitness-data.json"
  )
    .then(data => {
      // Seed user data
      user.exercises = data.exercises;
      user.routines = data.routines;
      console.log(user);

      buildHomePage(user.routines);
    })
    .catch(err => console.error(err));
});
