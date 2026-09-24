/**
 * Stage 1: Foundation Grammar Data (TOEIC 0→300)
 *
 * 7 Grammar Lessons + 4 Mini Tests
 * Content sourced from prepedu.com grammar articles + author knowledge.
 * This file is deterministic content — AI must not silently overwrite approved answers.
 */

import type { GrammarLesson, GrammarExercise, TestUnit } from "@/domain/study-roadmap";

// ─── Helper ──────────────────────────────────────────────────────

function gq(
  id: string,
  prompt: string,
  answers: readonly [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanationVi: string,
  grammarPoint: string,
  difficulty: 1 | 2 | 3 = 1,
): GrammarExercise {
  const optionIds = ["A", "B", "C", "D"] as const;
  return {
    id,
    type: "part5_fill_blank",
    prompt,
    options: answers.map((text, i) => ({ id: optionIds[i], text })),
    correctOptionId: optionIds[correctIndex],
    explanationVi,
    grammarPoint,
    difficulty,
  };
}

// ═══════════════════════════════════════════════════════════════════
// LESSON 1: Introduction — Parts of Speech & Sentence Structure
// ═══════════════════════════════════════════════════════════════════

export const lesson1Introduction: GrammarLesson = {
  id: "s1-gram-01",
  stage: "foundation",
  order: 1,
  titleVi: "Giới thiệu: Từ loại & Cấu trúc câu cơ bản",
  titleEn: "Introduction: Parts of Speech & Basic Sentence Structure",
  category: "grammar",
  theorySections: [
    {
      heading: "1. Câu trong tiếng Anh",
      content: "Mỗi câu tiếng Anh cơ bản đều có cấu trúc: Subject (Chủ ngữ) + Verb (Động từ) + Object/Complement (Tân ngữ/Bổ ngữ).\nVí dụ: The manager (S) approved (V) the budget (O).",
      examples: [
        { en: "The company operates globally.", vi: "Công ty hoạt động trên toàn cầu." },
        { en: "She submitted the report.", vi: "Cô ấy đã nộp báo cáo." },
      ],
    },
    {
      heading: "2. Tám loại từ chính",
      content: "Tiếng Anh có 8 loại từ chính:\n• Noun (Danh từ): manager, report, meeting\n• Verb (Động từ): submit, approve, attend\n• Adjective (Tính từ): important, available, annual\n• Adverb (Trạng từ): quickly, carefully, recently\n• Pronoun (Đại từ): he, she, they, it\n• Preposition (Giới từ): in, on, at, by, for\n• Conjunction (Liên từ): and, but, or, because\n• Interjection (Thán từ): oh, well, hey",
      tip: "Trong TOEIC Part 5, bạn thường phải chọn đúng LOẠI TỪ để điền vào chỗ trống. Nhận biết loại từ = nền tảng quan trọng nhất!",
    },
    {
      heading: "3. Cách nhận biết vị trí từ loại trong câu",
      content: "• Sau a/an/the/this/that → NOUN\n• Sau be/seem/become/look → ADJECTIVE\n• Trước NOUN → ADJECTIVE\n• Sau VERB → ADVERB (bổ nghĩa cho verb)\n• Trước ADJECTIVE → ADVERB (bổ nghĩa cho adj)",
      examples: [
        { en: "The _____ report was submitted. (annual → adj trước noun)", vi: "Báo cáo hàng năm đã được nộp." },
        { en: "She works _____. (efficiently → adv sau verb)", vi: "Cô ấy làm việc hiệu quả." },
      ],
    },
  ],
  exercises: [
    gq("s1g01-001", "The _____ will attend the conference next week.", ["manage", "manager", "managed", "managing"], 1, "Sau The → cần danh từ. Manager (người quản lý) là danh từ chỉ người.", "parts_of_speech"),
    gq("s1g01-002", "Please submit the documents _____.", ["immediate", "immediately", "immediacy", "immediateness"], 1, "Cần trạng từ bổ nghĩa cho động từ submit. Immediately = ngay lập tức.", "parts_of_speech"),
    gq("s1g01-003", "The new policy is very _____.", ["effect", "effective", "effectively", "effectiveness"], 1, "Sau is very → cần tính từ. Effective = hiệu quả.", "parts_of_speech"),
    gq("s1g01-004", "_____ performance was outstanding this quarter.", ["He", "His", "Him", "Himself"], 1, "Trước danh từ performance cần tính từ sở hữu. His = của anh ấy.", "parts_of_speech"),
    gq("s1g01-005", "The meeting _____ at 3 PM yesterday.", ["begin", "begins", "began", "beginning"], 2, "Yesterday = quá khứ → dùng thì quá khứ đơn. Began là dạng quá khứ của begin.", "parts_of_speech"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// LESSON 2: Nouns
// ═══════════════════════════════════════════════════════════════════

export const lesson2Nouns: GrammarLesson = {
  id: "s1-gram-02",
  stage: "foundation",
  order: 2,
  titleVi: "Danh từ (Noun)",
  titleEn: "Nouns",
  category: "grammar",
  sourceUrl: "https://prepedu.com/vi/blog/kien-thuc-ve-danh-tu-trong-tieng-anh",
  theorySections: [
    {
      heading: "1. Danh từ là gì?",
      content: "Danh từ (Noun) là từ dùng để chỉ người, vật, sự việc, hiện tượng, khái niệm.\nVí dụ: employee (nhân viên), office (văn phòng), decision (quyết định).",
    },
    {
      heading: "2. Phân loại danh từ",
      content: "• Danh từ đếm được (Countable): book, employee, meeting → có thể dùng a/an, số nhiều\n• Danh từ không đếm được (Uncountable): information, equipment, furniture → KHÔNG dùng a/an, KHÔNG có dạng số nhiều\n• Danh từ riêng (Proper Noun): Microsoft, Tokyo, Mr. Lee → viết hoa\n• Danh từ chung (Common Noun): company, city, manager → không viết hoa",
      tip: "TOEIC hay hỏi: information, equipment, furniture, advice, luggage → LUÔN là số ít, không thêm -s!",
    },
    {
      heading: "3. Đuôi nhận biết danh từ",
      content: "Nhận biết danh từ qua hậu tố:\n• -tion / -sion: information, decision, permission\n• -ment: management, equipment, development\n• -ness: business, effectiveness, awareness\n• -ity / -ty: ability, quality, security\n• -ance / -ence: performance, experience, difference\n• -er / -or: manager, director, customer\n• -ist: specialist, analyst, tourist\n• -ure: procedure, structure, expenditure",
    },
    {
      heading: "4. Vị trí danh từ trong câu",
      content: "Danh từ đứng ở các vị trí:\n• Sau mạo từ (a/an/the): the report\n• Sau tính từ: annual report\n• Sau tính từ sở hữu (my/your/his/her): his performance\n• Sau giới từ: in the meeting\n• Làm chủ ngữ: The manager approved...\n• Làm tân ngữ: She submitted the report.",
    },
  ],
  exercises: [
    gq("s1g02-001", "The company needs to make a _____ about the new project.", ["decide", "decisive", "decision", "decisively"], 2, "Sau a → cần danh từ. Decision = quyết định. Đuôi -sion = danh từ.", "noun_identification"),
    gq("s1g02-002", "Employee _____ is essential for the success of any organization.", ["satisfy", "satisfied", "satisfying", "satisfaction"], 3, "Trước is (verb) cần chủ ngữ = danh từ. Satisfaction = sự hài lòng. Đuôi -tion.", "noun_suffixes"),
    gq("s1g02-003", "The _____ of the building will take approximately six months.", ["construct", "construction", "constructive", "constructively"], 1, "Sau The → cần danh từ. Construction = việc xây dựng. Đuôi -tion.", "noun_suffixes"),
    gq("s1g02-004", "Much _____ has been provided to help employees adjust to the new system.", ["inform", "informative", "informatively", "information"], 3, "Much + danh từ không đếm được. Information = thông tin (không đếm được).", "countable_uncountable"),
    gq("s1g02-005", "All _____ must be returned by the end of the business day.", ["equip", "equipped", "equipment", "equipping"], 2, "Sau All → cần danh từ. Equipment = thiết bị (không đếm được nhưng dùng với all).", "countable_uncountable"),
    gq("s1g02-006", "The new _____ will begin working on Monday.", ["employ", "employee", "employer", "employment"], 1, "Cần danh từ chỉ người sẽ bắt đầu làm việc. Employee = nhân viên.", "noun_people"),
    gq("s1g02-007", "The _____ of the products must meet international standards.", ["qualify", "qualified", "quality", "qualification"], 2, "Sau The + trước of → cần danh từ. Quality = chất lượng. Đuôi -ity.", "noun_suffixes"),
    gq("s1g02-008", "The sales _____ requested additional marketing materials.", ["represent", "representative", "representation", "representatively"], 1, "Cần danh từ chỉ người. Representative = đại diện (bán hàng). Đuôi -ive (adj) nhưng ở đây representative cũng là danh từ chỉ người.", "noun_people"),
    gq("s1g02-009", "Please provide your _____ information on the application form.", ["person", "personal", "personally", "personality"], 1, "Trước danh từ information cần tính từ. Personal = cá nhân.", "noun_vs_adjective"),
    gq("s1g02-010", "Her _____ to the project was recognized by the management team.", ["contribute", "contribution", "contributor", "contributing"], 1, "Sau Her (possessive) → cần danh từ. Contribution = sự đóng góp. Đuôi -tion.", "noun_suffixes"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// MINI TEST 1 (covers Lesson 1 + Lesson 2)
// ═══════════════════════════════════════════════════════════════════

export const miniTest1: TestUnit = {
  id: "s1-test-mini01",
  stage: "foundation",
  order: 3,
  titleVi: "Mini Test 1: Từ loại & Danh từ",
  titleEn: "Mini Test 1: Parts of Speech & Nouns",
  category: "test",
  testType: "mini_test",
  coversLessonIds: ["s1-gram-01", "s1-gram-02"],
  passingScore: 60,
  timeLimit: 10,
  exercises: [
    gq("s1mt1-001", "The annual _____ will be held at the downtown convention center.", ["confer", "conference", "conferring", "conferred"], 1, "Sau annual (adj) → cần danh từ. Conference = hội nghị. Đuôi -ence.", "noun_suffixes"),
    gq("s1mt1-002", "All staff members should read the _____ carefully.", ["announce", "announcement", "announced", "announcing"], 1, "Sau the → cần danh từ. Announcement = thông báo. Đuôi -ment.", "noun_suffixes"),
    gq("s1mt1-003", "The project requires _____ from multiple departments.", ["cooperate", "cooperation", "cooperative", "cooperatively"], 1, "Sau requires → cần tân ngữ (danh từ). Cooperation = sự hợp tác. Đuôi -tion.", "noun_suffixes"),
    gq("s1mt1-004", "The _____ team completed the project ahead of schedule.", ["develop", "development", "developing", "developed"], 1, "Trước team (danh từ) cần tính từ/danh từ bổ nghĩa. Development team = nhóm phát triển.", "parts_of_speech"),
    gq("s1mt1-005", "_____ working conditions are important for employee well-being.", ["Safety", "Safe", "Safely", "Safeness"], 1, "Trước danh từ (working conditions) cần tính từ. Safe = an toàn.", "parts_of_speech"),
    gq("s1mt1-006", "The _____ of the contract must be reviewed by our legal department.", ["terminate", "termination", "terminal", "terminally"], 1, "Sau The + trước of → danh từ. Termination = sự chấm dứt. Đuôi -tion.", "noun_suffixes"),
    gq("s1mt1-007", "She _____ submitted the report before the deadline.", ["success", "successful", "successfully", "succeed"], 2, "Cần trạng từ bổ nghĩa cho động từ submitted. Successfully = thành công.", "parts_of_speech"),
    gq("s1mt1-008", "The company provides _____ for all new employees.", ["train", "training", "trained", "trainer"], 1, "Sau provides → cần tân ngữ (danh từ). Training = khóa đào tạo.", "noun_identification"),
    gq("s1mt1-009", "The manager's _____ of the marketing strategy was impressive.", ["analyze", "analytical", "analysis", "analytically"], 2, "Sau 's (sở hữu) → cần danh từ. Analysis = phân tích. Đuôi -sis.", "noun_suffixes"),
    gq("s1mt1-010", "We need to find a _____ solution to this problem.", ["practice", "practical", "practically", "practicality"], 1, "Trước danh từ solution cần tính từ. Practical = thiết thực, thực tế.", "parts_of_speech"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// LESSON 3: Verbs
// ═══════════════════════════════════════════════════════════════════

export const lesson3Verbs: GrammarLesson = {
  id: "s1-gram-03",
  stage: "foundation",
  order: 4,
  titleVi: "Động từ (Verb)",
  titleEn: "Verbs",
  category: "grammar",
  sourceUrl: "https://prepedu.com/vi/blog/dong-tu-trong-tieng-anh",
  theorySections: [
    {
      heading: "1. Động từ là gì?",
      content: "Động từ (Verb) diễn tả hành động hoặc trạng thái.\n• Action verbs: run, write, build, submit\n• State verbs: be, have, know, seem, belong",
    },
    {
      heading: "2. Phân loại động từ",
      content: "• Nội động từ (Intransitive): arrive, happen, go → KHÔNG cần tân ngữ\n• Ngoại động từ (Transitive): submit, approve, send → CẦN tân ngữ\n• Động từ khuyết thiếu (Modal): can, could, may, might, must, shall, should, will, would → theo sau là V nguyên mẫu\n• Động từ to be: am, is, are, was, were → theo sau là adj/noun",
      tip: "Sau modal verb → luôn dùng V nguyên mẫu (không chia): must attend, can submit, should review",
    },
    {
      heading: "3. Các dạng của động từ",
      content: "Mỗi động từ có 4 dạng chính:\n• Base form (nguyên mẫu): work, submit, go\n• Past form (quá khứ): worked, submitted, went\n• Past participle (phân từ 2): worked, submitted, gone\n• Present participle (V-ing): working, submitting, going\n• Third person singular (ngôi 3 số ít): works, submits, goes",
    },
    {
      heading: "4. Thì cơ bản (Basic Tenses)",
      content: "• Present Simple: S + V/V-s → lịch trình, sự thật chung\n• Past Simple: S + V-ed/V2 → hành động đã kết thúc\n• Future Simple: S + will + V → dự đoán, quyết định\n• Present Continuous: S + am/is/are + V-ing → đang diễn ra\n• Present Perfect: S + have/has + V3 → đã xảy ra, liên quan hiện tại",
      examples: [
        { en: "The store opens at 9 AM. (Present Simple)", vi: "Cửa hàng mở lúc 9 giờ sáng." },
        { en: "She submitted the report yesterday. (Past Simple)", vi: "Cô ấy đã nộp báo cáo hôm qua." },
        { en: "We have completed the project. (Present Perfect)", vi: "Chúng tôi đã hoàn thành dự án." },
      ],
    },
  ],
  exercises: [
    gq("s1g03-001", "All employees must _____ the safety training by Friday.", ["complete", "completes", "completed", "completing"], 0, "Sau must (modal verb) → dùng V nguyên mẫu: must complete.", "modal_verbs"),
    gq("s1g03-002", "The company _____ a new product last month.", ["launch", "launches", "launched", "launching"], 2, "Last month = quá khứ → dùng quá khứ đơn: launched.", "past_simple"),
    gq("s1g03-003", "She _____ for the marketing department since 2020.", ["works", "worked", "has worked", "is working"], 2, "Since 2020 = mốc thời gian quá khứ kéo dài đến nay → Present Perfect: has worked.", "present_perfect"),
    gq("s1g03-004", "The technician _____ the printer right now.", ["repair", "repairs", "repaired", "is repairing"], 3, "Right now → hành động đang diễn ra → Present Continuous: is repairing.", "present_continuous"),
    gq("s1g03-005", "Our company _____ over 500 employees worldwide.", ["employ", "employs", "employed", "employing"], 1, "Sự thật chung, chủ ngữ Our company (ngôi 3 số ít) → Present Simple: employs.", "present_simple"),
    gq("s1g03-006", "The meeting will _____ at 2 PM tomorrow.", ["begin", "begins", "began", "beginning"], 0, "Sau will → V nguyên mẫu: will begin.", "future_simple"),
    gq("s1g03-007", "Applications should _____ before the deadline.", ["submit", "submits", "submitted", "be submitted"], 3, "Đơn xin nộp → bị nộp (bị động). Should + be + V3: should be submitted.", "modal_verbs", 2),
    gq("s1g03-008", "The project manager _____ the proposal yesterday.", ["review", "reviews", "reviewed", "reviewing"], 2, "Yesterday → quá khứ đơn: reviewed.", "past_simple"),
    gq("s1g03-009", "Ms. Kim usually _____ to work by train.", ["commute", "commutes", "commuted", "commuting"], 1, "Usually → thói quen → Present Simple. Ms. Kim (ngôi 3 số ít) → commutes.", "present_simple"),
    gq("s1g03-010", "The company has _____ several awards this year.", ["receive", "receives", "received", "receiving"], 2, "Has + V3 → Present Perfect: has received. This year = chưa kết thúc.", "present_perfect"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// MINI TEST 2 (covers Lesson 1-3)
// ═══════════════════════════════════════════════════════════════════

export const miniTest2: TestUnit = {
  id: "s1-test-mini02",
  stage: "foundation",
  order: 5,
  titleVi: "Mini Test 2: Từ loại, Danh từ & Động từ",
  titleEn: "Mini Test 2: Parts of Speech, Nouns & Verbs",
  category: "test",
  testType: "mini_test",
  coversLessonIds: ["s1-gram-01", "s1-gram-02", "s1-gram-03"],
  passingScore: 60,
  timeLimit: 10,
  exercises: [
    gq("s1mt2-001", "The _____ of the new policy will be announced next week.", ["implement", "implementation", "implemented", "implementing"], 1, "Sau The + trước of → danh từ. Implementation = việc triển khai.", "noun_suffixes"),
    gq("s1mt2-002", "All employees can _____ for the training program.", ["register", "registers", "registered", "registering"], 0, "Sau can (modal) → V nguyên mẫu: can register.", "modal_verbs"),
    gq("s1mt2-003", "The report was _____ by the accounting department.", ["prepare", "prepares", "prepared", "preparing"], 2, "Was + V3 → câu bị động quá khứ: was prepared.", "passive_voice"),
    gq("s1mt2-004", "Recent _____ show an increase in customer satisfaction.", ["survey", "surveys", "surveyed", "surveying"], 1, "Cần danh từ số nhiều làm chủ ngữ (vì show không có -s). Surveys = các khảo sát.", "noun_identification"),
    gq("s1mt2-005", "The factory _____ electronic components since 2015.", ["produce", "produces", "has produced", "producing"], 2, "Since 2015 → Present Perfect: has produced.", "present_perfect"),
    gq("s1mt2-006", "Mr. Chen _____ the company for over twenty years.", ["join", "joins", "joined", "has joined"], 3, "For over twenty years + still working → Present Perfect: has joined.", "present_perfect"),
    gq("s1mt2-007", "The seminar will _____ effective communication skills.", ["cover", "covers", "covered", "covering"], 0, "Sau will → V nguyên mẫu: will cover.", "future_simple"),
    gq("s1mt2-008", "Customer _____ is our top priority.", ["satisfy", "satisfactory", "satisfaction", "satisfactorily"], 2, "Trước is (verb) → cần chủ ngữ (danh từ). Satisfaction. Đuôi -tion.", "noun_suffixes"),
    gq("s1mt2-009", "The technician _____ the system error yesterday afternoon.", ["fix", "fixes", "fixed", "fixing"], 2, "Yesterday afternoon → Past Simple: fixed.", "past_simple"),
    gq("s1mt2-010", "New employees must _____ a background check.", ["undergo", "undergoes", "underwent", "undergoing"], 0, "Sau must → V nguyên mẫu: must undergo.", "modal_verbs"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// LESSON 4: Pronouns
// ═══════════════════════════════════════════════════════════════════

export const lesson4Pronouns: GrammarLesson = {
  id: "s1-gram-04",
  stage: "foundation",
  order: 6,
  titleVi: "Đại từ (Pronoun)",
  titleEn: "Pronouns",
  category: "grammar",
  sourceUrl: "https://prepedu.com/vi/blog/su-so-huu-va-dai-tu-trong-tieng-anh",
  theorySections: [
    {
      heading: "1. Đại từ nhân xưng (Personal Pronouns)",
      content: "Chủ ngữ: I, you, he, she, it, we, they\nTân ngữ: me, you, him, her, it, us, them\n\nSau giới từ → dùng tân ngữ: for him, with them, to us",
      examples: [
        { en: "She submitted the report. (subject)", vi: "Cô ấy đã nộp báo cáo." },
        { en: "The manager called her. (object)", vi: "Quản lý đã gọi cho cô ấy." },
      ],
    },
    {
      heading: "2. Tính từ sở hữu vs. Đại từ sở hữu",
      content: "Tính từ sở hữu (đứng trước noun): my, your, his, her, its, our, their\nĐại từ sở hữu (đứng một mình, thay thế noun): mine, yours, his, hers, its, ours, theirs\n\nSo sánh:\n• This is my report. (my + noun)\n• This report is mine. (mine thay thế \"my report\")",
      tip: "TOEIC hay hỏi phân biệt: their/theirs, its/it's, your/yours",
    },
    {
      heading: "3. Đại từ phản thân (Reflexive Pronouns)",
      content: "myself, yourself, himself, herself, itself, ourselves, yourselves, themselves\n\nDùng khi chủ ngữ và tân ngữ là cùng 1 người/vật:\n• She introduced herself. (cô ấy tự giới thiệu)\n• The door opened by itself. (cửa tự mở)",
    },
    {
      heading: "4. Đại từ chỉ định & bất định",
      content: "Chỉ định: this, that, these, those\nBất định: some, any, each, every, another, other, others\n\n• Each employee must complete the form.\n• Some employees prefer working remotely.\n• Another meeting has been scheduled.",
    },
  ],
  exercises: [
    gq("s1g04-001", "_____ should submit the application by Friday.", ["Applicant", "Applicants", "Applying", "Application"], 1, "Cần chủ ngữ (danh từ số nhiều) vì should + V nguyên mẫu (không thêm -s). Applicants = các ứng viên.", "pronoun_subject"),
    gq("s1g04-002", "The manager asked _____ to prepare the presentation.", ["I", "me", "my", "mine"], 1, "Sau asked → cần tân ngữ. Me là đại từ tân ngữ.", "personal_pronoun"),
    gq("s1g04-003", "Each employee must complete _____ timesheet by Friday.", ["they", "them", "their", "theirs"], 2, "Trước danh từ timesheet cần tính từ sở hữu. Each employee → their (số ít hình thức nhưng dùng their cho gender-neutral).", "possessive_adjective"),
    gq("s1g04-004", "The report is _____. Please don't take it.", ["my", "me", "mine", "myself"], 2, "Sau is → cần đại từ sở hữu (đứng một mình). Mine = của tôi.", "possessive_pronoun"),
    gq("s1g04-005", "She introduced _____ to the new team members.", ["she", "her", "hers", "herself"], 3, "Chủ ngữ She = tân ngữ → dùng đại từ phản thân: herself.", "reflexive_pronoun"),
    gq("s1g04-006", "Mr. Park gave the documents to _____ assistant.", ["he", "him", "his", "himself"], 2, "Trước danh từ assistant cần tính từ sở hữu: his = của anh ấy.", "possessive_adjective"),
    gq("s1g04-007", "The company and _____ employees celebrated the milestone together.", ["it", "its", "it's", "itself"], 1, "Trước employees (noun) cần tính từ sở hữu. Its (không có dấu phẩy) = của nó.", "possessive_adjective"),
    gq("s1g04-008", "If you have any questions, please contact _____ directly.", ["we", "us", "our", "ours"], 1, "Sau contact (verb) cần tân ngữ. Us = chúng tôi (tân ngữ).", "personal_pronoun"),
    gq("s1g04-009", "_____ of the applicants met the minimum qualifications.", ["Few", "Little", "Much", "Each"], 0, "Applicants là danh từ đếm được số nhiều → dùng Few. Little/Much dùng cho không đếm được.", "indefinite_pronoun"),
    gq("s1g04-010", "The two departments have different goals, but _____ are working toward the same vision.", ["each", "every", "both", "another"], 2, "Hai bộ phận → Both = cả hai. Each/every + danh từ số ít.", "indefinite_pronoun"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// MINI TEST 3 (covers Lesson 1-4)
// ═══════════════════════════════════════════════════════════════════

export const miniTest3: TestUnit = {
  id: "s1-test-mini03",
  stage: "foundation",
  order: 7,
  titleVi: "Mini Test 3: Từ loại, Danh từ, Động từ & Đại từ",
  titleEn: "Mini Test 3: POS, Nouns, Verbs & Pronouns",
  category: "test",
  testType: "mini_test",
  coversLessonIds: ["s1-gram-01", "s1-gram-02", "s1-gram-03", "s1-gram-04"],
  passingScore: 60,
  timeLimit: 10,
  exercises: [
    gq("s1mt3-001", "The supervisor praised _____ for the excellent work.", ["they", "them", "their", "theirs"], 1, "Sau praised (verb) → cần tân ngữ. Them = họ (tân ngữ).", "personal_pronoun"),
    gq("s1mt3-002", "The company will _____ the results at the annual meeting.", ["announce", "announced", "announcing", "announcement"], 0, "Sau will → V nguyên mẫu: will announce.", "future_simple"),
    gq("s1mt3-003", "_____ applicants who pass the interview will receive an offer.", ["Every", "All", "Each", "Another"], 1, "Theo sau là applicants (số nhiều) → All. Every/Each + danh từ số ít.", "indefinite_pronoun"),
    gq("s1mt3-004", "The _____ of the company's profits exceeded expectations.", ["grow", "growth", "growing", "grown"], 1, "Sau The + trước of → danh từ. Growth = sự tăng trưởng. Đuôi -th.", "noun_suffixes"),
    gq("s1mt3-005", "She prepared the documents _____.", ["her", "hers", "herself", "she"], 2, "She = chủ ngữ, tự chuẩn bị → đại từ phản thân: herself.", "reflexive_pronoun"),
    gq("s1mt3-006", "The board has already _____ the budget for next year.", ["approve", "approves", "approved", "approving"], 2, "Has + V3 → Present Perfect: has approved.", "present_perfect"),
    gq("s1mt3-007", "Please fill out the form and return it to _____ office.", ["we", "us", "our", "ours"], 2, "Trước danh từ office → cần tính từ sở hữu: our.", "possessive_adjective"),
    gq("s1mt3-008", "The _____ of the new software took several months.", ["develop", "developer", "development", "developed"], 2, "Sau The + trước of → danh từ chỉ sự việc. Development = sự phát triển.", "noun_suffixes"),
    gq("s1mt3-009", "The receptionist _____ the package this morning.", ["receive", "receives", "received", "receiving"], 2, "This morning (đã qua) → Past Simple: received.", "past_simple"),
    gq("s1mt3-010", "This conference room is larger than _____.", ["that", "those", "that one", "the other ones"], 2, "So sánh 2 phòng → dùng that one để thay thế \"that conference room\".", "demonstrative_pronoun"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// LESSON 5: Adjectives & Adverbs
// ═══════════════════════════════════════════════════════════════════

export const lesson5AdjAdv: GrammarLesson = {
  id: "s1-gram-05",
  stage: "foundation",
  order: 8,
  titleVi: "Tính từ và Trạng từ (Adjective & Adverb)",
  titleEn: "Adjectives & Adverbs",
  category: "grammar",
  sourceUrl: "https://prepedu.com/vi/blog/ngu-phap-ve-tinh-tu-trong-tieng-anh",
  theorySections: [
    {
      heading: "1. Tính từ (Adjective)",
      content: "Tính từ bổ nghĩa cho danh từ, đứng:\n• Trước danh từ: an important meeting\n• Sau linking verb (be, seem, look, become, feel): The report is accurate.\n\nĐuôi nhận biết tính từ:\n• -ful: helpful, successful, careful\n• -ive: effective, productive, creative\n• -ous: dangerous, famous, various\n• -al: annual, professional, additional\n• -able/-ible: available, responsible, flexible\n• -ent/-ant: different, important, significant",
    },
    {
      heading: "2. Trạng từ (Adverb)",
      content: "Trạng từ bổ nghĩa cho động từ, tính từ, hoặc trạng từ khác.\nThường có đuôi -ly: carefully, quickly, recently, significantly\n\nVị trí:\n• Sau động từ: She works efficiently.\n• Trước tính từ: extremely important\n• Trước trạng từ khác: very carefully\n• Đầu câu: Unfortunately, the meeting was canceled.",
      tip: "TOEIC Part 5 thường hỏi: chọn tính từ hay trạng từ?\n→ Bổ nghĩa cho NOUN = tính từ\n→ Bổ nghĩa cho VERB/ADJ/ADV = trạng từ",
    },
    {
      heading: "3. So sánh (Comparison)",
      content: "So sánh hơn:\n• Adj/Adv ngắn: adj + -er + than → cheaper than\n• Adj/Adv dài: more + adj/adv + than → more expensive than\n\nSo sánh nhất:\n• Adj/Adv ngắn: the + adj + -est → the cheapest\n• Adj/Adv dài: the most + adj/adv → the most expensive\n\nBất quy tắc: good/well → better → best; bad/badly → worse → worst",
    },
  ],
  exercises: [
    gq("s1g05-001", "The new software is very _____ for managing projects.", ["use", "useful", "usefully", "usefulness"], 1, "Sau is very → cần tính từ. Useful = hữu ích. Đuôi -ful.", "adj_identification"),
    gq("s1g05-002", "She _____ reviewed the contract before signing it.", ["careful", "carefully", "carefulness", "care"], 1, "Cần trạng từ bổ nghĩa cho động từ reviewed. Carefully = cẩn thận. Đuôi -ly.", "adv_identification"),
    gq("s1g05-003", "The _____ growth of the company surprised everyone.", ["rapid", "rapidly", "rapidity", "rapids"], 0, "Trước danh từ growth → cần tính từ. Rapid = nhanh chóng.", "adj_before_noun"),
    gq("s1g05-004", "This quarter's revenue is _____ than last quarter's.", ["high", "higher", "highest", "highly"], 1, "So sánh 2 quý → so sánh hơn: higher than.", "comparison"),
    gq("s1g05-005", "The proposal was _____ approved by the committee.", ["unanimous", "unanimously", "unanimity", "unanimousness"], 1, "Trạng từ bổ nghĩa cho động từ approved. Unanimously = một cách nhất trí.", "adv_identification"),
    gq("s1g05-006", "This is the _____ hotel in the city.", ["expensive", "more expensive", "most expensive", "expensively"], 2, "So sánh nhất → the most expensive (adj dài).", "comparison"),
    gq("s1g05-007", "The instructions should be written in _____ language.", ["simplicity", "simple", "simply", "simplify"], 1, "Trước danh từ language → cần tính từ. Simple = đơn giản.", "adj_before_noun"),
    gq("s1g05-008", "Sales have increased _____  over the past year.", ["significance", "significant", "significantly", "signify"], 2, "Trạng từ bổ nghĩa cho động từ increased. Significantly = đáng kể.", "adv_identification"),
    gq("s1g05-009", "The customer was _____ satisfied with the service.", ["complete", "completed", "completely", "completion"], 2, "Trạng từ bổ nghĩa cho tính từ satisfied. Completely = hoàn toàn.", "adv_before_adj"),
    gq("s1g05-010", "Mr. Tanaka is one of the _____ experienced engineers in the firm.", ["much", "more", "most", "many"], 2, "One of the + superlative + noun → one of the most experienced.", "comparison"),
    gq("s1g05-011", "The delay was _____ to the bad weather conditions.", ["attribute", "attributable", "attributably", "attribution"], 1, "Sau was → linking verb + adj. Attributable = có thể quy cho. Đuôi -able.", "adj_identification"),
    gq("s1g05-012", "The training program is _____ designed for new employees.", ["specific", "specifically", "specification", "specify"], 1, "Trạng từ bổ nghĩa cho V3 designed. Specifically = chuyên biệt.", "adv_identification"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// LESSON 6: Prepositions
// ═══════════════════════════════════════════════════════════════════

export const lesson6Prepositions: GrammarLesson = {
  id: "s1-gram-06",
  stage: "foundation",
  order: 9,
  titleVi: "Giới từ (Preposition)",
  titleEn: "Prepositions",
  category: "grammar",
  sourceUrl: "https://prepedu.com/vi/blog/gioi-tu-trong-tieng-anh",
  theorySections: [
    {
      heading: "1. Giới từ chỉ thời gian",
      content: "• IN + tháng/năm/mùa/buổi: in January, in 2024, in the morning\n• ON + ngày/thứ/ngày tháng: on Monday, on March 5th\n• AT + giờ cụ thể/thời điểm: at 3 PM, at noon, at the moment\n• BY + hạn chót: by Friday = trước thứ Sáu\n• DURING + khoảng thời gian: during the meeting\n• FOR + khoảng thời gian (how long): for three years\n• SINCE + mốc thời gian: since 2020",
    },
    {
      heading: "2. Giới từ chỉ nơi chốn",
      content: "• IN + nơi lớn/bên trong: in the office, in Tokyo, in the building\n• ON + bề mặt/tầng: on the desk, on the third floor\n• AT + địa điểm cụ thể: at the station, at the entrance\n• BETWEEN + hai đối tượng: between A and B\n• AMONG + nhiều đối tượng: among the employees",
    },
    {
      heading: "3. Giới từ trong collocations quan trọng",
      content: "• responsible FOR + noun/V-ing\n• participate IN + event\n• apply FOR + position\n• comply WITH + regulations\n• result IN + outcome\n• according TO + source\n• due TO + reason\n• in accordance WITH + policy\n• on behalf OF + person\n• in addition TO + noun",
      tip: "Collocation giới từ là dạng bài Part 5 phổ biến nhất trong TOEIC!",
    },
  ],
  exercises: [
    gq("s1g06-001", "The meeting is scheduled _____ 10 AM.", ["in", "on", "at", "by"], 2, "Giờ cụ thể → AT: at 10 AM.", "preposition_time"),
    gq("s1g06-002", "The office will be closed _____ the holiday season.", ["in", "during", "for", "since"], 1, "Khoảng thời gian (holiday season = sự kiện) → during.", "preposition_time"),
    gq("s1g06-003", "The report must be submitted _____ the end of the month.", ["at", "on", "in", "by"], 3, "Hạn chót → BY: by the end of the month.", "preposition_time"),
    gq("s1g06-004", "The new office is located _____ the second floor.", ["in", "on", "at", "to"], 1, "Tầng → ON: on the second floor.", "preposition_place"),
    gq("s1g06-005", "Ms. Kim is responsible _____ managing the project budget.", ["to", "for", "with", "at"], 1, "Collocation: responsible FOR + noun/V-ing.", "preposition_collocation"),
    gq("s1g06-006", "The delay was caused _____ a technical problem.", ["for", "with", "by", "from"], 2, "Bị động: caused BY = gây ra bởi.", "preposition_collocation"),
    gq("s1g06-007", "Please respond _____ our invitation by next Monday.", ["for", "with", "at", "to"], 3, "Collocation: respond TO + noun.", "preposition_collocation"),
    gq("s1g06-008", "The conference will be held _____ November.", ["in", "on", "at", "during"], 0, "Tháng → IN: in November.", "preposition_time"),
    gq("s1g06-009", "According _____ the latest report, sales have increased.", ["with", "for", "in", "to"], 3, "Collocation cố định: according TO = theo.", "preposition_collocation"),
    gq("s1g06-010", "The project has been underway _____ last January.", ["for", "since", "during", "from"], 1, "Mốc thời gian cụ thể + Present Perfect → SINCE: since last January.", "preposition_time"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// MINI TEST 4 (covers Lesson 1-6)
// ═══════════════════════════════════════════════════════════════════

export const miniTest4: TestUnit = {
  id: "s1-test-mini04",
  stage: "foundation",
  order: 10,
  titleVi: "Mini Test 4: Tổng hợp L1-L6",
  titleEn: "Mini Test 4: Comprehensive L1-L6",
  category: "test",
  testType: "mini_test",
  coversLessonIds: ["s1-gram-01", "s1-gram-02", "s1-gram-03", "s1-gram-04", "s1-gram-05", "s1-gram-06"],
  passingScore: 60,
  timeLimit: 15,
  exercises: [
    gq("s1mt4-001", "The _____ of the new marketing strategy was well received.", ["present", "presentation", "presented", "presenting"], 1, "Sau The + trước of → danh từ. Presentation = bài trình bày.", "noun_suffixes"),
    gq("s1mt4-002", "She _____ completed all the required courses.", ["success", "successful", "successfully", "succeed"], 2, "Trạng từ bổ nghĩa cho động từ completed. Successfully = thành công.", "adv_identification"),
    gq("s1mt4-003", "The seminar begins _____ 9 AM sharp.", ["in", "on", "at", "by"], 2, "Giờ cụ thể → AT: at 9 AM.", "preposition_time"),
    gq("s1mt4-004", "_____ department must submit a quarterly report.", ["All", "Each", "Both", "These"], 1, "Trước danh từ số ít department → Each. All + danh từ số nhiều.", "indefinite_pronoun"),
    gq("s1mt4-005", "The _____ of our employees is continuously improving.", ["perform", "performance", "performing", "performed"], 1, "Sau The + trước of → danh từ. Performance = hiệu suất. Đuôi -ance.", "noun_suffixes"),
    gq("s1mt4-006", "We should _____ the issue before the deadline.", ["resolve", "resolved", "resolving", "resolution"], 0, "Sau should → V nguyên mẫu: should resolve.", "modal_verbs"),
    gq("s1mt4-007", "The renovation project is _____ advanced than we expected.", ["far", "more", "most", "very"], 1, "So sánh hơn với adj dài (advanced): more advanced than.", "comparison"),
    gq("s1mt4-008", "All applicants must comply _____ the company's policies.", ["to", "for", "with", "in"], 2, "Collocation: comply WITH = tuân thủ.", "preposition_collocation"),
    gq("s1mt4-009", "The report should be ready _____ tomorrow morning.", ["at", "on", "in", "by"], 3, "Hạn chót → BY: by tomorrow morning.", "preposition_time"),
    gq("s1mt4-010", "The new product is _____ popular among young consumers.", ["particular", "particularly", "particulars", "particularize"], 1, "Trạng từ bổ nghĩa cho tính từ popular. Particularly = đặc biệt.", "adv_before_adj"),
    gq("s1mt4-011", "Ms. Lee sent the package to _____ directly.", ["they", "them", "their", "theirs"], 1, "Sau giới từ to → tân ngữ: them.", "personal_pronoun"),
    gq("s1mt4-012", "The committee has _____ decided on a new venue for the event.", ["recent", "recently", "recentness", "recency"], 1, "Trạng từ bổ nghĩa cho V3 decided. Recently = gần đây.", "adv_identification"),
    gq("s1mt4-013", "The company's _____ results exceeded expectations.", ["finance", "financial", "financially", "financing"], 1, "Trước danh từ results → cần tính từ. Financial = tài chính. Đuôi -al.", "adj_before_noun"),
    gq("s1mt4-014", "He has worked _____ this company since 2018.", ["in", "on", "at", "for"], 3, "Collocation: work FOR + company.", "preposition_collocation"),
    gq("s1mt4-015", "The training will help employees improve _____ skills.", ["they", "them", "their", "theirs"], 2, "Trước danh từ skills → tính từ sở hữu: their.", "possessive_adjective"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// LESSON 7: Sentence Patterns
// ═══════════════════════════════════════════════════════════════════

export const lesson7SentencePatterns: GrammarLesson = {
  id: "s1-gram-07",
  stage: "foundation",
  order: 11,
  titleVi: "Các mẫu câu (Sentence Patterns)",
  titleEn: "Sentence Patterns",
  category: "grammar",
  theorySections: [
    {
      heading: "1. Câu đơn (Simple Sentence)",
      content: "Chỉ có 1 mệnh đề độc lập: S + V (+ O/C)\nVí dụ: The manager approved the proposal.",
    },
    {
      heading: "2. Câu ghép (Compound Sentence)",
      content: "2 mệnh đề độc lập nối bằng liên từ đẳng lập: and, but, or, so, yet, nor, for\nVí dụ: The report was late, but the manager accepted it.",
      tip: "Dùng dấu phẩy trước liên từ đẳng lập khi nối 2 mệnh đề.",
    },
    {
      heading: "3. Câu phức (Complex Sentence)",
      content: "1 mệnh đề chính + 1 (hoặc nhiều) mệnh đề phụ\nLiên từ phụ thuộc: because, although, when, while, if, unless, before, after, since, until\n\nVí dụ:\n• Although the weather was bad, the event proceeded.\n• We postponed the meeting because several people were absent.",
    },
    {
      heading: "4. Câu điều kiện cơ bản",
      content: "Loại 0 (sự thật): If + Present Simple, Present Simple\n→ If you heat water to 100°C, it boils.\n\nLoại 1 (có thể xảy ra): If + Present Simple, will + V\n→ If it rains, we will postpone the event.\n\nLoại 2 (giả định): If + Past Simple, would + V\n→ If I had more time, I would study harder.",
    },
  ],
  exercises: [
    gq("s1g07-001", "The office was closed, _____ many employees worked from home.", ["so", "because", "although", "despite"], 0, "Hai mệnh đề → liên từ đẳng lập. Văn phòng đóng → KẾT QUẢ nhân viên WFH → so.", "compound_sentence"),
    gq("s1g07-002", "_____ the budget was limited, the team completed the project successfully.", ["Despite", "Although", "Because of", "Due to"], 1, "Although + mệnh đề (S+V). Despite/Because of/Due to + danh từ (không có S+V).", "complex_sentence"),
    gq("s1g07-003", "If sales continue to increase, the company _____ more employees.", ["hire", "hires", "will hire", "hired"], 2, "Câu điều kiện loại 1: If + Present Simple, will + V. → will hire.", "conditional"),
    gq("s1g07-004", "She finished the report _____ she left the office.", ["after", "before", "until", "during"], 1, "Hoàn thành báo cáo trước khi rời → before.", "complex_sentence"),
    gq("s1g07-005", "The product is popular _____ it is affordable.", ["because", "although", "despite", "however"], 0, "Sản phẩm phổ biến VÌ giá phải chăng → because + mệnh đề.", "complex_sentence"),
    gq("s1g07-006", "_____ the heavy traffic, he arrived at the meeting on time.", ["Although", "Despite", "Because", "Since"], 1, "Sau Despite + danh từ (the heavy traffic). Although + mệnh đề.", "complex_sentence"),
    gq("s1g07-007", "You will not receive a refund _____ you return the product within 30 days.", ["if", "unless", "when", "because"], 1, "Unless = if not. Không hoàn tiền trừ khi trả hàng trong 30 ngày.", "conditional"),
    gq("s1g07-008", "The manager reviewed the proposal _____ made several suggestions.", ["and", "but", "or", "so"], 0, "Hai hành động song song → and: reviewed and made.", "compound_sentence"),
    gq("s1g07-009", "_____ the project is completed, a final report will be submitted.", ["Because", "Once", "Despite", "However"], 1, "Once = khi/sau khi. Khi dự án hoàn thành → nộp báo cáo.", "complex_sentence"),
    gq("s1g07-010", "If I _____ the CEO, I would invest more in employee training.", ["am", "was", "were", "will be"], 2, "Câu điều kiện loại 2 (giả định): If I were... → would + V.", "conditional"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// Export all Stage 1 Grammar content
// ═══════════════════════════════════════════════════════════════════

export const stage1GrammarLessons: GrammarLesson[] = [
  lesson1Introduction,
  lesson2Nouns,
  lesson3Verbs,
  lesson4Pronouns,
  lesson5AdjAdv,
  lesson6Prepositions,
  lesson7SentencePatterns,
];

export const stage1GrammarTests: TestUnit[] = [
  miniTest1,
  miniTest2,
  miniTest3,
  miniTest4,
];

/** Total exercise count for validation */
export const STAGE1_GRAMMAR_EXERCISE_COUNT =
  stage1GrammarLessons.reduce((sum, l) => sum + l.exercises.length, 0) +
  stage1GrammarTests.reduce((sum, t) => sum + t.exercises.length, 0);
