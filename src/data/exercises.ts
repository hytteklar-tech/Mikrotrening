export type Exercise = {
  id: string
  name: string
  muscleGroup: string
  image: string
  equipment: string | null
  level: string
  primaryMuscles: string[]
  description?: string[]
}

export const exercises: Exercise[] = [
  {
    id: "archer-push-up",
    name: "Bueskytter push-up",
    muscleGroup: "bryst",
    image: "/exercises/archer-push-up.mp4",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["chest"],
    description: [
      "Start i vanlig push-up posisjon med hendene litt bredere enn skulderbredde.",
      "Senk deg ned mot én hånd mens den andre armen strekkes rett ut til siden.",
      "Skyv deg opp igjen til startposisjon.",
      "Gjenta på andre side. Fokus på bryst og skulder på arbeidssiden."
    ]
  },
  {
    id: "bird-dog-push-up",
    name: "Fuglehund push-up",
    muscleGroup: "bryst",
    image: "/exercises/bird-dog-push-up.mp4",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["chest"],
    description: [
      "Start i push-up posisjon med rett kropp fra hode til hæl.",
      "Gjør én push-up ned og opp.",
      "Løft venstre arm og høyre ben samtidig — strekk dem ut og hold 1 sekund.",
      "Senk tilbake og gjenta med motsatt arm og ben. Trener bryst, core og balanse."
    ]
  },
  {
    id: "bent-side-knee-push-up",
    name: "Push-up på knær",
    muscleGroup: "bryst",
    image: "/exercises/bent-side-knee-push-up.mp4",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["chest"],
    description: [
      "Start på knærne i push-up posisjon med hendene skulderbredde fra hverandre.",
      "Plasser ett kne ute til siden for balanse.",
      "Senk brystet kontrollert mot gulvet.",
      "Skyv deg opp igjen. Bra for nybegynnere eller som oppvarming."
    ]
  },
  {
    id: "barbell-bench-press",
    name: "Benkpress med stang",
    muscleGroup: "bryst",
    image: "/exercises/barbell-bench-press.mp4",
    equipment: "barbell",
    level: "intermediate",
    primaryMuscles: ["chest"],
    description: [
      "Ligg flat på benken med føttene i gulvet og ryggen mot benken.",
      "Grip stangen litt bredere enn skulderbredde med overgrep.",
      "Løft stangen av stativet og hold den rett over brystet.",
      "Senk stangen kontrollert mot brystet, hold albuene let inn.",
      "Press stangen tilbake til startposisjon med strake armer."
    ]
  },
  {
    id: "clock-push-up",
    name: "Klokke push-up",
    muscleGroup: "bryst",
    image: "/exercises/clock-push-up.mp4",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["chest"],
    description: [
      "Start i vanlig push-up posisjon.",
      "Gjør en push-up, og flytt deretter én hånd ett skritt i klokkebevegelse.",
      "Fortsett rundt hele 'klokken' — trener brystet fra alle vinkler.",
      "Hold kroppen strak og core spent gjennom hele øvelsen."
    ]
  },
  {
    id: "cobra-push-up",
    name: "Kobra push-up",
    muscleGroup: "bryst",
    image: "/exercises/cobra-push-up.mp4",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["chest"],
    description: [
      "Start liggende på magen med hendene ved siden av brystet.",
      "Press deg opp og strekk armene, løft hoften og skyv bakover som en kobra.",
      "Senk deg kontrollert ned og forover til startposisjon.",
      "Kombinerer brystpress med dynamisk skulder- og ryggjobb."
    ]
  },
  {
    id: "negative-push-up",
    name: "Negativ push-up",
    muscleGroup: "bryst",
    image: "/exercises/negative-push-up.mp4",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["chest"],
    description: [
      "Start øverst i push-up posisjon med strake armer.",
      "Senk deg svært sakte ned mot gulvet — bruk 3–5 sekunder.",
      "Når du når bunnen, senk knærne og reset til toppen.",
      "Den sakte nedsenkningen bygger styrke i bryst og triceps raskt."
    ]
  },
  {
    id: "kneeling-shoulder-tap",
    name: "Skuldertap på knær",
    muscleGroup: "bryst",
    image: "/exercises/kneeling-shoulder-tap.mp4",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["chest"],
    description: [
      "Start i push-up posisjon på knærne med rett rygg.",
      "Gjør en push-up ned og opp.",
      "Løft én hånd og tapp motsatt skulder, hold balansen.",
      "Gjenta og veksle side. Trener bryst og core-stabilitet."
    ]
  },
  {
    id: "lying-floor-fly",
    name: "Gulvfly",
    muscleGroup: "bryst",
    image: "/exercises/lying-floor-fly.mp4",
    equipment: "dumbbell",
    level: "intermediate",
    primaryMuscles: ["chest"],
    description: [
      "Ligg på ryggen på gulvet med en manuell i hver hånd.",
      "Start med armene strakt opp over brystet, lett bøy i albuene.",
      "Senk armene ut til siden til albuene nesten treffer gulvet.",
      "Klem brystet og løft tilbake til startposisjon."
    ]
  },
  {
    id: "crunchy-frog-on-floor",
    name: "Crunchy frog",
    muscleGroup: "mage",
    image: "/exercises/crunchy-frog-on-floor.mp4",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["abs"],
    description: [
      "Sitt på gulvet, lene deg let bakover med føttene løftet fra gulvet.",
      "Strekk armene og bena ut i en V-form.",
      "Trekk knærne inn mot brystet og klem armene rundt dem.",
      "Strekk ut igjen og gjenta. Gir intens mageaktivering."
    ]
  },
  {
    id: "front-to-side-plank-female",
    name: "Front- til sideplank",
    muscleGroup: "mage",
    image: "/exercises/front-to-side-plank-female.mp4",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["abs"],
    description: [
      "Start i frontplank på underarmene med rett kropp.",
      "Roter til sideplank — støtt på én underarm, kroppen sidelengs.",
      "Hold et sekund, roter tilbake til frontplank.",
      "Gjenta til andre side. Trener hele core, spesielt de skrå magemusklene."
    ]
  },
  {
    id: "floor-hyperextension-female",
    name: "Rygghev på gulv",
    muscleGroup: "hofter",
    image: "/exercises/floor-hyperextension-female.mp4",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["lower back"],
    description: [
      "Ligg på magen med armene langs siden eller under haken.",
      "Løft overkroppen og ev. bena forsiktig opp fra gulvet.",
      "Hold et sekund øverst, senk kontrollert ned.",
      "Styrker korsryggen og setemuskulaturen."
    ]
  },
  {
    id: "lying-prone-w-to-y",
    name: "W-til-Y ryggøvelse",
    muscleGroup: "rygg",
    image: "/exercises/lying-prone-w-to-y.mp4",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["upper back"],
    description: [
      "Ligg på magen med armene bøyd i 90 grader (W-form).",
      "Løft armene fra gulvet og press skulderbladene sammen.",
      "Strekk armene ut og opp til Y-form over hodet.",
      "Senk tilbake til W. Styrker øvre rygg og stabiliserer skuldrene."
    ]
  },
  {
    id: "standing-calf-raise-on-a-staircase-female",
    name: "Tåhev på trapp",
    muscleGroup: "legger",
    image: "/exercises/standing-calf-raise-on-a-staircase-female.mp4",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["calves"],
    description: [
      "Stå på kanten av et trinn med hælen hengende fritt.",
      "Senk hælen under trinnkanten for å strekke leggene.",
      "Press deg opp på tå så høyt som mulig.",
      "Senk kontrollert tilbake. Full bevegelsesbane gir maksimal leggtreningseffekt."
    ]
  },
]

export const MUSCLE_GROUP_LABELS: Record<string, string> = {
  bryst: 'Bryst',
  mage: 'Mage',
  rygg: 'Rygg',
  hofter: 'Hofter',
  legger: 'Legger',
  ben: 'Ben',
}
