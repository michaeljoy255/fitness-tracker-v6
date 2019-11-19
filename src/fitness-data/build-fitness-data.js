"use strict";
const uuid = require("uuid");

// CONSTANTS ###################################################################
const KM_TO_MILE = 0.62137119;
const MILE_TO_KM = 1.609344;
const LBS_TO_KG = 0.45359237;
const KG_TO_LBS = 2.20462262185;

const UnitPrefType = {
  IMPERIAL: "Imperial",
  METRIC: "Metric"
}

const CategoryType = {
  EVENT: "Event",
  CARDIO: "Cardio",
  MISC: "Miscellaneous",
  CHEST: "Chest",
  BACK: "Back",
  LEGS: "Legs",
  SHOULDERS: "Shoudlers",
  BICEPS: "Biceps",
  TRICEPS: "Triceps",
  CORE: "Core"
}

const ObjectiveType = {
  NOTES: "Notes",
  REST: "Rest",
  TEMPO: "Tempo",
  INTENSITY: "Intensity",
  RESISTENCE: "Resistence",
  INCLINE: "Incline"
}

const IntensityType = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low"
}

const TempoType = {
  FAST: "Fast",
  NORMAL: "Normal",
  SLOW: "Slow"
}

const ExerciseType = {
  ELLIPTICAL_WARMUP: "Elliptical, Warmup",
  ELLIPTICAL_INTERVAL: "Elliptical, Intervals",
  STAIR_STEPPER: "Stair Stepper Machine",
  STRETCHING: "Stretching",
  FLAT_BENCH_PRESS: "Flat Bench Press",
  INCLINE_BENCH_PRESS: "Incline Bench Press",
  DECLINE_BENCH_PRESS: "Decline Bench Press",
  FLY_MACHINE_CHEST: "Fly Machine (Chest)",
  SKULL_CRUSHERS: "Skull Crushers",
  CABLE_TRICEP_PULLDOWNS: "Cable Tricep Pulldowns",
  TRICEP_PRESS_MACHINE: "Tricep Press Machine",
  BENT_OVER_ROWS: "Bent Over Rows",
  SHRUGS: "Shrugs",
  STIFF_LEG_DEADLIFTS: "Stiff Leg Deadlift",
  ASSISTED_PULL_UPS: "Assisted Pull-ups",
  OVERHAND_CURLS: "Overhand Curls",
  UNDERHAND_CURLS: "Underhand Curls",
  HAMMER_CURLS: "Hammer Curls",
  SIDE_RAISES: "Side Raises",
  FRONT_RAISES: "Front Raises",
  SHOULDER_PRESS_MACHINE: "Shoulder Press Machine",
  LEG_PRESS_MACHINE: "Leg Press Machine",
  LEG_EXTENSION_MACHINE: "Leg Extension Machine",
  LEG_CURL_MACHINE: "Leg Curl Machine",
  CALF_EXTENSION_MACHINE: "Calf Extension Machine",
  STANDING_GLUTE_MACHINE: "Standing Glute Machine",
  HIP_ABDUCTION_MACHINE: "Hip Abduction (Out) Machine",
  HIP_ADDUCTION_MACHINE: "Hip Adduction (in) Machine",
  ABDOMINAL_CRUNCH_MACHINE: "Abdominal Crunch Machine",
  OBLIQUE_SIDE_BEND: "Oblique Side Bends"
}

// HELPER FUNCTIONS ############################################################
function getExerciseIdByName(name) {
  return fitness_data.exercises.filter( exer => {
    return exer.name === name;
  })[0].id;
}

function getPounds(unitPref, weight) {
  return Number((unitPref === "Imperial" ? weight : weight * KG_TO_LBS).toFixed(2));
}

function getKilograms(unitPref, weight) {
  return Number((unitPref === "Imperial" ? weight * LBS_TO_KG : weight).toFixed(2));
}

function getMiles(unitPref, distance) {
  return Number((unitPref === "Imperial" ? distance : distance * KM_TO_MILE).toFixed(2));
}

function getKilometers(unitPref, distance) {
  return Number((unitPref === "Imperial" ? distance * MILE_TO_KM : distance).toFixed(2));
}

