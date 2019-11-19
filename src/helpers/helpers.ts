import { Routine } from "../classes/routine";

/**
 * Fetches JSON exercise and routine data for seeding with
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
 * Not implemented
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

  addRoutineButtonClickListeners(routines);
}

function getRoutinesFragment(routines: Routine[]): Node {
  let docFrag = document.createDocumentFragment();

  routines.forEach((routine, index) => {
    let id = `routine${index}`;
    let button = document.createElement("button");
    button.id = id;
    button.textContent = routine.name;

    docFrag.appendChild(button);
  });

  return docFrag;
}

function addRoutineButtonClickListeners(routines: Routine[]): void {
  for (let i = 0; i < routines.length; i++) {
    let id = `routine${i}`;
    document.getElementById(id).addEventListener("click", () => {
      // @TODO: make functions to deconstruct home page and construct routine pages on click
      alert("Get routine: " + routines[i].name);
    });
  }
}
