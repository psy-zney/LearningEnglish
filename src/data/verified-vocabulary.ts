// Editorial paraphrases, not copied dictionary examples. Checked 2026-10-05.
export const verifiedVocabulary: Record<string, { headword: string; meaning: string; explanation: string; source: string }> = {};
function entry(key: string, headword: string, meaning: string, explanation: string, slug = headword) {
  verifiedVocabulary[key] = { headword, meaning, explanation, source: `https://dictionary.cambridge.org/dictionary/english/${slug}` };
}
entry("dark", "dark", "tối, sẫm màu (tính từ); bóng tối (danh từ)", "Dark là tính từ chỉ thiếu ánh sáng hoặc màu sẫm; the dark là bóng tối. Không có nghĩa đông đặc trong mục từ Cambridge đã đối chiếu; đông đặc là solidify. Ví dụ: This room is dark. = Phòng này tối.");
entry("foot", "foot", "bàn chân", "Foot là danh từ chỉ bàn chân, số nhiều là feet. Lòng bàn chân là sole, không phải nghĩa cơ bản của foot. Ví dụ: My left foot hurts. = Bàn chân trái của tôi bị đau.");
entry("cup", "cup", "cốc, tách", "Cup là danh từ đếm được chỉ đồ đựng để uống, thường có quai. Nghĩa cơ bản không phải bình đựng rượu. Ví dụ: My cup is empty. = Cốc của tôi trống không.");
entry("ambulance", "ambulance", "xe cứu thương", "Ambulance là danh từ đếm được, chỉ xe đưa người bệnh hoặc bị thương đến bệnh viện. Ví dụ: An ambulance is outside. = Một xe cứu thương đang ở bên ngoài.");
entry("emergency", "emergency", "tình huống khẩn cấp", "Emergency là danh từ, chỉ tình huống nghiêm trọng cần xử lý ngay; không có nghĩa cất cánh. Ví dụ: This is an emergency. = Đây là tình huống khẩn cấp.");
entry("infomation", "information", "thông tin", "Sửa chính tả infomation thành information. Đây là danh từ không đếm được: some information, a piece of information; không dùng an information. Ví dụ: I need more information. = Tôi cần thêm thông tin.");
entry("honney", "honey", "mật ong", "Sửa chính tả honney thành honey. Nghĩa cơ bản là danh từ không đếm được chỉ mật ong. Ví dụ: I like honey in my tea. = Tôi thích cho mật ong vào trà.");
entry("highschool", "high school", "trường trung học (thường là THPT ở Mỹ)", "High school viết thành hai từ, là cụm danh từ. Ở Mỹ thường chỉ lớp 9–12; phạm vi tuổi khác nhau theo quốc gia. Ví dụ: My sister is in high school. = Chị tôi đang học trung học.", "high-school");
entry("football", "football", "bóng đá (Anh-Anh); bóng bầu dục Mỹ (Anh-Mỹ)", "Football là danh từ chỉ môn thể thao hoặc quả bóng. Muốn nói đá bóng dùng play football (Anh-Anh). Ví dụ: We play football after school. = Chúng tôi chơi bóng đá sau giờ học.");
entry("miss", "miss", "nhớ, nhớ nhung; bỏ lỡ", "Miss someone là nhớ ai vì họ vắng mặt; miss a bus là lỡ xe. Không đồng nhất miss với quên đi. Ví dụ: I miss my family. = Tôi nhớ gia đình.");
entry("smell", "smell", "ngửi, có mùi (động từ); mùi (danh từ)", "Smell không nhất thiết là hương thơm, có thể là mùi dễ chịu hoặc khó chịu. Ví dụ: I can smell smoke. = Tôi ngửi thấy mùi khói.");
entry("hand", "hand", "bàn tay", "Hand là danh từ chỉ phần cuối cánh tay gồm lòng bàn tay và các ngón; arm là cánh tay. Ví dụ: Raise your right hand. = Hãy giơ bàn tay phải lên.");
entry("dream", "dream", "giấc mơ, ước mơ (danh từ); mơ (động từ)", "Dream có cả danh từ và động từ; không thay nghĩa danh từ giấc mơ bằng động từ mơ mà bỏ ngữ cảnh. Ví dụ: I had a strange dream. = Tôi có một giấc mơ kỳ lạ.");
entry("ear", "ear", "tai", "Ear là danh từ chỉ cơ quan nghe; lỗ tai chỉ là một phần, không phải toàn bộ nghĩa. Ví dụ: My left ear hurts. = Tai trái của tôi bị đau.");
entry("boob", "boob", "vú (từ rất thân mật)", "Boob là danh từ rất thân mật chỉ vú; trong văn cảnh trung tính nên dùng breast. Ngoài ra có nghĩa người ngốc (Mỹ) hoặc lỗi ngớ ngẩn (Anh). Ví dụ về sắc thái: The word boob is very informal. = Từ boob rất thân mật.");
entry("lemon", "lemon", "chanh vàng", "Lemon là danh từ chỉ quả chanh thường có vỏ vàng; phân biệt lime thường là chanh xanh. Ví dụ: Cut the lemon in half. = Cắt đôi quả chanh vàng.");
entry("street", "street", "đường phố", "Street là danh từ chỉ đường trong đô thị, thường có nhà hai bên; không có nghĩa riêng là đoạn đường. Ví dụ: Our street is quiet. = Đường phố nơi chúng tôi ở yên tĩnh.");

