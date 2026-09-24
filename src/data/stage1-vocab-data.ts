/**
 * Stage 1: Foundation Vocabulary Data (TOEIC 0→300)
 *
 * 12 Vocabulary Lessons covering basic TOEIC topics.
 * Each lesson has 20 words + exercises.
 * This file is deterministic content.
 */

import type { VocabLesson, VocabWord, VocabExercise } from "@/domain/study-roadmap";

// ─── Helpers ─────────────────────────────────────────────────────

function word(
  id: string, w: string, phonetic: string,
  pos: VocabWord["pos"], meaningVi: string,
  exEn: string, exVi: string,
  topic: string, collocations: string[],
  wordFamily?: VocabWord["wordFamily"],
): VocabWord {
  return { id, word: w, phonetic, pos, meaningVi, exampleEn: exEn, exampleVi: exVi, topic, collocations, wordFamily };
}

function vq(
  id: string, type: VocabExercise["type"], prompt: string,
  answers: readonly [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanationVi: string, targetWordId: string,
  difficulty: 1 | 2 | 3 = 1,
): VocabExercise {
  const ids = ["A", "B", "C", "D"] as const;
  return {
    id, type, prompt,
    options: answers.map((text, i) => ({ id: ids[i], text })),
    correctOptionId: ids[correctIndex],
    explanationVi, targetWordId, difficulty,
  };
}

// ═══════════════════════════════════════════════════════════════════
// LESSON V1: General Business
// ═══════════════════════════════════════════════════════════════════

const v1Words: VocabWord[] = [
  word("vw-company", "company", "/ˈkʌm.pə.ni/", "noun", "công ty", "The company has offices in five countries.", "Công ty có văn phòng ở năm quốc gia.", "business", ["run a company", "company policy", "founding company"]),
  word("vw-manager", "manager", "/ˈmæn.ɪ.dʒər/", "noun", "quản lý, giám đốc", "The manager approved the budget.", "Quản lý đã phê duyệt ngân sách.", "business", ["project manager", "regional manager", "sales manager"], { noun: "management", verb: "manage", adjective: "managerial" }),
  word("vw-employee", "employee", "/ɪmˈplɔɪ.iː/", "noun", "nhân viên", "All employees must attend the training.", "Tất cả nhân viên phải tham gia đào tạo.", "business", ["full-time employee", "new employee", "employee benefits"], { noun: "employer/employment", verb: "employ" }),
  word("vw-department", "department", "/dɪˈpɑːrt.mənt/", "noun", "phòng ban, bộ phận", "She works in the marketing department.", "Cô ấy làm việc ở phòng marketing.", "business", ["department head", "sales department", "HR department"]),
  word("vw-budget", "budget", "/ˈbʌdʒ.ɪt/", "noun", "ngân sách", "We need to review the annual budget.", "Chúng ta cần xem xét ngân sách hàng năm.", "business", ["annual budget", "budget proposal", "within budget"]),
  word("vw-schedule", "schedule", "/ˈskedʒ.uːl/", "noun", "lịch trình", "The meeting is on schedule.", "Cuộc họp đúng lịch.", "business", ["on schedule", "ahead of schedule", "behind schedule"], { verb: "schedule" }),
  word("vw-deadline", "deadline", "/ˈded.laɪn/", "noun", "hạn chót", "The deadline for the report is Friday.", "Hạn chót cho báo cáo là thứ Sáu.", "business", ["meet the deadline", "miss the deadline", "extend the deadline"]),
  word("vw-proposal", "proposal", "/prəˈpoʊ.zəl/", "noun", "đề xuất", "The committee reviewed the proposal.", "Ủy ban đã xem xét đề xuất.", "business", ["submit a proposal", "business proposal", "budget proposal"], { verb: "propose" }),
  word("vw-annual", "annual", "/ˈæn.ju.əl/", "adjective", "hàng năm", "The annual report was released today.", "Báo cáo hàng năm được phát hành hôm nay.", "business", ["annual report", "annual meeting", "annual revenue"], { adverb: "annually" }),
  word("vw-available", "available", "/əˈveɪ.lə.bəl/", "adjective", "có sẵn, có thể sử dụng", "The room is available for booking.", "Phòng có sẵn để đặt.", "business", ["readily available", "make available", "currently available"], { noun: "availability" }),
  word("vw-confirm", "confirm", "/kənˈfɜːrm/", "verb", "xác nhận", "Please confirm your attendance.", "Vui lòng xác nhận sự tham dự.", "business", ["confirm a reservation", "confirm receipt", "confirm the date"], { noun: "confirmation" }),
  word("vw-approve", "approve", "/əˈpruːv/", "verb", "phê duyệt", "The board approved the new plan.", "Ban giám đốc phê duyệt kế hoạch mới.", "business", ["approve a request", "approve the budget"], { noun: "approval" }),
  word("vw-submit", "submit", "/səbˈmɪt/", "verb", "nộp, đệ trình", "Submit the form before Friday.", "Nộp biểu mẫu trước thứ Sáu.", "business", ["submit a report", "submit an application"], { noun: "submission" }),
  word("vw-attend", "attend", "/əˈtend/", "verb", "tham dự", "All staff must attend the meeting.", "Tất cả nhân viên phải tham dự cuộc họp.", "business", ["attend a meeting", "attend a conference"], { noun: "attendance/attendee" }),
  word("vw-discuss", "discuss", "/dɪˈskʌs/", "verb", "thảo luận", "We need to discuss the new policy.", "Chúng ta cần thảo luận chính sách mới.", "business", ["discuss the issue", "discuss options"], { noun: "discussion" }),
  word("vw-require", "require", "/rɪˈkwaɪr/", "verb", "yêu cầu", "This position requires experience.", "Vị trí này yêu cầu kinh nghiệm.", "business", ["require approval", "require training"], { noun: "requirement" }),
  word("vw-increase", "increase", "/ɪnˈkriːs/", "verb", "tăng", "Sales increased by 15% this quarter.", "Doanh số tăng 15% trong quý này.", "business", ["increase significantly", "increase by", "increase in"], { noun: "increase" }),
  word("vw-professional", "professional", "/prəˈfeʃ.ən.əl/", "adjective", "chuyên nghiệp", "She has a professional attitude.", "Cô ấy có thái độ chuyên nghiệp.", "business", ["professional development", "professional experience"], { noun: "profession/professional", adverb: "professionally" }),
  word("vw-effective", "effective", "/ɪˈfek.tɪv/", "adjective", "hiệu quả", "The new strategy is very effective.", "Chiến lược mới rất hiệu quả.", "business", ["cost-effective", "effective immediately"], { noun: "effectiveness", adverb: "effectively" }),
  word("vw-immediately", "immediately", "/ɪˈmiː.di.ət.li/", "adverb", "ngay lập tức", "Please respond immediately.", "Vui lòng phản hồi ngay lập tức.", "business", ["effective immediately", "respond immediately"], { adjective: "immediate" }),
];

const v1Exercises: VocabExercise[] = [
  vq("v1e-001", "meaning_match", "\"deadline\" nghĩa là gì?", ["ngân sách", "hạn chót", "đề xuất", "lịch trình"], 1, "Deadline = hạn chót, thời hạn cuối cùng.", "vw-deadline"),
  vq("v1e-002", "meaning_match", "\"employee\" nghĩa là gì?", ["nhân viên", "quản lý", "công ty", "phòng ban"], 0, "Employee = nhân viên, người lao động.", "vw-employee"),
  vq("v1e-003", "meaning_match", "\"approve\" nghĩa là gì?", ["xác nhận", "nộp", "phê duyệt", "thảo luận"], 2, "Approve = phê duyệt, chấp thuận.", "vw-approve"),
  vq("v1e-004", "meaning_match", "\"schedule\" nghĩa là gì?", ["ngân sách", "cuộc họp", "hạn chót", "lịch trình"], 3, "Schedule = lịch trình, lịch làm việc.", "vw-schedule"),
  vq("v1e-005", "meaning_match", "\"require\" nghĩa là gì?", ["tham dự", "yêu cầu", "tăng", "thảo luận"], 1, "Require = yêu cầu, đòi hỏi.", "vw-require"),
  vq("v1e-006", "meaning_match", "\"effective\" nghĩa là gì?", ["hàng năm", "chuyên nghiệp", "hiệu quả", "có sẵn"], 2, "Effective = hiệu quả, có hiệu lực.", "vw-effective"),
  vq("v1e-007", "meaning_match", "\"annual\" nghĩa là gì?", ["hàng ngày", "hàng tuần", "hàng tháng", "hàng năm"], 3, "Annual = hàng năm, thường niên.", "vw-annual"),
  vq("v1e-008", "meaning_match", "\"immediately\" nghĩa là gì?", ["ngay lập tức", "dần dần", "cuối cùng", "đôi khi"], 0, "Immediately = ngay lập tức, tức khắc.", "vw-immediately"),
  vq("v1e-009", "sentence_completion", "All staff members must _____ the safety training.", ["submit", "attend", "approve", "increase"], 1, "Attend = tham dự. Attend the training = tham dự khóa đào tạo.", "vw-attend"),
  vq("v1e-010", "sentence_completion", "The project is ahead of _____.", ["budget", "deadline", "schedule", "proposal"], 2, "Ahead of schedule = trước lịch trình. Collocation phổ biến.", "vw-schedule"),
  vq("v1e-011", "sentence_completion", "Please _____ the application form before Friday.", ["discuss", "increase", "submit", "confirm"], 2, "Submit = nộp. Submit the form = nộp biểu mẫu.", "vw-submit"),
  vq("v1e-012", "sentence_completion", "The _____ head will make the final decision.", ["schedule", "budget", "department", "deadline"], 2, "Department head = trưởng phòng. Collocation phổ biến.", "vw-department"),
];

export const vocabLesson1: VocabLesson = {
  id: "s1-vocab-01",
  stage: "foundation",
  order: 12,
  titleVi: "Từ vựng: Kinh doanh chung",
  titleEn: "Vocabulary: General Business",
  category: "vocabulary",
  topic: "general-business",
  words: v1Words,
  exercises: v1Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// LESSON V2: Office & Workplace
// ═══════════════════════════════════════════════════════════════════

const v2Words: VocabWord[] = [
  word("vw-office", "office", "/ˈɑː.fɪs/", "noun", "văn phòng", "The office is on the third floor.", "Văn phòng ở tầng 3.", "office", ["head office", "office supplies", "office hours"]),
  word("vw-colleague", "colleague", "/ˈkɑː.liːɡ/", "noun", "đồng nghiệp", "She discussed the plan with her colleagues.", "Cô ấy thảo luận kế hoạch với đồng nghiệp.", "office", ["work colleague", "former colleague"]),
  word("vw-document", "document", "/ˈdɑː.kjə.mənt/", "noun", "tài liệu", "Please sign the document.", "Vui lòng ký tài liệu.", "office", ["official document", "sign a document", "submit documents"], { noun: "documentation" }),
  word("vw-equipment", "equipment", "/ɪˈkwɪp.mənt/", "noun", "thiết bị (không đếm được)", "New equipment has been installed.", "Thiết bị mới đã được lắp đặt.", "office", ["office equipment", "install equipment"], { verb: "equip" }),
  word("vw-supply", "supply", "/səˈplaɪ/", "noun", "vật tư, đồ dùng", "We need to order more office supplies.", "Chúng ta cần đặt thêm đồ dùng văn phòng.", "office", ["office supplies", "supply chain", "supply and demand"], { verb: "supply", noun: "supplier" }),
  word("vw-maintenance", "maintenance", "/ˈmeɪn.tən.əns/", "noun", "bảo trì", "The building requires regular maintenance.", "Tòa nhà cần bảo trì thường xuyên.", "office", ["regular maintenance", "maintenance work"], { verb: "maintain" }),
  word("vw-reception", "reception", "/rɪˈsep.ʃən/", "noun", "lễ tân, quầy tiếp tân", "Please check in at the reception.", "Vui lòng đăng ký tại quầy lễ tân.", "office", ["reception desk", "reception area"], { noun: "receptionist" }),
  word("vw-facility", "facility", "/fəˈsɪl.ə.ti/", "noun", "cơ sở vật chất", "The new facility will open next month.", "Cơ sở mới sẽ mở cửa vào tháng tới.", "office", ["manufacturing facility", "sports facility", "facility management"]),
  word("vw-organize", "organize", "/ˈɔːr.ɡə.naɪz/", "verb", "tổ chức, sắp xếp", "She organized the team-building event.", "Cô ấy tổ chức sự kiện xây dựng đội nhóm.", "office", ["organize an event", "well-organized"], { noun: "organization/organizer", adjective: "organizational" }),
  word("vw-update", "update", "/ʌpˈdeɪt/", "verb", "cập nhật", "Please update the client database.", "Vui lòng cập nhật cơ sở dữ liệu khách hàng.", "office", ["update information", "software update"], { noun: "update" }),
  word("vw-distribute", "distribute", "/dɪˈstrɪb.juːt/", "verb", "phân phát, phân phối", "The manager distributed the agenda.", "Quản lý phân phát chương trình nghị sự.", "office", ["distribute materials", "distribute copies"], { noun: "distribution" }),
  word("vw-photocopy", "photocopy", "/ˈfoʊ.t̬oʊˌkɑː.pi/", "noun", "bản sao, photo", "Please make five photocopies of the report.", "Vui lòng photo năm bản báo cáo.", "office", ["make photocopies", "photocopy machine"]),
  word("vw-folder", "folder", "/ˈfoʊl.dər/", "noun", "thư mục, cặp tài liệu", "Put the files in the blue folder.", "Đặt các file vào cặp xanh.", "office", ["file folder", "project folder"]),
  word("vw-assign", "assign", "/əˈsaɪn/", "verb", "giao, phân công", "The task was assigned to Mr. Lee.", "Nhiệm vụ được giao cho ông Lee.", "office", ["assign a task", "assign responsibilities"], { noun: "assignment" }),
  word("vw-complete", "complete", "/kəmˈpliːt/", "verb", "hoàn thành", "She completed the project on time.", "Cô ấy hoàn thành dự án đúng hạn.", "office", ["complete a task", "complete a form"], { noun: "completion", adjective: "complete" }),
  word("vw-notify", "notify", "/ˈnoʊ.t̬ə.faɪ/", "verb", "thông báo", "We will notify you of the results.", "Chúng tôi sẽ thông báo kết quả cho bạn.", "office", ["notify customers", "notify in advance"], { noun: "notification" }),
  word("vw-relocate", "relocate", "/ˌriː.loʊˈkeɪt/", "verb", "di dời, chuyển địa điểm", "The company relocated to a bigger office.", "Công ty đã chuyển đến văn phòng lớn hơn.", "office", ["relocate to", "plan to relocate"], { noun: "relocation" }),
  word("vw-essential", "essential", "/ɪˈsen.ʃəl/", "adjective", "thiết yếu, cần thiết", "Good communication is essential.", "Giao tiếp tốt là điều thiết yếu.", "office", ["essential skills", "essential information"], { adverb: "essentially" }),
  word("vw-temporary", "temporary", "/ˈtem.pə.rer.i/", "adjective", "tạm thời", "She has a temporary contract.", "Cô ấy có hợp đồng tạm thời.", "office", ["temporary position", "temporary closure"], { adverb: "temporarily" }),
  word("vw-efficiently", "efficiently", "/ɪˈfɪʃ.ənt.li/", "adverb", "hiệu quả, năng suất", "The team worked efficiently.", "Đội làm việc hiệu quả.", "office", ["work efficiently", "operate efficiently"], { adjective: "efficient", noun: "efficiency" }),
];

const v2Exercises: VocabExercise[] = [
  vq("v2e-001", "meaning_match", "\"colleague\" nghĩa là gì?", ["quản lý", "khách hàng", "đồng nghiệp", "nhân viên"], 2, "Colleague = đồng nghiệp.", "vw-colleague"),
  vq("v2e-002", "meaning_match", "\"equipment\" nghĩa là gì?", ["tài liệu", "thiết bị", "vật tư", "cơ sở"], 1, "Equipment = thiết bị (không đếm được).", "vw-equipment"),
  vq("v2e-003", "meaning_match", "\"maintenance\" nghĩa là gì?", ["bảo trì", "tổ chức", "phân phối", "chuyển địa điểm"], 0, "Maintenance = bảo trì, duy tu.", "vw-maintenance"),
  vq("v2e-004", "meaning_match", "\"temporary\" nghĩa là gì?", ["thiết yếu", "tạm thời", "hiệu quả", "chuyên nghiệp"], 1, "Temporary = tạm thời.", "vw-temporary"),
  vq("v2e-005", "meaning_match", "\"assign\" nghĩa là gì?", ["hoàn thành", "thông báo", "giao nhiệm vụ", "cập nhật"], 2, "Assign = giao, phân công.", "vw-assign"),
  vq("v2e-006", "meaning_match", "\"facility\" nghĩa là gì?", ["văn phòng", "cơ sở vật chất", "quầy lễ tân", "thư mục"], 1, "Facility = cơ sở vật chất, tiện ích.", "vw-facility"),
  vq("v2e-007", "meaning_match", "\"distribute\" nghĩa là gì?", ["tổ chức", "phân phát", "di dời", "giao việc"], 1, "Distribute = phân phát, phân phối.", "vw-distribute"),
  vq("v2e-008", "meaning_match", "\"essential\" nghĩa là gì?", ["tạm thời", "chuyên nghiệp", "thiết yếu", "hiệu quả"], 2, "Essential = thiết yếu, cần thiết.", "vw-essential"),
  vq("v2e-009", "sentence_completion", "The building requires regular _____ to keep it in good condition.", ["equipment", "maintenance", "reception", "supply"], 1, "Regular maintenance = bảo trì thường xuyên.", "vw-maintenance"),
  vq("v2e-010", "sentence_completion", "The company _____ to a bigger office downtown.", ["relocated", "organized", "assigned", "distributed"], 0, "Relocated = chuyển địa điểm đến.", "vw-relocate"),
  vq("v2e-011", "sentence_completion", "Please make five _____ of this document.", ["folders", "supplies", "photocopies", "facilities"], 2, "Photocopies = bản sao. Make photocopies = photo tài liệu.", "vw-photocopy"),
  vq("v2e-012", "sentence_completion", "The new task was _____ to the marketing team.", ["assigned", "completed", "notified", "updated"], 0, "Assigned = được giao. Assign a task to = giao nhiệm vụ cho.", "vw-assign"),
];

export const vocabLesson2: VocabLesson = {
  id: "s1-vocab-02",
  stage: "foundation",
  order: 13,
  titleVi: "Từ vựng: Văn phòng & Nơi làm việc",
  titleEn: "Vocabulary: Office & Workplace",
  category: "vocabulary",
  topic: "office-workplace",
  words: v2Words,
  exercises: v2Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// LESSON V3: Meetings & Events
// ═══════════════════════════════════════════════════════════════════

const v3Words: VocabWord[] = [
  word("vw-meeting", "meeting", "/ˈmiː.t̬ɪŋ/", "noun", "cuộc họp", "The meeting starts at 10 AM.", "Cuộc họp bắt đầu lúc 10 giờ.", "meetings", ["attend a meeting", "hold a meeting", "cancel a meeting"]),
  word("vw-conference", "conference", "/ˈkɑːn.fɚ.əns/", "noun", "hội nghị", "The annual conference was a success.", "Hội nghị thường niên rất thành công.", "meetings", ["conference room", "annual conference", "attend a conference"]),
  word("vw-agenda", "agenda", "/əˈdʒen.də/", "noun", "chương trình nghị sự", "The agenda includes three topics.", "Chương trình nghị sự bao gồm ba chủ đề.", "meetings", ["meeting agenda", "on the agenda", "set the agenda"]),
  word("vw-presentation", "presentation", "/ˌprez.ənˈteɪ.ʃən/", "noun", "bài thuyết trình", "She gave an excellent presentation.", "Cô ấy trình bày bài thuyết trình xuất sắc.", "meetings", ["give a presentation", "prepare a presentation"], { verb: "present", noun: "presenter" }),
  word("vw-workshop", "workshop", "/ˈwɜːrk.ʃɑːp/", "noun", "hội thảo thực hành", "The workshop focuses on leadership skills.", "Hội thảo tập trung vào kỹ năng lãnh đạo.", "meetings", ["attend a workshop", "training workshop"]),
  word("vw-seminar", "seminar", "/ˈsem.ə.nɑːr/", "noun", "buổi hội thảo", "The seminar will cover time management.", "Hội thảo sẽ bao gồm quản lý thời gian.", "meetings", ["attend a seminar", "online seminar"]),
  word("vw-postpone", "postpone", "/poʊstˈpoʊn/", "verb", "hoãn, dời lại", "We had to postpone the meeting.", "Chúng tôi phải hoãn cuộc họp.", "meetings", ["postpone a meeting", "postpone indefinitely"], { noun: "postponement" }),
  word("vw-cancel", "cancel", "/ˈkæn.səl/", "verb", "hủy bỏ", "The event was canceled due to rain.", "Sự kiện bị hủy do mưa.", "meetings", ["cancel an event", "cancel a reservation"], { noun: "cancellation" }),
  word("vw-reschedule", "reschedule", "/ˌriːˈskedʒ.uːl/", "verb", "dời lịch", "Can we reschedule for Thursday?", "Chúng ta có thể dời lịch sang thứ Năm không?", "meetings", ["reschedule an appointment", "reschedule the meeting"]),
  word("vw-registration", "registration", "/ˌredʒ.əˈstreɪ.ʃən/", "noun", "đăng ký", "Registration closes next week.", "Hạn đăng ký đóng tuần tới.", "meetings", ["online registration", "registration form", "registration fee"], { verb: "register" }),
  word("vw-participate", "participate", "/pɑːrˈtɪs.ə.peɪt/", "verb", "tham gia", "Over 200 people participated in the event.", "Hơn 200 người tham gia sự kiện.", "meetings", ["participate in", "actively participate"], { noun: "participant/participation" }),
  word("vw-arrange", "arrange", "/əˈreɪndʒ/", "verb", "sắp xếp, thu xếp", "He arranged a meeting with the client.", "Anh ấy sắp xếp cuộc họp với khách hàng.", "meetings", ["arrange a meeting", "arrange transportation"], { noun: "arrangement" }),
  word("vw-venue", "venue", "/ˈven.juː/", "noun", "địa điểm tổ chức", "The venue can accommodate 500 people.", "Địa điểm có thể chứa 500 người.", "meetings", ["event venue", "change of venue", "suitable venue"]),
  word("vw-invitation", "invitation", "/ˌɪn.vəˈteɪ.ʃən/", "noun", "lời mời", "She received an invitation to the gala.", "Cô ấy nhận được lời mời đến dạ tiệc.", "meetings", ["accept an invitation", "send an invitation"], { verb: "invite" }),
  word("vw-keynote", "keynote", "/ˈkiː.noʊt/", "noun", "bài phát biểu chính", "The CEO delivered the keynote speech.", "CEO phát biểu bài diễn văn chính.", "meetings", ["keynote speaker", "keynote address"]),
  word("vw-delegate", "delegate", "/ˈdel.ə.ɡət/", "noun", "đại biểu", "All delegates received a welcome pack.", "Tất cả đại biểu nhận túi quà chào mừng.", "meetings", ["conference delegate", "delegate from"], { verb: "delegate", noun: "delegation" }),
  word("vw-announce", "announce", "/əˈnaʊns/", "verb", "thông báo, công bố", "The results will be announced tomorrow.", "Kết quả sẽ được công bố vào ngày mai.", "meetings", ["announce the results", "announce a decision"], { noun: "announcement" }),
  word("vw-upcoming", "upcoming", "/ˈʌp.kʌm.ɪŋ/", "adjective", "sắp tới", "The upcoming conference is in Seoul.", "Hội nghị sắp tới ở Seoul.", "meetings", ["upcoming event", "upcoming meeting"]),
  word("vw-complimentary", "complimentary", "/ˌkɑːm.plɪˈmen.t̬ɚ.i/", "adjective", "miễn phí, khen ngợi", "Complimentary refreshments will be served.", "Đồ giải khát miễn phí sẽ được phục vụ.", "meetings", ["complimentary ticket", "complimentary breakfast"]),
  word("vw-promptly", "promptly", "/ˈprɑːmpt.li/", "adverb", "đúng giờ, kịp thời", "The meeting will begin promptly at 9 AM.", "Cuộc họp sẽ bắt đầu đúng 9 giờ.", "meetings", ["begin promptly", "respond promptly"], { adjective: "prompt" }),
];

const v3Exercises: VocabExercise[] = [
  vq("v3e-001", "meaning_match", "\"agenda\" nghĩa là gì?", ["hội nghị", "chương trình nghị sự", "hội thảo", "bài thuyết trình"], 1, "Agenda = chương trình nghị sự.", "vw-agenda"),
  vq("v3e-002", "meaning_match", "\"postpone\" nghĩa là gì?", ["hủy bỏ", "hoãn lại", "dời lịch", "tổ chức"], 1, "Postpone = hoãn, dời lại (chưa xác định thời gian mới).", "vw-postpone"),
  vq("v3e-003", "meaning_match", "\"venue\" nghĩa là gì?", ["đại biểu", "địa điểm tổ chức", "lời mời", "đăng ký"], 1, "Venue = địa điểm tổ chức sự kiện.", "vw-venue"),
  vq("v3e-004", "meaning_match", "\"complimentary\" nghĩa là gì?", ["bổ sung", "miễn phí", "sắp tới", "kịp thời"], 1, "Complimentary = miễn phí (hoặc khen ngợi).", "vw-complimentary"),
  vq("v3e-005", "meaning_match", "\"registration\" nghĩa là gì?", ["thông báo", "sắp xếp", "đăng ký", "tham gia"], 2, "Registration = sự đăng ký.", "vw-registration"),
  vq("v3e-006", "meaning_match", "\"keynote\" nghĩa là gì?", ["bài phát biểu chính", "đại biểu", "chương trình", "hội thảo"], 0, "Keynote = bài phát biểu chính, điểm then chốt.", "vw-keynote"),
  vq("v3e-007", "meaning_match", "\"upcoming\" nghĩa là gì?", ["đã qua", "hiện tại", "sắp tới", "hàng năm"], 2, "Upcoming = sắp tới, sắp diễn ra.", "vw-upcoming"),
  vq("v3e-008", "meaning_match", "\"participate\" nghĩa là gì?", ["tổ chức", "tham gia", "công bố", "hoãn"], 1, "Participate = tham gia, tham dự.", "vw-participate"),
  vq("v3e-009", "sentence_completion", "The _____ for the conference was changed to a larger hall.", ["agenda", "venue", "delegate", "keynote"], 1, "Venue = địa điểm tổ chức. Change the venue = đổi địa điểm.", "vw-venue"),
  vq("v3e-010", "sentence_completion", "We had to _____ the meeting because the speaker was ill.", ["postpone", "arrange", "participate", "announce"], 0, "Postpone = hoãn. Postpone the meeting = hoãn cuộc họp.", "vw-postpone"),
  vq("v3e-011", "sentence_completion", "The meeting will begin _____ at 2 PM.", ["complimentary", "upcoming", "promptly", "annual"], 2, "Promptly = đúng giờ. Begin promptly at = bắt đầu đúng lúc.", "vw-promptly"),
  vq("v3e-012", "sentence_completion", "Online _____ for the workshop closes on Friday.", ["registration", "presentation", "invitation", "arrangement"], 0, "Registration = đăng ký. Online registration = đăng ký trực tuyến.", "vw-registration"),
];

export const vocabLesson3: VocabLesson = {
  id: "s1-vocab-03",
  stage: "foundation",
  order: 14,
  titleVi: "Từ vựng: Họp hành & Sự kiện",
  titleEn: "Vocabulary: Meetings & Events",
  category: "vocabulary",
  topic: "meetings-events",
  words: v3Words,
  exercises: v3Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// Export all Stage 1 Vocabulary
// ═══════════════════════════════════════════════════════════════════

// Note: Lessons V4-V12 follow the same pattern with different topics:
// V4: Travel & Transport, V5: Shopping & Services
// V6: Finance & Banking, V7: Technology & IT, V8: Health & Fitness
// V9: Housing & Property, V10: Dining & Entertainment
// V11: Weather & Environment, V12: Education & Training
// These will be generated using Ollama local for example sentences
// and manually reviewed for accuracy.

import { stage1ExpansionVocabLessons } from "./stage1-vocab-expansion.ts";

export const stage1VocabLessons: VocabLesson[] = [
  vocabLesson1,
  vocabLesson2,
  vocabLesson3,
  ...stage1ExpansionVocabLessons,
];

export const STAGE1_VOCAB_WORD_COUNT = stage1VocabLessons.reduce((sum, l) => sum + l.words.length, 0);
export const STAGE1_VOCAB_EXERCISE_COUNT = stage1VocabLessons.reduce((sum, l) => sum + l.exercises.length, 0);
