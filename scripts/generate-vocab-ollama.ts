/**
 * Ollama-powered vocabulary generator for TOEIC vocabulary lessons V4-V12.
 *
 * Uses qwen3.5:4b via local Ollama to generate:
 * - Example sentences for vocab words
 * - Distractor options for exercises
 * - Collocations for each word
 *
 * Usage: node --experimental-strip-types scripts/generate-vocab-ollama.ts
 */

import { Ollama } from "ollama";

const ollama = new Ollama({ host: "http://localhost:11434" });
const MODEL = "qwen3.5:4b";

// ─── Topic definitions for V4-V12 ───────────────────────────────

type TopicDef = {
  lessonId: string;
  order: number;
  topic: string;
  titleVi: string;
  titleEn: string;
  seedWords: string[];
};

const topics: TopicDef[] = [
  {
    lessonId: "s1-vocab-04", order: 15, topic: "travel-transport",
    titleVi: "Từ vựng: Du lịch & Giao thông",
    titleEn: "Vocabulary: Travel & Transport",
    seedWords: [
      "flight", "reservation", "itinerary", "destination", "departure",
      "arrival", "passenger", "luggage", "boarding", "terminal",
      "accommodation", "round-trip", "layover", "customs", "immigration",
      "passport", "check-in", "delay", "refund", "fare",
    ],
  },
  {
    lessonId: "s1-vocab-05", order: 16, topic: "shopping-services",
    titleVi: "Từ vựng: Mua sắm & Dịch vụ",
    titleEn: "Vocabulary: Shopping & Services",
    seedWords: [
      "purchase", "receipt", "warranty", "exchange", "discount",
      "coupon", "merchandise", "cashier", "refund", "inventory",
      "customer", "complaint", "satisfaction", "retail", "wholesale",
      "product", "delivery", "shipping", "catalog", "brand",
    ],
  },
  {
    lessonId: "s1-vocab-06", order: 17, topic: "finance-banking",
    titleVi: "Từ vựng: Tài chính & Ngân hàng",
    titleEn: "Vocabulary: Finance & Banking",
    seedWords: [
      "account", "balance", "deposit", "withdrawal", "transaction",
      "interest", "loan", "mortgage", "investment", "revenue",
      "profit", "expense", "invoice", "payment", "budget",
      "audit", "tax", "income", "savings", "insurance",
    ],
  },
  {
    lessonId: "s1-vocab-07", order: 18, topic: "technology-it",
    titleVi: "Từ vựng: Công nghệ & IT",
    titleEn: "Vocabulary: Technology & IT",
    seedWords: [
      "software", "hardware", "database", "network", "server",
      "install", "upgrade", "download", "backup", "password",
      "security", "access", "system", "device", "monitor",
      "printer", "scanner", "compatible", "malfunction", "troubleshoot",
    ],
  },
  {
    lessonId: "s1-vocab-08", order: 19, topic: "health-fitness",
    titleVi: "Từ vựng: Sức khỏe & Thể dục",
    titleEn: "Vocabulary: Health & Fitness",
    seedWords: [
      "appointment", "prescription", "pharmacy", "symptom", "treatment",
      "diagnosis", "medication", "hospital", "clinic", "patient",
      "physician", "emergency", "checkup", "insurance", "coverage",
      "exercise", "nutrition", "wellness", "recovery", "injury",
    ],
  },
  {
    lessonId: "s1-vocab-09", order: 20, topic: "housing-property",
    titleVi: "Từ vựng: Nhà ở & Bất động sản",
    titleEn: "Vocabulary: Housing & Property",
    seedWords: [
      "apartment", "lease", "tenant", "landlord", "rent",
      "mortgage", "property", "renovation", "inspection", "utilities",
      "furnished", "spacious", "location", "neighborhood", "residential",
      "commercial", "vacant", "occupancy", "maintenance", "deposit",
    ],
  },
  {
    lessonId: "s1-vocab-10", order: 21, topic: "dining-entertainment",
    titleVi: "Từ vựng: Ẩm thực & Giải trí",
    titleEn: "Vocabulary: Dining & Entertainment",
    seedWords: [
      "restaurant", "reservation", "menu", "appetizer", "entree",
      "dessert", "beverage", "waiter", "chef", "cuisine",
      "banquet", "catering", "reception", "ticket", "admission",
      "exhibit", "performance", "audience", "gallery", "venue",
    ],
  },
  {
    lessonId: "s1-vocab-11", order: 22, topic: "weather-environment",
    titleVi: "Từ vựng: Thời tiết & Môi trường",
    titleEn: "Vocabulary: Weather & Environment",
    seedWords: [
      "forecast", "temperature", "humidity", "precipitation", "drought",
      "flood", "storm", "climate", "pollution", "emission",
      "recycle", "sustainable", "conservation", "renewable", "disposal",
      "vegetation", "wildlife", "habitat", "ecosystem", "regulation",
    ],
  },
  {
    lessonId: "s1-vocab-12", order: 23, topic: "education-training",
    titleVi: "Từ vựng: Giáo dục & Đào tạo",
    titleEn: "Vocabulary: Education & Training",
    seedWords: [
      "curriculum", "tuition", "enrollment", "scholarship", "certificate",
      "qualification", "instructor", "graduate", "undergraduate", "thesis",
      "lecture", "tutorial", "assignment", "assessment", "evaluation",
      "diploma", "accreditation", "academic", "research", "syllabus",
    ],
  },
];

