import { stage1VocabLessons } from "../src/data/stage1-vocab-data.ts";
import { stage2VocabLessons } from "../src/data/stage2-vocab-intermediate-data.ts";
import { toeic650SourceData } from "../src/data/toeic650-source-data.ts";
import { shadowingSentences, shadowingDialogues } from "../src/data/shadowing-data.ts";

let s1Count = 0;
for (const lesson of stage1VocabLessons) {
  if (lesson.words) {
    s1Count += lesson.words.length;
  }
}

let s2Count = 0;
for (const lesson of stage2VocabLessons) {
  if (lesson.words) {
    s2Count += lesson.words.length;
  }
}

const dbVerbs = toeic650SourceData.verbs.length;
const dbPhrases = toeic650SourceData.phrases.length;
const dbTenses = toeic650SourceData.tenses.length;

console.log("=== THỐNG KÊ TỪ VỰNG & NỘI DUNG TOÀN HỆ THỐNG ===");
console.log(`1. Chặng 1 (0 -> 300) - Từ vựng nền tảng: ${s1Count} từ (12 chủ đề thiết yếu, 20 từ/chủ đề)`);
console.log(`2. Chặng 2 (300 -> 600) - Từ vựng trung cấp chuyên sâu: ${s2Count} từ (10 chủ đề thương mại lớn, 20 từ/chủ đề)`);
console.log(`   -> Tổng từ vựng trong Lộ trình TOEIC (Roadmap): ${s1Count + s2Count} từ vựng tiêu chuẩn`);
console.log(`3. Ngân hàng từ vựng & cấu trúc luyện tập (Drill Bank / Source Data):`);
console.log(`   - Verbs (Động từ thông dụng có bài tập & ngữ cảnh): ${dbVerbs}`);
console.log(`   - Phrases & Collocations (Cụm từ cố định): ${dbPhrases}`);
console.log(`   - Tenses & Grammar Patterns (Thì & mẫu câu): ${dbTenses}`);
console.log(`   -> Tổng ngân hàng từ & cụm từ bổ trợ trong Drill Bank: ${dbVerbs + dbPhrases + dbTenses}`);
console.log(`4. Phòng Luyện Shadowing & Giao tiếp:`);
console.log(`   - Câu luyện Shadowing chuẩn IPA: ${shadowingSentences.length} câu`);
console.log(`   - Kịch bản hội thoại mẫu: ${shadowingDialogues.length} cuộc hội thoại (${shadowingDialogues.reduce((sum, d) => sum + d.lines.length, 0)} lượt đối thoại)`);
