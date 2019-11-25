import { User } from "../classes/user";
import { constructHomePage, constructRoutinePage } from "./dom-constructing";

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
    if ((e.target as HTMLElement).id === "cancel-btn") {
      cancelRoutine(user);
    }
  });
}

function startRoutineById(routineId: string, user: User): void {
  constructRoutinePage(routineId, user);
}

function getRoutineSummary(): void {
  console.log("Routine summary!");
}

function cancelRoutine(user: User): void {
  if (confirm("Cancel this routine?")) {
    stopRoutineTimer.call(window);
    document.getElementById("routine-page").remove();
    constructHomePage(user.routines);
  }
}

// Global - not ideal
var timeId: number;

// Tracks time for current activity
export function routineTimer(startTime: number): void {
  const now = new Date().getTime();
  const timeDiff = now - startTime;
  const secsPerDay = 60 * 60 * 1000 * 24;
  const secsPerHour = 60 * 60 * 1000;

  const hours = Math.floor(((timeDiff % secsPerDay) / secsPerHour) * 1);
  const mins = Math.floor(
    (((timeDiff % secsPerDay) % secsPerHour) / (60 * 1000)) * 1
  );
  const secs = Math.floor(
    ((((timeDiff % secsPerDay) % secsPerHour) % (60 * 1000)) / 1000) * 1
  );

  const sHours = hours.toString().padStart(2, "0");
  const sMins = mins.toString().padStart(2, "0");
  const sSecs = secs.toString().padStart(2, "0");

  document.querySelector(
    "#running-timer"
  ).innerHTML = `${sHours}:${sMins}:${sSecs}`;

  clearTimeout(timeId);

  timeId = setTimeout(() => (this.routineTimer(startTime), 1000));
}

function stopRoutineTimer() {
  clearTimeout(timeId);
}

function finishRoutine() {
  // ready
}

// Ends the current activity and records the data
function finishActivity(user, routineId) {
  /*
  let activityData = [];
  activityData.push(View.getDateString());

  // Get activity data from fields
  let exerciseIds = user.routines.get(Number(routineId)).exerciseIds;
  exerciseIds.forEach(exid => {
    var id = "";
    // Constructing the id to find the input and get its value
    if (user.getExerciseById(exid).category === CategoryEnum.CARDIO) {
      let cardioDuration = "";
      let cardioDistance = "";

      id = `ex${exid}-duration`;
      cardioDuration += document.getElementById(id).value;

      id = `ex${exid}-distance`;
      cardioDistance += document.getElementById(id).value;

      // in case no value was entered
      if (cardioDuration === "") {
        cardioDuration = "0";
      }
      if (cardioDistance === "") {
        cardioDistance = "0";
      }

      activityData.push(`${cardioDuration} (${cardioDistance})`);
    } else if (user.getExerciseById(exid).category === CategoryEnum.MISC) {
      let miscDuration = "";

      id = `ex${exid}-duration`;
      miscDuration = document.getElementById(id).value;

      // in case no value was entered
      if (miscDuration === "") {
        miscDuration = "0";
      }

      activityData.push(miscDuration);
    } else {
      let weightId = "";
      let repId = "";
      let setText = "";

      // Look for set data in the record - using [0] is not ideal
      const sets = user.getExerciseById(exid).records[0].sets;

      sets.forEach((oneSet, i) => {
        weightId = `ex${exid}-weight${i}`;
        repId = `ex${exid}-rep${i}`;

        // Both weight and rep values must be found to accept data
        if (
          document.getElementById(weightId).value &&
          document.getElementById(repId).value
        ) {
          let weight = document.getElementById(weightId).value;
          let rep = document.getElementById(repId).value;

          setText += `${weight}x${rep}, `;
        }
      });
      // Trim off trailing ', '
      activityData.push(setText.slice(0, -2));
    }
  });

  activityData.push(document.getElementById("timer").innerHTML);

  // Paste formatted data to textarea
  let textarea = document.getElementById("results");
  textarea.value = "";

  activityData.forEach(entry => {
    textarea.value += entry + "\n";
  });

  textarea.select();
  textarea.setSelectionRange(0, 99999); // For mobile devices

  try {
    console.log("Attempting to copy text...");
    document.execCommand("copy");
  } catch (err) {
    console.err("Unable to copy text!", err);
  }
  */
}
