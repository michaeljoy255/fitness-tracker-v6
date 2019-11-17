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
 *
 * @param routines
 */
export function buildHomePage(routines: Routine[]): void {
  let docFrag = document.createDocumentFragment();
  let divHome = document.createElement("div");

  getRoutinesHtml(routines);
}

/**
 *
 * @param routines
 */
function getRoutinesHtml(routines: Routine[]): void {
  let docFrag = document.createDocumentFragment();

  routines.forEach(rout => {
    let div = document.createElement("div");
    div.innerHTML = rout.name;
    docFrag.appendChild(div);
  });

  document.getElementById("app").appendChild(docFrag);
}

//   // HOME PAGE
//   static buildHomePage(user) {
//     let footer = "<p>WIP Fitness Tracker v5 ~ Michael J</p>";
//     let title = "<h1 class='title'>Fitness Tracker</h1>";
//     let btns = "";

//     // Html for routine buttons
//     user.routines.forEach( (rout, id) => {
//         btns += `<a href='#' class='btn' id='routine${id}'>${rout.name}</a>`;
//     });

//     let divRoutines = `<div class="routines">${title}${btns}</div>`;
//     let section = `<section class="home">${divRoutines}${footer}</section>`;

//     // Set Home page html
//     document.querySelector('div.home').innerHTML = section;

//     // Click listeners for each routine button - added once html exists
//     user.routines.forEach( (rout, id) => {
//         document.querySelector(`#routine${id}`).addEventListener("click", () => {
//             window.location.href = `activity.html?routine=${id}`;
//         });
//     });
// }
