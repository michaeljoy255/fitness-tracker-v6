import { Routine } from "../classes/routine";

/**
 * Fetches JSON exercise and routine data for initial data seeding
 * @param url
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

/**
 *
 * @param routines
 */
function getRoutinesFragment(routines: Routine[]): Node {
  let docFrag = document.createDocumentFragment();

  routines.forEach(routine => {
    let button = document.createElement("button");
    button.id = routine.id;
    button.textContent = routine.name;

    docFrag.appendChild(button);
  });

  return docFrag;
}

function addRoutineClickListeners(routines: Routine[]): void {
  routines.forEach(routine => {
    document.getElementById(routine.id).addEventListener("click", () => {
      startRoutine(routine.id);
    });
  });
}

/**
 *
 * @param routineId
 */
function startRoutine(routineId: string): void {
  console.log(routineId);
  // @TODO: make functions to deconstruct home page and construct routine pages on click
}
