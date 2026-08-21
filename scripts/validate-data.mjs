import { validateToeic650SourceData, toeic650SourceData } from "../src/data/toeic650-source-data.ts";
import { part5Exercises, validatePart5Exercises } from "../src/data/part5-exercises.ts";
import { buildDailyDrills } from "../src/lib/drill-builder.ts";

const drillContent = [
  ...toeic650SourceData.verbs.map((item) => ({ id: item.id, kind: "verb", title: item.lemma, meaningVi: item.meaningVi.join(", "), topic: item.topic, detail: item })),
  ...toeic650SourceData.phrases.map((item) => ({ id: item.id, kind: "phrase", title: item.phrase, meaningVi: item.meaningVi, topic: item.topic, detail: item })),
  ...toeic650SourceData.tenses.map((item) => ({ id: item.id, kind: "tense", title: item.nameEn, meaningVi: item.nameVi, topic: "grammar", detail: item })),
];
const contentIds = new Set(drillContent.map((item) => item.id));
const errors = [
  ...validateToeic650SourceData(),
  ...validatePart5Exercises(contentIds),
];
const generatedDrills = buildDailyDrills(drillContent, { dateKey: "2026-08-21", limitPerMode: 50 });
const drillCounts = Object.fromEntries(["meaning", "reverse_meaning", "fill_blank", "collocation", "pattern"].map((mode) => [
  mode,
  generatedDrills.filter((drill) => drill.mode === mode).length,
]));
for (const [mode, count] of Object.entries(drillCounts)) {
  if (count === 0) errors.push(`No generated drills for mode: ${mode}`);
}

if (errors.length > 0) {
  console.error("TOEIC data validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${toeic650SourceData.verbs.length} verbs, ${toeic650SourceData.tenses.length} tenses, ` +
    `${toeic650SourceData.phrases.length} phrases, and ${part5Exercises.length} Part 5 exercises.`,
  );
  console.log(`Generated drill validation: ${JSON.stringify(drillCounts)}.`);
}
