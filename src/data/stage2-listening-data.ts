/**
 * Stage 2: Listening Practice Data (TOEIC 300→600)
 *
 * Part 1-4 listening exercises.
 * Since we cannot play audio, exercises are text-based with transcripts.
 * Students read the transcript and answer questions to practice comprehension.
 */

import type { ListeningExercise, ListeningLesson } from "@/domain/study-roadmap";

// ─── Helper ──────────────────────────────────────────────────────

function lq(
  id: string,
  type: ListeningExercise["type"],
  transcript: string,
  question: string,
  answers: readonly [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanationVi: string,
  part: 1 | 2 | 3 | 4,
  difficulty: 1 | 2 | 3 = 1,
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
// Part 1: Photographs — Describing People
// ═══════════════════════════════════════════════════════════════════

export const listeningPart1People: ListeningLesson = {
  id: "s2-listen-01",
  stage: "intermediate",
  order: 2,
  titleVi: "Part 1: Tranh tả người",
  titleEn: "Part 1: Photographs - People",
  category: "listening",
  part: 1,
  strategyVi: "Chiến lược Part 1:\n1. Nhìn tranh 5 giây trước khi nghe\n2. Xác định: AI đang làm GÌ, ở ĐÂU\n3. Chú ý thì hiện tại tiếp diễn (is/are + V-ing)\n4. Loại trừ đáp án sai ngay khi nghe",
  exercises: [
    lq("s2l01-001", "listening_photo",
      "(A) A woman is typing on a computer.\n(B) A woman is talking on the phone.\n(C) A woman is writing on a whiteboard.\n(D) A woman is reading a newspaper.",
      "[Tranh: Một phụ nữ đang gõ bàn phím máy tính tại bàn làm việc]\nChọn câu mô tả đúng nhất:",
      ["A woman is typing on a computer.", "A woman is talking on the phone.", "A woman is writing on a whiteboard.", "A woman is reading a newspaper."], 0,
      "Tranh mô tả phụ nữ đang gõ máy tính → (A) is typing on a computer.", 1),
    lq("s2l01-002", "listening_photo",
      "(A) The men are shaking hands.\n(B) The men are sitting across from each other.\n(C) The men are standing in a line.\n(D) The men are looking at a screen.",
      "[Tranh: Hai người đàn ông đang bắt tay nhau trong phòng họp]\nChọn câu mô tả đúng nhất:",
      ["The men are shaking hands.", "The men are sitting across from each other.", "The men are standing in a line.", "The men are looking at a screen."], 0,
      "Hai người đàn ông bắt tay → (A) shaking hands.", 1),
    lq("s2l01-003", "listening_photo",
      "(A) A chef is preparing food in a kitchen.\n(B) A waiter is serving food to customers.\n(C) A customer is looking at a menu.\n(D) People are sitting at outdoor tables.",
      "[Tranh: Một đầu bếp đang chuẩn bị thức ăn trong nhà bếp]\nChọn câu mô tả đúng nhất:",
      ["A chef is preparing food in a kitchen.", "A waiter is serving food to customers.", "A customer is looking at a menu.", "People are sitting at outdoor tables."], 0,
      "Đầu bếp đang chuẩn bị thức ăn → (A) preparing food.", 1),
    lq("s2l01-004", "listening_photo",
      "(A) Workers are carrying boxes.\n(B) A man is driving a forklift.\n(C) Packages are being loaded onto a truck.\n(D) The warehouse is empty.",
      "[Tranh: Công nhân đang khuân thùng hàng trong nhà kho]\nChọn câu mô tả đúng nhất:",
      ["Workers are carrying boxes.", "A man is driving a forklift.", "Packages are being loaded onto a truck.", "The warehouse is empty."], 0,
      "Công nhân đang khuân thùng → (A) carrying boxes.", 1),
    lq("s2l01-005", "listening_photo",
      "(A) The woman is pointing at a chart.\n(B) The woman is handing out papers.\n(C) The woman is making copies.\n(D) The woman is organizing files.",
      "[Tranh: Một phụ nữ đang chỉ vào biểu đồ trên màn hình trong cuộc họp]\nChọn câu mô tả đúng nhất:",
      ["The woman is pointing at a chart.", "The woman is handing out papers.", "The woman is making copies.", "The woman is organizing files."], 0,
      "Phụ nữ chỉ vào biểu đồ → (A) pointing at a chart.", 1),
    lq("s2l01-006", "listening_photo",
      "(A) A security guard is checking IDs.\n(B) A receptionist is answering the phone.\n(C) A janitor is mopping the floor.\n(D) A delivery person is holding a package.",
      "[Tranh: Một bảo vệ đang kiểm tra thẻ tại cổng vào tòa nhà]\nChọn câu mô tả đúng nhất:",
      ["A security guard is checking IDs.", "A receptionist is answering the phone.", "A janitor is mopping the floor.", "A delivery person is holding a package."], 0,
      "Bảo vệ kiểm tra thẻ → (A) checking IDs.", 1),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// Part 2: Question-Response — WH Questions
// ═══════════════════════════════════════════════════════════════════

export const listeningPart2WH: ListeningLesson = {
  id: "s2-listen-02",
  stage: "intermediate",
  order: 4,
  titleVi: "Part 2: Câu hỏi WH & How",
  titleEn: "Part 2: WH & How Questions",
  category: "listening",
  part: 2,
  strategyVi: "Chiến lược Part 2:\n1. Tập trung từ ĐẦU TIÊN của câu hỏi (Who, What, Where, When, Why, How)\n2. Who → trả lời về NGƯỜI\n3. Where → trả lời về NƠI CHỐN\n4. When → trả lời về THỜI GIAN\n5. Loại trừ đáp án lặp lại từ trong câu hỏi (trap!)",
  exercises: [
    lq("s2l02-001", "listening_qa",
      "Q: Where is the nearest copy machine?\nA: It's on the second floor.\nB: About 20 copies.\nC: Yes, I made copies.",
      "Where is the nearest copy machine?",
      ["It's on the second floor.", "About 20 copies.", "Yes, I made copies.", ""], 0,
      "Where → trả lời về nơi chốn: on the second floor.", 2),
    lq("s2l02-002", "listening_qa",
      "Q: When will the project be completed?\nA: In the meeting room.\nB: By the end of next month.\nC: The project manager.",
      "When will the project be completed?",
      ["In the meeting room.", "By the end of next month.", "The project manager.", ""], 1,
      "When → trả lời về thời gian: by the end of next month.", 2),
    lq("s2l02-003", "listening_qa",
      "Q: Who is in charge of the marketing campaign?\nA: It started last week.\nB: We charged $500.\nC: Ms. Tanaka is leading it.",
      "Who is in charge of the marketing campaign?",
      ["It started last week.", "We charged $500.", "Ms. Tanaka is leading it.", ""], 2,
      "Who → trả lời về người: Ms. Tanaka. Lưu ý: 'charged' trong B là bẫy (âm giống 'in charge').", 2),
    lq("s2l02-004", "listening_qa",
      "Q: What time does the workshop start?\nA: At 2 o'clock.\nB: In the conference room.\nC: About three hours.",
      "What time does the workshop start?",
      ["At 2 o'clock.", "In the conference room.", "About three hours.", ""], 0,
      "What time → giờ cụ thể: At 2 o'clock.", 2),
    lq("s2l02-005", "listening_qa",
      "Q: Why was the meeting postponed?\nA: It was held in room 201.\nB: Because the director was out of town.\nC: The meeting lasted two hours.",
      "Why was the meeting postponed?",
      ["It was held in room 201.", "Because the director was out of town.", "The meeting lasted two hours.", ""], 1,
      "Why → lý do: Because the director was out of town.", 2),
    lq("s2l02-006", "listening_qa",
      "Q: How many copies do you need?\nA: By tomorrow morning.\nB: The copy machine is broken.\nC: Just ten, please.",
      "How many copies do you need?",
      ["By tomorrow morning.", "The copy machine is broken.", "Just ten, please.", ""], 2,
      "How many → số lượng: Just ten.", 2),
    lq("s2l02-007", "listening_qa",
      "Q: How will the results be announced?\nA: The results were excellent.\nB: Next Monday.\nC: By email to all staff.",
      "How will the results be announced?",
      ["The results were excellent.", "Next Monday.", "By email to all staff.", ""], 2,
      "How → phương thức: By email. (A) lặp 'results' = bẫy, (B) trả lời When.", 2),
    lq("s2l02-008", "listening_qa",
      "Q: Where should I park my car?\nA: There's a parking lot behind the building.\nB: About 30 minutes.\nC: I drove here.",
      "Where should I park my car?",
      ["There's a parking lot behind the building.", "About 30 minutes.", "I drove here.", ""], 0,
      "Where → nơi chốn: parking lot behind the building.", 2),
    lq("s2l02-009", "listening_qa",
      "Q: What does the new policy require?\nA: All employees to attend monthly training.\nB: In the policy handbook.\nC: Yes, it's required.",
      "What does the new policy require?",
      ["All employees to attend monthly training.", "In the policy handbook.", "Yes, it's required.", ""], 0,
      "What → nội dung: All employees to attend monthly training.", 2),
    lq("s2l02-010", "listening_qa",
      "Q: Who should I contact about the shipping delay?\nA: It was shipped yesterday.\nB: The customer service department.\nC: The package weighs 5 kg.",
      "Who should I contact about the shipping delay?",
      ["It was shipped yesterday.", "The customer service department.", "The package weighs 5 kg.", ""], 1,
      "Who → người/bộ phận: customer service department.", 2),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// Part 3: Conversations
// ═══════════════════════════════════════════════════════════════════

export const listeningPart3: ListeningLesson = {
  id: "s2-listen-03",
  stage: "intermediate",
  order: 10,
  titleVi: "Part 3: Hội thoại ngắn",
  titleEn: "Part 3: Short Conversations",
  category: "listening",
  part: 3,
  strategyVi: "Chiến lược Part 3:\n1. Đọc câu hỏi TRƯỚC khi nghe\n2. Chú ý: Ai nói? Nói về gì? Ở đâu? Sẽ làm gì tiếp?\n3. Câu trả lời thường paraphrase (diễn đạt lại) nội dung hội thoại",
  exercises: [
    lq("s2l03-001", "listening_conversation",
      "Woman: Excuse me, I'm looking for the conference room for the marketing seminar.\nMan: It's on the third floor, room 305. Take the elevator on your left.\nWoman: Thank you. Do I need to register at the door?\nMan: Yes, there's a sign-in sheet at the entrance.",
      "Where is the marketing seminar being held?",
      ["On the first floor", "On the second floor", "On the third floor", "On the fourth floor"], 2,
      "Third floor, room 305.", 3),
    lq("s2l03-002", "listening_conversation",
      "Woman: Excuse me, I'm looking for the conference room for the marketing seminar.\nMan: It's on the third floor, room 305. Take the elevator on your left.\nWoman: Thank you. Do I need to register at the door?\nMan: Yes, there's a sign-in sheet at the entrance.",
      "What does the woman need to do at the entrance?",
      ["Show her ID", "Pay an entrance fee", "Sign in", "Pick up a name tag"], 2,
      "Sign-in sheet at the entrance = ký tên tại lối vào.", 3),
    lq("s2l03-003", "listening_conversation",
      "Man: Have you seen the quarterly sales report? I can't find my copy.\nWoman: I think Sarah has a copy. She was reviewing it this morning.\nMan: Thanks. I need it for the meeting at 3.\nWoman: You might want to hurry—it starts in 20 minutes.",
      "What is the man looking for?",
      ["A presentation file", "The quarterly sales report", "A meeting agenda", "Sarah's phone number"], 1,
      "The man is looking for the quarterly sales report.", 3),
    lq("s2l03-004", "listening_conversation",
      "Man: Have you seen the quarterly sales report? I can't find my copy.\nWoman: I think Sarah has a copy. She was reviewing it this morning.\nMan: Thanks. I need it for the meeting at 3.\nWoman: You might want to hurry—it starts in 20 minutes.",
      "What does the woman suggest?",
      ["Canceling the meeting", "Printing a new copy", "Hurrying because time is short", "Asking the manager for help"], 2,
      "You might want to hurry = nên nhanh lên.", 3),
    lq("s2l03-005", "listening_conversation",
      "Woman: I'd like to return this jacket. It doesn't fit properly.\nMan: Do you have your receipt?\nWoman: Yes, here it is. I bought it last Tuesday.\nMan: I can offer you a full refund or an exchange for a different size.",
      "Why does the woman want to return the jacket?",
      ["It is damaged", "It doesn't fit", "She found a cheaper one", "She changed her mind about the color"], 1,
      "It doesn't fit properly = không vừa.", 3),
    lq("s2l03-006", "listening_conversation",
      "Woman: I'd like to return this jacket. It doesn't fit properly.\nMan: Do you have your receipt?\nWoman: Yes, here it is. I bought it last Tuesday.\nMan: I can offer you a full refund or an exchange for a different size.",
      "What options does the man offer?",
      ["A discount or store credit", "A refund or an exchange", "A repair or replacement", "An apology or compensation"], 1,
      "A full refund or an exchange = hoàn tiền hoặc đổi size.", 3),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// Part 4: Short Talks
// ═══════════════════════════════════════════════════════════════════

export const listeningPart4: ListeningLesson = {
  id: "s2-listen-04",
  stage: "intermediate",
  order: 12,
  titleVi: "Part 4: Bài nói ngắn",
  titleEn: "Part 4: Short Talks",
  category: "listening",
  part: 4,
  strategyVi: "Chiến lược Part 4:\n1. Xác định LOẠI bài nói: thông báo, quảng cáo, tin nhắn thoại, hướng dẫn\n2. Đọc câu hỏi trước để biết cần tìm thông tin gì\n3. Câu hỏi thường theo thứ tự nội dung bài nói",
  exercises: [
    lq("s2l04-001", "listening_talk",
      "Attention, shoppers. Our store will be closing in 30 minutes. Please bring your final selections to the checkout counters on the first floor. We'd like to remind you that all summer clothing is currently 40 percent off. This sale ends today, so don't miss this opportunity. Thank you for shopping with us, and we look forward to seeing you again.",
      "What type of announcement is this?",
      ["A weather report", "A store closing announcement", "A job opening", "A product recall"], 1,
      "Store closing announcement: Our store will be closing in 30 minutes.", 4),
    lq("s2l04-002", "listening_talk",
      "Attention, shoppers. Our store will be closing in 30 minutes. Please bring your final selections to the checkout counters on the first floor. We'd like to remind you that all summer clothing is currently 40 percent off. This sale ends today, so don't miss this opportunity. Thank you for shopping with us, and we look forward to seeing you again.",
      "What is the current discount on summer clothing?",
      ["20 percent", "30 percent", "40 percent", "50 percent"], 2,
      "40 percent off summer clothing.", 4),
    lq("s2l04-003", "listening_talk",
      "Good morning, everyone. I'm calling to let you know that the team meeting originally scheduled for Tuesday has been moved to Thursday at 10 AM. The meeting will now be held in Conference Room B instead of Room A, as Room A is being used for a training session. Please review the updated agenda that I sent via email yesterday. If you have any questions, feel free to call me back.",
      "What change has been made?",
      ["The meeting time has changed", "The meeting has been canceled", "The agenda has been removed", "The training session was postponed"], 0,
      "Meeting moved from Tuesday to Thursday at 10 AM.", 4),
    lq("s2l04-004", "listening_talk",
      "Good morning, everyone. I'm calling to let you know that the team meeting originally scheduled for Tuesday has been moved to Thursday at 10 AM. The meeting will now be held in Conference Room B instead of Room A, as Room A is being used for a training session. Please review the updated agenda that I sent via email yesterday. If you have any questions, feel free to call me back.",
      "Why was the room changed?",
      ["Room A is under renovation", "Room A is being used for training", "Room B has better equipment", "Room A is too small"], 1,
      "Room A is being used for a training session.", 4),
    lq("s2l04-005", "listening_talk",
      "Welcome to City Tour Bus. This is the Green Line, which stops at the main tourist attractions in the downtown area. Our first stop will be the Central Art Museum, followed by the Historic Market Square and the Harbor District. The entire tour takes approximately two hours. Please remain seated while the bus is moving, and feel free to ask our guide any questions.",
      "What is the first stop on the tour?",
      ["Historic Market Square", "Harbor District", "Central Art Museum", "City Hall"], 2,
      "Our first stop will be the Central Art Museum.", 4),
    lq("s2l04-006", "listening_talk",
      "Welcome to City Tour Bus. This is the Green Line, which stops at the main tourist attractions in the downtown area. Our first stop will be the Central Art Museum, followed by the Historic Market Square and the Harbor District. The entire tour takes approximately two hours. Please remain seated while the bus is moving, and feel free to ask our guide any questions.",
      "How long does the tour take?",
      ["About one hour", "About two hours", "About three hours", "About four hours"], 1,
      "Approximately two hours.", 4),
  ],
};

// ─── Export ──────────────────────────────────────────────────────

export const stage2ListeningLessons: ListeningLesson[] = [
  listeningPart1People,
  listeningPart2WH,
  listeningPart3,
  listeningPart4,
];

export const STAGE2_LISTENING_EXERCISE_COUNT =
  stage2ListeningLessons.reduce((sum, l) => sum + l.exercises.length, 0);
