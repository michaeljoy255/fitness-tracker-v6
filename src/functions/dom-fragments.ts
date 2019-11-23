import { Routine } from "../classes/routine";
import { getDateString } from "./helpers";

export function getHeaderFragment(): Node {
  let headerFrag = document.createDocumentFragment();
  let header = document.createElement("header");
  let cancel = document.createElement("span");
  let calendar = document.createElement("span");
  let timer = document.createElement("span");

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

  return headerFrag.appendChild(header);
}

/**
 *
 * @param routines
 */
export function getRoutinesFragment(routines: Routine[]): Node {
  let docFrag = document.createDocumentFragment();

  routines.forEach(routine => {
    let button = document.createElement("button");
    button.id = routine.id;
    button.textContent = routine.name;

    docFrag.appendChild(button);
  });

  return docFrag;
}
