/**
 * TOEIC 650 source of truth.
 *
 * Intended repository path: src/data/toeic650-source-data.ts
 * This file is deterministic content. AI may explain or create extra practice,
 * but it must not silently overwrite these approved answers.
 */

import { expandedPhrases, expandedVerbs } from "./toeic650-expansion-data.ts";

export type ToeicPart = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type CefrLevel = "A2" | "B1" | "B2";
export type ContentPriority = 1 | 2 | 3;
export type Topic =
  | "office"
  | "meetings"
  | "human-resources"
  | "travel"
  | "customer-service"
  | "purchasing"
  | "finance"
  | "shipping"
  | "facilities"
  | "marketing"
  | "technology"
  | "events";

export type BilingualExample = {
  en: string;
  vi: string;
};

export type VerbItem = {
  id: string;
  lemma: string;
  forms: {
    past: string;
    pastParticiple: string;
    thirdPerson: string;
    ing: string;
  };
  meaningVi: string[];
  patterns: string[];
  collocations: string[];
  examples: BilingualExample[];
  commonErrorVi?: string;
  topic: Topic;
  toeicParts: ToeicPart[];
  cefr: CefrLevel;
  priority: ContentPriority;
};

export type TenseItem = {
  id: string;
  nameEn: string;
  nameVi: string;
  timeline: "past" | "present" | "future";
  formula: {
    affirmative: string;
    negative: string;
    question: string;
  };
  decisionRuleVi: string;
  usesVi: string[];
  signals: string[];
  examples: BilingualExample[];
  contrastWith: string[];
  commonErrorsVi: string[];
  toeicParts: ToeicPart[];
  priority: ContentPriority;
};

export type PhraseItem = {
  id: string;
  phrase: string;
  meaningVi: string;
  pattern?: string;
  examples: BilingualExample[];
  topic: Topic;
  toeicParts: ToeicPart[];
  cefr: CefrLevel;
  priority: ContentPriority;
};

const v = (
  id: string,
  lemma: string,
  past: string,
  pastParticiple: string,
  thirdPerson: string,
  ing: string,
  meaningVi: string[],
  patterns: string[],
  collocations: string[],
  example: BilingualExample,
  topic: Topic,
  toeicParts: ToeicPart[],
  cefr: CefrLevel = "B1",
  priority: ContentPriority = 1,
  commonErrorVi?: string,
): VerbItem => ({
  id,
  lemma,
  forms: { past, pastParticiple, thirdPerson, ing },
  meaningVi,
  patterns,
  collocations,
  examples: [example],
  commonErrorVi,
  topic,
  toeicParts,
  cefr,
  priority,
});

const p = (
  id: string,
  phrase: string,
  meaningVi: string,
  example: BilingualExample,
  topic: Topic,
  toeicParts: ToeicPart[],
  pattern?: string,
  cefr: CefrLevel = "B1",
  priority: ContentPriority = 1,
): PhraseItem => ({ id, phrase, meaningVi, pattern, examples: [example], topic, toeicParts, cefr, priority });

