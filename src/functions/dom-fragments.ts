import { Routine } from "../classes/routine";
import { Exercise } from "../classes/exercise";
import { getDateString } from "./helpers";

/**
 * Constructs DOM nodes containing routine buttons
 * @param routines - Routine[]
 * @returns Node
 */
export function getRoutinesFragment(routines: Routine[]): Node {
  let routinesFragment = document.createDocumentFragment();

  routines.forEach(routine => {
    let button = document.createElement("button");
    button.id = routine.id;
    button.textContent = routine.name;

    routinesFragment.appendChild(button);
  });

  return routinesFragment;
}

/**
 * Constructs DOM nodes containing header bar for a routine
 * @returns Node
 */
export function getHeaderFragment(): Node {
  let headerFrag = document.createDocumentFragment(),
    header = document.createElement("header"),
    cancel = document.createElement("span"),
    calendar = document.createElement("span"),
    timer = document.createElement("span");

  // Easier to use innerHTML to create these elements
  cancel.innerHTML = "<i class='material-icons' id='cancel'>cancel</i>";
  calendar.innerHTML = `
    <i class="material-icons">calendar_today</i>
    &nbsp; <span>${getDateString()}</span>
  `;
  timer.innerHTML = `
    <i class="material-icons">timer</i>
    &nbsp; <span id="timer"></span>
  `;

  header.appendChild(cancel);
  header.appendChild(calendar);
  header.appendChild(timer);

  headerFrag.appendChild(header);

  return headerFrag;
}

/**
 * Constructs DOM nodes containing an exercise for a routine
 * @param exercise - Object
 * @returns Node
 */
export function getExerciseFragment(exercise: Exercise): Node {
  let exerciseFrag = document.createDocumentFragment();

  // @TODO: Remove - for testing only!
  exerciseFrag.appendChild(document.createTextNode(exercise.name));
  exerciseFrag.appendChild(document.createTextNode(" - "));
  exerciseFrag.appendChild(document.createTextNode(exercise.category));
  exerciseFrag.appendChild(document.createElement("br"));

  return exerciseFrag;
}

/**
 * Constructs DOM nodes containing the results button and textarea
 * @returns Node
 */
export function getFooter(): Node {
  let footerFrag = document.createDocumentFragment(),
    footerDiv = document.createElement("div"),
    resultsBtn = document.createElement("button"),
    textarea = document.createElement("textarea");

  resultsBtn.id = "results-btn";
  resultsBtn.textContent = "Submit";

  footerDiv.appendChild(resultsBtn);
  footerDiv.appendChild(textarea);

  footerFrag.appendChild(footerDiv);

  return footerFrag;
}