// CONSTRUCTOR FUNCTIONS #######################################################
function Exercise(name, category, desc, inputs, objectives, exerciseRecords) {
  this.id = uuid.v4();
  this.name = name;
  this.category = category;
  this.desc = desc;
  this.inputs = inputs;
  this.objectives = objectives; // Objective []
  this.exerciseRecords = exerciseRecords; // Record []
}

function Inputs(hasNotes, hasDuration, hasDistance, hasWeight, hasReps) {
  this.hasNotes = hasNotes; // 1 input
  this.hasDuration = hasDuration; // 3 inputs (H : M : S)
  this.hasDistance = hasDistance; // 1 input
  this.hasWeight = hasWeight; // 1 input
  this.hasReps = hasReps; // 1 input
}

function Objective(type, text) {
  this.type = type;
  this.text = text;
}

function ExerciseRecord(createdAt, sets) {
  this.createdAt = createdAt;
  this.sets = sets; // OneSet []
}

function OneSet(duration, distance, weight, reps) {
  this.duration = duration; // hours : minutes : seconds
  this.distance = distance; // DistanceUnits
  this.weight = weight; // WeightUnits
  this.reps = reps;
}

function WeightUnits(unitPref, weight) {
  this.pounds = getPounds(unitPref, weight);
  this.kilograms = getKilograms(unitPref, weight);
}

function DistanceUnits(unitPref, distance) {
  this.miles = getMiles(unitPref, distance);
  this.kilometers = getKilometers(unitPref, distance);
}

function Routine(name, exerciseIds, routineRecords) {
  this.id = uuid.v4();
  this.name = name;
  this.exerciseIds = exerciseIds;
  this.routineRecords = routineRecords; // RoutineRecord []
}

function RoutineRecord(createdAt, startTime, endTime) {
  this.createdAt = createdAt;
  this.startTime = startTime;
  this.endTime = endTime;
}

// BUILD #######################################################################
var fitness_data = {
  exercises: [],
  routines: []
}

// Building all exercises with names
Object.values(ExerciseType).forEach( exerciseName => {
  fitness_data.exercises.push(
    new Exercise(exerciseName)
  )
})

