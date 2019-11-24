import { User } from "../classes/user";
import { constructRoutinePage } from "./dom-constructing";

/**
 * Fetches JSON exercise and routine data for initial data seeding
 * @param url - string
 * @returns promise
 * @todo convert this to an async function
 */
export function getSeedData(url: string): Promise<any> {
  return fetch(url, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.error(`Problem fetching JSON data: ${err}`);
    });
}

/**
 * Returns date string formatted as MM/DD/YYYY
 * @returns string
 */
export function getDateString(): string {
  const date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();
  return month + "/" + day + "/" + year;
}

/**
 * Adds delegated event listeners to the #app
 * @param user - Object
 */
export function loadEventListeners(user: User): void {
  const app = document.getElementById("app");
  const routineIds = [];

  // Load routine Ids into an array for comparision later
  user.routines.forEach(routine => {
    routineIds.push(routine.id);
  });

  // Routine buttons
  app.addEventListener("mousedown", e => {
    // Start routine with Id of clicked element if its in the routines array
    if (routineIds.includes((e.target as HTMLElement).id)) {
      startRoutineById((e.target as HTMLElement).id, user);
    }
  });

  // Results button
  app.addEventListener("mousedown", e => {
    if ((e.target as HTMLElement).id === "results-btn") {
      getRoutineSummary();
    }
  });

  // Cancel button
  app.addEventListener("mousedown", e => {
    if ((e.target as HTMLElement).id === "cancel") {
      cancelRoutine();
    }
  });
}

function startRoutineById(routineId: string, user: User): void {
  constructRoutinePage(routineId, user);
}

function getRoutineSummary(): void {
  console.log("Routine summary!");
}

function cancelRoutine(): void {
  console.log("Routine canceled!");
}
