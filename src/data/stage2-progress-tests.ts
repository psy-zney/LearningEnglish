/**
 * Stage 2: Comprehensive Progress Tests (TOEIC 300→600)
 *
 * Full testing battery for Stage 2 Intermediate level:
 * - Progress Test 1 - Listening (Part 1 & 2 - 20 questions)
 * - Progress Test 2 - Reading (Part 5, 6, 7 - 25 questions)
 */

import type {
  TestUnit,
  GrammarExercise,
  ListeningExercise,
  ReadingExercise,
} from "@/domain/study-roadmap";

// ─── Helpers ─────────────────────────────────────────────────────

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

function lq(
  id: string,
  type: ListeningExercise["type"],
  transcript: string,
  question: string,
  answers: readonly [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanationVi: string,
  part: 1 | 2 | 3 | 4,
  difficulty: 1 | 2 | 3 = 2,
): ListeningExercise {
  const ids = ["A", "B", "C", "D"] as const;
  return {
    id, type, transcript, question,
    options: answers.map((text, i) => ({ id: ids[i], text })),
    correctOptionId: ids[correctIndex],
    explanationVi, part, difficulty,
  };
}

// ═══════════════════════════════════════════════════════════════════
// TEST 1: Progress Test 1 - Listening (Part 1 & 2 - 20 questions)
// ═══════════════════════════════════════════════════════════════════

export const s2ProgressTest1Listening: TestUnit = {
  id: "s2-test-pt1-listen",
  stage: "intermediate",
  order: 5,
  titleVi: "Progress Test 1: Listening (Part 1 & 2)",
  titleEn: "Progress Test 1: Listening (Part 1 & 2 Review)",
  category: "test",
  testType: "progress_test",
  coversLessonIds: ["s2-listen-01", "s2-listen-02", "s2-listen-03"],
  passingScore: 65,
  timeLimit: 20,
  exercises: [
    // Part 1: Photos (6 questions)
    lq("pt1l-001", "listening_photo",
      "(A) A forklift is moving across the loading dock.\n(B) The shelves are being dismantled.\n(C) Workers are unloading luggage from a train.\n(D) The warehouse is completely empty.",
      "[Tranh: Một nhân viên điều khiển xe nâng màu vàng gần kệ hàng kim loại trong kho]\nChọn câu mô tả đúng nhất:",
      ["A forklift is moving across the loading dock.", "The shelves are being dismantled.", "Workers are unloading luggage from a train.", "The warehouse is completely empty."],
      0, "Đáp án (A) mô tả đúng xe nâng (forklift) đang di chuyển tại khu bốc dỡ.", 1),

    lq("pt1l-002", "listening_photo",
      "(A) She is putting on safety glasses.\n(B) Blueprints are spread out across the table.\n(C) A building is currently being painted.\n(D) The table is being assembled.",
      "[Tranh: Một nữ kiến trúc sư đội mũ bảo hộ đang chỉ vào bản vẽ trải trên bàn]\nChọn câu mô tả đúng nhất:",
      ["She is putting on safety glasses.", "Blueprints are spread out across the table.", "A building is currently being painted.", "The table is being assembled."],
      1, "Bản vẽ thiết kế (blueprints) được trải rộng trên mặt bàn.", 1),

    lq("pt1l-003", "listening_photo",
      "(A) Cars are parked along both sides of the street.\n(B) Pedestrians are using umbrellas in the rain.\n(C) People are entering a subway station.\n(D) The road is being resurfaced.",
      "[Tranh: Người đi bộ cầm ô che mưa băng qua đường nhựa]\nChọn câu mô tả đúng nhất:",
      ["Cars are parked along both sides of the street.", "Pedestrians are using umbrellas in the rain.", "People are entering a subway station.", "The road is being resurfaced."],
      1, "Người đi bộ (pedestrians) che ô dưới trời mưa.", 1),

    lq("pt1l-004", "listening_photo",
      "(A) Coffee cups are being washed in a sink.\n(B) A drink is being prepared behind the counter.\n(C) Customers are standing in a long line.\n(D) A menu board is being taken down.",
      "[Tranh: Một nhân viên pha chế đang đánh sữa bằng máy pha cà phê]\nChọn câu mô tả đúng nhất:",
      ["Coffee cups are being washed in a sink.", "A drink is being prepared behind the counter.", "Customers are standing in a long line.", "A menu board is being taken down."],
      1, "Thức uống đang được chuẩn bị phía sau quầy.", 1),

    lq("pt1l-005", "listening_photo",
      "(A) The presentation screen has been turned off.\n(B) A meeting is taking place in a conference room.\n(C) The employees are exiting through the double doors.\n(D) Chairs are stacked against the back wall.",
      "[Tranh: Các đồng nghiệp ngồi quanh bàn họp nhìn lên màn hình chiếu]\nChọn câu mô tả đúng nhất:",
      ["The presentation screen has been turned off.", "A meeting is taking place in a conference room.", "The employees are exiting through the double doors.", "Chairs are stacked against the back wall."],
      1, "Cuộc họp đang diễn ra trong phòng họp có bàn và màn chiếu.", 1),

    lq("pt1l-006", "listening_photo",
      "(A) A technician is servicing electrical equipment.\n(B) The computer screens are being replaced.\n(C) Tools are scattered carelessly on the floor.\n(D) The server rack is being moved outside.",
      "[Tranh: Một kỹ thuật viên mang hộp đồ nghề đang kiểm tra dây điện sau tủ máy chủ]\nChọn câu mô tả đúng nhất:",
      ["A technician is servicing electrical equipment.", "The computer screens are being replaced.", "Tools are scattered carelessly on the floor.", "The server rack is being moved outside."],
      0, "Kỹ thuật viên đang bảo dưỡng thiết bị điện/máy chủ.", 1),

    // Part 2: Question-Response (14 questions)
    lq("pt1l-007", "listening_qa",
      "Q: Where should I file these signed invoices?\n(A) In the steel cabinet near reception.\n(B) Yes, I signed them already.\n(C) No later than 5 PM today.",
      "Question: \"Where should I file these signed invoices?\"",
      ["In the steel cabinet near reception.", "Yes, I signed them already.", "No later than 5 PM today.", "[Part 2 has only 3 choices]"],
      0, "Câu hỏi 'Where' chỉ nơi chốn → (A) In the steel cabinet.", 2),

    lq("pt1l-008", "listening_qa",
      "Q: When will the keynote speaker arrive at the hotel?\n(A) He took a taxi from the airport.\n(B) Around two o'clock this afternoon.\n(C) Room three hundred and four.",
      "Question: \"When will the keynote speaker arrive at the hotel?\"",
      ["He took a taxi from the airport.", "Around two o'clock this afternoon.", "Room three hundred and four.", "[Part 2 has only 3 choices]"],
      1, "Câu hỏi 'When' hỏi thời gian → (B) Around two o'clock.", 2),

    lq("pt1l-009", "listening_qa",
      "Q: Who authorized the budget expenditure for new laptops?\n(A) Mr. Bennett in corporate finance.\n(B) Yes, they are very powerful.\n(C) About twenty units in total.",
      "Question: \"Who authorized the budget expenditure for new laptops?\"",
      ["Mr. Bennett in corporate finance.", "Yes, they are very powerful.", "About twenty units in total.", "[Part 2 has only 3 choices]"],
      0, "Câu hỏi 'Who' hỏi người chịu trách nhiệm → (A) Mr. Bennett.", 2),

    lq("pt1l-010", "listening_qa",
      "Q: Why was the flight to Chicago cancelled?\n(A) Because of severe blizzard warnings.\n(B) Gate twelve at terminal one.\n(C) Only for ninety-nine dollars.",
      "Question: \"Why was the flight to Chicago cancelled?\"",
      ["Because of severe blizzard warnings.", "Gate twelve at terminal one.", "Only for ninety-nine dollars.", "[Part 2 has only 3 choices]"],
      0, "Câu hỏi 'Why' hỏi lý do → (A) Because of severe blizzard warnings.", 2),

    lq("pt1l-011", "listening_qa",
      "Q: Could you help me set up the presentation projector?\n(A) Certainly, I will plug in the HDMI cable now.\n(B) The movie was very exciting.\n(C) No, it was held yesterday.",
      "Question: \"Could you help me set up the presentation projector?\"",
      ["Certainly, I will plug in the HDMI cable now.", "The movie was very exciting.", "No, it was held yesterday.", "[Part 2 has only 3 choices]"],
      0, "Lời yêu cầu lịch sự 'Could you...' → (A) Certainly, I will plug in...", 2),

    lq("pt1l-012", "listening_qa",
      "Q: Would you prefer tea or fresh coffee?\n(A) Black coffee would be delightful, thank you.\n(B) Yes, I love hot beverages.\n(C) At three o'clock tomorrow.",
      "Question: \"Would you prefer tea or fresh coffee?\"",
      ["Black coffee would be delightful, thank you.", "Yes, I love hot beverages.", "At three o'clock tomorrow.", "[Part 2 has only 3 choices]"],
      0, "Câu hỏi lựa chọn 'tea or coffee' → (A) Black coffee would be delightful.", 2),

    lq("pt1l-013", "listening_qa",
      "Q: Isn't the quarterly marketing report due by Friday?\n(A) No, the deadline was extended to next Tuesday.\n(B) I bought it at the bookstore.\n(C) About fifteen pages long.",
      "Question: \"Isn't the quarterly marketing report due by Friday?\"",
      ["No, the deadline was extended to next Tuesday.", "I bought it at the bookstore.", "About fifteen pages long.", "[Part 2 has only 3 choices]"],
      0, "Câu hỏi phủ định xác nhận deadline → (A) Hạn chót đã lùi sang thứ Ba.", 2),

    lq("pt1l-014", "listening_qa",
      "Q: How often do company fire alarm drills take place?\n(A) Twice a year, usually in March and October.\n(B) Down the emergency exit stairs.\n(C) Yes, it was quite loud.",
      "Question: \"How often do company fire alarm drills take place?\"",
      ["Twice a year, usually in March and October.", "Down the emergency exit stairs.", "Yes, it was quite loud.", "[Part 2 has only 3 choices]"],
      0, "Câu hỏi 'How often' hỏi tần suất → (A) Twice a year.", 2),

    lq("pt1l-015", "listening_qa",
      "Q: Did you receive confirmation of our catering reservation?\n(A) Yes, the event coordinator sent an email this morning.\n(B) We ordered grilled salmon and salad.\n(C) For thirty attendees.",
      "Question: \"Did you receive confirmation of our catering reservation?\"",
      ["Yes, the event coordinator sent an email this morning.", "We ordered grilled salmon and salad.", "For thirty attendees.", "[Part 2 has only 3 choices]"],
      0, "Câu hỏi Yes/No 'Did you receive...' → (A) Yes, email arrived this morning.", 2),

    lq("pt1l-016", "listening_qa",
      "Q: How much does express courier shipping cost for this parcel?\n(A) Approximately thirty-five dollars.\n(B) It will arrive by tomorrow noon.\n(C) To our regional warehouse in Dallas.",
      "Question: \"How much does express courier shipping cost for this parcel?\"",
      ["Approximately thirty-five dollars.", "It will arrive by tomorrow noon.", "To our regional warehouse in Dallas.", "[Part 2 has only 3 choices]"],
      0, "Câu hỏi giá cả 'How much' → (A) Khoảng 35 đô la.", 2),

    lq("pt1l-017", "listening_qa",
      "Q: Ms. Garcia has finalized the training schedule, hasn't she?\n(A) Yes, she distributed it to all managers earlier.\n(B) No, she works in accounting.\n(C) In conference room C.",
      "Question: \"Ms. Garcia has finalized the training schedule, hasn't she?\"",
      ["Yes, she distributed it to all managers earlier.", "No, she works in accounting.", "In conference room C.", "[Part 2 has only 3 choices]"],
      0, "Câu hỏi đuôi xác nhận hành động → (A) Đúng vậy, cô ấy đã gửi cho các quản lý.", 2),

    lq("pt1l-018", "listening_qa",
      "Q: Which catering menu did the client finally choose?\n(A) They selected the executive Mediterranean buffet.\n(B) Yes, the food was delicious.\n(C) At seven o'clock tonight.",
      "Question: \"Which catering menu did the client finally choose?\"",
      ["They selected the executive Mediterranean buffet.", "Yes, the food was delicious.", "At seven o'clock tonight.", "[Part 2 has only 3 choices]"],
      0, "Câu hỏi 'Which menu' → (A) Executive Mediterranean buffet.", 2),

    lq("pt1l-019", "listening_qa",
      "Q: Do you know who has the spare keys to the supply room?\n(A) I believe building maintenance holds them.\n(B) We ordered five boxes of envelopes.\n(C) Right next to the elevator.",
      "Question: \"Do you know who has the spare keys to the supply room?\"",
      ["I believe building maintenance holds them.", "We ordered five boxes of envelopes.", "Right next to the elevator.", "[Part 2 has only 3 choices]"],
      0, "Hỏi về người giữ chìa khóa → (A) Đội bảo trì tòa nhà đang giữ.", 2),

    lq("pt1l-020", "listening_qa",
      "Q: Why don't we review the quarterly balance sheet over lunch?\n(A) That sounds like a productive plan.\n(B) I ate lunch at twelve.\n(C) The spreadsheet was printed in color.",
      "Question: \"Why don't we review the quarterly balance sheet over lunch?\"",
      ["That sounds like a productive plan.", "I ate lunch at twelve.", "The spreadsheet was printed in color.", "[Part 2 has only 3 choices]"],
      0, "Lời mời/gợi ý 'Why don't we...' → (A) That sounds like a productive plan.", 2),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// TEST 2: Progress Test 2 - Reading (Part 5, 6, 7 - 25 questions)
// ═══════════════════════════════════════════════════════════════════

const part6Passage1: ReadingExercise = {
  id: "s2pt2-p6-01",
  type: "reading_text_completion",
  part: 6,
  difficulty: 2,
  passage: `MEMORANDUM
To: All Department Heads
From: Facilities Management
Subject: Scheduled HVAC Duct Cleaning

Please be advised that all ventilation shafts will undergo extensive cleaning this Saturday. (1) [___], all staff must ensure their desk workstations are cleared of loose documents before 6 PM on Friday. The facilities team will not be responsible for misplaced or soiled papers.

Furthermore, all portable desktop heaters must be (2) [___] unplugged to eliminate potential fire hazards during technician visits. Work will commence promptly at 8 AM Saturday and is expected to conclude by 4 PM. We apologize for any inconvenience this temporary measure may cause.`,
  questions: [
    {
      id: "pt2r-q16",
      question: "Choose the best transition word for blank (1):",
      options: [
        { id: "A", text: "Consequently" },
        { id: "B", text: "However" },
        { id: "C", text: "Although" },
        { id: "D", text: "In contrast" },
      ],
      correctOptionId: "A",
      explanationVi: "Hệ quả của việc vệ sinh ống gió là nhân viên phải dọn bàn → Consequently (Do đó).",
    },
    {
      id: "pt2r-q17",
      question: "Choose the word that best completes blank (2):",
      options: [
        { id: "A", text: "complete" },
        { id: "B", text: "completely" },
        { id: "C", text: "completion" },
        { id: "D", text: "completing" },
      ],
      correctOptionId: "B",
      explanationVi: "Bổ nghĩa cho tính từ phân từ unplugged cần một phó từ: completely.",
    },
  ],
};

const part6Passage2: ReadingExercise = {
  id: "s2pt2-p6-02",
  type: "reading_text_completion",
  part: 6,
  difficulty: 2,
  passage: `PRESS RELEASE
Vortex Aerospace announced today that it (1) [___] a landmark contract with the Global Aviation Authority. The multi-year deal encompasses the delivery of thirty fuel-efficient turbofan engines.

These state-of-the-art propulsion engines are designed to operate (2) [___] while reducing greenhouse emissions by twenty-five percent. CEO Dr. Elena Rostova stated, 'This milestone achievement reflects our team's relentless (3) [___] to engineering innovation.'`,
  questions: [
    {
      id: "pt2r-q18",
      question: "Choose the correct verb form for blank (1):",
      options: [
        { id: "A", text: "secures" },
        { id: "B", text: "has secured" },
        { id: "C", text: "was securing" },
        { id: "D", text: "will have secured" },
      ],
      correctOptionId: "B",
      explanationVi: "Hành động vừa hoàn thành mang lại kết quả công bố → thì hiện tại hoàn thành: has secured.",
    },
    {
      id: "pt2r-q19",
      question: "Choose the appropriate adverb for blank (2):",
      options: [
        { id: "A", text: "efficient" },
        { id: "B", text: "efficiency" },
        { id: "C", text: "efficiently" },
        { id: "D", text: "efficiencies" },
      ],
      correctOptionId: "C",
      explanationVi: "Bổ nghĩa cho động từ operate cần phó từ: efficiently.",
    },
    {
      id: "pt2r-q20",
      question: "Choose the appropriate noun for blank (3):",
      options: [
        { id: "A", text: "dedication" },
        { id: "B", text: "dedicate" },
        { id: "C", text: "dedicated" },
        { id: "D", text: "dedicating" },
      ],
      correctOptionId: "A",
      explanationVi: "Sau tính từ relentless cần một danh từ: dedication (sự tận tụy/cống hiến).",
    },
  ],
};

const part7Passage1: ReadingExercise = {
  id: "s2pt2-p7-01",
  type: "reading_comprehension",
  part: 7,
  difficulty: 2,
  passage: `EMAIL MESSAGE
From: customer-support@solarfresh.com
To: m.kim@novatech.org
Date: October 14, 2026
Subject: Order Confirmation & Shipping Update (#SF-88421)

Dear Mr. Kim,

Thank you for choosing SolarFresh Commercial Filter Systems. We are pleased to confirm that your order (#SF-88421) for four Model-500 industrial air purifiers has been processed.

Your items were dispatched from our Denver distribution warehouse this morning via Summit Freight (Tracking Number: SM-9920148). Deliveries typically require three to five business days. Because your order value exceeded $1,000, express freight charges were waived in accordance with our autumn promotional policy.

Please inspect the shipping crates upon delivery before signing the receipt. If you detect any physical transit damage, notify the courier driver immediately and contact our helpline at 1-800-555-0199 within 48 hours to initiate an expedited replacement.

Sincerely,
Rachel Vance
Customer Care Specialist, SolarFresh Inc.`,
  questions: [
    {
      id: "pt2r-q21",
      question: "What did Mr. Kim purchase from SolarFresh?",
      options: [
        { id: "A", text: "Office furniture" },
        { id: "B", text: "Industrial air purifiers" },
        { id: "C", text: "Replacement computer screens" },
        { id: "D", text: "Heating ventilation ducts" },
      ],
      correctOptionId: "B",
      explanationVi: "Đoạn văn nêu rõ: 'order for four Model-500 industrial air purifiers'.",
    },
    {
      id: "pt2r-q22",
      question: "Why were the shipping fees waived for Mr. Kim?",
      options: [
        { id: "A", text: "He works for a charitable organization" },
        { id: "B", text: "The shipment was delayed" },
        { id: "C", text: "His total purchase exceeded $1,000" },
        { id: "D", text: "He used a special coupon code" },
      ],
      correctOptionId: "C",
      explanationVi: "Đoạn 2 nêu rõ: 'Because your order value exceeded $1,000, express freight charges were waived...'",
    },
    {
      id: "pt2r-q23",
      question: "What is Mr. Kim instructed to do upon parcel arrival?",
      options: [
        { id: "A", text: "Repack the goods into smaller containers" },
        { id: "B", text: "Inspect the crates before signing the receipt" },
        { id: "C", text: "Wire the remaining invoice balance immediately" },
        { id: "D", text: "Schedule a technician for installation" },
      ],
      correctOptionId: "B",
      explanationVi: "Đoạn 3 viết: 'Please inspect the shipping crates upon delivery before signing the receipt.'",
    },
    {
      id: "pt2r-q24",
      question: "Within what timeframe must damage be reported to receive an expedited replacement?",
      options: [
        { id: "A", text: "Within 24 hours" },
        { id: "B", text: "Within 48 hours" },
        { id: "C", text: "Within 5 business days" },
        { id: "D", text: "Within 30 calendar days" },
      ],
      correctOptionId: "B",
      explanationVi: "Đoạn 3 viết rõ: 'contact our helpline... within 48 hours to initiate an expedited replacement.'",
    },
    {
      id: "pt2r-q25",
      question: "In the email, the word 'waived' in paragraph 2 is closest in meaning to:",
      options: [
        { id: "A", text: "canceled or omitted" },
        { id: "B", text: "substantially increased" },
        { id: "C", text: "delayed until later" },
        { id: "D", text: "carefully calculated" },
      ],
      correctOptionId: "A",
      explanationVi: "Từ 'waived' mang nghĩa miễn trừ, bỏ qua không thu phí = canceled or omitted.",
    },
  ],
};

export const s2ProgressTest2Reading: TestUnit = {
  id: "s2-test-pt2-read",
  stage: "intermediate",
  order: 22,
  titleVi: "Progress Test 2: Reading (Part 5, 6, 7)",
  titleEn: "Progress Test 2: Reading Comprehensive Review",
  category: "test",
  testType: "progress_test",
  coversLessonIds: [
    "s2-gram-02", "s2-gram-03", "s2-gram-04", "s2-gram-05", "s2-gram-06",
    "s2-read-01", "s2-read-02"
  ],
  passingScore: 70,
  timeLimit: 30,
  exercises: [
    // Part 5: Incomplete Sentences (15 questions)
    gq("pt2r-001", "The proposed corporate restructuring _____ by board members during yesterday's session.", ["approved", "was approved", "is approving", "will approve"], 1, "Yesterday + bị động quá khứ đơn: was approved.", "passive_voice"),
    gq("pt2r-002", "Neither the project manager nor the software engineers _____ satisfied with the initial beta.", ["was", "were", "is", "has been"], 1, "Neither A nor B: động từ chia theo B (engineers = số nhiều) → were.", "sv_agreement"),
    gq("pt2r-003", "_____ the ongoing supply disruptions, the manufacturing line met its output targets.", ["Although", "Despite", "Because", "However"], 1, "Despite + danh từ/cụm danh từ (the ongoing supply disruptions).", "conjunctions"),
    gq("pt2r-004", "The architectural firm _____ designed our headquarters won an international design award.", ["who", "which", "whose", "whom"], 1, "The firm là danh từ chỉ tổ chức/vật làm chủ ngữ → which (hoặc that).", "relative_pronouns"),
    gq("pt2r-005", "All departing international passengers must display _____ identification at the gate.", ["validity", "valid", "validate", "validly"], 1, "Trước danh từ identification cần một tính từ bổ nghĩa → valid.", "word_form"),
    gq("pt2r-006", "The director emphasized that attendance at the annual compliance symposium is _____ for all staff.", ["compel", "mandatory", "mandate", "mandatorily"], 1, "Sau động từ to be (is) cần tính từ vị ngữ → mandatory (bắt buộc).", "word_form"),
    gq("pt2r-007", "Every employee in our branch _____ given an individual login key to access the intranet.", ["is", "are", "have been", "were"], 0, "Every + danh từ số ít làm chủ ngữ → động từ số ít: is.", "sv_agreement"),
    gq("pt2r-008", "_____ the weather clears up, the outdoor corporate picnic will proceed as scheduled.", ["If", "Unless", "Despite", "Although"], 0, "Mệnh đề điều kiện mang nghĩa khẳng định giả định: If the weather clears up.", "conjunctions"),
    gq("pt2r-009", "The newly appointed regional sales director has performed _____ well under pressure.", ["exceptional", "exceptionally", "exception", "exceptions"], 1, "Bổ nghĩa cho phó từ well hoặc động từ performed cần phó từ: exceptionally.", "word_form"),
    gq("pt2r-010", "The research findings will _____ presented at the upcoming biotechnology symposium.", ["be", "been", "being", "to be"], 0, "Sau động từ khuyết thiếu will + bị động: will be presented.", "passive_voice"),
    gq("pt2r-011", "Clients _____ accounts are currently overdue will incur a two percent monthly interest charge.", ["who", "whose", "whom", "which"], 1, "Đại từ quan hệ chỉ quan hệ sở hữu đối với danh từ accounts → whose accounts.", "relative_pronouns"),
    gq("pt2r-012", "A number of qualified candidates _____ submitted applications for the senior analyst post.", ["has", "have", "is", "was"], 1, "A number of + danh từ số nhiều đi với động từ số nhiều → have submitted.", "sv_agreement"),
    gq("pt2r-013", "The company expanded its server cluster _____ accommodate surging web transaction traffic.", ["in order to", "because", "due to", "in spite of"], 0, "In order to + động từ nguyên thể (accommodate) chỉ mục đích.", "conjunctions"),
    gq("pt2r-014", "Please notify the facilities coordinator if your office heating unit is not working _____.", ["proper", "properly", "property", "propriety"], 1, "Bổ nghĩa cho động từ working cần phó từ: working properly.", "word_form"),
    gq("pt2r-015", "The warranty clearly stipulates that replacement components _____ free of charge.", ["will install", "will be installed", "installing", "installed"], 1, "Chủ ngữ là replacement components (linh kiện) nên cần bị động: will be installed.", "passive_voice"),

    // Part 6 & Part 7 Passages
    part6Passage1,
    part6Passage2,
    part7Passage1,
  ],
};

// ─── Export Stage 2 Progress Tests ────────────────────────────────

export const stage2AdditionalProgressTests: TestUnit[] = [
  s2ProgressTest1Listening,
  s2ProgressTest2Reading,
];
