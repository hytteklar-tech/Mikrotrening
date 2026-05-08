export type Exercise = {
  id: string
  name: string
  muscleGroup: string
  image: string
  equipment: string | null
  level: string
  primaryMuscles: string[]
  description?: string[]
  unit: 'reps' | 'sek'
  suggestedValue: number
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
    unit: "reps",
    suggestedValue: 8,
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
    unit: "reps",
    suggestedValue: 10,
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
    unit: "reps",
    suggestedValue: 12,
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
    unit: "reps",
    suggestedValue: 10,
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
    unit: "reps",
    suggestedValue: 8,
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
    unit: "reps",
    suggestedValue: 10,
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
    unit: "reps",
    suggestedValue: 8,
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
    unit: "reps",
    suggestedValue: 12,
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
    unit: "reps",
    suggestedValue: 12,
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
    unit: "reps",
    suggestedValue: 15,
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
    unit: "sek",
    suggestedValue: 30,
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
    unit: "reps",
    suggestedValue: 15,
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
    unit: "reps",
    suggestedValue: 12,
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
    unit: "reps",
    suggestedValue: 20,
    description: [
      "Stå på kanten av et trinn med hælen hengende fritt.",
      "Senk hælen under trinnkanten for å strekke leggene.",
      "Press deg opp på tå så høyt som mulig.",
      "Senk kontrollert tilbake. Full bevegelsesbane gir maksimal leggtreningseffekt."
    ]
  },
  {
    id: "cross-body-crunch",
    name: "Krysscrunch",
    muscleGroup: "mage",
    image: "/exercises/cross-body-crunch.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["abs"],
    unit: "reps",
    suggestedValue: 15,
    description: [
      "Ligg på ryggen med knærne bøyd og hendene bak hodet.",
      "Løft skuldrene fra gulvet og roter overkroppen slik at én albue peker mot motsatt kne.",
      "Senk kontrollert ned og gjenta til andre side.",
      "Trener de skrå magemusklene effektivt."
    ]
  },
  {
    id: "lying-hip-leg-raise",
    name: "Liggende hofteben-hev",
    muscleGroup: "hofter",
    image: "/exercises/lying-hip-leg-raise.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["hip flexors"],
    unit: "reps",
    suggestedValue: 15,
    description: [
      "Ligg flatt på ryggen med armene langs siden for støtte.",
      "Hold bena strake og løft dem sakte opp til 90 grader.",
      "Senk bena kontrollert ned uten å la dem hvile på gulvet.",
      "Trener hoftefleksorene og nedre del av magen."
    ]
  },
  {
    id: "crab-twist-toe-touch",
    name: "Krabbe-vri tåberøring",
    muscleGroup: "mage",
    image: "/exercises/crab-twist-toe-touch.gif",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["abs"],
    unit: "reps",
    suggestedValue: 12,
    description: [
      "Sitt i krabbeposisjon med hendene bak deg og hoften løftet fra gulvet.",
      "Løft én hånd og det motsatte benet og prøv å berøre tåen.",
      "Roter overkroppen gjennom bevegelsen for å aktivere de skrå musklene.",
      "Senk tilbake og gjenta på andre side. Trener mage, skuldre og hofter."
    ]
  },
  {
    id: "alternate-heel-touchers",
    name: "Vekslende hælberøring",
    muscleGroup: "mage",
    image: "/exercises/alternate-heel-touchers.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["abs"],
    unit: "reps",
    suggestedValue: 20,
    description: [
      "Ligg på ryggen med knærne bøyd og føttene flatt i gulvet.",
      "Løft skuldrene lett fra gulvet og hold spenningen i magen.",
      "Strekk én hånd ned og berør tilhørende hæl, veksle til andre side.",
      "Holder konstant aktivering i de skrå magemusklene gjennom hele settet."
    ]
  },
  {
    id: "bodyweight-windmill",
    name: "Kroppsvekt vindmølle",
    muscleGroup: "mage",
    image: "/exercises/bodyweight-windmill.gif",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["abs"],
    unit: "reps",
    suggestedValue: 12,
    description: [
      "Stå med føttene skulderbredde fra hverandre og armene ut til siden.",
      "Bøy til én side og berør foten med den ene hånden mens den andre peker rett opp.",
      "Hold bena strake gjennom bevegelsen og roter overkroppen kontrollert.",
      "Trener de skrå magemusklene, hofter og skulderfleksibilitet."
    ]
  },
  {
    id: "alternate-leg-raise-head-up",
    name: "Vekslende benhev med hode oppe",
    muscleGroup: "mage",
    image: "/exercises/alternate-leg-raise-head-up.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["abs"],
    unit: "reps",
    suggestedValue: 16,
    description: [
      "Ligg på ryggen med hodet og skuldrene løftet fra gulvet.",
      "Hold armene langs siden og bena strake.",
      "Løft ett ben opp mot taket mens det andre holdes lavt, veksle i jevn rytme.",
      "Holder konstant mageaktivering — effektiv øvelse for nedre del av magen."
    ]
  },
  {
    id: "superman",
    name: "Superman",
    muscleGroup: "rygg",
    image: "/exercises/superman.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["lower back"],
    unit: "reps",
    suggestedValue: 12,
    description: [
      "Ligg på magen med armene strakt fremover og bena strake.",
      "Løft armer, bryst og ben samtidig opp fra gulvet.",
      "Hold posisjonen et sekund øverst og klem setemusklene.",
      "Senk kontrollert ned. Styrker korsrygg, sete og bakside lår."
    ]
  },
  {
    id: "reverse-plank",
    name: "Omvendt planke",
    muscleGroup: "mage",
    image: "/exercises/reverse-plank.gif",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["abs"],
    unit: "sek",
    suggestedValue: 30,
    description: [
      "Sitt på gulvet med bena strake og hendene bak hoften, fingre peker fremover.",
      "Press ned i hendene og løft hoften opp til kroppen danner en rett linje.",
      "Hold skuldrene tilbake og klem setemusklene gjennom hele holdet.",
      "Trener kjernemuskulaturen, sete og skuldrene fra baksiden."
    ]
  },
  {
    id: "bird-dog",
    name: "Fuglehund",
    muscleGroup: "rygg",
    image: "/exercises/bird-dog.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["lower back"],
    unit: "reps",
    suggestedValue: 12,
    description: [
      "Start på alle fire med knærne under hoften og hendene under skuldrene.",
      "Strekk venstre arm og høyre ben samtidig ut i én rett linje.",
      "Hold ett sekund øverst, senk kontrollert og bytt side.",
      "Trener korsrygg, core-stabilitet og balanse."
    ]
  },
  {
    id: "stationary-arms-throw",
    name: "Stående armkast",
    muscleGroup: "rygg",
    image: "/exercises/stationary-arms-throw.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["upper back"],
    unit: "reps",
    suggestedValue: 15,
    description: [
      "Stå med lett bøyde knær og overkroppen svakt foroverbøyd.",
      "Bring armene fremover og kast dem bakover i én eksplosiv bevegelse.",
      "Klem skulderbladene sammen øverst i bevegelsen.",
      "Trener øvre rygg, skulderblad-stabilisatorer og holdningsmuskulatur."
    ]
  },
  {
    id: "kneeling-back-rotation",
    name: "Knelende ryggrotering",
    muscleGroup: "rygg",
    image: "/exercises/kneeling-back-rotation.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["upper back"],
    unit: "reps",
    suggestedValue: 12,
    description: [
      "Knél på gulvet med oppreist overkropp og hendene bak hodet.",
      "Roter overkroppen til én side så langt det er komfortabelt.",
      "Roter tilbake gjennom midten og videre til andre side.",
      "Mobiliserer thorakalryggen og styrker de skrå ryggmusklene."
    ]
  },
  {
    id: "scapula-row",
    name: "Stående skulderblad-ro",
    muscleGroup: "rygg",
    image: "/exercises/scapula-row.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["upper back"],
    unit: "reps",
    suggestedValue: 15,
    description: [
      "Stå med armene hengende langs siden og lett fremoverlent overkropp.",
      "Trekk skulderbladene inn mot hverandre uten å bøye albuene.",
      "Hold et sekund og slipp kontrollert.",
      "Isolerer skulderblad-retraktorene og forbedrer holdning og ryggstyrke."
    ]
  },
  {
    id: "wall-slide-half-squat",
    name: "Veggslide halvknebøy",
    muscleGroup: "ben",
    image: "/exercises/wall-slide-half-squat.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["quadriceps"],
    unit: "reps",
    suggestedValue: 12,
    description: [
      "Stå med ryggen mot veggen og føttene skulderbredde fra hverandre.",
      "Skyv ryggen ned langs veggen til knærne er ca. 90 grader.",
      "Hold posisjonen et sekund, skyv deretter opp igjen.",
      "Trener lår og sete med støtte — bra for nybegynnere og rehabilitering."
    ]
  },
  {
    id: "stair-up",
    name: "Trappestepp",
    muscleGroup: "ben",
    image: "/exercises/stair-up.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["quadriceps"],
    unit: "reps",
    suggestedValue: 15,
    description: [
      "Stå foran en trapp eller et stabilt underlag i passende høyde.",
      "Stepp opp med ett ben og press deg opp til du står på trinnet.",
      "Stepp kontrollert ned og gjenta på samme ben, eller veksle.",
      "Trener lår, sete og balanse — effektiv hverdagsøvelse."
    ]
  },
  {
    id: "shrimp-squat",
    name: "Rekeknebøy",
    muscleGroup: "ben",
    image: "/exercises/shrimp-squat.gif",
    equipment: "body only",
    level: "advanced",
    primaryMuscles: ["quadriceps"],
    unit: "reps",
    suggestedValue: 6,
    description: [
      "Stå på ett ben og hold det andre benet bøyd bak deg med hånden.",
      "Senk deg ned på stående ben til bakkneet nesten berører gulvet.",
      "Hold overkroppen oppreist gjennom hele bevegelsen.",
      "Krevende ettbensøvelse som bygger styrke og balanse i lår og sete."
    ]
  },
  {
    id: "pulse-squat",
    name: "Pulsknebøy",
    muscleGroup: "ben",
    image: "/exercises/pulse-squat.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["quadriceps"],
    unit: "reps",
    suggestedValue: 20,
    description: [
      "Gå ned i knebøy til lårene er parallelle med gulvet.",
      "Hold posisjonen og gjør små, raske opp-ned-bevegelser (pulser).",
      "Hold knærne over tærne og ryggen rett gjennom hele settet.",
      "Holder konstant spenning i lårene — brenner effektivt."
    ]
  },
  {
    id: "squat-tip-toe",
    name: "Knebøy på tå",
    muscleGroup: "ben",
    image: "/exercises/squat-tip-toe.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["quadriceps"],
    unit: "reps",
    suggestedValue: 12,
    description: [
      "Stå med føttene skulderbredde fra hverandre og reis deg på tå.",
      "Hold tåposisjonen og senk deg ned i knebøy.",
      "Press opp igjen og senk hælene kontrollert.",
      "Kombinerer knebøy med leggarbeid — trener lår, sete og legger."
    ]
  },
  {
    id: "single-leg-deadlift",
    name: "Ettbens markløft",
    muscleGroup: "ben",
    image: "/exercises/single-leg-deadlift.gif",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["hamstrings"],
    unit: "reps",
    suggestedValue: 10,
    description: [
      "Stå på ett ben med lett bøy i kneet og armene langs siden.",
      "Lene overkroppen fremover mens det frie benet strekkes bakover.",
      "Hold ryggen rett og hoften i vater gjennom hele bevegelsen.",
      "Trener bakside lår, sete og balanse — utfordrende for stabilisatorene."
    ]
  },
  {
    id: "sissy-squat",
    name: "Sissy-knebøy",
    muscleGroup: "ben",
    image: "/exercises/sissy-squat.gif",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["quadriceps"],
    unit: "reps",
    suggestedValue: 10,
    description: [
      "Stå med føttene hoftebredde fra hverandre og reis deg på tå.",
      "Lene overkroppen bakover mens knærne skyves fremover mot gulvet.",
      "Hold hoftene strake og kroppen i én linje fra knær til skuldre.",
      "Isolerer quadriceps intenst — en av de beste kroppsvektøvelsene for lår."
    ]
  },
  {
    id: "forward-lunge",
    name: "Fremover utfall",
    muscleGroup: "ben",
    image: "/exercises/forward-lunge.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["quadriceps"],
    unit: "reps",
    suggestedValue: 12,
    description: [
      "Stå oppreist med føttene samlet og hendene på hoften.",
      "Ta ett langt skritt fremover og senk bakkneet mot gulvet.",
      "Press fra fremre fot og returner til startposisjon.",
      "Veksle ben for hvert steg. Trener lår, sete og balanse."
    ]
  },
  {
    id: "narrow-stance-squat",
    name: "Smalstående knebøy",
    muscleGroup: "ben",
    image: "/exercises/narrow-stance-squat.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["quadriceps"],
    unit: "reps",
    suggestedValue: 15,
    description: [
      "Stå med føttene tett sammen og tærne peker rett frem.",
      "Senk deg ned i knebøy mens knærne holder seg over tærne.",
      "Press opp til startposisjon og hold core spent gjennom bevegelsen.",
      "Smal stilling aktiverer ytterside lår og quadriceps mer enn bred knebøy."
    ]
  },
  {
    id: "patrick-step",
    name: "Patrick-stepp",
    muscleGroup: "ben",
    image: "/exercises/patrick-step.gif",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["quadriceps"],
    unit: "reps",
    suggestedValue: 10,
    description: [
      "Stå på ett ben på kanten av et trinn med hælen hengende fritt.",
      "Senk det frie benet ned og bak mens du bøyer stående kne.",
      "Press opp igjen til startposisjon uten å støtte med det frie benet.",
      "Rehabiliteringsøvelse for knær som bygger styrke i quadriceps og sete."
    ]
  },
  {
    id: "diamond-push-up-knees",
    name: "Diamant push-up på knær",
    muscleGroup: "armer",
    image: "/exercises/diamond-push-up-knees.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["triceps"],
    unit: "reps",
    suggestedValue: 10,
    description: [
      "Start i push-up posisjon på knærne med hendene under brystet.",
      "Plasser tommelfingre og pekefingre mot hverandre slik at de danner en diamant.",
      "Senk brystet kontrollert ned mot hendene og press opp igjen.",
      "Den smale håndposisjonen isolerer triceps effektivt."
    ]
  },
  {
    id: "floor-dip-chair",
    name: "Gulvdips med stol",
    muscleGroup: "armer",
    image: "/exercises/floor-dip-chair.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["triceps"],
    unit: "reps",
    suggestedValue: 12,
    description: [
      "Sitt foran en stabil stol med hendene på setet bak deg.",
      "Løft hoften fra gulvet og hold vekten på hendene og hælene.",
      "Bøy albuene og senk hoften kontrollert ned mot gulvet.",
      "Press opp igjen til armene er strake. Trener triceps og skuldrenes bakside."
    ]
  },
  {
    id: "dynamic-plank-elbow",
    name: "Dynamisk planke albu opp-ned",
    muscleGroup: "mage",
    image: "/exercises/dynamic-plank-elbow.gif",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["abs"],
    unit: "reps",
    suggestedValue: 10,
    description: [
      "Start i frontplank på underarmene med rett kropp fra hode til hæl.",
      "Press opp til full planke på hendene, én arm av gangen.",
      "Senk tilbake til underarmsplanke på samme måte.",
      "Veksle hvilken arm som leder. Trener core, triceps og skulder."
    ]
  },
  {
    id: "squat-thrust",
    name: "Knebøy-thrust",
    muscleGroup: "mage",
    image: "/exercises/squat-thrust.gif",
    equipment: "body only",
    level: "intermediate",
    primaryMuscles: ["abs"],
    unit: "reps",
    suggestedValue: 12,
    description: [
      "Stå oppreist, bøy deg ned og plasser hendene i gulvet.",
      "Hopp eller gå bena bakover til full plankeposisjon.",
      "Hopp eller gå bena frem igjen og reis deg opp.",
      "Helkroppsøvelse som kombinerer styrke og kondisjon."
    ]
  },
  {
    id: "lying-air-cycles",
    name: "Liggende luftsykkel",
    muscleGroup: "mage",
    image: "/exercises/lying-air-cycles.gif",
    equipment: "body only",
    level: "beginner",
    primaryMuscles: ["abs"],
    unit: "reps",
    suggestedValue: 20,
    description: [
      "Ligg på ryggen med hendene bak hodet og bena løftet fra gulvet.",
      "Beveg bena i en sykkelpedalende bevegelse i luften.",
      "Hold korsryggen presset mot gulvet gjennom hele øvelsen.",
      "Trener nedre mage og hoftefleksorer med lav belastning på ryggen."
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
  armer: 'Armer',
}
