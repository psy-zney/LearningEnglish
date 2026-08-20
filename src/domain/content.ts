import {
  phrases,
  tenses,
  toeic650SourceData,
  verbs,
  type CefrLevel,
  type ContentPriority,
  type PhraseItem,
  type TenseItem,
  type ToeicPart,
  type Topic,
  type VerbItem,
} from "@/data/toeic650-source-data";

export type ContentKind = "verb" | "phrase" | "tense" | "legacy_word";

export type LearningContent = {
  id: string;
  kind: Exclude<ContentKind, "legacy_word">;
  title: string;
  meaningVi: string;
  topic: Topic | "grammar";
  toeicParts: ToeicPart[];
  cefr: CefrLevel | null;
  priority: ContentPriority;
  exampleEn: string;
  exampleVi: string;
  detail: VerbItem | PhraseItem | TenseItem;
};

export const sourceContent: LearningContent[] = [
  ...verbs.map((item): LearningContent => ({
    id: item.id,
    kind: "verb",
    title: item.lemma,
    meaningVi: item.meaningVi.join(", "),
    topic: item.topic,
    toeicParts: item.toeicParts,
    cefr: item.cefr,
    priority: item.priority,
    exampleEn: item.examples[0].en,
    exampleVi: item.examples[0].vi,
    detail: item,
  })),
  ...phrases.map((item): LearningContent => ({
    id: item.id,
    kind: "phrase",
    title: item.phrase,
    meaningVi: item.meaningVi,
    topic: item.topic,
    toeicParts: item.toeicParts,
    cefr: item.cefr,
    priority: item.priority,
    exampleEn: item.examples[0].en,
    exampleVi: item.examples[0].vi,
    detail: item,
  })),
  ...tenses.map((item): LearningContent => ({
    id: item.id,
    kind: "tense",
    title: item.nameEn,
    meaningVi: item.nameVi,
    topic: "grammar",
    toeicParts: item.toeicParts,
    cefr: null,
    priority: item.priority,
    exampleEn: item.examples[0].en,
    exampleVi: item.examples[0].vi,
    detail: item,
  })),
].sort((a, b) => a.priority - b.priority || a.title.localeCompare(b.title));

export const sourceContentById = new Map(sourceContent.map((item) => [item.id, item]));

export function serializeContent(item: LearningContent) {
  return {
    sourceKey: item.id,
    kind: item.kind,
    title: item.title,
    meaningVi: item.meaningVi,
    contentJson: JSON.stringify(item.detail),
    topic: item.topic,
    toeicParts: item.toeicParts.join(","),
    cefr: item.cefr,
    priority: item.priority,
    status: "approved",
    sourceVersion: toeic650SourceData.contentVersion,
    archivedAt: null,
  };
}

export function getContentCue(item: LearningContent) {
  if (item.kind === "tense") return `Khi nào dùng ${item.meaningVi}?`;
  return item.meaningVi;
}

export function getContentPattern(item: LearningContent) {
  if (item.kind === "verb") return (item.detail as VerbItem).patterns[0];
  if (item.kind === "phrase") return (item.detail as PhraseItem).pattern ?? "Learn as one complete chunk";
  return (item.detail as TenseItem).formula.affirmative;
}

export function getAcceptedRecallAnswers(item: LearningContent) {
  if (item.kind === "tense") return [item.title, item.meaningVi];
  return [item.title];
}
