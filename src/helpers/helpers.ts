import { User } from "../classes/user";

/**
 * Seeds the user with exercises and routines fetched from another project
 * @param user
 */
export function seedUserData(user: User): User {
  const url =
    "https://michaeljoy255.github.io/fitness-tracker-v6/fitness-data.json";

  fetch(url, {
    method: "GET"
  })
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

  return user;
}