// ─── Ollama generation functions ─────────────────────────────────

async function generateExampleSentence(word: string, topic: string): Promise<{ en: string; vi: string }> {
  const prompt = `/no_think
Generate exactly ONE simple business English sentence using the word "${word}" related to "${topic}".
Keep the sentence under 15 words.
Return ONLY valid JSON: {"en": "...", "vi": "..."}
Do not include any other text.`;

  try {
    const response = await ollama.generate({ model: MODEL, prompt, stream: false });
    const match = response.response.match(/\{[^}]+\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
  } catch {
    // Fallback
  }
  return {
    en: `The ${word} is important for the business.`,
    vi: `${word} rất quan trọng cho doanh nghiệp.`,
  };
}

async function generateCollocations(word: string): Promise<string[]> {
  const prompt = `/no_think
List 3 common collocations with "${word}" in business English.
Return ONLY a JSON array of strings: ["collocation1", "collocation2", "collocation3"]
Do not include any other text.`;

  try {
    const response = await ollama.generate({ model: MODEL, prompt, stream: false });
    const match = response.response.match(/\[[\s\S]*\]/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed) && parsed.length >= 2) return parsed.slice(0, 3);
    }
  } catch {
    // Fallback
  }
  return [`use ${word}`, `${word} management`, `${word} report`];
}

async function generateDistractors(
  correctWord: string,
  allWords: string[],
): Promise<[string, string, string]> {
  const candidates = allWords.filter((w) => w !== correctWord);
  // Simple deterministic shuffle using word length
  candidates.sort((a, b) => (a.length + a.charCodeAt(0)) - (b.length + b.charCodeAt(0)));
  return [candidates[0], candidates[1], candidates[2]] as [string, string, string];
}

// ─── Main generator ──────────────────────────────────────────────

async function generateVocabLesson(topicDef: TopicDef) {
  console.log(`\n📚 Generating: ${topicDef.titleEn}`);
  console.log("─".repeat(50));

  const words = [];
  for (const seedWord of topicDef.seedWords) {
    process.stdout.write(`  ✏️  ${seedWord}...`);
    const example = await generateExampleSentence(seedWord, topicDef.topic);
    const collocations = await generateCollocations(seedWord);
    words.push({
      id: `vw-${seedWord.replace(/\s+/g, "-")}`,
      word: seedWord,
      phonetic: "", // Will be filled by phonetic API
      pos: "noun" as const, // Will be manually corrected
      meaningVi: `[TO_FILL]`, // Will be manually filled
      exampleEn: example.en,
      exampleVi: example.vi,
      topic: topicDef.topic,
      collocations,
    });
    console.log(" ✅");
  }

  // Generate exercises
  const exercises = [];
  for (let i = 0; i < Math.min(8, words.length); i++) {
    const w = words[i];
    const distractors = await generateDistractors(
      w.meaningVi,
      words.map((x) => x.meaningVi),
    );
    exercises.push({
      id: `${topicDef.lessonId.replace("s1-vocab-", "v")}e-${String(i + 1).padStart(3, "0")}`,
      type: "meaning_match",
      prompt: `"${w.word}" nghĩa là gì?`,
      options: [w.meaningVi, ...distractors].map((text, idx) => ({
        id: (["A", "B", "C", "D"] as const)[idx],
        text,
      })),
      correctOptionId: "A" as const,
      explanationVi: `${w.word} = ${w.meaningVi}`,
      targetWordId: w.id,
      difficulty: 1 as const,
    });
  }

  return {
    id: topicDef.lessonId,
    stage: "foundation" as const,
    order: topicDef.order,
    titleVi: topicDef.titleVi,
    titleEn: topicDef.titleEn,
    category: "vocabulary" as const,
    topic: topicDef.topic,
    words,
    exercises,
  };
}

// ─── Entry point ─────────────────────────────────────────────────

async function main() {
  console.log("🚀 TOEIC Vocabulary Generator (Ollama + qwen3.5:4b)");
  console.log("═".repeat(50));

  const results = [];
  for (const topic of topics) {
    const lesson = await generateVocabLesson(topic);
    results.push(lesson);
  }

  // Output as TypeScript
  const outputPath = "src/data/stage1-vocab-generated.ts";
  const tsContent = `/**
 * Auto-generated vocabulary data for Stage 1 lessons V4-V12.
 * Generated by scripts/generate-vocab-ollama.ts using Ollama qwen3.5:4b.
 * 
 * ⚠️  REVIEW REQUIRED:
 * - Check meaningVi translations (marked [TO_FILL])
 * - Verify pos (part of speech) for each word
 * - Review example sentences for accuracy
 * - Add phonetic transcriptions
 *
 * Generated at: ${new Date().toISOString()}
 */

import type { VocabLesson } from "@/domain/study-roadmap";

export const generatedVocabLessons: VocabLesson[] = ${JSON.stringify(results, null, 2)};
`;

  const fs = await import("node:fs");
  fs.writeFileSync(outputPath, tsContent);
  console.log(`\n✅ Generated ${results.length} lessons → ${outputPath}`);
  console.log(`📝 Total words: ${results.reduce((s, l) => s + l.words.length, 0)}`);
  console.log(`📝 Total exercises: ${results.reduce((s, l) => s + l.exercises.length, 0)}`);
  console.log("\n⚠️  Remember to review and fill in [TO_FILL] values!");
}

main().catch(console.error);
