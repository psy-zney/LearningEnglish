import { NextResponse } from "next/server";
import { ollama, ollamaModel } from "@/lib/ollama";

export type GeneratedDialogueResponse = {
  id: string;
  titleVi: string;
  titleEn: string;
  scenario: string;
  speakerA: { name: string; role: string };
  speakerB: { name: string; role: string };
  lines: Array<{
    speaker: "A" | "B";
    speakerName: string;
    role: string;
    en: string;
    vi: string;
    linkingTips?: string;
  }>;
};

// Fallback high-quality dialogues if Ollama is not running locally
const fallbackTemplates: Record<string, GeneratedDialogueResponse> = {
  travel: {
    id: `custom-${Date.now()}`,
    titleVi: "Thủ tục nhận phòng khách sạn & Yêu cầu phòng tầng cao",
    titleEn: "Hotel Check-in & High-Floor Request",
    scenario: "Khách hàng làm thủ tục check-in tại lễ tân và yêu cầu phòng yên tĩnh có view đẹp.",
    speakerA: { name: "Front Desk Agent", role: "Hotel Receptionist" },
    speakerB: { name: "Guest", role: "Business Traveler" },
    lines: [
      {
        speaker: "A",
        speakerName: "Front Desk Agent",
        role: "Hotel Receptionist",
        en: "Good afternoon! Welcome to Grand Palace Hotel. Do you have a reservation with us?",
        vi: "Chào buổi chiều! Chào mừng quý khách đến với khách sạn Grand Palace. Quý khách đã đặt phòng trước chưa ạ?",
        linkingTips: "Nối âm: 'Good afternoon' /ɡʊd ˌæf.tɚˈnuːn/, lên giọng ở câu hỏi Yes/No.",
      },
      {
        speaker: "B",
        speakerName: "Guest",
        role: "Business Traveler",
        en: "Yes, I have a booking under the name of Nguyen for three nights.",
        vi: "Vâng, tôi có đặt phòng dưới tên Nguyen trong ba đêm.",
        linkingTips: "Nối âm: 'under the name of' /ˈʌn.dɚ ðə neɪm əv/.",
      },
      {
        speaker: "A",
        speakerName: "Front Desk Agent",
        role: "Hotel Receptionist",
        en: "I found your reservation for an executive king suite. Would you prefer a quiet room on a higher floor?",
        vi: "Tôi đã tìm thấy thông tin đặt phòng suite king của quý khách. Quý khách có muốn một phòng yên tĩnh ở tầng cao không?",
        linkingTips: "Nhấn mạnh từ: 'executive king suite', 'quiet room'.",
      },
      {
        speaker: "B",
        speakerName: "Guest",
        role: "Business Traveler",
        en: "That would be wonderful! Could you also let me know what time breakfast is served?",
        vi: "Thế thì tuyệt vời quá! Bạn có thể cho tôi biết bữa sáng phục vụ vào lúc mấy giờ được không?",
        linkingTips: "Ngữ điệu vui vẻ, nối âm: 'what time breakfast is served'.",
      },
      {
        speaker: "A",
        speakerName: "Front Desk Agent",
        role: "Hotel Receptionist",
        en: "Complimentary breakfast is available on the second floor from six thirty to ten AM. Here are your key cards.",
        vi: "Bữa sáng miễn phí được phục vụ tại tầng hai từ 6:30 đến 10:00 sáng. Đây là thẻ khóa phòng của quý khách.",
        linkingTips: "Hạ giọng thân thiện: 'Here are your key cards.'",
      },
    ],
  },
  meeting: {
    id: `custom-${Date.now()}`,
    titleVi: "Trao đổi cập nhật tiến độ dự án phần mềm",
    titleEn: "Software Project Progress Update",
    scenario: "Quản lý dự án trao đổi với lập trình viên về các tính năng mới và hạn bàn giao.",
    speakerA: { name: "Mark", role: "Project Manager" },
    speakerB: { name: "Elena", role: "Lead Developer" },
    lines: [
      {
        speaker: "A",
        speakerName: "Mark",
        role: "Project Manager",
        en: "Elena, could you give us a quick status update on the authentication module?",
        vi: "Elena, bạn có thể cập nhật nhanh tình hình của phân hệ xác thực được không?",
        linkingTips: "Nối âm: 'status update on' /ˈsteɪ.t̬əs ˈʌp.deɪt ɑːn/.",
      },
      {
        speaker: "B",
        speakerName: "Elena",
        role: "Lead Developer",
        en: "Certainly! The core API integration is complete, and we are currently conducting end-to-end security tests.",
        vi: "Chắc chắn rồi! Việc tích hợp API cốt lõi đã hoàn tất, và chúng tôi hiện đang tiến hành kiểm thử bảo mật toàn diện.",
        linkingTips: "Nối âm: 'end-to-end' /ˌend.tuːˈend/, nhấn 'security tests'.",
      },
      {
        speaker: "A",
        speakerName: "Mark",
        role: "Project Manager",
        en: "That sounds excellent. Do you anticipate any roadblocks before the Friday deployment?",
        vi: "Nghe rất tuyệt. Bạn có dự lường trở ngại nào trước đợt triển khai vào thứ Sáu không?",
        linkingTips: "Lên giọng cuối câu hỏi: '...Friday deployment?'",
      },
      {
        speaker: "B",
        speakerName: "Elena",
        role: "Lead Developer",
        en: "None at all. Everything is progressing smoothly according to the sprint roadmap.",
        vi: "Hoàn toàn không có. Mọi thứ đang tiến triển thuận lợi theo đúng lộ trình sprint.",
        linkingTips: "Dứt khoát: 'None at all' /nʌn ət ɔːl/.",
      },
    ],
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const topic = (typeof body.topic === "string" ? body.topic.trim() : "") || "Workplace Dialogue";

    // Attempt to query local Ollama if available
    try {
      const prompt = `
You are an expert English communication and TOEIC teacher.
Generate a realistic, professional, two-person English dialogue based on this topic/scenario: "${topic}".

STRICT FORMAT REQUIREMENTS:
Return ONLY a valid JSON object (no markdown code blocks, no backticks, no extra text) matching this TypeScript schema:
{
  "titleVi": "Tiêu đề tiếng Việt ngắn gọn",
  "titleEn": "English Title",
  "scenario": "Mô tả ngắn gọn bối cảnh (1 câu)",
  "speakerA": { "name": "Name A", "role": "Job role A" },
  "speakerB": { "name": "Name B", "role": "Job role B" },
  "lines": [
    {
      "speaker": "A",
      "speakerName": "Name A",
      "role": "Job role A",
      "en": "English spoken sentence (natural, TOEIC workplace standard).",
      "vi": "Dịch nghĩa tiếng Việt tự nhiên và chuẩn xác.",
      "linkingTips": "Mẹo nối âm, nhấn âm cho người Việt."
    },
    {
      "speaker": "B",
      "speakerName": "Name B",
      "role": "Job role B",
      "en": "English spoken reply.",
      "vi": "Dịch nghĩa tiếng Việt.",
      "linkingTips": "Mẹo nối âm và ngữ điệu."
    }
  ]
}

Provide 4 to 6 alternating lines (A, B, A, B...) between the speakers.
`;

      const response = await Promise.race([
        ollama.chat({
          model: ollamaModel,
          messages: [{ role: "user", content: prompt }],
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Ollama timeout after 10s")), 10000),
        ),
      ]);

      const rawContent = response.message.content.trim();
      const cleanedJson = rawContent
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/i, "")
        .trim();

      const parsed = JSON.parse(cleanedJson);
      if (parsed && Array.isArray(parsed.lines) && parsed.lines.length >= 2) {
        return NextResponse.json({
          dialogue: {
            ...parsed,
            id: `custom-ai-${Date.now()}`,
          },
          source: "ollama",
        });
      }
    } catch {
      // Ollama not reachable or timed out - seamlessly fall back
    }

    // Dynamic fallback generation
    const lower = topic.toLowerCase();
    const template =
      lower.includes("hotel") || lower.includes("khách sạn") || lower.includes("du lịch") || lower.includes("travel")
        ? fallbackTemplates.travel
        : fallbackTemplates.meeting;

    const dynamicDialogue: GeneratedDialogueResponse = {
      ...template,
      id: `custom-${Date.now()}`,
      titleVi: `Hội thoại: ${topic}`,
      titleEn: `Dialogue: ${topic}`,
      scenario: `Tình huống giao tiếp thực tế về chủ đề: ${topic}`,
    };

    return NextResponse.json({
      dialogue: dynamicDialogue,
      source: "template",
    });
  } catch (error) {
    console.error("Error generating dialogue:", error);
    return NextResponse.json(
      { error: "Could not generate dialogue" },
      { status: 500 },
    );
  }
}
