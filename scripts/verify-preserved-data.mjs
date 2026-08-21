import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { toeic650SourceData } from "../src/data/toeic650-source-data.ts";
import { LEGACY_FOOT_WORD_ID } from "../src/lib/legacy-content.ts";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: process.env.DATABASE_URL || "file:dev.db",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  }),
});

try {
  const [words, core, legacy, imported, reviewStates, attempts, studySessions, exercises, foot, footContent] = await Promise.all([
    prisma.word.count(),
    prisma.contentItem.count({ where: { kind: { in: ["verb", "phrase", "tense"] }, archivedAt: null } }),
    prisma.contentItem.count({ where: { kind: "legacy_word", archivedAt: null } }),
    prisma.contentItem.count({ where: { kind: "imported_example", archivedAt: null } }),
    prisma.reviewState.count(),
    prisma.attempt.count(),
    prisma.studySession.count(),
    prisma.exercise.count({ where: { status: "approved" } }),
    prisma.word.findUnique({ where: { id: LEGACY_FOOT_WORD_ID } }),
    prisma.contentItem.findUnique({ where: { sourceKey: `legacy-word:${LEGACY_FOOT_WORD_ID}` } }),
  ]);
  const expectedCore = toeic650SourceData.verbs.length + toeic650SourceData.phrases.length + toeic650SourceData.tenses.length;
  const report = { words, core, legacy, imported, reviewStates, attempts, studySessions, exercises, footMeaning: foot?.correctMeaning, footContentMeaning: footContent?.meaningVi };
  console.log(JSON.stringify(report, null, 2));
  if (core !== expectedCore) throw new Error(`Expected ${expectedCore} active core items, found ${core}.`);
  if (legacy !== words) throw new Error(`Expected ${words} active legacy items, found ${legacy}.`);
  if (foot?.correctMeaning !== "lòng bàn chân" || footContent?.meaningVi !== "lòng bàn chân") {
    throw new Error("The known legacy foot mapping has not been repaired.");
  }
} finally {
  await prisma.$disconnect();
}