// Adding categories, descriptions, and inputs to exercises
fitness_data.exercises.forEach( exer => {
  switch (exer.name) {
    case ExerciseType.ELLIPTICAL_WARMUP:
      exer.category = CategoryType.CARDIO;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, true, true, false, false);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.INTENSITY, IntensityType.MEDIUM),
        new Objective(ObjectiveType.RESISTENCE, "8/20"),
        new Objective(ObjectiveType.INCLINE, "0/20")
      ];
      break;
    case ExerciseType.ELLIPTICAL_INTERVAL:
      exer.category = CategoryType.CARDIO;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, true, true, false, false);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH),
        new Objective(ObjectiveType.RESISTENCE, "8/20"),
        new Objective(ObjectiveType.INCLINE, "0/20")
      ];
      break;
    case ExerciseType.STAIR_STEPPER:
      exer.category = CategoryType.CARDIO;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, true, true, false, false);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.STRETCHING:
      exer.category = CategoryType.MISC;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, true, false, false, false);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.INTENSITY, IntensityType.MEDIUM),
      ];
      break;
    case ExerciseType.FLAT_BENCH_PRESS:
      exer.category = CategoryType.CHEST;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "3m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.INCLINE_BENCH_PRESS:
      exer.category = CategoryType.CHEST;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "3m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.DECLINE_BENCH_PRESS:
      exer.category = CategoryType.CHEST;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "3m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.FLY_MACHINE_CHEST:
      exer.category = CategoryType.CHEST;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "2m"),
        new Objective(ObjectiveType.TEMPO, TempoType.SLOW),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.SKULL_CRUSHERS:
      exer.category = CategoryType.TRICEPS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.MEDIUM)
      ];
      break;
    case ExerciseType.CABLE_TRICEP_PULLDOWNS:
      exer.category = CategoryType.TRICEPS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "2m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.TRICEP_PRESS_MACHINE:
      exer.category = CategoryType.TRICEPS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "2m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.BENT_OVER_ROWS:
      exer.category = CategoryType.BACK;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "3m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.SHRUGS:
      exer.category = CategoryType.BACK;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "3m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.STIFF_LEG_DEADLIFTS:
      exer.category = CategoryType.BACK;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "3m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.ASSISTED_PULL_UPS:
      exer.category = CategoryType.BACK;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "2m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.OVERHAND_CURLS:
      exer.category = CategoryType.BICEPS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.MEDIUM)
      ];
      break;
    case ExerciseType.UNDERHAND_CURLS:
      exer.category = CategoryType.BICEPS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "2m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.HAMMER_CURLS:
      exer.category = CategoryType.BICEPS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "2m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.SIDE_RAISES:
      exer.category = CategoryType.SHOULDERS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.FRONT_RAISES:
      exer.category = CategoryType.SHOULDERS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.SHOULDER_PRESS_MACHINE:
      exer.category = CategoryType.SHOULDERS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "2m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.LEG_PRESS_MACHINE:
      exer.category = CategoryType.LEGS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.LEG_EXTENSION_MACHINE:
      exer.category = CategoryType.LEGS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.LEG_CURL_MACHINE:
      exer.category = CategoryType.LEGS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.CALF_EXTENSION_MACHINE:
      exer.category = CategoryType.LEGS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.STANDING_GLUTE_MACHINE:
      exer.category = CategoryType.LEGS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.HIP_ABDUCTION_MACHINE:
      exer.category = CategoryType.LEGS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.HIP_ADDUCTION_MACHINE:
      exer.category = CategoryType.LEGS;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.ABDOMINAL_CRUNCH_MACHINE:
      exer.category = CategoryType.CORE;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "2m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    case ExerciseType.OBLIQUE_SIDE_BEND:
      exer.category = CategoryType.CORE;
      exer.desc = "PLACEHOLDER";
      exer.inputs = new Inputs(true, false, false, true, true);
      exer.objectives = [
        new Objective(ObjectiveType.NOTES, ObjectiveType.NOTES),
        new Objective(ObjectiveType.REST, "1m"),
        new Objective(ObjectiveType.TEMPO, TempoType.NORMAL),
        new Objective(ObjectiveType.INTENSITY, IntensityType.HIGH)
      ];
      break;
    default:
      exer.category = CategoryType.MISC;
      exer.desc = "No description.";
      exer.inputs = new Inputs(false, false, false, false, false);
      break;
  }
})

