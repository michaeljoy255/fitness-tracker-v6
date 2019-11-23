import { Routine } from "../classes/routine";

/**
 * Fetches JSON exercise and routine data for initial data seeding
 * @param url
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

// Returns date string formatted like MM/DD/YYYY
function getDateString(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + "/" + day + "/" + year;
}

function constructRoutinePage(): void {
  // @TODO
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

function getHeaderFragment(): Node {
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