const starterVerbs: VerbItem[] = [
  v("verb-attend", "attend", "attended", "attended", "attends", "attending", ["tham dự"], ["attend + event/meeting"], ["attend a meeting", "attend a conference"], { en: "All department heads must attend the meeting.", vi: "Tất cả trưởng bộ phận phải tham dự cuộc họp." }, "meetings", [3, 5, 6]),
  v("verb-arrange", "arrange", "arranged", "arranged", "arranges", "arranging", ["sắp xếp", "thu xếp"], ["arrange + noun", "arrange to + V", "arrange for + person + to V"], ["arrange transportation", "arrange an interview"], { en: "We arranged for a technician to inspect the printer.", vi: "Chúng tôi đã thu xếp để kỹ thuật viên kiểm tra máy in." }, "office", [3, 4, 5, 6]),
  v("verb-schedule", "schedule", "scheduled", "scheduled", "schedules", "scheduling", ["lên lịch"], ["schedule + noun", "be scheduled to + V"], ["schedule an appointment", "schedule a delivery"], { en: "The interview is scheduled to begin at nine.", vi: "Buổi phỏng vấn được lên lịch bắt đầu lúc chín giờ." }, "meetings", [2, 3, 4, 5, 6]),
  v("verb-postpone", "postpone", "postponed", "postponed", "postpones", "postponing", ["hoãn"], ["postpone + noun", "postpone + V-ing"], ["postpone a meeting", "postpone making a decision"], { en: "The outdoor event was postponed because of heavy rain.", vi: "Sự kiện ngoài trời đã bị hoãn vì mưa lớn." }, "events", [3, 4, 5, 6]),
  v("verb-reschedule", "reschedule", "rescheduled", "rescheduled", "reschedules", "rescheduling", ["đổi lịch"], ["reschedule + noun", "reschedule + noun + for + time"], ["reschedule an appointment", "reschedule the flight"], { en: "Could we reschedule the appointment for Thursday?", vi: "Chúng ta có thể đổi lịch hẹn sang thứ Năm không?" }, "meetings", [2, 3, 5]),
  v("verb-submit", "submit", "submitted", "submitted", "submits", "submitting", ["nộp", "đệ trình"], ["submit + noun", "submit + noun + to + person"], ["submit an application", "submit a report"], { en: "Please submit the expense report by Friday.", vi: "Vui lòng nộp báo cáo chi phí trước thứ Sáu." }, "office", [3, 5, 6, 7]),
  v("verb-approve", "approve", "approved", "approved", "approves", "approving", ["phê duyệt", "chấp thuận"], ["approve + noun", "approve of + noun/V-ing"], ["approve a budget", "approve a request"], { en: "The director approved the revised budget yesterday.", vi: "Giám đốc đã phê duyệt ngân sách sửa đổi hôm qua." }, "finance", [3, 5, 6, 7]),
  v("verb-confirm", "confirm", "confirmed", "confirmed", "confirms", "confirming", ["xác nhận"], ["confirm + noun", "confirm that + clause"], ["confirm a reservation", "confirm receipt"], { en: "Please confirm that you received the updated itinerary.", vi: "Vui lòng xác nhận rằng bạn đã nhận được lịch trình cập nhật." }, "office", [2, 3, 4, 5, 6]),
  v("verb-notify", "notify", "notified", "notified", "notifies", "notifying", ["thông báo"], ["notify + person + of/about + noun", "notify + person + that + clause"], ["notify customers", "notify employees of a change"], { en: "Passengers will be notified of any schedule changes.", vi: "Hành khách sẽ được thông báo về mọi thay đổi lịch trình." }, "travel", [3, 4, 5, 6, 7]),
  v("verb-remind", "remind", "reminded", "reminded", "reminds", "reminding", ["nhắc nhở"], ["remind + person + to V", "remind + person + of + noun"], ["remind employees", "remind someone of a deadline"], { en: "Please remind the team to complete the survey.", vi: "Vui lòng nhắc nhóm hoàn thành khảo sát." }, "office", [2, 3, 5, 6]),
  v("verb-provide", "provide", "provided", "provided", "provides", "providing", ["cung cấp"], ["provide + noun", "provide + person + with + noun"], ["provide information", "provide customers with support"], { en: "The hotel provides guests with free airport transportation.", vi: "Khách sạn cung cấp dịch vụ đưa đón sân bay miễn phí cho khách." }, "customer-service", [3, 4, 5, 6, 7]),
  v("verb-require", "require", "required", "required", "requires", "requiring", ["yêu cầu", "đòi hỏi"], ["require + noun", "require + person + to V", "be required to + V"], ["require approval", "require additional training"], { en: "All visitors are required to wear an identification badge.", vi: "Tất cả khách đến thăm được yêu cầu đeo thẻ nhận dạng." }, "office", [3, 4, 5, 6, 7]),
  v("verb-maintain", "maintain", "maintained", "maintained", "maintains", "maintaining", ["duy trì", "bảo trì"], ["maintain + noun"], ["maintain equipment", "maintain high standards"], { en: "The machines are maintained on a monthly basis.", vi: "Các máy móc được bảo trì hằng tháng." }, "facilities", [1, 3, 4, 5, 6]),
  v("verb-inspect", "inspect", "inspected", "inspected", "inspects", "inspecting", ["kiểm tra", "thanh tra"], ["inspect + noun", "be inspected for + noun"], ["inspect equipment", "inspect a building"], { en: "A safety officer will inspect the warehouse tomorrow.", vi: "Một nhân viên an toàn sẽ kiểm tra kho hàng vào ngày mai." }, "facilities", [1, 3, 4, 5, 6]),
  v("verb-repair", "repair", "repaired", "repaired", "repairs", "repairing", ["sửa chữa"], ["repair + object", "have + object + repaired"], ["repair a device", "repair damaged equipment"], { en: "The copier is being repaired this afternoon.", vi: "Máy photocopy đang được sửa vào chiều nay." }, "facilities", [1, 2, 3, 5, 6]),
  v("verb-replace", "replace", "replaced", "replaced", "replaces", "replacing", ["thay thế"], ["replace + A + with + B"], ["replace a battery", "replace old equipment"], { en: "The company replaced the old computers with faster models.", vi: "Công ty đã thay máy tính cũ bằng các mẫu nhanh hơn." }, "technology", [1, 3, 5, 6]),
  v("verb-install", "install", "installed", "installed", "installs", "installing", ["lắp đặt", "cài đặt"], ["install + object", "install + object + in/on + place"], ["install software", "install new lighting"], { en: "Technicians are installing the new software today.", vi: "Các kỹ thuật viên đang cài đặt phần mềm mới hôm nay." }, "technology", [1, 3, 4, 5, 6]),
  v("verb-update", "update", "updated", "updated", "updates", "updating", ["cập nhật"], ["update + noun", "update + person + on + noun"], ["update a file", "update customers on progress"], { en: "We will update you on the delivery status tomorrow.", vi: "Chúng tôi sẽ cập nhật cho bạn về tình trạng giao hàng vào ngày mai." }, "technology", [3, 4, 5, 6, 7]),
  v("verb-order", "order", "ordered", "ordered", "orders", "ordering", ["đặt hàng", "gọi món"], ["order + noun", "order + noun + from + supplier"], ["order office supplies", "order a meal"], { en: "We ordered additional chairs for the conference room.", vi: "Chúng tôi đã đặt thêm ghế cho phòng hội nghị." }, "purchasing", [2, 3, 5, 6, 7]),
  v("verb-purchase", "purchase", "purchased", "purchased", "purchases", "purchasing", ["mua"], ["purchase + noun", "purchase + noun + from + supplier"], ["purchase equipment", "purchase a ticket"], { en: "Tickets may be purchased online in advance.", vi: "Vé có thể được mua trực tuyến trước." }, "purchasing", [3, 4, 5, 6, 7]),
  v("verb-deliver", "deliver", "delivered", "delivered", "delivers", "delivering", ["giao", "chuyển phát"], ["deliver + noun", "deliver + noun + to + place/person"], ["deliver a package", "deliver a presentation"], { en: "The supplier will deliver the materials by noon.", vi: "Nhà cung cấp sẽ giao vật liệu trước buổi trưa." }, "shipping", [1, 3, 4, 5, 6, 7]),
  v("verb-ship", "ship", "shipped", "shipped", "ships", "shipping", ["vận chuyển", "gửi hàng"], ["ship + noun", "ship + noun + to + place"], ["ship an order", "ship goods overseas"], { en: "Your order was shipped from our warehouse yesterday.", vi: "Đơn hàng của bạn đã được gửi từ kho của chúng tôi hôm qua." }, "shipping", [3, 4, 5, 6, 7]),
  v("verb-reserve", "reserve", "reserved", "reserved", "reserves", "reserving", ["đặt trước", "dành riêng"], ["reserve + noun", "reserve + noun + for + person/time"], ["reserve a room", "reserve a seat"], { en: "I would like to reserve a table for four.", vi: "Tôi muốn đặt một bàn cho bốn người." }, "travel", [2, 3, 5, 6]),
  v("verb-accommodate", "accommodate", "accommodated", "accommodated", "accommodates", "accommodating", ["đáp ứng", "cung cấp chỗ cho"], ["accommodate + person/request", "accommodate up to + number"], ["accommodate guests", "accommodate a request"], { en: "The meeting room can accommodate up to fifty people.", vi: "Phòng họp có thể chứa tối đa năm mươi người." }, "events", [3, 4, 5, 6, 7], "B1", 2),
  v("verb-depart", "depart", "departed", "departed", "departs", "departing", ["khởi hành"], ["depart from + place", "depart at + time"], ["depart from platform six", "depart on time"], { en: "Flight 208 departs from Gate 12 at 6:30.", vi: "Chuyến bay 208 khởi hành từ Cổng 12 lúc 6 giờ 30." }, "travel", [2, 3, 4, 5, 7]),
  v("verb-arrive", "arrive", "arrived", "arrived", "arrives", "arriving", ["đến"], ["arrive at + small place", "arrive in + city/country"], ["arrive on time", "arrive at the station"], { en: "The train is expected to arrive on time.", vi: "Tàu dự kiến sẽ đến đúng giờ." }, "travel", [1, 2, 3, 4, 5]),
  v("verb-delay", "delay", "delayed", "delayed", "delays", "delaying", ["trì hoãn", "làm chậm"], ["delay + noun", "be delayed by/due to + noun"], ["delay a shipment", "be delayed due to weather"], { en: "Bad weather has delayed several flights.", vi: "Thời tiết xấu đã làm chậm một số chuyến bay." }, "travel", [3, 4, 5, 6, 7]),
  v("verb-apply", "apply", "applied", "applied", "applies", "applying", ["nộp đơn", "áp dụng"], ["apply for + position", "apply to + organization", "apply + rule + to + noun"], ["apply for a job", "apply for membership"], { en: "Applicants must apply for the position online.", vi: "Ứng viên phải nộp đơn cho vị trí này trực tuyến." }, "human-resources", [3, 5, 6, 7]),
  v("verb-hire", "hire", "hired", "hired", "hires", "hiring", ["tuyển dụng", "thuê"], ["hire + person", "hire + person + to V"], ["hire new staff", "hire a consultant"], { en: "The company plans to hire three software engineers.", vi: "Công ty dự định tuyển ba kỹ sư phần mềm." }, "human-resources", [3, 4, 5, 6, 7]),
  v("verb-train", "train", "trained", "trained", "trains", "training", ["đào tạo", "huấn luyện"], ["train + person", "train + person + to V", "be trained in + noun"], ["train new employees", "receive training"], { en: "New employees are trained to use the booking system.", vi: "Nhân viên mới được đào tạo để sử dụng hệ thống đặt chỗ." }, "human-resources", [3, 4, 5, 6]),
  v("verb-promote", "promote", "promoted", "promoted", "promotes", "promoting", ["thăng chức", "quảng bá"], ["promote + person + to + position", "promote + product/event"], ["promote an employee", "promote a new service"], { en: "Ms. Tran was promoted to regional manager.", vi: "Cô Trần đã được thăng chức lên quản lý khu vực." }, "human-resources", [3, 4, 5, 6, 7]),
  v("verb-increase", "increase", "increased", "increased", "increases", "increasing", ["tăng", "làm tăng"], ["increase by + amount", "increase to + final value", "increase + noun"], ["increase sales", "increase by ten percent"], { en: "Online sales increased by twelve percent last quarter.", vi: "Doanh số trực tuyến đã tăng mười hai phần trăm trong quý trước." }, "marketing", [3, 4, 5, 6, 7]),
  v("verb-decrease", "decrease", "decreased", "decreased", "decreases", "decreasing", ["giảm", "làm giảm"], ["decrease by + amount", "decrease to + final value", "decrease + noun"], ["decrease costs", "decrease significantly"], { en: "The new process has decreased production costs.", vi: "Quy trình mới đã làm giảm chi phí sản xuất." }, "finance", [3, 4, 5, 6, 7]),
  v("verb-launch", "launch", "launched", "launched", "launches", "launching", ["ra mắt", "khởi động"], ["launch + product/service/campaign"], ["launch a product", "launch an advertising campaign"], { en: "The company will launch its new mobile app in October.", vi: "Công ty sẽ ra mắt ứng dụng di động mới vào tháng Mười." }, "marketing", [3, 4, 5, 6, 7]),
  v("verb-recommend", "recommend", "recommended", "recommended", "recommends", "recommending", ["đề xuất", "khuyên dùng"], ["recommend + noun", "recommend + V-ing", "recommend that + S + base verb"], ["recommend a supplier", "recommend taking the train"], { en: "We recommend booking your room in advance.", vi: "Chúng tôi khuyên bạn nên đặt phòng trước." }, "customer-service", [2, 3, 5, 6, 7]),
  v("verb-apologize", "apologize", "apologized", "apologized", "apologizes", "apologizing", ["xin lỗi"], ["apologize to + person", "apologize for + noun/V-ing"], ["apologize for the delay", "sincerely apologize"], { en: "We apologize for any inconvenience caused by the closure.", vi: "Chúng tôi xin lỗi vì mọi bất tiện do việc đóng cửa gây ra." }, "customer-service", [2, 3, 4, 5, 6, 7]),
  v("verb-participate", "participate", "participated", "participated", "participates", "participating", ["tham gia"], ["participate in + event/activity"], ["participate in a survey", "participate in a workshop"], { en: "Employees are encouraged to participate in the workshop.", vi: "Nhân viên được khuyến khích tham gia hội thảo." }, "events", [3, 5, 6, 7]),
  v("verb-manufacture", "manufacture", "manufactured", "manufactured", "manufactures", "manufacturing", ["sản xuất"], ["manufacture + product", "be manufactured in/by + place/company"], ["manufacture electronic parts", "manufacturing facility"], { en: "These components are manufactured locally.", vi: "Các linh kiện này được sản xuất trong nước." }, "facilities", [1, 3, 4, 5, 6, 7], "B1", 2),
  v("verb-refund", "refund", "refunded", "refunded", "refunds", "refunding", ["hoàn tiền"], ["refund + amount", "refund + person + amount"], ["refund the full amount", "request a refund"], { en: "The store refunded the full purchase price.", vi: "Cửa hàng đã hoàn lại toàn bộ giá mua." }, "customer-service", [2, 3, 5, 6, 7]),
  v("verb-contact", "contact", "contacted", "contacted", "contacts", "contacting", ["liên hệ"], ["contact + person/department", "contact + person + about + noun"], ["contact customer service", "contact us by email"], { en: "Please contact customer service if the problem continues.", vi: "Vui lòng liên hệ bộ phận chăm sóc khách hàng nếu sự cố tiếp diễn." }, "customer-service", [2, 3, 4, 5, 6, 7]),
];

