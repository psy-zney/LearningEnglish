/**
 * Stage 1: Foundation Vocabulary Expansion (Lessons V4 - V12)
 *
 * Covers TOEIC 0→300 foundational vocabulary:
 * - V4: Travel & Transport (20 words + 12 exercises)
 * - V5: Shopping & Services (20 words + 12 exercises)
 * - V6: Finance & Banking (20 words + 12 exercises)
 * - V7: Technology & IT (20 words + 12 exercises)
 * - V8: Health & Fitness (20 words + 12 exercises)
 * - V9: Housing & Property (20 words + 12 exercises)
 * - V10: Dining & Entertainment (20 words + 12 exercises)
 * - V11: Weather & Environment (20 words + 12 exercises)
 * - V12: Education & Training (20 words + 12 exercises)
 *
 * Total: 180 words + 108 exercises.
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
// LESSON V4: Travel & Transport
// ═══════════════════════════════════════════════════════════════════

const v4Words: VocabWord[] = [
  word("vw-flight", "flight", "/flaɪt/", "noun", "chuyến bay", "Our flight to London was delayed by two hours.", "Chuyến bay của chúng tôi tới Luân Đôn bị hoãn hai giờ.", "travel-transport", ["direct flight", "flight attendant", "book a flight"]),
  word("vw-reservation", "reservation", "/ˌrez.ərˈveɪ.ʃən/", "noun", "sự đặt chỗ trước", "I would like to make a hotel reservation.", "Tôi muốn đặt phòng khách sạn trước.", "travel-transport", ["make a reservation", "confirm a reservation", "cancel a reservation"], { verb: "reserve" }),
  word("vw-itinerary", "itinerary", "/aɪˈtɪn.ə.rer.i/", "noun", "lịch trình chuyến đi", "The travel agent sent us the final itinerary.", "Đại lý du lịch đã gửi cho chúng tôi lịch trình cuối cùng.", "travel-transport", ["travel itinerary", "detailed itinerary", "plan an itinerary"]),
  word("vw-destination", "destination", "/ˌdes.təˈneɪ.ʃən/", "noun", "điểm đến", "Hawaii is a popular holiday destination.", "Hawaii là một điểm đến du lịch nổi tiếng.", "travel-transport", ["final destination", "tourist destination", "reach a destination"]),
  word("vw-departure", "departure", "/dɪˈpɑːr.tʃər/", "noun", "sự khởi hành", "The departure gate has been changed to Gate 12.", "Cổng khởi hành đã được đổi sang Cổng 12.", "travel-transport", ["departure time", "departure lounge", "departure gate"], { verb: "depart" }),
  word("vw-arrival", "arrival", "/əˈraɪ.vəl/", "noun", "sự đến nơi", "Please check the arrival screen for flight updates.", "Vui lòng xem màn hình đến nơi để cập nhật chuyến bay.", "travel-transport", ["estimated arrival", "arrival hall", "upon arrival"], { verb: "arrive" }),
  word("vw-passenger", "passenger", "/ˈpæs.ən.dʒər/", "noun", "hành khách", "All passengers must fasten their seatbelts.", "Mọi hành khách phải thắt dây an toàn.", "travel-transport", ["airline passenger", "transit passenger", "passenger train"]),
  word("vw-luggage", "luggage", "/ˈlʌɡ.ɪdʒ/", "noun", "hành lý", "You can claim your luggage at Carousel 4.", "Bạn có thể lấy hành lý tại Băng chuyền 4.", "travel-transport", ["excess luggage", "carry-on luggage", "luggage claim"]),
  word("vw-boarding", "boarding", "/ˈbɔːr.dɪŋ/", "noun", "sự lên tàu/máy bay", "Boarding will commence in approximately ten minutes.", "Việc lên máy bay sẽ bắt đầu trong khoảng mười phút.", "travel-transport", ["boarding pass", "boarding gate", "priority boarding"], { verb: "board" }),
  word("vw-terminal", "terminal", "/ˈtɜːr.mɪ.nəl/", "noun", "nhà ga sân bay/bến xe", "International flights depart from Terminal 2.", "Các chuyến bay quốc tế khởi hành từ Nhà ga số 2.", "travel-transport", ["airport terminal", "bus terminal", "passenger terminal"]),
  word("vw-accommodation", "accommodation", "/əˌkɑː.məˈdeɪ.ʃən/", "noun", "chỗ ở, phòng nghỉ", "The company provides hotel accommodation for visitors.", "Công ty cung cấp chỗ ở khách sạn cho khách thăm.", "travel-transport", ["hotel accommodation", "book accommodation", "luxury accommodation"], { verb: "accommodate" }),
  word("vw-round-trip", "round-trip", "/ˌraʊndˈtrɪp/", "adjective", "khứ hồi", "A round-trip ticket is often cheaper than two one-way tickets.", "Vé khứ hồi thường rẻ hơn hai vé một chiều.", "travel-transport", ["round-trip ticket", "round-trip flight", "round-trip fare"]),
  word("vw-layover", "layover", "/ˈleɪˌoʊ.vər/", "noun", "thời gian quá cảnh", "We had a three-hour layover in Singapore.", "Chúng tôi có thời gian quá cảnh ba tiếng tại Singapore.", "travel-transport", ["long layover", "overnight layover", "layover flight"]),
  word("vw-customs", "customs", "/ˈkʌs.təmz/", "noun", "hải quan", "You must declare all imported goods at customs.", "Bạn phải khai báo tất cả hàng nhập khẩu tại hải quan.", "travel-transport", ["clear customs", "customs officer", "customs declaration"]),
  word("vw-immigration", "immigration", "/ˌɪm.əˈɡreɪ.ʃən/", "noun", "nhập cảnh", "Officers checked our passports at immigration.", "Các nhân viên đã kiểm tra hộ chiếu của chúng tôi tại quầy nhập cảnh.", "travel-transport", ["immigration officer", "immigration control", "pass through immigration"], { verb: "immigrate" }),
  word("vw-passport", "passport", "/ˈpæs.pɔːrt/", "noun", "hộ chiếu", "Ensure your passport is valid for at least six months.", "Đảm bảo hộ chiếu của bạn còn hạn ít nhất sáu tháng.", "travel-transport", ["valid passport", "renew a passport", "passport control"]),
  word("vw-check-in", "check-in", "/ˈtʃek.ɪn/", "noun", "làm thủ tục nhận phòng/vé", "Passengers should arrive two hours early for check-in.", "Hành khách nên đến sớm hai tiếng để làm thủ tục.", "travel-transport", ["check-in counter", "online check-in", "hotel check-in"]),
  word("vw-delay", "delay", "/dɪˈleɪ/", "verb", "trì hoãn, làm chậm", "Heavy rain caused the train to delay.", "Mưa lớn đã khiến tàu bị chậm trễ.", "travel-transport", ["flight delay", "without delay", "experience delays"], { noun: "delay" }),
  word("vw-refund", "refund", "/ˈriː.fʌnd/", "noun", "khoản tiền hoàn lại", "Passengers requested a full refund for the cancelled flight.", "Hành khách yêu cầu hoàn tiền toàn bộ cho chuyến bay bị hủy.", "travel-transport", ["full refund", "request a refund", "issue a refund"], { verb: "refund" }),
  word("vw-fare", "fare", "/fer/", "noun", "tiền vé, giá vé", "Bus fares have increased slightly this month.", "Giá vé xe buýt đã tăng nhẹ trong tháng này.", "travel-transport", ["air fare", "train fare", "standard fare"]),
];

const v4Exercises: VocabExercise[] = [
  vq("v4e-001", "meaning_match", "\"itinerary\" có nghĩa là gì?", ["vé khứ hồi", "lịch trình chuyến đi", "chỗ ở khách sạn", "thời gian quá cảnh"], 1, "Itinerary = lịch trình chi tiết của chuyến đi.", "vw-itinerary"),
  vq("v4e-002", "meaning_match", "\"departure\" có nghĩa là gì?", ["sự khởi hành", "sự đến nơi", "hải quan", "nhập cảnh"], 0, "Departure = sự khởi hành, xuất phát.", "vw-departure"),
  vq("v4e-003", "meaning_match", "\"accommodation\" có nghĩa là gì?", ["phương tiện", "chỗ ở / nơi lưu trú", "hành lý", "hạn chót"], 1, "Accommodation = chỗ ăn ở, nơi lưu trú.", "vw-accommodation"),
  vq("v4e-004", "meaning_match", "\"layover\" có nghĩa là gì?", ["chuyến bay thẳng", "vé khứ hồi", "thời gian quá cảnh", "băng chuyền hành lý"], 2, "Layover = điểm dừng / thời gian quá cảnh.", "vw-layover"),
  vq("v4e-005", "meaning_match", "\"customs\" có nghĩa là gì?", ["vé tàu", "hải quan", "nhà ga", "hộ chiếu"], 1, "Customs = cơ quan / thủ tục hải quan.", "vw-customs"),
  vq("v4e-006", "meaning_match", "\"fare\" có nghĩa là gì?", ["tiền vé", "khoản phạt", "hạn mức", "tiền thưởng"], 0, "Fare = tiền vé phương tiện công cộng/máy bay.", "vw-fare"),
  vq("v4e-007", "sentence_completion", "Passengers must show their _____ pass before entering the aircraft.", ["flight", "boarding", "luggage", "terminal"], 1, "Boarding pass = thẻ lên máy bay.", "vw-boarding"),
  vq("v4e-008", "sentence_completion", "You can pick up your checked _____ at baggage carousel number 3.", ["customs", "luggage", "passengers", "itinerary"], 1, "Checked luggage = hành lý ký gửi.", "vw-luggage"),
  vq("v4e-009", "sentence_completion", "The travel agency gave us a detailed _____ for our business trip.", ["destination", "fare", "itinerary", "delay"], 2, "Detailed itinerary = lịch trình chi tiết.", "vw-itinerary"),
  vq("v4e-010", "sentence_completion", "He purchased a _____ ticket because he plans to return next week.", ["round-trip", "layover", "departure", "customs"], 0, "Round-trip ticket = vé khứ hồi.", "vw-round-trip"),
  vq("v4e-011", "sentence_completion", "The airline offered a full _____ when the scheduled flight was cancelled.", ["fare", "refund", "receipt", "terminal"], 1, "Full refund = hoàn tiền toàn bộ.", "vw-refund"),
  vq("v4e-012", "sentence_completion", "Please proceed to _____ 2 for all international departures.", ["Terminal", "Layover", "Itinerary", "Boarding"], 0, "Terminal 2 = Nhà ga số 2.", "vw-terminal"),
];

export const vocabLesson4: VocabLesson = {
  id: "s1-vocab-04",
  stage: "foundation",
  order: 15,
  titleVi: "Từ vựng: Du lịch & Giao thông",
  titleEn: "Vocabulary: Travel & Transport",
  category: "vocabulary",
  topic: "travel-transport",
  words: v4Words,
  exercises: v4Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// LESSON V5: Shopping & Services
// ═══════════════════════════════════════════════════════════════════

const v5Words: VocabWord[] = [
  word("vw-purchase", "purchase", "/ˈpɜːr.tʃəs/", "verb", "mua sắm", "Keep your receipt as proof of purchase.", "Giữ biên lai của bạn làm bằng chứng mua hàng.", "shopping-services", ["make a purchase", "proof of purchase", "purchase order"], { noun: "purchase" }),
  word("vw-receipt", "receipt", "/rɪˈsiːt/", "noun", "biên lai, hóa đơn", "The cashier handed me the printed receipt.", "Thu ngân đưa cho tôi biên lai đã in.", "shopping-services", ["sales receipt", "keep the receipt", "acknowledge receipt"]),
  word("vw-warranty", "warranty", "/ˈwɔːr.ən.ti/", "noun", "giấy bảo hành, chế độ bảo hành", "The laptop comes with a two-year manufacturer warranty.", "Máy tính xách tay đi kèm bảo hành hai năm từ nhà sản xuất.", "shopping-services", ["under warranty", "extended warranty", "warranty period"]),
  word("vw-exchange", "exchange", "/ɪksˈtʃeɪndʒ/", "verb", "đổi hàng, trao đổi", "Customers may exchange defective goods within thirty days.", "Khách hàng có thể đổi hàng lỗi trong vòng ba mươi ngày.", "shopping-services", ["exchange rate", "in exchange for", "exchange policy"], { noun: "exchange" }),
  word("vw-discount", "discount", "/ˈdɪs.kaʊnt/", "noun", "sự giảm giá", "Members receive a ten percent discount on all items.", "Hội viên được giảm giá mười phần trăm cho tất cả mặt hàng.", "shopping-services", ["special discount", "offer a discount", "volume discount"]),
  word("vw-coupon", "coupon", "/ˈkuː.pɑːn/", "noun", "phiếu giảm giá", "Enter this coupon code at checkout to save five dollars.", "Nhập mã phiếu giảm giá này lúc thanh toán để tiết kiệm năm đô la.", "shopping-services", ["discount coupon", "redeem a coupon", "promotional coupon"]),
  word("vw-merchandise", "merchandise", "/ˈmɜːr.tʃən.daɪs/", "noun", "hàng hóa", "All displayed merchandise is fifty percent off today.", "Tất cả hàng hóa trưng bày hôm nay được giảm năm mươi phần trăm.", "shopping-services", ["damaged merchandise", "return merchandise", "merchandise inventory"]),
  word("vw-cashier", "cashier", "/kæˈʃɪr/", "noun", "nhân viên thu ngân", "Please pay the cashier at counter number three.", "Vui lòng thanh toán cho thu ngân tại quầy số ba.", "shopping-services", ["cashier desk", "work as a cashier", "checkout cashier"]),
  word("vw-inventory", "inventory", "/ˈɪn.vən.tɔːr.i/", "noun", "hàng tồn kho, bản kiểm kê", "The warehouse takes inventory at the end of each quarter.", "Nhà kho thực hiện kiểm kê hàng tồn vào cuối mỗi quý.", "shopping-services", ["inventory control", "inventory management", "take inventory"]),
  word("vw-customer", "customer", "/ˈkʌs.tə.mər/", "noun", "khách hàng", "Customer satisfaction is our highest priority.", "Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi.", "shopping-services", ["customer service", "loyal customer", "potential customer"]),
  word("vw-complaint", "complaint", "/kəmˈpleɪnt/", "noun", "lời phàn nàn, khiếu nại", "We received a complaint regarding delayed delivery.", "Chúng tôi nhận được khiếu nại về việc giao hàng chậm trễ.", "shopping-services", ["file a complaint", "customer complaint", "handle a complaint"], { verb: "complain" }),
  word("vw-satisfaction", "satisfaction", "/ˌsæt̬.ɪsˈfæk.ʃən/", "noun", "sự hài lòng", "We guarantee complete customer satisfaction.", "Chúng tôi bảo đảm sự hài lòng trọn vẹn của khách hàng.", "shopping-services", ["satisfaction guarantee", "customer satisfaction", "express satisfaction"], { verb: "satisfy", adjective: "satisfactory" }),
  word("vw-retail", "retail", "/ˈriː.teɪl/", "noun", "bán lẻ", "She has ten years of experience in retail sales.", "Cô ấy có mười năm kinh nghiệm bán lẻ.", "shopping-services", ["retail store", "retail price", "retail industry"]),
  word("vw-wholesale", "wholesale", "/ˈhoʊl.seɪl/", "noun", "bán buôn, bán sỉ", "Wholesale prices are lower than retail prices.", "Giá bán buôn thấp hơn giá bán lẻ.", "shopping-services", ["wholesale price", "wholesale market", "buy wholesale"]),
  word("vw-product", "product", "/ˈprɑː.dʌkt/", "noun", "sản phẩm", "The company launched a new line of skin care products.", "Công ty đã ra mắt dòng sản phẩm chăm sóc da mới.", "shopping-services", ["product line", "launch a product", "quality product"], { verb: "produce", noun: "production" }),
  word("vw-delivery", "delivery", "/dɪˈlɪv.ɚ.i/", "noun", "sự giao hàng", "Free delivery is offered on all orders over one hundred dollars.", "Giao hàng miễn phí được áp dụng cho mọi đơn hàng trên một trăm đô la.", "shopping-services", ["express delivery", "delivery address", "confirm delivery"], { verb: "deliver" }),
  word("vw-shipping", "shipping", "/ˈʃɪp.ɪŋ/", "noun", "vận chuyển hàng", "Standard shipping takes between three and five business days.", "Vận chuyển tiêu chuẩn mất từ ba đến năm ngày làm việc.", "shopping-services", ["shipping cost", "free shipping", "shipping company"]),
  word("vw-catalog", "catalog", "/ˈkæt̬.əl.ɑːɡ/", "noun", "danh mục sản phẩm", "You can browse our full product range in the catalog.", "Bạn có thể xem toàn bộ sản phẩm trong danh mục.", "shopping-services", ["online catalog", "product catalog", "mail-order catalog"]),
  word("vw-brand", "brand", "/brænd/", "noun", "thương hiệu", "They are trying to build strong brand awareness among youths.", "Họ đang cố gắng xây dựng nhận thức thương hiệu mạnh mẽ trong giới trẻ.", "shopping-services", ["brand name", "brand loyalty", "leading brand"]),
  word("vw-refund-v5", "refund", "/ˈriː.fʌnd/", "verb", "hoàn trả tiền", "We will refund the total amount if you are not satisfied.", "Chúng tôi sẽ hoàn lại toàn bộ số tiền nếu bạn không hài lòng.", "shopping-services", ["refund money", "full refund", "non-refundable"]),
];

const v5Exercises: VocabExercise[] = [
  vq("v5e-001", "meaning_match", "\"warranty\" có nghĩa là gì?", ["biên lai", "chế độ bảo hành", "hàng tồn kho", "giảm giá"], 1, "Warranty = chế độ/giấy bảo hành.", "vw-warranty"),
  vq("v5e-002", "meaning_match", "\"merchandise\" có nghĩa là gì?", ["người thu ngân", "khiếu nại", "hàng hóa", "thương hiệu"], 2, "Merchandise = hàng hóa buôn bán.", "vw-merchandise"),
  vq("v5e-003", "meaning_match", "\"receipt\" có nghĩa là gì?", ["biên lai / hóa đơn", "danh mục", "khoản vay", "chỗ ở"], 0, "Receipt = biên nhận, hóa đơn thanh toán.", "vw-receipt"),
  vq("v5e-004", "meaning_match", "\"inventory\" có nghĩa là gì?", ["sự hoàn tiền", "bán lẻ", "hàng tồn kho", "thu ngân"], 2, "Inventory = hàng tồn kho, việc kiểm kê.", "vw-inventory"),
  vq("v5e-005", "meaning_match", "\"wholesale\" có nghĩa là gì?", ["bán lẻ", "bán buôn / bán sỉ", "giảm giá", "vận chuyển"], 1, "Wholesale = bán buôn/bán sỉ với số lượng lớn.", "vw-wholesale"),
  vq("v5e-006", "meaning_match", "\"complaint\" có nghĩa là gì?", ["sự khen ngợi", "lời khiếu nại / phàn nàn", "đơn đặt hàng", "bảo hành"], 1, "Complaint = lời than phiền, khiếu nại.", "vw-complaint"),
  vq("v5e-007", "sentence_completion", "This television is covered by a three-year manufacturer _____.", ["complaint", "warranty", "receipt", "coupon"], 1, "Manufacturer warranty = bảo hành từ nhà sản xuất.", "vw-warranty"),
  vq("v5e-008", "sentence_completion", "Always keep your sales _____ in case you need to return an item.", ["receipt", "brand", "inventory", "cashier"], 0, "Sales receipt = biên lai bán hàng.", "vw-receipt"),
  vq("v5e-009", "sentence_completion", "The supervisor apologized and resolved the customer's _____ immediately.", ["catalog", "complaint", "wholesale", "delivery"], 1, "Resolve a complaint = giải quyết khiếu nại.", "vw-complaint"),
  vq("v5e-010", "sentence_completion", "Customers who order online qualify for free express _____ on orders over $50.", ["inventory", "shipping", "coupon", "cashier"], 1, "Express shipping = chuyển phát nhanh.", "vw-shipping"),
  vq("v5e-011", "sentence_completion", "The department store conducts an annual _____ check every December.", ["inventory", "merchandise", "complaint", "warranty"], 0, "Inventory check = kiểm tra hàng tồn kho.", "vw-inventory"),
  vq("v5e-012", "sentence_completion", "They purchase electronic components at _____ prices directly from the factory.", ["retail", "wholesale", "receipt", "brand"], 1, "Wholesale prices = giá bán buôn/sỉ.", "vw-wholesale"),
];

export const vocabLesson5: VocabLesson = {
  id: "s1-vocab-05",
  stage: "foundation",
  order: 16,
  titleVi: "Từ vựng: Mua sắm & Dịch vụ",
  titleEn: "Vocabulary: Shopping & Services",
  category: "vocabulary",
  topic: "shopping-services",
  words: v5Words,
  exercises: v5Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// LESSON V6: Finance & Banking
// ═══════════════════════════════════════════════════════════════════

const v6Words: VocabWord[] = [
  word("vw-account", "account", "/əˈkaʊnt/", "noun", "tài khoản", "He opened a business bank account yesterday.", "Anh ấy đã mở tài khoản ngân hàng doanh nghiệp hôm qua.", "finance-banking", ["bank account", "savings account", "account number"]),
  word("vw-balance", "balance", "/ˈbæl.əns/", "noun", "số dư tài khoản", "Please check your account balance online.", "Vui lòng kiểm tra số dư tài khoản của bạn trực tuyến.", "finance-banking", ["account balance", "outstanding balance", "maintain a balance"]),
  word("vw-deposit", "deposit", "/dɪˈpɑː.zɪt/", "noun", "tiền gửi / tiền đặt cọc", "A deposit of twenty percent is required to secure the contract.", "Cần đặt cọc hai mươi phần trăm để bảo đảm hợp đồng.", "finance-banking", ["make a deposit", "direct deposit", "security deposit"], { verb: "deposit" }),
  word("vw-withdrawal", "withdrawal", "/wɪðˈdrɑː.əl/", "noun", "sự rút tiền", "ATM withdrawals are limited to five hundred dollars per day.", "Rút tiền tại cây ATM bị giới hạn năm trăm đô la mỗi ngày.", "finance-banking", ["make a withdrawal", "cash withdrawal", "withdrawal fee"], { verb: "withdraw" }),
  word("vw-transaction", "transaction", "/trænˈzæk.ʃən/", "noun", "giao dịch", "Every credit card transaction is recorded securely.", "Mỗi giao dịch thẻ tín dụng đều được ghi lại an toàn.", "finance-banking", ["financial transaction", "online transaction", "transaction fee"]),
  word("vw-interest", "interest", "/ˈɪn.trəst/", "noun", "tiền lãi, lãi suất", "The loan comes with a fixed five percent annual interest rate.", "Khoản vay đi kèm lãi suất hàng năm cố định năm phần trăm.", "finance-banking", ["interest rate", "compound interest", "earn interest"]),
  word("vw-loan", "loan", "/loʊn/", "noun", "khoản vay", "The bank approved our application for a business loan.", "Ngân hàng đã phê duyệt đơn xin vay vốn kinh doanh của chúng tôi.", "finance-banking", ["apply for a loan", "bank loan", "repay a loan"], { verb: "loan" }),
  word("vw-mortgage", "mortgage", "/ˈmɔːr.ɡɪdʒ/", "noun", "khoản thế chấp bất động sản", "They took out a thirty-year mortgage to purchase their home.", "Họ đã vay thế chấp ba mươi năm để mua nhà.", "finance-banking", ["mortgage rate", "pay off a mortgage", "mortgage loan"]),
  word("vw-investment", "investment", "/ɪnˈvest.mənt/", "noun", "sự đầu tư, khoản đầu tư", "Investing in renewable energy is a sound long-term investment.", "Đầu tư vào năng lượng tái tạo là một khoản đầu tư dài hạn hợp lý.", "finance-banking", ["return on investment", "foreign investment", "capital investment"], { verb: "invest", noun: "investor" }),
  word("vw-revenue", "revenue", "/ˈrev.ə.nuː/", "noun", "doanh thu", "Company revenue increased significantly in the final quarter.", "Doanh thu công ty đã tăng đáng kể trong quý cuối.", "finance-banking", ["annual revenue", "total revenue", "generate revenue"]),
  word("vw-profit", "profit", "/ˈprɑː.fɪt/", "noun", "lợi nhuận", "The company reported a net profit of two million dollars.", "Công ty báo cáo lợi nhuận ròng hai triệu đô la.", "finance-banking", ["net profit", "make a profit", "profit margin"], { adjective: "profitable" }),
  word("vw-expense", "expense", "/ɪkˈspens/", "noun", "chi phí", "Travel expenses will be reimbursed by the accounting office.", "Chi phí đi lại sẽ được phòng kế toán hoàn trả.", "finance-banking", ["operating expenses", "reduce expenses", "travel expense"], { adjective: "expensive" }),
  word("vw-invoice", "invoice", "/ˈɪn.vɔɪs/", "noun", "hóa đơn thanh toán", "Please remit payment within thirty days of the invoice date.", "Vui lòng gửi thanh toán trong vòng ba mươi ngày kể từ ngày lập hóa đơn.", "finance-banking", ["issue an invoice", "pay an invoice", "outstanding invoice"], { verb: "invoice" }),
  word("vw-payment", "payment", "/ˈpeɪ.mənt/", "noun", "sự thanh toán", "Payment can be made by bank transfer or credit card.", "Thanh toán có thể thực hiện qua chuyển khoản ngân hàng hoặc thẻ tín dụng.", "finance-banking", ["make a payment", "late payment", "payment method"], { verb: "pay" }),
  word("vw-budget-v6", "budget", "/ˈbʌdʒ.ɪt/", "noun", "ngân sách", "The marketing team stayed strictly within their budget.", "Đội ngũ tiếp thị đã tuân thủ nghiêm ngặt trong ngân sách của họ.", "finance-banking", ["tight budget", "budget cut", "annual budget"]),
  word("vw-audit", "audit", "/ˈɔː.dɪt/", "noun", "việc kiểm toán", "External inspectors conducted an annual financial audit.", "Các thanh tra bên ngoài đã tiến hành kiểm toán tài chính hàng năm.", "finance-banking", ["conduct an audit", "tax audit", "internal audit"], { verb: "audit", noun: "auditor" }),
  word("vw-tax", "tax", "/tæks/", "noun", "thuế", "Corporate tax returns must be filed before April fifteenth.", "Tờ khai thuế doanh nghiệp phải nộp trước ngày mười lăm tháng Tư.", "finance-banking", ["income tax", "sales tax", "tax deduction"]),
  word("vw-income", "income", "/ˈɪn.kʌm/", "noun", "thu nhập", "Her monthly income has grown since her promotion.", "Thu nhập hàng tháng của cô ấy đã tăng kể từ khi được thăng chức.", "finance-banking", ["annual income", "source of income", "taxable income"]),
  word("vw-savings", "savings", "/ˈseɪ.vɪŋz/", "noun", "tiền tiết kiệm", "He deposited half of his salary into a savings account.", "Anh ấy gửi một nửa tiền lương vào tài khoản tiết kiệm.", "finance-banking", ["savings account", "lifetime savings", "cost savings"]),
  word("vw-insurance", "insurance", "/ɪnˈʃʊr.əns/", "noun", "bảo hiểm", "The firm provides health and property insurance for employees.", "Công ty cung cấp bảo hiểm sức khỏe và tài sản cho nhân viên.", "finance-banking", ["insurance policy", "insurance claim", "health insurance"]),
];

const v6Exercises: VocabExercise[] = [
  vq("v6e-001", "meaning_match", "\"transaction\" có nghĩa là gì?", ["ngân sách", "khoản giao dịch", "lợi nhuận", "sự rút tiền"], 1, "Transaction = giao dịch (tài chính, ngân hàng).", "vw-transaction"),
  vq("v6e-002", "meaning_match", "\"revenue\" có nghĩa là gì?", ["chi phí", "doanh thu", "khoản vay", "thuế"], 1, "Revenue = tổng doanh thu thu về.", "vw-revenue"),
  vq("v6e-003", "meaning_match", "\"invoice\" có nghĩa là gì?", ["hóa đơn yêu cầu thanh toán", "phiếu giảm giá", "sổ tiết kiệm", "khoản đặt cọc"], 0, "Invoice = hóa đơn thanh toán hàng hóa/dịch vụ.", "vw-invoice"),
  vq("v6e-004", "meaning_match", "\"mortgage\" có nghĩa là gì?", ["tiền gửi ngân hàng", "tiền lãi", "khoản thế chấp nhà đất", "chi phí đi lại"], 2, "Mortgage = khoản vay thế chấp bất động sản.", "vw-mortgage"),
  vq("v6e-005", "meaning_match", "\"audit\" có nghĩa là gì?", ["việc kiểm toán", "việc đầu tư", "chuyển khoản", "tiết kiệm"], 0, "Audit = kiểm toán sổ sách tài chính.", "vw-audit"),
  vq("v6e-006", "meaning_match", "\"withdrawal\" có nghĩa là gì?", ["sự nạp tiền", "sự rút tiền", "lợi nhuận", "thuế thu nhập"], 1, "Withdrawal = hành động rút tiền khỏi tài khoản.", "vw-withdrawal"),
  vq("v6e-007", "sentence_completion", "The accounting firm conducted a thorough financial _____ before the merger.", ["audit", "withdrawal", "invoice", "fare"], 0, "Financial audit = cuộc kiểm toán tài chính.", "vw-audit"),
  vq("v6e-008", "sentence_completion", "Our quarterly report showed a ten percent increase in net _____.", ["profit", "audit", "withdrawal", "tax"], 0, "Net profit = lợi nhuận ròng.", "vw-profit"),
  vq("v6e-009", "sentence_completion", "The bank requires a five percent _____ before authorizing the loan.", ["deposit", "receipt", "complaint", "invoice"], 0, "Deposit = khoản tiền đặt cọc/ký quỹ.", "vw-deposit"),
  vq("v6e-010", "sentence_completion", "Please remit your _____ within thirty days to avoid penalty fees.", ["payment", "deposit", "mortgage", "audit"], 0, "Remit payment = chuyển tiền thanh toán.", "vw-payment"),
  vq("v6e-011", "sentence_completion", "Due to unexpected repairs, project _____ exceeded the initial forecast.", ["expenses", "revenues", "profits", "savings"], 0, "Project expenses = chi phí dự án.", "vw-expense"),
  vq("v6e-012", "sentence_completion", "A high _____ rate makes borrowing money for new ventures expensive.", ["interest", "account", "balance", "audit"], 0, "Interest rate = lãi suất cho vay.", "vw-interest"),
];

export const vocabLesson6: VocabLesson = {
  id: "s1-vocab-06",
  stage: "foundation",
  order: 17,
  titleVi: "Từ vựng: Tài chính & Ngân hàng",
  titleEn: "Vocabulary: Finance & Banking",
  category: "vocabulary",
  topic: "finance-banking",
  words: v6Words,
  exercises: v6Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// LESSON V7: Technology & IT
// ═══════════════════════════════════════════════════════════════════

const v7Words: VocabWord[] = [
  word("vw-software", "software", "/ˈsɑːft.wer/", "noun", "phần mềm", "The company develops accounting software for small businesses.", "Công ty phát triển phần mềm kế toán cho các doanh nghiệp nhỏ.", "technology-it", ["install software", "software update", "anti-virus software"]),
  word("vw-hardware", "hardware", "/ˈhɑːrd.wer/", "noun", "phần cứng máy tính", "The IT technician replaced the damaged computer hardware.", "Kỹ thuật viên IT đã thay thế phần cứng máy tính bị hỏng.", "technology-it", ["computer hardware", "hardware failure", "hardware specifications"]),
  word("vw-database", "database", "/ˈdeɪ.t̬ə.beɪs/", "noun", "cơ sở dữ liệu", "All client records are stored in a centralized database.", "Mọi hồ sơ khách hàng đều được lưu trong cơ sở dữ liệu tập trung.", "technology-it", ["access a database", "database management", "relational database"]),
  word("vw-network", "network", "/ˈnet.wɜːrk/", "noun", "mạng lưới, hệ thống mạng", "Our office network was down for maintenance this morning.", "Mạng văn phòng của chúng tôi đã tạm ngưng để bảo trì sáng nay.", "technology-it", ["computer network", "secure network", "network administrator"]),
  word("vw-server", "server", "/ˈsɜːr.vər/", "noun", "máy chủ", "The company hosts its files on a cloud server.", "Công ty lưu trữ tệp tin trên máy chủ đám mây.", "technology-it", ["web server", "server crash", "file server"]),
  word("vw-install", "install", "/ɪnˈstɑːl/", "verb", "cài đặt", "You must install the latest security patch immediately.", "Bạn phải cài đặt bản vá bảo mật mới nhất ngay lập tức.", "technology-it", ["install software", "install updates", "fresh install"], { noun: "installation" }),
  word("vw-upgrade", "upgrade", "/ʌpˈɡreɪd/", "verb", "nâng cấp", "We decided to upgrade our computer operating systems.", "Chúng tôi quyết định nâng cấp hệ điều hành máy tính.", "technology-it", ["upgrade a system", "hardware upgrade", "upgrade software"], { noun: "upgrade" }),
  word("vw-download", "download", "/ˌdaʊnˈloʊd/", "verb", "tải xuống", "You can download the instruction manual from our website.", "Bạn có thể tải xuống tài liệu hướng dẫn từ trang web của chúng tôi.", "technology-it", ["download files", "download speed", "free download"], { noun: "download" }),
  word("vw-backup", "backup", "/ˈbæk.ʌp/", "noun", "bản sao lưu dự phòng", "Always create a daily backup of critical corporate files.", "Luôn tạo một bản sao lưu hàng ngày cho các tệp quan trọng của công ty.", "technology-it", ["backup files", "backup system", "automatic backup"], { verb: "back up" }),
  word("vw-password", "password", "/ˈpæs.wɜːrd/", "noun", "mật khẩu", "Employees are required to change their password every sixty days.", "Nhân viên được yêu cầu đổi mật khẩu sau mỗi sáu mươi ngày.", "technology-it", ["strong password", "reset a password", "enter a password"]),
  word("vw-security", "security", "/səˈkjʊr.ə.t̬i/", "noun", "an ninh, bảo mật", "Network security prevents unauthorized access to internal data.", "Bảo mật mạng ngăn chặn việc truy cập trái phép vào dữ liệu nội bộ.", "technology-it", ["data security", "cyber security", "security breach"], { adjective: "secure" }),
  word("vw-access", "access", "/ˈæk.ses/", "noun", "quyền truy cập, lối vào", "Only authorized personnel have access to the server room.", "Chỉ nhân sự được ủy quyền mới có quyền vào phòng máy chủ.", "technology-it", ["gain access", "unauthorized access", "internet access"], { verb: "access" }),
  word("vw-system", "system", "/ˈsɪs.təm/", "noun", "hệ thống", "The payroll system will be updated this weekend.", "Hệ thống tính lương sẽ được cập nhật vào cuối tuần này.", "technology-it", ["operating system", "computer system", "management system"], { adjective: "systematic" }),
  word("vw-device", "device", "/dɪˈvaɪs/", "noun", "thiết bị", "Employees can connect their personal mobile devices to the guest Wi-Fi.", "Nhân viên có thể kết nối thiết bị di động cá nhân vào Wi-Fi dành cho khách.", "technology-it", ["electronic device", "mobile device", "storage device"]),
  word("vw-monitor", "monitor", "/ˈmɑː.nə.t̬ɚ/", "noun", "màn hình máy tính", "She requested a second monitor to improve productivity.", "Cô ấy yêu cầu màn hình thứ hai để nâng cao năng suất.", "technology-it", ["computer monitor", "monitor screen", "dual monitor"], { verb: "monitor" }),
  word("vw-printer", "printer", "/ˈprɪn.t̬ɚ/", "noun", "máy in", "The laser printer is out of paper and ink.", "Máy in laser đang hết giấy và mực.", "technology-it", ["laser printer", "color printer", "network printer"], { verb: "print" }),
  word("vw-scanner", "scanner", "/ˈskæn.ɚ/", "noun", "máy quét tài liệu", "Please scan the signed contract using the desktop scanner.", "Vui lòng quét hợp đồng đã ký bằng máy quét để bàn.", "technology-it", ["flatbed scanner", "barcode scanner", "document scanner"], { verb: "scan" }),
  word("vw-compatible", "compatible", "/kəmˈpæt̬.ə.bəl/", "noun", "tương thích", "Ensure the printer driver is compatible with your operating system.", "Đảm bảo trình điều khiển máy in tương thích với hệ điều hành của bạn.", "technology-it", ["fully compatible", "compatible with", "backward compatible"], { noun: "compatibility" }),
  word("vw-malfunction", "malfunction", "/ˌmælˈfʌŋk.ʃən/", "noun", "sự trục trặc, lỗi kỹ thuật", "The machine stopped due to an electrical malfunction.", "Cỗ máy dừng hoạt động do trục trặc điện.", "technology-it", ["equipment malfunction", "system malfunction", "mechanical malfunction"], { verb: "malfunction" }),
  word("vw-troubleshoot", "troubleshoot", "/ˈtrʌb.əl.ʃuːt/", "verb", "xử lý sự cố, khắc phục lỗi", "The IT technician will troubleshoot the internet connection issue.", "Kỹ thuật viên IT sẽ xử lý sự cố kết nối mạng internet.", "technology-it", ["troubleshoot problems", "troubleshoot errors", "troubleshoot an issue"], { noun: "troubleshooting" }),
];

const v7Exercises: VocabExercise[] = [
  vq("v7e-001", "meaning_match", "\"database\" có nghĩa là gì?", ["mạng lưới", "cơ sở dữ liệu", "máy chủ", "phần mềm"], 1, "Database = cơ sở dữ liệu lưu trữ có hệ thống.", "vw-database"),
  vq("v7e-002", "meaning_match", "\"compatible\" có nghĩa là gì?", ["tương thích", "bảo mật", "trục trặc", "tự động"], 0, "Compatible = tương thích, hợp nhau.", "vw-compatible"),
  vq("v7e-003", "meaning_match", "\"malfunction\" có nghĩa là gì?", ["sự cài đặt", "sự cố / trục trặc", "sự sao lưu", "quyền truy cập"], 1, "Malfunction = sự cố kỹ thuật, hỏng hóc.", "vw-malfunction"),
  vq("v7e-004", "meaning_match", "\"troubleshoot\" có nghĩa là gì?", ["sao lưu dữ liệu", "khắc phục / xử lý sự cố", "tải tập tin", "nâng cấp hệ điều hành"], 1, "Troubleshoot = tìm và xử lý sự cố kỹ thuật.", "vw-troubleshoot"),
  vq("v7e-005", "meaning_match", "\"backup\" có nghĩa là gì?", ["bản dự phòng / sao lưu", "mật khẩu an toàn", "thiết bị ngoại vi", "máy in màu"], 0, "Backup = sao lưu dự phòng dữ liệu.", "vw-backup"),
  vq("v7e-006", "meaning_match", "\"access\" có nghĩa là gì?", ["phần cứng", "quyền truy cập", "hạn chót", "sự bảo trì"], 1, "Access = quyền hoặc khả năng truy cập vào dữ liệu/địa điểm.", "vw-access"),
  vq("v7e-007", "sentence_completion", "The technician is working to _____ the issue with the internal server.", ["troubleshoot", "download", "malfunction", "compatible"], 0, "Troubleshoot the issue = xử lý sự cố.", "vw-troubleshoot"),
  vq("v7e-008", "sentence_completion", "To prevent catastrophic data loss, keep an off-site _____ of all files.", ["backup", "scanner", "printer", "device"], 0, "Keep a backup = giữ bản sao lưu.", "vw-backup"),
  vq("v7e-009", "sentence_completion", "Only authorized IT staff have direct _____ to confidential patient records.", ["access", "malfunction", "device", "printer"], 0, "Direct access to = quyền truy cập trực tiếp vào.", "vw-access"),
  vq("v7e-010", "sentence_completion", "The new application is not _____ with earlier versions of Windows.", ["compatible", "installed", "malfunctioned", "troubleshot"], 0, "Compatible with = tương thích với.", "vw-compatible"),
  vq("v7e-011", "sentence_completion", "Production halted for three hours because of a software _____.", ["malfunction", "database", "password", "backup"], 0, "Software malfunction = trục trặc phần mềm.", "vw-malfunction"),
  vq("v7e-012", "sentence_completion", "You should _____ the antivirus definitions to protect against newly discovered threats.", ["upgrade", "backup", "access", "malfunction"], 0, "Upgrade definitions = nâng cấp cơ sở dữ liệu diệt virus.", "vw-upgrade"),
];

export const vocabLesson7: VocabLesson = {
  id: "s1-vocab-07",
  stage: "foundation",
  order: 18,
  titleVi: "Từ vựng: Công nghệ & IT",
  titleEn: "Vocabulary: Technology & IT",
  category: "vocabulary",
  topic: "technology-it",
  words: v7Words,
  exercises: v7Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// LESSON V8: Health & Fitness
// ═══════════════════════════════════════════════════════════════════

const v8Words: VocabWord[] = [
  word("vw-appointment", "appointment", "/əˈpɔɪnt.mənt/", "noun", "cuộc hẹn khám / công việc", "She made an appointment to see the dental specialist.", "Cô ấy đã hẹn gặp bác sĩ chuyên khoa răng hàm mặt.", "health-fitness", ["make an appointment", "schedule an appointment", "cancel an appointment"]),
  word("vw-prescription", "prescription", "/prɪˈskrɪp.ʃən/", "noun", "đơn thuốc", "The doctor wrote a prescription for pain relief tablets.", "Bác sĩ đã kê đơn thuốc giảm đau.", "health-fitness", ["fill a prescription", "prescription medication", "written prescription"], { verb: "prescribe" }),
  word("vw-pharmacy", "pharmacy", "/ˈfɑːr.mə.si/", "noun", "hiệu thuốc", "You can pick up your medication at the corner pharmacy.", "Bạn có thể lấy thuốc tại hiệu thuốc ở góc phố.", "health-fitness", ["local pharmacy", "hospital pharmacy", "pharmacy technician"], { noun: "pharmacist" }),
  word("vw-symptom", "symptom", "/ˈsɪmp.təm/", "noun", "triệu chứng bệnh", "Fever and fatigue are common symptoms of the flu.", "Sốt và mệt mỏi là các triệu chứng phổ biến của bệnh cúm.", "health-fitness", ["flu symptom", "show symptoms", "relieve symptoms"]),
  word("vw-treatment", "treatment", "/ˈtriːt.mənt/", "noun", "phương pháp điều trị", "Early diagnosis significantly improves the success of treatment.", "Chẩn đoán sớm cải thiện đáng kể thành công của việc điều trị.", "health-fitness", ["medical treatment", "undergo treatment", "effective treatment"], { verb: "treat" }),
  word("vw-diagnosis", "diagnosis", "/ˌdaɪ.əɡˈnoʊ.sɪs/", "noun", "sự chẩn đoán", "The specialist gave an accurate diagnosis after reviewing the X-ray.", "Bác sĩ chuyên khoa đưa ra chẩn đoán chính xác sau khi xem phim X-quang.", "health-fitness", ["early diagnosis", "confirm a diagnosis", "accurate diagnosis"], { verb: "diagnose" }),
  word("vw-medication", "medication", "/ˌmed.əˈkeɪ.ʃən/", "noun", "thuốc men", "Take this medication twice daily with food.", "Uống thuốc này hai lần mỗi ngày cùng với thức ăn.", "health-fitness", ["take medication", "prescribed medication", "over-the-counter medication"]),
  word("vw-hospital", "hospital", "/ˈhɑː.spɪ.t̬əl/", "noun", "bệnh viện", "The patient was admitted to the hospital for observation.", "Bệnh nhân đã nhập viện để theo dõi y tế.", "health-fitness", ["hospital bed", "general hospital", "admit to hospital"]),
  word("vw-clinic", "clinic", "/ˈklɪn.ɪk/", "noun", "phòng khám", "The community clinic provides affordable medical care.", "Phòng khám cộng đồng cung cấp dịch vụ chăm sóc y tế giá phải chăng.", "health-fitness", ["walk-in clinic", "dental clinic", "outpatient clinic"]),
  word("vw-patient", "patient", "/ˈpeɪ.ʃənt/", "noun", "bệnh nhân", "The physician examined each patient thoroughly.", "Bác sĩ đã thăm khám từng bệnh nhân rất kỹ lưỡng.", "health-fitness", ["treat a patient", "patient care", "inpatient/outpatient"]),
  word("vw-physician", "physician", "/fɪˈzɪʃ.ən/", "noun", "bác sĩ điều trị", "Consult your personal physician before starting any rigorous diet.", "Hãy tham khảo ý kiến bác sĩ riêng trước khi bắt đầu chế độ ăn kiêng nghiêm ngặt.", "health-fitness", ["attending physician", "primary care physician", "licensed physician"]),
  word("vw-emergency", "emergency", "/ɪˈmɜːr.dʒən.si/", "noun", "trường hợp khẩn cấp", "Call nine-one-one immediately in case of medical emergency.", "Gọi 911 ngay lập tức trong trường hợp cấp cứu y tế.", "health-fitness", ["emergency room", "medical emergency", "in an emergency"]),
  word("vw-checkup", "checkup", "/ˈtʃek.ʌp/", "noun", "cuộc kiểm tra sức khỏe tổng quát", "Adults should schedule an annual medical checkup.", "Người lớn nên lên lịch khám sức khỏe tổng quát hàng năm.", "health-fitness", ["annual checkup", "routine checkup", "medical checkup"]),
  word("vw-coverage", "coverage", "/ˈkʌv.ɚ.ɪdʒ/", "noun", "phạm vi bảo hiểm", "Our insurance policy provides full dental and vision coverage.", "Hợp đồng bảo hiểm của chúng tôi cung cấp phạm vi bảo hiểm toàn diện cho nha khoa và thị lực.", "health-fitness", ["insurance coverage", "health coverage", "comprehensive coverage"], { verb: "cover" }),
  word("vw-exercise", "exercise", "/ˈek.sɚ.saɪz/", "noun", "tập thể dục, rèn luyện", "Regular exercise reduces the risk of heart complications.", "Tập thể dục thường xuyên giúp giảm nguy cơ biến chứng tim mạch.", "health-fitness", ["regular exercise", "physical exercise", "aerobic exercise"], { verb: "exercise" }),
  word("vw-nutrition", "nutrition", "/nuːˈtrɪʃ.ən/", "noun", "dinh dưỡng", "Proper nutrition is vital for sustained energy and concentration.", "Dinh dưỡng hợp lý rất quan trọng đối với năng lượng và sự tập trung bền bỉ.", "health-fitness", ["good nutrition", "clinical nutrition", "nutrition facts"], { adjective: "nutritional" }),
  word("vw-wellness", "wellness", "/ˈwel.nəs/", "noun", "sức khỏe toàn diện, sự lành mạnh", "The company launched an employee wellness and mental health program.", "Công ty đã khởi động chương trình chăm sóc sức khỏe toàn diện và tinh thần cho nhân viên.", "health-fitness", ["wellness program", "health and wellness", "wellness center"]),
  word("vw-recovery", "recovery", "/rɪˈkʌv.ɚ.i/", "noun", "sự hồi phục", "We wish you a swift and complete recovery from surgery.", "Chúng tôi chúc bạn hồi phục nhanh chóng và hoàn toàn sau ca phẫu thuật.", "health-fitness", ["speedy recovery", "full recovery", "make a recovery"], { verb: "recover" }),
  word("vw-injury", "injury", "/ˈɪn.dʒər.i/", "noun", "chấn thương, vết thương", "He suffered a minor knee injury during football training.", "Anh ấy bị chấn thương đầu gối nhẹ trong lúc tập bóng đá.", "health-fitness", ["workplace injury", "sports injury", "minor injury"], { verb: "injure" }),
  word("vw-insurance-health", "insurance", "/ɪnˈʃʊr.əns/", "noun", "bảo hiểm y tế", "Employees receive health insurance coverage from day one.", "Nhân viên nhận được bảo hiểm y tế từ ngày đầu tiên làm việc.", "health-fitness", ["health insurance", "medical insurance", "insurance claim"]),
];

const v8Exercises: VocabExercise[] = [
  vq("v8e-001", "meaning_match", "\"prescription\" có nghĩa là gì?", ["đơn thuốc", "triệu chứng", "bệnh viện", "chấn thương"], 0, "Prescription = đơn thuốc bác sĩ kê.", "vw-prescription"),
  vq("v8e-002", "meaning_match", "\"physician\" có nghĩa là gì?", ["dược sĩ", "bác sĩ điều trị", "bệnh nhân", "y tá"], 1, "Physician = bác sĩ y khoa.", "vw-physician"),
  vq("v8e-003", "meaning_match", "\"diagnosis\" có nghĩa là gì?", ["cuộc hẹn", "sự chẩn đoán bệnh", "phòng cấp cứu", "sự hồi phục"], 1, "Diagnosis = việc chẩn đoán bệnh tật.", "vw-diagnosis"),
  vq("v8e-004", "meaning_match", "\"symptom\" có nghĩa là gì?", ["thuốc men", "triệu chứng", "bảo hiểm", "dinh dưỡng"], 1, "Symptom = triệu chứng, dấu hiệu của bệnh.", "vw-symptom"),
  vq("v8e-005", "meaning_match", "\"checkup\" có nghĩa là gì?", ["khám sức khỏe định kỳ", "chấn thương", "hiệu thuốc", "đơn thuốc"], 0, "Checkup = kiểm tra sức khỏe tổng quát.", "vw-checkup"),
  vq("v8e-006", "meaning_match", "\"recovery\" có nghĩa là gì?", ["sự chấn thương", "sự hồi phục", "phạm vi bảo hiểm", "cuộc hẹn"], 1, "Recovery = sự bình phục, phục hồi sức khỏe.", "vw-recovery"),
  vq("v8e-007", "sentence_completion", "The pharmacist explained how to take the prescribed _____ safely.", ["medication", "clinic", "injury", "checkup"], 0, "Prescribed medication = thuốc được kê đơn.", "vw-medication"),
  vq("v8e-008", "sentence_completion", "Dr. Vance is a licensed _____ with twenty years of clinical experience.", ["physician", "patient", "prescription", "symptom"], 0, "Licensed physician = bác sĩ có chứng chỉ hành nghề.", "vw-physician"),
  vq("v8e-009", "sentence_completion", "A high fever and persistent cough are common _____ of respiratory infection.", ["symptoms", "checkups", "prescriptions", "clinics"], 0, "Symptoms of infection = triệu chứng nhiễm trùng.", "vw-symptom"),
  vq("v8e-010", "sentence_completion", "Does your employee benefits package include comprehensive dental _____?", ["coverage", "emergency", "recovery", "diagnosis"], 0, "Dental coverage = phạm vi chi trả bảo hiểm nha khoa.", "vw-coverage"),
  vq("v8e-011", "sentence_completion", "He was rushed to the _____ room after sustaining a head injury.", ["emergency", "prescription", "checkup", "wellness"], 0, "Emergency room = phòng cấp cứu.", "vw-emergency"),
  vq("v8e-012", "sentence_completion", "The physical therapist helped the athlete make a full _____ from knee surgery.", ["recovery", "pharmacy", "coverage", "physician"], 0, "Make a full recovery = hồi phục hoàn toàn.", "vw-recovery"),
];

export const vocabLesson8: VocabLesson = {
  id: "s1-vocab-08",
  stage: "foundation",
  order: 19,
  titleVi: "Từ vựng: Sức khỏe & Thể dục",
  titleEn: "Vocabulary: Health & Fitness",
  category: "vocabulary",
  topic: "health-fitness",
  words: v8Words,
  exercises: v8Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// LESSON V9: Housing & Property
// ═══════════════════════════════════════════════════════════════════

const v9Words: VocabWord[] = [
  word("vw-apartment", "apartment", "/əˈpɑːrt.mənt/", "noun", "căn hộ", "They rented a two-bedroom apartment near the train station.", "Họ đã thuê căn hộ hai phòng ngủ gần ga tàu.", "housing-property", ["studio apartment", "luxury apartment", "rent an apartment"]),
  word("vw-lease", "lease", "/liːs/", "noun", "hợp đồng thuê nhà/đất", "The commercial lease expires at the end of next month.", "Hợp đồng thuê mặt bằng thương mại sẽ hết hạn vào cuối tháng tới.", "housing-property", ["sign a lease", "break a lease", "lease agreement"], { verb: "lease" }),
  word("vw-tenant", "tenant", "/ˈten.ənt/", "noun", "người thuê nhà", "The landlord informed all tenants about upcoming hallway painting.", "Chủ nhà thông báo cho tất cả người thuê về việc sơn hành lang sắp tới.", "housing-property", ["prospective tenant", "evict a tenant", "tenant rights"]),
  word("vw-landlord", "landlord", "/ˈlænd.lɔːrd/", "noun", "chủ nhà, chủ đất cho thuê", "Our landlord is responsible for repairing plumbing issues.", "Chủ nhà của chúng tôi chịu trách nhiệm sửa chữa các vấn đề đường ống nước.", "housing-property", ["good landlord", "contact the landlord", "landlord agreement"]),
  word("vw-rent", "rent", "/rent/", "noun", "tiền thuê nhà", "Monthly rent must be transferred by the first of each month.", "Tiền thuê nhà hàng tháng phải được chuyển khoản trước ngày mùng một.", "housing-property", ["pay rent", "rent increase", "affordable rent"], { verb: "rent" }),
  word("vw-mortgage-v9", "mortgage", "/ˈmɔːr.ɡɪdʒ/", "noun", "khoản vay thế chấp mua nhà", "They secured a competitive interest rate on their housing mortgage.", "Họ đã đạt được mức lãi suất cạnh tranh cho khoản vay thế chấp mua nhà.", "housing-property", ["housing mortgage", "apply for a mortgage", "mortgage payment"]),
  word("vw-property", "property", "/ˈprɑː.pɚ.t̬i/", "noun", "bất động sản, tài sản", "Real estate property prices in this area have risen steadily.", "Giá bất động sản tại khu vực này đã tăng đều đặn.", "housing-property", ["commercial property", "residential property", "property manager"]),
  word("vw-renovation", "renovation", "/ˌren.əˈveɪ.ʃən/", "noun", "sự cải tạo, tu sửa", "The office building is currently undergoing extensive renovation.", "Tòa nhà văn phòng hiện đang được cải tạo nâng cấp quy mô lớn.", "housing-property", ["home renovation", "under renovation", "renovation project"], { verb: "renovate" }),
  word("vw-inspection", "inspection", "/ɪnˈspek.ʃən/", "noun", "sự thanh tra, kiểm định", "A building inspection is mandatory before the sale is finalized.", "Việc kiểm định tòa nhà là bắt buộc trước khi hoàn tất mua bán.", "housing-property", ["pass inspection", "safety inspection", "conduct an inspection"], { verb: "inspect" }),
  word("vw-utilities", "utilities", "/juːˈtɪl.ə.t̬iz/", "noun", "tiện ích dịch vụ (điện, nước, gas)", "Water, heating, and electric utilities are included in the monthly rent.", "Các dịch vụ tiện ích nước, sưởi và điện đã bao gồm trong tiền thuê hàng tháng.", "housing-property", ["pay utilities", "utility bills", "utility company"]),
  word("vw-furnished", "furnished", "/ˈfɜːr.nɪʃt/", "adjective", "được trang bị sẵn đồ đạc/nội thất", "The rental unit comes fully furnished with modern appliances.", "Căn hộ cho thuê được trang bị đầy đủ nội thất và thiết bị hiện đại.", "housing-property", ["fully furnished", "unfurnished", "furnished apartment"], { verb: "furnish", noun: "furniture" }),
  word("vw-spacious", "spacious", "/ˈspeɪ.ʃəs/", "adjective", "rộng rãi, thoáng đãng", "The living room is spacious and receives plenty of natural sunlight.", "Phòng khách rộng rãi và đón nhận nhiều ánh sáng tự nhiên.", "housing-property", ["spacious living room", "spacious interior", "spacious office"], { noun: "space" }),
  word("vw-location", "location", "/loʊˈkeɪ.ʃən/", "noun", "vị trí", "The property boasts an enviable location close to downtown shops.", "Khu nhà sở hữu một vị trí đáng mơ ước gần các cửa hàng trung tâm.", "housing-property", ["prime location", "central location", "convenient location"], { verb: "locate" }),
  word("vw-neighborhood", "neighborhood", "/ˈneɪ.bər.hʊd/", "noun", "khu dân cư, khu lân cận", "The house is situated in a safe, quiet residential neighborhood.", "Ngôi nhà tọa lạc trong một khu dân cư an toàn và yên tĩnh.", "housing-property", ["quiet neighborhood", "friendly neighborhood", "neighborhood watch"]),
  word("vw-residential", "residential", "/ˌrez.əˈden.ʃəl/", "adjective", "thuộc về khu dân cư", "This building is located strictly within a residential zone.", "Tòa nhà này nằm hoàn toàn trong khu quy hoạch dân cư.", "housing-property", ["residential area", "residential building", "residential property"]),
  word("vw-commercial", "commercial", "/kəˈmɜːr.ʃəl/", "adjective", "thuộc thương mại / kinh doanh", "He purchased prime commercial property to set up a showroom.", "Anh ấy đã mua bất động sản thương mại đắc địa để mở phòng trưng bày.", "housing-property", ["commercial space", "commercial real estate", "commercial use"]),
  word("vw-vacant", "vacant", "/ˈveɪ.kənt/", "adjective", "bỏ trống, chưa có người ở", "There are currently several vacant apartments on the fourth floor.", "Hiện có một vài căn hộ bỏ trống ở tầng bốn.", "housing-property", ["vacant room", "remain vacant", "vacant property"], { noun: "vacancy" }),
  word("vw-occupancy", "occupancy", "/ˈɑː.kjə.pən.si/", "noun", "tỷ lệ lấp đầy, sự cư ngụ", "The hotel maintains a ninety percent occupancy rate during summer.", "Khách sạn duy trì tỷ lệ lấp đầy chín mươi phần trăm trong mùa hè.", "housing-property", ["occupancy rate", "maximum occupancy", "certificate of occupancy"], { verb: "occupy" }),
  word("vw-maintenance", "maintenance", "/ˈmeɪn.tən.əns/", "noun", "sự bảo dưỡng, bảo trì", "Call building maintenance if the heating unit stops working.", "Hãy gọi bộ phận bảo trì tòa nhà nếu máy sưởi ngừng hoạt động.", "housing-property", ["routine maintenance", "maintenance fee", "maintenance staff"], { verb: "maintain" }),
  word("vw-deposit-v9", "deposit", "/dɪˈpɑː.zɪt/", "noun", "tiền đặt cọc nhà", "The lease requires a one-month security deposit upon signing.", "Hợp đồng thuê yêu cầu đặt cọc bảo đảm một tháng tiền nhà khi ký.", "housing-property", ["security deposit", "refundable deposit", "pay a deposit"]),
];

const v9Exercises: VocabExercise[] = [
  vq("v9e-001", "meaning_match", "\"lease\" có nghĩa là gì?", ["hợp đồng cho thuê", "người thuê nhà", "khu dân cư", "sự cải tạo"], 0, "Lease = hợp đồng cho thuê tài sản/nhà đất.", "vw-lease"),
  vq("v9e-002", "meaning_match", "\"tenant\" có nghĩa là gì?", ["chủ nhà", "người thuê nhà", "thợ sửa ống nước", "nhân viên kiểm tra"], 1, "Tenant = người thuê phòng/nhà.", "vw-tenant"),
  vq("v9e-003", "meaning_match", "\"utilities\" có nghĩa là gì?", ["tiền đặt cọc", "dịch vụ tiện ích (điện, nước)", "hợp đồng thuê", "vật liệu xây dựng"], 1, "Utilities = các dịch vụ tiện ích công cộng như điện, nước, khí đốt.", "vw-utilities"),
  vq("v9e-004", "meaning_match", "\"renovation\" có nghĩa là gì?", ["sự thanh tra", "sự cải tạo / nâng cấp", "tỷ lệ lấp đầy", "khu thương mại"], 1, "Renovation = sửa chữa, cải tạo làm mới công trình.", "vw-renovation"),
  vq("v9e-005", "meaning_match", "\"spacious\" có nghĩa là gì?", ["chật hẹp", "rộng rãi, thoáng đãng", "trống rỗng", "ồn ào"], 1, "Spacious = có nhiều không gian, rộng rãi.", "vw-spacious"),
  vq("v9e-006", "meaning_match", "\"vacant\" có nghĩa là gì?", ["đã có người ở", "đang bỏ trống", "được cải tạo", "thương mại"], 1, "Vacant = còn trống, chưa có người thuê/ở.", "vw-vacant"),
  vq("v9e-007", "sentence_completion", "The newly painted apartment comes fully _____ with a sofa, bed, and dining table.", ["furnished", "vacant", "residential", "spacious"], 0, "Fully furnished = trang bị đầy đủ tiện nghi nội thất.", "vw-furnished"),
  vq("v9e-008", "sentence_completion", "All prospective _____ must submit references and proof of steady income.", ["tenants", "landlords", "utilities", "leases"], 0, "Prospective tenants = những người thuê nhà tiềm năng.", "vw-tenant"),
  vq("v9e-009", "sentence_completion", "The historical building is closed to the public while undergoing extensive _____.", ["renovation", "location", "occupancy", "tenant"], 0, "Undergo renovation = trải qua quá trình cải tạo tu sửa.", "vw-renovation"),
  vq("v9e-010", "sentence_completion", "A certified inspector conducted a thorough safety _____ before signing off.", ["inspection", "renovation", "mortgage", "deposit"], 0, "Safety inspection = kiểm định an toàn.", "vw-inspection"),
  vq("v9e-011", "sentence_completion", "Rent for this two-bedroom condo includes all basic _____ such as water and gas.", ["utilities", "tenants", "neighborhoods", "properties"], 0, "Basic utilities = các tiện ích cơ bản.", "vw-utilities"),
  vq("v9e-012", "sentence_completion", "The landlord returned the entire security _____ after verifying no property damage.", ["deposit", "lease", "rent", "mortgage"], 0, "Security deposit = tiền cọc bảo đảm.", "vw-deposit-v9"),
];

export const vocabLesson9: VocabLesson = {
  id: "s1-vocab-09",
  stage: "foundation",
  order: 20,
  titleVi: "Từ vựng: Nhà ở & Bất động sản",
  titleEn: "Vocabulary: Housing & Property",
  category: "vocabulary",
  topic: "housing-property",
  words: v9Words,
  exercises: v9Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// LESSON V10: Dining & Entertainment
// ═══════════════════════════════════════════════════════════════════

const v10Words: VocabWord[] = [
  word("vw-restaurant", "restaurant", "/ˈres.trɑːnt/", "noun", "nhà hàng", "We made dinner arrangements at an upscale seafood restaurant.", "Chúng tôi đã sắp xếp bữa tối tại một nhà hàng hải sản cao cấp.", "dining-entertainment", ["fast-food restaurant", "fine-dining restaurant", "restaurant review"]),
  word("vw-reservation-v10", "reservation", "/ˌrez.ərˈveɪ.ʃən/", "noun", "đặt bàn trước", "Would you like to make a table reservation for eight o'clock?", "Quý khách có muốn đặt bàn cho lúc tám giờ không?", "dining-entertainment", ["table reservation", "reserve a table", "hold a reservation"]),
  word("vw-menu", "menu", "/ˈmen.juː/", "noun", "thực đơn", "The server handed each guest a copy of the dessert menu.", "Người phục vụ đưa cho mỗi khách một bản thực đơn món tráng miệng.", "dining-entertainment", ["dinner menu", "lunch special menu", "on the menu"]),
  word("vw-appetizer", "appetizer", "/ˈæp.ə.taɪ.zɚ/", "noun", "món khai vị", "We ordered a plate of garlic bread and calamari as an appetizer.", "Chúng tôi gọi một đĩa bánh mì bơ tỏi và mực chiên làm món khai vị.", "dining-entertainment", ["hot appetizer", "order appetizers", "appetizer platter"]),
  word("vw-entree", "entree", "/ˈɑːn.treɪ/", "noun", "món chính (trong bữa ăn)", "For her entree, she chose grilled salmon with roasted vegetables.", "Đối với món chính, cô ấy chọn cá hồi nướng cùng rau củ nung.", "dining-entertainment", ["main entree", "choice of entree", "seafood entree"]),
  word("vw-dessert", "dessert", "/dɪˈzɜːrt/", "noun", "món tráng miệng", "Chocolate lava cake is the chef's signature dessert.", "Bánh chocolate lava là món tráng miệng đặc trưng của đầu bếp.", "dining-entertainment", ["order dessert", "dessert menu", "for dessert"]),
  word("vw-beverage", "beverage", "/ˈbev.ɚ.ɪdʒ/", "noun", "đồ uống, thức uống", "Alcoholic beverages are not served to patrons under legal age.", "Đồ uống có cồn không được phục vụ cho khách chưa đủ tuổi luật định.", "dining-entertainment", ["hot beverage", "cold beverage", "beverage service"]),
  word("vw-waiter", "waiter", "/ˈweɪ.t̬ɚ/", "noun", "bồi bàn nam", "The waiter recommended the roasted duck special for tonight.", "Người bồi bàn đã giới thiệu món vịt quay đặc biệt cho tối nay.", "dining-entertainment", ["call the waiter", "tip the waiter", "head waiter"]),
  word("vw-chef", "chef", "/ʃef/", "noun", "bếp trưởng, đầu bếp chuyên nghiệp", "The executive chef trained in Paris for over a decade.", "Bếp trưởng điều hành đã được đào tạo tại Paris hơn một thập kỷ.", "dining-entertainment", ["head chef", "pastry chef", "celebrity chef"]),
  word("vw-cuisine", "cuisine", "/kwɪˈziːn/", "noun", "ẩm thực, phong cách nấu ăn", "The city is renowned for its diverse selection of international cuisine.", "Thành phố nổi tiếng với sự lựa chọn đa dạng các nền ẩm thực quốc tế.", "dining-entertainment", ["Italian cuisine", "traditional cuisine", "fine cuisine"]),
  word("vw-banquet", "banquet", "/ˈbæŋ.kwɪt/", "noun", "bữa tiệc lớn, dạ tiệc", "The annual awards banquet will host three hundred distinguished guests.", "Dạ tiệc trao giải hàng năm sẽ đón tiếp ba trăm vị khách quý.", "dining-entertainment", ["banquet hall", "awards banquet", "host a banquet"]),
  word("vw-catering", "catering", "/ˈkeɪ.t̬ɚ.ɪŋ/", "noun", "dịch vụ ăn uống / tiệc lưu động", "We hired an external catering service for the company anniversary.", "Chúng tôi đã thuê dịch vụ nấu tiệc bên ngoài cho lễ kỷ niệm công ty.", "dining-entertainment", ["catering company", "catering service", "event catering"], { verb: "cater" }),
  word("vw-reception", "reception", "/rɪˈsep.ʃən/", "noun", "tiệc đón tiếp, lễ tân", "A cocktail reception followed the opening keynote speeches.", "Một buổi tiệc đón tiếp cocktail đã diễn ra sau các bài phát biểu khai mạc.", "dining-entertainment", ["wedding reception", "welcome reception", "reception desk"]),
  word("vw-ticket", "ticket", "/ˈtɪk.ɪt/", "noun", "vé xem biểu diễn / sự kiện", "Tickets for the symphony sold out within thirty minutes.", "Vé cho buổi hòa nhạc giao hưởng đã bán hết trong vòng ba mươi phút.", "dining-entertainment", ["admission ticket", "concert ticket", "book tickets"]),
  word("vw-admission", "admission", "/ədˈmɪʃ.ən/", "noun", "phí vào cửa, sự cho phép vào", "General admission to the contemporary art museum is ten dollars.", "Giá vào cửa thông thường của bảo tàng nghệ thuật đương đại là mười đô la.", "dining-entertainment", ["admission fee", "free admission", "gain admission"], { verb: "admit" }),
  word("vw-exhibit", "exhibit", "/ɪɡˈzɪb.ɪt/", "noun", "triển lãm, hiện vật trưng bày", "The museum unveiled a fascinating exhibit on ancient civilizations.", "Bảo tàng đã công bố một triển lãm hấp dẫn về các nền văn minh cổ đại.", "dining-entertainment", ["art exhibit", "special exhibit", "on exhibit"], { verb: "exhibit", noun: "exhibition" }),
  word("vw-performance", "performance", "/pɚˈfɔːr.məns/", "noun", "buổi biểu diễn", "The evening musical performance received a standing ovation.", "Buổi biểu diễn nhạc kịch buổi tối đã nhận được sự hoan nghênh nhiệt liệt.", "dining-entertainment", ["live performance", "musical performance", "give a performance"], { verb: "perform" }),
  word("vw-audience", "audience", "/ˈɑː.di.əns/", "noun", "khán giả, thính giả", "The comedian engaged the entire audience with hilarious stories.", "Diễn viên hài đã thu hút toàn bộ khán giả bằng những câu chuyện vui nhộn.", "dining-entertainment", ["target audience", "large audience", "captivate an audience"]),
  word("vw-gallery", "gallery", "/ˈɡæl.ɚ.i/", "noun", "phòng trưng bày tranh nghệ thuật", "Local artists display their paintings in the downtown art gallery.", "Các nghệ sĩ địa phương trưng bày tranh của họ trong phòng triển lãm nghệ thuật ở trung tâm.", "dining-entertainment", ["art gallery", "picture gallery", "visit a gallery"]),
  word("vw-venue-v10", "venue", "/ˈven.juː/", "noun", "địa điểm tổ chức sự kiện", "The conference center is the premier venue for musical concerts.", "Trung tâm hội nghị là địa điểm hàng đầu cho các buổi hòa nhạc.", "dining-entertainment", ["concert venue", "ideal venue", "change the venue"]),
];

const v10Exercises: VocabExercise[] = [
  vq("v10e-001", "meaning_match", "\"appetizer\" có nghĩa là gì?", ["món chính", "món tráng miệng", "món khai vị", "thức uống"], 2, "Appetizer = món ăn nhẹ mở đầu bữa tiệc (món khai vị).", "vw-appetizer"),
  vq("v10e-002", "meaning_match", "\"catering\" có nghĩa là gì?", ["người thu ngân", "dịch vụ phục vụ ăn uống tiệc", "buổi hòa nhạc", "phòng tranh"], 1, "Catering = dịch vụ cung cấp đồ ăn thức uống cho sự kiện.", "vw-catering"),
  vq("v10e-003", "meaning_match", "\"exhibit\" có nghĩa là gì?", ["buổi biểu diễn kịch", "triển lãm / hiện vật trưng bày", "phí vào cửa", "thực đơn"], 1, "Exhibit = cuộc triển lãm hoặc vật trưng bày.", "vw-exhibit"),
  vq("v10e-004", "meaning_match", "\"cuisine\" có nghĩa là gì?", ["ẩm thực / phong cách nấu", "đầu bếp trưởng", "người phục vụ", "vé mời"], 0, "Cuisine = phong cách nấu nướng, nền ẩm thực.", "vw-cuisine"),
  vq("v10e-005", "meaning_match", "\"admission\" có nghĩa là gì?", ["phí / quyền vào cửa", "món tráng miệng", "dạ tiệc", "khán thính giả"], 0, "Admission = phí vào cổng, sự cho phép vào.", "vw-admission"),
  vq("v10e-006", "meaning_match", "\"banquet\" có nghĩa là gì?", ["bữa ăn nhẹ", "bữa đại tiệc", "quầy lễ tân", "bồi bàn"], 1, "Banquet = tiệc lớn long trọng.", "vw-banquet"),
  vq("v10e-007", "sentence_completion", "We booked the grand hotel ballroom as the official _____ for our wedding.", ["venue", "menu", "dessert", "appetizer"], 0, "Official venue = địa điểm chính thức.", "vw-venue-v10"),
  vq("v10e-008", "sentence_completion", "The executive _____ personally prepared the multi-course degustation meal.", ["chef", "waiter", "audience", "ticket"], 0, "Executive chef = bếp trưởng điều hành.", "vw-chef"),
  vq("v10e-009", "sentence_completion", "For dessert, the pastry chef prepared a delicate strawberry _____.", ["tart", "entree", "beverage", "ticket"], 0, "Dessert tart = món bánh tráng miệng.", "vw-dessert"),
  vq("v10e-010", "sentence_completion", "Complimentary non-alcoholic _____ were served to guests upon arrival.", ["beverages", "menus", "performances", "venues"], 0, "Non-alcoholic beverages = đồ uống không cồn.", "vw-beverage"),
  vq("v10e-011", "sentence_completion", "The museum announced free _____ for students and seniors every Thursday afternoon.", ["admission", "catering", "banquet", "reception"], 0, "Free admission = miễn phí vé vào cổng.", "vw-admission"),
  vq("v10e-012", "sentence_completion", "The crowd of five thousand cheered wildly after the electrifying rock _____.", ["performance", "beverage", "reservation", "menu"], 0, "Rock performance = buổi biểu diễn nhạc rock.", "vw-performance"),
];

export const vocabLesson10: VocabLesson = {
  id: "s1-vocab-10",
  stage: "foundation",
  order: 21,
  titleVi: "Từ vựng: Ẩm thực & Giải trí",
  titleEn: "Vocabulary: Dining & Entertainment",
  category: "vocabulary",
  topic: "dining-entertainment",
  words: v10Words,
  exercises: v10Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// LESSON V11: Weather & Environment
// ═══════════════════════════════════════════════════════════════════

const v11Words: VocabWord[] = [
  word("vw-forecast", "forecast", "/ˈfɔːr.kæst/", "noun", "sự dự báo (thời tiết/kinh tế)", "The weather forecast calls for heavy rain and thunderstorms tomorrow.", "Dự báo thời tiết cho thấy ngày mai sẽ có mưa to và giông bão.", "weather-environment", ["weather forecast", "economic forecast", "accurate forecast"], { verb: "forecast" }),
  word("vw-temperature", "temperature", "/ˈtem.prə.tʃɚ/", "noun", "nhiệt độ", "Summer temperatures in the valley regularly exceed forty degrees Celsius.", "Nhiệt độ mùa hè ở thung lũng thường xuyên vượt quá bốn mươi độ C.", "weather-environment", ["high temperature", "average temperature", "record temperature"]),
  word("vw-humidity", "humidity", "/hjuːˈmɪd.ə.t̬i/", "noun", "độ ẩm không khí", "High humidity levels make the summer afternoon feel uncomfortably hot.", "Độ ẩm cao khiến buổi chiều mùa hè có cảm giác oi bức khó chịu.", "weather-environment", ["relative humidity", "high humidity", "low humidity"], { adjective: "humid" }),
  word("vw-precipitation", "precipitation", "/prɪˌsɪp.əˈteɪ.ʃən/", "noun", "lượng mưa / giáng thủy", "The region recorded below-average precipitation during the autumn months.", "Khu vực này ghi nhận lượng giáng thủy dưới mức trung bình trong những tháng mùa thu.", "weather-environment", ["annual precipitation", "heavy precipitation", "chance of precipitation"]),
  word("vw-drought", "drought", "/draʊt/", "noun", "hạn hán", "A severe drought damaged wheat crops across the northern province.", "Hạn hán nghiêm trọng đã tàn phá các cánh đồng lúa mì khắp tỉnh phía bắc.", "weather-environment", ["severe drought", "drought conditions", "prolonged drought"]),
  word("vw-flood", "flood", "/flʌd/", "noun", "lũ lụt", "Heavy monsoon rains triggered flash floods along the riverbanks.", "Mưa gió mùa dữ dội đã gây ra lũ quét dọc theo hai bên bờ sông.", "weather-environment", ["flash flood", "flood damage", "flood warning"], { verb: "flood" }),
  word("vw-storm", "storm", "/stɔːrm/", "noun", "cơn bão", "Residents were advised to stay indoors until the tropical storm passes.", "Cư dân được khuyến cáo ở trong nhà cho đến khi cơn bão nhiệt đới đi qua.", "weather-environment", ["tropical storm", "severe storm", "weather the storm"]),
  word("vw-climate", "climate", "/ˈklaɪ.mət/", "noun", "khí hậu", "Global organizations are cooperating to combat climate change.", "Các tổ chức toàn cầu đang hợp tác để ứng phó với biến đổi khí hậu.", "weather-environment", ["climate change", "mild climate", "tropical climate"]),
  word("vw-pollution", "pollution", "/pəˈluː.ʃən/", "noun", "sự ô nhiễm", "Strict guidelines were enacted to curb industrial water pollution.", "Các hướng dẫn nghiêm ngặt đã được ban hành để kiềm chế ô nhiễm nguồn nước công nghiệp.", "weather-environment", ["air pollution", "water pollution", "reduce pollution"], { verb: "pollute", adjective: "polluted" }),
  word("vw-emission", "emission", "/iˈmɪʃ.ən/", "noun", "khí thải, sự phát thải", "Automakers are designing electric models to lower carbon emissions.", "Các hãng xe đang thiết kế các mẫu xe điện để cắt giảm lượng phát thải carbon.", "weather-environment", ["carbon emissions", "greenhouse gas emissions", "zero emissions"], { verb: "emit" }),
  word("vw-recycle", "recycle", "/ˌriːˈsaɪ.kəl/", "verb", "tái chế", "The office policy encourages staff to recycle paper and plastic bottles.", "Quy định văn phòng khuyến khích nhân viên tái chế giấy và chai nhựa.", "weather-environment", ["recycle waste", "recycling bin", "recycle materials"], { noun: "recycling", adjective: "recyclable" }),
  word("vw-sustainable", "sustainable", "/səˈsteɪ.nə.bəl/", "adjective", "bền vững, thân thiện môi trường", "Using sustainable packaging materials helps minimize carbon footprints.", "Sử dụng vật liệu đóng gói bền vững giúp giảm thiểu dấu chân carbon.", "weather-environment", ["sustainable energy", "sustainable development", "sustainable practices"], { noun: "sustainability" }),
  word("vw-conservation", "conservation", "/ˌkɑːn.sɚˈveɪ.ʃən/", "noun", "sự bảo tồn thiên nhiên/tài nguyên", "Water conservation efforts are crucial during dry summer seasons.", "Các nỗ lực bảo tồn nguồn nước là vô cùng quan trọng trong mùa hè khô hạn.", "weather-environment", ["wildlife conservation", "energy conservation", "conservation effort"], { verb: "conserve" }),
  word("vw-renewable", "renewable", "/rɪˈnuː.ə.bəl/", "adjective", "tái tạo được (năng lượng)", "Solar and wind are primary examples of clean, renewable energy.", "Năng lượng mặt trời và gió là những ví dụ tiêu biểu về năng lượng sạch có thể tái tạo.", "weather-environment", ["renewable energy", "renewable resources", "renewable power"]),
  word("vw-disposal", "disposal", "/dɪˈspoʊ.zəl/", "noun", "sự xử lý, vứt bỏ chất thải", "Regulations mandate the safe disposal of toxic chemical waste.", "Các quy định bắt buộc phải xử lý an toàn chất thải hóa học độc hại.", "weather-environment", ["waste disposal", "safe disposal", "at one's disposal"], { verb: "dispose" }),
  word("vw-vegetation", "vegetation", "/ˌvedʒ.əˈteɪ.ʃən/", "noun", "thảm thực vật, cây cỏ", "Lush tropical vegetation covers the slopes of the national park.", "Thảm thực vật nhiệt đới tươi tốt bao phủ các sườn núi của vườn quốc gia.", "weather-environment", ["natural vegetation", "dense vegetation", "destroy vegetation"]),
  word("vw-wildlife", "wildlife", "/ˈwaɪld.laɪf/", "noun", "động vật hoang dã", "The sanctuary was established to protect endangered wildlife species.", "Khu bảo tồn được thành lập để bảo vệ các loài động vật hoang dã có nguy cơ tuyệt chủng.", "weather-environment", ["wildlife protection", "protect wildlife", "local wildlife"]),
  word("vw-habitat", "habitat", "/ˈhæb.ə.tæt/", "noun", "môi trường sống tự nhiên", "Deforestation poses an immediate threat to the natural habitat of birds.", "Nạn phá rừng đe dọa trực tiếp đến môi trường sống tự nhiên của các loài chim.", "weather-environment", ["natural habitat", "destroy habitat", "wildlife habitat"]),
  word("vw-ecosystem", "ecosystem", "/ˈiː.koʊˌsɪs.təm/", "noun", "hệ sinh thái", "Pollution disrupts the fragile marine ecosystem in coral reefs.", "Sự ô nhiễm phá vỡ hệ sinh thái biển mong manh ở các rạn san hô.", "weather-environment", ["fragile ecosystem", "marine ecosystem", "forest ecosystem"]),
  word("vw-regulation", "regulation", "/ˌreɡ.jəˈleɪ.ʃən/", "noun", "quy định, luật lệ", "Environmental regulations require factories to filter toxic fumes.", "Các quy định về môi trường đòi hỏi các nhà máy phải lọc khói độc hại.", "weather-environment", ["government regulations", "comply with regulations", "safety regulation"], { verb: "regulate" }),
];

const v11Exercises: VocabExercise[] = [
  vq("v11e-001", "meaning_match", "\"forecast\" có nghĩa là gì?", ["sự ô nhiễm", "bản dự báo (thời tiết)", "hạn hán", "khí thải"], 1, "Forecast = dự báo thời tiết hoặc kinh tế.", "vw-forecast"),
  vq("v11e-002", "meaning_match", "\"sustainable\" có nghĩa là gì?", ["bền vững / thân thiện môi trường", "tạm thời", "nguy hiểm", "đắt đỏ"], 0, "Sustainable = bền vững, duy trì lâu dài được.", "vw-sustainable"),
  vq("v11e-003", "meaning_match", "\"emission\" có nghĩa là gì?", ["sự giáng thủy", "khí thải / sự phát thải", "nhiệt độ", "thảm thực vật"], 1, "Emission = khí thải xả ra môi trường.", "vw-emission"),
  vq("v11e-004", "meaning_match", "\"conservation\" có nghĩa là gì?", ["sự tàn phá", "sự bảo tồn", "lũ lụt", "dự báo"], 1, "Conservation = việc giữ gìn, bảo tồn thiên nhiên.", "vw-conservation"),
  vq("v11e-005", "meaning_match", "\"renewable\" có nghĩa là gì?", ["tái tạo được (năng lượng)", "độc hại", "khan hiếm", "hóa thạch"], 0, "Renewable = có thể tái tạo tự nhiên (năng lượng xanh).", "vw-renewable"),
  vq("v11e-006", "meaning_match", "\"habitat\" có nghĩa là gì?", ["khí thải", "môi trường sống tự nhiên", "hạn hán", "quy định"], 1, "Habitat = môi trường sống sinh thái của sinh vật.", "vw-habitat"),
  vq("v11e-007", "sentence_completion", "According to the five-day weather _____, sunny skies are expected this weekend.", ["forecast", "drought", "emission", "pollution"], 0, "Weather forecast = bản dự báo thời tiết.", "vw-forecast"),
  vq("v11e-008", "sentence_completion", "The city government aims to transition to clean, _____ energy sources by 2030.", ["renewable", "polluted", "fragile", "drought"], 0, "Renewable energy = năng lượng tái tạo.", "vw-renewable"),
  vq("v11e-009", "sentence_completion", "Companies face hefty fines if they do not comply with environmental _____.", ["regulations", "temperatures", "forecasts", "vegetations"], 0, "Comply with regulations = tuân thủ quy định.", "vw-regulation"),
  vq("v11e-010", "sentence_completion", "Conserving wetlands is essential to protect the natural _____ of migratory birds.", ["habitat", "emission", "forecast", "precipitation"], 0, "Natural habitat = môi trường sống tự nhiên.", "vw-habitat"),
  vq("v11e-011", "sentence_completion", "Strict vehicle testing was introduced to drastically curb carbon _____ in cities.", ["emissions", "droughts", "habitats", "ecosystems"], 0, "Carbon emissions = khí thải carbon.", "vw-emission"),
  vq("v11e-012", "sentence_completion", "Eco-friendly businesses emphasize _____ production techniques that conserve water.", ["sustainable", "toxic", "humid", "severe"], 0, "Sustainable techniques = kỹ thuật sản xuất bền vững.", "vw-sustainable"),
];

export const vocabLesson11: VocabLesson = {
  id: "s1-vocab-11",
  stage: "foundation",
  order: 22,
  titleVi: "Từ vựng: Thời tiết & Môi trường",
  titleEn: "Vocabulary: Weather & Environment",
  category: "vocabulary",
  topic: "weather-environment",
  words: v11Words,
  exercises: v11Exercises,
};

// ═══════════════════════════════════════════════════════════════════
// LESSON V12: Education & Training
// ═══════════════════════════════════════════════════════════════════

const v12Words: VocabWord[] = [
  word("vw-curriculum", "curriculum", "/kəˈrɪk.jə.ləm/", "noun", "chương trình giảng dạy", "The business faculty revised its core MBA curriculum this year.", "Khoa kinh doanh đã sửa đổi chương trình giảng dạy MBA cốt lõi năm nay.", "education-training", ["core curriculum", "develop a curriculum", "curriculum vitae"]),
  word("vw-tuition", "tuition", "/tuːˈɪʃ.ən/", "noun", "học phí", "University tuition rates have risen gradually over the past decade.", "Học phí đại học đã tăng dần trong thập kỷ qua.", "education-training", ["tuition fee", "pay tuition", "college tuition"]),
  word("vw-enrollment", "enrollment", "/ɪnˈroʊl.mənt/", "noun", "sự ghi danh, số lượng nhập học", "Course enrollment for the upcoming autumn semester begins Monday.", "Việc đăng ký khóa học cho học kỳ mùa thu sắp tới bắt đầu vào thứ Hai.", "education-training", ["open enrollment", "enrollment fee", "boost enrollment"], { verb: "enroll" }),
  word("vw-scholarship", "scholarship", "/ˈskɑː.lɚ.ʃɪp/", "noun", "học bổng", "She received a merit-based scholarship that covered full tuition.", "Cô ấy nhận được học bổng dựa trên thành tích chi trả toàn bộ học phí.", "education-training", ["win a scholarship", "apply for a scholarship", "full scholarship"], { noun: "scholar" }),
  word("vw-certificate", "certificate", "/sɚˈtɪf.ə.kət/", "noun", "chứng chỉ", "Upon completing thirty hours of study, students receive a completion certificate.", "Sau khi hoàn thành ba mươi giờ học, học viên nhận được chứng chỉ hoàn thành.", "education-training", ["awarded a certificate", "birth certificate", "professional certificate"], { verb: "certify", noun: "certification" }),
  word("vw-qualification", "qualification", "/ˌkwɑː.lə.fəˈkeɪ.ʃən/", "noun", "bằng cấp, năng lực chuyên môn", "Candidates must possess relevant academic qualifications for the lecturing role.", "Các ứng viên phải có trình độ chuyên môn học thuật liên quan cho vai trò giảng dạy.", "education-training", ["formal qualifications", "meet qualifications", "job qualifications"], { verb: "qualify", adjective: "qualified" }),
  word("vw-instructor", "instructor", "/ɪnˈstrʌk.tɚ/", "noun", "người hướng dẫn, giảng viên", "The fitness instructor demonstrated the proper posture for each exercise.", "Người hướng dẫn thể dục đã thị phạm tư thế đúng cho từng bài tập.", "education-training", ["course instructor", "qualified instructor", "certified instructor"], { verb: "instruct", noun: "instruction" }),
  word("vw-graduate", "graduate", "/ˈɡrædʒ.u.ət/", "noun", "người tốt nghiệp đại học", "Recent college graduates are encouraged to submit applications.", "Các sinh viên mới tốt nghiệp đại học được khuyến khích nộp hồ sơ ứng tuyển.", "education-training", ["college graduate", "high school graduate", "recent graduate"], { verb: "graduate", noun: "graduation" }),
  word("vw-undergraduate", "undergraduate", "/ˌʌn.dɚˈɡrædʒ.u.ət/", "noun", "sinh viên chưa tốt nghiệp (bậc cử nhân)", "The university enrolls over ten thousand undergraduate students.", "Trường đại học tiếp nhận hơn mười nghìn sinh viên đại học bậc cử nhân.", "education-training", ["undergraduate degree", "undergraduate student", "undergraduate program"]),
  word("vw-thesis", "thesis", "/ˈθiː.sɪs/", "noun", "luận văn, luận án", "He defended his master's thesis before an academic evaluation panel.", "Anh ấy đã bảo vệ luận văn thạc sĩ của mình trước hội đồng đánh giá học thuật.", "education-training", ["write a thesis", "master's thesis", "defend a thesis"]),
  word("vw-lecture", "lecture", "/ˈlek.tʃɚ/", "noun", "bài giảng, buổi diễn thuyết", "Professor Davis delivered an inspiring lecture on international trade.", "Giáo sư Davis đã trình bày một bài giảng đầy cảm hứng về thương mại quốc tế.", "education-training", ["attend a lecture", "guest lecture", "lecture hall"], { verb: "lecture", noun: "lecturer" }),
  word("vw-tutorial", "tutorial", "/tuːˈtɔːr.i.əl/", "noun", "buổi học phụ đạo, bài hướng dẫn", "Online software tutorials guide beginner users step by step.", "Các bài hướng dẫn phần mềm trực tuyến hướng dẫn người mới từng bước.", "education-training", ["step-by-step tutorial", "video tutorial", "attend a tutorial"]),
  word("vw-assignment", "assignment", "/əˈsaɪn.mənt/", "noun", "bài tập, nhiệm vụ được giao", "Students must submit the written research assignment by midnight.", "Sinh viên phải nộp bài tập nghiên cứu dạng viết trước nửa đêm.", "education-training", ["homework assignment", "complete an assignment", "written assignment"], { verb: "assign" }),
  word("vw-assessment", "assessment", "/əˈses.mənt/", "noun", "sự đánh giá kết quả", "Continuous assessment accounts for forty percent of the final course grade.", "Đánh giá quá trình chiếm bốn mươi phần trăm điểm tổng kết môn học.", "education-training", ["performance assessment", "risk assessment", "needs assessment"], { verb: "assess" }),
  word("vw-evaluation", "evaluation", "/ɪˌvæl.juˈeɪ.ʃən/", "noun", "sự thẩm định, đánh giá", "At the conclusion of the workshop, attendees completed an evaluation form.", "Vào cuối buổi hội thảo, người tham dự đã điền phiếu đánh giá.", "education-training", ["course evaluation", "formal evaluation", "performance evaluation"], { verb: "evaluate" }),
  word("vw-diploma", "diploma", "/dɪˈploʊ.mə/", "noun", "văn bằng, chứng chỉ tốt nghiệp", "She proudly received her high school diploma during the commencement ceremony.", "Cô ấy tự hào nhận bằng tốt nghiệp trung học trong lễ tốt nghiệp.", "education-training", ["high school diploma", "diploma program", "earn a diploma"]),
  word("vw-accreditation", "accreditation", "/əˌkred.əˈteɪ.ʃən/", "noun", "sự kiểm định chất lượng", "The business school received international accreditation for its programs.", "Trường kinh doanh đã nhận được kiểm định quốc tế cho các chương trình của mình.", "education-training", ["gain accreditation", "regional accreditation", "accreditation standards"], { verb: "accredit" }),
  word("vw-academic", "academic", "/ˌæk.əˈdem.ɪk/", "adjective", "thuộc học thuật, học viện", "The institution is recognized worldwide for its high academic standards.", "Học viện được công nhận trên toàn thế giới vì các tiêu chuẩn học thuật cao.", "education-training", ["academic year", "academic achievement", "academic research"]),
  word("vw-research", "research", "/ˈriː.sɜːrtʃ/", "noun", "nghiên cứu khoa học", "The grant will fund independent scientific research on clean fuels.", "Khoản tài trợ sẽ cấp vốn cho nghiên cứu khoa học độc lập về nhiên liệu sạch.", "education-training", ["conduct research", "market research", "scientific research"], { verb: "research", noun: "researcher" }),
  word("vw-syllabus", "syllabus", "/ˈsɪl.ə.bəs/", "noun", "đề cương môn học", "Check the course syllabus for required textbooks and grading criteria.", "Kiểm tra đề cương môn học để biết sách giáo khoa bắt buộc và tiêu chí chấm điểm.", "education-training", ["course syllabus", "outline in the syllabus", "read the syllabus"]),
];

const v12Exercises: VocabExercise[] = [
  vq("v12e-001", "meaning_match", "\"scholarship\" có nghĩa là gì?", ["học phí", "học bổng", "bài giảng", "chứng chỉ"], 1, "Scholarship = học bổng trợ cấp học tập.", "vw-scholarship"),
  vq("v12e-002", "meaning_match", "\"curriculum\" có nghĩa là gì?", ["khóa học phụ đạo", "chương trình giảng dạy", "bài tập về nhà", "văn bằng"], 1, "Curriculum = chương trình đào tạo/giảng dạy.", "vw-curriculum"),
  vq("v12e-003", "meaning_match", "\"tuition\" có nghĩa là gì?", ["học phí", "sự ghi danh", "luận văn", "đề cương"], 0, "Tuition = tiền học phí.", "vw-tuition"),
  vq("v12e-004", "meaning_match", "\"assignment\" có nghĩa là gì?", ["kỳ nghỉ", "bài tập / nhiệm vụ được giao", "học bổng", "người hướng dẫn"], 1, "Assignment = bài tập hoặc nhiệm vụ được phân công.", "vw-assignment"),
  vq("v12e-005", "meaning_match", "\"assessment\" có nghĩa là gì?", ["bài giảng", "sự đánh giá", "bằng tốt nghiệp", "buổi lễ"], 1, "Assessment = việc đánh giá kết quả, năng lực.", "vw-assessment"),
  vq("v12e-006", "meaning_match", "\"accreditation\" có nghĩa là gì?", ["học phí", "sự kiểm định chất lượng", "luận án", "đề cương"], 1, "Accreditation = sự kiểm định chất lượng công nhận chính thức.", "vw-accreditation"),
  vq("v12e-007", "sentence_completion", "He was awarded a full four-year _____ thanks to his outstanding high school grades.", ["scholarship", "tuition", "syllabus", "lecture"], 0, "Full scholarship = học bổng toàn phần.", "vw-scholarship"),
  vq("v12e-008", "sentence_completion", "The university revised its business _____ to incorporate practical digital skills.", ["curriculum", "tuition", "undergraduate", "diploma"], 0, "Revised curriculum = sửa đổi chương trình giảng dạy.", "vw-curriculum"),
  vq("v12e-009", "sentence_completion", "Remember to submit your final chemistry research _____ before Friday evening.", ["assignment", "tuition", "instructor", "accreditation"], 0, "Research assignment = bài tập nghiên cứu.", "vw-assignment"),
  vq("v12e-010", "sentence_completion", "Online course _____ has grown exponentially over the past two years.", ["enrollment", "thesis", "syllabus", "qualification"], 0, "Course enrollment = số lượng đăng ký khóa học.", "vw-enrollment"),
  vq("v12e-011", "sentence_completion", "Consult the course _____ on the first day to see exam schedules and reading lists.", ["syllabus", "tuition", "scholarship", "certificate"], 0, "Course syllabus = đề cương môn học.", "vw-syllabus"),
  vq("v12e-012", "sentence_completion", "Graduate students must write and defend an original _____ to earn their master's degree.", ["thesis", "tuition", "curriculum", "accreditation"], 0, "Defend a thesis = bảo vệ luận văn.", "vw-thesis"),
];

export const vocabLesson12: VocabLesson = {
  id: "s1-vocab-12",
  stage: "foundation",
  order: 23,
  titleVi: "Từ vựng: Giáo dục & Đào tạo",
  titleEn: "Vocabulary: Education & Training",
  category: "vocabulary",
  topic: "education-training",
  words: v12Words,
  exercises: v12Exercises,
};

// ─── Export all expansion lessons ─────────────────────────────────

export const stage1ExpansionVocabLessons: VocabLesson[] = [
  vocabLesson4,
  vocabLesson5,
  vocabLesson6,
  vocabLesson7,
  vocabLesson8,
  vocabLesson9,
  vocabLesson10,
  vocabLesson11,
  vocabLesson12,
];
