/**
 * Stage 1: Mini Tests & Final Test for Foundation Vocabulary
 *
 * 5 mini tests + 1 final test covering grammar + vocabulary.
 */

import type { TestUnit, GrammarExercise, VocabExercise } from "@/domain/study-roadmap";

// ─── Helpers ─────────────────────────────────────────────────────

function gq(
  id: string, prompt: string,
  answers: readonly [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanationVi: string, grammarPoint: string,
  difficulty: 1 | 2 | 3 = 1,
): GrammarExercise {
  const ids = ["A", "B", "C", "D"] as const;
  return {
    id, type: "part5_fill_blank", prompt,
    options: answers.map((text, i) => ({ id: ids[i], text })),
    correctOptionId: ids[correctIndex],
    explanationVi, grammarPoint, difficulty,
  };
}

function vq(
  id: string, prompt: string,
  answers: readonly [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanationVi: string, targetWordId: string,
  difficulty: 1 | 2 | 3 = 1,
): VocabExercise {
  const ids = ["A", "B", "C", "D"] as const;
  return {
    id, type: "meaning_match", prompt,
    options: answers.map((text, i) => ({ id: ids[i], text })),
    correctOptionId: ids[correctIndex],
    explanationVi, targetWordId, difficulty,
  };
}

// ═══════════════════════════════════════════════════════════════════
// VOCAB MINI TEST 1 (covers V1-V5)
// ═══════════════════════════════════════════════════════════════════

export const vocabMiniTest1: TestUnit = {
  id: "s1-test-vmini01",
  stage: "foundation",
  order: 24,
  titleVi: "Mini Test từ vựng 1: Tổng hợp V1-V5",
  titleEn: "Vocab Mini Test 1: V1-V5 Review",
  category: "test",
  testType: "mini_test",
  coversLessonIds: ["s1-vocab-01", "s1-vocab-02", "s1-vocab-03", "s1-vocab-04", "s1-vocab-05"],
  passingScore: 60,
  timeLimit: 15,
  exercises: [
    vq("vmt1-001", "The manager asked all _____ to attend the training session.", ["employees", "equipment", "maintenance", "documents"], 0, "Employees = nhân viên. All employees = tất cả nhân viên.", "vw-employee"),
    gq("vmt1-002", "The _____ was postponed due to bad weather.", ["venue", "agenda", "event", "delegate"], 2, "Event = sự kiện. Postpone an event = hoãn sự kiện.", "vocab_context"),
    vq("vmt1-003", "What does 'itinerary' mean?", ["hạn chót", "lộ trình", "hành lý", "hộ chiếu"], 1, "Itinerary = lộ trình, lịch trình chi tiết.", "vw-itinerary"),
    gq("vmt1-004", "All _____ must be signed before the deadline.", ["documents", "colleagues", "facilities", "receptions"], 0, "Documents = tài liệu. Sign documents = ký tài liệu.", "vocab_context"),
    vq("vmt1-005", "What does 'warranty' mean?", ["giảm giá", "phiếu giảm giá", "bảo hành", "biên lai"], 2, "Warranty = bảo hành, chế độ bảo hành.", "vw-warranty"),
    gq("vmt1-006", "The company offers _____ shipping for orders over $50.", ["complimentary", "temporary", "essential", "upcoming"], 0, "Complimentary = miễn phí. Complimentary shipping = giao hàng miễn phí.", "vocab_context"),
    vq("vmt1-007", "What does 'merchandise' mean?", ["cửa hàng", "hàng hóa", "quầy thu ngân", "kho hàng"], 1, "Merchandise = hàng hóa, sản phẩm bán.", "vw-merchandise"),
    gq("vmt1-008", "The _____ for the conference room needs to be confirmed.", ["reservation", "registration", "relocation", "renovation"], 0, "Reservation = đặt chỗ. Confirm a reservation = xác nhận đặt chỗ.", "vocab_context"),
    vq("vmt1-009", "What does 'colleague' mean?", ["quản lý", "khách hàng", "đồng nghiệp", "ứng viên"], 2, "Colleague = đồng nghiệp.", "vw-colleague"),
    gq("vmt1-010", "Please keep your _____ pass visible at all times.", ["boarding", "luggage", "terminal", "customs"], 0, "Boarding pass = thẻ lên máy bay.", "vocab_context"),
    vq("vmt1-011", "What does 'efficient' mean?", ["quan trọng", "hiệu quả", "tạm thời", "thiết yếu"], 1, "Efficient = hiệu quả, năng suất.", "vw-efficiently"),
    gq("vmt1-012", "The store accepts _____ for products returned within 30 days.", ["refunds", "receipts", "discounts", "catalogs"], 0, "Refunds = hoàn tiền. Accept refunds = chấp nhận hoàn tiền.", "vocab_context"),
    vq("vmt1-013", "What does 'facility' mean?", ["thiết bị", "bảo trì", "cơ sở vật chất", "văn phòng"], 2, "Facility = cơ sở vật chất, tiện ích.", "vw-facility"),
    gq("vmt1-014", "The flight _____ has been changed to 3 PM.", ["departure", "destination", "passenger", "accommodation"], 0, "Departure = giờ khởi hành. Flight departure = giờ bay.", "vocab_context"),
    gq("vmt1-015", "We need to order more office _____.", ["supplies", "agendas", "seminars", "workshops"], 0, "Supplies = vật tư. Office supplies = đồ dùng văn phòng.", "vocab_context"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// VOCAB MINI TEST 2 (covers V6-V8)
// ═══════════════════════════════════════════════════════════════════

export const vocabMiniTest2: TestUnit = {
  id: "s1-test-vmini02",
  stage: "foundation",
  order: 25,
  titleVi: "Mini Test từ vựng 2: V6-V8",
  titleEn: "Vocab Mini Test 2: V6-V8 Review",
  category: "test",
  testType: "mini_test",
  coversLessonIds: ["s1-vocab-06", "s1-vocab-07", "s1-vocab-08"],
  passingScore: 60,
  timeLimit: 15,
  exercises: [
    vq("vmt2-001", "What does 'transaction' mean?", ["khoản vay", "giao dịch", "tiền gửi", "số dư"], 1, "Transaction = giao dịch.", "vw-transaction"),
    vq("vmt2-002", "What does 'investment' mean?", ["chi phí", "thuế", "đầu tư", "thu nhập"], 2, "Investment = đầu tư, khoản đầu tư.", "vw-investment"),
    vq("vmt2-003", "What does 'database' mean?", ["mạng lưới", "cơ sở dữ liệu", "máy chủ", "phần mềm"], 1, "Database = cơ sở dữ liệu.", "vw-database"),
    gq("vmt2-004", "The bank charges a low _____ rate on home loans.", ["interest", "balance", "deposit", "revenue"], 0, "Interest rate = lãi suất.", "vocab_context"),
    vq("vmt2-005", "What does 'prescription' mean?", ["triệu chứng", "đơn thuốc", "chẩn đoán", "bảo hiểm"], 1, "Prescription = đơn thuốc.", "vw-prescription"),
    gq("vmt2-006", "The IT team will _____ the software this weekend.", ["upgrade", "audit", "deposit", "prescribe"], 0, "Upgrade = nâng cấp. Upgrade software = nâng cấp phần mềm.", "vocab_context"),
    vq("vmt2-007", "What does 'revenue' mean?", ["lợi nhuận", "chi phí", "doanh thu", "thuế"], 2, "Revenue = doanh thu, thu nhập.", "vw-revenue"),
    vq("vmt2-008", "What does 'compatible' mean?", ["tương thích", "khả dụng", "bảo mật", "trục trặc"], 0, "Compatible = tương thích.", "vw-compatible"),
    gq("vmt2-009", "Please make a _____ of $500 into your savings account.", ["deposit", "balance", "invoice", "transaction"], 0, "Deposit = tiền gửi. Make a deposit = gửi tiền.", "vocab_context"),
    vq("vmt2-010", "What does 'symptom' mean?", ["phương pháp điều trị", "triệu chứng", "thuốc", "phẫu thuật"], 1, "Symptom = triệu chứng.", "vw-symptom"),
    gq("vmt2-011", "The new system has enhanced _____ features.", ["security", "password", "hardware", "scanner"], 0, "Security features = tính năng bảo mật.", "vocab_context"),
    vq("vmt2-012", "What does 'invoice' mean?", ["ngân sách", "hóa đơn", "hợp đồng", "biên lai"], 1, "Invoice = hóa đơn.", "vw-invoice"),
    gq("vmt2-013", "Regular _____ are important for early detection of health issues.", ["checkups", "recoveries", "injuries", "pharmacies"], 0, "Checkups = kiểm tra sức khỏe định kỳ.", "vocab_context"),
    vq("vmt2-014", "What does 'backup' mean?", ["tải xuống", "sao lưu", "mật khẩu", "giám sát"], 1, "Backup = sao lưu, bản dự phòng.", "vw-backup"),
    gq("vmt2-015", "The _____ recommended rest and medication.", ["patient", "physician", "pharmacy", "insurance"], 1, "Physician = bác sĩ. The physician recommended = bác sĩ khuyên.", "vocab_context"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// VOCAB MINI TEST 3 (covers V9-V10)
// ═══════════════════════════════════════════════════════════════════

export const vocabMiniTest3: TestUnit = {
  id: "s1-test-vmini03",
  stage: "foundation",
  order: 26,
  titleVi: "Mini Test từ vựng 3: V9-V10",
  titleEn: "Vocab Mini Test 3: V9-V10 Review",
  category: "test",
  testType: "mini_test",
  coversLessonIds: ["s1-vocab-09", "s1-vocab-10"],
  passingScore: 60,
  timeLimit: 15,
  exercises: [
    vq("vmt3-001", "What does 'lease' mean?", ["cho thuê / hợp đồng thuê", "chủ nhà", "người thuê", "tiền đặt cọc"], 0, "Lease = hợp đồng cho thuê.", "vw-lease"),
    vq("vmt3-002", "What does 'tenant' mean?", ["chủ nhà", "người thuê nhà", "nhà đầu tư", "người bán"], 1, "Tenant = người thuê nhà.", "vw-tenant"),
    vq("vmt3-003", "What does 'reservation' mean?", ["thực đơn", "đặt chỗ", "phục vụ", "tiệc"], 1, "Reservation = đặt chỗ.", "vw-reservation"),
    gq("vmt3-004", "The apartment comes fully _____.", ["vacant", "residential", "furnished", "commercial"], 2, "Furnished = có đầy đủ nội thất.", "vocab_context"),
    vq("vmt3-005", "What does 'catering' mean?", ["biểu diễn", "dịch vụ ăn uống", "triển lãm", "khán giả"], 1, "Catering = dịch vụ cung cấp thức ăn.", "vw-catering"),
    gq("vmt3-006", "Monthly _____ includes water, gas, and electricity.", ["rent", "lease", "utilities", "mortgage"], 2, "Utilities = tiện ích (điện, nước, gas).", "vocab_context"),
    vq("vmt3-007", "What does 'exhibit' mean?", ["buổi biểu diễn", "triển lãm", "vé vào cửa", "phòng trưng bày"], 1, "Exhibit = triển lãm, trưng bày.", "vw-exhibit"),
    gq("vmt3-008", "The _____ was very impressed with the location of the property.", ["tenant", "landlord", "mortgage", "vacancy"], 0, "Tenant = người thuê. Impressed with location = ấn tượng với vị trí.", "vocab_context"),
    vq("vmt3-009", "What does 'cuisine' mean?", ["đầu bếp", "ẩm thực", "thực đơn", "bồi bàn"], 1, "Cuisine = ẩm thực, phong cách nấu ăn.", "vw-cuisine"),
    gq("vmt3-010", "_____ to the museum is free on Sundays.", ["Admission", "Performance", "Audience", "Gallery"], 0, "Admission = phí vào cửa. Free admission = miễn phí vào cửa.", "vocab_context"),
    vq("vmt3-011", "What does 'spacious' mean?", ["hiện đại", "rộng rãi", "sang trọng", "tiện nghi"], 1, "Spacious = rộng rãi, thoáng đãng.", "vw-spacious"),
    gq("vmt3-012", "The _____ signed a one-year contract with the property owner.", ["tenant", "audience", "chef", "waiter"], 0, "Tenant = người thuê. Sign a contract = ký hợp đồng.", "vocab_context"),
    vq("vmt3-013", "What does 'appetizer' mean?", ["món chính", "món tráng miệng", "món khai vị", "đồ uống"], 2, "Appetizer = món khai vị.", "vw-appetizer"),
    gq("vmt3-014", "The property requires an _____ before the sale can proceed.", ["inspection", "occupancy", "renovation", "mortgage"], 0, "Inspection = kiểm tra, thanh tra.", "vocab_context"),
    gq("vmt3-015", "The restaurant is famous for its traditional _____.", ["cuisine", "banquet", "menu", "admission"], 0, "Cuisine = ẩm thực. Traditional cuisine = ẩm thực truyền thống.", "vocab_context"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// VOCAB MINI TEST 4 (covers V11-V12)
// ═══════════════════════════════════════════════════════════════════

export const vocabMiniTest4: TestUnit = {
  id: "s1-test-vmini04",
  stage: "foundation",
  order: 27,
  titleVi: "Mini Test từ vựng 4: V11-V12",
  titleEn: "Vocab Mini Test 4: V11-V12 Review",
  category: "test",
  testType: "mini_test",
  coversLessonIds: ["s1-vocab-11", "s1-vocab-12"],
  passingScore: 60,
  timeLimit: 15,
  exercises: [
    vq("vmt4-001", "What does 'forecast' mean?", ["dự báo", "lũ lụt", "hạn hán", "bão"], 0, "Forecast = dự báo (thời tiết).", "vw-forecast"),
    vq("vmt4-002", "What does 'scholarship' mean?", ["học phí", "học bổng", "bằng cấp", "đánh giá"], 1, "Scholarship = học bổng.", "vw-scholarship"),
    gq("vmt4-003", "The government plans to reduce carbon _____.", ["emissions", "droughts", "habitats", "regulations"], 0, "Emissions = khí thải. Carbon emissions = khí thải carbon.", "vocab_context"),
    vq("vmt4-004", "What does 'curriculum' mean?", ["bài giảng", "chương trình học", "luận văn", "đánh giá"], 1, "Curriculum = chương trình giảng dạy.", "vw-curriculum"),
    gq("vmt4-005", "The city promotes _____ energy sources.", ["renewable", "sustainable", "precipitation", "habitat"], 0, "Renewable energy = năng lượng tái tạo.", "vocab_context"),
    vq("vmt4-006", "What does 'enrollment' mean?", ["tốt nghiệp", "ghi danh", "giảng viên", "bài tập"], 1, "Enrollment = ghi danh, đăng ký nhập học.", "vw-enrollment"),
    gq("vmt4-007", "The company uses _____ packaging materials.", ["recyclable", "pollution", "disposal", "emission"], 0, "Recyclable = có thể tái chế.", "vocab_context"),
    vq("vmt4-008", "What does 'assessment' mean?", ["bài tập", "đánh giá", "bài giảng", "bằng cấp"], 1, "Assessment = đánh giá, kiểm tra.", "vw-assessment"),
    gq("vmt4-009", "Students must complete the _____ to receive credits.", ["assignment", "accreditation", "conservation", "ecosystem"], 0, "Assignment = bài tập, nhiệm vụ.", "vocab_context"),
    vq("vmt4-010", "What does 'sustainable' mean?", ["bền vững", "tái chế", "ô nhiễm", "khí thải"], 0, "Sustainable = bền vững.", "vw-sustainable"),
    gq("vmt4-011", "The weather _____ predicts rain for the weekend.", ["forecast", "temperature", "precipitation", "humidity"], 0, "Weather forecast = dự báo thời tiết.", "vocab_context"),
    vq("vmt4-012", "What does 'tuition' mean?", ["chương trình học", "học phí", "bằng tốt nghiệp", "học bổng"], 1, "Tuition = học phí.", "vw-tuition"),
    gq("vmt4-013", "The university offers online _____ for busy professionals.", ["tutorials", "ecosystems", "habitats", "forecasts"], 0, "Tutorials = khóa hướng dẫn, bài học trực tuyến.", "vocab_context"),
    vq("vmt4-014", "What does 'conservation' mean?", ["bảo tồn", "ô nhiễm", "tiêu hủy", "tái chế"], 0, "Conservation = bảo tồn.", "vw-conservation"),
    gq("vmt4-015", "All students must meet the _____ requirements to graduate.", ["academic", "sustainable", "renewable", "environmental"], 0, "Academic requirements = yêu cầu học thuật.", "vocab_context"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// VOCAB MINI TEST 5 (comprehensive V1-V12)
// ═══════════════════════════════════════════════════════════════════

export const vocabMiniTest5: TestUnit = {
  id: "s1-test-vmini05",
  stage: "foundation",
  order: 28,
  titleVi: "Mini Test từ vựng 5: Tổng hợp V1-V12",
  titleEn: "Vocab Mini Test 5: Comprehensive Review",
  category: "test",
  testType: "mini_test",
  coversLessonIds: [
    "s1-vocab-01", "s1-vocab-02", "s1-vocab-03", "s1-vocab-04",
    "s1-vocab-05", "s1-vocab-06", "s1-vocab-07", "s1-vocab-08",
    "s1-vocab-09", "s1-vocab-10", "s1-vocab-11", "s1-vocab-12",
  ],
  passingScore: 65,
  timeLimit: 20,
  exercises: [
    gq("vmt5-001", "The annual _____ meeting will be held in Tokyo.", ["budget", "deadline", "proposal", "conference"], 3, "Conference meeting = hội nghị. Annual conference = hội nghị thường niên.", "vocab_context"),
    gq("vmt5-002", "Please _____ the form and return it by Friday.", ["complete", "postpone", "arrange", "distribute"], 0, "Complete the form = hoàn thành biểu mẫu.", "vocab_context"),
    gq("vmt5-003", "The company invested in new _____ for the factory.", ["equipment", "colleagues", "agendas", "venues"], 0, "Equipment = thiết bị. Invest in equipment = đầu tư thiết bị.", "vocab_context"),
    vq("vmt5-004", "What does 'promptly' mean?", ["cuối cùng", "đúng giờ", "dần dần", "tạm thời"], 1, "Promptly = đúng giờ, kịp thời.", "vw-promptly"),
    gq("vmt5-005", "Round-trip _____ to Paris cost $800.", ["flights", "passports", "customs", "terminals"], 0, "Round-trip flights = vé máy bay khứ hồi.", "vocab_context"),
    vq("vmt5-006", "What does 'deposit' mean?", ["rút tiền", "gửi tiền / đặt cọc", "vay", "thuế"], 1, "Deposit = gửi tiền, tiền đặt cọc.", "vw-deposit"),
    gq("vmt5-007", "The _____ network was down for maintenance.", ["software", "hardware", "computer", "server"], 2, "Computer network = mạng máy tính.", "vocab_context"),
    vq("vmt5-008", "What does 'renovation' mean?", ["thanh tra", "cải tạo", "cho thuê", "tiện ích"], 1, "Renovation = cải tạo, tu sửa.", "vw-renovation"),
    gq("vmt5-009", "The restaurant received excellent reviews for its _____.", ["cuisine", "admission", "gallery", "exhibition"], 0, "Cuisine = ẩm thực.", "vocab_context"),
    vq("vmt5-010", "What does 'emission' mean?", ["bảo tồn", "dự báo", "khí thải", "tái chế"], 2, "Emission = khí thải, sự phát thải.", "vw-emission"),
    gq("vmt5-011", "Students can apply for a _____ to cover tuition fees.", ["scholarship", "curriculum", "assignment", "tutorial"], 0, "Scholarship = học bổng. Apply for a scholarship = xin học bổng.", "vocab_context"),
    vq("vmt5-012", "What does 'warranty' mean?", ["giảm giá", "biên lai", "bảo hành", "hàng hóa"], 2, "Warranty = bảo hành.", "vw-warranty"),
    gq("vmt5-013", "The _____ will inspect the property before the purchase.", ["landlord", "tenant", "inspector", "mortgage"], 2, "Inspector = thanh tra viên.", "vocab_context"),
    vq("vmt5-014", "What does 'upgrade' mean?", ["sao lưu", "nâng cấp", "tải xuống", "cài đặt"], 1, "Upgrade = nâng cấp.", "vw-upgrade"),
    gq("vmt5-015", "The doctor wrote a _____ for the medication.", ["symptom", "prescription", "diagnosis", "treatment"], 1, "Prescription = đơn thuốc. Write a prescription = kê đơn thuốc.", "vocab_context"),
    gq("vmt5-016", "The heavy _____ caused flooding in the city.", ["precipitation", "humidity", "forecast", "temperature"], 0, "Precipitation = lượng mưa. Heavy precipitation = mưa lớn.", "vocab_context"),
    vq("vmt5-017", "What does 'maintenance' mean?", ["bảo trì", "thiết bị", "vật tư", "cơ sở"], 0, "Maintenance = bảo trì, bảo dưỡng.", "vw-maintenance"),
    gq("vmt5-018", "She _____ the contract before signing it.", ["reviewed", "postponed", "canceled", "registered"], 0, "Reviewed = xem xét lại. Review a contract = xem xét hợp đồng.", "vocab_context"),
    vq("vmt5-019", "What does 'accreditation' mean?", ["chương trình học", "bài tập", "công nhận/kiểm định", "bằng cấp"], 2, "Accreditation = sự công nhận, kiểm định chất lượng.", "vw-accreditation"),
    gq("vmt5-020", "The building has a _____ parking lot for tenants.", ["spacious", "vacant", "residential", "furnished"], 0, "Spacious = rộng rãi. Spacious parking lot = bãi đỗ xe rộng.", "vocab_context"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// STAGE 1 FINAL TEST (Grammar + Vocabulary comprehensive)
// ═══════════════════════════════════════════════════════════════════

export const stage1FinalTest: TestUnit = {
  id: "s1-test-final",
  stage: "foundation",
  order: 29,
  titleVi: "🏆 Bài thi cuối Chặng 1: Nền tảng TOEIC",
  titleEn: "🏆 Stage 1 Final Test: TOEIC Foundation",
  category: "test",
  testType: "final_test",
  coversLessonIds: [
    "s1-gram-01", "s1-gram-02", "s1-gram-03", "s1-gram-04",
    "s1-gram-05", "s1-gram-06", "s1-gram-07",
    "s1-vocab-01", "s1-vocab-02", "s1-vocab-03",
  ],
  passingScore: 70,
  timeLimit: 30,
  exercises: [
    // Grammar section (15 questions)
    gq("sf-001", "The _____ of the new product line exceeded all expectations.", ["introduce", "introduction", "introductory", "introduced"], 1, "Sau The + trước of → danh từ. Introduction = sự giới thiệu.", "noun_suffixes"),
    gq("sf-002", "All staff members should _____ the health and safety guidelines.", ["follow", "follows", "followed", "following"], 0, "Sau should → V nguyên mẫu: should follow.", "modal_verbs"),
    gq("sf-003", "The marketing team has _____ developed a new advertising campaign.", ["recent", "recently", "recentness", "recency"], 1, "Trạng từ bổ nghĩa cho has developed. Recently = gần đây.", "adv_identification"),
    gq("sf-004", "Ms. Johnson praised _____ for completing the project ahead of schedule.", ["they", "them", "their", "theirs"], 1, "Sau praised (verb) → tân ngữ: them.", "personal_pronoun"),
    gq("sf-005", "The renovation project is _____ complex than initially planned.", ["much", "more", "most", "very"], 1, "So sánh hơn với adj dài: more complex than.", "comparison"),
    gq("sf-006", "The workshop is scheduled _____ December 15th.", ["in", "on", "at", "by"], 1, "Ngày cụ thể → ON: on December 15th.", "preposition_time"),
    gq("sf-007", "The company's _____ has improved significantly this year.", ["perform", "performance", "performing", "performed"], 1, "Sau 's (possessive) → danh từ. Performance = hiệu suất.", "noun_suffixes"),
    gq("sf-008", "If the weather improves, we _____ hold the event outdoors.", ["can", "could", "will", "would"], 2, "If + Present Simple, will + V = câu điều kiện loại 1.", "conditional"),
    gq("sf-009", "Each department is responsible _____ submitting monthly reports.", ["to", "for", "with", "in"], 1, "Collocation: responsible FOR + V-ing.", "preposition_collocation"),
    gq("sf-010", "The report was _____ submitted before the deadline.", ["success", "successful", "successfully", "succeed"], 2, "Trạng từ bổ nghĩa cho V3 submitted. Successfully = thành công.", "adv_identification"),
    gq("sf-011", "_____ the heavy rain, the outdoor event was canceled.", ["Although", "Despite", "Because", "However"], 1, "Despite + noun phrase (the heavy rain).", "complex_sentence"),
    gq("sf-012", "The new software _____ installed on all computers last week.", ["is", "was", "has been", "will be"], 1, "Last week → quá khứ đơn bị động: was installed.", "passive_voice"),
    gq("sf-013", "Customers can choose _____ several payment options.", ["from", "for", "with", "to"], 0, "Choose from = chọn từ (nhiều lựa chọn).", "preposition_collocation"),
    gq("sf-014", "The _____ team worked overtime to meet the deadline.", ["entire", "entirely", "entirety", "entired"], 0, "Trước danh từ team → tính từ: entire = toàn bộ.", "adj_before_noun"),
    gq("sf-015", "She has been working here _____ she graduated from university.", ["for", "since", "during", "while"], 1, "Mốc thời gian (she graduated) + Present Perfect → since.", "preposition_time"),
    // Vocabulary section (15 questions)
    vq("sf-016", "What does 'proposal' mean?", ["ngân sách", "đề xuất", "hạn chót", "lịch trình"], 1, "Proposal = đề xuất, bản đề nghị.", "vw-proposal"),
    gq("sf-017", "The company will _____ the results at the press conference.", ["announce", "postpone", "participate", "register"], 0, "Announce = công bố. Announce the results = công bố kết quả.", "vocab_context"),
    vq("sf-018", "What does 'agenda' mean?", ["hội nghị", "chương trình nghị sự", "bài thuyết trình", "hội thảo"], 1, "Agenda = chương trình nghị sự.", "vw-agenda"),
    gq("sf-019", "Please _____ your attendance by email.", ["confirm", "complete", "assign", "distribute"], 0, "Confirm = xác nhận. Confirm attendance = xác nhận tham dự.", "vocab_context"),
    vq("sf-020", "What does 'relocate' mean?", ["tổ chức lại", "cập nhật", "di dời", "phân phối"], 2, "Relocate = di dời, chuyển địa điểm.", "vw-relocate"),
    gq("sf-021", "All _____ must be maintained regularly.", ["equipment", "colleagues", "deadlines", "budgets"], 0, "Equipment = thiết bị. Maintain equipment = bảo trì thiết bị.", "vocab_context"),
    vq("sf-022", "What does 'venue' mean?", ["đại biểu", "lời mời", "địa điểm tổ chức", "đăng ký"], 2, "Venue = địa điểm tổ chức sự kiện.", "vw-venue"),
    gq("sf-023", "The _____ speaker delivered an inspiring talk.", ["keynote", "delegate", "complimentary", "upcoming"], 0, "Keynote speaker = diễn giả chính.", "vocab_context"),
    vq("sf-024", "What does 'essential' mean?", ["tạm thời", "hiệu quả", "chuyên nghiệp", "thiết yếu"], 3, "Essential = thiết yếu, cần thiết.", "vw-essential"),
    gq("sf-025", "She _____ a meeting with the client for next Tuesday.", ["arranged", "canceled", "postponed", "announced"], 0, "Arranged = sắp xếp. Arrange a meeting = sắp xếp cuộc họp.", "vocab_context"),
    vq("sf-026", "What does 'effective' mean?", ["hàng năm", "hiệu quả", "có sẵn", "tạm thời"], 1, "Effective = hiệu quả, có hiệu lực.", "vw-effective"),
    gq("sf-027", "The new policy takes effect _____.", ["immediately", "essentially", "efficiently", "professionally"], 0, "Takes effect immediately = có hiệu lực ngay lập tức.", "vocab_context"),
    vq("sf-028", "What does 'temporary' mean?", ["thiết yếu", "chuyên nghiệp", "tạm thời", "hàng năm"], 2, "Temporary = tạm thời.", "vw-temporary"),
    gq("sf-029", "Online _____ for the seminar closes on May 1st.", ["registration", "presentation", "cancellation", "arrangement"], 0, "Registration = đăng ký. Online registration = đăng ký trực tuyến.", "vocab_context"),
    gq("sf-030", "The building manager requested all _____ to report maintenance issues.", ["employees", "tenants", "delegates", "applicants"], 1, "Tenants = người thuê. Report issues = báo cáo sự cố.", "vocab_context"),
  ],
};

// ─── Export ──────────────────────────────────────────────────────

export const stage1VocabTests: TestUnit[] = [
  vocabMiniTest1,
  vocabMiniTest2,
  vocabMiniTest3,
  vocabMiniTest4,
  vocabMiniTest5,
  stage1FinalTest,
];

export const STAGE1_TEST_EXERCISE_COUNT =
  stage1VocabTests.reduce((sum, t) => sum + t.exercises.length, 0);
