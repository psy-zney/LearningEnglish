/**
 * Stage 2: Intermediate Grammar & Reading Data (TOEIC 300→600)
 *
 * Advanced grammar lessons + Part 5/6/7 exercises.
 * Content sourced from prepedu.com + author knowledge.
 */

import type { GrammarLesson, GrammarExercise, ReadingExercise, ReadingLesson, TestUnit } from "@/domain/study-roadmap";

// ─── Helper ──────────────────────────────────────────────────────

function gq(
  id: string, prompt: string,
  answers: readonly [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanationVi: string, grammarPoint: string,
  difficulty: 1 | 2 | 3 = 2,
): GrammarExercise {
  const ids = ["A", "B", "C", "D"] as const;
  return {
    id, type: "part5_fill_blank", prompt,
    options: answers.map((text, i) => ({ id: ids[i], text })),
    correctOptionId: ids[correctIndex],
    explanationVi, grammarPoint, difficulty,
  };
}

// ═══════════════════════════════════════════════════════════════════
// LESSON S2-1: TOEIC Test Introduction
// ═══════════════════════════════════════════════════════════════════

export const s2Lesson1Intro: GrammarLesson = {
  id: "s2-gram-01",
  stage: "intermediate",
  order: 1,
  titleVi: "Giới thiệu cấu trúc đề thi TOEIC",
  titleEn: "TOEIC Test Structure Introduction",
  category: "grammar",
  sourceUrl: "https://prepedu.com/vi/blog/cau-truc-de-thi-toeic",
  theorySections: [
    {
      heading: "1. Cấu trúc đề thi TOEIC Listening & Reading",
      content: "Tổng: 200 câu hỏi, 2 tiếng\n\n📢 LISTENING (100 câu - 45 phút):\n• Part 1: Photographs (6 câu) - Mô tả tranh\n• Part 2: Question-Response (25 câu) - Hỏi & Đáp\n• Part 3: Conversations (39 câu, 13 đoạn × 3 câu) - Hội thoại ngắn\n• Part 4: Talks (30 câu, 10 đoạn × 3 câu) - Bài nói ngắn\n\n📖 READING (100 câu - 75 phút):\n• Part 5: Incomplete Sentences (30 câu) - Điền chỗ trống\n• Part 6: Text Completion (16 câu, 4 đoạn × 4 câu) - Hoàn thành đoạn văn\n• Part 7: Reading Comprehension (54 câu) - Đọc hiểu",
      tip: "Part 5 là phần dễ ghi điểm nhất nếu nắm vững ngữ pháp! Nên hoàn thành Part 5 trong 10 phút.",
    },
    {
      heading: "2. Chiến lược làm Part 5",
      content: "Bước 1: Đọc lướt câu, xác định chỗ trống cần điền\nBước 2: Nhìn 4 đáp án → phân loại:\n  • Cùng gốc khác loại từ → Bài từ loại (40%)\n  • Khác gốc cùng loại từ → Bài từ vựng (30%)\n  • Cùng gốc khác dạng → Bài ngữ pháp (30%)\nBước 3: Áp dụng kiến thức → chọn đáp án\nBước 4: Không chắc → loại trừ → chọn → đi tiếp (không quá 30 giây/câu)",
    },
  ],
  exercises: [
    gq("s2g01-001", "The company's annual report _____ released last Friday.", ["is", "was", "has been", "will be"], 1, "Last Friday → quá khứ đơn bị động: was released.", "toeic_strategy", 1),
    gq("s2g01-002", "Each of the candidates _____ required to submit a resume.", ["is", "are", "were", "have been"], 0, "Each of → chủ ngữ số ít → is required.", "subject_verb_agreement"),
    gq("s2g01-003", "The new regulation will take _____ on January 1st.", ["affect", "effect", "effective", "effectively"], 1, "Take effect = có hiệu lực. Effect ở đây là danh từ.", "vocabulary_grammar"),
    gq("s2g01-004", "Employees _____ wish to attend the workshop should register online.", ["who", "whom", "whose", "which"], 0, "Who = đại từ quan hệ chỉ người, làm chủ ngữ.", "relative_pronoun"),
    gq("s2g01-005", "The manager asked that all reports _____ submitted by Friday.", ["are", "were", "be", "being"], 2, "Subjunctive mood: asked that + S + be (base form).", "subjunctive"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// LESSON S2-2: Subject-Verb Agreement
// ═══════════════════════════════════════════════════════════════════

export const s2Lesson2SVAgreement: GrammarLesson = {
  id: "s2-gram-02",
  stage: "intermediate",
  order: 3,
  titleVi: "Sự hòa hợp giữa Chủ ngữ và Động từ",
  titleEn: "Subject-Verb Agreement",
  category: "grammar",
  sourceUrl: "https://prepedu.com/vi/blog/su-hoa-hop-giua-chu-ngu-va-dong-tu",
  theorySections: [
    {
      heading: "1. Quy tắc cơ bản",
      content: "Chủ ngữ số ít → Động từ số ít (V-s/V-es)\nChủ ngữ số nhiều → Động từ số nhiều (V nguyên mẫu)\n\n⚠️ Bẫy TOEIC: Cụm giới từ đứng giữa S và V không ảnh hưởng việc chia verb!\nThe report (on the recent findings) WAS submitted. ← report = số ít",
      examples: [
        { en: "The results of the survey indicate...", vi: "Kết quả khảo sát cho thấy... (results = số nhiều)" },
        { en: "The cost of materials has increased.", vi: "Chi phí vật liệu đã tăng. (cost = số ít)" },
      ],
    },
    {
      heading: "2. Các trường hợp đặc biệt",
      content: "• Each/Every + N số ít → V số ít: Each employee IS responsible.\n• Neither/Either + N → V số ít: Neither option IS acceptable.\n• Neither A nor B → V theo B: Neither the manager nor the employees WERE notified.\n• Not only A but also B → V theo B\n• A number of + N số nhiều → V số nhiều: A number of employees HAVE resigned.\n• The number of + N → V số ít: The number of applicants HAS increased.\n• Collective nouns (team, staff, committee) → thường V số ít (AmE): The team IS working.",
    },
    {
      heading: "3. Chủ ngữ là mệnh đề/V-ing",
      content: "• V-ing / To V làm chủ ngữ → V số ít\n  Managing a team IS challenging.\n  To finish on time WAS difficult.\n• What/That clause → V số ít\n  What matters most IS quality.",
    },
  ],
  exercises: [
    gq("s2g02-001", "The number of participants _____ increased significantly.", ["have", "has", "are", "were"], 1, "The number of + noun → V số ít: has increased.", "sv_agreement"),
    gq("s2g02-002", "A number of employees _____ requested additional training.", ["has", "have", "is", "was"], 1, "A number of + noun → V số nhiều: have requested.", "sv_agreement"),
    gq("s2g02-003", "Each of the reports _____ been reviewed carefully.", ["have", "has", "are", "were"], 1, "Each of → V số ít: has been reviewed.", "sv_agreement"),
    gq("s2g02-004", "Neither the CEO nor the board members _____ available for comment.", ["is", "was", "were", "has been"], 2, "Neither A nor B → V theo B (board members = số nhiều): were.", "sv_agreement"),
    gq("s2g02-005", "The quality of the products _____ improved over the past year.", ["have", "has", "are", "were"], 1, "The quality (số ít) of the products → has improved.", "sv_agreement"),
    gq("s2g02-006", "Managing multiple projects simultaneously _____ strong organizational skills.", ["require", "requires", "requiring", "are required"], 1, "V-ing làm chủ ngữ → V số ít: requires.", "sv_agreement"),
    gq("s2g02-007", "Not only the price but also the delivery time _____ customers' decisions.", ["affect", "affects", "affecting", "are affected"], 1, "Not only A but also B → V theo B (delivery time = số ít): affects.", "sv_agreement"),
    gq("s2g02-008", "The committee _____ reached a unanimous decision.", ["have", "has", "are", "were"], 1, "Committee = tập thể → V số ít (AmE): has reached.", "sv_agreement"),
    gq("s2g02-009", "Every employee and contractor _____ required to attend the orientation.", ["is", "are", "were", "have been"], 0, "Every A and B → V số ít: is required.", "sv_agreement"),
    gq("s2g02-010", "What the clients need most _____ reliable customer support.", ["are", "is", "have", "were"], 1, "What clause làm chủ ngữ → V số ít: is.", "sv_agreement"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// LESSON S2-3: Passive Voice
// ═══════════════════════════════════════════════════════════════════

export const s2Lesson3Passive: GrammarLesson = {
  id: "s2-gram-03",
  stage: "intermediate",
  order: 5,
  titleVi: "Câu bị động (Passive Voice)",
  titleEn: "Passive Voice",
  category: "grammar",
  sourceUrl: "https://prepedu.com/vi/blog/cau-bi-dong-passive-voice-trong-tieng-anh",
  theorySections: [
    {
      heading: "1. Cấu trúc bị động",
      content: "Chủ động: S + V + O\nBị động: S (= O cũ) + be + V3 (+ by + S cũ)\n\nCông thức theo thì:\n• Present Simple: am/is/are + V3\n• Past Simple: was/were + V3\n• Present Perfect: has/have been + V3\n• Future Simple: will be + V3\n• Present Continuous: am/is/are being + V3\n• Modal: can/should/must + be + V3",
      examples: [
        { en: "The report was written by the intern. (Past Simple Passive)", vi: "Báo cáo được viết bởi thực tập sinh." },
        { en: "Employees will be notified by email. (Future Passive)", vi: "Nhân viên sẽ được thông báo qua email." },
      ],
    },
    {
      heading: "2. Khi nào dùng câu bị động?",
      content: "• Không biết/không quan trọng ai thực hiện: The window was broken.\n• Nhấn mạnh đối tượng chịu tác động: The product was launched in March.\n• Ngữ cảnh trang trọng, văn phong academic/business\n• TOEIC rất thường dùng bị động trong thông báo, quy định, quy trình",
      tip: "Nếu thấy by + agent ở cuối câu → nghĩ đến bị động!",
    },
  ],
  exercises: [
    gq("s2g03-001", "The new policy _____ implemented starting next month.", ["will", "will be", "will being", "will been"], 1, "Future Passive: will be + V3. Will be implemented.", "passive_voice"),
    gq("s2g03-002", "All packages _____ inspected before shipment.", ["are", "is", "was", "has"], 0, "Present Simple Passive, packages (số nhiều): are inspected.", "passive_voice"),
    gq("s2g03-003", "The construction project _____ completed by the end of June.", ["has been", "have been", "was being", "were"], 0, "Present Perfect Passive: has been completed.", "passive_voice"),
    gq("s2g03-004", "Refreshments _____ served during the break.", ["will be", "will", "are being", "have"], 0, "Future Passive: will be served.", "passive_voice"),
    gq("s2g03-005", "The award _____ presented to Dr. Kim at the ceremony.", ["is", "was", "has", "have"], 1, "At the ceremony (past context): was presented.", "passive_voice"),
    gq("s2g03-006", "Applications must _____ submitted by the deadline.", ["be", "been", "being", "to be"], 0, "Modal + be + V3: must be submitted.", "passive_voice"),
    gq("s2g03-007", "The building is currently _____ renovated.", ["be", "been", "being", "to be"], 2, "Present Continuous Passive: is being renovated.", "passive_voice"),
    gq("s2g03-008", "All employees should _____ notified of the policy changes.", ["be", "been", "being", "have"], 0, "Modal + be + V3: should be notified.", "passive_voice"),
    gq("s2g03-009", "The merchandise _____ delivered to the wrong address.", ["is", "was", "has", "have"], 1, "Đã giao sai → Past Simple Passive: was delivered.", "passive_voice"),
    gq("s2g03-010", "Several improvements _____ been made to the facility.", ["has", "have", "was", "is"], 1, "Improvements (số nhiều) + Perfect Passive: have been made.", "passive_voice"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// LESSON S2-4: Conjunctions
// ═══════════════════════════════════════════════════════════════════

export const s2Lesson4Conjunctions: GrammarLesson = {
  id: "s2-gram-04",
  stage: "intermediate",
  order: 7,
  titleVi: "Liên từ (Conjunction)",
  titleEn: "Conjunctions",
  category: "grammar",
  sourceUrl: "https://prepedu.com/vi/blog/lien-tu-conjunction-trong-tieng-anh",
  theorySections: [
    {
      heading: "1. Liên từ đẳng lập (Coordinating)",
      content: "FANBOYS: For, And, Nor, But, Or, Yet, So\nNối 2 mệnh đề/từ ngang hàng.\n• The report was long, but it was very informative.\n• She studies hard, so she passes every exam.",
    },
    {
      heading: "2. Liên từ phụ thuộc (Subordinating)",
      content: "Nối mệnh đề phụ vào mệnh đề chính:\n• Thời gian: when, while, before, after, since, until, once, as soon as\n• Nguyên nhân: because, since, as\n• Nhượng bộ: although, even though, though\n• Điều kiện: if, unless, provided that, as long as\n• Mục đích: so that, in order that",
    },
    {
      heading: "3. Liên từ tương quan (Correlative)",
      content: "• both ... and: Both A and B → V số nhiều\n• either ... or: Either A or B → V theo B\n• neither ... nor: Neither A nor B → V theo B\n• not only ... but also: Not only A but also B → V theo B\n• whether ... or: Whether A or B\n\nVí dụ: Not only the price but also the quality has improved.",
    },
    {
      heading: "4. TOEIC: Phân biệt Conjunction vs. Preposition vs. Adverb",
      content: "• ALTHOUGH + clause: Although it was expensive, we bought it.\n• DESPITE + noun: Despite the high price, we bought it.\n• HOWEVER + clause (đầu câu mới): The price was high. However, we bought it.\n\n⚠️ TOEIC hay hỏi phân biệt: although/despite/however, because/because of/therefore",
      tip: "Nhìn phía sau: có S+V → conjunction (although, because). Chỉ có noun → preposition (despite, because of). Đầu câu mới → adverb (however, therefore).",
    },
  ],
  exercises: [
    gq("s2g04-001", "_____ the rain, the outdoor event proceeded as planned.", ["Although", "Despite", "Because", "However"], 1, "Sau Despite + noun phrase (the rain). Although + clause.", "conjunction_vs_preposition"),
    gq("s2g04-002", "The project was delayed _____ several team members were absent.", ["despite", "because", "although", "however"], 1, "Because + clause (several team members were absent). Chỉ nguyên nhân.", "subordinating"),
    gq("s2g04-003", "The product is popular; _____, it is expensive.", ["however", "although", "despite", "because"], 0, "Đầu câu mới sau dấu chấm phẩy → trạng từ liên kết: however.", "conjunctive_adverb"),
    gq("s2g04-004", "Both the marketing team _____ the sales department contributed to the campaign.", ["and", "or", "but", "nor"], 0, "Both ... and: liên từ tương quan.", "correlative"),
    gq("s2g04-005", "_____ it was her first presentation, she performed confidently.", ["Because", "Although", "Despite", "However"], 1, "Although + clause = nhượng bộ: dù là lần đầu nhưng vẫn tự tin.", "subordinating"),
    gq("s2g04-006", "The meeting was postponed _____ the CEO's unexpected absence.", ["because", "because of", "although", "even though"], 1, "Because of + noun phrase (the CEO's absence). Because + clause.", "conjunction_vs_preposition"),
    gq("s2g04-007", "We can meet on Monday _____ on Tuesday, whichever works for you.", ["and", "but", "or", "so"], 2, "Chọn 1 trong 2 → or.", "coordinating"),
    gq("s2g04-008", "Not only did sales increase, _____ customer satisfaction improved.", ["and", "or", "but also", "as well"], 2, "Not only ... but also: liên từ tương quan.", "correlative"),
    gq("s2g04-009", "The contract will be valid _____ both parties sign it.", ["unless", "provided that", "despite", "however"], 1, "Provided that = với điều kiện là. Provided that + clause.", "subordinating"),
    gq("s2g04-010", "The price was reduced; _____, sales did not increase.", ["because", "although", "nevertheless", "despite"], 2, "Nevertheless = tuy nhiên. Đầu câu mới → trạng từ liên kết.", "conjunctive_adverb"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// LESSON S2-5: Relative Pronouns / Relative Clauses
// ═══════════════════════════════════════════════════════════════════

export const s2Lesson5RelativePronouns: GrammarLesson = {
  id: "s2-gram-05",
  stage: "intermediate",
  order: 9,
  titleVi: "Đại từ quan hệ & Mệnh đề quan hệ",
  titleEn: "Relative Pronouns & Relative Clauses",
  category: "grammar",
  sourceUrl: "https://prepedu.com/vi/blog/dai-tu-quan-he",
  theorySections: [
    {
      heading: "1. Đại từ quan hệ",
      content: "• WHO: thay cho người, làm chủ ngữ/tân ngữ\n• WHOM: thay cho người, chỉ làm tân ngữ (sau giới từ)\n• WHICH: thay cho vật\n• THAT: thay cho người hoặc vật (chỉ dùng trong mệnh đề xác định)\n• WHOSE: chỉ sở hữu (người/vật)",
      examples: [
        { en: "The employee who submitted the report received a bonus.", vi: "Nhân viên nộp báo cáo đã nhận thưởng. (who = chủ ngữ)" },
        { en: "The client whom we met yesterday placed a large order.", vi: "Khách hàng mà chúng ta gặp hôm qua đã đặt đơn lớn. (whom = tân ngữ)" },
        { en: "The company whose products we use is based in Tokyo.", vi: "Công ty mà chúng ta dùng sản phẩm có trụ sở ở Tokyo. (whose = sở hữu)" },
      ],
    },
    {
      heading: "2. Mệnh đề quan hệ xác định vs. không xác định",
      content: "Xác định (Defining): không có dấu phẩy, cần thiết để hiểu nghĩa\n→ The person who called you is waiting.\n\nKhông xác định (Non-defining): có dấu phẩy, bổ sung thông tin\n→ Mr. Kim, who is our CEO, will give the keynote.\n\n⚠️ THAT không dùng trong mệnh đề không xác định!\n❌ Mr. Kim, that is our CEO...\n✅ Mr. Kim, who is our CEO...",
    },
    {
      heading: "3. WHERE / WHEN / WHY",
      content: "• WHERE = in which: The hotel where we stayed was excellent.\n• WHEN = at/in which: The day when the contract was signed.\n• WHY = for which: The reason why he resigned.",
    },
  ],
  exercises: [
    gq("s2g05-001", "The applicant _____ resume was the most impressive got the job.", ["who", "whom", "whose", "which"], 2, "Trước danh từ resume cần sở hữu: whose = của ai.", "relative_pronoun"),
    gq("s2g05-002", "The office _____ we work has been recently renovated.", ["who", "which", "where", "whom"], 2, "Where = in which: nơi chúng ta làm việc.", "relative_pronoun"),
    gq("s2g05-003", "The clients _____ we invited to the event were very pleased.", ["who", "whom", "whose", "which"], 1, "Whom = tân ngữ (we invited whom). Sau whom có S+V.", "relative_pronoun"),
    gq("s2g05-004", "The proposal _____ the committee approved will be implemented.", ["who", "whom", "whose", "which"], 3, "Which thay cho vật (proposal). Which the committee approved.", "relative_pronoun"),
    gq("s2g05-005", "Ms. Park, _____ joined the company last year, has been promoted.", ["who", "whom", "that", "which"], 0, "Mệnh đề không xác định (có dấu phẩy) + chỉ người = who. KHÔNG dùng that.", "relative_clause"),
    gq("s2g05-006", "The reason _____ the meeting was postponed has not been disclosed.", ["which", "where", "why", "when"], 2, "The reason why = lý do tại sao.", "relative_adverb"),
    gq("s2g05-007", "The hotel _____ the conference will be held has excellent facilities.", ["which", "where", "when", "whose"], 1, "Where = at which: nơi hội nghị sẽ được tổ chức.", "relative_adverb"),
    gq("s2g05-008", "There are several employees _____ qualifications meet the requirements.", ["who", "whom", "whose", "which"], 2, "Whose + noun (qualifications): sở hữu.", "relative_pronoun"),
    gq("s2g05-009", "The day _____ the new store opens will be announced soon.", ["which", "where", "when", "whose"], 2, "When = on which: thời điểm cửa hàng mới mở.", "relative_adverb"),
    gq("s2g05-010", "The equipment, _____ was purchased last year, needs to be replaced.", ["who", "that", "which", "whose"], 2, "Mệnh đề không xác định (dấu phẩy) + chỉ vật = which. KHÔNG dùng that.", "relative_clause"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// LESSON S2-6: Advanced Noun & Adjective (Word Form)
// ═══════════════════════════════════════════════════════════════════

export const s2Lesson6WordForm: GrammarLesson = {
  id: "s2-gram-06",
  stage: "intermediate",
  order: 11,
  titleVi: "Dạng từ nâng cao (Word Form)",
  titleEn: "Advanced Word Forms",
  category: "grammar",
  theorySections: [
    {
      heading: "1. Word Families quan trọng trong TOEIC",
      content: "Mỗi gốc từ có nhiều dạng:\n\nSucceed (V) → success (N) → successful (Adj) → successfully (Adv)\nCompete (V) → competition (N) → competitive (Adj) → competitively (Adv)\nProduce (V) → production/product (N) → productive (Adj) → productively (Adv)\nCreate (V) → creation/creativity (N) → creative (Adj) → creatively (Adv)",
    },
    {
      heading: "2. Tính từ đuôi -ed vs. -ing",
      content: "• -ED: cảm xúc CỦA NGƯỜI: interested, surprised, satisfied, disappointed, excited\n• -ING: tính chất CỦA VẬT/VIỆC: interesting, surprising, satisfying, disappointing, exciting\n\n✅ The meeting was boring. (cuộc họp → -ing)\n✅ I was bored during the meeting. (tôi → -ed)\n❌ The meeting was bored.",
      tip: "TOEIC Part 5 rất hay hỏi dạng này! Nhớ: chủ ngữ là NGƯỜI → -ed, chủ ngữ là VẬT → -ing.",
    },
  ],
  exercises: [
    gq("s2g06-001", "The company's _____ strategy has resulted in higher profits.", ["compete", "competition", "competitive", "competitively"], 2, "Trước danh từ strategy → tính từ: competitive.", "word_form"),
    gq("s2g06-002", "The results of the experiment were very _____.", ["surprise", "surprising", "surprised", "surprisingly"], 1, "Chủ ngữ results (vật) + were → tính từ đuôi -ing: surprising.", "ed_vs_ing"),
    gq("s2g06-003", "Customer _____ with our services has increased by 20%.", ["satisfy", "satisfaction", "satisfying", "satisfactory"], 1, "Cần danh từ làm chủ ngữ. Satisfaction = sự hài lòng.", "word_form"),
    gq("s2g06-004", "The employees were _____ about the upcoming changes.", ["concern", "concerning", "concerned", "concerns"], 2, "Người (employees) + were → tính từ đuôi -ed: concerned.", "ed_vs_ing"),
    gq("s2g06-005", "She handled the situation very _____.", ["profession", "professional", "professionally", "professionalism"], 2, "Trạng từ bổ nghĩa cho động từ handled: professionally.", "word_form"),
    gq("s2g06-006", "The presentation was extremely _____ and well-organized.", ["inform", "information", "informative", "informatively"], 2, "Sau was → tính từ. Informative = có nhiều thông tin hữu ích. Đuôi -ive.", "word_form"),
    gq("s2g06-007", "There has been a _____ improvement in product quality.", ["notice", "noticeable", "noticeably", "noticing"], 1, "Trước danh từ improvement → tính từ: noticeable = đáng chú ý.", "word_form"),
    gq("s2g06-008", "The clients expressed their _____ with the delay.", ["disappoint", "disappointing", "disappointed", "disappointment"], 3, "Sau their (possessive) → danh từ: disappointment = sự thất vọng.", "word_form"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// Part 6: Text Completion exercises
// ═══════════════════════════════════════════════════════════════════

export const s2ReadingPart6: ReadingLesson = {
  id: "s2-read-p6",
  stage: "intermediate",
  order: 13,
  titleVi: "Part 6: Hoàn thành đoạn văn",
  titleEn: "Part 6: Text Completion",
  category: "reading",
  part: 6,
  strategyVi: "Part 6 = Part 5 trong ngữ cảnh đoạn văn. Đọc TOÀN BỘ đoạn trước khi trả lời. Chú ý liên kết logic giữa các câu.",
  exercises: [
    {
      id: "s2rp6-01",
      type: "reading_text_completion",
      passage: `Dear valued customers,

We are pleased to announce that our downtown store will be _____(1) extensive renovations starting March 1st. During this period, customers can continue to shop at our online store or visit our branch location on Park Avenue.

The renovation is _____(2) to be completed by the end of April. We apologize for any _____(3) this may cause and look forward to welcoming you to our improved store.

_____(4)

Best regards,
Store Management`,
      questions: [
        {
          id: "s2rp6-01q1",
          question: "Question 1: Fill blank (1)",
          options: [
            { id: "A", text: "undergoing" },
            { id: "B", text: "undergo" },
            { id: "C", text: "underwent" },
            { id: "D", text: "undergone" },
          ],
          correctOptionId: "A",
          explanationVi: "will be + V-ing → Future Continuous: will be undergoing. Hoặc: be undergoing = đang trải qua.",
        },
        {
          id: "s2rp6-01q2",
          question: "Question 2: Fill blank (2)",
          options: [
            { id: "A", text: "expect" },
            { id: "B", text: "expected" },
            { id: "C", text: "expecting" },
            { id: "D", text: "expectation" },
          ],
          correctOptionId: "B",
          explanationVi: "is expected to = được dự kiến. Bị động: is + V3.",
        },
        {
          id: "s2rp6-01q3",
          question: "Question 3: Fill blank (3)",
          options: [
            { id: "A", text: "convenience" },
            { id: "B", text: "inconvenience" },
            { id: "C", text: "convenient" },
            { id: "D", text: "inconvenient" },
          ],
          correctOptionId: "B",
          explanationVi: "any inconvenience = bất kỳ sự bất tiện nào. Xin lỗi vì gây bất tiện.",
        },
        {
          id: "s2rp6-01q4",
          question: "Question 4: Fill blank (4)",
          options: [
            { id: "A", text: "We hope you understand our decision to close permanently." },
            { id: "B", text: "Thank you for your patience and continued support." },
            { id: "C", text: "Please submit your resignation by Friday." },
            { id: "D", text: "The items are no longer available for purchase." },
          ],
          correctOptionId: "B",
          explanationVi: "Câu phù hợp ngữ cảnh: cảm ơn sự kiên nhẫn. Đây là dạng sentence insertion.",
        },
      ],
      part: 6,
      difficulty: 2,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// Part 7: Reading Comprehension exercises
// ═══════════════════════════════════════════════════════════════════

export const s2ReadingPart7: ReadingLesson = {
  id: "s2-read-p7",
  stage: "intermediate",
  order: 15,
  titleVi: "Part 7: Đọc hiểu",
  titleEn: "Part 7: Reading Comprehension",
  category: "reading",
  part: 7,
  sourceUrl: "https://prepedu.com/vi/blog/ky-nang-skimming-va-scanning-ielts-reading",
  strategyVi: "Bước 1: Đọc câu hỏi trước → biết cần tìm gì. Bước 2: Skim đoạn văn → nắm ý chính. Bước 3: Scan chi tiết → tìm đáp án.",
  exercises: [
    {
      id: "s2rp7-01",
      type: "reading_comprehension",
      passage: `NOTICE

Greenfield Office Park — Parking Policy Update

Effective August 1st, the following changes to the parking policy will take effect:

1. All employees must display a valid parking permit on their dashboard at all times.
2. Visitor parking spaces (Lot B) are limited to 2-hour stays.
3. Electric vehicle charging stations will be available in Lot C starting September 1st.
4. Overnight parking is not permitted in any lot without prior approval from building management.

Parking permits can be obtained from the Human Resources department. There is no charge for the first permit. Replacement permits cost $15 each.

For questions, please contact Building Management at extension 4500.`,
      questions: [
        {
          id: "s2rp7-01q1",
          question: "What is the purpose of this notice?",
          options: [
            { id: "A", text: "To announce a new building construction project" },
            { id: "B", text: "To inform employees about changes to parking rules" },
            { id: "C", text: "To promote electric vehicle usage" },
            { id: "D", text: "To introduce new employees" },
          ],
          correctOptionId: "B",
          explanationVi: "Mục đích: thông báo thay đổi quy định đỗ xe (Parking Policy Update).",
        },
        {
          id: "s2rp7-01q2",
          question: "How long can visitors park in Lot B?",
          options: [
            { id: "A", text: "1 hour" },
            { id: "B", text: "2 hours" },
            { id: "C", text: "3 hours" },
            { id: "D", text: "Unlimited" },
          ],
          correctOptionId: "B",
          explanationVi: "Visitor parking spaces (Lot B) are limited to 2-hour stays.",
        },
        {
          id: "s2rp7-01q3",
          question: "How much does the first parking permit cost?",
          options: [
            { id: "A", text: "Free" },
            { id: "B", text: "$10" },
            { id: "C", text: "$15" },
            { id: "D", text: "$25" },
          ],
          correctOptionId: "A",
          explanationVi: "There is no charge for the first permit. = Miễn phí cho thẻ đầu tiên.",
        },
      ],
      part: 7,
      difficulty: 2,
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// Stage 2 Progress Tests
// ═══════════════════════════════════════════════════════════════════

export const s2ProgressTest1Reading: TestUnit = {
  id: "s2-test-prog01-reading",
  stage: "intermediate",
  order: 17,
  titleVi: "Progress Test 1 - Reading (Part 5+6)",
  titleEn: "Progress Test 1 - Reading",
  category: "test",
  testType: "progress_test",
  coversLessonIds: ["s2-gram-01", "s2-gram-02", "s2-gram-03", "s2-gram-04", "s2-gram-05"],
  passingScore: 65,
  timeLimit: 20,
  exercises: [
    gq("s2pt1-001", "Neither the manager nor the employees _____ informed about the change.", ["was", "were", "has been", "is"], 1, "Neither A nor B → V theo B (employees = số nhiều): were.", "sv_agreement"),
    gq("s2pt1-002", "The report _____ submitted before the deadline.", ["should be", "should", "should been", "should being"], 0, "Modal + be + V3: should be submitted.", "passive_voice"),
    gq("s2pt1-003", "_____ the delay, the project was completed within budget.", ["Although", "Despite", "Because", "However"], 1, "Despite + noun (the delay).", "conjunction_vs_preposition"),
    gq("s2pt1-004", "The company _____ revenue has doubled is expanding to Asia.", ["who", "whom", "whose", "which"], 2, "Whose + noun (revenue): sở hữu.", "relative_pronoun"),
    gq("s2pt1-005", "The _____ improvements in productivity have been noticed by management.", ["significance", "significant", "significantly", "signify"], 1, "Trước danh từ improvements → tính từ: significant.", "word_form"),
    gq("s2pt1-006", "A number of complaints _____ received about the new policy.", ["has been", "have been", "was", "is"], 1, "A number of → V số nhiều: have been received.", "sv_agreement"),
    gq("s2pt1-007", "All visitors must _____ identified before entering the facility.", ["be", "been", "being", "to be"], 0, "Modal + be + V3: must be identified.", "passive_voice"),
    gq("s2pt1-008", "The CEO, _____ has been with the company for 20 years, announced his retirement.", ["who", "whom", "that", "which"], 0, "Mệnh đề không xác định + chỉ người: who.", "relative_clause"),
    gq("s2pt1-009", "Sales increased; _____, costs also rose significantly.", ["although", "however", "despite", "because"], 1, "Đầu câu mới → trạng từ liên kết: however.", "conjunctive_adverb"),
    gq("s2pt1-010", "The workshop was very _____ for the new employees.", ["benefit", "beneficial", "beneficially", "beneficiary"], 1, "Sau was very → tính từ: beneficial = có lợi.", "word_form"),
    gq("s2pt1-011", "Every employee _____ expected to participate in the annual review.", ["is", "are", "were", "have been"], 0, "Every + singular noun → is.", "sv_agreement"),
    gq("s2pt1-012", "The equipment _____ been inspected regularly to ensure safety.", ["has", "have", "is", "are"], 0, "Equipment (không đếm được, số ít) → has been.", "sv_agreement"),
    gq("s2pt1-013", "_____ the product quality improved, customer complaints decreased.", ["Despite", "Because", "Although", "However"], 1, "Because + clause = nguyên nhân.", "subordinating"),
    gq("s2pt1-014", "The employees _____ by the sudden announcement.", ["surprised", "were surprised", "surprising", "were surprising"], 1, "Người (employees) + bị bất ngờ: were surprised (passive + -ed).", "passive_voice"),
    gq("s2pt1-015", "The office _____ the meeting will be held is on the 5th floor.", ["which", "where", "when", "whose"], 1, "Where = in which: nơi cuộc họp sẽ được tổ chức.", "relative_adverb"),
    gq("s2pt1-016", "The company made a _____ effort to reduce waste.", ["consider", "considerable", "considerably", "consideration"], 1, "Trước danh từ effort → tính từ: considerable = đáng kể.", "word_form"),
    gq("s2pt1-017", "Not only was the hotel comfortable, _____ it was also affordable.", ["and", "but", "so", "or"], 1, "Not only ... but (also): liên từ tương quan.", "correlative"),
    gq("s2pt1-018", "The new system will be _____ by the end of the month.", ["operate", "operational", "operationally", "operation"], 1, "Sau will be → tính từ: operational = hoạt động được.", "word_form"),
    gq("s2pt1-019", "Managing a diverse team _____ excellent communication skills.", ["require", "requires", "requiring", "required"], 1, "V-ing (Managing) làm chủ ngữ → V số ít: requires.", "sv_agreement"),
    gq("s2pt1-020", "The building, _____ was constructed in 1990, is being renovated.", ["who", "that", "which", "whose"], 2, "Mệnh đề không xác định + chỉ vật: which.", "relative_clause"),
  ],
};

// ─── Export ──────────────────────────────────────────────────────

export const stage2GrammarLessons: GrammarLesson[] = [
  s2Lesson1Intro,
  s2Lesson2SVAgreement,
  s2Lesson3Passive,
  s2Lesson4Conjunctions,
  s2Lesson5RelativePronouns,
  s2Lesson6WordForm,
];

export const stage2ReadingLessons: ReadingLesson[] = [
  s2ReadingPart6,
  s2ReadingPart7,
];

export const stage2ProgressTests: TestUnit[] = [
  s2ProgressTest1Reading,
];

export const STAGE2_GRAMMAR_EXERCISE_COUNT =
  stage2GrammarLessons.reduce((sum, l) => sum + l.exercises.length, 0) +
  stage2ProgressTests.reduce((sum, t) => sum + t.exercises.length, 0);