export const tenses: TenseItem[] = [
  {
    id: "tense-present-simple",
    nameEn: "Present Simple",
    nameVi: "Hiện tại đơn",
    timeline: "present",
    formula: { affirmative: "S + V(s/es)", negative: "S + do/does not + V", question: "Do/Does + S + V?" },
    decisionRuleVi: "Dùng khi hành động là thói quen, lịch cố định hoặc sự thật; không nhấn mạnh đang diễn ra ngay lúc nói.",
    usesVi: ["thói quen và quy trình", "sự thật", "lịch trình cố định"],
    signals: ["usually", "often", "every", "on Mondays", "always"],
    examples: [{ en: "The store opens at nine every weekday.", vi: "Cửa hàng mở cửa lúc chín giờ mỗi ngày trong tuần." }],
    contrastWith: ["tense-present-continuous"],
    commonErrorsVi: ["Quên thêm s/es với chủ ngữ số ít.", "Dùng does nhưng vẫn thêm s cho động từ chính."],
    toeicParts: [2, 3, 4, 5, 6, 7],
    priority: 1,
  },
  {
    id: "tense-present-continuous",
    nameEn: "Present Continuous",
    nameVi: "Hiện tại tiếp diễn",
    timeline: "present",
    formula: { affirmative: "S + am/is/are + V-ing", negative: "S + am/is/are not + V-ing", question: "Am/Is/Are + S + V-ing?" },
    decisionRuleVi: "Dùng khi hành động đang xảy ra hoặc là tình trạng tạm thời quanh hiện tại.",
    usesVi: ["hành động đang diễn ra", "kế hoạch gần đã sắp xếp", "tình trạng tạm thời"],
    signals: ["now", "currently", "at the moment", "this week"],
    examples: [{ en: "Technicians are installing new equipment in the lobby.", vi: "Các kỹ thuật viên đang lắp đặt thiết bị mới ở sảnh." }],
    contrastWith: ["tense-present-simple"],
    commonErrorsVi: ["Thiếu động từ be.", "Dùng với động từ trạng thái như know, own trong ngữ cảnh thông thường."],
    toeicParts: [1, 2, 3, 4, 5, 6],
    priority: 1,
  },
  {
    id: "tense-present-perfect",
    nameEn: "Present Perfect",
    nameVi: "Hiện tại hoàn thành",
    timeline: "present",
    formula: { affirmative: "S + have/has + V3", negative: "S + have/has not + V3", question: "Have/Has + S + V3?" },
    decisionRuleVi: "Dùng khi quá khứ có kết quả/liên hệ với hiện tại hoặc khoảng thời gian chưa kết thúc; không đi với mốc quá khứ đã kết thúc.",
    usesVi: ["kết quả hiện tại", "kinh nghiệm", "hành động bắt đầu trong quá khứ và còn đúng"],
    signals: ["already", "yet", "just", "since", "for", "recently", "so far"],
    examples: [{ en: "The company has opened three new branches this year.", vi: "Công ty đã mở ba chi nhánh mới trong năm nay." }],
    contrastWith: ["tense-past-simple", "tense-present-perfect-continuous"],
    commonErrorsVi: ["Dùng với yesterday/last week.", "Nhầm since + mốc thời gian với for + khoảng thời gian."],
    toeicParts: [3, 4, 5, 6, 7],
    priority: 1,
  },
  {
    id: "tense-present-perfect-continuous",
    nameEn: "Present Perfect Continuous",
    nameVi: "Hiện tại hoàn thành tiếp diễn",
    timeline: "present",
    formula: { affirmative: "S + have/has been + V-ing", negative: "S + have/has not been + V-ing", question: "Have/Has + S + been + V-ing?" },
    decisionRuleVi: "Dùng khi cần nhấn mạnh thời lượng hoặc quá trình kéo dài đến gần/đúng hiện tại.",
    usesVi: ["quá trình kéo dài đến hiện tại", "kết quả hiện tại do hoạt động vừa kéo dài"],
    signals: ["since", "for", "all morning", "lately", "recently"],
    examples: [{ en: "The team has been testing the new system for two weeks.", vi: "Nhóm đã kiểm thử hệ thống mới được hai tuần." }],
    contrastWith: ["tense-present-perfect"],
    commonErrorsVi: ["Dùng với động từ trạng thái.", "Dùng khi cần nhấn mạnh số lượng hoàn tất thay vì quá trình."],
    toeicParts: [3, 4, 5, 6, 7],
    priority: 2,
  },
  {
    id: "tense-past-simple",
    nameEn: "Past Simple",
    nameVi: "Quá khứ đơn",
    timeline: "past",
    formula: { affirmative: "S + V2/ed", negative: "S + did not + V", question: "Did + S + V?" },
    decisionRuleVi: "Dùng khi hành động đã kết thúc tại một thời điểm quá khứ xác định.",
    usesVi: ["sự kiện đã kết thúc", "chuỗi hành động quá khứ", "thói quen quá khứ"],
    signals: ["yesterday", "last", "ago", "in 2025", "when"],
    examples: [{ en: "The manager approved the request yesterday.", vi: "Quản lý đã phê duyệt yêu cầu hôm qua." }],
    contrastWith: ["tense-present-perfect", "tense-past-continuous"],
    commonErrorsVi: ["Sau did vẫn dùng V2.", "Dùng hiện tại hoàn thành với thời gian quá khứ đã kết thúc."],
    toeicParts: [2, 3, 4, 5, 6, 7],
    priority: 1,
  },
  {
    id: "tense-past-continuous",
    nameEn: "Past Continuous",
    nameVi: "Quá khứ tiếp diễn",
    timeline: "past",
    formula: { affirmative: "S + was/were + V-ing", negative: "S + was/were not + V-ing", question: "Was/Were + S + V-ing?" },
    decisionRuleVi: "Dùng cho hành động đang diễn ra tại một mốc quá khứ hoặc làm nền cho hành động khác xen vào.",
    usesVi: ["đang diễn ra tại mốc quá khứ", "hành động nền bị xen vào"],
    signals: ["while", "at that time", "when"],
    examples: [{ en: "I was speaking with a client when you called.", vi: "Tôi đang nói chuyện với khách hàng khi bạn gọi." }],
    contrastWith: ["tense-past-simple"],
    commonErrorsVi: ["Thiếu was/were.", "Không phân biệt hành động nền và hành động xen vào."],
    toeicParts: [1, 2, 3, 4, 5, 6],
    priority: 1,
  },
  {
    id: "tense-past-perfect",
    nameEn: "Past Perfect",
    nameVi: "Quá khứ hoàn thành",
    timeline: "past",
    formula: { affirmative: "S + had + V3", negative: "S + had not + V3", question: "Had + S + V3?" },
    decisionRuleVi: "Khi có hai mốc quá khứ, dùng thì này cho hành động xảy ra trước nếu thứ tự cần được làm rõ.",
    usesVi: ["hành động xảy ra trước một hành động quá khứ khác"],
    signals: ["before", "after", "by the time", "already"],
    examples: [{ en: "The train had left before we reached the station.", vi: "Tàu đã rời đi trước khi chúng tôi đến ga." }],
    contrastWith: ["tense-past-simple"],
    commonErrorsVi: ["Lạm dụng had cho mọi hành động quá khứ.", "Quên dùng V3."],
    toeicParts: [3, 4, 5, 6, 7],
    priority: 2,
  },
  {
    id: "tense-past-perfect-continuous",
    nameEn: "Past Perfect Continuous",
    nameVi: "Quá khứ hoàn thành tiếp diễn",
    timeline: "past",
    formula: { affirmative: "S + had been + V-ing", negative: "S + had not been + V-ing", question: "Had + S + been + V-ing?" },
    decisionRuleVi: "Dùng khi nhấn mạnh một quá trình đã kéo dài trước một mốc quá khứ khác.",
    usesVi: ["thời lượng của quá trình trước một mốc quá khứ"],
    signals: ["for", "since", "before", "when"],
    examples: [{ en: "They had been waiting for an hour when the bus arrived.", vi: "Họ đã chờ một giờ khi xe buýt đến." }],
    contrastWith: ["tense-past-perfect", "tense-past-continuous"],
    commonErrorsVi: ["Dùng cho động từ trạng thái.", "Không có mốc quá khứ làm điểm tham chiếu."],
    toeicParts: [3, 4, 5, 6, 7],
    priority: 3,
  },
  {
    id: "tense-future-simple",
    nameEn: "Future Simple",
    nameVi: "Tương lai đơn",
    timeline: "future",
    formula: { affirmative: "S + will + V", negative: "S + will not + V", question: "Will + S + V?" },
    decisionRuleVi: "Dùng cho dự đoán, quyết định tại lúc nói, lời hứa hoặc thông báo về tương lai.",
    usesVi: ["dự đoán", "quyết định tại lúc nói", "lời hứa và thông báo"],
    signals: ["tomorrow", "next", "soon", "probably"],
    examples: [{ en: "We will send the revised invoice tomorrow.", vi: "Chúng tôi sẽ gửi hóa đơn đã sửa vào ngày mai." }],
    contrastWith: ["tense-future-going-to", "tense-present-continuous"],
    commonErrorsVi: ["Thêm to hoặc chia động từ sau will.", "Dùng will cho một lịch trình cố định thay vì hiện tại đơn."],
    toeicParts: [2, 3, 4, 5, 6, 7],
    priority: 1,
  },
  {
    id: "tense-future-going-to",
    nameEn: "Be Going To",
    nameVi: "Tương lai gần với be going to",
    timeline: "future",
    formula: { affirmative: "S + am/is/are going to + V", negative: "S + am/is/are not going to + V", question: "Am/Is/Are + S + going to + V?" },
    decisionRuleVi: "Dùng cho ý định đã có hoặc dự đoán có bằng chứng hiện tại.",
    usesVi: ["kế hoạch/ý định", "dự đoán dựa trên dấu hiệu"],
    signals: ["plan", "intend", "look", "soon"],
    examples: [{ en: "The company is going to expand its warehouse.", vi: "Công ty sẽ mở rộng kho hàng." }],
    contrastWith: ["tense-future-simple", "tense-present-continuous"],
    commonErrorsVi: ["Thiếu động từ be.", "Dùng V-ing sau going to."],
    toeicParts: [2, 3, 4, 5, 6],
    priority: 1,
  },
  {
    id: "tense-future-continuous",
    nameEn: "Future Continuous",
    nameVi: "Tương lai tiếp diễn",
    timeline: "future",
    formula: { affirmative: "S + will be + V-ing", negative: "S + will not be + V-ing", question: "Will + S + be + V-ing?" },
    decisionRuleVi: "Dùng khi hành động sẽ đang diễn ra tại một mốc tương lai.",
    usesVi: ["đang diễn ra tại mốc tương lai", "hỏi lịch sự về kế hoạch"],
    signals: ["this time tomorrow", "at 10 A.M. tomorrow"],
    examples: [{ en: "This time tomorrow, we will be meeting with the client.", vi: "Giờ này ngày mai, chúng tôi sẽ đang họp với khách hàng." }],
    contrastWith: ["tense-future-simple"],
    commonErrorsVi: ["Thiếu be.", "Dùng V nguyên mẫu thay cho V-ing."],
    toeicParts: [2, 3, 4, 5, 6],
    priority: 2,
  },
  {
    id: "tense-future-perfect",
    nameEn: "Future Perfect",
    nameVi: "Tương lai hoàn thành",
    timeline: "future",
    formula: { affirmative: "S + will have + V3", negative: "S + will not have + V3", question: "Will + S + have + V3?" },
    decisionRuleVi: "Dùng khi hành động sẽ hoàn tất trước một hạn/mốc tương lai.",
    usesVi: ["hoàn tất trước hạn tương lai"],
    signals: ["by", "by the time", "before", "by the end of"],
    examples: [{ en: "The team will have completed the project by Friday.", vi: "Nhóm sẽ hoàn thành dự án trước thứ Sáu." }],
    contrastWith: ["tense-future-simple"],
    commonErrorsVi: ["Nhầm by với until.", "Quên dùng V3."],
    toeicParts: [3, 4, 5, 6, 7],
    priority: 2,
  },
];

