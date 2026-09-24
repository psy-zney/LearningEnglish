/**
 * Stage 2: Intermediate Vocabulary Data (TOEIC 300→600)
 *
 * 10 Intermediate Vocabulary Lessons (TV1 - TV10) + 2 Mini Tests:
 * - TV1: Contracts & Marketing
 * - TV2: Warranties & Business Planning
 * - TV3: Conferences & Computers
 * - TV4: Office Technology & Procedures
 * - TV5: Electronics & Correspondence
 * - Mini Test TV1: Review TV1-TV5 (20 questions)
 * - TV6: Job Advertising & Recruiting
 * - TV7: Hiring, Training, Salaries & Benefits
 * - TV8: Promotions, Pensions & Awards
 * - TV9: Ordering Supplies & Shipping
 * - TV10: Invoices & Inventory
 * - Mini Test TV2: Review TV6-TV10 (20 questions)
 *
 * Content inspired by prepedu.com & 600 Essential Words for the TOEIC.
 */

import type { VocabLesson, VocabWord, VocabExercise, TestUnit } from "@/domain/study-roadmap";

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
  difficulty: 1 | 2 | 3 = 2,
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
// TV1: Contracts & Marketing
// ═══════════════════════════════════════════════════════════════════

const tv1Words: VocabWord[] = [
  word("tvw-abide", "abide by", "/əˈbaɪd baɪ/", "verb", "tuân theo, tôn trọng (hợp đồng)", "Both parties must strictly abide by the contractual clauses.", "Cả hai bên phải nghiêm ngặt tuân thủ các điều khoản hợp đồng.", "contracts-marketing", ["abide by the rules", "abide by the agreement", "abide by terms"]),
  word("tvw-agreement", "agreement", "/əˈɡriː.mənt/", "noun", "hợp đồng, sự thỏa thuận", "The partners reached a mutually binding agreement.", "Các đối tác đã đạt được thỏa thuận ràng buộc lẫn nhau.", "contracts-marketing", ["binding agreement", "reach an agreement", "sign an agreement"], { verb: "agree" }),
  word("tvw-assurance", "assurance", "/əˈʃʊr.əns/", "noun", "sự cam đoan, bảo đảm", "The supplier gave assurances that deliveries would arrive on time.", "Nhà cung ứng đã cam đoan rằng hàng sẽ đến đúng hẹn.", "contracts-marketing", ["give assurance", "quality assurance", "reasonable assurance"], { verb: "assure" }),
  word("tvw-cancellation", "cancellation", "/ˌsæn.səlˈeɪ.ʃən/", "noun", "sự hủy bỏ (hợp đồng)", "Late cancellation incurs a ten percent administrative charge.", "Hủy bỏ muộn sẽ chịu mười phần trăm phí quản lý.", "contracts-marketing", ["cancellation fee", "policy cancellation", "notice of cancellation"], { verb: "cancel" }),
  word("tvw-determine", "determine", "/dɪˈtɜːr.mɪn/", "verb", "xác định, quyết định", "Market research helped determine optimal retail pricing.", "Nghiên cứu thị trường đã giúp xác định mức giá bán lẻ tối ưu.", "contracts-marketing", ["determine the cause", "determine factors", "determine whether"], { noun: "determination" }),
  word("tvw-engage", "engage", "/ɪnˈɡeɪdʒ/", "verb", "tham gia, thuê mướn", "The law firm was engaged to draft the joint-venture treaty.", "Văn phòng luật đã được thuê để soạn thảo điều ước liên doanh.", "contracts-marketing", ["engage in business", "engage someone's services", "engage customers"], { noun: "engagement" }),
  word("tvw-establish", "establish", "/ɪˈstæb.lɪʃ/", "verb", "thiết lập, thành lập", "They established a solid reputation within the commercial sector.", "Họ đã thiết lập danh tiếng vững chắc trong lĩnh vực thương mại.", "contracts-marketing", ["establish a company", "establish relations", "establish guidelines"], { noun: "establishment" }),
  word("tvw-obligate", "obligate", "/ˈɑːb.lə.ɡeɪt/", "verb", "bắt buộc (theo hợp đồng)", "The agreement obligates the tenant to maintain the premises.", "Bản hợp đồng bắt buộc người thuê phải bảo dưỡng mặt bằng.", "contracts-marketing", ["be obligated to", "contractual obligation", "feel obligated"], { noun: "obligation" }),
  word("tvw-party", "party", "/ˈpɑːr.t̬i/", "noun", "bên (trong hợp đồng)", "The contract was signed by both contracting parties.", "Hợp đồng đã được ký bởi cả hai bên ký kết.", "contracts-marketing", ["third party", "contracting party", "either party"]),
  word("tvw-provision", "provision", "/prəˈvɪʒ.ən/", "noun", "điều khoản quy định", "Carefully scrutinize the confidentiality provisions before signing.", "Xem xét kỹ các điều khoản bảo mật trước khi ký.", "contracts-marketing", ["under the provisions of", "safety provision", "contractual provision"], { verb: "provide" }),
  word("tvw-resolve", "resolve", "/rɪˈzɑːlv/", "verb", "giải quyết (tranh chấp)", "Arbitration helped resolve the intellectual property dispute.", "Trọng tài đã giúp giải quyết vụ tranh chấp sở hữu trí tuệ.", "contracts-marketing", ["resolve a dispute", "resolve an issue", "resolve conflict"], { noun: "resolution" }),
  word("tvw-specific", "specific", "/spəˈsɪf.ɪk/", "adjective", "cụ thể, rõ ràng", "The contract contains specific instructions on dispute settlement.", "Hợp đồng chứa đựng các hướng dẫn cụ thể về hòa giải tranh chấp.", "contracts-marketing", ["specific details", "specific requirements", "be specific about"], { adverb: "specifically", verb: "specify" }),
  word("tvw-attract", "attract", "/əˈtrækt/", "verb", "thu hút (khách hàng)", "The viral campaign successfully attracted younger demographics.", "Chiến dịch lan truyền đã thu hút thành công nhóm đối tượng trẻ tuổi hơn.", "contracts-marketing", ["attract customers", "attract attention", "attract investment"], { noun: "attraction", adjective: "attractive" }),
  word("tvw-compare", "compare", "/kəmˈper/", "verb", "so sánh", "Shoppers frequently compare product reviews before purchasing.", "Người mua sắm thường so sánh đánh giá sản phẩm trước khi mua.", "contracts-marketing", ["compare with", "compare favorably", "compare prices"], { noun: "comparison", adjective: "comparative" }),
  word("tvw-competition", "competition", "/ˌkɑːm.pəˈtɪʃ.ən/", "noun", "sự cạnh tranh, đối thủ cạnh tranh", "Fierce market competition drove down device costs.", "Cạnh tranh thị trường khốc liệt đã kéo giảm giá thành thiết bị.", "contracts-marketing", ["stiff competition", "beat the competition", "direct competition"], { verb: "compete", adjective: "competitive" }),
  word("tvw-consume", "consume", "/kənˈsuːm/", "verb", "tiêu dùng, tiêu thụ", "Emerging economies consume increasing volumes of natural energy.", "Các nền kinh tế mới nổi tiêu thụ lượng năng lượng tự nhiên ngày càng tăng.", "contracts-marketing", ["consume energy", "consume time", "mass consumption"], { noun: "consumer/consumption" }),
  word("tvw-convince", "convince", "/kənˈvɪns/", "verb", "thuyết phục", "The marketing presentation convinced board directors to invest.", "Bài thuyết trình tiếp thị đã thuyết phục các giám đốc đầu tư.", "contracts-marketing", ["convince someone to", "firmly convinced", "convincing argument"]),
  word("tvw-fad", "fad", "/fæd/", "noun", "mốt nhất thời, xu hướng ngắn hạn", "Smart marketers distinguish between a transient fad and a trend.", "Các nhà tiếp thị thông minh phân biệt giữa một trào lưu nhất thời và xu thế.", "contracts-marketing", ["passing fad", "latest fad", "short-lived fad"]),
  word("tvw-inspire", "inspire", "/ɪnˈspaɪr/", "verb", "truyền cảm hứng", "Her entrepreneurial narrative inspired countless young founders.", "Câu chuyện khởi nghiệp của cô ấy đã truyền cảm hứng cho vô số người sáng lập trẻ.", "contracts-marketing", ["inspire confidence", "inspire innovation", "source of inspiration"], { noun: "inspiration" }),
  word("tvw-market", "market", "/ˈmɑːr.kɪt/", "verb", "tiếp thị, đưa ra thị trường", "The agency will market the novel gadget across North America.", "Đại lý sẽ tiếp thị thiết bị tiện ích mới trên khắp Bắc Mỹ.", "contracts-marketing", ["market a product", "target market", "market penetration"], { noun: "marketing" }),
  word("tvw-persuade", "persuade", "/pɚˈsweɪd/", "verb", "thuyết phục (bằng lý lẽ)", "Advertisements aim to persuade consumers to buy eco-friendly soap.", "Quảng cáo hướng tới thuyết phục người tiêu dùng mua xà phòng thân thiện môi trường.", "contracts-marketing", ["persuade someone to", "persuasive tone", "attempt to persuade"], { noun: "persuasion", adjective: "persuasive" }),
  word("tvw-productive", "productive", "/prəˈdʌk.tɪv/", "adjective", "năng suất, hữu ích", "The brainstorming meeting yielded several highly productive ideas.", "Cuộc họp lấy ý kiến đã mang lại nhiều ý tưởng rất hữu ích.", "contracts-marketing", ["productive meeting", "highly productive", "productive workforce"], { noun: "productivity" }),
  word("tvw-satisfaction", "satisfaction", "/ˌsæt̬.ɪsˈfæk.ʃən/", "noun", "sự thỏa mãn, hài lòng", "Our company surveys highlight superior client satisfaction rates.", "Các khảo sát công ty chúng tôi làm nổi bật tỷ lệ khách hàng hài lòng vượt trội.", "contracts-marketing", ["customer satisfaction", "guarantee satisfaction", "express satisfaction"], { verb: "satisfy" }),
  word("tvw-current", "currently", "/ˈkɝː.ənt.li/", "adverb", "hiện tại, hiện nay", "The product is currently out of stock nationwide.", "Sản phẩm hiện đang tạm hết hàng trên toàn quốc.", "contracts-marketing", ["currently available", "currently underway", "currently under review"], { adjective: "current" }),
  word("tvw-brand-rep", "reputation", "/ˌrep.jəˈteɪ.ʃən/", "noun", "danh tiếng, uy tín", "A sterling brand reputation is an invaluable intangible asset.", "Danh tiếng thương hiệu xuất sắc là tài sản vô hình vô giá.", "contracts-marketing", ["build a reputation", "sterling reputation", "damage one's reputation"], { adjective: "reputable" }),
];

const tv1Exercises: VocabExercise[] = [
  vq("tv1e-001", "meaning_match", "\"abide by\" có nghĩa là gì?", ["hủy bỏ hợp đồng", "tuân thủ / tôn trọng thỏa thuận", "tranh chấp quyền lợi", "thuyết phục khách hàng"], 1, "Abide by = tuân theo, làm đúng cam kết.", "tvw-abide"),
  vq("tv1e-002", "meaning_match", "\"provision\" trong hợp đồng có nghĩa là gì?", ["chi phí phát sinh", "điều khoản quy định", "người làm chứng", "thời gian ân hạn"], 1, "Provision = điều khoản trong hợp đồng/văn bản pháp lý.", "tvw-provision"),
  vq("tv1e-003", "meaning_match", "\"obligate\" có nghĩa là gì?", ["cho phép tự do", "bắt buộc theo nghĩa vụ", "thương lượng giá cả", "từ chối giải quyết"], 1, "Obligate = ràng buộc, bắt buộc ai đó làm gì.", "tvw-obligate"),
  vq("tv1e-004", "meaning_match", "\"fad\" có nghĩa là gì?", ["chiến lược dài hạn", "mốt nhất thời / trào lưu ngắn hạn", "thương hiệu nổi tiếng", "sự bảo đảm chất lượng"], 1, "Fad = trào lưu sốt dẻo nhưng nhanh thoái trào.", "tvw-fad"),
  vq("tv1e-005", "meaning_match", "\"persuade\" có nghĩa là gì?", ["nghiên cứu thị trường", "thuyết phục", "cạnh tranh", "ký kết"], 1, "Persuade = thuyết phục người khác làm gì.", "tvw-persuade"),
  vq("tv1e-006", "meaning_match", "\"resolve\" có nghĩa là gì?", ["làm gia tăng căng thẳng", "giải quyết tranh chấp / vấn đề", "từ bỏ hợp đồng", "chậm thanh toán"], 1, "Resolve = giải quyết triệt để một mâu thuẫn hay khó khăn.", "tvw-resolve"),
  vq("tv1e-007", "meaning_match", "\"party\" trong hợp đồng kinh tế chỉ cái gì?", ["bữa tiệc liên hoan", "bên tham gia ký kết", "đối thủ cạnh tranh", "cơ quan thuế"], 1, "Contracting party = bên tham gia ký kết thỏa thuận.", "tvw-party"),
  vq("tv1e-008", "meaning_match", "\"assurance\" có nghĩa là gì?", ["sự cam đoan, bảo đảm chắc chắn", "lời cảnh báo", "hạn chót nộp đơn", "phí phạt vi phạm"], 0, "Assurance = sự bảo đảm tin cậy.", "tvw-assurance"),
  vq("tv1e-009", "meaning_match", "\"competition\" có nghĩa là gì?", ["sự cạnh tranh", "sự hợp tác", "sự hủy hợp đồng", "người tiêu dùng"], 0, "Competition = cuộc cạnh tranh / đối thủ trên thị trường.", "tvw-competition"),
  vq("tv1e-010", "meaning_match", "\"reputation\" có nghĩa là gì?", ["chiết khấu thương mại", "danh tiếng / uy tín", "chi phí quảng cáo", "điều khoản bảo hiểm"], 1, "Reputation = uy tín và danh tiếng.", "tvw-brand-rep"),
  vq("tv1e-011", "sentence_completion", "Both signatories agreed to strictly _____ by the arbitration committee's decision.", ["abide", "consume", "inspire", "market"], 0, "Abide by = tuân thủ quyết định.", "tvw-abide"),
  vq("tv1e-012", "sentence_completion", "The confidentiality _____ prohibits employees from disclosing proprietary technology.", ["provision", "fad", "party", "assurance"], 0, "Confidentiality provision = điều khoản bảo mật.", "tvw-provision"),
  vq("tv1e-013", "sentence_completion", "The salesperson managed to _____ the client to sign a three-year maintenance service deal.", ["persuade", "abide", "resolve", "establish"], 0, "Persuade someone to do something = thuyết phục ai làm gì.", "tvw-persuade"),
  vq("tv1e-014", "sentence_completion", "Fierce market _____ forced smartphone makers to innovate camera features continuously.", ["competition", "cancellation", "provision", "assurance"], 0, "Market competition = sự cạnh tranh thị trường.", "tvw-competition"),
  vq("tv1e-015", "sentence_completion", "The two firms hired an independent mediator to amicably _____ their licensing disagreement.", ["resolve", "consume", "abide", "inspire"], 0, "Resolve disagreement = giải quyết mâu thuẫn.", "tvw-resolve"),
];

