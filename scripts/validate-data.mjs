import { validateToeic650SourceData, toeic650SourceData } from "../src/data/toeic650-source-data.ts";
import { part5Exercises, validatePart5Exercises } from "../src/data/part5-exercises.ts";

const errors = [
  ...validateToeic650SourceData(),
  ...validatePart5Exercises(),
];

if (errors.length > 0) {
  console.error("TOEIC data validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${toeic650SourceData.verbs.length} verbs, ${toeic650SourceData.tenses.length} tenses, ` +
    `${toeic650SourceData.phrases.length} phrases, and ${part5Exercises.length} Part 5 exercises.`,
  );
}
