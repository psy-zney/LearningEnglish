import type { LessonUnit, VocabWord } from '../domain/study-roadmap.ts';

type Question = {
  options: { id: string; text: string; rationaleVi?: string }[];
  correctOptionId: string;
  explanationVi: string;
  prompt?: string;
  targetWordId?: string;
  transcript?: string;
};

/** Reuse authored rules and examples; never invent a new translation at runtime. */
export function withLessonFeedback(lesson: LessonUnit, words: readonly VocabWord[]): LessonUnit {
  function enrich<T extends Question>(q: T, passage?: string): T {
    const correct = q.options.find(o => o.id === q.correctOptionId)!;
    const word = words.find(w => w.id === q.targetWordId);
    const example = word ? `Ví dụ: ${word.exampleEn} Nghĩa: ${word.exampleVi}`
      : q.prompt?.includes('_____') ? `Câu hoàn chỉnh: ${q.prompt.replace(/_{3,}/g, correct.text)}`
      : q.transcript ? `Ngữ cảnh bài nghe: ${q.transcript}`
      : passage ? `Đọc lại đoạn văn và đối chiếu thông tin với đáp án ${correct.text}.` : '';
    return { ...q,
      explanationVi: `Đáp án đúng: ${correct.text}. ${q.explanationVi}${example ? ` ${example}` : ''}`,
      options: q.options.map(option => {
        const donor = words.find(w => w.id !== word?.id && (w.word === option.text || w.meaningVi === option.text));
        const contrast = donor ? `Phương án này gắn với ${donor.word} (${donor.meaningVi}). ` : '';
        return { ...option, rationaleVi: option.rationaleVi ?? (option.id === q.correctOptionId ? q.explanationVi
          : `Bạn chọn “${option.text}”. ${contrast}Đối chiếu yêu cầu câu hỏi: ${q.explanationVi} Vì vậy, trong câu này cần “${correct.text}”.`) };
      }),
    };
  }
  return { ...lesson, exercises: lesson.exercises.map(q => 'questions' in q
    ? { ...q, questions: q.questions.map(item => enrich(item, q.passage)) }
    : enrich(q)) } as LessonUnit;
}