// #############################################################################
// Seeded records are added to the exercises here
// #############################################################################
fitness_data.exercises.forEach( exer => {
  switch (exer.name) {
    case ExerciseType.ELLIPTICAL_WARMUP:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date(), [
          new OneSet(420, new DistanceUnits(UnitPrefType.IMPERIAL, 0.5), null, null)
        ])
      ];
      break;
    case ExerciseType.ELLIPTICAL_INTERVAL:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date(), [
          new OneSet(1440, new DistanceUnits(UnitPrefType.IMPERIAL, 2), null, null)
        ])
      ];
      break;
    case ExerciseType.STAIR_STEPPER:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date(), [
          new OneSet(600, null, null, null)
        ])
      ];
      break;
    case ExerciseType.STRETCHING:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date(), [
          new OneSet(540, null, null, null)
        ])
      ];
      break;
    case ExerciseType.FLAT_BENCH_PRESS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-12").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 130), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 130), 7),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 130), 7),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 130), 6)
        ]),
        new ExerciseRecord(new Date("2019-11-8").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 122.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 127.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 130), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-5").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-1").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-29").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-25").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-22").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-15").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10)
        ])
      ];
      break;
    case ExerciseType.INCLINE_BENCH_PRESS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-12").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 8),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 8),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 8)
        ]),
        new ExerciseRecord(new Date("2019-11-8").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 77.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-5").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 72.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 72.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 72.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 72.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-1").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 72.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 72.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 72.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 72.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-29").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-25").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-22").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-15").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 70), 10)
        ])
      ];
      break;
    case ExerciseType.DECLINE_BENCH_PRESS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-12").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 127.5), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 130), 7)
        ]),
        new ExerciseRecord(new Date("2019-11-8").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 127.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 127.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 127.5), 9)
        ]),
        new ExerciseRecord(new Date("2019-11-5").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-1").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-25").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-22").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-15").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10)
        ])
      ];
      break;
    case ExerciseType.FLY_MACHINE_CHEST:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-12").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 8),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 7),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 7)
        ])
      ];
      break;
    case ExerciseType.SKULL_CRUSHERS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-10-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 40), 10)
        ])
      ];
      break;
    case ExerciseType.CABLE_TRICEP_PULLDOWNS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-12").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 47.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 47.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 47.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 42.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 42.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 42.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-5").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 40), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-1").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 39), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 39), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 39), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-25").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 37.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 37.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 37.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-22").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 34), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 34), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 34), 10)
        ])
      ];
      break;
    case ExerciseType.TRICEP_PRESS_MACHINE:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-12").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 150), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-8").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-5").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 185), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 185), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 185), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-1").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-29").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 175), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 175), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 175), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-25").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 170), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 170), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 170), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-22").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-15").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 155), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 155), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 155), 10)
        ])
      ];
      break;
    case ExerciseType.BENT_OVER_ROWS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 8)
        ]),
        new ExerciseRecord(new Date("2019-11-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 122.5), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 122.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 8),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 8)
        ]),
        new ExerciseRecord(new Date("2019-11-7").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-4").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 117.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-31").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-28").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-24").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-21").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 112.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-17").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-14").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-10").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10)
        ])
      ];
      break;
    case ExerciseType.SHRUGS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 192.5), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 192.5), 8)
        ]),
        new ExerciseRecord(new Date("2019-11-7").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-4").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 187.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 187.5), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 192.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-31").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 185), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 185), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 185), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 185), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-28").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 182.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 182.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 182.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 182.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-24").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 182.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 182.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 182.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 182.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-21").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-17").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-14").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-10").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10)
        ])
      ];
      break;
    case ExerciseType.STIFF_LEG_DEADLIFTS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-7").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 105), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-4").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 100), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 100), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 102.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 105), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-31").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 97.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 97.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 97.5), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 97.5), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-28").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-24").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-21").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-17").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-14").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-10").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10)
        ])
      ];
      break;
    case ExerciseType.ASSISTED_PULL_UPS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -25), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -25), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-7").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -25), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -25), 9),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -25), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-4").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -30), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -30), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -30), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-31").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-28").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-24").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-21").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -40), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-17").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -45), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -45), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -45), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-14").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -55), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -55), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -55), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-10").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -55), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -55), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, -55), 10)
        ])
      ];
      break;
    case ExerciseType.OVERHAND_CURLS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 15), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 15), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 15), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 15), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 15), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 15), 10)
        ])
      ];
      break;
    case ExerciseType.UNDERHAND_CURLS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 7),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 6),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 6)
        ]),
        new ExerciseRecord(new Date("2019-11-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 7),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 7),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 7)
        ]),
        new ExerciseRecord(new Date("2019-11-7").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 8),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 8),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 7)
        ]),
        new ExerciseRecord(new Date("2019-11-4").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-17").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-14").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-10").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10)
        ])
      ];
      break;
    case ExerciseType.HAMMER_CURLS:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-18").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 6),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 6),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-11").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 6),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 6),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 6)
        ]),
        new ExerciseRecord(new Date("2019-11-7").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 7),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 7),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 30), 6)
        ]),
        new ExerciseRecord(new Date("2019-11-4").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-17").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 25), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-14").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-10").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 20), 10)
        ])
      ];
      break;
    case ExerciseType.SIDE_RAISES:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 10), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 10), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 10), 10)
        ])
      ];
      break;
    case ExerciseType.FRONT_RAISES:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 10), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 10), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 10), 10)
        ])
      ];
      break;
    case ExerciseType.SHOULDER_PRESS_MACHINE:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 60), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 60), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 60), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-30").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 55), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 55), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 55), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-23").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 50), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 50), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 50), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-16").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 50), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 50), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 50), 10)
        ])
      ];
      break;
    case ExerciseType.LEG_PRESS_MACHINE:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-13").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 175), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 175), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 175), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-30").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 170), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 170), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 170), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-23").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 165), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 165), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 165), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-16").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-9").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 150), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 150), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 150), 10)
        ])
      ];
      break;
    case ExerciseType.LEG_EXTENSION_MACHINE:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-13").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 95), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-30").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 85), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 85), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 85), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-23").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 80), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 80), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 80), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-16").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-9").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10)
        ])
      ];
      break;
    case ExerciseType.LEG_CURL_MACHINE:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-13").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 85), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 85), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 90), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-30").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 80), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 80), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 80), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-23").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-16").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-9").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 75), 10)
        ])
      ];
      break;
    case ExerciseType.CALF_EXTENSION_MACHINE:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-13").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 200), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 200), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 200), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 175), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 175), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 175), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-30").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 170), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 170), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 170), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-23").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 165), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 165), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 165), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-16").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-9").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10)
        ])
      ];
      break;
    case ExerciseType.STANDING_GLUTE_MACHINE:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-13").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 130), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 130), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 130), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 125), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-30").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 120), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-23").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 115), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-16").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 110), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-9").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 100), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 100), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 100), 10)
        ])
      ];
      break;
    case ExerciseType.HIP_ABDUCTION_MACHINE:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-13").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 205), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 210), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 215), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 200), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 200), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 200), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-30").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 195), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 195), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 195), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-23").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-16").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-9").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 190), 10)
        ])
      ];
      break;
    case ExerciseType.HIP_ADDUCTION_MACHINE:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-13").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 170), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 175), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 180), 10)
        ]),
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 165), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 165), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 165), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-30").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 160), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-23").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 155), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 155), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 155), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-16").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 155), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 155), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 155), 10)
        ]),
        new ExerciseRecord(new Date("2019-10-9").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 150), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 150), 10),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 150), 10)
        ])
      ];
      break;
    case ExerciseType.ABDOMINAL_CRUNCH_MACHINE:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 35), 25),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 35), 25),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 35), 25),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 35), 25)
        ])
      ];
      break;
    case ExerciseType.OBLIQUE_SIDE_BEND:
      exer.exerciseRecords = [
        new ExerciseRecord(new Date("2019-11-6").toISOString(), [
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 45), 25),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 45), 25),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 45), 25),
          new OneSet(null, null, new WeightUnits(UnitPrefType.IMPERIAL, 45), 25)
        ])
      ];
      break;
    default:
      exer.exerciseRecords = [];
      break;
  }
})