const starterPhrases: PhraseItem[] = [
  p("phrase-responsible-for", "be responsible for", "chịu trách nhiệm về", { en: "Ms. Lee is responsible for training new staff.", vi: "Cô Lee chịu trách nhiệm đào tạo nhân viên mới." }, "human-resources", [3, 4, 5, 6, 7], "be responsible for + noun/V-ing"),
  p("phrase-in-charge-of", "be in charge of", "phụ trách", { en: "Who is in charge of the marketing campaign?", vi: "Ai phụ trách chiến dịch tiếp thị?" }, "marketing", [2, 3, 5, 6], "be in charge of + noun/V-ing"),
  p("phrase-look-forward-to", "look forward to", "mong chờ", { en: "We look forward to meeting you next week.", vi: "Chúng tôi mong được gặp bạn vào tuần tới." }, "office", [3, 5, 6, 7], "look forward to + noun/V-ing"),
  p("phrase-asap", "as soon as possible", "sớm nhất có thể", { en: "Please return the signed contract as soon as possible.", vi: "Vui lòng gửi lại hợp đồng đã ký sớm nhất có thể." }, "office", [2, 3, 5, 6, 7]),
  p("phrase-ahead-schedule", "ahead of schedule", "sớm hơn tiến độ", { en: "The renovation was completed ahead of schedule.", vi: "Việc cải tạo đã hoàn thành sớm hơn tiến độ." }, "facilities", [3, 4, 5, 6, 7]),
  p("phrase-behind-schedule", "behind schedule", "chậm tiến độ", { en: "The construction project is two weeks behind schedule.", vi: "Dự án xây dựng chậm tiến độ hai tuần." }, "facilities", [3, 4, 5, 6, 7]),
  p("phrase-on-behalf-of", "on behalf of", "thay mặt cho", { en: "I am writing on behalf of the sales department.", vi: "Tôi viết thư thay mặt cho bộ phận kinh doanh." }, "office", [3, 4, 5, 6, 7], "on behalf of + person/organization"),
  p("phrase-in-accordance-with", "in accordance with", "theo, phù hợp với", { en: "The equipment was installed in accordance with safety regulations.", vi: "Thiết bị được lắp đặt theo quy định an toàn." }, "facilities", [4, 5, 6, 7], "in accordance with + rule/policy", "B2", 2),
  p("phrase-due-to", "due to", "do, vì", { en: "The flight was canceled due to severe weather.", vi: "Chuyến bay đã bị hủy do thời tiết xấu." }, "travel", [3, 4, 5, 6, 7], "due to + noun phrase"),
  p("phrase-because-of", "because of", "bởi vì", { en: "The store closed early because of a power outage.", vi: "Cửa hàng đóng cửa sớm vì mất điện." }, "facilities", [3, 4, 5, 6, 7], "because of + noun phrase"),
  p("phrase-in-order-to", "in order to", "để", { en: "We updated the website in order to improve navigation.", vi: "Chúng tôi đã cập nhật trang web để cải thiện điều hướng." }, "technology", [3, 4, 5, 6, 7], "in order to + V"),
  p("phrase-so-that", "so that", "để mà", { en: "Please speak clearly so that everyone can hear you.", vi: "Vui lòng nói rõ để mọi người có thể nghe bạn." }, "meetings", [2, 3, 4, 5, 6], "so that + clause"),
  p("phrase-eligible-for", "be eligible for", "đủ điều kiện nhận/tham gia", { en: "Full-time employees are eligible for health benefits.", vi: "Nhân viên toàn thời gian đủ điều kiện nhận phúc lợi y tế." }, "human-resources", [3, 5, 6, 7], "be eligible for + noun"),
  p("phrase-apply-for", "apply for", "nộp đơn xin", { en: "She applied for the accounting position.", vi: "Cô ấy đã nộp đơn cho vị trí kế toán." }, "human-resources", [3, 5, 6, 7], "apply for + job/program"),
  p("phrase-fill-out", "fill out", "điền vào", { en: "Please fill out the registration form completely.", vi: "Vui lòng điền đầy đủ phiếu đăng ký." }, "office", [2, 3, 5, 6, 7], "fill out + form/application"),
  p("phrase-take-part-in", "take part in", "tham gia", { en: "More than 200 people took part in the survey.", vi: "Hơn 200 người đã tham gia khảo sát." }, "events", [3, 4, 5, 6, 7], "take part in + event/activity"),
  p("phrase-set-up", "set up", "thiết lập, sắp xếp", { en: "The staff is setting up the room for the seminar.", vi: "Nhân viên đang sắp xếp phòng cho buổi hội thảo." }, "events", [1, 3, 4, 5, 6], "set up + equipment/room/system"),
  p("phrase-carry-out", "carry out", "thực hiện", { en: "The company will carry out a customer survey.", vi: "Công ty sẽ thực hiện một khảo sát khách hàng." }, "marketing", [3, 4, 5, 6, 7], "carry out + task/research/inspection"),
  p("phrase-follow-up-on", "follow up on", "theo dõi, xử lý tiếp", { en: "I will follow up on your request this afternoon.", vi: "Tôi sẽ xử lý tiếp yêu cầu của bạn vào chiều nay." }, "customer-service", [2, 3, 5, 6, 7], "follow up on + request/issue"),
  p("phrase-make-sure", "make sure", "bảo đảm", { en: "Make sure all windows are closed before leaving.", vi: "Hãy bảo đảm tất cả cửa sổ đã đóng trước khi rời đi." }, "office", [2, 3, 4, 5, 6], "make sure (that) + clause"),
  p("phrase-take-place", "take place", "diễn ra", { en: "The awards ceremony will take place in the main hall.", vi: "Lễ trao giải sẽ diễn ra tại hội trường chính." }, "events", [3, 4, 5, 6, 7]),
  p("phrase-scheduled-to", "be scheduled to", "được lên lịch sẽ", { en: "The new branch is scheduled to open in May.", vi: "Chi nhánh mới được lên lịch khai trương vào tháng Năm." }, "office", [3, 4, 5, 6, 7], "be scheduled to + V"),
  p("phrase-expected-to", "be expected to", "được dự kiến sẽ", { en: "Sales are expected to increase next quarter.", vi: "Doanh số được dự kiến sẽ tăng trong quý tới." }, "marketing", [3, 4, 5, 6, 7], "be expected to + V"),
  p("phrase-required-to", "be required to", "được yêu cầu phải", { en: "Applicants are required to provide two references.", vi: "Ứng viên được yêu cầu cung cấp hai người tham chiếu." }, "human-resources", [3, 4, 5, 6, 7], "be required to + V"),
  p("phrase-available-for", "be available for", "có sẵn cho, rảnh để", { en: "Are you available for an interview on Tuesday?", vi: "Bạn có rảnh để phỏng vấn vào thứ Ba không?" }, "human-resources", [2, 3, 5, 6], "be available for + noun"),
  p("phrase-run-out-of", "run out of", "hết, cạn", { en: "The office has run out of printer paper.", vi: "Văn phòng đã hết giấy in." }, "office", [2, 3, 5, 6], "run out of + noun"),
  p("phrase-out-of-order", "out of order", "bị hỏng, không hoạt động", { en: "The elevator is temporarily out of order.", vi: "Thang máy tạm thời không hoạt động." }, "facilities", [1, 2, 3, 4, 5, 6]),
  p("phrase-under-construction", "under construction", "đang được xây dựng", { en: "The east entrance is under construction.", vi: "Lối vào phía đông đang được xây dựng." }, "facilities", [1, 3, 4, 5, 6, 7]),
  p("phrase-no-extra-charge", "at no extra charge", "không tính thêm phí", { en: "Breakfast is included at no extra charge.", vi: "Bữa sáng được bao gồm mà không tính thêm phí." }, "customer-service", [3, 4, 5, 6, 7]),
  p("phrase-free-of-charge", "free of charge", "miễn phí", { en: "Hotel guests may use the shuttle free of charge.", vi: "Khách của khách sạn có thể sử dụng xe đưa đón miễn phí." }, "travel", [3, 4, 5, 6, 7]),
  p("phrase-in-advance", "in advance", "trước", { en: "Reservations must be made at least two days in advance.", vi: "Việc đặt chỗ phải được thực hiện trước ít nhất hai ngày." }, "travel", [3, 5, 6, 7]),
  p("phrase-by-end-of", "by the end of", "chậm nhất vào cuối", { en: "Please submit the report by the end of the month.", vi: "Vui lòng nộp báo cáo chậm nhất vào cuối tháng." }, "office", [3, 5, 6, 7], "by the end of + time period"),
  p("phrase-no-later-than", "no later than", "không muộn hơn", { en: "Applications must arrive no later than August 30.", vi: "Đơn đăng ký phải đến không muộn hơn ngày 30 tháng Tám." }, "human-resources", [3, 5, 6, 7], "no later than + time/date"),
  p("phrase-earliest-convenience", "at your earliest convenience", "khi thuận tiện sớm nhất", { en: "Please contact us at your earliest convenience.", vi: "Vui lòng liên hệ với chúng tôi khi thuận tiện sớm nhất." }, "office", [3, 5, 6, 7], undefined, "B2", 2),
  p("phrase-according-to", "according to", "theo như", { en: "According to the schedule, the workshop starts at ten.", vi: "Theo lịch, hội thảo bắt đầu lúc mười giờ." }, "office", [3, 4, 5, 6, 7], "according to + source"),
  p("phrase-with-regard-to", "with regard to", "liên quan đến", { en: "I am contacting you with regard to your recent order.", vi: "Tôi liên hệ với bạn liên quan đến đơn hàng gần đây." }, "customer-service", [3, 4, 5, 6, 7], "with regard to + noun", "B2", 2),
  p("phrase-in-response-to", "in response to", "để phản hồi, nhằm đáp lại", { en: "The company changed its policy in response to customer feedback.", vi: "Công ty đã thay đổi chính sách để phản hồi ý kiến khách hàng." }, "customer-service", [3, 4, 5, 6, 7], "in response to + noun", "B2", 2),
  p("phrase-on-sale", "on sale", "đang giảm giá/được bán", { en: "All office chairs are on sale this week.", vi: "Tất cả ghế văn phòng đang giảm giá trong tuần này." }, "purchasing", [2, 3, 5, 6, 7]),
  p("phrase-in-stock", "in stock", "còn hàng", { en: "The blue model is currently in stock.", vi: "Mẫu màu xanh hiện còn hàng." }, "purchasing", [2, 3, 5, 6, 7]),
  p("phrase-out-of-stock", "out of stock", "hết hàng", { en: "That item is temporarily out of stock.", vi: "Mặt hàng đó tạm thời hết hàng." }, "purchasing", [2, 3, 5, 6, 7]),
  p("phrase-check-in", "check in", "làm thủ tục nhận phòng/chuyến bay", { en: "Passengers should check in two hours before departure.", vi: "Hành khách nên làm thủ tục hai giờ trước giờ khởi hành." }, "travel", [2, 3, 4, 5, 7], "check in at + place / check in for + flight"),
  p("phrase-check-out", "check out", "làm thủ tục trả phòng", { en: "Guests must check out by noon.", vi: "Khách phải trả phòng trước buổi trưa." }, "travel", [2, 3, 4, 5, 7]),
  p("phrase-board-flight", "board a flight", "lên máy bay", { en: "Passengers are now boarding Flight 318.", vi: "Hành khách hiện đang lên Chuyến bay 318." }, "travel", [1, 2, 3, 4, 5]),
  p("phrase-miss-deadline", "miss a deadline", "trễ hạn", { en: "We cannot afford to miss the project deadline.", vi: "Chúng ta không thể để trễ hạn dự án." }, "office", [3, 5, 6, 7]),
  p("phrase-meet-deadline", "meet a deadline", "đáp ứng đúng hạn", { en: "The team worked overtime to meet the deadline.", vi: "Nhóm đã làm thêm giờ để kịp thời hạn." }, "office", [3, 5, 6, 7]),
  p("phrase-place-order", "place an order", "đặt hàng", { en: "You can place an order through our website.", vi: "Bạn có thể đặt hàng qua trang web của chúng tôi." }, "purchasing", [2, 3, 5, 6, 7]),
  p("phrase-issue-refund", "issue a refund", "thực hiện hoàn tiền", { en: "The store will issue a full refund within five business days.", vi: "Cửa hàng sẽ hoàn toàn bộ tiền trong vòng năm ngày làm việc." }, "customer-service", [2, 3, 5, 6, 7]),
  p("phrase-make-reservation", "make a reservation", "đặt chỗ", { en: "I called the restaurant to make a reservation.", vi: "Tôi đã gọi nhà hàng để đặt chỗ." }, "travel", [2, 3, 5, 6]),
  p("phrase-confirm-receipt", "confirm receipt", "xác nhận đã nhận", { en: "Please confirm receipt of this email.", vi: "Vui lòng xác nhận đã nhận email này." }, "office", [3, 5, 6, 7], "confirm receipt of + noun"),
  p("phrase-annual-leave", "annual leave", "nghỉ phép năm", { en: "Employees should request annual leave two weeks in advance.", vi: "Nhân viên nên xin nghỉ phép năm trước hai tuần." }, "human-resources", [3, 5, 6, 7]),
  p("phrase-job-opening", "job opening", "vị trí đang tuyển", { en: "The company posted several job openings on its website.", vi: "Công ty đã đăng một số vị trí tuyển dụng trên trang web." }, "human-resources", [3, 4, 5, 6, 7]),
];

