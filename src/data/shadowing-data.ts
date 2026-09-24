/**
 * Shadowing & Dialogue Data for TOEIC Pronunciation and Conversational Practice.
 *
 * Includes:
 * 1. Sentence Shadowing Bank: Core high-frequency business sentences categorized by intonation & linking patterns.
 * 2. Role-Play Business Dialogues: Two-speaker interactive conversations with turn-by-turn prompts, audio text, and tips.
 */

export type ShadowingSentence = {
  id: string;
  topic: string;
  en: string;
  vi: string;
  phoneticIpa?: string;
  linkingTips?: string; // Mẹo nối âm, nhấn trọng âm
  difficulty: 1 | 2 | 3;
};

export type DialogueLine = {
  speaker: "A" | "B";
  speakerName: string;
  role: string;
  en: string;
  vi: string;
  linkingTips?: string;
};

export type ShadowingDialogue = {
  id: string;
  titleVi: string;
  titleEn: string;
  scenario: string;
  speakerA: { name: string; role: string };
  speakerB: { name: string; role: string };
  lines: DialogueLine[];
};

// ═══════════════════════════════════════════════════════════════════
// 1. CORE SENTENCE SHADOWING BANK
// ═══════════════════════════════════════════════════════════════════

export const shadowingSentences: ShadowingSentence[] = [
  // Meetings & Workplace
  {
    id: "sh-s01",
    topic: "Meetings & Schedule",
    en: "Could you please email me the updated itinerary by Friday?",
    vi: "Bạn có thể gửi email lịch trình đã cập nhật cho tôi trước thứ Sáu được không?",
    phoneticIpa: "/kʊd juː pliːz ˈiː.meɪl miː ðiː ʌpˈdeɪ.tɪd aɪˈtɪn.ə.rer.i baɪ ˈfraɪ.deɪ/",
    linkingTips: "Nối âm: 'Could you' đọc thành /kʊdʒuː/, 'email me' nhấn trọng âm vào 'email'.",
    difficulty: 1,
  },
  {
    id: "sh-s02",
    topic: "Meetings & Schedule",
    en: "The quarterly budget meeting has been rescheduled for next Tuesday.",
    vi: "Cuộc họp ngân sách hàng quý đã được dời lịch sang thứ Ba tuần sau.",
    phoneticIpa: "/ðə ˈkwɔːr.tɚ.li ˈbʌdʒ.ɪt ˈmiː.tɪŋ hæz biːn ˌriːˈskedʒ.uːld fɔːr nekst ˈtuːz.deɪ/",
    linkingTips: "Nhấn mạnh các từ khóa: 'quarterly', 'budget', 'rescheduled', 'Tuesday'.",
    difficulty: 2,
  },
  {
    id: "sh-s03",
    topic: "Customer Service",
    en: "I apologize for the delay, and we will expedite your shipment immediately.",
    vi: "Tôi xin lỗi vì sự chậm trễ, và chúng tôi sẽ xúc tiến chuyển đơn hàng của bạn ngay lập tức.",
    phoneticIpa: "/aɪ əˈpɑː.lə.dʒaɪz fɔːr ðə dɪˈleɪ, ænd wiː wɪl ˈek.spə.daɪt jʊr ˈʃɪp.mənt ɪˈmiː.di.ət.li/",
    linkingTips: "Nối âm: 'expedite your' /ˌekspədaɪtjʊr/, ngữ điệu hạ giọng cuối câu khẳng định.",
    difficulty: 2,
  },
  {
    id: "sh-s04",
    topic: "Customer Service",
    en: "All defective merchandise will be refunded or replaced free of charge.",
    vi: "Mọi hàng hóa bị lỗi sẽ được hoàn tiền hoặc đổi mới hoàn toàn miễn phí.",
    phoneticIpa: "/ɔːl dɪˈfek.tɪv ˈmɜːr.tʃən.daɪs wɪl biː ˈriː.fʌnd.ɪd ɔːr rɪˈpleɪst friː əv tʃɑːrdʒ/",
    linkingTips: "Nối âm: 'free of charge' /friː.əv.tʃɑːrdʒ/, nuốt nhẹ âm /v/ trong 'of'.",
    difficulty: 2,
  },
  {
    id: "sh-s05",
    topic: "Office Technology",
    en: "Make sure you create a complete backup before upgrading the operating system.",
    vi: "Hãy chắc chắn bạn đã tạo một bản sao lưu đầy đủ trước khi nâng cấp hệ điều hành.",
    phoneticIpa: "/meɪk ʃʊr juː kriˈeɪt ə kəmˈpliːt ˈbæk.ʌp bɪˈfɔːr ʌpˈɡreɪ.dɪŋ ðiː ˈɑː.pə.reɪ.tɪŋ ˈsɪs.təm/",
    linkingTips: "Nối âm: 'Make sure' /meɪkʃʊr/, 'backup before' /bækʌpbɪfɔːr/.",
    difficulty: 2,
  },
  {
    id: "sh-s06",
    topic: "Travel & Hospitality",
    en: "Passengers for flight forty-two should proceed immediately to Gate Twelve.",
    vi: "Hành khách của chuyến bay 42 xin vui lòng di chuyển ngay đến Cửa số 12.",
    phoneticIpa: "/ˈpæs.ən.dʒɚz fɔːr flaɪt ˈfɔːr.t̬i tuː ʃʊd prəˈsiːd ɪˈmiː.di.ət.li tuː ɡeɪt twelv/",
    linkingTips: "Ngữ điệu thông báo sân bay: nhấn rõ ràng 'forty-two' và 'Gate Twelve'.",
    difficulty: 2,
  },
  {
    id: "sh-s07",
    topic: "Contracts & Legal",
    en: "Both parties agreed to abide by the confidentiality provisions in the contract.",
    vi: "Cả hai bên đã đồng ý tuân thủ các điều khoản bảo mật trong hợp đồng.",
    phoneticIpa: "/boʊθ ˈpɑːr.t̬iz əˈɡriːd tuː əˈbaɪd baɪ ðə ˌkɑːn.fəˌden.ʃiˈæl.ə.t̬i prəˈvɪʒ.ənz ɪn ðə ˈkɑːn.trækt/",
    linkingTips: "Cụm 'abide by' phát âm liền một nhịp: /əˈbaɪd baɪ/.",
    difficulty: 3,
  },
  {
    id: "sh-s08",
    topic: "Finance & Banking",
    en: "Our company reported a fifteen percent increase in net quarterly profits.",
    vi: "Công ty chúng tôi đã báo cáo mức tăng 15% lợi nhuận ròng hàng quý.",
    phoneticIpa: "/ˈaʊ.ɚ ˈkʌm.pə.ni rɪˈpɔːr.t̬ɪd ə ˌfɪfˈtiːn pɚˈsent ˈɪn.kriːs ɪn net ˈkwɔːr.tɚ.li ˈprɑː.fɪts/",
    linkingTips: "Nối âm: 'increase in' /ɪnˈkriːsɪn/, 'reported a' /rɪˈpɔːrtɪdə/.",
    difficulty: 2,
  },
  {
    id: "sh-s09",
    topic: "Job Interview & HR",
    en: "I am confident that my background in supply chain management makes me an ideal fit.",
    vi: "Tôi tự tin rằng nền tảng kinh nghiệm trong quản lý chuỗi cung ứng giúp tôi hoàn toàn phù hợp.",
    phoneticIpa: "/aɪ æm ˈkɑːn.fə.dənt ðæt maɪ ˈbæk.ɡraʊnd ɪn səˈplaɪ tʃeɪn ˈmæn.ədʒ.mənt meɪks miː ən aɪˈdiː.əl fɪt/",
    linkingTips: "Nhấn mạnh tính từ 'confident' và 'ideal fit'. Nối âm: 'makes me an' /meɪks miː ən/.",
    difficulty: 3,
  },
  {
    id: "sh-s10",
    topic: "Dining & Events",
    en: "Would you like me to reserve a private dining room for the client reception?",
    vi: "Bạn có muốn tôi đặt một phòng ăn riêng cho buổi đón tiếp khách hàng không?",
    phoneticIpa: "/wʊd juː laɪk miː tuː rɪˈzɝːv ə ˈpraɪ.vət ˈdaɪ.nɪŋ ruːm fɔːr ðə ˈklaɪ.ənt rɪˈsep.ʃən/",
    linkingTips: "Câu hỏi Yes/No: lên giọng nhẹ ở cuối câu ('reception?').",
    difficulty: 1,
  },
];