// Adding routines
fitness_data.routines.push(
  new Routine("Chest and Triceps", [
    getExerciseIdByName(ExerciseType.ELLIPTICAL_WARMUP),
    getExerciseIdByName(ExerciseType.FLAT_BENCH_PRESS),
    getExerciseIdByName(ExerciseType.INCLINE_BENCH_PRESS),
    getExerciseIdByName(ExerciseType.DECLINE_BENCH_PRESS),
    getExerciseIdByName(ExerciseType.FLY_MACHINE_CHEST),
    getExerciseIdByName(ExerciseType.CABLE_TRICEP_PULLDOWNS),
    getExerciseIdByName(ExerciseType.TRICEP_PRESS_MACHINE),
    getExerciseIdByName(ExerciseType.STRETCHING)
  ], []
))

fitness_data.routines.push(
  new Routine("Back and Biceps", [
    getExerciseIdByName(ExerciseType.ELLIPTICAL_WARMUP),
    getExerciseIdByName(ExerciseType.BENT_OVER_ROWS),
    getExerciseIdByName(ExerciseType.SHRUGS),
    getExerciseIdByName(ExerciseType.STIFF_LEG_DEADLIFTS),
    getExerciseIdByName(ExerciseType.ASSISTED_PULL_UPS),
    getExerciseIdByName(ExerciseType.OVERHAND_CURLS),
    getExerciseIdByName(ExerciseType.UNDERHAND_CURLS),
    getExerciseIdByName(ExerciseType.HAMMER_CURLS),
    getExerciseIdByName(ExerciseType.STRETCHING)
  ], []
))

