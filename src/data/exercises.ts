// Generert av scripts/download-exercises.mjs
// Kjør scriptet på nytt for å oppdatere: node scripts/download-exercises.mjs
//
// NB: Bytt ut bildene i public/exercises/ med Gym Visual GIF-er.
// Hold filnavnene like (bruk samme id-slug).

export type Exercise = {
  id: string
  name: string
  muscleGroup: string
  image: string
  equipment: string | null
  level: string
  primaryMuscles: string[]
}

export const exercises: Exercise[] = [
  {
    "id": "archer-push-up",
    "name": "Bueskytter push-up",
    "muscleGroup": "bryst",
    "image": "/exercises/archer-push-up.gif",
    "equipment": "body only",
    "level": "intermediate",
    "primaryMuscles": ["chest"]
  },
  {
    "id": "bird-dog-push-up",
    "name": "Fuglehund push-up",
    "muscleGroup": "bryst",
    "image": "/exercises/bird-dog-push-up.gif",
    "equipment": "body only",
    "level": "intermediate",
    "primaryMuscles": ["chest"]
  },
  {
    "id": "bent-side-knee-push-up",
    "name": "Push-up på knær",
    "muscleGroup": "bryst",
    "image": "/exercises/bent-side-knee-push-up.gif",
    "equipment": "body only",
    "level": "beginner",
    "primaryMuscles": ["chest"]
  },
  {
    "id": "alternating-floor-press",
    "name": "Alternating Floor Press",
    "muscleGroup": "bryst",
    "image": "/exercises/alternating-floor-press.jpg",
    "equipment": "kettlebells",
    "level": "beginner",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "around-the-worlds",
    "name": "Around The Worlds",
    "muscleGroup": "bryst",
    "image": "/exercises/around-the-worlds.jpg",
    "equipment": "dumbbell",
    "level": "intermediate",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "barbell-bench-press-medium-grip",
    "name": "Barbell Bench Press - Medium Grip",
    "muscleGroup": "bryst",
    "image": "/exercises/barbell-bench-press-medium-grip.jpg",
    "equipment": "barbell",
    "level": "beginner",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "barbell-guillotine-bench-press",
    "name": "Barbell Guillotine Bench Press",
    "muscleGroup": "bryst",
    "image": "/exercises/barbell-guillotine-bench-press.jpg",
    "equipment": "barbell",
    "level": "intermediate",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "barbell-incline-bench-press-medium-grip",
    "name": "Barbell Incline Bench Press - Medium Grip",
    "muscleGroup": "bryst",
    "image": "/exercises/barbell-incline-bench-press-medium-grip.jpg",
    "equipment": "barbell",
    "level": "beginner",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "behind-head-chest-stretch",
    "name": "Behind Head Chest Stretch",
    "muscleGroup": "bryst",
    "image": "/exercises/behind-head-chest-stretch.jpg",
    "equipment": "other",
    "level": "expert",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "bench-press-with-bands",
    "name": "Bench Press - With Bands",
    "muscleGroup": "bryst",
    "image": "/exercises/bench-press-with-bands.jpg",
    "equipment": "bands",
    "level": "beginner",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "bent-arm-dumbbell-pullover",
    "name": "Bent-Arm Dumbbell Pullover",
    "muscleGroup": "bryst",
    "image": "/exercises/bent-arm-dumbbell-pullover.jpg",
    "equipment": "dumbbell",
    "level": "intermediate",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "bodyweight-flyes",
    "name": "Bodyweight Flyes",
    "muscleGroup": "bryst",
    "image": "/exercises/bodyweight-flyes.jpg",
    "equipment": "e-z curl bar",
    "level": "intermediate",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "butterfly",
    "name": "Butterfly",
    "muscleGroup": "bryst",
    "image": "/exercises/butterfly.jpg",
    "equipment": "machine",
    "level": "beginner",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "cable-chest-press",
    "name": "Cable Chest Press",
    "muscleGroup": "bryst",
    "image": "/exercises/cable-chest-press.jpg",
    "equipment": "cable",
    "level": "beginner",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "cable-crossover",
    "name": "Cable Crossover",
    "muscleGroup": "bryst",
    "image": "/exercises/cable-crossover.jpg",
    "equipment": "cable",
    "level": "beginner",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "cable-iron-cross",
    "name": "Cable Iron Cross",
    "muscleGroup": "bryst",
    "image": "/exercises/cable-iron-cross.jpg",
    "equipment": "cable",
    "level": "beginner",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "chain-press",
    "name": "Chain Press",
    "muscleGroup": "bryst",
    "image": "/exercises/chain-press.jpg",
    "equipment": "other",
    "level": "intermediate",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "chest-and-front-of-shoulder-stretch",
    "name": "Chest And Front Of Shoulder Stretch",
    "muscleGroup": "bryst",
    "image": "/exercises/chest-and-front-of-shoulder-stretch.jpg",
    "equipment": "other",
    "level": "beginner",
    "primaryMuscles": [
      "chest"
    ]
  },
  {
    "id": "90-90-hamstring",
    "name": "90/90 Hamstring",
    "muscleGroup": "ben",
    "image": "/exercises/90-90-hamstring.jpg",
    "equipment": "body only",
    "level": "beginner",
    "primaryMuscles": [
      "hamstrings"
    ]
  },
  {
    "id": "all-fours-quad-stretch",
    "name": "All Fours Quad Stretch",
    "muscleGroup": "ben",
    "image": "/exercises/all-fours-quad-stretch.jpg",
    "equipment": "body only",
    "level": "intermediate",
    "primaryMuscles": [
      "quadriceps"
    ]
  },
  {
    "id": "alternate-leg-diagonal-bound",
    "name": "Alternate Leg Diagonal Bound",
    "muscleGroup": "ben",
    "image": "/exercises/alternate-leg-diagonal-bound.jpg",
    "equipment": null,
    "level": "beginner",
    "primaryMuscles": [
      "quadriceps"
    ]
  },
  {
    "id": "alternating-hang-clean",
    "name": "Alternating Hang Clean",
    "muscleGroup": "ben",
    "image": "/exercises/alternating-hang-clean.jpg",
    "equipment": "kettlebells",
    "level": "intermediate",
    "primaryMuscles": [
      "hamstrings"
    ]
  },
  {
    "id": "ankle-on-the-knee",
    "name": "Ankle On The Knee",
    "muscleGroup": "ben",
    "image": "/exercises/ankle-on-the-knee.jpg",
    "equipment": null,
    "level": "beginner",
    "primaryMuscles": [
      "glutes"
    ]
  },
  {
    "id": "backward-drag",
    "name": "Backward Drag",
    "muscleGroup": "ben",
    "image": "/exercises/backward-drag.jpg",
    "equipment": "other",
    "level": "beginner",
    "primaryMuscles": [
      "quadriceps"
    ]
  },
  {
    "id": "ball-leg-curl",
    "name": "Ball Leg Curl",
    "muscleGroup": "ben",
    "image": "/exercises/ball-leg-curl.jpg",
    "equipment": "exercise ball",
    "level": "beginner",
    "primaryMuscles": [
      "hamstrings"
    ]
  },
  {
    "id": "band-good-morning",
    "name": "Band Good Morning",
    "muscleGroup": "ben",
    "image": "/exercises/band-good-morning.jpg",
    "equipment": "bands",
    "level": "beginner",
    "primaryMuscles": [
      "hamstrings"
    ]
  },
  {
    "id": "band-good-morning-pull-through",
    "name": "Band Good Morning (Pull Through)",
    "muscleGroup": "ben",
    "image": "/exercises/band-good-morning-pull-through.jpg",
    "equipment": "bands",
    "level": "beginner",
    "primaryMuscles": [
      "hamstrings"
    ]
  },
  {
    "id": "barbell-full-squat",
    "name": "Barbell Full Squat",
    "muscleGroup": "ben",
    "image": "/exercises/barbell-full-squat.jpg",
    "equipment": "barbell",
    "level": "intermediate",
    "primaryMuscles": [
      "quadriceps"
    ]
  },
  {
    "id": "barbell-glute-bridge",
    "name": "Barbell Glute Bridge",
    "muscleGroup": "ben",
    "image": "/exercises/barbell-glute-bridge.jpg",
    "equipment": "barbell",
    "level": "intermediate",
    "primaryMuscles": [
      "glutes"
    ]
  },
  {
    "id": "barbell-hack-squat",
    "name": "Barbell Hack Squat",
    "muscleGroup": "ben",
    "image": "/exercises/barbell-hack-squat.jpg",
    "equipment": "barbell",
    "level": "intermediate",
    "primaryMuscles": [
      "quadriceps"
    ]
  },
  {
    "id": "barbell-hip-thrust",
    "name": "Barbell Hip Thrust",
    "muscleGroup": "ben",
    "image": "/exercises/barbell-hip-thrust.jpg",
    "equipment": "barbell",
    "level": "intermediate",
    "primaryMuscles": [
      "glutes"
    ]
  },
  {
    "id": "barbell-lunge",
    "name": "Barbell Lunge",
    "muscleGroup": "ben",
    "image": "/exercises/barbell-lunge.jpg",
    "equipment": "barbell",
    "level": "intermediate",
    "primaryMuscles": [
      "quadriceps"
    ]
  },
  {
    "id": "barbell-side-split-squat",
    "name": "Barbell Side Split Squat",
    "muscleGroup": "ben",
    "image": "/exercises/barbell-side-split-squat.jpg",
    "equipment": "barbell",
    "level": "beginner",
    "primaryMuscles": [
      "quadriceps"
    ]
  }
]

export const MUSCLE_GROUP_LABELS: Record<string, string> = {
  bryst: 'Bryst',
  ben: 'Ben',
}
