import { Routine } from "../classes/routine";
import { User } from "../classes/user";
import {
  getRoutinesFragment,
  getHeaderFragment,
  getExerciseFragment
} from "./dom-fragments";

/**
 * Constructs DOM nodes for Home Page
 * @param routines - Routine[]
 */
export function constructHomePage(routines: Routine[]): void {
  let app = document.getElementById("app"),
    homeFrag = document.createDocumentFragment(),
    homeSection = document.createElement("section"),
    h1 = document.createElement("h1"),
    div = document.createElement("div"),
    p = document.createElement("p");

  homeSection.id = "home-page";
  h1.className = "title";
  h1.innerHTML = "Fitness Tracker";
  div.className = "routines";
  div.appendChild(getRoutinesFragment(routines));
  p.className = "footer";
  p.textContent = "WIP Fitness Tracker ~ Michael J";

  homeSection.appendChild(h1);
  homeSection.appendChild(div);
  homeSection.appendChild(p);

  homeFrag.appendChild(homeSection);

  app.appendChild(homeFrag);
}

/**
 * Constructs DOM nodes for a Routine Page
 * @param routineId - string
 * @param user - Object
 */
export function constructRoutinePage(routineId: string, user: User): void {
  const app = document.getElementById("app"),
    routineFrag = document.createDocumentFragment(),
    routineSection = document.createElement("section");

  routineSection.id = "routine-page";
  routineSection.appendChild(getHeaderFragment());

  // Loop through exercises in the current routine
  const exerciseIds = user.routines.find(obj => obj.id === routineId)
    .exerciseIds;
  exerciseIds.forEach(exerciseId => {
    let exercise = user.exercises.find(obj => obj.id === exerciseId);
    routineSection.appendChild(getExerciseFragment(exercise));
  });

  routineFrag.appendChild(routineSection);

  // Replaces home page with routine page once all fragments are ready
  const sectionHome = document.getElementById("home-page");
  app.replaceChild(routineFrag, sectionHome);
}