fitness_data.routines.push(
  new Routine("Legs, Shoulders, and Core", [
    getExerciseIdByName(ExerciseType.ELLIPTICAL_WARMUP),
    getExerciseIdByName(ExerciseType.SIDE_RAISES),
    getExerciseIdByName(ExerciseType.FRONT_RAISES),
    getExerciseIdByName(ExerciseType.SHOULDER_PRESS_MACHINE),
    getExerciseIdByName(ExerciseType.LEG_PRESS_MACHINE),
    getExerciseIdByName(ExerciseType.LEG_EXTENSION_MACHINE),
    getExerciseIdByName(ExerciseType.LEG_CURL_MACHINE),
    getExerciseIdByName(ExerciseType.CALF_EXTENSION_MACHINE),
    getExerciseIdByName(ExerciseType.STANDING_GLUTE_MACHINE),
    getExerciseIdByName(ExerciseType.HIP_ABDUCTION_MACHINE),
    getExerciseIdByName(ExerciseType.HIP_ADDUCTION_MACHINE),
    getExerciseIdByName(ExerciseType.ABDOMINAL_CRUNCH_MACHINE),
    getExerciseIdByName(ExerciseType.OBLIQUE_SIDE_BEND),
    getExerciseIdByName(ExerciseType.STRETCHING)
  ], []
))

fitness_data.routines.push(
  new Routine("Chest Only", [
    getExerciseIdByName(ExerciseType.ELLIPTICAL_WARMUP),
    getExerciseIdByName(ExerciseType.FLAT_BENCH_PRESS),
    getExerciseIdByName(ExerciseType.INCLINE_BENCH_PRESS),
    getExerciseIdByName(ExerciseType.DECLINE_BENCH_PRESS),
    getExerciseIdByName(ExerciseType.FLY_MACHINE_CHEST),
    getExerciseIdByName(ExerciseType.STRETCHING)
  ], []
))

fitness_data.routines.push(
  new Routine("Back Only", [
    getExerciseIdByName(ExerciseType.ELLIPTICAL_WARMUP),
    getExerciseIdByName(ExerciseType.BENT_OVER_ROWS),
    getExerciseIdByName(ExerciseType.SHRUGS),
    getExerciseIdByName(ExerciseType.STIFF_LEG_DEADLIFTS),
    getExerciseIdByName(ExerciseType.ASSISTED_PULL_UPS),
    getExerciseIdByName(ExerciseType.STRETCHING)
  ], []
))

fitness_data.routines.push(
  new Routine("Legs Only", [
    getExerciseIdByName(ExerciseType.ELLIPTICAL_WARMUP),
    getExerciseIdByName(ExerciseType.LEG_PRESS_MACHINE),
    getExerciseIdByName(ExerciseType.LEG_EXTENSION_MACHINE),
    getExerciseIdByName(ExerciseType.LEG_CURL_MACHINE),
    getExerciseIdByName(ExerciseType.CALF_EXTENSION_MACHINE),
    getExerciseIdByName(ExerciseType.STANDING_GLUTE_MACHINE),
    getExerciseIdByName(ExerciseType.HIP_ABDUCTION_MACHINE),
    getExerciseIdByName(ExerciseType.HIP_ADDUCTION_MACHINE),
    getExerciseIdByName(ExerciseType.STRETCHING)
  ], []
))

fitness_data.routines.push(
  new Routine("Arms and Core", [
    getExerciseIdByName(ExerciseType.ELLIPTICAL_WARMUP),
    getExerciseIdByName(ExerciseType.SIDE_RAISES),
    getExerciseIdByName(ExerciseType.FRONT_RAISES),
    getExerciseIdByName(ExerciseType.SHOULDER_PRESS_MACHINE),
    getExerciseIdByName(ExerciseType.OVERHAND_CURLS),
    getExerciseIdByName(ExerciseType.CABLE_TRICEP_PULLDOWNS),
    getExerciseIdByName(ExerciseType.UNDERHAND_CURLS),
    getExerciseIdByName(ExerciseType.SKULL_CRUSHERS),
    getExerciseIdByName(ExerciseType.TRICEP_PRESS_MACHINE),
    getExerciseIdByName(ExerciseType.HAMMER_CURLS),
    getExerciseIdByName(ExerciseType.ABDOMINAL_CRUNCH_MACHINE),
    getExerciseIdByName(ExerciseType.OBLIQUE_SIDE_BEND),
    getExerciseIdByName(ExerciseType.STRETCHING)
  ], []
))

fitness_data.routines.push(
  new Routine("Cardio Day", [
    getExerciseIdByName(ExerciseType.ELLIPTICAL_INTERVAL),
    getExerciseIdByName(ExerciseType.STAIR_STEPPER),
    getExerciseIdByName(ExerciseType.STRETCHING)
  ], []
))

// OUTPUT FOR JSON #############################################################
console.log( JSON.stringify(fitness_data) );