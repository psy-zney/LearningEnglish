import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import {
  phrases,
  tenses,
  toeic650SourceData,
  validateToeic650SourceData,
  verbs,
} from "../src/data/toeic650-source-data.ts";
import { part5Exercises, validatePart5Exercises } from "../src/data/part5-exercises.ts";
import { repairKnownLegacyWord, serializeLegacyWordContent } from "../src/lib/legacy-content.ts";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

function serializeSourceItem(item: (typeof verbs)[number] | (typeof tenses)[number] | (typeof phrases)[number]) {
  if ("lemma" in item) {
    return {
      sourceKey: item.id,
      kind: "verb",
      title: item.lemma,
      meaningVi: item.meaningVi.join(", "),
      contentJson: JSON.stringify(item),
      topic: item.topic,
      toeicParts: item.toeicParts.join(","),
      cefr: item.cefr,
      priority: item.priority,
    };
  }
  if ("phrase" in item) {
    return {
      sourceKey: item.id,
      kind: "phrase",
      title: item.phrase,
      meaningVi: item.meaningVi,
      contentJson: JSON.stringify(item),
      topic: item.topic,
      toeicParts: item.toeicParts.join(","),
      cefr: item.cefr,
      priority: item.priority,
    };
  }
  return {
    sourceKey: item.id,
    kind: "tense",
    title: item.nameEn,
    meaningVi: item.nameVi,
    contentJson: JSON.stringify(item),
    topic: "grammar",
    toeicParts: item.toeicParts.join(","),
    cefr: null,
    priority: item.priority,
  };
}

async function main() {
  const sourceItems = [...verbs, ...tenses, ...phrases];
  const validationErrors = [
    ...validateToeic650SourceData(),
    ...validatePart5Exercises(new Set(sourceItems.map((item) => item.id))),
  ];
  if (validationErrors.length > 0) throw new Error(validationErrors.join("\n"));

  const report = { created: 0, updated: 0, unchanged: 0, archived: 0, legacy: 0, exercises: 0 };
  const activeKeys = sourceItems.map((item) => item.id);

  for (const item of sourceItems) {
    const data = serializeSourceItem(item);
    const existing = await prisma.contentItem.findUnique({ where: { sourceKey: item.id } });
    if (!existing) report.created += 1;
    else if (existing.sourceVersion === toeic650SourceData.contentVersion && existing.contentJson === data.contentJson) report.unchanged += 1;
    else report.updated += 1;

    await prisma.contentItem.upsert({
      where: { sourceKey: item.id },
      create: {
        ...data,
        status: "approved",
        sourceVersion: toeic650SourceData.contentVersion,
      },
      update: {
        ...data,
        status: "approved",
        sourceVersion: toeic650SourceData.contentVersion,
        archivedAt: null,
      },
    });
  }

  const archived = await prisma.contentItem.updateMany({
    where: {
      kind: { in: ["verb", "phrase", "tense"] },
      sourceKey: { notIn: activeKeys },
      archivedAt: null,
    },
    data: { archivedAt: new Date(), status: "archived" },
  });
  report.archived = archived.count;

  const legacyWords = await prisma.word.findMany();
  for (const persistedWord of legacyWords) {
    const word = repairKnownLegacyWord(persistedWord);
    if (word !== persistedWord) {
      await prisma.word.update({
        where: { id: word.id },
        data: {
          meaning: word.meaning,
          correctMeaning: word.correctMeaning,
          explanation: word.explanation,
        },
      });
    }

    const sourceKey = `legacy-word:${word.id}`;
    const serializedWord = serializeLegacyWordContent(word);
    const content = await prisma.contentItem.upsert({
      where: { sourceKey },
      create: {
        sourceKey,
        kind: "legacy_word",
        ...serializedWord,
        topic: word.tags || "inbox",
        toeicParts: "",
        priority: 3,
        status: "approved",
        sourceVersion: "legacy",
      },
      update: {
        ...serializedWord,
      },
    });
    await prisma.reviewState.upsert({
      where: { contentItemId: content.id },
      create: {
        contentItemId: content.id,
        nextReviewAt: word.nextReviewDate,
        interval: word.interval,
        repetition: word.repetition,
        easeFactor: word.easeFactor,
      },
      update: {},
    });
    report.legacy += 1;
  }

  for (const exercise of part5Exercises) {
    await prisma.exercise.upsert({
      where: { id: exercise.id },
      create: {
        id: exercise.id,
        part: exercise.part,
        prompt: exercise.prompt,
        optionsJson: JSON.stringify(exercise.options),
        correctOptionId: exercise.correctOptionId,
        explanationVi: exercise.explanationVi,
        errorCategory: exercise.errorCategory,
        focusContentIds: exercise.focusContentIds.join(","),
        difficulty: exercise.difficulty,
        sourceVersion: toeic650SourceData.contentVersion,
      },
      update: {
        prompt: exercise.prompt,
        optionsJson: JSON.stringify(exercise.options),
        correctOptionId: exercise.correctOptionId,
        explanationVi: exercise.explanationVi,
        errorCategory: exercise.errorCategory,
        focusContentIds: exercise.focusContentIds.join(","),
        difficulty: exercise.difficulty,
        status: "approved",
        sourceVersion: toeic650SourceData.contentVersion,
      },
    });
    report.exercises += 1;
  }

  console.log(JSON.stringify(report, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