// ═══════════════════════════════════════════════════════════════════
// 2. INTERACTIVE ROLE-PLAY BUSINESS DIALOGUES
// ═══════════════════════════════════════════════════════════════════

export const shadowingDialogues: ShadowingDialogue[] = [
  // ─── Dialogue 1: Rescheduling an Important Meeting ───────────────
  {
    id: "dial-01",
    titleVi: "Hội thoại 1: Dời lịch họp gấp",
    titleEn: "Rescheduling an Urgent Meeting",
    scenario: "Sarah gọi cho David để dời lịch họp phân tích ngân sách do chuyến bay bị hoãn.",
    speakerA: { name: "Sarah", role: "Marketing Director" },
    speakerB: { name: "David", role: "Financial Controller" },
    lines: [
      {
        speaker: "A",
        speakerName: "Sarah",
        role: "Marketing Director",
        en: "Hi David, I'm calling about our project review meeting scheduled for two PM today.",
        vi: "Chào David, tôi gọi về cuộc họp đánh giá dự án dự kiến lúc 2 giờ chiều nay.",
        linkingTips: "Nối âm: 'calling about' /kɑːlɪŋ əbaʊt/, 'scheduled for' /skedʒuːld fɔːr/.",
      },
      {
        speaker: "B",
        speakerName: "David",
        role: "Financial Controller",
        en: "Hi Sarah. Yes, is everything on track for the presentation?",
        vi: "Chào Sarah. Vâng, mọi thứ cho bài thuyết trình vẫn đúng tiến độ chứ?",
        linkingTips: "Lên giọng cuối câu hỏi Yes/No: '...on track for the presentation?'",
      },
      {
        speaker: "A",
        speakerName: "Sarah",
        role: "Marketing Director",
        en: "Unfortunately, my morning flight from Chicago was delayed by two hours. Would it be possible to push our meeting back to tomorrow morning?",
        vi: "Thật không may, chuyến bay sáng nay của tôi từ Chicago bị hoãn 2 tiếng. Liệu chúng ta có thể lùi cuộc họp sang sáng mai được không?",
        linkingTips: "Nối âm: 'push our' /pʊʃ aʊ.ɚ/, 'back to' /bæk tuː/.",
      },
      {
        speaker: "B",
        speakerName: "David",
        role: "Financial Controller",
        en: "That shouldn't be a problem at all. How does ten o'clock tomorrow sound to you?",
        vi: "Hoàn toàn không có vấn đề gì. Mười giờ sáng mai bạn thấy thế nào?",
        linkingTips: "Nối âm: 'shouldn't be a' /ʃʊdnt biː ə/, 'sound to you' /saʊnd tuː juː/.",
      },
      {
        speaker: "A",
        speakerName: "Sarah",
        role: "Marketing Director",
        en: "Ten AM works perfectly. I will send out an updated calendar invitation right now.",
        vi: "Mười giờ sáng rất tuyệt. Tôi sẽ gửi thư mời lịch đã cập nhật ngay bây giờ.",
        linkingTips: "Nối âm: 'send out an' /send aʊt ən/, 'right now' /raɪt naʊ/.",
      },
      {
        speaker: "B",
        speakerName: "David",
        role: "Financial Controller",
        en: "Great. Have a safe flight, and I'll see you in the main conference room tomorrow.",
        vi: "Tuyệt vời. Chúc bạn có chuyến bay an toàn, hẹn gặp bạn ở phòng hội nghị chính sáng mai.",
        linkingTips: "Hạ giọng thân thiện ở câu chào: 'see you in the main conference room tomorrow.'",
      },
    ],
  },

  // ─── Dialogue 2: Customer Service & Warranty Replacement ─────────
  {
    id: "dial-02",
    titleVi: "Hội thoại 2: Xử lý bảo hành & Khiếu nại sản phẩm",
    titleEn: "Customer Service & Warranty Claim",
    scenario: "Khách hàng liên hệ bộ phận hỗ trợ kỹ thuật để yêu cầu đổi mới màn hình vi tính bị lỗi.",
    speakerA: { name: "Agent Kim", role: "Customer Support Rep" },
    speakerB: { name: "Alex", role: "Corporate Buyer" },
    lines: [
      {
        speaker: "A",
        speakerName: "Agent Kim",
        role: "Customer Support Rep",
        en: "Thank you for contacting NovaTech Solutions. How may I assist you today?",
        vi: "Cảm ơn quý khách đã liên hệ NovaTech Solutions. Tôi có thể hỗ trợ gì cho bạn hôm nay?",
        linkingTips: "Nói lưu loát cụm: 'How may I assist you today?' với ngữ điệu niềm nở.",
      },
      {
        speaker: "B",
        speakerName: "Alex",
        role: "Corporate Buyer",
        en: "Hello, I purchased five ultra-wide monitors last month, but one of them has a malfunctioning display.",
        vi: "Xin chào, tôi đã mua năm màn hình siêu rộng vào tháng trước, nhưng một trong số đó bị lỗi hiển thị.",
        linkingTips: "Nối âm: 'one of them' /wʌn əv ðem/, 'has a' /hæz ə/.",
      },
      {
        speaker: "A",
        speakerName: "Agent Kim",
        role: "Customer Support Rep",
        en: "I sincerely apologize for the inconvenience. Do you happen to have the order invoice number handy?",
        vi: "Tôi thành thật xin lỗi vì sự bất tiện này. Bạn có sẵn mã số hóa đơn đơn hàng ở đó không?",
        linkingTips: "Lên giọng cuối câu: '...order invoice number handy?'",
      },
      {
        speaker: "B",
        speakerName: "Alex",
        role: "Corporate Buyer",
        en: "Yes, the invoice reference number is NT-nine-eight-two-four-one.",
        vi: "Có, mã số tham chiếu hóa đơn là NT-98241.",
        linkingTips: "Đọc từng con số rõ ràng và dứt khoát: 'NT-9-8-2-4-1'.",
      },
      {
        speaker: "A",
        speakerName: "Agent Kim",
        role: "Customer Support Rep",
        en: "Thank you. Your item is fully covered under our two-year comprehensive warranty. We will dispatch a brand-new replacement via express courier today.",
        vi: "Cảm ơn bạn. Sản phẩm của bạn được bảo hành toàn diện hai năm. Chúng tôi sẽ điều động một sản phẩm thay thế mới tinh qua chuyển phát nhanh hôm nay.",
        linkingTips: "Nối âm: 'covered under' /kʌv.ɚd ʌn.dɚ/, 'brand-new' /brænd njuː/.",
      },
      {
        speaker: "B",
        speakerName: "Alex",
        role: "Corporate Buyer",
        en: "That's exceptional service! What should I do with the defective unit?",
        vi: "Dịch vụ thật xuất sắc! Tôi nên làm gì với chiếc màn hình bị lỗi?",
        linkingTips: "Ngữ điệu hào hứng: 'That's exceptional service!'",
      },
      {
        speaker: "A",
        speakerName: "Agent Kim",
        role: "Customer Support Rep",
        en: "A prepaid return shipping label will be included in the box. Just hand it to the courier driver at your convenience.",
        vi: "Một nhãn dán gửi hàng trả lại trả trước sẽ có sẵn trong hộp. Bạn chỉ cần giao nó cho tài xế giao hàng khi thuận tiện.",
        linkingTips: "Nối âm: 'hand it to' /hænd ɪt tuː/, 'at your convenience' /ət jʊr kənˈviː.ni.əns/.",
      },
    ],
  },

  // ─── Dialogue 3: Job Interview & Salary Discussion ───────────────
  {
    id: "dial-03",
    titleVi: "Hội thoại 3: Phỏng vấn xin việc & Trao đổi đãi ngộ",
    titleEn: "Job Interview & Compensation Discussion",
    scenario: "Giám đốc nhân sự trao đổi về phúc lợi và cơ hội thăng tiến với ứng viên tiềm năng.",
    speakerA: { name: "Ms. Foster", role: "VP of Human Resources" },
    speakerB: { name: "Tom", role: "Senior Software Candidate" },
    lines: [
      {
        speaker: "A",
        speakerName: "Ms. Foster",
        role: "VP of Human Resources",
        en: "Tom, the engineering evaluation panel was thoroughly impressed with your technical portfolio.",
        vi: "Tom, hội đồng đánh giá kỹ thuật đã cực kỳ ấn tượng với hồ sơ năng lực chuyên môn của bạn.",
        linkingTips: "Nối âm: 'thoroughly impressed with' /θʌr.ə.li ɪmˈprest wɪð/.",
      },
      {
        speaker: "B",
        speakerName: "Tom",
        role: "Senior Software Candidate",
        en: "Thank you, Ms. Foster. I've always admired your company's dedication to cloud innovation.",
        vi: "Cảm ơn bà Foster. Tôi luôn ngưỡng mộ sự cống hiến của công ty cho sự đổi mới công nghệ đám mây.",
        linkingTips: "Nối âm: 'admired your' /ədˈmaɪrd jʊr/, 'dedication to' /ˌded.əˈkeɪ.ʃən tuː/.",
      },
      {
        speaker: "A",
        speakerName: "Ms. Foster",
        role: "VP of Human Resources",
        en: "We would like to extend an official job offer for the Lead Systems Architect position. Along with a competitive base salary, we offer annual performance bonuses and stock options.",
        vi: "Chúng tôi muốn gửi lời mời làm việc chính thức cho vị trí Kiến trúc sư Hệ thống Trưởng. Cùng mức lương cơ bản cạnh tranh, chúng tôi có thưởng hiệu suất hàng năm và quyền chọn cổ phiếu.",
        linkingTips: "Nhấn mạnh các từ khóa: 'competitive base salary', 'performance bonuses', 'stock options'.",
      },
      {
        speaker: "B",
        speakerName: "Tom",
        role: "Senior Software Candidate",
        en: "That sounds very promising. Could you elaborate slightly on the health coverage and remote work flexibility?",
        vi: "Nghe rất hứa hẹn. Bà có thể nói rõ hơn một chút về gói bảo hiểm sức khỏe và sự linh hoạt làm việc từ xa được không?",
        linkingTips: "Nối âm: 'elaborate slightly on' /iˈlæb.ə.reɪt slaɪt.li ɑːn/.",
      },
      {
        speaker: "A",
        speakerName: "Ms. Foster",
        role: "VP of Human Resources",
        en: "Certainly! We provide comprehensive dental, vision, and medical coverage from day one, plus the option to work remotely up to three days per week.",
        vi: "Chắc chắn rồi! Chúng tôi cung cấp bảo hiểm nha khoa, thị lực và y tế toàn diện từ ngày đầu tiên, cùng tùy chọn làm việc từ xa tối đa 3 ngày mỗi tuần.",
        linkingTips: "Liệt kê nhịp nhàng: 'dental, vision, and medical coverage'.",
      },
      {
        speaker: "B",
        speakerName: "Tom",
        role: "Senior Software Candidate",
        en: "That aligns perfectly with my professional goals. I look forward to reviewing the formal written agreement.",
        vi: "Điều đó hoàn toàn phù hợp với mục tiêu nghề nghiệp của tôi. Tôi rất mong đợi được xem xét bản thỏa thuận bằng văn bản chính thức.",
        linkingTips: "Cụm quen thuộc: 'look forward to' /lʊk ˈfɔːr.wɚd tuː/.",
      },
    ],
  },
];
