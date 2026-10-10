import type { ReadingExercise } from '../domain/study-roadmap.ts';
const ids = ['A','B','C','D'] as const;
function question(id: string, prompt: string, correct: string, wrong: string[], reason: string) {
  const texts=[correct,...wrong]; const shift=Number(id.match(/\d+$/)?.[0] ?? 0)%4;
  const options=[...texts.slice(shift),...texts.slice(0,shift)].map((text,i)=>({id:ids[i],text}));
  return {id,question:prompt,options,correctOptionId:options.find(o=>o.text===correct)!.id,
    explanationVi:`Đáp án: ${correct}. ${reason} Các phương án ${wrong.join(', ')} không khớp chi tiết hoặc cấu trúc vừa nêu.`};
}
export const readingAuditExpansion: ReadingExercise[] = [
  {
    id:'audit-p6-library',type:'reading_text_completion',part:6,difficulty:1,
    passage:'LIBRARY NOTICE\nOur library _____(1) open on Saturdays. Visitors can _____(2) books here. Please bring _____(3) library card. Children must _____(4) with an adult. The reading room is _____(5) than the lobby.',
    questions:[
      question('audit-p6-1','Điền chỗ trống (1).','is',['are','am','be'],'Library là danh từ số ít nên dùng is. Ví dụ: Our library is open. = Thư viện của chúng tôi đang mở cửa.'),
      question('audit-p6-2','Điền chỗ trống (2).','borrow',['borrows','borrowing','to borrow'],'Sau can dùng nguyên mẫu borrow, không thêm s, ing hay to. Ví dụ: Visitors can borrow books. = Khách có thể mượn sách.'),
      question('audit-p6-3','Điền chỗ trống (3).','your',['you','yours','yourself'],'Trước library card cần tính từ sở hữu your; you là chủ ngữ/tân ngữ, yours đứng độc lập, yourself là phản thân. Ví dụ: Bring your library card. = Hãy mang thẻ thư viện của bạn.'),
      question('audit-p6-4','Điền chỗ trống (4).','come',['comes','coming','came'],'Sau must dùng nguyên mẫu come. Ví dụ: Children must come with an adult. = Trẻ em phải đi cùng người lớn.'),
      question('audit-p6-5','Điền chỗ trống (5).','quieter',['quiet','quietest','more quieter'],'Than báo hiệu so sánh hơn: quieter. Không dùng more đồng thời với -er. Ví dụ: The reading room is quieter than the lobby. = Phòng đọc yên tĩnh hơn sảnh.'),
    ],
  },
  {
    id:'audit-p6-class',type:'reading_text_completion',part:6,difficulty:1,
    passage:'ENGLISH CLASS\nOur classes _____(1) at nine every morning. Yesterday, we _____(2) about food. Today, students are _____(3) a short story. Please write with _____(4) pen. You can ask the teacher _____(5) help.',
    questions:[
      question('audit-p6-6','Điền chỗ trống (1).','start',['starts','starting','is start'],'Classes là số nhiều, every morning chỉ thói quen: dùng start. Ví dụ: Our classes start at nine. = Các lớp của chúng tôi bắt đầu lúc chín giờ.'),
      question('audit-p6-7','Điền chỗ trống (2).','learned',['learns','learning','has learn'],'Yesterday cần quá khứ đơn learned. Learns là hiện tại số ít, learning thiếu trợ động từ, has learn sai dạng. Ví dụ: We learned about food. = Chúng tôi đã học về thức ăn.'),
      question('audit-p6-8','Điền chỗ trống (3).','reading',['read','reads','to read'],'Are + V-ing tạo hiện tại tiếp diễn: are reading. Ví dụ: Students are reading a story. = Học sinh đang đọc một câu chuyện.'),
      question('audit-p6-9','Điền chỗ trống (4).','a',['an','many','these'],'Pen là danh từ đếm được số ít bắt đầu bằng âm phụ âm /p/: a pen. Many và these cần danh từ số nhiều. Ví dụ: Write with a pen. = Hãy viết bằng bút mực.'),
      question('audit-p6-10','Điền chỗ trống (5).','for',['at','of','from'],'Cấu trúc ask someone for something: xin ai điều gì. Ví dụ: Ask the teacher for help. = Hãy nhờ giáo viên giúp đỡ.'),
    ],
  },
  ...[
    {id:'library', place:'Oak Library', day:'Saturday', time:'10 a.m.', room:'Room 2', price:'Free', person:'Ms Lee', vi:'Thư viện Oak'},
    {id:'club', place:'Green English Club', day:'Sunday', time:'2 p.m.', room:'Room 4', price:'$5', person:'Mr Kim', vi:'Câu lạc bộ tiếng Anh Green'},
  ].map((x):ReadingExercise=>({
    id:`audit-p7-${x.id}`,type:'reading_comprehension',part:7,difficulty:1,
    passage:`READING WORKSHOP\nPlace: ${x.place}\nDay: ${x.day}\nStart: ${x.time}\nRoom: ${x.room}\nPrice: ${x.price}\nContact: ${x.person}\nBring a notebook. The workshop is for beginners.`,
    questions:[
      question(`audit-p7-${x.id}-1`,'Where is the workshop?',x.place,['Central Station','City Hospital','West Hotel'],`Dòng Place ghi ${x.place} (${x.vi}). Where hỏi địa điểm. Ví dụ: The workshop is at ${x.place}. = Buổi học ở ${x.vi}.`),
      question(`audit-p7-${x.id}-2`,'On which day is the workshop?',x.day,['Monday','Tuesday','Wednesday'],`Dòng Day ghi ${x.day} (${x.day==='Saturday'?'thứ Bảy':'Chủ nhật'}). Ví dụ: The workshop is on ${x.day}. = Buổi học vào ${x.day==='Saturday'?'thứ Bảy':'Chủ nhật'}.`),
      question(`audit-p7-${x.id}-3`,'Which room should participants go to?',x.room,['Room 1','Room 3','Room 5'],`Dòng Room ghi ${x.room}; các phòng khác không được nêu. Ví dụ: Go to ${x.room}. = Hãy đến phòng ${x.room.split(' ')[1]}.`),
      question(`audit-p7-${x.id}-4`,'What should participants bring?','A notebook',['A passport','A camera','A meal'],'Đoạn văn yêu cầu Bring a notebook, nghĩa là mang một quyển sổ. Không có yêu cầu hộ chiếu, máy ảnh hay đồ ăn. Ví dụ: Bring a notebook. = Hãy mang một quyển sổ.'),
      question(`audit-p7-${x.id}-5`,'Who is the workshop for?','Beginners',['Professional writers','Tour guides','Doctors'],'Câu cuối ghi for beginners, dành cho người mới bắt đầu. Các nghề còn lại không được nêu. Ví dụ: This class is for beginners. = Lớp này dành cho người mới bắt đầu.'),
    ],
  })),
];
