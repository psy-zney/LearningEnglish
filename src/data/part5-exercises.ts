import type { ExerciseOption, Part5Exercise } from "@/domain/exercise";
const ERROR_CATEGORIES = {
  subjectVerbAgreement: "subject_verb_agreement",
  tense: "tense_or_time_anchor",
  verbForm: "verb_form_or_pattern",
  preposition: "preposition_or_collocation",
  connector: "connector_or_clause_structure",
  wordChoice: "word_choice_or_meaning",
} as const;

const optionIds = ["A", "B", "C", "D"] as const;

function q(
  id: string,
  prompt: string,
  answers: readonly [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanationVi: string,
  errorCategory: string,
  focusContentIds: string[],
  difficulty: 1 | 2 | 3 = 1,
): Part5Exercise {
  const options = answers.map((text, index) => ({
    id: optionIds[index],
    text,
    rationaleVi: index === correctIndex
      ? explanationVi
      : `“${text}” không khớp với cấu trúc hoặc mốc thời gian cần dùng trong câu này.`,
  })) as ExerciseOption[];

  return {
    id,
    part: 5,
    prompt,
    options,
    correctOptionId: optionIds[correctIndex],
    explanationVi,
    errorCategory,
    focusContentIds,
    difficulty,
  };
}

export const part5Exercises: Part5Exercise[] = [
  q("p5-001", "All department heads must _____ the budget meeting on Friday.", ["attend", "attends", "attended", "attending"], 0, "Sau động từ khuyết thiếu must dùng động từ nguyên mẫu: must attend.", ERROR_CATEGORIES.verbForm, ["verb-attend"]),
  q("p5-002", "The interview is scheduled _____ at nine o'clock.", ["begin", "to begin", "beginning", "began"], 1, "Cấu trúc be scheduled to + V diễn tả việc đã được lên lịch.", ERROR_CATEGORIES.verbForm, ["verb-schedule", "phrase-scheduled-to"]),
  q("p5-003", "Please _____ the registration form before submitting it.", ["fill out", "run out of", "set up", "check out"], 0, "Fill out + form/application nghĩa là điền vào biểu mẫu.", ERROR_CATEGORIES.wordChoice, ["phrase-fill-out"]),
  q("p5-004", "We look forward to _____ you at the annual conference.", ["meet", "met", "meeting", "have met"], 2, "To trong look forward to là giới từ, vì vậy theo sau là danh từ hoặc V-ing.", ERROR_CATEGORIES.verbForm, ["phrase-look-forward-to"]),
  q("p5-005", "The flight was canceled _____ severe weather.", ["because", "due to", "so that", "although"], 1, "Due to + noun phrase; severe weather là một cụm danh từ.", ERROR_CATEGORIES.connector, ["phrase-due-to"]),
  q("p5-006", "Please speak clearly _____ everyone can hear the announcement.", ["because of", "so that", "due to", "during"], 1, "So that + clause diễn tả mục đích; everyone can hear là một mệnh đề.", ERROR_CATEGORIES.connector, ["phrase-so-that"]),
  q("p5-007", "All visitors are required _____ an identification badge.", ["wear", "wearing", "to wear", "wore"], 2, "Cấu trúc be required to + V: are required to wear.", ERROR_CATEGORIES.verbForm, ["verb-require", "phrase-required-to"]),
  q("p5-008", "Online sales increased _____ twelve percent last quarter.", ["at", "to", "by", "for"], 2, "Increase by + amount nói mức thay đổi; tăng thêm 12 phần trăm.", ERROR_CATEGORIES.preposition, ["verb-increase"]),
  q("p5-009", "The train is expected _____ on time despite the rain.", ["arrive", "arriving", "to arrive", "arrived"], 2, "Cấu trúc be expected to + V: is expected to arrive.", ERROR_CATEGORIES.verbForm, ["verb-arrive", "phrase-expected-to"]),
  q("p5-010", "Applications must arrive no later _____ August 30.", ["from", "than", "by", "for"], 1, "Cụm cố định no later than + date/time nghĩa là không muộn hơn.", ERROR_CATEGORIES.preposition, ["phrase-no-later-than"]),
  q("p5-011", "The east entrance will remain _____ construction until Monday.", ["in", "at", "under", "with"], 2, "Under construction là cụm cố định: đang được xây dựng/cải tạo.", ERROR_CATEGORIES.preposition, ["phrase-under-construction"]),
  q("p5-012", "The hotel provides guests _____ free airport transportation.", ["for", "to", "by", "with"], 3, "Provide + person + with + noun: provides guests with transportation.", ERROR_CATEGORIES.preposition, ["verb-provide"]),
  q("p5-013", "We recommend _____ your room at least two weeks in advance.", ["book", "booking", "booked", "to booking"], 1, "Recommend + V-ing là pattern đúng trong câu này.", ERROR_CATEGORIES.verbForm, ["verb-recommend", "phrase-in-advance"]),
  q("p5-014", "We sincerely apologize _____ the delay in processing your refund.", ["to", "with", "for", "of"], 2, "Apologize for + noun/V-ing dùng để nói lý do xin lỗi.", ERROR_CATEGORIES.preposition, ["verb-apologize"]),
  q("p5-015", "More than 200 employees participated _____ the safety workshop.", ["at", "on", "for", "in"], 3, "Participate in + event/activity là collocation chuẩn.", ERROR_CATEGORIES.preposition, ["verb-participate", "phrase-take-part-in"]),
  q("p5-016", "Please submit the revised report _____ the end of the month.", ["by", "during", "since", "while"], 0, "By the end of đặt hạn chót: hoàn tất không muộn hơn cuối tháng.", ERROR_CATEGORIES.preposition, ["verb-submit", "phrase-by-end-of"]),
  q("p5-017", "The downtown store _____ at nine every weekday.", ["open", "opens", "is opening", "opened"], 1, "Lịch cố định dùng hiện tại đơn; store số ít nên động từ thêm -s.", ERROR_CATEGORIES.subjectVerbAgreement, ["tense-present-simple"]),
  q("p5-018", "Technicians _____ new equipment in the lobby right now.", ["install", "installed", "are installing", "have installed"], 2, "Right now cho biết hành động đang diễn ra, nên dùng hiện tại tiếp diễn.", ERROR_CATEGORIES.tense, ["tense-present-continuous", "verb-install"]),
  q("p5-019", "The company _____ three new branches so far this year.", ["opens", "opened", "has opened", "is opening"], 2, "So far this year là khoảng thời gian chưa kết thúc, phù hợp hiện tại hoàn thành.", ERROR_CATEGORIES.tense, ["tense-present-perfect"]),
  q("p5-020", "The manager _____ the request yesterday afternoon.", ["approves", "has approved", "approved", "is approving"], 2, "Yesterday afternoon là mốc quá khứ đã kết thúc, nên dùng quá khứ đơn.", ERROR_CATEGORIES.tense, ["tense-past-simple", "verb-approve"]),
  q("p5-021", "Ms. Park _____ the quarterly results when the fire alarm rang.", ["presents", "was presenting", "has presented", "will present"], 1, "Hành động đang diễn ra thì một sự kiện quá khứ xen vào: was presenting.", ERROR_CATEGORIES.tense, ["tense-past-continuous"], 2),
  q("p5-022", "By the time we arrived, the last train _____ the station.", ["leaves", "has left", "had left", "was leaving"], 2, "Hành động rời ga xảy ra trước một mốc quá khứ khác, nên dùng quá khứ hoàn thành.", ERROR_CATEGORIES.tense, ["tense-past-perfect", "verb-depart"], 2),
  q("p5-023", "The team _____ the project by Friday.", ["completes", "will complete", "will have completed", "is completing"], 2, "By Friday nhấn mạnh hoàn tất trước hạn tương lai, nên dùng future perfect.", ERROR_CATEGORIES.tense, ["tense-future-perfect"], 2),
  q("p5-024", "Each applicant _____ two professional references.", ["provide", "provides", "are providing", "have provided"], 1, "Each applicant là chủ ngữ số ít, nên động từ hiện tại đơn là provides.", ERROR_CATEGORIES.subjectVerbAgreement, ["verb-provide", "tense-present-simple"]),
  q("p5-025", "The director _____ the revised budget at yesterday's meeting.", ["approve", "approving", "approved", "has approve"], 2, "Yesterday's meeting là mốc quá khứ đã kết thúc; approved là dạng quá khứ đúng.", ERROR_CATEGORIES.tense, ["verb-approve", "tense-past-simple"]),
  q("p5-026", "The equipment was installed in accordance _____ safety regulations.", ["to", "for", "with", "by"], 2, "Cụm cố định in accordance with + rule/policy.", ERROR_CATEGORIES.preposition, ["phrase-in-accordance-with"], 2),
  q("p5-027", "The marketing team will _____ a customer survey next week.", ["carry out", "run out of", "check in", "take place"], 0, "Carry out + task/research/survey nghĩa là thực hiện.", ERROR_CATEGORIES.wordChoice, ["phrase-carry-out"]),
  q("p5-028", "Full-time employees are eligible _____ health benefits.", ["to", "for", "with", "at"], 1, "Cấu trúc be eligible for + noun.", ERROR_CATEGORIES.preposition, ["phrase-eligible-for"]),
  q("p5-029", "Ms. Lee is responsible _____ training new staff members.", ["to", "of", "for", "with"], 2, "Cấu trúc be responsible for + noun/V-ing.", ERROR_CATEGORIES.preposition, ["phrase-responsible-for"]),
  q("p5-030", "I am writing on _____ of the customer service department.", ["behalf", "response", "regard", "accordance"], 0, "On behalf of nghĩa là thay mặt cho một người hoặc tổ chức.", ERROR_CATEGORIES.wordChoice, ["phrase-on-behalf-of"], 2),
];

export function validatePart5Exercises() {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const exercise of part5Exercises) {
    if (ids.has(exercise.id)) errors.push(`Duplicate exercise id: ${exercise.id}`);
    ids.add(exercise.id);
    if (exercise.options.length !== 4) errors.push(`Exercise ${exercise.id} must have four options`);
    if (!exercise.options.some((option) => option.id === exercise.correctOptionId)) {
      errors.push(`Exercise ${exercise.id} has an unknown correct option`);
    }
    if (new Set(exercise.options.map((option) => option.text)).size !== exercise.options.length) {
      errors.push(`Exercise ${exercise.id} has duplicate option text`);
    }
  }

  return errors;
}
