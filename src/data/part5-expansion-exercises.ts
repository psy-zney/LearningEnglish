import type { ExerciseOption, Part5Exercise } from "../domain/exercise.ts";

const C = {
  agreement: "subject_verb_agreement",
  tense: "tense_or_time_anchor",
  verbForm: "verb_form_or_pattern",
  preposition: "preposition_or_collocation",
  connector: "connector_or_clause_structure",
  wordChoice: "word_choice_or_meaning",
  wordForm: "word_form",
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
  difficulty: 1 | 2 | 3 = 2,
): Part5Exercise {
  const options = answers.map((text, index) => ({
    id: optionIds[index],
    text,
    rationaleVi: index === correctIndex
      ? explanationVi
      : `“${text}” không phù hợp với nghĩa, từ loại hoặc cấu trúc của câu này.`,
  })) as ExerciseOption[];
  return { id, part: 5, prompt, options, correctOptionId: optionIds[correctIndex], explanationVi, errorCategory, focusContentIds, difficulty };
}

/** Original questions written for this repository; not copied from ETS materials. */
export const expandedPart5Exercises: Part5Exercise[] = [
  q("p5-031", "Employees will be _____ for approved travel expenses within ten business days.", ["reimburse", "reimbursed", "reimbursing", "reimbursement"], 1, "Sau will be cần quá khứ phân từ để tạo bị động: will be reimbursed.", C.verbForm, ["verb-reimburse"]),
  q("p5-032", "The contractor will _____ us for the materials after the work is completed.", ["invoice", "invoiced", "invoicing", "invoiceable"], 0, "Sau will dùng động từ nguyên mẫu: will invoice us for the materials.", C.verbForm, ["verb-invoice"]),
  q("p5-033", "Additional funds were allocated _____ employee training.", ["at", "to", "from", "with"], 1, "Allocate resources to a purpose là cấu trúc đúng.", C.preposition, ["verb-allocate"]),
  q("p5-034", "Only department managers are authorized _____ purchases over $500.", ["approve", "approved", "to approve", "approving"], 2, "Be authorized to + V nghĩa là được cho phép làm việc gì.", C.verbForm, ["verb-authorize"]),
  q("p5-035", "Please pay the _____ balance before requesting another delivery.", ["outstanding", "standing", "outstood", "stands"], 0, "Outstanding balance là số dư hoặc khoản nợ chưa thanh toán.", C.wordChoice, ["phrase-outstanding-balance"]),
  q("p5-036", "Business customers may qualify for a lower interest _____.", ["ratio", "rate", "range", "rank"], 1, "Interest rate là collocation chỉ lãi suất.", C.wordChoice, ["phrase-interest-rate"]),
  q("p5-037", "The final payment is _____ on the fifteenth of next month.", ["due", "owing to", "during", "until"], 0, "Payment is due on + date nghĩa là khoản thanh toán đến hạn vào ngày đó.", C.wordChoice, ["phrase-payment-due"]),
  q("p5-038", "The accountant has already _____ the company's tax return.", ["prepare", "prepares", "prepared", "preparing"], 2, "Present perfect dùng have/has + V3: has prepared.", C.tense, ["phrase-tax-return", "tense-present-perfect"]),
  q("p5-039", "This quarter's sales figures _____ a steady increase in online orders.", ["shows", "show", "showing", "has shown"], 1, "Sales figures là chủ ngữ số nhiều nên dùng show.", C.agreement, ["phrase-sales-figures"]),
  q("p5-040", "The annual budget _____ by the board at Monday's meeting.", ["approves", "approved", "was approved", "has approving"], 2, "Ngân sách nhận hành động phê duyệt ở quá khứ nên dùng was approved.", C.tense, ["phrase-annual-budget", "verb-approve"]),

  q("p5-041", "Enter your tracking _____ on the carrier's website to locate the package.", ["amount", "number", "figure", "account"], 1, "Tracking number là mã dùng để theo dõi kiện hàng.", C.wordChoice, ["phrase-tracking-number"]),
  q("p5-042", "The replacement parts are currently _____ transit and should arrive tomorrow.", ["on", "at", "in", "by"], 2, "In transit là cụm cố định nghĩa là đang được vận chuyển.", C.preposition, ["phrase-in-transit"]),
  q("p5-043", "Customers should verify the shipping address _____ placing an order.", ["before", "during", "despite", "unless"], 0, "Before + V-ing diễn tả hành động cần làm trước khi đặt hàng.", C.connector, ["phrase-shipping-address", "phrase-place-order"]),
  q("p5-044", "Every international shipment must include a customs _____.", ["declare", "declared", "declaration", "declarative"], 2, "Sau customs cần danh từ declaration để tạo cụm customs declaration.", C.wordForm, ["phrase-customs-declaration"]),
  q("p5-045", "The packages left the regional distribution _____ early this morning.", ["central", "center", "centered", "centrally"], 1, "Distribution center là cụm danh từ chỉ trung tâm phân phối.", C.wordForm, ["phrase-distribution-center"]),
  q("p5-046", "Shipping and handling charges _____ included in the advertised price.", ["is", "are", "was", "has"], 1, "Chủ ngữ chính charges ở số nhiều nên dùng are.", C.agreement, ["phrase-shipping-handling"]),
  q("p5-047", "The courier emailed us proof _____ delivery after the package arrived.", ["for", "from", "of", "with"], 2, "Proof of delivery là cụm cố định.", C.preposition, ["phrase-proof-delivery"]),
  q("p5-048", "The supplier confirmed the delivery date, _____ we updated the project schedule.", ["so", "although", "unless", "because of"], 0, "So nối nguyên nhân với kết quả: đã xác nhận ngày giao nên lịch được cập nhật.", C.connector, ["phrase-delivery-date", "verb-confirm"]),
  q("p5-049", "All orders received before noon _____ the same day.", ["ship", "are shipped", "shipping", "have ship"], 1, "Orders nhận hành động vận chuyển; quy trình thường xuyên dùng hiện tại đơn bị động are shipped.", C.verbForm, ["verb-ship", "tense-present-simple"]),
  q("p5-050", "The vendor supplies each branch _____ printer paper and packaging materials.", ["to", "for", "with", "at"], 2, "Supply + recipient + with + item là pattern đúng.", C.preposition, ["verb-supply"]),

  q("p5-051", "Employees must log in _____ the portal with their company account.", ["at", "to", "for", "by"], 1, "Log in to + system/portal là cấu trúc đúng.", C.preposition, ["phrase-log-in-to"]),
  q("p5-052", "Please _____ all customer files before installing the software update.", ["back up", "set up", "wrap up", "fill out"], 0, "Back up files nghĩa là sao lưu tệp.", C.wordChoice, ["phrase-back-up", "phrase-software-update"]),
  q("p5-053", "The new scanner is compatible _____ our current operating system.", ["for", "to", "with", "from"], 2, "Be compatible with + system/device là collocation đúng.", C.preposition, ["phrase-compatible-with"]),
  q("p5-054", "Online reservations were temporarily unavailable _____ a network outage.", ["because", "due to", "so that", "even though"], 1, "Due to đi với cụm danh từ a network outage.", C.connector, ["phrase-network-outage", "phrase-due-to"]),
  q("p5-055", "A mandatory software update _____ available to all users next Friday.", ["becomes", "became", "will become", "has become"], 2, "Next Friday là mốc tương lai nên dùng will become.", C.tense, ["phrase-software-update", "tense-future-simple"]),
  q("p5-056", "Technical support _____ to most requests within one hour.", ["respond", "responds", "responding", "have responded"], 1, "Technical support được xem là một bộ phận số ít nên dùng responds.", C.agreement, ["phrase-technical-support", "verb-respond"]),
  q("p5-057", "The IT team _____ the reservation system last night.", ["upgrades", "has upgraded", "upgraded", "is upgrading"], 2, "Last night là thời gian quá khứ đã kết thúc nên dùng upgraded.", C.tense, ["verb-upgrade", "tense-past-simple"]),
  q("p5-058", "A technician is _____ the connection problem at the moment.", ["troubleshoot", "troubleshot", "troubleshooting", "troubleshoots"], 2, "Present continuous dùng be + V-ing: is troubleshooting.", C.verbForm, ["verb-troubleshoot", "tense-present-continuous"]),
  q("p5-059", "Your user account will remain locked _____ your identity is verified.", ["until", "because of", "during", "despite"], 0, "Until + clause diễn tả trạng thái kéo dài cho đến khi điều kiện xảy ra.", C.connector, ["phrase-user-account", "verb-verify"]),
  q("p5-060", "Ms. Le has _____ the revised contract to her email.", ["attach", "attaches", "attached", "attaching"], 2, "Present perfect dùng has + V3: has attached.", C.tense, ["verb-attach", "tense-present-perfect"]),

  q("p5-061", "Daniel volunteered to take _____ during the committee meeting.", ["minutes", "times", "hours", "records"], 0, "Take minutes nghĩa là ghi biên bản cuộc họp.", C.wordChoice, ["phrase-take-minutes"]),
  q("p5-062", "The hiring plan is the final _____ item on today's list.", ["agenda", "schedule", "calendar", "minute"], 0, "Agenda item là một mục trong chương trình họp.", C.wordChoice, ["phrase-agenda-item"]),
  q("p5-063", "Both parties hope to reach an agreement _____ the contract expires.", ["before", "despite", "because of", "while of"], 0, "Before + clause đặt hạn đạt thỏa thuận trước khi hợp đồng hết hạn.", C.connector, ["phrase-reach-agreement", "verb-expire"]),
  q("p5-064", "Several employees _____ concerns about the proposed shift schedule yesterday.", ["raise", "raised", "have raised", "raising"], 1, "Yesterday yêu cầu quá khứ đơn: raised concerns.", C.tense, ["phrase-raise-concern", "tense-past-simple"]),
  q("p5-065", "Let's _____ up the meeting by reviewing the action items.", ["take", "set", "wrap", "bring"], 2, "Wrap up a meeting nghĩa là kết thúc cuộc họp.", C.wordChoice, ["phrase-wrap-up"]),
  q("p5-066", "The conference call with the Singapore office _____ at 2:30 this afternoon.", ["begin", "begins", "have begun", "beginning"], 1, "Lịch cố định dùng hiện tại đơn; conference call số ít nên dùng begins.", C.agreement, ["phrase-conference-call", "tense-present-simple"]),
  q("p5-067", "Ms. Nguyen is responsible for _____ the training sessions with each department.", ["coordinate", "coordinated", "coordinates", "coordinating"], 3, "Sau giới từ for dùng V-ing: for coordinating.", C.verbForm, ["verb-coordinate", "phrase-responsible-for"]),
  q("p5-068", "The purchasing manager negotiated _____ the supplier for a longer warranty.", ["to", "with", "at", "by"], 1, "Negotiate with + person/company là cấu trúc đúng.", C.preposition, ["verb-negotiate"]),
  q("p5-069", "The director called a meeting _____ discuss the revised budget.", ["so", "for", "to", "because"], 2, "To + V diễn tả mục đích: called a meeting to discuss.", C.connector, ["phrase-call-meeting", "phrase-annual-budget"]),
  q("p5-070", "Participants must register _____ the product demonstration by Friday.", ["at", "for", "from", "with"], 1, "Register for + event/workshop là collocation đúng.", C.preposition, ["verb-register"]),

  q("p5-071", "The campaign's target _____ consists mainly of young professionals.", ["audition", "audience", "audio", "auditor"], 1, "Target audience là nhóm khách hàng mục tiêu.", C.wordChoice, ["phrase-target-audience"]),
  q("p5-072", "The company conducted market _____ before choosing a location for the new store.", ["research", "researcher", "researching", "researched"], 0, "Market research là cụm danh từ chỉ nghiên cứu thị trường.", C.wordForm, ["phrase-market-research"]),
  q("p5-073", "This promotional offer is valid _____ June 30.", ["through", "among", "beside", "upon"], 0, "Through + date nghĩa là kéo dài đến hết ngày đó.", C.preposition, ["phrase-promotional-offer"]),
  q("p5-074", "The advertising campaign significantly increased brand _____.", ["aware", "awareness", "awarely", "awaken"], 1, "Sau brand cần danh từ awareness: brand awareness.", C.wordForm, ["phrase-brand-awareness"]),
  q("p5-075", "The website was redesigned in response _____ customer feedback.", ["for", "to", "of", "with"], 1, "In response to + noun là cấu trúc cố định.", C.preposition, ["phrase-customer-feedback", "phrase-in-response-to"]),
  q("p5-076", "The agency plans to advertise the vacancy _____ several career websites.", ["on", "to", "from", "between"], 0, "Advertise on + website/platform là cách dùng đúng.", C.preposition, ["verb-advertise"]),
  q("p5-077", "Brochures will be _____ to visitors at the entrance.", ["distribution", "distribute", "distributed", "distributive"], 2, "Bị động tương lai dùng will be + V3: will be distributed.", C.wordForm, ["verb-distribute"]),
  q("p5-078", "Customers can subscribe _____ the newsletter free of charge.", ["to", "for", "with", "at"], 0, "Subscribe to + publication/service là collocation đúng.", C.preposition, ["verb-subscribe", "phrase-free-of-charge"]),
  q("p5-079", "The company _____ its new mobile service at the trade fair next month.", ["launches", "launched", "will launch", "has launched"], 2, "Next month là mốc tương lai nên dùng will launch.", C.tense, ["verb-launch"]),
  q("p5-080", "Website traffic increased _____ 18 percent after the campaign began.", ["to", "by", "at", "from"], 1, "Increase by + amount diễn tả mức tăng thêm.", C.preposition, ["verb-increase"]),

  q("p5-081", "Please include the purchase _____ number on every invoice.", ["order", "ordering", "ordered", "orders"], 0, "Purchase order là đơn đặt hàng; purchase bổ nghĩa cho order.", C.wordForm, ["phrase-purchase-order"]),
  q("p5-082", "The supplier offers a bulk discount _____ orders of 100 units or more.", ["on", "to", "at", "with"], 0, "A discount on + product/order là collocation đúng.", C.preposition, ["phrase-bulk-discount"]),
  q("p5-083", "The unit price _____ as the order quantity increases.", ["decrease", "decreases", "decreasing", "have decreased"], 1, "Unit price là chủ ngữ số ít nên dùng decreases.", C.agreement, ["phrase-unit-price", "verb-decrease"]),
  q("p5-084", "According to our return policy, unopened items may be _____ within thirty days.", ["exchange", "exchanged", "exchanging", "exchangeable"], 1, "Bị động sau may dùng be + V3: may be exchanged.", C.verbForm, ["phrase-return-policy", "verb-exchange"]),
  q("p5-085", "You can place an order online, _____ you may call our sales office.", ["or", "because of", "despite", "unless"], 0, "Or nối hai lựa chọn đặt hàng tương đương.", C.connector, ["phrase-place-order"]),
  q("p5-086", "The black model is out of stock, but the silver one is currently _____.", ["in stock", "on order of", "in transit to", "out order"], 0, "In stock nghĩa là hiện còn hàng.", C.wordChoice, ["phrase-in-stock", "phrase-out-of-stock"]),
  q("p5-087", "Our new vendor supplies us _____ recycled packaging materials.", ["for", "with", "to", "by"], 1, "Supply + person + with + item là pattern chuẩn.", C.preposition, ["verb-supply"]),
  q("p5-088", "Office furniture must be ordered directly _____ an approved supplier.", ["from", "with", "for", "into"], 0, "Order something from a supplier là cấu trúc đúng.", C.preposition, ["verb-order"]),
  q("p5-089", "Tickets may be purchased online _____ the event sells out.", ["before", "although", "because of", "during of"], 0, "Before + clause cho biết phải mua trước khi sự kiện hết vé.", C.connector, ["verb-purchase"]),
  q("p5-090", "Payment cannot be processed _____ the purchase order has been authorized.", ["until", "despite", "because of", "while of"], 0, "Cannot ... until diễn tả việc chỉ có thể xảy ra sau khi điều kiện hoàn tất.", C.connector, ["verb-authorize", "phrase-purchase-order"]),

  q("p5-091", "The elevator will be unavailable while maintenance work _____ carried out.", ["is", "are", "has", "be"], 0, "Maintenance work là danh từ không đếm được số ít; bị động hiện tại dùng is carried out.", C.agreement, ["phrase-maintenance-work", "phrase-carry-out"]),
  q("p5-092", "The warehouse passed its annual safety _____ without any major issues.", ["inspect", "inspected", "inspection", "inspecting"], 2, "Sau safety cần danh từ inspection để tạo safety inspection.", C.wordForm, ["phrase-safety-inspection"]),
  q("p5-093", "Visitors can obtain a parking permit _____ the reception desk.", ["at", "on", "from of", "between"], 0, "At the reception desk chỉ địa điểm nhận giấy phép.", C.preposition, ["phrase-parking-permit"]),
  q("p5-094", "The accounting department _____ to the third floor next weekend.", ["relocates", "relocated", "will relocate", "has relocate"], 2, "Next weekend chỉ tương lai nên dùng will relocate.", C.tense, ["verb-relocate"]),
  q("p5-095", "Twenty guest rooms are being _____ during the low season.", ["renovate", "renovated", "renovating", "renovation"], 1, "Present continuous passive dùng are being + V3: are being renovated.", C.verbForm, ["verb-renovate"]),
  q("p5-096", "Only employees with safety training may _____ this machine.", ["operation", "operator", "operate", "operational"], 2, "Sau may dùng động từ nguyên mẫu operate.", C.wordForm, ["verb-operate"]),
  q("p5-097", "The components are _____ locally before being shipped overseas.", ["assemble", "assembled", "assembly", "assembling"], 1, "Câu bị động dùng are + V3: are assembled.", C.verbForm, ["verb-assemble", "verb-ship"]),
  q("p5-098", "The second-floor copier is temporarily out _____ order.", ["from", "of", "to", "with"], 1, "Out of order là cụm cố định nghĩa là bị hỏng.", C.preposition, ["phrase-out-of-order"]),
  q("p5-099", "The east entrance will remain under construction _____ September.", ["until", "since", "during of", "because"], 0, "Until + time diễn tả trạng thái kéo dài đến tháng Chín.", C.connector, ["phrase-under-construction"]),
  q("p5-100", "A safety officer _____ the warehouse every six months.", ["inspect", "inspects", "is inspect", "have inspected"], 1, "Every six months chỉ lịch định kỳ; officer số ít nên dùng inspects.", C.agreement, ["verb-inspect", "tense-present-simple"]),
];
