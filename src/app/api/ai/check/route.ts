import { NextResponse } from 'next/server';
import ollama from 'ollama';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || '';
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { question, answer } = await request.json();
    
    if (!question || !answer) {
      return NextResponse.json({ error: 'Missing question or answer' }, { status: 400 });
    }

    const prompt = `Bạn là một giáo viên tiếng Anh tận tâm, thân thiện và giỏi truyền đạt.
Nhiệm vụ của bạn là kiểm tra câu dịch tiếng Anh của học viên.

Câu tiếng Việt gốc: "${question}"
Câu dịch của học viên: "${answer}"

Hãy đưa ra nhận xét bằng tiếng Việt một cách dễ hiểu, ngắn gọn và theo đúng cấu trúc sau:

### 1. Đánh giá chung
(Chỉ rõ câu dịch đúng hay sai. Nếu sai, giải thích ngắn gọn bằng ngôn ngữ đơn giản).

### 2. Lỗi cần sửa (nếu có)
(Chỉ ra lỗi ngữ pháp hoặc từ vựng nếu học viên làm sai).

### 3. Câu dịch chuẩn
(Cung cấp 1-2 cách dịch tự nhiên và chuẩn xác nhất).

### 4. Mẹo ghi nhớ
(Đưa ra một mẹo nhỏ, dễ hiểu để học viên nhớ cấu trúc ngữ pháp hoặc từ vựng này).`;

    const response = await ollama.chat({
      model: 'qwen2.5:3b',
      messages: [{ role: 'user', content: prompt }],
    });

    return NextResponse.json({ 
      feedback: response.message.content 
    });
  } catch (error) {
    console.error('Error checking answer:', error);
    return NextResponse.json({ error: 'Failed to check answer' }, { status: 500 });
  }
}
