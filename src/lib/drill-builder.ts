import {
  drillModes,
  type DrillBuildOptions,
  type DrillContent,
  type DrillGrade,
  type DrillMode,
  type DrillOption,
  type DrillSource,
  type DrillView,
  type GradeDailyDrillInput,
} from "../domain/drill.ts";

type InternalDrill = {
  view: DrillView;
  correctAnswer: string;
  acceptedAnswers: string[];
  correctOptionId?: string;
  explanation?: string;
};

const CONTENT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;
const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DRILL_ID_PATTERN = /^drill-v1-\d{4}-\d{2}-\d{2}-(?:meaning|reverse_meaning|fill_blank|collocation|pattern)-[A-Za-z0-9][A-Za-z0-9_-]{0,127}-[0-9a-f]{8}$/;

function stableHash(value: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function createPrng(seed: string) {
  let state = stableHash(seed);
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function shuffle<T>(values: readonly T[], seed: string) {
  const output = [...values];
  const random = createPrng(seed);
  for (let index = output.length - 1; index > 0; index -= 1) {
    const otherIndex = Math.floor(random() * (index + 1));
    [output[index], output[otherIndex]] = [output[otherIndex], output[index]];
  }
  return output;
}

function isValidDateKey(dateKey: string) {
  if (!DATE_KEY_PATTERN.test(dateKey)) return false;
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function normalizeAnswer(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[‘’]/g, "'")
    .trim()
    .replace(/^["'“”.,;:!?\s]+|["'“”.,;:!?\s]+$/gu, "")
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("en-US");
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function stringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim());
}

function firstExample(item: DrillContent, seed = item.id) {
  if (!Array.isArray(item.detail.examples)) return null;
  const examples: Array<{ en: string; vi?: string; source?: DrillSource }> = [];
  for (const value of item.detail.examples) {
    const example = asRecord(value);
    if (!example || typeof example.en !== "string" || !example.en.trim()) continue;
    const sourceRecord = asRecord(example.source);
    const source = sourceRecord
      && typeof sourceRecord.attribution === "string"
      && typeof sourceRecord.sourceUrl === "string"
      && typeof sourceRecord.license === "string"
      && typeof sourceRecord.licenseUrl === "string"
      && sourceRecord.sourceUrl.startsWith("https://")
      && sourceRecord.licenseUrl.startsWith("https://")
      ? {
          attribution: sourceRecord.attribution,
          sourceUrl: sourceRecord.sourceUrl,
          license: sourceRecord.license,
          licenseUrl: sourceRecord.licenseUrl,
        }
      : undefined;
    const vi = typeof example.vi === "string" && example.vi.trim() ? example.vi.trim() : undefined;
    examples.push({ en: example.en.trim(), ...(vi ? { vi } : {}), ...(source ? { source } : {}) });
  }
  return shuffle(examples, `${seed}:examples`)[0] ?? null;
}

function patternFor(item: DrillContent) {
  const patterns = stringArray(item.detail.patterns);
  if (patterns[0]) return patterns[0];
  if (typeof item.detail.pattern === "string" && item.detail.pattern.trim()) return item.detail.pattern.trim();
  const formula = asRecord(item.detail.formula);
  return formula && typeof formula.affirmative === "string" && formula.affirmative.trim()
    ? formula.affirmative.trim()
    : null;
}

function collocationFor(item: DrillContent) {
  return stringArray(item.detail.collocations)[0] ?? null;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function exactTermRegExp(term: string, global = false) {
  return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(term)}(?![\\p{L}\\p{N}])`, global ? "giu" : "iu");
}

function blankMaterial(item: DrillContent, seed: string) {
  const example = firstExample(item, seed);
  if (!example) return null;

  const forms = asRecord(item.detail.forms);
  const terms = [
    item.title,
    ...(forms ? Object.values(forms).filter((value): value is string => typeof value === "string") : []),
  ]
    .map((term) => term.trim())
    .filter(Boolean)
    .filter((term, index, all) => all.findIndex((candidate) => normalizeAnswer(candidate) === normalizeAnswer(term)) === index)
    .sort((left, right) => right.length - left.length);

  const matches = terms.flatMap((term) => {
    const match = exactTermRegExp(term).exec(example.en);
    return match ? [{ index: match.index, surface: match[0], term }] : [];
  }).sort((left, right) => left.index - right.index || right.surface.length - left.surface.length);

  const first = matches[0];
  if (!first) return null;
  return {
    prompt: example.en.replace(exactTermRegExp(first.term, true), "_____"),
    correctAnswer: first.surface,
    source: example.source,
    explanation: `${example.en}${example.vi ? ` · ${example.vi}` : ""}`,
  };
}

function cleanContent(contents: readonly DrillContent[]) {
  const seen = new Set<string>();
  return contents
    .filter((item) => (
      CONTENT_ID_PATTERN.test(item.id)
      && typeof item.kind === "string"
      && item.kind.trim().length > 0
      && typeof item.title === "string"
      && item.title.trim().length > 0
      && typeof item.meaningVi === "string"
      && item.meaningVi.trim().length > 0
      && asRecord(item.detail) !== null
    ))
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .map((item) => ({
      ...item,
      kind: item.kind.trim(),
      title: item.title.trim(),
      meaningVi: item.meaningVi.trim(),
      topic: typeof item.topic === "string" && item.topic.trim() ? item.topic.trim() : null,
    }))
    .sort((left, right) => left.id.localeCompare(right.id, "en"));
}

function valueForMode(item: DrillContent, mode: DrillMode) {
  if (mode === "meaning") return item.meaningVi;
  if (mode === "collocation") return collocationFor(item);
  if (mode === "pattern") return patternFor(item);
  return null;
}

function choiceOptions(
  target: DrillContent,
  contents: readonly DrillContent[],
  mode: "meaning" | "collocation" | "pattern",
  optionCount: number,
  seed: string,
) {
  const correctAnswer = valueForMode(target, mode);
  if (!correctAnswer) return null;

  const selectedValues = new Set([normalizeAnswer(correctAnswer)]);
  const distractors: string[] = [];
  const groups = [
    contents.filter((item) => item.id !== target.id && item.kind === target.kind && item.topic === target.topic),
    contents.filter((item) => item.id !== target.id && item.kind === target.kind),
    contents.filter((item) => item.id !== target.id && item.topic === target.topic),
    contents.filter((item) => item.id !== target.id),
  ];

  for (let groupIndex = 0; groupIndex < groups.length && distractors.length < optionCount - 1; groupIndex += 1) {
    const group = shuffle(groups[groupIndex], `${seed}:group:${groupIndex}`);
    for (const candidate of group) {
      const value = valueForMode(candidate, mode);
      if (!value) continue;
      const normalized = normalizeAnswer(value);
      if (!normalized || selectedValues.has(normalized)) continue;
      selectedValues.add(normalized);
      distractors.push(value);
      if (distractors.length >= optionCount - 1) break;
    }
  }

  const optionTexts = shuffle([correctAnswer, ...distractors], `${seed}:options`);
  const options: DrillOption[] = optionTexts.map((text, index) => ({ id: `option-${index + 1}`, text }));
  const correctOptionId = options.find((option) => normalizeAnswer(option.text) === normalizeAnswer(correctAnswer))?.id;
  return correctOptionId ? { options, correctAnswer, correctOptionId } : null;
}

function instructionFor(mode: DrillMode) {
  if (mode === "meaning") return "Chọn nghĩa tiếng Việt đúng.";
  if (mode === "reverse_meaning") return "Gõ headword hoặc cả cụm tiếng Anh.";
  if (mode === "fill_blank") return "Điền từ hoặc cụm từ còn thiếu.";
  if (mode === "collocation") return "Chọn collocation tự nhiên.";
  return "Chọn pattern đúng.";
}

function makeId(dateKey: string, mode: DrillMode, contentId: string, prompt: string) {
  const fingerprint = stableHash(`${dateKey}|${mode}|${contentId}|${prompt}`).toString(16).padStart(8, "0");
  return `drill-v1-${dateKey}-${mode}-${contentId}-${fingerprint}`;
}

function buildOne(
  item: DrillContent,
  contents: readonly DrillContent[],
  mode: DrillMode,
  dateKey: string,
  optionCount: number,
): InternalDrill | null {
  const seed = `${dateKey}:${mode}:${item.id}`;
  let prompt = "";
  let correctAnswer = "";
  let acceptedAnswers: string[] = [];
  let options: DrillOption[] | undefined;
  let correctOptionId: string | undefined;
  let source: DrillSource | undefined;
  let explanation: string | undefined;

  if (mode === "meaning") {
    prompt = item.title;
    const choice = choiceOptions(item, contents, mode, optionCount, seed);
    if (!choice) return null;
    ({ options, correctAnswer, correctOptionId } = choice);
    acceptedAnswers = [correctAnswer];
  } else if (mode === "reverse_meaning") {
    prompt = item.meaningVi;
    correctAnswer = item.title;
    acceptedAnswers = [item.title];
  } else if (mode === "fill_blank") {
    const blank = blankMaterial(item, seed);
    if (!blank) return null;
    prompt = blank.prompt;
    correctAnswer = blank.correctAnswer;
    source = blank.source;
    explanation = blank.explanation;
    acceptedAnswers = [blank.correctAnswer];
  } else if (mode === "collocation" || mode === "pattern") {
    prompt = item.title;
    const choice = choiceOptions(item, contents, mode, optionCount, seed);
    if (!choice) return null;
    ({ options, correctAnswer, correctOptionId } = choice);
    acceptedAnswers = [correctAnswer];
  }

  const view: DrillView = {
    id: makeId(dateKey, mode, item.id, prompt),
    contentId: item.id,
    mode,
    inputKind: options ? "choice" : "text",
    instruction: instructionFor(mode),
    prompt,
    ...(options ? { options } : {}),
    ...(source ? { source } : {}),
  };

  return { view, correctAnswer, acceptedAnswers, correctOptionId, explanation };
}

function normalizeModes(modes: readonly DrillMode[] | undefined) {
  const requested = modes ?? drillModes;
  return drillModes.filter((mode) => requested.includes(mode));
}

function buildInternal(contents: readonly DrillContent[], options: DrillBuildOptions) {
  if (!isValidDateKey(options.dateKey)) return [];
  const clean = cleanContent(contents);
  const limitPerMode = Math.min(50, Math.max(1, Math.trunc(options.limitPerMode ?? 5)));
  const optionCount = Math.min(4, Math.max(2, Math.trunc(options.optionCount ?? 4)));
  const output: InternalDrill[] = [];

  for (const mode of normalizeModes(options.modes)) {
    const candidates = shuffle(clean, `${options.dateKey}:${mode}:targets`);
    let modeCount = 0;
    for (const item of candidates) {
      const drill = buildOne(item, clean, mode, options.dateKey, optionCount);
      if (!drill) continue;
      output.push(drill);
      modeCount += 1;
      if (modeCount >= limitPerMode) break;
    }
  }
  return output;
}

export function buildDailyDrills(contents: readonly DrillContent[], options: DrillBuildOptions): DrillView[] {
  return buildInternal(contents, options).map((drill) => drill.view);
}

export function gradeDailyDrill(contents: readonly DrillContent[], input: GradeDailyDrillInput): DrillGrade {
  if (
    typeof input.drillId !== "string"
    || input.drillId.length > 240
    || !DRILL_ID_PATTERN.test(input.drillId)
  ) {
    return { status: "invalid", code: "invalid_drill" };
  }
  if (typeof input.answer !== "string" || input.answer.length > 500) {
    return { status: "invalid", code: "invalid_answer" };
  }

  const drill = buildInternal(contents, input).find((candidate) => candidate.view.id === input.drillId);
  if (!drill) return { status: "invalid", code: "invalid_drill" };

  const normalized = normalizeAnswer(input.answer);
  const isCorrect = drill.correctOptionId
    ? input.answer === drill.correctOptionId || normalized === normalizeAnswer(drill.correctAnswer)
    : drill.acceptedAnswers.some((answer) => normalizeAnswer(answer) === normalized);

  return {
    status: "graded",
    isCorrect,
    correctAnswer: drill.correctAnswer,
    contentId: drill.view.contentId,
    mode: drill.view.mode,
    ...(drill.explanation ? { explanation: drill.explanation } : {}),
  };
}