export const tvLesson1: VocabLesson = {
  id: "s2-vocab-01",
  stage: "intermediate",
  order: 7,
  titleVi: "Từ vựng: Hợp đồng & Tiếp thị",
  titleEn: "Vocabulary: Contracts & Marketing",
  category: "vocabulary",
  topic: "contracts-marketing",
  words: tv1Words,
  exercises: tv1Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// TV2: Warranties & Business Planning
// ═══════════════════════════════════════════════════════════════════

const tv2Words: VocabWord[] = [
  word("tvw-characteristic", "characteristic", "/ˌker.ək.təˈrɪs.tɪk/", "noun", "đặc tính, nét đặc trưng", "High durability is a key characteristic of this industrial conveyor.", "Độ bền cao là đặc tính then chốt của băng chuyền công nghiệp này.", "warranties-planning", ["defining characteristic", "key characteristic", "characteristic of"], { adjective: "characteristic" }),
  word("tvw-consequence", "consequence", "/ˈkɑːn.sə.kwəns/", "noun", "hậu quả, hệ quả", "Failure to deliver by the contractual date carries legal consequences.", "Giao hàng không đúng hạn hợp đồng sẽ dẫn đến các hệ quả pháp lý.", "warranties-planning", ["as a consequence", "serious consequence", "face the consequences"], { adjective: "consequent", adverb: "consequently" }),
  word("tvw-consider", "consider", "/kənˈsɪd.ɚ/", "verb", "cân nhắc, xem xét kỹ", "We must consider all financial risks before expanding overseas.", "Chúng ta phải cân nhắc mọi rủi ro tài chính trước khi mở rộng ra nước ngoài.", "warranties-planning", ["carefully consider", "consider options", "consider taking"], { noun: "consideration" }),
  word("tvw-cover", "cover", "/ˈkʌv.ɚ/", "verb", "chi trả, bao gồm (bảo hiểm)", "The warranty covers parts replacement and labor costs for two years.", "Bảo hành chi trả thay thế linh kiện và tiền công thợ trong hai năm.", "warranties-planning", ["cover the cost", "cover expenses", "comprehensively cover"], { noun: "coverage" }),
  word("tvw-expiration", "expiration", "/ˌek.spəˈreɪ.ʃən/", "noun", "sự hết hạn", "Please renew your business license prior to its expiration date.", "Vui lòng gia hạn giấy phép kinh doanh trước ngày hết hạn của nó.", "warranties-planning", ["expiration date", "approach expiration", "upon expiration"], { verb: "expire" }),
  word("tvw-frequently", "frequently", "/ˈfriː.kwənt.li/", "adverb", "thường xuyên", "High-traffic machinery requires frequently scheduled lubrication checks.", "Máy móc hoạt động tần suất cao đòi hỏi kiểm tra bôi trơn thường xuyên.", "warranties-planning", ["occur frequently", "frequently asked questions", "frequently used"], { adjective: "frequent" }),
  word("tvw-imply", "imply", "/ɪmˈplaɪ/", "verb", "ngụ ý, hàm ý", "The wording in the promotional brochure implies unconditional replacement.", "Từ ngữ trong tập gấp quảng cáo hàm ý sự đổi mới vô điều kiện.", "warranties-planning", ["imply that", "strongly imply", "implied warranty"], { noun: "implication" }),
  word("tvw-promise", "promise", "/ˈprɑː.mɪs/", "noun", "lời hứa, cam kết", "The manufacturer kept its promise to refund dissatisfied buyers.", "Nhà sản xuất đã giữ đúng cam kết hoàn tiền cho người mua không hài lòng.", "warranties-planning", ["keep a promise", "break a promise", "make a promise"], { verb: "promise" }),
  word("tvw-protect", "protect", "/prəˈtekt/", "verb", "bảo vệ", "An extended service plan protects consumers against sudden breakdowns.", "Gói dịch vụ mở rộng bảo vệ người tiêu dùng khỏi sự cố hư hỏng bất ngờ.", "warranties-planning", ["protect against", "protect consumer rights", "protect confidential data"], { noun: "protection", adjective: "protective" }),
  word("tvw-reputation", "reputation", "/ˌrep.jəˈteɪ.ʃən/", "noun", "uy tín thương hiệu", "A solid track record of warranty service builds brand reputation.", "Lịch sử dịch vụ bảo hành chu đáo gây dựng uy tín cho thương hiệu.", "warranties-planning", ["good reputation", "solid reputation", "tarnish a reputation"]),
  word("tvw-require", "require", "/rɪˈkwaɪr/", "verb", "đòi hỏi, yêu cầu", "The guarantee requires customers to keep their original purchase invoice.", "Giấy bảo đảm yêu cầu khách hàng phải giữ lại hóa đơn mua ban đầu.", "warranties-planning", ["require proof", "strictly require", "legally require"], { noun: "requirement" }),
  word("tvw-variety", "variety", "/vəˈraɪ.ə.t̬i/", "noun", "sự đa dạng", "The store stocks a wide variety of replacement vehicle components.", "Cửa hàng dự trữ đa dạng các loại linh kiện xe thay thế.", "warranties-planning", ["wide variety of", "variety of options", "infinite variety"], { adjective: "various", verb: "vary" }),
  word("tvw-address", "address", "/əˈdres/", "verb", "giải quyết, xử lý (vấn đề)", "The strategic session addressed supply chain vulnerabilities.", "Phiên họp chiến lược đã giải quyết các lỗ hổng chuỗi cung ứng.", "warranties-planning", ["address an issue", "address concerns", "address a problem"]),
  word("tvw-avoid", "avoid", "/əˈvɔɪd/", "verb", "tránh, né tránh", "Prudent planning helps businesses avoid cash flow deficits.", "Lập kế hoạch cẩn trọng giúp doanh nghiệp tránh tình trạng thâm hụt dòng tiền.", "warranties-planning", ["avoid mistakes", "avoid risks", "avoid unnecessary costs"], { adjective: "avoidable" }),
  word("tvw-demonstrate", "demonstrate", "/ˈdem.ən.streɪt/", "verb", "chứng minh, thị phạm", "The pilot test clearly demonstrated the software's scalability.", "Thử nghiệm tiền khả thi đã chứng minh rõ ràng khả năng mở rộng của phần mềm.", "warranties-planning", ["demonstrate competence", "demonstrate effectiveness", "clearly demonstrate"], { noun: "demonstration" }),
  word("tvw-develop", "develop", "/dɪˈvel.əp/", "verb", "phát triển (kế hoạch, sản phẩm)", "R&D engineers developed a breakthrough composite polymer.", "Các kỹ sư R&D đã phát triển một loại polymer composite đột phá.", "warranties-planning", ["develop a plan", "develop a strategy", "develop products"], { noun: "development" }),
  word("tvw-evaluate", "evaluate", "/ɪˈvæl.ju.eɪt/", "verb", "đánh giá, thẩm định", "Analysts evaluate quarterly earnings to recommend portfolio moves.", "Các chuyên gia phân tích thẩm định lợi nhuận quý để tư vấn danh mục đầu tư.", "warranties-planning", ["evaluate performance", "evaluate options", "carefully evaluate"], { noun: "evaluation" }),
  word("tvw-gather", "gather", "/ˈɡæð.ɚ/", "verb", "thu thập (thông tin, dữ liệu)", "Market specialists gathered extensive feedback from focus panels.", "Các chuyên gia thị trường đã thu thập phản hồi sâu rộng từ các nhóm trọng tâm.", "warranties-planning", ["gather information", "gather data", "gather evidence"]),
  word("tvw-offer", "offer", "/ˈɑː.fɚ/", "verb", "cung cấp, đưa ra", "The consulting group offers tailored strategic advice for startups.", "Nhóm tư vấn cung cấp lời khuyên chiến lược may đo cho các công ty khởi nghiệp.", "warranties-planning", ["offer assistance", "offer services", "special offer"], { noun: "offer" }),
  word("tvw-primarily", "primarily", "/praɪˈmer.əl.i/", "adverb", "chủ yếu, căn bản", "Our corporate expansion is primarily targeted at European markets.", "Chiến lược mở rộng của công ty chủ yếu nhắm vào thị trường châu Âu.", "warranties-planning", ["primarily focus on", "primarily responsible for", "serve primarily as"], { adjective: "primary" }),
  word("tvw-risk", "risk", "/rɪsk/", "noun", "rủi ro", "Every entrepreneurial endeavor entails calculated commercial risks.", "Mọi nỗ lực kinh doanh đều đi kèm những rủi ro thương mại đã được tính toán.", "warranties-planning", ["take a risk", "financial risk", "risk management"], { adjective: "risky" }),
  word("tvw-strategy", "strategy", "/ˈstræt̬.ə.dʒi/", "noun", "chiến lược", "Management outlined a multi-phase corporate growth strategy.", "Ban quản lý đã vạch ra chiến lược tăng trưởng doanh nghiệp nhiều giai đoạn.", "warranties-planning", ["business strategy", "marketing strategy", "develop a strategy"], { adjective: "strategic" }),
  word("tvw-strong", "strong", "/strɑːŋ/", "adjective", "mạnh mẽ, kiên định", "The firm maintains a strong balance sheet with negligible debt.", "Công ty duy trì bảng cân đối kế toán mạnh mẽ với nợ vay không đáng kể.", "warranties-planning", ["strong performance", "strong demand", "strong position"]),
  word("tvw-substitute", "substitute", "/ˈsʌb.stə.tuːt/", "noun", "vật thay thế, phương án thay thế", "There is no satisfactory substitute for rigorous quality control.", "Không có vật thay thế nào thỏa đáng cho việc kiểm soát chất lượng khắt khe.", "warranties-planning", ["substitute product", "act as a substitute", "acceptable substitute"], { verb: "substitute" }),
  word("tvw-annual-plan", "forecast", "/ˈfɔːr.kæst/", "noun", "dự báo kinh doanh", "Management revised its annual revenue forecast upward by five percent.", "Ban giám đốc đã điều chỉnh dự báo doanh thu hàng năm tăng thêm năm phần trăm.", "warranties-planning", ["sales forecast", "economic forecast", "accurate forecast"], { verb: "forecast" }),
];

const tv2Exercises: VocabExercise[] = [
  vq("tv2e-001", "meaning_match", "\"expiration\" có nghĩa là gì?", ["sự hết hạn / mãn hạn", "sự khởi công", "sự sửa chữa", "sự đầu tư"], 0, "Expiration = ngày hết hạn, sự chấm dứt hiệu lực.", "tvw-expiration"),
  vq("tv2e-002", "meaning_match", "\"consequence\" có nghĩa là gì?", ["nguyên nhân khởi nguồn", "hậu quả / hệ quả", "sự đồng thuận", "khoản tiền thưởng"], 1, "Consequence = kết quả hoặc hậu quả của một hành động.", "tvw-consequence"),
  vq("tv2e-003", "meaning_match", "\"substitute\" có nghĩa là gì?", ["vật thay thế / phương án thế chỗ", "hàng chính hãng", "sản phẩm tồn kho", "lời cam kết"], 0, "Substitute = sản phẩm hay giải pháp thay thế.", "tvw-substitute"),
  vq("tv2e-004", "meaning_match", "\"address\" với tư cách động từ có nghĩa là gì?", ["ghi địa chỉ lên thư", "giải quyết / xử lý vấn đề", "từ chối can thiệp", "giao hàng đến nơi"], 1, "Address an issue/problem = tập trung giải quyết vấn đề.", "tvw-address"),
  vq("tv2e-005", "meaning_match", "\"demonstrate\" có nghĩa là gì?", ["chứng minh / thị phạm", "che giấu thông tin", "hoãn lại cuộc họp", "lập hóa đơn"], 0, "Demonstrate = chứng minh, làm rõ bằng thực tế.", "tvw-demonstrate"),
  vq("tv2e-006", "meaning_match", "\"imply\" có nghĩa là gì?", ["tuyên bố công khai", "ngụ ý / hàm ý", "phủ nhận hoàn toàn", "ký cam kết"], 1, "Imply = ngụ ý, hàm chỉ điều gì gián tiếp.", "tvw-imply"),
  vq("tv2e-007", "meaning_match", "\"primarily\" có nghĩa là gì?", ["chủ yếu, trước hết", "hiếm khi", "hoàn toàn ngẫu nhiên", "sau cùng"], 0, "Primarily = căn bản, chủ yếu là.", "tvw-primarily"),
  vq("tv2e-008", "meaning_match", "\"strategy\" có nghĩa là gì?", ["chiến lược", "chi phí định kỳ", "nhân viên kỹ thuật", "hợp đồng thử nghiệm"], 0, "Strategy = kế hoạch chiến lược tổng thể.", "tvw-strategy"),
  vq("tv2e-009", "meaning_match", "\"characteristic\" có nghĩa là gì?", ["đặc tính / nét tiêu biểu", "khuyết điểm lớn", "sự nhượng bộ", "ngày khởi hành"], 0, "Characteristic = đặc trưng, phẩm chất tiêu biểu.", "tvw-characteristic"),
  vq("tv2e-010", "meaning_match", "\"evaluate\" có nghĩa là gì?", ["tính toán sai số", "đánh giá / thẩm định", "vứt bỏ chất thải", "cài đặt hệ thống"], 1, "Evaluate = đánh giá cẩn thận chất lượng, năng lực.", "tvw-evaluate"),
  vq("tv2e-011", "sentence_completion", "The warranty does not _____ accidental physical damage caused by drops.", ["cover", "promise", "imply", "gather"], 0, "Warranty covers = bảo hành chi trả/áp dụng cho.", "tvw-cover"),
  vq("tv2e-012", "sentence_completion", "You should return the defective coffee maker prior to the warranty's _____ date.", ["expiration", "substitute", "consequence", "strategy"], 0, "Expiration date = ngày hết hạn.", "tvw-expiration"),
  vq("tv2e-013", "sentence_completion", "During the annual review, executives will _____ the chief executive's operational performance.", ["evaluate", "imply", "avoid", "protect"], 0, "Evaluate performance = đánh giá hiệu suất làm việc.", "tvw-evaluate"),
  vq("tv2e-014", "sentence_completion", "The CEO called an emergency meeting to _____ escalating client service complaints.", ["address", "imply", "substitute", "expire"], 0, "Address complaints = giải quyết các khiếu nại.", "tvw-address"),
  vq("tv2e-015", "sentence_completion", "A comprehensive business _____ must identify target demographics and market obstacles.", ["strategy", "expiration", "substitute", "consequence"], 0, "Business strategy = chiến lược kinh doanh.", "tvw-strategy"),
];

export const tvLesson2: VocabLesson = {
  id: "s2-vocab-02",
  stage: "intermediate",
  order: 8,
  titleVi: "Từ vựng: Bảo hành & Kế hoạch Kinh doanh",
  titleEn: "Vocabulary: Warranties & Business Planning",
  category: "vocabulary",
  topic: "warranties-planning",
  words: tv2Words,
  exercises: tv2Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// TV3: Conferences & Computers
// ═══════════════════════════════════════════════════════════════════

const tv3Words: VocabWord[] = [
  word("tvw-accommodate", "accommodate", "/əˈkɑː.mə.deɪt/", "verb", "đáp ứng, chứa được", "The main auditorium can easily accommodate up to five hundred guests.", "Hội trường chính có thể chứa tới năm trăm khách dễ dàng.", "conferences-computers", ["accommodate needs", "accommodate guests", "accommodate changes"], { noun: "accommodation" }),
  word("tvw-arrangement", "arrangement", "/əˈreɪndʒ.mənt/", "noun", "sự sắp xếp, bố trí", "Travel and lodging arrangements have been finalized for speakers.", "Các sắp xếp đi lại và ăn nghỉ cho diễn giả đã được hoàn tất.", "conferences-computers", ["make arrangements", "seating arrangement", "travel arrangement"], { verb: "arrange" }),
  word("tvw-association", "association", "/əˌsoʊ.siˈeɪ.ʃən/", "noun", "hiệp hội, hội đồng", "She was elected president of the International Translators Association.", "Cô ấy được bầu làm chủ tịch Hiệp hội Dịch thuật Quốc tế.", "conferences-computers", ["trade association", "professional association", "in association with"], { verb: "associate" }),
  word("tvw-attendee", "attendee", "/əˌtenˈdiː/", "noun", "người tham dự", "Over eight hundred attendees registered for the technical summit.", "Hơn tám trăm người tham dự đã đăng ký hội nghị thượng đỉnh kỹ thuật.", "conferences-computers", ["conference attendee", "registered attendee", "welcome attendees"], { verb: "attend", noun: "attendance" }),
  word("tvw-get-in-touch", "get in touch", "/ɡet ɪn tʌtʃ/", "verb", "liên lạc, kết nối", "Please get in touch with the registration desk for credentials.", "Vui lòng liên hệ với bàn đăng ký để nhận thẻ chứng nhận.", "conferences-computers", ["get in touch with", "keep in touch", "stay in touch"]),
  word("tvw-hold", "hold", "/hoʊld/", "verb", "tổ chức (hội nghị, sự kiện)", "The symposium will be held at the convention center in Tokyo.", "Hội nghị chuyên đề sẽ được tổ chức tại trung tâm hội nghị ở Tokyo.", "conferences-computers", ["hold a meeting", "hold a conference", "hold an event"]),
  word("tvw-location-s2", "location", "/loʊˈkeɪ.ʃən/", "noun", "địa điểm diễn ra", "Organizers picked a downtown hotel as the central conference location.", "Ban tổ chức đã chọn khách sạn trung tâm làm địa điểm hội nghị chính.", "conferences-computers", ["convenient location", "central location", "remote location"]),
  word("tvw-overcrowded", "overcrowded", "/ˌoʊ.vɚˈkraʊ.dɪd/", "adjective", "quá đông đúc, quá tải", "The keynote hall was overcrowded, so overflow rooms were opened.", "Phòng phát biểu chính quá đông, vì vậy các phòng phụ đã được mở.", "conferences-computers", ["overcrowded room", "become overcrowded", "overcrowded venue"]),
  word("tvw-register", "register", "/ˈredʒ.ə.stɚ/", "verb", "đăng ký", "Delegates can register online until twenty-four hours before kickoff.", "Đại biểu có thể đăng ký trực tuyến trước giờ khai mạc hai mươi tư tiếng.", "conferences-computers", ["register online", "register for a workshop", "register in advance"], { noun: "registration" }),
  word("tvw-select", "select", "/səˈlekt/", "verb", "chọn lựa kỹ càng", "A panel of peers selected twelve papers for publication.", "Hội đồng chuyên môn đã chọn ra mười hai bài báo để công bố.", "conferences-computers", ["carefully select", "select candidates", "select a venue"], { noun: "selection" }),
  word("tvw-session", "session", "/ˈseʃ.ən/", "noun", "phiên họp, buổi hội thảo", "The afternoon breakout session focuses on cloud data architecture.", "Phiên họp nhánh buổi chiều tập trung vào kiến trúc dữ liệu đám mây.", "conferences-computers", ["breakout session", "morning session", "Q&A session"]),
  word("tvw-take-part", "take part in", "/teɪk pɑːrt ɪn/", "verb", "tham gia vào", "Engineers from twenty countries took part in the panel debate.", "Các kỹ sư từ hai mươi quốc gia đã tham gia vào buổi tranh luận của hội đồng.", "conferences-computers", ["take part in discussions", "take part in a conference", "actively take part"]),
  word("tvw-allocate", "allocate", "/ˈæl.ə.keɪt/", "verb", "phân bổ (tài nguyên, ngân sách)", "The system administrator allocated additional server memory.", "Quản trị viên hệ thống đã phân bổ thêm bộ nhớ máy chủ.", "conferences-computers", ["allocate resources", "allocate funds", "allocate memory"], { noun: "allocation" }),
  word("tvw-compatible-it", "compatible", "/kəmˈpæt̬.ə.bəl/", "adjective", "tương thích", "Make certain the software is compatible with existing enterprise servers.", "Đảm bảo phần mềm tương thích với các máy chủ doanh nghiệp hiện tại.", "conferences-computers", ["compatible with", "backward compatible", "fully compatible"], { noun: "compatibility" }),
  word("tvw-delete", "delete", "/dɪˈliːt/", "verb", "xóa bỏ", "Accidentally deleted files can be restored from the nightly backup.", "Các tệp vô tình bị xóa có thể được khôi phục từ bản sao lưu ban đêm.", "conferences-computers", ["permanently delete", "delete files", "delete an account"]),
  word("tvw-display", "display", "/dɪˈspleɪ/", "verb", "hiển thị", "The high-resolution dashboard displays real-time telemetry.", "Bảng điều khiển độ phân giải cao hiển thị số liệu đo lường thời gian thực.", "conferences-computers", ["display data", "display an error", "on display"], { noun: "display" }),
  word("tvw-duplicate", "duplicate", "/ˈduː.plə.keɪt/", "verb", "nhân bản, sao chép", "Do not duplicate internal encryption keys without authorization.", "Không được sao chép các khóa mã hóa nội bộ khi chưa được phép.", "conferences-computers", ["duplicate a file", "duplicate records", "create a duplicate"], { noun: "duplicate" }),
  word("tvw-failure", "failure", "/ˈfeɪ.ljɚ/", "noun", "sự hỏng hóc, thất bại", "A cooling system failure forced the server farm to shut down.", "Sự cố hệ thống làm mát buộc trang trại máy chủ phải dừng hoạt động.", "conferences-computers", ["hardware failure", "system failure", "power failure"], { verb: "fail" }),
  word("tvw-figure-out", "figure out", "/ˈfɪɡ.jɚ aʊt/", "verb", "tìm ra, hiểu ra", "Technicians figured out why the database response latency spiked.", "Các kỹ thuật viên đã tìm ra lý do độ trễ phản hồi cơ sở dữ liệu tăng vọt.", "conferences-computers", ["figure out a solution", "figure out how to", "figure out the problem"]),
  word("tvw-ignore", "ignore", "/ɪɡˈnɔːr/", "verb", "bỏ qua, phớt lờ", "Never ignore operating system security alert notifications.", "Đừng bao giờ phớt lờ các thông báo cảnh báo bảo mật của hệ điều hành.", "conferences-computers", ["ignore warnings", "ignore an error", "completely ignore"]),
  word("tvw-search", "search", "/sɜːrtʃ/", "verb", "tìm kiếm", "Use Boolean operators to search internal knowledge bases efficiently.", "Sử dụng các toán tử Boolean để tìm kiếm cơ sở tri thức nội bộ hiệu quả.", "conferences-computers", ["search for data", "search engine", "conduct a search"], { noun: "search" }),
  word("tvw-shut-down", "shut down", "/ʃʌt daʊn/", "verb", "tắt máy, dừng hoạt động", "Remember to shut down your workstation before leaving the office.", "Nhớ tắt máy trạm của bạn trước khi rời khỏi văn phòng.", "conferences-computers", ["shut down a computer", "emergency shut down", "safely shut down"]),
  word("tvw-warning", "warning", "/ˈwɔːr.nɪŋ/", "noun", "lời cảnh báo", "The server sent an automated warning when disk storage fell below ten percent.", "Máy chủ đã gửi cảnh báo tự động khi dung lượng ổ đĩa xuống dưới mười phần trăm.", "conferences-computers", ["warning message", "issue a warning", "early warning"], { verb: "warn" }),
  word("tvw-access-comp", "access", "/ˈæk.ses/", "verb", "truy cập vào hệ thống", "Employees can access corporate email remotely using VPN protocols.", "Nhân viên có thể truy cập email công ty từ xa bằng giao thức VPN.", "conferences-computers", ["gain access", "access files", "unauthorized access"]),
  word("tvw-network-comp", "network", "/ˈnet.wɜːrk/", "noun", "mạng máy tính", "The wireless network was configured with enterprise WPA3 encryption.", "Mạng không dây đã được cấu hình với mã hóa WPA3 cấp doanh nghiệp.", "conferences-computers", ["secure network", "network bandwidth", "network connection"]),
];

const tv3Exercises: VocabExercise[] = [
  vq("tv3e-001", "meaning_match", "\"accommodate\" có nghĩa là gì?", ["từ chối tiếp nhận", "đáp ứng nhu cầu / chứa được", "hủy bỏ cuộc họp", "phân bổ ngân sách"], 1, "Accommodate = đáp ứng nhu cầu hoặc có đủ chỗ cho ai.", "tvw-accommodate"),
  vq("tv3e-002", "meaning_match", "\"attendee\" có nghĩa là gì?", ["người tham dự", "diễn giả chính", "người phục vụ bàn", "thợ sửa máy"], 0, "Attendee = người tham gia hội nghị, sự kiện.", "tvw-attendee"),
  vq("tv3e-003", "meaning_match", "\"allocate\" có nghĩa là gì?", ["xóa bỏ hoàn toàn", "phân bổ tài nguyên / ngân sách", "sao chép tài liệu", "phớt lờ cảnh báo"], 1, "Allocate = phân phát, cấp phát tài nguyên cho mục đích cụ thể.", "tvw-allocate"),
  vq("tv3e-004", "meaning_match", "\"figure out\" có nghĩa là gì?", ["tìm ra cách giải quyết", "bỏ qua không xử lý", "tắt nguồn máy tính", "đăng ký vé"], 0, "Figure out = suy nghĩ và tìm ra lời giải cho vấn đề.", "tvw-figure-out"),
  vq("tv3e-005", "meaning_match", "\"shut down\" có nghĩa là gì?", ["khởi động lại", "tắt hoàn toàn / dừng vận hành", "nâng cấp phần mềm", "sao lưu dữ liệu"], 1, "Shut down = ngắt nguồn, tắt máy móc hệ thống.", "tvw-shut-down"),
  vq("tv3e-006", "meaning_match", "\"overcrowded\" có nghĩa là gì?", ["quá đông đúc / quá tải", "vắng vẻ, hoang sơ", "tiện nghi sang trọng", "tương thích cao"], 0, "Overcrowded = quá đông người so với sức chứa.", "tvw-overcrowded"),
  vq("tv3e-007", "meaning_match", "\"session\" có nghĩa là gì?", ["vé vào cửa", "phiên làm việc / phiên họp", "thông báo cảnh báo", "hội trường chính"], 1, "Session = một phiên hoặc một buổi họp trong chuỗi chương trình.", "tvw-session"),
  vq("tv3e-008", "meaning_match", "\"duplicate\" có nghĩa là gì?", ["tạo bản sao / nhân bản", "xóa vĩnh viễn", "tắt máy tính", "đăng ký tham gia"], 0, "Duplicate = sao chép thêm một bản tương tự.", "tvw-duplicate"),
  vq("tv3e-009", "meaning_match", "\"get in touch\" có nghĩa là gì?", ["giữ khoảng cách", "liên lạc / kết nối với ai", "trì hoãn thanh toán", "khen ngợi thành tích"], 1, "Get in touch with = liên hệ, giữ liên lạc với ai.", "tvw-get-in-touch"),
  vq("tv3e-010", "meaning_match", "\"arrangement\" có nghĩa là gì?", ["sự sắp đặt, dàn xếp", "sự hỏng hóc", "đặc tính tiêu biểu", "điều khoản bắt buộc"], 0, "Arrangement = các kế hoạch hoặc sự sắp xếp trước.", "tvw-arrangement"),
  vq("tv3e-011", "sentence_completion", "The convention hall was so large that it could easily _____ over two thousand guests.", ["accommodate", "delete", "ignore", "shut down"], 0, "Accommodate guests = có đủ chỗ chứa khách.", "tvw-accommodate"),
  vq("tv3e-012", "sentence_completion", "Conference _____ are invited to complete an online survey to give feedback on speakers.", ["attendees", "failures", "arrangements", "sessions"], 0, "Conference attendees = người tham dự hội nghị.", "tvw-attendee"),
  vq("tv3e-013", "sentence_completion", "The IT director decided to _____ forty percent of server bandwidth to the database cluster.", ["allocate", "ignore", "accommodate", "register"], 0, "Allocate bandwidth = phân bổ băng thông.", "tvw-allocate"),
  vq("tv3e-014", "sentence_completion", "Our IT technicians worked through the night to _____ the cause of the network outage.", ["figure out", "shut down", "take part in", "get in touch"], 0, "Figure out the cause = tìm ra nguyên nhân.", "tvw-figure-out"),
  vq("tv3e-015", "sentence_completion", "If you receive a security _____ message on your computer, alert the helpdesk promptly.", ["warning", "attendee", "session", "location"], 0, "Security warning message = thông báo cảnh báo bảo mật.", "tvw-warning"),
];

export const tvLesson3: VocabLesson = {
  id: "s2-vocab-03",
  stage: "intermediate",
  order: 9,
  titleVi: "Từ vựng: Hội nghị & Máy tính",
  titleEn: "Vocabulary: Conferences & Computers",
  category: "vocabulary",
  topic: "conferences-computers",
  words: tv3Words,
  exercises: tv3Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// TV4: Office Technology & Procedures
// ═══════════════════════════════════════════════════════════════════

const tv4Words: VocabWord[] = [
  word("tvw-affordable", "affordable", "/əˈfɔːr.də.bəl/", "adjective", "giá cả phải chăng, vừa túi tiền", "The vendor offers affordable monthly subscription plans for SMBs.", "Nhà cung cấp đưa ra các gói đăng ký tháng vừa túi tiền cho các doanh nghiệp vừa và nhỏ.", "office-procedures", ["affordable price", "affordable housing", "highly affordable"], { verb: "afford" }),
  word("tvw-as-needed", "as needed", "/æz ˈniː.dɪd/", "adverb", "khi cần thiết", "Consumables like toner and paper are replenished on an as-needed basis.", "Vật tư tiêu hao như mực và giấy được bổ sung khi có nhu cầu phát sinh.", "office-procedures", ["order as needed", "use as needed", "available as needed"]),
  word("tvw-be-in-charge", "be in charge of", "/biː ɪn tʃɑːrdʒ ʌv/", "verb", "chịu trách nhiệm về, phụ trách", "Mr. Alvarez is in charge of office supply procurement.", "Ông Alvarez chịu trách nhiệm thu mua đồ dùng văn phòng.", "office-procedures", ["take charge of", "directly in charge", "person in charge"]),
  word("tvw-capacity", "capacity", "/kəˈpæs.ə.t̬i/", "noun", "công suất, sức chứa", "The commercial scanner operates at maximum capacity during tax season.", "Máy quét thương mại hoạt động hết công suất trong mùa quyết toán thuế.", "office-procedures", ["operating capacity", "maximum capacity", "storage capacity"]),
  word("tvw-durable", "durable", "/ˈdʊr.ə.bəl/", "adjective", "bền bỉ, dùng được lâu", "Ergonomic chairs are crafted with highly durable synthetic fabrics.", "Ghế công thái học được chế tạo bằng các loại vải tổng hợp cực kỳ bền bỉ.", "office-procedures", ["durable goods", "durable material", "long-lasting and durable"], { noun: "durability" }),
  word("tvw-initiative", "initiative", "/ɪˈnɪʃ.ə.t̬ɪv/", "noun", "sáng kiến, sự chủ động", "The sustainability committee launched a paperless office initiative.", "Ban phát triển bền vững đã phát động sáng kiến văn phòng không giấy tờ.", "office-procedures", ["take the initiative", "green initiative", "strategic initiative"], { verb: "initiate" }),
  word("tvw-physically", "physically", "/ˈfɪz.ɪ.kəl.i/", "adverb", "về mặt thể chất / vật lý", "Hardcopy contracts must be physically signed before witness notary.", "Hợp đồng bản cứng phải được ký trực tiếp trước sự chứng kiến của công chứng viên.", "office-procedures", ["physically present", "physically inspect", "physically fit"], { adjective: "physical" }),
  word("tvw-provider", "provider", "/prəˈvaɪ.dɚ/", "noun", "nhà cung cấp dịch vụ", "We negotiated a multi-year service agreement with our internet provider.", "Chúng tôi đã đàm phán thỏa thuận dịch vụ nhiều năm với nhà cung cấp internet.", "office-procedures", ["service provider", "healthcare provider", "solutions provider"], { verb: "provide" }),
  word("tvw-recur", "recur", "/rɪˈkɝː/", "verb", "tái diễn, lặp lại định kỳ", "Software glitch issues recurred despite repeated firmware updates.", "Trục trặc phần mềm tái diễn bất chấp việc cập nhật phần mềm liên tục.", "office-procedures", ["recur regularly", "problem recurs", "recurrent theme"], { noun: "recurrence", adjective: "recurrent" }),
  word("tvw-reduction", "reduction", "/rɪˈdʌk.ʃən/", "noun", "sự cắt giảm, giảm bớt", "Digitization achieved a forty percent reduction in stationery costs.", "Số hóa đã mang lại mức giảm bốn mươi phần trăm chi phí văn phòng phẩm.", "office-procedures", ["cost reduction", "price reduction", "substantial reduction"], { verb: "reduce" }),
  word("tvw-stay-on-top", "stay on top of", "/steɪ ɑːn tɑːp ʌv/", "verb", "nắm bắt tình hình, kiểm soát tốt", "Project managers must stay on top of pending deliverables.", "Các quản lý dự án phải nắm bắt chặt chẽ các sản phẩm sắp tới hạn bàn giao.", "office-procedures", ["stay on top of things", "stay on top of trends", "stay on top of work"]),
  word("tvw-stock", "stock", "/stɑːk/", "verb", "tích trữ hàng hóa, lưu kho", "The supply closet is fully stocked with pens, paper, and envelopes.", "Tủ vật tư được dự trữ đầy đủ bút, giấy và phong bì.", "office-procedures", ["in stock", "out of stock", "stock up on"], { noun: "stock" }),
  word("tvw-procedure", "procedure", "/prəˈsiː.dʒɚ/", "noun", "quy trình, thủ tục", "All staff members must follow established safety procedures.", "Mọi nhân viên đều phải tuân theo các quy trình an toàn đã thiết lập.", "office-procedures", ["standard procedure", "safety procedure", "operating procedure"], { adjective: "procedural" }),
  word("tvw-streamline", "streamline", "/ˈstriːm.laɪn/", "verb", "tinh gọn, tối ưu hóa", "Automation tools helped streamline the invoice approval workflow.", "Các công cụ tự động hóa đã giúp tinh gọn quy trình phê duyệt hóa đơn.", "office-procedures", ["streamline operations", "streamline processes", "streamline the workflow"]),
  word("tvw-appreciation", "appreciation", "/əˌpriː.ʃiˈeɪ.ʃən/", "noun", "sự trân trọng, đánh giá cao", "The CEO expressed deep appreciation for the team's weekend dedication.", "Tổng giám đốc bày tỏ sự trân trọng sâu sắc đối với sự tận tụy cuối tuần của toàn đội.", "office-procedures", ["show appreciation", "in appreciation of", "token of appreciation"], { verb: "appreciate" }),
  word("tvw-be-made-of", "be made of", "/biː meɪd ʌv/", "verb", "được làm từ", "These modular desks are made of recycled aluminum and bamboo.", "Những chiếc bàn lắp ghép này được làm từ nhôm tái chế và tre.", "office-procedures", ["be made of wood", "be made of durable materials", "be made of metal"]),
  word("tvw-bring-in", "bring in", "/brɪŋ ɪn/", "verb", "mang lại, thuê ngoài (chuyên gia)", "Management decided to bring in external consultants to revamp systems.", "Ban quản lý quyết định mời các chuyên gia tư vấn bên ngoài để cải tổ hệ thống.", "office-procedures", ["bring in revenue", "bring in experts", "bring in new talent"]),
  word("tvw-casually", "casually", "/ˈkæʒ.u.ə.li/", "adverb", "bình thường, không câu nệ", "Employees may dress casually on designated Friday workdays.", "Nhân viên có thể mặc trang phục thoải mái vào các ngày thứ Sáu theo quy định.", "office-procedures", ["dress casually", "mention casually", "chat casually"], { adjective: "casual" }),
  word("tvw-code", "code", "/koʊd/", "noun", "bộ quy tắc, quy chuẩn", "Every employee must sign the corporate ethical code of conduct.", "Mỗi nhân viên phải ký cam kết bộ quy tắc ứng xử đạo đức công ty.", "office-procedures", ["code of conduct", "dress code", "building code"]),
  word("tvw-expose", "expose", "/ɪkˈspoʊz/", "verb", "tiếp xúc, để lộ ra", "Interns are exposed to practical corporate accounting procedures.", "Các thực tập sinh được tiếp xúc với các quy trình kế toán doanh nghiệp thực tế.", "office-procedures", ["be exposed to", "expose confidential data", "expose to risks"], { noun: "exposure" }),
  word("tvw-glimpse", "glimpse", "/ɡlɪmps/", "noun", "cái nhìn thoáng qua", "The factory tour gave investors an exciting glimpse into automated assembly.", "Chuyến tham quan nhà máy đã cho các nhà đầu tư cái nhìn thoáng qua đầy hào hứng về dây chuyền tự động.", "office-procedures", ["catch a glimpse of", "give a glimpse into", "brief glimpse"]),
  word("tvw-outdated", "outdated", "/ˌaʊtˈdeɪ.t̬ɪd/", "adjective", "lỗi thời, lạc hậu", "The finance office replaced its outdated mainframe computer systems.", "Phòng tài chính đã thay thế các hệ thống máy tính lớn lỗi thời của mình.", "office-procedures", ["outdated technology", "outdated equipment", "become outdated"]),
  word("tvw-practice", "practice", "/ˈpræk.tɪs/", "noun", "thói quen, thông lệ", "Daily standup huddles are an established agile development practice.", "Họp nhanh hàng ngày là một thông lệ phát triển linh hoạt đã được thiết lập.", "office-procedures", ["best practice", "standard business practice", "put into practice"]),
  word("tvw-reinforce", "reinforce", "/ˌriː.ɪnˈfɔːrs/", "verb", "củng cố, tăng cường", "Safety posters serve to reinforce workplace compliance policies.", "Các áp phích an toàn giúp củng cố các chính sách tuân thủ nơi làm việc.", "office-procedures", ["reinforce a policy", "reinforce learning", "reinforce the message"], { noun: "reinforcement" }),
  word("tvw-verbally", "verbally", "/ˈvɝː.bəl.i/", "adverb", "bằng lời nói (thay vì văn bản)", "The supervisor verbally confirmed the shift change before sending email.", "Người giám sát đã xác nhận bằng lời về việc đổi ca trước khi gửi email.", "office-procedures", ["communicate verbally", "verbally agree", "verbally warned"], { adjective: "verbal" }),
];

const tv4Exercises: VocabExercise[] = [
  vq("tv4e-001", "meaning_match", "\"durable\" có nghĩa là gì?", ["dễ vỡ", "bền bỉ / dùng được lâu", "giá rẻ", "lỗi thời"], 1, "Durable = có khả năng chịu đựng hao mòn tốt, rất bền.", "tvw-durable"),
  vq("tv4e-002", "meaning_match", "\"outdated\" có nghĩa là gì?", ["hiện đại nhất", "lỗi thời, lạc hậu", "được ưa chuộng", "tiết kiệm năng lượng"], 1, "Outdated = không còn phù hợp với hiện tại, cũ kỹ.", "tvw-outdated"),
  vq("tv4e-003", "meaning_match", "\"initiative\" có nghĩa là gì?", ["sự trừng phạt", "sáng kiến / kế hoạch mới", "thủ tục thanh toán", "hóa đơn định kỳ"], 1, "Initiative = sáng kiến mới nhằm giải quyết một vấn đề.", "tvw-initiative"),
  vq("tv4e-004", "meaning_match", "\"be in charge of\" có nghĩa là gì?", ["phải trả tiền cho", "chịu trách nhiệm / phụ trách", "bị sa thải khỏi", "từ chối tham gia"], 1, "Be in charge of = phụ trách, nắm quyền quản lý.", "tvw-be-in-charge"),
  vq("tv4e-005", "meaning_match", "\"streamline\" có nghĩa là gì?", ["làm phức tạp thêm", "tinh gọn / tối ưu hóa quy trình", "kéo dài thời gian", "bỏ qua quy định"], 1, "Streamline = cải tiến để làm quy trình nhanh và hiệu quả hơn.", "tvw-streamline"),
  vq("tv4e-006", "meaning_match", "\"recur\" có nghĩa là gì?", ["chỉ xảy ra một lần", "tái diễn / lặp lại định kỳ", "kết thúc hoàn toàn", "đạt năng suất cao"], 1, "Recur = xảy ra lặp đi lặp lại.", "tvw-recur"),
  vq("tv4e-007", "meaning_match", "\"reinforce\" có nghĩa là gì?", ["cắt giảm nhân sự", "củng cố / tăng cường", "làm suy yếu", "bỏ qua cảnh báo"], 1, "Reinforce = làm cho mạnh hơn, vững chắc hơn.", "tvw-reinforce"),
  vq("tv4e-008", "meaning_match", "\"stay on top of\" có nghĩa là gì?", ["đứng trên đỉnh núi", "kiểm soát tốt / nắm bắt kịp thời", "đến muộn giờ làm", "từ chức đột ngột"], 1, "Stay on top of = theo sát, không để công việc bị tồn đọng.", "tvw-stay-on-top"),
  vq("tv4e-009", "meaning_match", "\"affordable\" có nghĩa là gì?", ["đắt đỏ ngoài tầm với", "giá cả vừa túi tiền, phải chăng", "miễn phí hoàn toàn", "kém chất lượng"], 1, "Affordable = mức giá hợp lý người mua chi trả được.", "tvw-affordable"),
  vq("tv4e-010", "meaning_match", "\"capacity\" có nghĩa là gì?", ["sức chứa / công suất hoạt động", "màu sắc thiết bị", "chi phí vận chuyển", "ngày hết hạn"], 0, "Capacity = khả năng chứa hoặc năng suất tối đa.", "tvw-capacity"),
  vq("tv4e-011", "sentence_completion", "The newly appointed office administrator will be _____ purchasing all computer peripherals.", ["in charge of", "made of", "stayed on top of", "brought in"], 0, "Be in charge of = phụ trách.", "tvw-be-in-charge"),
  vq("tv4e-012", "sentence_completion", "Management introduced new digital tools to _____ document sharing across teams.", ["streamline", "recur", "expire", "substitute"], 0, "Streamline document sharing = tinh gọn chia sẻ tài liệu.", "tvw-streamline"),
  vq("tv4e-013", "sentence_completion", "Heavy-duty steel filing cabinets are popular because they are exceptionally _____.", ["durable", "outdated", "casually", "verbally"], 0, "Durable cabinets = tủ tài liệu bền chắc.", "tvw-durable"),
  vq("tv4e-014", "sentence_completion", "To reduce waste, our department launched a paperless office _____ last quarter.", ["initiative", "capacity", "glimpse", "provider"], 0, "Office initiative = sáng kiến văn phòng.", "tvw-initiative"),
  vq("tv4e-015", "sentence_completion", "The factory upgraded its machines because the old system was hopelessly _____.", ["outdated", "durable", "affordable", "spacious"], 0, "Hopelessly outdated = lỗi thời đến mức vô vọng.", "tvw-outdated"),
];

export const tvLesson4: VocabLesson = {
  id: "s2-vocab-04",
  stage: "intermediate",
  order: 10,
  titleVi: "Từ vựng: Thiết bị & Quy trình Văn phòng",
  titleEn: "Vocabulary: Office Technology & Procedures",
  category: "vocabulary",
  topic: "office-procedures",
  words: tv4Words,
  exercises: tv4Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// TV5: Electronics & Correspondence
// ═══════════════════════════════════════════════════════════════════

const tv5Words: VocabWord[] = [
  word("tvw-disk", "disk", "/dɪsk/", "noun", "ổ đĩa, đĩa lưu trữ", "The technician installed an ultra-fast solid-state disk.", "Kỹ thuật viên đã lắp đặt một ổ cứng thể rắn cực nhanh.", "electronics-correspondence", ["hard disk", "external disk", "disk space"]),
  word("tvw-facilitate", "facilitate", "/fəˈsɪl.ə.teɪt/", "verb", "tạo điều kiện thuận lợi, làm cho dễ dàng", "High-speed broadband facilitates seamless international video calls.", "Băng thông rộng tốc độ cao tạo điều kiện thuận lợi cho các cuộc gọi video quốc tế liền mạch.", "electronics-correspondence", ["facilitate communication", "facilitate growth", "facilitate trade"], { noun: "facilitator" }),
  word("tvw-network-el", "network", "/ˈnet.wɜːrk/", "verb", "kết nối mạng lưới, giao lưu", "Trade fairs offer an unmatched chance to network with industry titans.", "Hội chợ thương mại mang đến cơ hội vô song để kết nối với các ông lớn trong ngành.", "electronics-correspondence", ["network with peers", "business networking", "social network"]),
  word("tvw-popularity", "popularity", "/ˌpɑː.pjəˈler.ə.t̬i/", "noun", "sự phổ biến, ưa chuộng", "Wireless earbuds experienced a swift rise in consumer popularity.", "Tai nghe không dây đã trải qua sự gia tăng nhanh chóng về mức độ phổ biến trong người tiêu dùng.", "electronics-correspondence", ["gain popularity", "grow in popularity", "widespread popularity"], { adjective: "popular" }),
  word("tvw-process", "process", "/ˈprɑː.ses/", "verb", "xử lý (dữ liệu, hồ sơ)", "The automated backend system processes payroll in seconds.", "Hệ thống phụ trợ tự động xử lý bảng lương trong vài giây.", "electronics-correspondence", ["process an order", "process data", "process payment"], { noun: "process" }),
  word("tvw-replace", "replace", "/rɪˈpleɪs/", "verb", "thay thế", "We decided to replace mechanical drives with modern SSD units.", "Chúng tôi quyết định thay thế các ổ cơ học bằng các ổ SSD hiện đại.", "electronics-correspondence", ["replace with", "replace equipment", "replace parts"], { noun: "replacement" }),
  word("tvw-revolution", "revolution", "/ˌrev.əˈluː.ʃən/", "noun", "cuộc cách mạng", "Artificial intelligence ignited a revolution in automated translation.", "Trí tuệ nhân tạo đã châm ngòi cho một cuộc cách mạng trong dịch thuật tự động.", "electronics-correspondence", ["digital revolution", "technological revolution", "spark a revolution"], { adjective: "revolutionary" }),
  word("tvw-sharp", "sharp", "/ʃɑːrp/", "adjective", "sắc bén, rõ nét, tăng/giảm mạnh", "The high-end webcam delivers remarkably sharp 4K imagery.", "Webcam cao cấp mang lại hình ảnh 4K sắc nét vượt trội.", "electronics-correspondence", ["sharp image", "sharp drop", "sharp rise"], { adverb: "sharply" }),
  word("tvw-skill", "skill", "/skɪl/", "noun", "kỹ năng", "Proficiency in data analytics is an indispensable professional skill.", "Thành thạo phân tích dữ liệu là một kỹ năng chuyên môn không thể thiếu.", "electronics-correspondence", ["technical skill", "communication skill", "develop skills"], { adjective: "skilled" }),
  word("tvw-software-el", "software", "/ˈsɑːft.wer/", "noun", "phần mềm ứng dụng", "Cloud accounting software enables collaborative bookkeeping.", "Phần mềm kế toán đám mây cho phép ghi chép sổ sách cộng tác.", "electronics-correspondence", ["software license", "software application", "install software"]),
  word("tvw-store", "store", "/stɔːr/", "verb", "lưu trữ", "All transaction ledgers are stored securely on encrypted drives.", "Tất cả sổ cái giao dịch được lưu trữ an toàn trên các ổ đĩa mã hóa.", "electronics-correspondence", ["store data", "store information", "store securely"], { noun: "storage" }),
  word("tvw-technical", "technical", "/ˈtek.nɪ.kəl/", "adjective", "thuộc kỹ thuật, chuyên môn", "Contact customer support if you experience persistent technical bugs.", "Liên hệ bộ phận hỗ trợ khách hàng nếu bạn gặp sự cố kỹ thuật kéo dài.", "electronics-correspondence", ["technical support", "technical specification", "technical expertise"], { noun: "technician" }),
  word("tvw-assemble", "assemble", "/əˈsem.bəl/", "verb", "lắp ráp (linh kiện), tập hợp", "Robots on the plant floor assemble circuit boards with pinpoint precision.", "Robot trên sàn nhà máy lắp ráp các bảng mạch với độ chính xác tuyệt đối.", "electronics-correspondence", ["assemble components", "assemble a team", "assemble products"], { noun: "assembly" }),
  word("tvw-beforehand", "beforehand", "/bɪˈfɔːr.hænd/", "adverb", "trước, sẵn từ trước", "Prepare the email attachments beforehand to save meeting time.", "Chuẩn bị các tệp đính kèm email từ trước để tiết kiệm thời gian cuộc họp.", "electronics-correspondence", ["prepare beforehand", "know beforehand", "decide beforehand"]),
  word("tvw-complicated", "complicated", "/ˈkɑːm.plə.keɪ.t̬ɪd/", "adjective", "phức tạp, rắc rối", "The configuration process was far too complicated for casual users.", "Quá trình cấu hình quá phức tạp đối với người dùng thông thường.", "electronics-correspondence", ["complicated procedure", "complicated system", "unnecessarily complicated"], { verb: "complicate" }),
  word("tvw-courier", "courier", "/ˈkʊr.i.ɚ/", "noun", "người / dịch vụ chuyển phát nhanh", "We sent the original signed title deed via insured express courier.", "Chúng tôi đã gửi bản gốc văn tự sở hữu đã ký qua dịch vụ chuyển phát nhanh có bảo hiểm.", "electronics-correspondence", ["courier service", "deliver by courier", "express courier"]),
  word("tvw-express", "express", "/ɪkˈspres/", "adjective", "chuyển phát hỏa tốc", "Opting for express shipping guarantees next-business-day arrival.", "Chọn chuyển phát hỏa tốc đảm bảo hàng đến vào ngày làm việc tiếp theo.", "electronics-correspondence", ["express delivery", "express mail", "express shipment"]),
  word("tvw-fold", "fold", "/foʊld/", "verb", "gấp lại (thư, tài liệu)", "Carefully fold the invoice and insert it into the return envelope.", "Gấp cẩn thận hóa đơn và đưa vào phong bì gửi lại.", "electronics-correspondence", ["fold in half", "fold neatly", "folding machine"]),
  word("tvw-layout", "layout", "/ˈleɪ.aʊt/", "noun", "bố cục, cách trình bày", "The newsletter layout features clean fonts and spacious margins.", "Bố cục bản tin có phông chữ gọn gàng và lề rộng rãi.", "electronics-correspondence", ["page layout", "keyboard layout", "office layout"]),
  word("tvw-mention", "mention", "/ˈmen.ʃən/", "verb", "đề cập tới, nhắc đến", "The formal memo failed to mention the upcoming system downtime.", "Bản ghi nhớ chính thức đã không đề cập đến thời gian gián đoạn hệ thống sắp tới.", "electronics-correspondence", ["mention an issue", "as mentioned above", "worth mentioning"], { noun: "mention" }),
  word("tvw-petition", "petition", "/pəˈtɪʃ.ən/", "noun", "bản kiến nghị, đơn thỉnh cầu", "Employees submitted a petition requesting remote work flexibility.", "Nhân viên đã gửi một bản kiến nghị yêu cầu sự linh hoạt trong việc làm từ xa.", "electronics-correspondence", ["sign a petition", "file a petition", "submit a petition"], { verb: "petition" }),
  word("tvw-proof", "proof", "/pruːf/", "noun", "bản in thử, bằng chứng", "Review the final brochure color proof before authorizing printing.", "Xem xét bản in thử màu cuối cùng của tập tài liệu trước khi cho phép in hàng loạt.", "electronics-correspondence", ["color proof", "proof of purchase", "read proofs"], { verb: "proofread" }),
  word("tvw-register-mail", "registered mail", "/ˈredʒ.ə.stɚd meɪl/", "noun", "thư bảo đảm", "Legal notices should always be dispatched via certified registered mail.", "Các thông báo pháp lý phải luôn được gửi qua thư bảo đảm có chứng nhận.", "electronics-correspondence", ["send by registered mail", "registered letter", "registered mail delivery"]),
  word("tvw-revise", "revise", "/rɪˈvaɪz/", "verb", "sửa đổi, xem xét lại văn bản", "The copywriter revised the press release after legal feedback.", "Người viết nội dung đã chỉnh sửa thông cáo báo chí sau khi có phản hồi từ bộ phận pháp lý.", "electronics-correspondence", ["revise a document", "revise an estimate", "revise policies"], { noun: "revision" }),
  word("tvw-attachment", "attachment", "/əˈtætʃ.mənt/", "noun", "tệp đính kèm trong thư", "Please find the quarterly financial spreadsheets in the email attachment.", "Vui lòng tìm các bảng tính tài chính quý trong tệp đính kèm email.", "electronics-correspondence", ["email attachment", "open an attachment", "send an attachment"], { verb: "attach" }),
];

const tv5Exercises: VocabExercise[] = [
  vq("tv5e-001", "meaning_match", "\"facilitate\" có nghĩa là gì?", ["ngăn cản tiến độ", "tạo điều kiện thuận lợi", "phức tạp hóa", "xóa bỏ tài liệu"], 1, "Facilitate = giúp việc gì diễn ra dễ dàng thuận lợi hơn.", "tvw-facilitate"),
  vq("tv5e-002", "meaning_match", "\"courier\" có nghĩa là gì?", ["dịch vụ chuyển phát hỏa tốc", "kỹ thuật viên phần mềm", "người phát biểu", "bản in thử"], 0, "Courier = người hoặc dịch vụ giao nhận thư tín, bưu phẩm hỏa tốc.", "tvw-courier"),
  vq("tv5e-003", "meaning_match", "\"revise\" có nghĩa là gì?", ["soạn thảo mới hoàn toàn", "chỉnh sửa / soát lại văn bản", "xóa vĩnh viễn", "gửi thư bảo đảm"], 1, "Revise = duyệt và sửa đổi lại nội dung.", "tvw-revise"),
  vq("tv5e-004", "meaning_match", "\"attachment\" có nghĩa là gì?", ["phần cứng máy tính", "tệp đính kèm email", "máy in màu", "thẻ nhân viên"], 1, "Attachment = tệp tin đính kèm trong thư điện tử.", "tvw-attachment"),
  vq("tv5e-005", "meaning_match", "\"assemble\" có nghĩa là gì?", ["phân hủy linh kiện", "lắp ráp chi tiết", "tắt máy chủ", "lập hóa đơn"], 1, "Assemble = gom lại và lắp ráp thành khối hoàn chỉnh.", "tvw-assemble"),
  vq("tv5e-006", "meaning_match", "\"registered mail\" có nghĩa là gì?", ["thư rác", "thư bảo đảm", "tin nhắn nhanh", "thư nội bộ"], 1, "Registered mail = thư được ghi sổ bảo đảm an toàn.", "tvw-register-mail"),
  vq("tv5e-007", "meaning_match", "\"beforehand\" có nghĩa là gì?", ["sau khi xong việc", "từ trước / sẵn từ trước", "quá hạn chót", "ngẫu nhiên"], 1, "Beforehand = chuẩn bị từ trước khi sự việc diễn ra.", "tvw-beforehand"),
  vq("tv5e-008", "meaning_match", "\"layout\" có nghĩa là gì?", ["bố cục / dàn trang", "kỹ năng chuyên môn", "sự hỏng hóc", "thời gian quá cảnh"], 0, "Layout = cách sắp xếp các thành phần đồ họa, chữ trên trang.", "tvw-layout"),
  vq("tv5e-009", "meaning_match", "\"sharp\" khi mô tả hình ảnh có nghĩa là gì?", ["mờ nhạt", "sắc nét, rõ ràng", "nhiều chi tiết thừa", "lỗi thời"], 1, "Sharp image = hình ảnh sắc nét, độ tương phản tốt.", "tvw-sharp"),
  vq("tv5e-010", "meaning_match", "\"petition\" có nghĩa là gì?", ["bản kiến nghị / thỉnh cầu", "hợp đồng bảo hiểm", "biên lai thanh toán", "kế hoạch kinh doanh"], 0, "Petition = đơn thỉnh cầu/kiến nghị có nhiều người ký tên.", "tvw-petition"),
  vq("tv5e-011", "sentence_completion", "The newly implemented cloud platform will _____ communication across global branches.", ["facilitate", "fold", "mention", "delete"], 0, "Facilitate communication = thúc đẩy giao tiếp thuận lợi.", "tvw-facilitate"),
  vq("tv5e-012", "sentence_completion", "Important real estate deeds should be dispatched using certified _____ mail.", ["registered", "sharp", "complicated", "beforehand"], 0, "Registered mail = thư bảo đảm.", "tvw-register-mail"),
  vq("tv5e-013", "sentence_completion", "Please inspect the email _____ to verify the quarterly sales totals.", ["attachment", "courier", "layout", "petition"], 0, "Email attachment = tệp đính kèm.", "tvw-attachment"),
  vq("tv5e-014", "sentence_completion", "Before printing ten thousand catalogs, the graphic designer checked the color _____.", ["proof", "courier", "attachment", "petition"], 0, "Color proof = bản in thử màu.", "tvw-proof"),
  vq("tv5e-015", "sentence_completion", "Highly trained technicians will _____ each desktop unit by hand to ensure top quality.", ["assemble", "fold", "revise", "mention"], 0, "Assemble unit = lắp ráp thiết bị.", "tvw-assemble"),
];

export const tvLesson5: VocabLesson = {
  id: "s2-vocab-05",
  stage: "intermediate",
  order: 11,
  titleVi: "Từ vựng: Thiết bị Điện tử & Thư tín Thương mại",
  titleEn: "Vocabulary: Electronics & Correspondence",
  category: "vocabulary",
  topic: "electronics-correspondence",
  words: tv5Words,
  exercises: tv5Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// MINI TEST TV1 (Covers TV1 - TV5: 20 Questions)
// ═══════════════════════════════════════════════════════════════════

export const stage2VocabMiniTest1: TestUnit = {
  id: "s2-test-vmini01",
  stage: "intermediate",
  order: 12,
  titleVi: "Mini Test Từ vựng Trung cấp 1: Tổng hợp TV1-TV5",
  titleEn: "Intermediate Vocab Mini Test 1: TV1-TV5 Review",
  category: "test",
  testType: "mini_test",
  coversLessonIds: [
    "s2-vocab-01", "s2-vocab-02", "s2-vocab-03", "s2-vocab-04", "s2-vocab-05"
  ],
  passingScore: 70,
  timeLimit: 20,
  exercises: [
    vq("tvmt1-001", "meaning_match", "\"abide by\" có nghĩa là gì?", ["chối bỏ trách nhiệm", "tuân thủ theo quy định / hợp đồng", "thay đổi người đại diện", "đòi bồi thường"], 1, "Abide by = tuân theo cam kết.", "tvw-abide"),
    vq("tvmt1-002", "meaning_match", "\"provision\" trong văn bản pháp lý chỉ:", ["lợi nhuận thu được", "điều khoản quy định", "khoản phạt vi phạm", "người làm chứng"], 1, "Provision = điều khoản hợp đồng.", "tvw-provision"),
    vq("tvmt1-003", "meaning_match", "\"expiration\" có nghĩa là gì?", ["sự hết hạn hợp đồng", "sự khởi công", "sự gia hạn", "sự đầu tư"], 0, "Expiration = hết hiệu lực.", "tvw-expiration"),
    vq("tvmt1-004", "meaning_match", "\"substitute\" có nghĩa là gì?", ["người thừa kế", "vật hoặc giải pháp thay thế", "vật tư đắt tiền", "hàng tồn kho"], 1, "Substitute = sự thay thế.", "tvw-substitute"),
    vq("tvmt1-005", "meaning_match", "\"accommodate\" có nghĩa là gì?", ["từ chối khách hàng", "chứa được / đáp ứng nhu cầu", "trì hoãn buổi lễ", "phạt tiền"], 1, "Accommodate = đáp ứng, cung cấp đủ chỗ.", "tvw-accommodate"),
    vq("tvmt1-006", "meaning_match", "\"durable\" có nghĩa là gì?", ["bền bỉ, dùng được lâu dài", "dễ vỡ hỏng", "nhỏ gọn", "lỗi thời"], 0, "Durable = bền chắc.", "tvw-durable"),
    vq("tvmt1-007", "meaning_match", "\"facilitate\" có nghĩa là gì?", ["tạo điều kiện thuận lợi", "gây cản trở", "xóa bỏ", "hủy hợp đồng"], 0, "Facilitate = làm cho thuận lợi.", "tvw-facilitate"),
    vq("tvmt1-008", "meaning_match", "\"courier\" có nghĩa là gì?", ["dịch vụ chuyển phát nhanh", "nhân viên kỹ thuật", "đại diện bán hàng", "thư ký cuộc họp"], 0, "Courier = dịch vụ chuyển phát nhanh.", "tvw-courier"),
    vq("tvmt1-009", "sentence_completion", "All contractors are strictly required to _____ by the terms of the safety code.", ["abide", "consume", "facilitate", "substitute"], 0, "Abide by terms = tuân thủ điều khoản.", "tvw-abide"),
    vq("tvmt1-010", "sentence_completion", "The warranty does not _____ problems resulting from accidental water damage.", ["cover", "promise", "imply", "allocate"], 0, "Cover problems = chi trả/bảo hành cho vấn đề.", "tvw-cover"),
    vq("tvmt1-011", "sentence_completion", "The executive committee will convene to _____ strategic options for foreign expansion.", ["evaluate", "expire", "fold", "recur"], 0, "Evaluate options = thẩm định các lựa chọn.", "tvw-evaluate"),
    vq("tvmt1-012", "sentence_completion", "Over six hundred delegates are expected to _____ in the interactive afternoon workshops.", ["take part", "bring in", "shut down", "figure out"], 0, "Take part in = tham gia vào.", "tvw-take-part"),
    vq("tvmt1-013", "sentence_completion", "Due to unexpected server load, the network admin had to _____ extra storage immediately.", ["allocate", "ignore", "fold", "expire"], 0, "Allocate storage = cấp phát thêm dung lượng lưu trữ.", "tvw-allocate"),
    vq("tvmt1-014", "sentence_completion", "Our new branch manager will be _____ coordinating shipping logistics across Asia.", ["in charge of", "made of", "stayed on top", "brought in"], 0, "In charge of = chịu trách nhiệm về.", "tvw-be-in-charge"),
    vq("tvmt1-015", "sentence_completion", "Automating repetitive invoice entry helped _____ the department's billing operations.", ["streamline", "recur", "substitute", "expire"], 0, "Streamline operations = tinh giản hoạt động.", "tvw-streamline"),
    vq("tvmt1-016", "sentence_completion", "The office replaced all _____ CRT monitors with modern energy-efficient displays.", ["outdated", "durable", "affordable", "spacious"], 0, "Outdated monitors = màn hình lỗi thời.", "tvw-outdated"),
    vq("tvmt1-017", "sentence_completion", "Cloud-based collaboration tools significantly _____ teamwork between remote specialists.", ["facilitate", "delete", "mention", "fold"], 0, "Facilitate teamwork = tạo điều kiện cho làm việc nhóm.", "tvw-facilitate"),
    vq("tvmt1-018", "sentence_completion", "The contract contains a specific _____ regarding the resolution of partnership disputes.", ["provision", "fad", "capacity", "glimpse"], 0, "Specific provision = điều khoản cụ thể.", "tvw-provision"),
    vq("tvmt1-019", "sentence_completion", "Kindly send the notarized corporate agreement by express _____ to prevent transit delays.", ["courier", "layout", "capacity", "initiative"], 0, "Express courier = chuyển phát nhanh.", "tvw-courier"),
    vq("tvmt1-020", "sentence_completion", "Please review the attached spreadsheet _____ before attending the budget meeting.", ["beforehand", "casually", "primarily", "verbally"], 0, "Review beforehand = xem trước.", "tvw-beforehand"),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// TV6: Job Advertising & Recruiting
// ═══════════════════════════════════════════════════════════════════

const tv6Words: VocabWord[] = [
  word("tvw-apply", "apply", "/əˈplaɪ/", "verb", "nộp đơn ứng tuyển", "Hundreds of qualified candidates applied for the senior researcher vacancy.", "Hàng trăm ứng viên đủ tiêu chuẩn đã nộp đơn ứng tuyển cho vị trí nghiên cứu viên cao cấp còn trống.", "recruiting-hr", ["apply for a job", "apply in person", "apply online"], { noun: "application/applicant" }),
  word("tvw-background", "background", "/ˈbæk.ɡraʊnd/", "noun", "kinh nghiệm nền tảng, lý lịch", "The candidate possesses a stellar background in corporate finance.", "Ứng viên sở hữu nền tảng lý lịch xuất sắc trong tài chính doanh nghiệp.", "recruiting-hr", ["educational background", "professional background", "background check"]),
  word("tvw-be-ready-for", "be ready for", "/biː ˈred.i fɔːr/", "verb", "sẵn sàng cho", "New recruits must be ready for fast-paced customer escalations.", "Nhân viên mới tuyển phải sẵn sàng cho các tình huống leo thang nhanh từ khách hàng.", "recruiting-hr", ["be ready for challenges", "be ready for change", "fully ready"]),
  word("tvw-call-in", "call in", "/kɑːl ɪn/", "verb", "gọi đến phỏng vấn / mời đến", "The hiring panel called in five shortlisted candidates for final rounds.", "Hội đồng tuyển dụng đã gọi năm ứng viên trong danh sách rút gọn cho vòng cuối.", "recruiting-hr", ["call in for an interview", "call in an expert", "call in sick"]),
  word("tvw-confidence", "confidence", "/ˈkɑːn.fə.dəns/", "noun", "sự tự tin, lòng tin cậy", "Her articulate presentation inspired total confidence among executives.", "Bài thuyết trình lưu loát của cô ấy đã truyền niềm tin tuyệt đối cho các giám đốc.", "recruiting-hr", ["express confidence", "lack confidence", "boost confidence"], { adjective: "confident" }),
  word("tvw-constantly", "constantly", "/ˈkɑːn.stənt.li/", "adverb", "liên tục, không ngừng", "The tech sector constantly evolves, requiring continual upskilling.", "Ngành công nghệ liên tục phát triển, đòi hỏi phải nâng cao kỹ năng không ngừng.", "recruiting-hr", ["constantly changing", "constantly strive", "constantly update"], { adjective: "constant" }),
  word("tvw-expert", "expert", "/ˈek.spɝːt/", "noun", "chuyên gia", "The firm retained an external expert in antitrust legislation.", "Công ty đã thuê một chuyên gia bên ngoài về luật chống độc quyền.", "recruiting-hr", ["industry expert", "legal expert", "expert advice"], { noun: "expertise" }),
  word("tvw-hesitant", "hesitant", "/ˈhez.ə.tənt/", "adjective", "do dự, ngập ngừng", "He was hesitant to relocate abroad without guaranteed housing allowances.", "Anh ấy do dự trong việc chuyển ra nước ngoài nếu không được bảo đảm trợ cấp nhà ở.", "recruiting-hr", ["hesitant about", "feel hesitant", "hesitant to accept"], { verb: "hesitate", noun: "hesitation" }),
  word("tvw-present", "present", "/prɪˈzent/", "verb", "trình bày, xuất trình", "Candidates must present official transcripts during the panel interview.", "Các ứng viên phải xuất trình bảng điểm chính thức trong buổi phỏng vấn của hội đồng.", "recruiting-hr", ["present credentials", "present findings", "present ideas"], { noun: "presentation" }),
  word("tvw-weakness", "weakness", "/ˈwiːk.nəs/", "noun", "điểm yếu", "A mature interviewee acknowledges areas of professional weakness.", "Một người được phỏng vấn chín chắn sẽ thừa nhận các lĩnh vực còn là điểm yếu chuyên môn.", "recruiting-hr", ["strengths and weaknesses", "admit a weakness", "overcome weaknesses"], { adjective: "weak" }),
  word("tvw-candidate", "candidate", "/ˈkæn.dɪ.dət/", "noun", "ứng viên", "The search committee interviewed seven prospective candidates.", "Ủy ban tìm kiếm đã phỏng vấn bảy ứng viên triển vọng.", "recruiting-hr", ["qualified candidate", "ideal candidate", "prospective candidate"]),
  word("tvw-interview", "interview", "/ˈɪn.t̬ɚ.vjuː/", "noun", "cuộc phỏng vấn", "Her second round interview was conducted via encrypted teleconference.", "Cuộc phỏng vấn vòng hai của cô ấy được thực hiện qua hội nghị truyền hình mã hóa.", "recruiting-hr", ["job interview", "interview panel", "conduct an interview"], { verb: "interview", noun: "interviewer" }),
  word("tvw-qualification-hr", "qualification", "/ˌkwɑː.lə.fəˈkeɪ.ʃən/", "noun", "bằng cấp, tiêu chuẩn chuyên môn", "Does she possess the necessary academic qualifications for this post?", "Cô ấy có sở hữu các bằng cấp học thuật cần thiết cho vị trí này không?", "recruiting-hr", ["meet qualifications", "minimum qualifications", "professional qualifications"], { verb: "qualify", adjective: "qualified" }),
  word("tvw-recruitment", "recruitment", "/rɪˈkruːt.mənt/", "noun", "sự tuyển dụng", "Our human resources department launched a nationwide recruitment drive.", "Phòng nhân sự của chúng tôi đã phát động đợt tuyển dụng trên quy mô toàn quốc.", "recruiting-hr", ["recruitment agency", "recruitment drive", "campus recruitment"], { verb: "recruit", noun: "recruiter" }),
  word("tvw-resume", "resume", "/ˈrez.ə.meɪ/", "noun", "sơ yếu lý lịch, CV", "Please attach an updated resume alongside your cover letter.", "Vui lòng đính kèm một bản sơ yếu lý lịch cập nhật bên cạnh thư xin việc.", "recruiting-hr", ["submit a resume", "updated resume", "resume review"]),
  word("tvw-vacancy", "vacancy", "/ˈveɪ.kən.si/", "noun", "vị trí còn trống", "There is currently an executive vacancy in the product design team.", "Hiện có một vị trí điều hành còn trống trong nhóm thiết kế sản phẩm.", "recruiting-hr", ["job vacancy", "fill a vacancy", "advertise a vacancy"]),
  word("tvw-advertise", "advertise", "/ˈæd.vɚ.taɪz/", "verb", "quảng cáo, đăng tin tuyển", "The corporation advertised the senior opening in national publications.", "Tập đoàn đã đăng tin tuyển dụng vị trí cấp cao trên các ấn phẩm toàn quốc.", "recruiting-hr", ["advertise a position", "advertise widely", "heavily advertise"], { noun: "advertisement" }),
  word("tvw-hire", "hire", "/haɪr/", "verb", "thuê, tuyển dụng", "The engineering firm plans to hire thirty software developers this quarter.", "Công ty kỹ thuật có kế hoạch tuyển dụng ba mươi lập trình viên phần mềm trong quý này.", "recruiting-hr", ["hire new staff", "hire full-time", "freeze hiring"], { noun: "hire" }),
  word("tvw-screening", "screening", "/ˈskriː.nɪŋ/", "noun", "sự sàng lọc hồ sơ", "Initial resume screening eliminates applicants who lack essential certs.", "Sàng lọc hồ sơ ban đầu loại bỏ những ứng viên thiếu các chứng chỉ thiết yếu.", "recruiting-hr", ["resume screening", "screening process", "initial screening"]),
  word("tvw-shortlist", "shortlist", "/ˈʃɔːrt.lɪst/", "noun", "danh sách rút gọn", "The recruiting officer compiled a shortlist of three promising engineers.", "Cán bộ tuyển dụng đã lập danh sách rút gọn gồm ba kỹ sư đầy triển vọng.", "recruiting-hr", ["make the shortlist", "on the shortlist", "draw up a shortlist"], { verb: "shortlist" }),
  word("tvw-probation", "probation", "/proʊˈbeɪ.ʃən/", "noun", "thời gian thử việc", "New hires serve a mandatory three-month probation period.", "Nhân viên mới phải trải qua thời gian thử việc bắt buộc ba tháng.", "recruiting-hr", ["probation period", "on probation", "pass probation"]),
  word("tvw-eligible", "eligible", "/ˈel.ə.dʒə.bəl/", "adjective", "đủ điều kiện, hợp lệ", "Only permanent full-time personnel are eligible for company stock options.", "Chỉ nhân viên toàn thời gian chính thức mới đủ điều kiện nhận quyền chọn cổ phiếu.", "recruiting-hr", ["eligible for benefits", "eligible to participate", "fully eligible"], { noun: "eligibility" }),
  word("tvw-position", "position", "/pəˈzɪʃ.ən/", "noun", "vị trí công việc", "She applied for an entry-level managerial position in logistics.", "Cô ấy đã nộp đơn cho một vị trí quản lý cấp khởi điểm trong ngành hậu cần.", "recruiting-hr", ["open position", "managerial position", "accept a position"]),
  word("tvw-reference", "reference", "/ˈref.ɚ.əns/", "noun", "thư/người giới thiệu", "Applicants must submit three professional references from past employers.", "Ứng viên phải nộp ba người giới thiệu chuyên nghiệp từ các người sử dụng lao động trước đây.", "recruiting-hr", ["check references", "provide references", "letter of reference"]),
  word("tvw-talent", "talent", "/ˈtæl.ənt/", "noun", "nhân tài, tài năng", "Attracting top technical talent is central to the startup's growth blueprint.", "Thu hút nhân tài kỹ thuật hàng đầu là trọng tâm trong kế hoạch phát triển của công ty khởi nghiệp.", "recruiting-hr", ["talent acquisition", "top talent", "retain talent"]),
];

const tv6Exercises: VocabExercise[] = [
  vq("tv6e-001", "meaning_match", "\"vacancy\" có nghĩa là gì?", ["kỳ nghỉ phép", "vị trí tuyển dụng còn trống", "thời gian thử việc", "người giới thiệu"], 1, "Vacancy = vị trí công việc đang trống cần tuyển người.", "tvw-vacancy"),
  vq("tv6e-002", "meaning_match", "\"eligible\" có nghĩa là gì?", ["đủ điều kiện / hợp lệ", "bị loại bỏ", "chưa đủ tuổi", "do dự ngập ngừng"], 0, "Eligible = đáp ứng đủ các tiêu chuẩn cần thiết.", "tvw-eligible"),
  vq("tv6e-003", "meaning_match", "\"probation\" có nghĩa là gì?", ["thăng chức chính thức", "thời gian thử việc", "bản lý lịch", "chuyên môn kỹ thuật"], 1, "Probation = thời kỳ thử thách công việc ban đầu.", "tvw-probation"),
  vq("tv6e-004", "meaning_match", "\"screening\" có nghĩa là gì?", ["buổi phỏng vấn trực tiếp", "sự sàng lọc (hồ sơ)", "chấm dứt hợp đồng", "chuyên gia tư vấn"], 1, "Screening = quá trình lọc chọn hồ sơ ban đầu.", "tvw-screening"),
  vq("tv6e-005", "meaning_match", "\"hesitant\" có nghĩa là gì?", ["tự tin tuyệt đối", "do dự, ngập ngừng", "nhiệt huyết", "đủ tư cách"], 1, "Hesitant = lưỡng lự, không dứt khoát.", "tvw-hesitant"),
  vq("tv6e-006", "meaning_match", "\"recruitment\" có nghĩa là gì?", ["sự sa thải", "công tác tuyển dụng nhân sự", "sự nghỉ hưu", "tiền lương thưởng"], 1, "Recruitment = việc chiêu mộ và tuyển mộ nhân viên.", "tvw-recruitment"),
  vq("tv6e-007", "meaning_match", "\"shortlist\" có nghĩa là gì?", ["danh sách rút gọn ứng viên", "bản hợp đồng lao động", "thư từ chối", "mức lương khởi điểm"], 0, "Shortlist = danh sách những người vượt qua các vòng sơ loại.", "tvw-shortlist"),
  vq("tv6e-008", "meaning_match", "\"reference\" trong tuyển dụng là gì?", ["bài kiểm tra", "người / thư giới thiệu chuyên môn", "bằng tốt nghiệp", "hạn chót nộp đơn"], 1, "Professional reference = người bảo chứng năng lực làm việc.", "tvw-reference"),
  vq("tv6e-009", "meaning_match", "\"candidate\" có nghĩa là gì?", ["người phỏng vấn", "ứng viên dự tuyển", "chủ doanh nghiệp", "chuyên gia đào tạo"], 1, "Candidate = người nộp đơn ứng tuyển.", "tvw-candidate"),
  vq("tv6e-010", "meaning_match", "\"confidence\" có nghĩa là gì?", ["sự hoài nghi", "sự tự tin / lòng tin", "sự do dự", "điểm yếu"], 1, "Confidence = cảm giác tin tưởng vào năng lực bản thân.", "tvw-confidence"),
  vq("tv6e-011", "sentence_completion", "The human resources manager decided to _____ in the top three candidates for a panel interview.", ["call", "apply", "advertise", "hire"], 0, "Call in = mời/gọi đến phỏng vấn.", "tvw-call-in"),
  vq("tv6e-012", "sentence_completion", "All permanent employees who complete six months of service are _____ for medical benefits.", ["eligible", "hesitant", "probation", "shortlist"], 0, "Eligible for benefits = đủ điều kiện nhận phúc lợi.", "tvw-eligible"),
  vq("tv6e-013", "sentence_completion", "The tech firm posted a job _____ online to find an experienced database administrator.", ["vacancy", "probation", "confidence", "screening"], 0, "Job vacancy = vị trí việc làm còn trống.", "tvw-vacancy"),
  vq("tv6e-014", "sentence_completion", "After passing the initial resume _____, she was invited for a technical assessment.", ["screening", "weakness", "vacancy", "hesitant"], 0, "Resume screening = sàng lọc sơ yếu lý lịch.", "tvw-screening"),
  vq("tv6e-015", "sentence_completion", "Newly appointed department supervisors must successfully complete a ninety-day _____ period.", ["probation", "candidate", "vacancy", "reference"], 0, "Probation period = thời gian thử việc.", "tvw-probation"),
];

export const tvLesson6: VocabLesson = {
  id: "s2-vocab-06",
  stage: "intermediate",
  order: 13,
  titleVi: "Từ vựng: Đăng tin Tuyển dụng & Thu hút Nhân tài",
  titleEn: "Vocabulary: Job Advertising & Recruiting",
  category: "vocabulary",
  topic: "recruiting-hr",
  words: tv6Words,
  exercises: tv6Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// TV7: Hiring, Training, Salaries & Benefits
// ═══════════════════════════════════════════════════════════════════

const tv7Words: VocabWord[] = [
  word("tvw-ability", "ability", "/əˈbɪl.ə.t̬i/", "noun", "khả năng, năng lực", "Her remarkable ability to organize chaotic operations won broad praise.", "Khả năng tổ chức các hoạt động lộn xộn một cách đáng nể của cô ấy đã giành được nhiều lời khen ngợi.", "hiring-salaries", ["demonstrate ability", "leadership ability", "natural ability"], { adjective: "able" }),
  word("tvw-apply-rules", "apply", "/əˈplaɪ/", "verb", "áp dụng (chính sách, kỹ năng)", "Trainees learned how to apply modern spreadsheet formulas to audits.", "Học viên đã học cách áp dụng các công thức bảng tính hiện đại vào việc kiểm toán.", "hiring-salaries", ["apply knowledge", "apply a policy", "apply skills"], { noun: "application" }),
  word("tvw-mentor", "mentor", "/ˈmen.tɔːr/", "noun", "người cố vấn, hướng dẫn", "Each newly hired engineer is paired with a seasoned staff mentor.", "Mỗi kỹ sư mới tuyển dụng đều được ghép đôi với một người cố vấn nhân viên dày dạn kinh nghiệm.", "hiring-salaries", ["assigned mentor", "trusted mentor", "act as a mentor"], { verb: "mentor", noun: "mentorship" }),
  word("tvw-on-track", "on track", "/ɑːn træk/", "adverb", "đúng hướng, đúng tiến độ", "The executive onboarding schedule remains firmly on track.", "Lịch trình tiếp nhận lãnh đạo mới vẫn đang diễn ra hoàn toàn đúng tiến độ.", "hiring-salaries", ["stay on track", "get back on track", "keep on track"]),
  word("tvw-reject", "reject", "/rɪˈdʒekt/", "verb", "bác bỏ, từ chối", "The recruiting officer rejected applications submitted past the strict deadline.", "Cán bộ tuyển dụng đã từ chối các đơn nộp quá thời hạn quy định nghiêm ngặt.", "hiring-salaries", ["reject an offer", "reject a proposal", "flatly reject"], { noun: "rejection" }),
  word("tvw-set-up", "set up", "/set ʌp/", "verb", "thiết lập, cài đặt", "IT staff set up individual workstations prior to orientation day.", "Nhân viên IT đã thiết lập các máy trạm cá nhân trước ngày định hướng.", "hiring-salaries", ["set up an account", "set up a meeting", "set up equipment"]),
  word("tvw-success", "success", "/səkˈses/", "noun", "sự thành công", "The orientation boot camp proved an overwhelming success.", "Khóa huấn luyện định hướng đã chứng minh là một thành công vang dội.", "hiring-salaries", ["achieve success", "key to success", "measure success"], { adjective: "successful", verb: "succeed" }),
  word("tvw-training", "training", "/ˈtreɪ.nɪŋ/", "noun", "sự đào tạo, tập huấn", "All incoming staff participate in mandatory compliance training sessions.", "Tất cả nhân viên mới đều tham gia các buổi đào tạo tuân thủ bắt buộc.", "hiring-salaries", ["on-the-job training", "vocational training", "training module"], { verb: "train", noun: "trainer/trainee" }),
  word("tvw-update-hr", "update", "/ʌpˈdeɪt/", "verb", "cập nhật (thông tin, hồ sơ)", "Employees must update their emergency contact forms every January.", "Nhân viên phải cập nhật biểu mẫu liên hệ khẩn cấp của họ vào mỗi tháng Giêng.", "hiring-salaries", ["update records", "update details", "regularly update"], { noun: "update" }),
  word("tvw-benefit", "benefit", "/ˈben.ə.fɪt/", "noun", "phúc lợi, lợi ích", "Comprehensive dental care is part of the corporate benefits package.", "Chăm sóc nha khoa toàn diện là một phần của gói phúc lợi công ty.", "hiring-salaries", ["fringe benefit", "employee benefits", "benefit package"], { verb: "benefit", adjective: "beneficial" }),
  word("tvw-compensation", "compensation", "/ˌkɑːm.penˈseɪ.ʃən/", "noun", "tiền lương thưởng, đền bù", "The total compensation package encompasses salary, bonuses, and equity.", "Tổng gói thù lao bao gồm tiền lương, tiền thưởng và cổ phần.", "hiring-salaries", ["compensation package", "fair compensation", "workers' compensation"], { verb: "compensate" }),
  word("tvw-delicate", "delicate", "/ˈdel.ə.kət/", "adjective", "tế nhị, nhạy cảm", "Salary negotiation is a delicate topic that requires tact and diplomacy.", "Thương lượng lương là một chủ đề tế nhị đòi hỏi sự khéo léo và ngoại giao.", "hiring-salaries", ["delicate situation", "delicate balance", "delicate matter"]),
  word("tvw-eligible-sal", "eligible", "/ˈel.ə.dʒə.bəl/", "adjective", "đủ tư cách nhận (chế độ)", "Staff members are eligible for four weeks of paid maternity leave.", "Các nhân viên nữ đủ điều kiện được nghỉ thai sản có lương bốn tuần.", "hiring-salaries", ["eligible for leave", "eligible for bonus", "eligible for retirement"]),
  word("tvw-flexibility", "flexibility", "/ˌflek.səˈbɪl.ə.t̬i/", "noun", "sự linh hoạt", "Remote work arrangements afford employees much-needed schedule flexibility.", "Các sắp xếp làm việc từ xa mang lại cho nhân viên sự linh hoạt lịch trình rất cần thiết.", "hiring-salaries", ["schedule flexibility", "offer flexibility", "workplace flexibility"], { adjective: "flexible" }),
  word("tvw-negotiate", "negotiate", "/nəˈɡoʊ.ʃi.eɪt/", "verb", "đàm phán, thương lượng", "She successfully negotiated a fifteen percent salary increase.", "Cô ấy đã thương lượng thành công mức tăng lương mười lăm phần trăm.", "hiring-salaries", ["negotiate terms", "negotiate a contract", "negotiate salary"], { noun: "negotiation/negotiator" }),
  word("tvw-raise", "raise", "/reɪz/", "noun", "sự tăng lương", "Exemplary annual performance appraisals often lead to a merit raise.", "Đánh giá hiệu suất hàng năm mẫu mực thường dẫn đến việc tăng lương xứng đáng.", "hiring-salaries", ["pay raise", "salary raise", "merit raise"], { verb: "raise" }),
  word("tvw-retire", "retire", "/rɪˈtaɪr/", "verb", "nghỉ hưu", "After forty dedicated years with the firm, the CFO decided to retire.", "Sau bốn mươi năm cống hiến cho công ty, Giám đốc tài chính quyết định nghỉ hưu.", "hiring-salaries", ["retire from", "retire comfortably", "early retirement"], { noun: "retirement" }),
  word("tvw-salary", "salary", "/ˈsæl.ɚ.i/", "noun", "tiền lương (hàng tháng/năm)", "The starting salary for entry analysts is competitive with market peers.", "Mức lương khởi điểm cho các nhà phân tích mới vào nghề có tính cạnh tranh so với các đối thủ trên thị trường.", "hiring-salaries", ["annual salary", "competitive salary", "base salary"]),
  word("tvw-vested", "vested", "/ˈves.tɪd/", "adjective", "được trao quyền chính thức (về cổ phần/lợi ích)", "Stock options become fully vested after forty-eight continuous months.", "Quyền chọn cổ phiếu được trao quyền sở hữu đầy đủ sau bốn mươi tám tháng liên tục.", "hiring-salaries", ["vested interest", "vested pension", "fully vested"], { verb: "vest" }),
  word("tvw-wage", "wage", "/weɪdʒ/", "noun", "tiền công (theo giờ/ngày)", "The state increased the legal minimum wage to fifteen dollars per hour.", "Tiểu bang đã tăng mức lương tối thiểu theo luật định lên mười lăm đô la một giờ.", "hiring-salaries", ["minimum wage", "hourly wage", "living wage"]),
  word("tvw-bonus", "bonus", "/ˈboʊ.nəs/", "noun", "tiền thưởng", "Staff received an annual performance bonus equivalent to two months' pay.", "Nhân viên nhận được tiền thưởng hiệu suất hàng năm tương đương hai tháng lương.", "hiring-salaries", ["annual bonus", "performance bonus", "holiday bonus"]),
  word("tvw-deduction", "deduction", "/dɪˈdʌk.ʃən/", "noun", "khoản khấu trừ (thuế, bảo hiểm)", "Pay stubs clearly detail tax withholdings and pension deductions.", "Cuống phiếu lương thể hiện rõ ràng các khoản giữ lại tiền thuế và khấu trừ lương hưu.", "hiring-salaries", ["payroll deduction", "tax deduction", "automatic deduction"], { verb: "deduct" }),
  word("tvw-severance", "severance", "/ˈsev.ɚ.əns/", "noun", "khoản trợ cấp thôi việc", "Laid-off personnel received three months of severance pay.", "Những nhân sự bị cho thôi việc đã nhận được ba tháng trợ cấp thôi việc.", "hiring-salaries", ["severance package", "severance pay", "severance agreement"]),
  word("tvw-reimburse", "reimburse", "/ˌriː.ɪmˈbɝːs/", "verb", "hoàn trả chi phí công tác", "The corporate treasury reimburses mileage and business meal receipts.", "Kho bạc công ty hoàn trả các biên lai dặm đường và bữa ăn công tác.", "hiring-salaries", ["reimburse expenses", "fully reimburse", "reimburse costs"], { noun: "reimbursement" }),
  word("tvw-payroll", "payroll", "/ˈpeɪ.roʊl/", "noun", "bảng lương, tổng quỹ lương", "The company employs a specialized software package to process its payroll.", "Công ty sử dụng gói phần mềm chuyên dụng để xử lý bảng lương của mình.", "hiring-salaries", ["on the payroll", "payroll department", "payroll tax"]),
];

const tv7Exercises: VocabExercise[] = [
  vq("tv7e-001", "meaning_match", "\"compensation\" có nghĩa là gì?", ["khiếu nại của khách", "thù lao, tiền lương thưởng", "kế hoạch huấn luyện", "sự từ chức"], 1, "Compensation = gói thù lao chi trả cho người lao động.", "tvw-compensation"),
  vq("tv7e-002", "meaning_match", "\"negotiate\" có nghĩa là gì?", ["đàm phán, thương lượng", "áp dụng quy tắc", "sa thải nhân viên", "khấu trừ thuế"], 0, "Negotiate = bàn bạc để đạt được thỏa thuận có lợi.", "tvw-negotiate"),
  vq("tv7e-003", "meaning_match", "\"reimburse\" có nghĩa là gì?", ["trừ lương", "hoàn trả chi phí", "tăng tiền phạt", "từ chối giải quyết"], 1, "Reimburse = hoàn tiền cho chi phí đã ứng trước.", "tvw-reimburse"),
  vq("tv7e-004", "meaning_match", "\"delicate\" có nghĩa là gì?", ["vững chắc như sắt", "tế nhị, nhạy cảm", "rộng rãi thoáng đãng", "hết hạn sử dụng"], 1, "Delicate matter = vấn đề nhạy cảm cần xử lý khéo léo.", "tvw-delicate"),
  vq("tv7e-005", "meaning_match", "\"mentor\" có nghĩa là gì?", ["người học việc", "người cố vấn / hướng dẫn", "người cho vay tiền", "đối thủ cạnh tranh"], 1, "Mentor = người có kinh nghiệm hướng dẫn người mới.", "tvw-mentor"),
  vq("tv7e-006", "meaning_match", "\"severance\" có nghĩa là gì?", ["khoản trợ cấp thôi việc", "tiền thưởng cuối năm", "phí bảo hiểm y tế", "lương cơ bản"], 0, "Severance pay = tiền trợ cấp khi chấm dứt hợp đồng lao động.", "tvw-severance"),
  vq("tv7e-007", "meaning_match", "\"deduction\" có nghĩa là gì?", ["khoản tăng thêm", "khoản khấu trừ", "tiền đặt cọc", "lương hưu trọn đời"], 1, "Deduction = số tiền bị trừ khỏi lương (như thuế, BHXH).", "tvw-deduction"),
  vq("tv7e-008", "meaning_match", "\"flexibility\" có nghĩa là gì?", ["sự cứng nhắc", "sự linh hoạt", "sự chần chừ", "sự hỏng hóc"], 1, "Flexibility = khả năng thay đổi thích ứng linh hoạt.", "tvw-flexibility"),
  vq("tv7e-009", "meaning_match", "\"on track\" có nghĩa là gì?", ["đi chệch hướng", "đúng hướng / đúng tiến độ", "bị tạm dừng", "đã hoàn tất"], 1, "On track = diễn ra theo đúng kế hoạch ban đầu.", "tvw-on-track"),
  vq("tv7e-010", "meaning_match", "\"vested\" có nghĩa là gì?", ["đã bị hủy", "được trao quyền sở hữu chính thức", "chưa kiểm tra", "tạm thời"], 1, "Vested rights = quyền lợi đã được xác lập chắc chắn.", "tvw-vested"),
  vq("tv7e-011", "sentence_completion", "The accounting department will _____ staff for approved travel and meal receipts.", ["reimburse", "reject", "deduct", "retire"], 0, "Reimburse staff = hoàn trả chi phí cho nhân viên.", "tvw-reimburse"),
  vq("tv7e-012", "sentence_completion", "She was able to _____ a ten percent salary bump prior to signing her employment contract.", ["negotiate", "reject", "retire", "mentor"], 0, "Negotiate a salary bump = đàm phán tăng lương.", "tvw-negotiate"),
  vq("tv7e-013", "sentence_completion", "The full benefits package includes generous health coverage and performance-based _____.", ["bonuses", "severances", "deductions", "rejections"], 0, "Performance bonuses = tiền thưởng hiệu suất.", "tvw-bonus"),
  vq("tv7e-014", "sentence_completion", "Each newly hired junior coder is assigned an experienced developer as a personal _____.", ["mentor", "payroll", "deduction", "wage"], 0, "Personal mentor = người cố vấn cá nhân.", "tvw-mentor"),
  vq("tv7e-015", "sentence_completion", "Offering schedule _____ helps the technology company attract working parents.", ["flexibility", "severance", "deduction", "rejection"], 0, "Schedule flexibility = sự linh hoạt về giờ giấc.", "tvw-flexibility"),
];

export const tvLesson7: VocabLesson = {
  id: "s2-vocab-07",
  stage: "intermediate",
  order: 14,
  titleVi: "Từ vựng: Tuyển dụng, Đào tạo, Lương & Phúc lợi",
  titleEn: "Vocabulary: Hiring, Training, Salaries & Benefits",
  category: "vocabulary",
  topic: "hiring-salaries",
  words: tv7Words,
  exercises: tv7Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// TV8: Promotions, Pensions & Awards
// ═══════════════════════════════════════════════════════════════════

const tv8Words: VocabWord[] = [
  word("tvw-achievement", "achievement", "/əˈtʃiːv.mənt/", "noun", "thành tích, thành tựu", "Winning the national sustainability award was an outstanding corporate achievement.", "Đoạt giải thưởng phát triển bền vững quốc gia là một thành tựu doanh nghiệp nổi bật.", "promotions-awards", ["remarkable achievement", "sense of achievement", "recognize achievements"], { verb: "achieve" }),
  word("tvw-contribute", "contribute", "/kənˈtrɪb.juːt/", "verb", "đóng góp, cống hiến", "Her innovative user interface designs contributed significantly to user growth.", "Các thiết kế giao diện người dùng sáng tạo của cô ấy đã đóng góp đáng kể vào sự tăng trưởng người dùng.", "promotions-awards", ["contribute to", "contribute funds", "contribute ideas"], { noun: "contribution" }),
  word("tvw-dedication", "dedication", "/ˌded.əˈkeɪ.ʃən/", "noun", "sự tận tụy, cống hiến", "Management rewarded his twenty years of unswerving dedication to the firm.", "Ban quản lý đã khen thưởng hai mươi năm cống hiến không ngừng nghỉ của anh ấy cho công ty.", "promotions-awards", ["dedication to duty", "tireless dedication", "show dedication"], { verb: "dedicate", adjective: "dedicated" }),
  word("tvw-look-forward", "look forward to", "/lʊk ˈfɔːr.wɚd tuː/", "verb", "trông mong, mong đợi", "Retirees look forward to spending peaceful quality time with family.", "Những người nghỉ hưu mong đợi dành thời gian chất lượng yên bình bên gia đình.", "promotions-awards", ["look forward to hearing", "look forward to working", "eagerly look forward"]),
  word("tvw-loyal", "loyal", "/ˈlɔɪ.əl/", "adjective", "trung thành, gắn bó", "The corporation recognized fifty loyal staff members during the anniversary banquet.", "Tập đoàn đã vinh danh năm mươi nhân viên trung thành trong dạ tiệc kỷ niệm.", "promotions-awards", ["loyal employee", "remain loyal", "loyal customer"], { noun: "loyalty" }),
  word("tvw-merit", "merit", "/ˈmer.ɪt/", "noun", "sự xứng đáng, công lao", "Promotions in the research department are awarded strictly on technical merit.", "Các đợt thăng chức trong phòng nghiên cứu được trao thưởng hoàn toàn dựa trên công lao chuyên môn.", "promotions-awards", ["on merit", "artistic merit", "merit-based promotion"]),
  word("tvw-obviously", "obviously", "/ˈɑːb.vi.əs.li/", "adverb", "rõ ràng, hiển nhiên", "She was obviously the most qualified contender for the vice-presidential chair.", "Cô ấy rõ ràng là ứng viên xứng đáng nhất cho chiếc ghế phó chủ tịch.", "promotions-awards", ["obviously pleased", "obviously true", "obviously qualified"], { adjective: "obvious" }),
  word("tvw-productive-hr", "productive", "/prəˈdʌk.tɪv/", "adjective", "đạt năng suất cao", "A contented workforce is inherently more focused and productive.", "Một lực lượng lao động hài lòng về bản chất sẽ tập trung và đạt năng suất cao hơn.", "promotions-awards", ["productive worker", "productive output", "productive environment"], { noun: "productivity" }),
  word("tvw-promote", "promote", "/prəˈmoʊt/", "verb", "thăng chức, quảng bá", "The board voted unanimously to promote Marcus to regional director.", "Hội đồng quản trị đã bỏ phiếu nhất trí thăng chức cho Marcus lên giám đốc khu vực.", "promotions-awards", ["promote to manager", "actively promote", "earn a promotion"], { noun: "promotion" }),
  word("tvw-recognition", "recognition", "/ˌrek.əɡˈnɪʃ.ən/", "noun", "sự công nhận, tôn vinh", "He received an engraved plaque in recognition of exceptional client stewardship.", "Anh ấy đã nhận được một kỷ niệm chương khắc chữ để ghi nhận sự chăm sóc khách hàng xuất sắc.", "promotions-awards", ["in recognition of", "gain recognition", "special recognition"], { verb: "recognize" }),
  word("tvw-value", "value", "/ˈvæl.juː/", "verb", "trân trọng, coi trọng", "Executives value employees who display proactive problem-solving initiative.", "Các nhà điều hành trân trọng những nhân viên thể hiện sáng kiến giải quyết vấn đề chủ động.", "promotions-awards", ["value teamwork", "highly value", "value loyalty"], { noun: "value", adjective: "valuable" }),
  word("tvw-pension", "pension", "/ˈpen.ʃən/", "noun", "lương hưu", "The enterprise sponsors an exemplary corporate pension scheme for staff.", "Doanh nghiệp tài trợ một chương trình lương hưu doanh nghiệp kiểu mẫu cho nhân viên.", "promotions-awards", ["pension plan", "pension fund", "draw a pension"]),
  word("tvw-award", "award", "/əˈwɔːrd/", "noun", "giải thưởng, phần thưởng", "She won the annual Sales Excellence Award for closing forty enterprise accounts.", "Cô ấy đã giành giải thưởng Xuất sắc Bán hàng Hàng năm vì chốt được bốn mươi tài khoản doanh nghiệp.", "promotions-awards", ["win an award", "present an award", "prestigious award"], { verb: "award" }),
  word("tvw-ceremony", "ceremony", "/ˈser.ə.mə.ni/", "noun", "buổi lễ (khen thưởng, kỷ niệm)", "The annual service awards ceremony will commence at seven o'clock.", "Buổi lễ trao giải thưởng cống hiến hàng năm sẽ bắt đầu lúc bảy giờ.", "promotions-awards", ["awards ceremony", "opening ceremony", "graduation ceremony"]),
  word("tvw-honor", "honor", "/ˈɑː.nɚ/", "verb", "tôn vinh, vinh danh", "The institute honored three trailblazing scientists with lifetime fellowships.", "Học viện đã vinh danh ba nhà khoa học tiên phong bằng học bổng trọn đời.", "promotions-awards", ["in honor of", "great honor", "honor an agreement"], { noun: "honor" }),
  word("tvw-distinction", "distinction", "/dɪˈstɪŋk.ʃən/", "noun", "sự xuất sắc, nét đặc biệt", "He served the company with distinction for over thirty-five years.", "Ông đã phục vụ công ty với sự xuất sắc trong hơn ba mươi lăm năm.", "promotions-awards", ["with distinction", "mark of distinction", "draw a distinction"]),
  word("tvw-appraise", "appraise", "/əˈpreɪz/", "verb", "đánh giá thành tích / định giá", "Supervisors appraise employee contributions during annual performance reviews.", "Người giám sát đánh giá đóng góp của nhân viên trong các đợt đánh giá hiệu suất hàng năm.", "promotions-awards", ["appraise performance", "accurately appraise", "appraise value"], { noun: "appraisal" }),
  word("tvw-seniority", "seniority", "/siːnˈjɔːr.ə.t̬i/", "noun", "thâm niên công tác", "Layoff protections and vacation allotments are often dictated by seniority.", "Bảo vệ thôi việc và phân bổ kỳ nghỉ thường do thâm niên quyết định.", "promotions-awards", ["gain seniority", "by seniority", "seniority system"]),
  word("tvw-outstanding", "outstanding", "/ˌaʊtˈstæn.dɪŋ/", "adjective", "xuất sắc, nổi bật", "The committee applauded her outstanding contributions to fiscal compliance.", "Ủy ban hoan nghênh những đóng góp xuất sắc của cô cho việc tuân thủ tài chính.", "promotions-awards", ["outstanding performance", "outstanding debt", "outstanding achievement"]),
  word("tvw-trophy", "trophy", "/ˈtroʊ.fi/", "noun", "cúp lưu niệm, cúp vô địch", "The winning marketing branch proudly hoisted the quarterly sales trophy.", "Chi nhánh tiếp thị chiến thắng đã tự hào nâng cao chiếc cúp doanh số quý.", "promotions-awards", ["trophy presentation", "win a trophy", "championship trophy"]),
  word("tvw-commemorate", "commemorate", "/kəˈmem.ə.reɪt/", "verb", "kỷ niệm, tưởng nhớ", "The company minted a gold coin to commemorate its centenary milestone.", "Công ty đã đúc một đồng xu vàng để kỷ niệm cột mốc trăm năm của mình.", "promotions-awards", ["commemorate an anniversary", "commemorate the event", "special plaque to commemorate"], { noun: "commemoration" }),
  word("tvw-inspire-hr", "inspire", "/ɪnˈspaɪr/", "verb", "thổi bùng cảm hứng", "Her steadfast leadership inspired the entire division through challenging transitions.", "Sự lãnh đạo kiên định của cô đã truyền cảm hứng cho toàn bộ bộ phận vượt qua những giai đoạn chuyển tiếp đầy thử thách.", "promotions-awards", ["inspire staff", "inspire confidence", "inspire greatness"]),
  word("tvw-milestone", "milestone", "/ˈmaɪl.stoʊn/", "noun", "cột mốc quan trọng", "Reaching one million active subscriptions is a historic enterprise milestone.", "Đạt một triệu lượt đăng ký hoạt động là cột mốc lịch sử của doanh nghiệp.", "promotions-awards", ["reach a milestone", "major milestone", "celebrate a milestone"]),
  word("tvw-advance", "advance", "/ədˈvæns/", "verb", "thăng tiến trong sự nghiệp", "Furthering your education creates tangible opportunities to advance internally.", "Nâng cao học vấn tạo ra các cơ hội hữu hình để thăng tiến trong nội bộ.", "promotions-awards", ["advance career", "advance through ranks", "opportunity to advance"], { noun: "advancement" }),
  word("tvw-exceptional", "exceptional", "/ɪkˈsep.ʃən.əl/", "adjective", "đặc biệt xuất chúng", "The customer support lead demonstrated exceptional patience during crises.", "Trưởng nhóm hỗ trợ khách hàng đã thể hiện sự kiên nhẫn đặc biệt trong các cuộc khủng hoảng.", "promotions-awards", ["exceptional service", "exceptional performance", "exceptional talent"]),
];

const tv8Exercises: VocabExercise[] = [
  vq("tv8e-001", "meaning_match", "\"achievement\" có nghĩa là gì?", ["sự trừng phạt", "thành tích / thành tựu", "khoản chi phí", "ngày nghỉ phép"], 1, "Achievement = thành tựu đạt được nhờ nỗ lực.", "tvw-achievement"),
  vq("tv8e-002", "meaning_match", "\"dedication\" có nghĩa là gì?", ["sự chểnh mảng", "sự tận tụy, cống hiến", "tiền lương hưu", "sự từ chức"], 1, "Dedication = sự hết lòng tận tụy vì mục tiêu chung.", "tvw-dedication"),
  vq("tv8e-003", "meaning_match", "\"promote\" có nghĩa là gì?", ["sa thải nhân viên", "thăng chức / bổ nhiệm cao hơn", "chuyển địa điểm", "cắt giảm lương"], 1, "Promote someone = thăng chức cho ai.", "tvw-promote"),
  vq("tv8e-004", "meaning_match", "\"pension\" có nghĩa là gì?", ["tiền đặt cọc", "lương hưu", "tiền phạt chậm", "chi phí ăn uống"], 1, "Pension = tiền lương hưu định kỳ sau khi về hưu.", "tvw-pension"),
  vq("tv8e-005", "meaning_match", "\"recognition\" có nghĩa là gì?", ["sự công nhận, tôn vinh", "sự quên lãng", "sự khiếu nại", "thỏa thuận ngầm"], 0, "Recognition = sự ghi nhận và tôn vinh công lao.", "tvw-recognition"),
  vq("tv8e-006", "meaning_match", "\"milestone\" có nghĩa là gì?", ["hòn đá ngáng đường", "cột mốc quan trọng", "hợp đồng thử việc", "buổi tiệc nhỏ"], 1, "Milestone = mốc phát triển đáng nhớ.", "tvw-milestone"),
  vq("tv8e-007", "meaning_match", "\"seniority\" có nghĩa là gì?", ["thâm niên công tác", "độ tuổi trẻ trung", "chuyên môn kỹ thuật", "khoản bồi thường"], 0, "Seniority = thời gian gắn bó lâu năm với cơ quan.", "tvw-seniority"),
  vq("tv8e-008", "meaning_match", "\"appraise\" có nghĩa là gì?", ["đánh giá / thẩm định thành tích", "khen ngợi qua loa", "bỏ qua lỗi sai", "tăng lương ngay"], 0, "Appraise performance = đánh giá năng lực làm việc.", "tvw-appraise"),
  vq("tv8e-009", "meaning_match", "\"commemorate\" có nghĩa là gì?", ["kỷ niệm, tưởng nhớ", "quên lãng", "tranh cãi", "phân bổ"], 0, "Commemorate an event = kỷ niệm một sự kiện trang trọng.", "tvw-commemorate"),
  vq("tv8e-010", "meaning_match", "\"merit\" có nghĩa là gì?", ["sự may mắn", "công lao, sự xứng đáng", "tiền thế chấp", "bản kiến nghị"], 1, "Merit = giá trị hoặc công lao xứng đáng được ghi nhận.", "tvw-merit"),
  vq("tv8e-011", "sentence_completion", "He was awarded a commemorative plaque in _____ of twenty-five years of dedicated service.", ["recognition", "milestone", "pension", "trophy"], 0, "In recognition of = để ghi nhận công lao.", "tvw-recognition"),
  vq("tv8e-012", "sentence_completion", "Reaching fifty million dollars in quarterly revenue was a major corporate _____.", ["milestone", "dedication", "pension", "ceremony"], 0, "Corporate milestone = cột mốc của doanh nghiệp.", "tvw-milestone"),
  vq("tv8e-013", "sentence_completion", "The executive committee voted unanimously to _____ Ms. Tran to Chief Technology Officer.", ["promote", "appraise", "retire", "dedicate"], 0, "Promote someone to = thăng chức ai lên vị trí.", "tvw-promote"),
  vq("tv8e-014", "sentence_completion", "Staff with more than ten years of _____ are entitled to five weeks of annual vacation.", ["seniority", "achievement", "merit", "trophy"], 0, "Ten years of seniority = 10 năm thâm niên.", "tvw-seniority"),
  vq("tv8e-015", "sentence_completion", "The founder credited the company's sustained success to the unyielding _____ of its staff.", ["dedication", "ceremony", "trophy", "milestone"], 0, "Unyielding dedication = sự cống hiến không ngừng nghỉ.", "tvw-dedication"),
];

export const tvLesson8: VocabLesson = {
  id: "s2-vocab-08",
  stage: "intermediate",
  order: 15,
  titleVi: "Từ vựng: Thăng chức, Hưu trí & Vinh danh Khen thưởng",
  titleEn: "Vocabulary: Promotions, Pensions & Awards",
  category: "vocabulary",
  topic: "promotions-awards",
  words: tv8Words,
  exercises: tv8Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// TV9: Ordering Supplies & Shipping
// ═══════════════════════════════════════════════════════════════════

const tv9Words: VocabWord[] = [
  word("tvw-carrier", "carrier", "/ˈker.i.ɚ/", "noun", "hãng vận tải, công ty chuyển hàng", "We partner with a dependable maritime carrier for transatlantic container freight.", "Chúng tôi hợp tác với một hãng vận tải đường biển đáng tin cậy cho hàng hóa container xuyên Đại Tây Dương.", "supplies-shipping", ["mail carrier", "freight carrier", "common carrier"]),
  word("tvw-catalog-s2", "catalog", "/ˈkæt̬.əl.ɑːɡ/", "noun", "cuốn danh mục sản phẩm", "The office manager ordered printer drums from the wholesale supply catalog.", "Người quản lý văn phòng đã đặt mua trống máy in từ danh mục vật tư bán buôn.", "supplies-shipping", ["product catalog", "browse the catalog", "order from catalog"]),
  word("tvw-fulfill", "fulfill", "/fʊlˈfɪl/", "verb", "hoàn thành, đáp ứng (đơn hàng)", "The distribution hub fulfills over ten thousand customer orders daily.", "Trung tâm phân phối hoàn thành hơn mười nghìn đơn đặt hàng của khách mỗi ngày.", "supplies-shipping", ["fulfill an order", "fulfill obligations", "fulfill requirements"], { noun: "fulfillment" }),
  word("tvw-integral", "integral", "/ˈɪn.t̬ə.ɡrəl/", "adjective", "không thể thiếu, cốt lõi", "Reliable warehousing logistics are an integral component of our supply chain.", "Dịch vụ hậu cần kho bãi đáng tin cậy là một bộ phận không thể thiếu trong chuỗi cung ứng của chúng tôi.", "supplies-shipping", ["integral part", "integral to success", "integral role"]),
  word("tvw-inventory-s2", "inventory", "/ˈɪn.vən.tɔːr.i/", "noun", "hàng tồn kho", "The supply depot keeps a lean inventory to reduce warehouse storage fees.", "Kho vật tư duy trì lượng hàng tồn kho tinh gọn để giảm phí lưu kho.", "supplies-shipping", ["maintain inventory", "inventory control", "deplete inventory"]),
  word("tvw-minimize", "minimize", "/ˈmɪn.ə.maɪz/", "verb", "giảm thiểu đến mức tối đa", "Proper packaging minimizes transit damage to delicate crystal tableware.", "Đóng gói đúng cách giảm thiểu tối đa thiệt hại khi vận chuyển cho đồ dùng bằng pha lê tinh xảo.", "supplies-shipping", ["minimize costs", "minimize risks", "minimize delays"], { noun: "minimization" }),
  word("tvw-on-hand", "on hand", "/ɑːn hænd/", "adjective", "có sẵn trong kho", "We must keep at least fifty replacement printer toner cartridges on hand.", "Chúng ta phải luôn có sẵn ít nhất năm mươi hộp mực máy in thay thế trong kho.", "supplies-shipping", ["supplies on hand", "cash on hand", "available on hand"]),
  word("tvw-remember", "remember", "/rɪˈmem.bɚ/", "verb", "ghi nhớ", "Remember to annotate the shipment tracking number on the bill of lading.", "Nhớ chú thích số theo dõi lô hàng trên vận đơn đường biển.", "supplies-shipping", ["remember to check", "remember that", "clearly remember"]),
  word("tvw-ship", "ship", "/ʃɪp/", "verb", "gửi hàng, vận chuyển", "All in-stock consumer electronics will ship within twenty-four hours.", "Tất cả các thiết bị điện tử tiêu dùng còn hàng sẽ được gửi đi trong vòng hai mươi tư giờ.", "supplies-shipping", ["ship an order", "ready to ship", "ship by air"], { noun: "shipment" }),
  word("tvw-sufficiently", "sufficiently", "/səˈfɪʃ.ənt.li/", "adverb", "đầy đủ, thỏa đáng", "Ensure items are sufficiently cushioned with bubble wrap before boxing.", "Đảm bảo các món đồ được đệm lót đầy đủ bằng màng xốp hơi trước khi đóng hộp.", "supplies-shipping", ["sufficiently covered", "sufficiently funded", "sufficiently protected"], { adjective: "sufficient" }),
  word("tvw-supply", "supply", "/səˈplaɪ/", "noun", "nguồn cung cấp, vật tư", "The warehouse ran low on essential packing tape and cardboard supplies.", "Nhà kho gần hết băng keo đóng gói và vật tư bìa cứng thiết yếu.", "supplies-shipping", ["office supplies", "supply chain", "in short supply"], { verb: "supply", noun: "supplier" }),
  word("tvw-dispatch", "dispatch", "/dɪˈspætʃ/", "verb", "phát hành, gửi đi hỏa tốc", "The logistics center dispatched five emergency freight trucks at dawn.", "Trung tâm hậu cần đã điều động năm xe tải chở hàng khẩn cấp lúc rạng đông.", "supplies-shipping", ["dispatch a shipment", "promptly dispatch", "dispatch couriers"], { noun: "dispatch" }),
  word("tvw-consignment", "consignment", "/kənˈsaɪn.mənt/", "noun", "lô hàng ký gửi, chuyến hàng", "Customs clearance officers inspected the foreign timber consignment.", "Các cán bộ hải quan đã kiểm tra lô hàng gỗ nước ngoài ký gửi.", "supplies-shipping", ["consignment of goods", "send on consignment", "receive a consignment"], { verb: "consign" }),
  word("tvw-freight", "freight", "/freɪt/", "noun", "hàng hóa chuyên chở, cước phí", "Air freight is faster but substantially more expensive than sea carriage.", "Vận tải hàng không nhanh hơn nhưng đắt hơn đáng kể so với vận tải đường biển.", "supplies-shipping", ["air freight", "freight forwarder", "freight charges"]),
  word("tvw-warehouse", "warehouse", "/ˈwer.haʊs/", "noun", "nhà kho lớn", "The retailer operates an automated five-acre distribution warehouse.", "Nhà bán lẻ vận hành một nhà kho phân phối tự động rộng năm mẫu Anh.", "supplies-shipping", ["warehouse manager", "store in a warehouse", "warehouse storage"]),
  word("tvw-logistics", "logistics", "/ləˈdʒɪs.tɪks/", "noun", "ngành hậu cần, vận chuyển kho bãi", "Managing global logistics requires sophisticated ERP software tracking.", "Quản lý hậu cần toàn cầu đòi hỏi theo dõi bằng phần mềm ERP tinh vi.", "supplies-shipping", ["logistics management", "reverse logistics", "third-party logistics"]),
  word("tvw-procurement", "procurement", "/prəˈkjʊr.mənt/", "noun", "hoạt động thu mua vật tư", "The director of procurement negotiated volume discounts for paper reams.", "Giám đốc thu mua đã đàm phán mức giảm giá theo số lượng cho các ram giấy.", "supplies-shipping", ["procurement officer", "procurement process", "government procurement"], { verb: "procure" }),
  word("tvw-track", "track", "/træk/", "verb", "theo dõi lộ trình", "Customers can track their parcel delivery in real time via our app.", "Khách hàng có thể theo dõi việc giao bưu kiện của họ theo thời gian thực qua ứng dụng của chúng tôi.", "supplies-shipping", ["track a package", "tracking number", "track progress"]),
  word("tvw-expedite", "expedite", "/ˈek.spə.daɪt/", "verb", "xúc tiến, đẩy nhanh tiến độ", "Pay an extra tariff if you need the factory to expedite production.", "Trả thêm phụ phí nếu bạn cần nhà máy đẩy nhanh tiến độ sản xuất.", "supplies-shipping", ["expedite delivery", "expedite the process", "expedite an order"], { adjective: "expedited" }),
  word("tvw-shortage", "shortage", "/ˈʃɔːr.t̬ɪdʒ/", "noun", "sự thiếu hụt, khan hiếm", "Semiconductor shortages temporarily halted auto assembly lines.", "Sự thiếu hụt chất bán dẫn đã tạm thời làm dừng các dây chuyền lắp ráp ô tô.", "supplies-shipping", ["supply shortage", "severe shortage", "labor shortage"]),
  word("tvw-restock", "restock", "/ˌriːˈstɑːk/", "verb", "bổ sung hàng tồn kho", "The grocery depot restocks fresh dairy provisions every midnight.", "Kho hàng tạp hóa bổ sung các sản phẩm sữa tươi vào mỗi nửa đêm.", "supplies-shipping", ["restock shelves", "restock supplies", "promptly restock"]),
  word("tvw-haul", "haul", "/hɑːl/", "verb", "vận chuyển đường dài (bằng xe tải/tàu)", "Long-distance articulated trucks haul container cargo across states.", "Những chiếc xe tải khớp nối đường dài vận chuyển hàng container xuyên các tiểu bang.", "supplies-shipping", ["long haul", "haul cargo", "short haul"]),
  word("tvw-depot", "depot", "/ˈdiː.poʊ/", "noun", "trạm trung chuyển hàng, kho hàng", "Buses and distribution vans return to the central depot each evening.", "Xe buýt và xe van phân phối quay trở lại trạm trung chuyển trung tâm mỗi tối.", "supplies-shipping", ["supply depot", "bus depot", "storage depot"]),
  word("tvw-fragile", "fragile", "/ˈfrædʒ.əl/", "adjective", "dễ vỡ (hàng hóa)", "Stickers reading 'Fragile - Handle with Care' were affixed to boxes.", "Các nhãn dán có nội dung 'Dễ vỡ - Xin nhẹ tay' được dán vào các thùng hàng.", "supplies-shipping", ["fragile goods", "fragile items", "extremely fragile"]),
  word("tvw-damaged", "damaged", "/ˈdæm.ɪdʒd/", "adjective", "bị hư hại, hỏng", "The carrier promptly reimbursed the merchant for damaged consignments.", "Hãng vận tải đã nhanh chóng bồi thường cho thương nhân về các lô hàng bị hư hỏng.", "supplies-shipping", ["damaged goods", "damaged in transit", "badly damaged"], { verb: "damage" }),
];

const tv9Exercises: VocabExercise[] = [
  vq("tv9e-001", "meaning_match", "\"fulfill\" trong vận chuyển đơn hàng có nghĩa là gì?", ["hủy bỏ đơn hàng", "hoàn tất / giao đáp ứng đơn hàng", "kéo dài hạn chót", "tính thêm thuế"], 1, "Fulfill an order = thực hiện và giao đủ đơn hàng.", "tvw-fulfill"),
  vq("tv9e-002", "meaning_match", "\"on hand\" có nghĩa là gì?", ["đang trên đường đi", "có sẵn trong kho để dùng", "được đặt hàng từ nước ngoài", "bị hỏng hóc"], 1, "On hand = có sẵn tại chỗ, trong kho sẵn sàng sử dụng.", "tvw-on-hand"),
  vq("tv9e-003", "meaning_match", "\"expedite\" có nghĩa là gì?", ["làm chậm trễ", "đẩy nhanh tiến độ / xúc tiến", "hoãn chuyến tàu", "kiểm tra lại số lượng"], 1, "Expedite = thúc đẩy tiến độ diễn ra nhanh hơn bình thường.", "tvw-expedite"),
  vq("tv9e-004", "meaning_match", "\"carrier\" trong logistics chỉ cái gì?", ["người mua hàng", "hãng vận tải / công ty vận chuyển", "nhà sản xuất bao bì", "nhân viên kiểm kho"], 1, "Carrier = công ty đảm nhận chở hàng hóa.", "tvw-carrier"),
  vq("tv9e-005", "meaning_match", "\"freight\" có nghĩa là gì?", ["hàng hóa chuyên chở / cước vận chuyển", "hợp đồng thử việc", "hóa đơn quá hạn", "tiền hoa hồng"], 0, "Freight = hàng hóa được vận chuyển bằng đường bộ, biển, hàng không.", "tvw-freight"),
  vq("tv9e-006", "meaning_match", "\"fragile\" có nghĩa là gì?", ["rất bền chắc", "dễ vỡ / cần nhẹ tay", "chống thấm nước", "được giảm giá"], 1, "Fragile = dễ đổ vỡ, hư hỏng nếu va đập.", "tvw-fragile"),
  vq("tv9e-007", "meaning_match", "\"procurement\" có nghĩa là gì?", ["hoạt động thu mua vật tư / trang thiết bị", "việc sa thải nhân viên", "quảng cáo sản phẩm", "sửa chữa máy móc"], 0, "Procurement = hoạt động mua sắm, đấu thầu cung ứng vật tư.", "tvw-procurement"),
  vq("tv9e-008", "meaning_match", "\"restock\" có nghĩa là gì?", ["bán tháo hàng tồn", "bổ sung hàng vào kho", "xóa sổ tài khoản", "đổi nhà cung ứng"], 1, "Restock = nạp thêm hàng hóa vào kho sau khi đã vơi.", "tvw-restock"),
  vq("tv9e-009", "meaning_match", "\"shortage\" có nghĩa là gì?", ["sự dư thừa", "sự thiếu hụt, khan hiếm", "bản danh mục", "chi phí cố định"], 1, "Shortage = tình trạng thiếu hàng hóa/vật tư.", "tvw-shortage"),
  vq("tv9e-010", "meaning_match", "\"minimize\" có nghĩa là gì?", ["khuếch đại lên", "giảm thiểu đến mức tối đa", "bỏ qua không xử lý", "tạm ngừng hoạt động"], 1, "Minimize = thu hẹp hoặc giảm xuống mức thấp nhất.", "tvw-minimize"),
  vq("tv9e-011", "sentence_completion", "Our automated fulfillment center can _____ over five thousand orders every working hour.", ["fulfill", "minimize", "shortage", "haul"], 0, "Fulfill orders = hoàn thành đơn đặt hàng.", "tvw-fulfill"),
  vq("tv9e-012", "sentence_completion", "Please affix bright 'Caution: _____' stickers to all boxes containing glass beakers.", ["Fragile", "Integral", "On hand", "Damaged"], 0, "Fragile sticker = nhãn dán hàng dễ vỡ.", "tvw-fragile"),
  vq("tv9e-013", "sentence_completion", "The purchasing supervisor requested an urgent fee payment to _____ overseas delivery.", ["expedite", "remember", "fulfill", "restock"], 0, "Expedite delivery = thúc đẩy giao hàng nhanh.", "tvw-expedite"),
  vq("tv9e-014", "sentence_completion", "Because of a global silicone _____, laptop delivery times lengthened by four weeks.", ["shortage", "carrier", "procurement", "inventory"], 0, "Silicone shortage = sự thiếu hụt silicon.", "tvw-shortage"),
  vq("tv9e-015", "sentence_completion", "Clients can enter their package number online to _____ shipment transit milestones.", ["track", "fulfill", "dispatch", "minimize"], 0, "Track shipment = theo dõi lộ trình đơn hàng.", "tvw-track"),
];

export const tvLesson9: VocabLesson = {
  id: "s2-vocab-09",
  stage: "intermediate",
  order: 16,
  titleVi: "Từ vựng: Đặt hàng Vật tư & Giao nhận Logistics",
  titleEn: "Vocabulary: Ordering Supplies & Shipping",
  category: "vocabulary",
  topic: "supplies-shipping",
  words: tv9Words,
  exercises: tv9Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// TV10: Invoices & Inventory
// ═══════════════════════════════════════════════════════════════════

const tv10Words: VocabWord[] = [
  word("tvw-accumulate", "accumulate", "/əˈkjuː.mjə.leɪt/", "verb", "tích lũy, dồn ứ lại", "Unpaid late penalty charges accumulate interest every billing cycle.", "Các khoản phí phạt nộp muộn chưa thanh toán tích lũy thêm tiền lãi mỗi chu kỳ tính cước.", "invoices-inventory", ["accumulate debt", "accumulate wealth", "gradually accumulate"], { noun: "accumulation" }),
  word("tvw-asset", "asset", "/ˈæs.et/", "noun", "tài sản", "Patents and trademarks represent critical intangible assets on the balance sheet.", "Bằng sáng chế và nhãn hiệu đại diện cho các tài sản vô hình quan trọng trên bảng cân đối kế toán.", "invoices-inventory", ["fixed assets", "current assets", "valuable asset"]),
  word("tvw-audit-s2", "audit", "/ˈɔː.dɪt/", "noun", "cuộc kiểm toán", "External certified public accountants conducted an unannounced warehouse inventory audit.", "Các kế toán viên công chứng bên ngoài đã tiến hành một cuộc kiểm toán hàng tồn kho bất ngờ.", "invoices-inventory", ["internal audit", "independent audit", "audit report"], { verb: "audit" }),
  word("tvw-budget-s2", "budget", "/ˈbʌdʒ.ɪt/", "noun", "ngân sách", "The finance committee approved an expanded annual procurement budget.", "Ủy ban tài chính đã phê duyệt ngân sách mua sắm hàng năm được mở rộng.", "invoices-inventory", ["operating budget", "balanced budget", "within budget"]),
  word("tvw-build-up", "build up", "/bɪld ʌp/", "verb", "xây dựng, gia tăng dần", "The distributor aims to build up buffer stocks prior to holiday peaks.", "Nhà phân phối hướng tới việc gia tăng lượng hàng đệm dự trữ trước các đợt cao điểm ngày lễ.", "invoices-inventory", ["build up inventory", "build up reserves", "build up trust"]),
  word("tvw-client", "client", "/ˈklaɪ.ənt/", "noun", "khách hàng (dịch vụ)", "The accounting firm advises over fifty blue-chip corporate clients.", "Công ty kế toán tư vấn cho hơn năm mươi khách hàng doanh nghiệp hàng đầu.", "invoices-inventory", ["corporate client", "client relationship", "prospective client"]),
  word("tvw-debt", "debt", "/det/", "noun", "khoản nợ", "Aggressive debt restructuring slashed the company's annual interest burden.", "Tái cơ cấu nợ quyết liệt đã cắt giảm gánh nặng lãi suất hàng năm của công ty.", "invoices-inventory", ["incur debt", "pay off debt", "outstanding debt"]),
  word("tvw-outstanding-debt", "outstanding", "/ˌaʊtˈstæn.dɪŋ/", "adjective", "chưa thanh toán (hóa đơn, nợ)", "Please remit payment for all outstanding invoices within ten business days.", "Vui lòng thanh toán cho tất cả các hóa đơn còn chưa thanh toán trong vòng mười ngày làm việc.", "invoices-inventory", ["outstanding balance", "outstanding invoice", "outstanding bill"]),
  word("tvw-profitable", "profitable", "/ˈprɑː.fɪ.t̬ə.bəl/", "adjective", "sinh lời, có lợi nhuận", "Divesting unprofitable product lines helped the firm regain solvency.", "Thoái vốn khỏi các dòng sản phẩm không có lãi đã giúp công ty lấy lại khả năng thanh toán.", "invoices-inventory", ["highly profitable", "remain profitable", "profitable business"], { noun: "profit" }),
  word("tvw-reconcile", "reconcile", "/ˈrek.ən.saɪl/", "verb", "đối chiếu sổ sách, làm cho khớp", "Bookkeepers reconcile bank account statements with cash ledgers monthly.", "Nhân viên ghi sổ đối chiếu sao kê tài khoản ngân hàng với sổ cái tiền mặt hàng tháng.", "invoices-inventory", ["reconcile accounts", "reconcile differences", "reconcile records"], { noun: "reconciliation" }),
  word("tvw-turnover", "turnover", "/ˈtɝːnˌoʊ.vɚ/", "noun", "tốc độ quay vòng (hàng tồn kho/vốn)", "A high inventory turnover ratio signals energetic retail customer demand.", "Tỷ lệ quay vòng hàng tồn kho cao báo hiệu nhu cầu mua sắm mạnh mẽ của khách bán lẻ.", "invoices-inventory", ["inventory turnover", "annual turnover", "high turnover"]),
  word("tvw-verify", "verify", "/ˈver.ə.faɪ/", "verb", "xác minh, kiểm tra độ chính xác", "Receiving clerks verify each delivered pallet against the vendor purchase order.", "Nhân viên nhận hàng kiểm tra từng kiện hàng được giao theo đúng đơn đặt hàng của nhà cung cấp.", "invoices-inventory", ["verify credentials", "verify information", "independently verify"], { noun: "verification" }),
  word("tvw-discrepancy", "discrepancy", "/dɪˈskrep.ən.si/", "noun", "sự sai lệch, bất nhất (số liệu)", "An internal audit flagged a ten thousand dollar discrepancy in receivables.", "Một cuộc kiểm toán nội bộ đã chỉ ra sự sai lệch mười nghìn đô la trong các khoản phải thu.", "invoices-inventory", ["unexplained discrepancy", "resolve discrepancies", "noticeable discrepancy"]),
  word("tvw-ledger", "ledger", "/ˈledʒ.ɚ/", "noun", "sổ cái kế toán", "All expenditures are meticulously transcribed into the central ledger.", "Tất cả các khoản chi tiêu đều được ghi chép tỉ mỉ vào sổ cái trung tâm.", "invoices-inventory", ["general ledger", "accounting ledger", "record in a ledger"]),
  word("tvw-remit", "remit", "/rɪˈmɪt/", "verb", "chuyển tiền thanh toán", "Please remit your monthly installment via authorized direct wire transfer.", "Vui lòng chuyển khoản tiền trả góp hàng tháng của bạn qua điện chuyển tiền trực tiếp được ủy quyền.", "invoices-inventory", ["remit payment", "remit funds", "remit promptly"], { noun: "remittance" }),
  word("tvw-statement", "statement", "/ˈsteɪt.mənt/", "noun", "bản sao kê tài khoản", "Customers can view their monthly credit billing statements online.", "Khách hàng có thể xem các bản sao kê thanh toán tín dụng hàng tháng của họ trực tuyến.", "invoices-inventory", ["bank statement", "billing statement", "financial statement"]),
  word("tvw-overdue", "overdue", "/ˌoʊ.vɚˈduː/", "adjective", "quá hạn thanh toán", "Interest penalties apply automatically to invoices overdue past thirty days.", "Tiền phạt lãi suất sẽ tự động áp dụng đối với các hóa đơn quá hạn quá ba mươi ngày.", "invoices-inventory", ["overdue payment", "long overdue", "overdue invoice"]),
  word("tvw-surplus", "surplus", "/ˈsɝː.pləs/", "noun", "số thặng dư, phần dư thừa", "A budget surplus permitted the municipality to fund park refurbishments.", "Thặng dư ngân sách đã cho phép chính quyền thành phố tài trợ việc cải tạo công viên.", "invoices-inventory", ["budget surplus", "trade surplus", "surplus inventory"]),
  word("tvw-deficit", "deficit", "/ˈdef.ə.sɪt/", "noun", "sự thâm hụt tài chính", "The fiscal deficit widened due to unexpected infrastructure outlays.", "Thâm hụt tài khóa nới rộng do các khoản chi tiêu cơ sở hạ tầng bất ngờ.", "invoices-inventory", ["budget deficit", "trade deficit", "finance a deficit"]),
  word("tvw-depreciate", "depreciate", "/dɪˈpriː.ʃi.eɪt/", "verb", "khấu hao (tài sản), giảm giá trị", "Company delivery fleet vehicles depreciate at twenty percent annually.", "Đội xe giao hàng của công ty khấu hao ở mức hai mươi phần trăm hàng năm.", "invoices-inventory", ["depreciate over time", "depreciate assets", "rapidly depreciate"], { noun: "depreciation" }),
  word("tvw-appraisal", "appraisal", "/əˈpreɪ.zəl/", "noun", "sự định giá tài sản", "An independent appraisal established the commercial site's market price.", "Một cuộc định giá độc lập đã xác định giá thị trường của khu đất thương mại.", "invoices-inventory", ["property appraisal", "formal appraisal", "obtain an appraisal"]),
  word("tvw-exempt", "exempt", "/ɪɡˈzempt/", "adjective", "được miễn thuế / nghĩa vụ", "Charitable donations are fully exempt from local taxation.", "Các khoản quyên góp từ thiện được miễn thuế địa phương hoàn toàn.", "invoices-inventory", ["tax-exempt", "exempt from", "exempt status"], { noun: "exemption" }),
  word("tvw-delinquent", "delinquent", "/dɪˈlɪŋ.kwənt/", "adjective", "chậm thanh toán, trễ nợ", "The finance department issued formal collection notices for delinquent accounts.", "Phòng tài chính đã ban hành thông báo thu nợ chính thức cho các tài khoản chậm thanh toán.", "invoices-inventory", ["delinquent payment", "delinquent account", "delinquent taxes"]),
  word("tvw-expenditure", "expenditure", "/ɪkˈspen.də.tʃɚ/", "noun", "khoản chi tiêu, chi phí", "Capital expenditure on automation machinery surged over the prior year.", "Chi tiêu vốn cho máy móc tự động hóa đã tăng vọt so với năm trước.", "invoices-inventory", ["capital expenditure", "annual expenditure", "curb expenditures"]),
  word("tvw-lucrative", "lucrative", "/ˈluː.krə.t̬ɪv/", "adjective", "sinh lợi lớn, béo bở", "The software startup inked a lucrative multimillion-dollar enterprise contract.", "Công ty khởi nghiệp phần mềm đã ký một hợp đồng doanh nghiệp béo bở trị giá hàng triệu đô la.", "invoices-inventory", ["lucrative deal", "lucrative market", "highly lucrative"]),
];

const tv10Exercises: VocabExercise[] = [
  vq("tv10e-001", "meaning_match", "\"discrepancy\" có nghĩa là gì?", ["sự trùng khớp", "sự sai lệch / mâu thuẫn số liệu", "khoản nợ quá hạn", "tài sản cố định"], 1, "Discrepancy = sự bất nhất hoặc sai lệch giữa hai bảng số liệu.", "tvw-discrepancy"),
  vq("tv10e-002", "meaning_match", "\"reconcile\" trong kế toán có nghĩa là gì?", ["đối chiếu làm khớp sổ sách", "xóa sổ tài khoản", "tăng thêm thuế", "bỏ qua khoản chênh lệch"], 0, "Reconcile accounts = đối chiếu sổ sách đối soát tiền nong.", "tvw-reconcile"),
  vq("tv10e-003", "meaning_match", "\"remit\" có nghĩa là gì?", ["hủy bỏ hợp đồng", "chuyển tiền thanh toán", "đòi bồi thường", "bán tài sản"], 1, "Remit payment = gửi tiền thanh toán theo hóa đơn.", "tvw-remit"),
  vq("tv10e-004", "meaning_match", "\"outstanding\" khi nói về hóa đơn nợ có nghĩa là gì?", ["rất xuất sắc", "còn tồn đọng / chưa thanh toán", "đã hoàn trả", "được miễn thuế"], 1, "Outstanding bill = hóa đơn nợ còn chưa trả.", "tvw-outstanding-debt"),
  vq("tv10e-005", "meaning_match", "\"overdue\" có nghĩa là gì?", ["đến sớm", "quá hạn thanh toán", "được giảm giá", "đã kiểm toán"], 1, "Overdue = quá thời hạn quy định.", "tvw-overdue"),
  vq("tv10e-006", "meaning_match", "\"lucrative\" có nghĩa là gì?", ["gây thua lỗ", "sinh lợi béo bở / hái ra tiền", "ít rủi ro", "đắt đỏ"], 1, "Lucrative contract = hợp đồng đem lại món lợi nhuận kếch xù.", "tvw-lucrative"),
  vq("tv10e-007", "meaning_match", "\"surplus\" có nghĩa là gì?", ["sự thiếu hụt", "số tiền / hàng thặng dư thừa", "khoản nợ xấu", "chi phí định kỳ"], 1, "Surplus = phần dôi dư ra sau khi đã chi tiêu đủ.", "tvw-surplus"),
  vq("tv10e-008", "meaning_match", "\"deficit\" có nghĩa là gì?", ["sự thặng dư", "sự thâm hụt / thiếu hụt tài chính", "lợi nhuận ròng", "tài sản vô hình"], 1, "Deficit = thâm hụt cán cân tài chính.", "tvw-deficit"),
  vq("tv10e-009", "meaning_match", "\"depreciate\" có nghĩa là gì?", ["tăng giá phi mã", "khấu hao / mất giá dần theo thời gian", "bảo hiểm toàn diện", "ký quỹ"], 1, "Depreciate = sự giảm giá trị hao mòn của tài sản.", "tvw-depreciate"),
  vq("tv10e-010", "meaning_match", "\"exempt\" có nghĩa là gì?", ["phải chịu phạt", "được miễn trừ nghĩa vụ / thuế", "quá hạn", "đang chờ duyệt"], 1, "Tax-exempt = được miễn trừ đóng thuế.", "tvw-exempt"),
  vq("tv10e-011", "sentence_completion", "Bookkeepers noticed a five-hundred-dollar _____ between the receipts and bank statements.", ["discrepancy", "surplus", "deficit", "lucrative"], 0, "Notice a discrepancy = nhận thấy sự sai lệch số liệu.", "tvw-discrepancy"),
  vq("tv10e-012", "sentence_completion", "Customers who fail to pay within thirty days will receive a reminder for _____ balances.", ["overdue", "surplus", "exempt", "lucrative"], 0, "Overdue balances = số dư quá hạn thanh toán.", "tvw-overdue"),
  vq("tv10e-013", "sentence_completion", "Please _____ the total invoice amount to the bank account listed at the bottom of the page.", ["remit", "depreciate", "accumulate", "reconcile"], 0, "Remit the amount = chuyển khoản số tiền.", "tvw-remit"),
  vq("tv10e-014", "sentence_completion", "The accounting team meets every Friday to _____ petty cash outlays with physical receipts.", ["reconcile", "depreciate", "remit", "incur"], 0, "Reconcile outlays = đối chiếu đối soát các khoản chi.", "tvw-reconcile"),
  vq("tv10e-015", "sentence_completion", "Signing the new licensing partnership proved exceptionally _____ for the software enterprise.", ["lucrative", "overdue", "exempt", "delinquent"], 0, "Lucrative partnership = quan hệ đối tác sinh lợi cao.", "tvw-lucrative"),
];

export const tvLesson10: VocabLesson = {
  id: "s2-vocab-10",
  stage: "intermediate",
  order: 17,
  titleVi: "Từ vựng: Hóa đơn, Kế toán & Kiểm kê Kho hàng",
  titleEn: "Vocabulary: Invoices & Inventory",
  category: "vocabulary",
  topic: "invoices-inventory",
  words: tv10Words,
  exercises: tv10Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// MINI TEST TV2 (Covers TV6 - TV10: 20 Questions)
// ═══════════════════════════════════════════════════════════════════

export const stage2VocabMiniTest2: TestUnit = {
  id: "s2-test-vmini02",
  stage: "intermediate",
  order: 18,
  titleVi: "Mini Test Từ vựng Trung cấp 2: Tổng hợp TV6-TV10",
  titleEn: "Intermediate Vocab Mini Test 2: TV6-TV10 Review",
  category: "test",
  testType: "mini_test",
  coversLessonIds: [
    "s2-vocab-06", "s2-vocab-07", "s2-vocab-08", "s2-vocab-09", "s2-vocab-10"
  ],
  passingScore: 70,
  timeLimit: 20,
  exercises: [
    vq("tvmt2-001", "meaning_match", "\"vacancy\" trong thông báo tuyển dụng có nghĩa là gì?", ["người tìm việc", "vị trí việc làm còn trống", "thời gian thử việc", "mức lương khởi điểm"], 1, "Job vacancy = vị trí còn trống.", "tvw-vacancy"),
    vq("tvmt2-002", "meaning_match", "\"eligible\" có nghĩa là gì?", ["hợp lệ / đủ tư cách hưởng quyền lợi", "bị sa thải", "không đạt tiêu chuẩn", "đang do dự"], 0, "Eligible = đủ điều kiện.", "tvw-eligible"),
    vq("tvmt2-003", "meaning_match", "\"reimburse\" có nghĩa là gì?", ["khấu trừ lương", "hoàn trả chi phí công tác", "đóng bảo hiểm", "ký lại hợp đồng"], 1, "Reimburse = hoàn tiền chi phí công vụ.", "tvw-reimburse"),
    vq("tvmt2-004", "meaning_match", "\"delicate\" khi nói về việc thương thảo lương mang nghĩa:", ["thô lỗ", "tế nhị, khéo léo", "dễ dãi", "cứng nhắc"], 1, "Delicate negotiation = cuộc thương thảo tế nhị.", "tvw-delicate"),
    vq("tvmt2-005", "meaning_match", "\"milestone\" có nghĩa là gì?", ["sự sa sút", "cột mốc phát triển đáng nhớ", "chi phí vận chuyển", "biên lai thanh toán"], 1, "Milestone = cột mốc thành tựu.", "tvw-milestone"),
    vq("tvmt2-006", "meaning_match", "\"seniority\" có nghĩa là gì?", ["kinh nghiệm còn non nớt", "thâm niên công tác", "độ tuổi trung bình", "sự thăng tiến nhanh"], 1, "Seniority = số năm công tác thâm niên.", "tvw-seniority"),
    vq("tvmt2-007", "meaning_match", "\"fulfill\" đối với đơn hàng có nghĩa là gì?", ["hoàn thành / giao đủ đơn hàng", "từ chối giao", "tăng cước vận chuyển", "báo thiếu hàng"], 0, "Fulfill an order = xử lý giao trọn vẹn đơn.", "tvw-fulfill"),
    vq("tvmt2-008", "meaning_match", "\"expedite\" có nghĩa là gì?", ["thúc đẩy nhanh tiến độ giao nhận", "hoãn lại vô thời hạn", "chuyển sang đường biển", "kiểm tra lại mã vạch"], 0, "Expedite = đẩy nhanh tốc độ.", "tvw-expedite"),
    vq("tvmt2-009", "meaning_match", "\"discrepancy\" có nghĩa là gì?", ["sự trùng lặp", "sự bất nhất / chênh lệch số liệu", "khoản tiền thưởng", "bản sao kê"], 1, "Discrepancy = sai lệch giữa hai nguồn dữ liệu.", "tvw-discrepancy"),
    vq("tvmt2-010", "meaning_match", "\"lucrative\" có nghĩa là gì?", ["lỗ vốn", "sinh lợi béo bở / doanh thu lớn", "nhiều tranh chấp", "tạm thời"], 1, "Lucrative = đem lại nhiều lợi nhuận tài chính.", "tvw-lucrative"),
    vq("tvmt2-011", "sentence_completion", "The human resources department compiled a _____ of five candidates for the executive role.", ["shortlist", "probation", "dedication", "vacancy"], 0, "Shortlist of candidates = danh sách rút gọn ứng viên.", "tvw-shortlist"),
    vq("tvmt2-012", "sentence_completion", "Junior staff members are encouraged to consult with an experienced staff _____ for guidance.", ["mentor", "carrier", "trophy", "discrepancy"], 0, "Staff mentor = người cố vấn.", "tvw-mentor"),
    vq("tvmt2-013", "sentence_completion", "The finance manager will _____ your travel expenses after you submit authentic receipts.", ["reimburse", "reject", "deduct", "retire"], 0, "Reimburse travel expenses = hoàn trả chi phí đi lại.", "tvw-reimburse"),
    vq("tvmt2-014", "sentence_completion", "The executive committee voted to _____ Mr. Kim in recognition of his stellar leadership.", ["promote", "retire", "reimburse", "deduct"], 0, "Promote someone = thăng chức cho ai.", "tvw-promote"),
    vq("tvmt2-015", "sentence_completion", "The logistics center can _____ shipments within twelve hours thanks to automated sorting.", ["dispatch", "accumulate", "reconcile", "depreciate"], 0, "Dispatch shipments = phát chuyển hàng đi.", "tvw-dispatch"),
    vq("tvmt2-016", "sentence_completion", "Please handle the crate with extreme care because its contents are highly _____.", ["fragile", "durable", "lucrative", "sufficient"], 0, "Highly fragile = rất dễ vỡ.", "tvw-fragile"),
    vq("tvmt2-017", "sentence_completion", "Our accounting software can automatically _____ electronic bank statements with daily invoices.", ["reconcile", "depreciate", "remit", "expedite"], 0, "Reconcile statements = đối chiếu sao kê.", "tvw-reconcile"),
    vq("tvmt2-018", "sentence_completion", "A penalty fee was assessed because payment for the invoice was sixty days _____.", ["overdue", "exempt", "lucrative", "on track"], 0, "Overdue invoice = hóa đơn quá hạn.", "tvw-overdue"),
    vq("tvmt2-019", "sentence_completion", "The enterprise secured a highly _____ contract to supply cloud servers to the ministry.", ["lucrative", "delinquent", "overdue", "fragile"], 0, "Lucrative contract = hợp đồng béo bở nhiều lợi nhuận.", "tvw-lucrative"),
    vq("tvmt2-020", "sentence_completion", "Please _____ the outstanding invoice balance directly to the corporate bank account.", ["remit", "accumulate", "deduct", "depreciate"], 0, "Remit balance = chuyển tiền thanh toán số dư.", "tvw-remit"),
  ],
};

// ─── Export all Stage 2 Vocab Lessons & Tests ──────────────────────

export const stage2VocabLessons: VocabLesson[] = [
  tvLesson1,
  tvLesson2,
  tvLesson3,
  tvLesson4,
  tvLesson5,
  tvLesson6,
  tvLesson7,
  tvLesson8,
  tvLesson9,
  tvLesson10,
];

export const stage2VocabTests: TestUnit[] = [
  stage2VocabMiniTest1,
  stage2VocabMiniTest2,
];