export function verifiedWord(key: string) {
  const normalized = key.trim().toLowerCase();
  return (Object.hasOwn(verifiedVocabulary, normalized) ? verifiedVocabulary[normalized] : undefined)
    ?? Object.values(verifiedVocabulary).find(value => value.headword === normalized);
}

// Simple, original examples replace unreliable legacy AI explanations.
const reviewedBasics = [
  ['circle','hình tròn','danh từ đếm được; mọi điểm trên đường tròn cách tâm cùng một khoảng, đường kính bằng hai lần bán kính','Draw a small circle.','Hãy vẽ một hình tròn nhỏ.'],
  ['husband','chồng','danh từ đếm được chỉ người đàn ông đã kết hôn; wife (vợ) không phải từ đồng nghĩa','Her husband is a teacher.','Chồng cô ấy là giáo viên.'],
  ['book','quyển sách','danh từ đếm được trong ngữ cảnh đọc sách, không phải một nguyên âm','This book is about birds.','Quyển sách này nói về các loài chim.'],
  ['salt','muối','danh từ không đếm được khi nói về muối ăn; động từ salt mang nghĩa rắc hoặc ướp muối','The soup needs salt.','Món súp cần thêm muối.'],
  ['sugar','đường (chất tạo vị ngọt)','danh từ, thường không đếm được khi nói về nguyên liệu; không chỉ giới hạn ở đường tinh luyện','I do not add sugar to tea.','Tôi không thêm đường vào trà.'],
  ['technology','công nghệ','danh từ, chỉ kiến thức và ứng dụng kỹ thuật; không phải động từ','Technology helps us work.','Công nghệ giúp chúng ta làm việc.'],
  ['internet','Internet, mạng toàn cầu','danh từ, thường dùng the internet; mạng này gồm cả kết nối có dây và không dây','I use the internet at home.','Tôi sử dụng Internet ở nhà.'],
  ['food','thức ăn, thực phẩm','danh từ; dùng không đếm được cho thức ăn nói chung, foods cho các loại thực phẩm','The food is on the table.','Thức ăn ở trên bàn.'],
  ['pig','con lợn, con heo','danh từ đếm được chỉ con vật; không đồng nhất với pork là thịt lợn','There are two pigs on the farm.','Có hai con lợn ở trang trại.'],
  ['cock','gà trống (chủ yếu Anh-Anh)','danh từ; ở Mỹ thường dùng rooster. Cock còn có nghĩa tục chỉ dương vật, vì vậy rooster rõ nghĩa hơn khi học tên động vật','The cock is in the yard.','Con gà trống ở trong sân.'],
  ['never','không bao giờ','trạng từ phủ định, thường đứng trước động từ thường và sau be; không phải tính từ','She never drinks coffee.','Cô ấy không bao giờ uống cà phê.'],
  ['next to','ngay bên cạnh','cụm chỉ vị trí, đứng trước người/vật; không có vật khác xen giữa trong nghĩa không gian cơ bản','The chair is next to the door.','Cái ghế ở ngay bên cạnh cửa.'],
  ['between','ở giữa','giới từ hoặc trạng từ; mẫu cơ bản between A and B chỉ vị trí giữa A và B','The bank is between two shops.','Ngân hàng ở giữa hai cửa hàng.'],
  ['heart','trái tim','danh từ đếm được, nghĩa cơ bản là cơ quan bơm máu; nghĩa tình cảm cần ngữ cảnh riêng','Her heart beats fast.','Tim cô ấy đập nhanh.'],
  ['rain','mưa','danh từ không đếm được chỉ mưa nói chung, không nhất thiết mưa lớn; cũng có thể là động từ','The rain has stopped.','Mưa đã tạnh.'],
  ['future','tương lai','danh từ trong the future; tính từ khi đứng trước danh từ như future plans','We talk about the future.','Chúng tôi nói về tương lai.'],
  ['only','chỉ; duy nhất','trạng từ trong only two, tính từ trong the only child; không phải trợ động từ','I have only two pens.','Tôi chỉ có hai cây bút.'],
  ['where','ở đâu','trạng từ nghi vấn hỏi nơi chốn trong câu hỏi; cũng có thể nối mệnh đề','Where is my bag?','Túi của tôi ở đâu?'],
  ['sun','mặt trời','danh từ, thường dùng the sun; không đồng nghĩa với đồng hồ hay cánh đồng','The sun is behind a cloud.','Mặt trời ở sau một đám mây.'],
  ['moon','mặt trăng','danh từ, thường dùng the moon khi nói về mặt trăng của Trái Đất','The moon looks bright tonight.','Tối nay mặt trăng trông sáng.'],
  ['chili','ớt','danh từ; chili là cách viết Mỹ của chilli. Chili cũng có thể chỉ món hầm có thịt/đậu và ớt tùy ngữ cảnh','This sauce contains chili.','Nước sốt này có ớt.'],
  ['lime','chanh xanh','danh từ chỉ trái cây trong ngữ cảnh ăn uống; không phải cà chua, nghĩa vôi thuộc ngữ cảnh khác','Add some lime juice.','Thêm một ít nước chanh xanh.'],
  ['hug','cái ôm (danh từ); ôm (động từ)','danh từ trong give someone a hug, động từ trong hug someone','She gave her mother a hug.','Cô ấy ôm mẹ một cái.'],
  ['short','ngắn; thấp (về chiều cao)','tính từ; short hair là tóc ngắn, a short person là người thấp. Taller không phải từ đồng nghĩa','My hair is short.','Tóc tôi ngắn.'],
  ['head','đầu','danh từ chỉ phần cơ thể ở trên cổ trong ngữ cảnh cơ bản','My head hurts today.','Hôm nay tôi bị đau đầu.'],
  ['tall','cao','tính từ dùng cho chiều cao người hoặc vật cao, hẹp; tall không dùng cho mọi nghĩa của cao','That building is tall.','Tòa nhà kia cao.'],
  ['learn','học, học hỏi','động từ chỉ tiếp thu kiến thức hoặc kỹ năng; learn to + nguyên mẫu là học làm gì','I learn English every day.','Tôi học tiếng Anh mỗi ngày.'],
  ['diligent','chăm chỉ, cần mẫn','tính từ chỉ làm việc cẩn thận và nhiều nỗ lực; dùng trước danh từ hoặc sau be','Mai is a diligent student.','Mai là một học sinh chăm chỉ.'],
  ['study','học tập, nghiên cứu','động từ trong ngữ cảnh học một môn; study + tên môn học','We study English at school.','Chúng tôi học tiếng Anh ở trường.'],
  ['research','sự nghiên cứu','danh từ thường không đếm được trong do research; cũng có dạng động từ research','She does research on plants.','Cô ấy nghiên cứu về thực vật.'],
  ['essay','bài luận','danh từ đếm được chỉ bài viết về một chủ đề; có thể là bài tập học thuật','I wrote an essay about my town.','Tôi đã viết một bài luận về thị trấn của mình.'],
  ['report','báo cáo','động từ khi báo tin, danh từ khi chỉ bản trình bày thông tin; report on + chủ đề','Please report the problem.','Hãy báo cáo vấn đề này.'],
  ['paper','giấy','danh từ không đếm được khi chỉ vật liệu: a sheet of paper là một tờ giấy','I need a sheet of paper.','Tôi cần một tờ giấy.'],
  ['key','chìa khóa','danh từ đếm được chỉ vật dùng mở khóa trong nghĩa cơ bản','The key is in my bag.','Chìa khóa ở trong túi tôi.'],
  ['job','công việc','danh từ đếm được chỉ việc làm hoặc nhiệm vụ; a job, two jobs','She has a new job.','Cô ấy có công việc mới.'],
  ['kill','giết, làm chết','động từ chỉ gây ra cái chết; không chỉ dùng với người hoặc vật nuôi','The cold can kill these plants.','Giá lạnh có thể làm chết những cây này.'],
  ['door','cửa ra vào, cánh cửa','danh từ đếm được; open the door là mở cửa','Please close the door quietly.','Hãy đóng cửa nhẹ nhàng.'],
  ['windows','các cửa sổ','danh từ số nhiều của window; Windows viết hoa còn có thể là tên hệ điều hành','The windows are open.','Các cửa sổ đang mở.'],
  ['table','cái bàn','danh từ đếm được chỉ đồ nội thất trong ngữ cảnh cơ bản; còn có nghĩa bảng số liệu','The cups are on the table.','Những chiếc cốc ở trên bàn.'],
  ['desk','bàn làm việc, bàn học','danh từ đếm được, chỉ bàn dùng để làm việc hoặc học','My desk is near the window.','Bàn học của tôi ở gần cửa sổ.'],
  ['noodle','sợi mì; mì','danh từ đếm được, thường dùng số nhiều noodles khi nói về món mì','I eat noodles for lunch.','Tôi ăn mì vào bữa trưa.'],
  ['finance','tài chính','danh từ nói về quản lý hoặc nguồn tiền, không phải vận chuyển tiền bằng xe','He works in finance.','Anh ấy làm trong lĩnh vực tài chính.'],
  ['network','mạng lưới, hệ thống mạng','danh từ chỉ các bộ phận kết nối với nhau; trong công nghệ là mạng máy tính','Our network is slow today.','Hôm nay mạng của chúng tôi chậm.'],
  ['drink','uống (động từ); đồ uống (danh từ)','drink water là uống nước; a drink là một đồ uống','I drink water every morning.','Tôi uống nước mỗi sáng.'],
  ['cat','con mèo','danh từ đếm được; cat trong cat food bổ nghĩa danh từ nhưng không vì thế trở thành tính từ độc lập','Our cat sleeps on the chair.','Mèo của chúng tôi ngủ trên ghế.'],
  ['dog','con chó','danh từ đếm được chỉ loài vật; không phải từ đồng âm của từ chó tiếng Việt','Their dog is very friendly.','Chó của họ rất thân thiện.'],
  ['chicken','con gà; thịt gà','danh từ đếm được khi chỉ con vật, không đếm được khi nói thịt gà','We have chicken for dinner.','Chúng tôi ăn thịt gà vào bữa tối.'],
  ['beef','thịt bò','danh từ không đếm được khi nói về thực phẩm','This soup contains beef.','Món súp này có thịt bò.'],
  ['meat','thịt','danh từ thường không đếm được chỉ thịt làm thức ăn','Put the meat in the fridge.','Đặt thịt vào tủ lạnh.'],
  ['pork','thịt lợn, thịt heo','danh từ không đếm được; pig chỉ con vật, pork chỉ thịt','She bought some pork.','Cô ấy mua một ít thịt lợn.'],
  ['university','trường đại học','danh từ đếm được; dùng a university vì âm đầu /j/ là phụ âm','This university has a library.','Trường đại học này có thư viện.'],
  ['school','trường học','danh từ, không phải đại từ; go to school thường chỉ việc đi học','My school is near my house.','Trường tôi ở gần nhà tôi.'],
  ['teacher','giáo viên','danh từ đếm được chỉ người dạy học, không phải từ viết tắt','Our teacher speaks slowly.','Giáo viên của chúng tôi nói chậm.'],
  ['subject','môn học; chủ đề','danh từ đếm được; school subject là môn học, subject of discussion là chủ đề thảo luận','English is my favourite subject.','Tiếng Anh là môn học tôi yêu thích nhất.'],
  ['math','toán học','danh từ không đếm được trong tiếng Anh-Mỹ; tiếng Anh-Anh thường dùng maths','I study math on Mondays.','Tôi học toán vào thứ Hai.'],
  ['chemistry','hóa học','danh từ không đếm được, chỉ môn khoa học nghiên cứu chất và phản ứng','We have a chemistry lesson today.','Hôm nay chúng tôi có tiết hóa học.'],
  ['physics','vật lý','danh từ không đếm được chỉ môn học, dùng động từ số ít dù tận cùng -s','Physics is interesting.','Vật lý rất thú vị.'],
  ['biology','sinh học','danh từ không đếm được chỉ khoa học nghiên cứu sự sống','He likes biology.','Anh ấy thích sinh học.'],
  ['history','lịch sử','danh từ nói về sự kiện quá khứ hoặc môn học; historical là tính từ, không phải từ đồng nghĩa trực tiếp','We study history at school.','Chúng tôi học lịch sử ở trường.'],
  ['the fan','cái quạt','cụm danh từ: the là mạo từ, fan là danh từ; quạt tạo luồng gió, không nhất thiết dùng hơi nước','Please turn off the fan.','Hãy tắt quạt.'],
  ['shirt','áo sơ mi','danh từ đếm được chỉ áo mặc phần thân trên, thường có cổ và cúc; không phải áo vest','My shirt is blue.','Áo sơ mi của tôi màu xanh.'],
  ['long','dài; lâu','tính từ trong a long road, nói về độ dài hoặc thời gian; không dùng ví dụ bữa ăn khó nuốt để dạy nghĩa này','This road is long.','Con đường này dài.'],
  ['mouth','miệng','danh từ đếm được chỉ bộ phận dùng để ăn và nói; không phải từ chỉ con vật','Close your mouth gently.','Hãy khép miệng nhẹ nhàng.'],
  ['nose','mũi','danh từ đếm được, liên quan đến thở và ngửi; không có chức năng giữ nước bọt như giải thích cũ','My nose is cold.','Mũi tôi lạnh.'],
  ['eyes','đôi mắt, các mắt','danh từ số nhiều của eye; one eye là một mắt, two eyes là hai mắt','Her eyes are brown.','Mắt cô ấy màu nâu.'],
  ['the back','lưng','cụm danh từ trong ngữ cảnh cơ thể; back cũng chỉ phía sau một vật','The back of my chair is high.','Phần tựa lưng của ghế tôi cao.'],
  ['belly','bụng','danh từ đếm được, cách nói thân mật chỉ phần bụng','The baby has a round belly.','Em bé có bụng tròn.'],
  ['fingers','các ngón tay','danh từ số nhiều của finger; phân biệt nail là móng tay, toe là ngón chân','Keep your fingers warm.','Hãy giữ ấm các ngón tay.'],
  ['leg','chân','danh từ đếm được; leg chỉ chi dùng để đứng/đi, foot chỉ bàn chân; còn dùng cho chân bàn/ghế','My left leg is tired.','Chân trái tôi mỏi.'],
  ['face','mặt, khuôn mặt','danh từ đếm được chỉ phía trước đầu gồm mắt, mũi và miệng','Wash your face with water.','Hãy rửa mặt bằng nước.'],
  ['hear','nghe thấy','động từ chỉ tiếp nhận âm thanh; hear không đồng nhất với listen to là chủ động lắng nghe','I can hear a bird outside.','Tôi nghe thấy một con chim ở ngoài.'],
  ['look','nhìn','động từ; look at + người/vật khi nhìn vào đối tượng cụ thể','Look at the picture on the wall.','Hãy nhìn bức tranh trên tường.'],
  ['view','xem; xem xét','động từ khi nhìn/xem một vật hoặc đánh giá; danh từ có nghĩa quan điểm/cảnh nhìn thấy','You can view the photos here.','Bạn có thể xem ảnh ở đây.'],
  ['lost','bị lạc, thất lạc; đã mất','tính từ trong be lost; đồng thời là quá khứ và phân từ bất quy tắc của lose, không thuộc nhóm thêm -ed','I am lost.','Tôi bị lạc.'],
  ['away','xa, đi khỏi, vắng mặt','trạng từ, không phải động từ; go away là đi khỏi','The school is two kilometres away.','Trường cách đây hai kilômét.'],
  ['night','đêm, ban đêm','danh từ chỉ khoảng tối trong ngày; at night là vào ban đêm','We sleep at night.','Chúng tôi ngủ vào ban đêm.'],
  ['remember','nhớ, ghi nhớ','động từ chỉ giữ hoặc gợi lại thông tin; khác miss là nhớ nhung vì vắng ai','I remember your name.','Tôi nhớ tên bạn.'],
  ['know','biết','động từ; quá khứ knew, phân từ known. Nghĩa biết thông tin thường không dùng tiếp diễn','I know the answer.','Tôi biết câu trả lời.'],
  ['love','yêu, rất thích','động từ khi chỉ tình cảm hoặc sở thích; danh từ love là tình yêu','I love my family.','Tôi yêu gia đình mình.'],
  ['like','thích','động từ trong nghĩa sở thích; like + danh từ hoặc V-ing là cấu trúc thông dụng','I like reading books.','Tôi thích đọc sách.'],
  ['hate','ghét','động từ chỉ cảm giác rất không thích, không dùng để chỉ thích','I hate loud noise.','Tôi ghét tiếng ồn lớn.'],
  ['smile','mỉm cười (động từ); nụ cười (danh từ)','smile at someone là mỉm cười với ai; không nhất thiết cười thành tiếng','She smiled at the child.','Cô ấy mỉm cười với đứa trẻ.'],
  ['time','thời gian','danh từ không đếm được khi chỉ thời gian nói chung; a time có thể là một lần trong ngữ cảnh khác','I need more time.','Tôi cần thêm thời gian.'],
  ['sick','ốm, bị bệnh','tính từ, thường dùng sau be hoặc feel; có thể chỉ buồn nôn tùy ngữ cảnh','He is sick today.','Hôm nay anh ấy bị ốm.'],
  ['cry','khóc; kêu lên','động từ chỉ rơi nước mắt hoặc gọi/kêu lớn tùy ngữ cảnh','The baby is crying.','Em bé đang khóc.'],
  ['promise','lời hứa (danh từ); hứa (động từ)','make a promise là hứa; promise to + nguyên mẫu là hứa làm gì','I promise to help you.','Tôi hứa sẽ giúp bạn.'],
  ['destroy','phá hủy','động từ chỉ làm hỏng nghiêm trọng đến mức không còn dùng được','The fire destroyed the shed.','Ngọn lửa phá hủy nhà kho nhỏ.'],
  ['think','nghĩ, suy nghĩ, cho rằng','động từ; think that diễn đạt ý kiến, think about là suy nghĩ về','I think this book is useful.','Tôi nghĩ quyển sách này hữu ích.'],
  ['light','ánh sáng','danh từ không đếm được trong nghĩa cơ bản này; light còn có nghĩa nhẹ khi là tính từ','There is light in the room.','Có ánh sáng trong phòng.'],
  ['sunshine','ánh nắng','danh từ không đếm được chỉ ánh sáng và sức nóng của mặt trời','We sat in the sunshine.','Chúng tôi ngồi dưới ánh nắng.'],
  ['wait','chờ, đợi','động từ; wait for + người/vật, wait to + động từ','I am waiting for the bus.','Tôi đang đợi xe buýt.'],
  ['spicy','cay, có vị gia vị đậm','tính từ về đồ ăn có gia vị mạnh; độ cay nóng phụ thuộc gia vị trong món','This soup is too spicy for me.','Món súp này quá cay đối với tôi.'],
  ['road','con đường','danh từ chỉ đường nối các địa điểm, thường cho xe cộ đi lại; không phải thuật ngữ động vật học','This road goes to the village.','Con đường này dẫn đến ngôi làng.'],
  ['name','tên','danh từ đếm được chỉ tên người/vật/địa điểm; cũng có thể là động từ đặt tên','Please write your name here.','Hãy viết tên bạn ở đây.'],
  ['queue','hàng chờ (danh từ); xếp hàng (động từ)','thường dùng trong tiếng Anh-Anh; tiếng Anh-Mỹ hay dùng line cho hàng chờ','We are waiting in a queue.','Chúng tôi đang xếp hàng chờ.'],
  ['curtain','rèm cửa','danh từ đếm được chỉ vật che cửa sổ/cửa, thường bằng vải; không phải bản thân cửa sổ','Close the curtain, please.','Hãy kéo rèm lại.'],
  ['security','an ninh, sự bảo vệ; bảo mật','danh từ; security nói về bảo vệ khỏi nguy cơ, computer security là bảo mật máy tính','The building has good security.','Tòa nhà có hệ thống an ninh tốt.'],
  ['information technology','công nghệ thông tin','cụm danh từ không đếm được, viết tắt IT, liên quan dùng máy tính để lưu và truyền thông tin','She studies information technology.','Cô ấy học công nghệ thông tin.'],
];
for (const [headword, meaning, rule, en, vi] of reviewedBasics) {
  const aliases: Record<string,string> = { windows:'window',eyes:'eye',fingers:'finger','the fan':'fan','the back':'back' };
  const slug = aliases[headword] ?? headword.replaceAll(' ', '-');
  entry(headword, headword, meaning, `${headword}: ${rule}. Ví dụ: ${en} = ${vi}`, slug);
}