export const verbs: VerbItem[] = [...starterVerbs, ...expandedVerbs];
export const phrases: PhraseItem[] = [...starterPhrases, ...expandedPhrases];

export const toeic650SourceData = {
  schemaVersion: 1,
  contentVersion: "2026.08.22-expanded",
  targetScore: 650,
  locale: "vi-VN",
  studyPrinciples: [
    "Learn a rule or pattern, then retrieve it without looking.",
    "Learn verbs with their argument patterns and collocations, not as isolated translations.",
    "Contrast similar tenses and phrases to force a decision.",
    "Move every mastered item from recognition to production and then to a real-life mission.",
  ],
  tenseDecisionAlgorithm: [
    "Find the time anchor: past, present, or future.",
    "Decide whether the action is a fact/habit, in progress, or completed.",
    "If two time anchors exist, decide which action happened first.",
    "Use signal words only as supporting evidence, not as the only rule.",
    "Check subject-verb agreement and the required auxiliary verb.",
  ],
  verbs,
  tenses,
  phrases,
} as const;

export function validateToeic650SourceData(): string[] {
  const errors: string[] = [];
  const allItems = [...verbs, ...tenses, ...phrases];
  const ids = new Set<string>();

  for (const item of allItems) {
    if (ids.has(item.id)) errors.push(`Duplicate id: ${item.id}`);
    ids.add(item.id);
    if (item.toeicParts.length === 0) errors.push(`Missing TOEIC part mapping: ${item.id}`);
    if (item.examples.length === 0) errors.push(`Missing example: ${item.id}`);
  }

  for (const tense of tenses) {
    for (const contrastId of tense.contrastWith) {
      if (!tenses.some((candidate) => candidate.id === contrastId)) {
        errors.push(`Unknown contrast tense ${contrastId} in ${tense.id}`);
      }
    }
  }

  return errors;
}
