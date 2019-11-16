import { UnitPrefType } from "./enums/enums";
import { User } from "./classes/user";
import { seedUserData } from "./helpers/helpers";
import "./styles.scss";

/**
 * Main
 */
document.addEventListener("DOMContentLoaded", e => {
  let user = new User({ units: UnitPrefType.IMPERIAL });

  // Seed user data by fetching fitness JSON data
  user = seedUserData(user);

  // Create routine list for home page
  /**
   * @todo Research Promises as this won't work without them (most likely)
   */
  try {
    console.log(user);

    console.log("test");
    user.routines.forEach(rout => {
      console.log(rout.name);
    });
    // create home page routine list
  } catch (err) {
    console.error(`Unable to create routine list: ${err}`);
  }
});
