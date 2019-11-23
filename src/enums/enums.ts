/**
 * Preferred measurement unit type
 */
export enum UnitPrefType {
  IMPERIAL = "Imperial",
  METRIC = "Metric"
}

/**
 * Conversion constants for Imperial and Metric measurements
 */
export enum ConvertConstant {
  KM_TO_MILE = 0.62137119,
  MILE_TO_KM = 1.609344,
  LBS_TO_KG = 0.45359237,
  KG_TO_LBS = 2.20462262185
}

/**
 * Categories that exercises can be grouped into
 */
export enum CategoryType {
  EVENT = "Event",
  CARDIO = "Cardio",
  MISC = "Miscellaneous",
  CHEST = "Chest",
  BACK = "Back",
  LEGS = "Legs",
  SHOULDERS = "Shoudlers",
  BICEPS = "Biceps",
  TRICEPS = "Triceps",
  CORE = "Core"
}

/**
 * Exercise objective to aim to meet
 */
export enum ObjectiveType {
  NOTES = "Notes", // assignment
  REST = "Rest", // hourglass_empty
  TEMPO = "Tempo", // speed
  INTENSITY = "Intensity", // whatshot
  RESISTENCE = "Resistence", // fitness_center
  INCLINE = "Incline", // signal_cellular_null
  MAXIMUM = "Maximum" // priority_high
}

/**
 * Intesity objective values for an exercise
 */
export enum IntensityType {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low"
}

/**
 * Tempo objective values for an exercise
 */
export enum TempoType {
  FAST = "Fast",
  NORMAL = "Normal",
  SLOW = "Slow"
}

/**
 * All available exercise names
 */
export enum ExerciseType {
  MISC_EXERCISE = "Miscellaneous Exercise",
  ELLIPTICAL_WARMUP = "Elliptical, Warmup",
  ELLIPTICAL_INTERVAL = "Elliptical, Intervals",
  STAIR_STEPPER = "Stair Stepper Machine",
  STRETCHING = "Stretching",
  FLAT_BENCH_PRESS = "Flat Bench Press",
  INCLINE_BENCH_PRESS = "Incline Bench Press",
  DECLINE_BENCH_PRESS = "Decline Bench Press",
  FLY_MACHINE_CHEST = "Fly Machine (Chest)",
  SKULL_CRUSHERS = "Skull Crushers",
  CABLE_TRICEP_PULLDOWNS = "Cable Tricep Pulldowns",
  TRICEP_PRESS_MACHINE = "Tricep Press Machine",
  BENT_OVER_ROWS = "Bent Over Rows",
  SHRUGS = "Shrugs",
  STIFF_LEG_DEADLIFTS = "Stiff Leg Deadlift",
  ASSISTED_PULL_UPS = "Assisted Pull-ups",
  OVERHAND_CURLS = "Overhand Curls",
  UNDERHAND_CURLS = "Underhand Curls",
  HAMMER_CURLS = "Hammer Curls",
  SIDE_RAISES = "Side Raises",
  FRONT_RAISES = "Front Raises",
  SHOULDER_PRESS_MACHINE = "Shoulder Press Machine",
  LEG_PRESS_MACHINE = "Leg Press Machine",
  LEG_EXTENSION_MACHINE = "Leg Extension Machine",
  LEG_CURL_MACHINE = "Leg Curl Machine",
  CALF_EXTENSION_MACHINE = "Calf Extension Machine",
  STANDING_GLUTE_MACHINE = "Standing Glute Machine",
  HIP_ABDUCTION_MACHINE = "Hip Abduction (Out) Machine",
  HIP_ADDUCTION_MACHINE = "Hip Adduction (in) Machine",
  ABDOMINAL_CRUNCH_MACHINE = "Abdominal Crunch Machine",
  OBLIQUE_SIDE_BEND = "Oblique Side Bends"
}
