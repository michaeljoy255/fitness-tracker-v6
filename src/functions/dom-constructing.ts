import { Routine } from "../classes/routine";
import { getHeaderFragment, getRoutinesFragment } from "./dom-fragments";

/**
 *
 * @param routines
 */
export function constructHomePage(routines: Routine[]): void {
  let docFrag = document.createDocumentFragment();
  let section = document.createElement("section");
  let h1 = document.createElement("h1");
  let div = document.createElement("div");
  let p = document.createElement("p");

  section.id = "home";
  h1.className = "title";
  h1.innerHTML = "Fitness Tracker";
  div.className = "routines";
  div.appendChild(getRoutinesFragment(routines));
  p.className = "footer";
  p.textContent = "WIP Fitness Tracker ~ Michael J";

  section.appendChild(h1);
  section.appendChild(div);
  section.appendChild(p);
  docFrag.appendChild(section);

  // Add fragment to document
  document.getElementById("app").appendChild(docFrag);

  addRoutineClickListeners(routines);
}

function constructRoutinePage(): void {
  // @TODO
}

function addRoutineClickListeners(routines: Routine[]): void {
  routines.forEach(routine => {
    document.getElementById(routine.id).addEventListener("click", startRoutine);
  });
}

/**
 *
 * @param routineId
 */
function startRoutine(e: any): void {
  console.log(e.target.id);

  document.getElementById("app").appendChild(getHeaderFragment());
  // Replaces home page with routine page
  //appDiv.replaceChild(sectionRoutine, sectionHome);
}
