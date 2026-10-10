import type { Part5Exercise } from "../domain/exercise.ts";
import type { FoundationType } from "../domain/foundation.ts";

// Original teaching examples; rules checked against British Council LearnEnglish.
// Each family has 20 distinct prompts, specific distractor feedback, and a translation.
const bank: Part5Exercise[] = [];
function add(type: FoundationType, prompt: string, correct: string, wrong: [string, string][], rule: string, vi: string) {
  const index = bank.filter(q => q.errorCategory === type).length;
  const texts = [{ text: correct, rationaleVi: rule }, ...wrong.map(([text, rationaleVi]) => ({ text, rationaleVi }))];
  const shift = index % 4;
  const rotated = [...texts.slice(shift), ...texts.slice(0, shift)];
  const ids = ["A", "B", "C", "D"] as const;
  const example = prompt.replace("_____", correct);
  bank.push({ id: `${type}-${String(index + 1).padStart(3, "0")}`, part: 5, prompt,
    options: rotated.map((o, i) => ({ id: ids[i], ...o })), correctOptionId: ids[rotated.findIndex(o => o.text === correct)],
    explanationVi: `Đáp án: ${correct}. ${rule} Ví dụ hoàn chỉnh: ${example} Nghĩa: ${vi}`,
    errorCategory: type, focusContentIds: [], difficulty: 1 });
}
const people = [
  ["I", "Tôi", "am", "my", "me"], ["You", "Bạn", "are", "your", "you"],
  ["He", "Anh ấy", "is", "his", "him"], ["She", "Cô ấy", "is", "her", "her"],
  ["We", "Chúng tôi", "are", "our", "us"], ["They", "Họ", "are", "their", "them"],
] as const;
const states = [["ready", "sẵn sàng"], ["happy", "vui"], ["at home", "ở nhà"], ["busy", "bận"]];
for (let i = 0; i < 20; i++) {
  const [s, sv, be] = people[i % 6]; const [state, stateVi] = states[Math.floor(i / 6)];
  add("basic_be", `${s} _____ ${state}.`, be,
    ["am", "is", "are", "be"].filter(x => x !== be).map(x => [x, x === "be" ? "Be là nguyên mẫu; câu khẳng định hiện tại cần am/is/are theo chủ ngữ." : `${x} đi với ${x === "am" ? "I" : x === "is" ? "he/she/it hoặc danh từ số ít" : "you/we/they hoặc danh từ số nhiều"}, không phải chủ ngữ ${s} ở đây.`]),
    `Chủ ngữ ${s} dùng ${be}. Hiện tại của be: I am; he/she/it is; you/we/they are.`, `${sv} ${stateVi}.`);
}
const nouns = [
  ["apple", "apples", "quả táo", "an"], ["book", "books", "quyển sách", "a"],
  ["egg", "eggs", "quả trứng", "an"], ["desk", "desks", "bàn làm việc", "a"],
  ["orange", "oranges", "quả cam", "an"], ["chair", "chairs", "cái ghế", "a"],
  ["umbrella", "umbrellas", "cái ô", "an"], ["pen", "pens", "cây bút", "a"],
  ["onion", "onions", "củ hành", "an"], ["bag", "bags", "cái túi", "a"],
  ["elephant", "elephants", "con voi", "an"], ["cat", "cats", "con mèo", "a"],
  ["insect", "insects", "con côn trùng", "an"], ["dog", "dogs", "con chó", "a"],
  ["hour", "hours", "giờ", "an"], ["university", "universities", "trường đại học", "a"],
  ["box", "boxes", "cái hộp", "a"], ["baby", "babies", "em bé", "a"],
  ["child", "children", "đứa trẻ", "a"], ["bus", "buses", "xe buýt", "a"],
] as const;
nouns.forEach(([n, plural, vi, article]) => {
  add("basic_articles", `Điền a hoặc an (một): _____ ${n}`, article,
    [[article === "a" ? "an" : "a", `Chọn mạo từ theo âm đầu khi đọc, không chỉ theo chữ viết. ${n} bắt đầu bằng âm ${article === "an" ? "nguyên âm" : "phụ âm"}.`], ["some", "Some không phải mạo từ a/an được yêu cầu và không diễn đạt đúng một đơn vị ở đây."], ["many", "Many cần danh từ đếm được số nhiều; danh từ ở đây là số ít."]],
    `Dùng ${article} trước ${n}: ${n === "hour" ? "h câm, âm đầu là nguyên âm" : n === "university" ? "âm đầu /j/ là phụ âm dù chữ đầu là u" : article === "an" ? "âm đầu là nguyên âm" : "âm đầu là phụ âm"}.`, `một ${vi}`);
  add("basic_plural", `Write the plural: one ${n} → two _____.`, plural,
    [[n, "Sau two phải dùng danh từ số nhiều, không giữ dạng số ít."], [`${n}'s`, "Dấu 's thể hiện sở hữu, không tạo danh từ số nhiều."], [`${plural}'s`, "Không thêm 's sở hữu khi chỉ đếm số lượng."]],
    `Dạng số nhiều của ${n} là ${plural}. ${n === "child" ? "Đây là dạng bất quy tắc, cần ghi nhớ child → children." : n.endsWith("y") ? "Phụ âm + y chuyển thành -ies." : /[sx]$/.test(n) ? "Danh từ tận cùng s hoặc x thêm -es." : "Danh từ này thêm -s."}`, `một ${vi} → hai ${vi}`);
});
const actions = [
  ["read", "reads", "reading", "read", "books", "đọc sách"],
  ["play", "plays", "playing", "played", "football", "chơi bóng đá"],
  ["cook", "cooks", "cooking", "cooked", "dinner", "nấu bữa tối"],
  ["watch", "watches", "watching", "watched", "TV", "xem tivi"],
  ["write", "writes", "writing", "wrote", "emails", "viết thư điện tử"],
] as const;
for (let i = 0; i < 20; i++) {
  const [base, third, ing, past, object, vi] = actions[i % 5];
  const [s, sv, be] = people[[0, 2, 4, 5][Math.floor(i / 5)]];
  const singular = be === "is"; const present = singular ? third : base;
  add("basic_present", `${s} _____ ${object} every day.`, present,
    [[singular ? base : third, `Chủ ngữ ${s} ${singular ? "là ngôi thứ ba số ít, phải thêm -s/-es" : "không phải ngôi thứ ba số ít, dùng nguyên mẫu"}.`], [ing, "V-ing không tự làm động từ chính trong câu hiện tại đơn."], [`${be} ${base}`, "Không đặt am/is/are ngay trước nguyên mẫu để nói thói quen."]],
    `Every day diễn tả thói quen. ${s} dùng ${present} ở hiện tại đơn.`, `${sv} ${vi} mỗi ngày.`);
  add("basic_negative", `${s} _____ ${base} ${object} on Sundays.`, singular ? "does not" : "do not",
    [[singular ? "do not" : "does not", `Trợ động từ phải phù hợp chủ ngữ ${s}: ${singular ? "does" : "do"}.`], ["not", "Not đứng một mình không tạo phủ định cho động từ thường ở hiện tại đơn."], [`${be} not`, "Am/is/are not không đứng trước nguyên mẫu của động từ thường trong cấu trúc này."]],
    `Phủ định hiện tại đơn: chủ ngữ + do/does not + nguyên mẫu. ${s} dùng ${singular ? "does not" : "do not"}.`, `${sv} không ${vi} vào các Chủ nhật.`);
  add("basic_questions", `_____ ${s === "I" ? s : s.toLowerCase()} ${base} ${object} every day?`, singular ? "Does" : "Do",
    [[singular ? "Do" : "Does", `Chủ ngữ ${s} cần trợ động từ ${singular ? "Does" : "Do"}.`], ["Is", "Is không đứng trước chủ ngữ rồi nguyên mẫu để hỏi thói quen với động từ thường."], ["Are", "Are cần tính từ/danh từ hoặc V-ing, không dùng với nguyên mẫu trong câu hỏi này."]],
    `Câu hỏi hiện tại đơn: Do/Does + chủ ngữ + nguyên mẫu? Sau does vẫn dùng ${base}, không dùng ${third}.`, `${sv} có ${vi} mỗi ngày không?`);
  add("basic_continuous", `${s} _____ ${object} right now.`, `${be} ${ing}`,
    [[ing, "Hiện tại tiếp diễn cần cả am/is/are và V-ing; phương án này thiếu be."], [`${be} ${base}`, "Sau be phải dùng V-ing khi diễn tả hành động đang xảy ra."], [`be ${ing}`, `Be chưa chia theo chủ ngữ; ${s} phải đi với ${be}.`]],
    `Right now chỉ lúc này. Hiện tại tiếp diễn: ${s} + ${be} + ${ing}.`, `${sv} đang ${vi} ngay lúc này.`);
  add("basic_past", `${s} _____ ${object} yesterday.`, past,
    [[third, "Dạng thêm -s/-es thuộc hiện tại đơn ngôi thứ ba số ít, không dùng với yesterday."], [ing, "V-ing đứng một mình không tạo thì quá khứ đơn."], [`has ${ing}`, "Has không đi trực tiếp với V-ing để tạo thì; mốc yesterday ở đây cần quá khứ đơn."]],
    `Yesterday chỉ quá khứ đã kết thúc. Quá khứ của ${base} là ${past}.${base === "read" ? " Read quá khứ viết giống nguyên mẫu nhưng đọc /red/." : ""}`, `${sv} đã ${vi} hôm qua.`);
  add("basic_modals", `${s} ${i % 2 ? "must" : "can"} _____ ${object}.`, base,
    [[third, "Sau can/must không thêm -s/-es dù chủ ngữ là he/she/it."], [ing, "Can/must đi trực tiếp với nguyên mẫu, không với V-ing."], [`to ${base}`, "Sau can/must không dùng to trước động từ."]],
    `Sau động từ khuyết thiếu can (có thể) hoặc must (phải), dùng nguyên mẫu không to: ${base}.`, `${sv} ${i % 2 ? "phải" : "có thể"} ${vi}.`);
}
const objects = [["book", "quyển sách"], ["bag", "cái túi"], ["desk", "bàn làm việc"], ["phone", "điện thoại"]];
for (let i = 0; i < 20; i++) {
  const [s, sv, , possessive, objectPronoun] = people[[0, 2, 3, 4, 5][i % 5]];
  const [object, vi] = objects[Math.floor(i / 5)];
  add("basic_possessives", `${s} own this ${object}. It is _____ ${object}.`.replace("He own", "He owns").replace("She own", "She owns"), possessive,
    [[s, "Đại từ chủ ngữ không đứng trước danh từ để chỉ người sở hữu."], ["mine", "Mine là đại từ sở hữu, không đặt ngay trước danh từ."], ["theirs", "Theirs là đại từ sở hữu, không đặt ngay trước danh từ."]],
    `${s} chuyển thành tính từ sở hữu ${possessive} trước danh từ ${object}.`, `${sv} sở hữu ${vi} này. Đây là ${vi} của ${sv.toLowerCase()}.`);
  add("basic_pronouns", `${s} need the ${object}. Please give it to _____.`.replace("He need", "He needs").replace("She need", "She needs"), objectPronoun,
    [[s, `Sau giới từ to cần đại từ tân ngữ ${objectPronoun}, không dùng đại từ chủ ngữ ${s}.`], ["ours", "Ours thay thế vật thuộc về chúng tôi, không chỉ người nhận trong câu này."], ["theirs", "Theirs thay thế vật thuộc về họ, không phải tân ngữ chỉ người nhận."]],
    `Give something to someone: đưa vật gì cho ai. Sau to dùng tân ngữ; ${s} → ${objectPronoun}.`, `${sv} cần ${vi}. Hãy đưa nó cho ${sv.toLowerCase()}.`);
}
const adjectives = [["tall", "taller", "cao hơn"], ["small", "smaller", "nhỏ hơn"], ["old", "older", "lớn tuổi hơn"], ["young", "younger", "trẻ hơn"], ["short", "shorter", "thấp hơn"]];
const pairs = [["Anna", "Ben"], ["Lan", "Mai"], ["Tom", "Sam"], ["Kim", "Lee"]];
for (let i = 0; i < 20; i++) {
  const [a, comparative, vi] = adjectives[i % 5]; const [one, two] = pairs[Math.floor(i / 5)];
  add("basic_comparison", `${one} is _____ than ${two}. (${a})`, comparative,
    [[a, "Có than và đang so sánh hai người nên cần dạng so sánh hơn."], [`${a}est`, "Dạng -est là so sánh nhất, không dùng trong cấu trúc so sánh hơn với than."], [`more ${comparative}`, "Không dùng đồng thời more và đuôi -er để so sánh hơn."]],
    `Tính từ ngắn ${a} thêm -er thành ${comparative}; theo sau là than.`, `${one} ${vi} ${two}.`);
}
export const foundationExercises: Part5Exercise[] = bank;
