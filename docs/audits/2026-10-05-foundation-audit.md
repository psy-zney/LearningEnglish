# Rà soát nền tảng LearningEnglish — 05/10/2026

Đã áp dụng sửa dữ liệu vào SQLite cục bộ `dev.db`, bổ sung ngân hàng bài tập và sửa luồng luyện tập. Chưa triển khai lên máy chủ công khai. Lần cập nhật database: 07:52:47 ngày 05/10/2026, Asia/Bangkok; kiểm tra tiếp sau khi người dùng yêu cầu CONTINUE, đến khoảng 14:06 cùng ngày.

## Phạm vi và mức kiểm chứng

- Đọc AGENTS.md; repository không có `.codegraph`, nên không tạo chỉ mục. Đã đọc tài liệu Next.js cục bộ cho page và route trước khi sửa.
- Rà soát danh sách 490 mục vocabulary trong giáo trình (240 nền tảng, 250 trung cấp), 90 động từ và 121 cụm trong kho lõi; riêng 12 mục thì được kiểm tra như nội dung ngữ pháp.
- Đối chiếu mục từ Cambridge cho toàn bộ **115 mục từ cá nhân**. Viết lại nghĩa cơ bản, giải thích từ loại/ngữ cảnh và ví dụ có dịch tiếng Việt. **68 chuỗi nghĩa chuẩn thay đổi**; con số này gồm sửa lỗi lẫn bổ sung nghĩa/ngữ cảnh, không đồng nghĩa với 68 lỗi dịch độc lập.
- Chưa đối chiếu từ điển độc lập từng nghĩa, phiên âm, collocation và ví dụ của toàn bộ 701 mục từ/cụm trong giáo trình và kho lõi. Việc rà soát danh sách không được coi là chứng nhận tất cả nội dung đều đúng.
- Nghĩa tiếng Việt và ví dụ mới là diễn giải biên tập dựa trên định nghĩa; không phải bản dịch chính thức của Cambridge. Danh sách nguồn cho 115 mục nằm trong [bảng nguồn](C:/Users/admin/MyProject/LearningEnglish/docs/audits/2026-10-05-vocabulary-sources.md).

## Các lỗi đã xác minh và sửa

| Mục | Trước | Sau và căn cứ |
|---|---|---|
| dark | đông đặc | tối/sẫm màu; danh từ: bóng tối. Mục từ đã đối chiếu không có nghĩa đông đặc. [Cambridge dark](https://dictionary.cambridge.org/dictionary/english/dark) |
| ambulance | nhật báo cứu thương | xe cứu thương. [Cambridge ambulance](https://dictionary.cambridge.org/dictionary/english/ambulance) |
| emergency | cất cánh | tình huống khẩn cấp. [Cambridge emergency](https://dictionary.cambridge.org/dictionary/essential-british-english/emergency) |
| foot | lòng bàn chân | bàn chân; lòng bàn chân là sole. [foot](https://dictionary.cambridge.org/us/dictionary/english/foot), [sole](https://dictionary.cambridge.org/dictionary/english/sole) |
| cup | bình đựng rượu | cốc/tách, nghĩa đồ dùng uống cơ bản. [Cambridge cup](https://dictionary.cambridge.org/dictionary/english/cup) |
| miss | giải thích loại bỏ nghĩa nhớ nhung | làm rõ miss someone và miss a bus. [Cambridge miss](https://dictionary.cambridge.org/dictionary/english/miss) |
| smell | thiên về hương thơm | ngửi/có mùi; mùi có thể dễ chịu hoặc khó chịu. [Cambridge smell](https://dictionary.cambridge.org/dictionary/english/smell) |
| infomation / honney / highschool | sai chính tả | information / honey / high school; giữ nguyên trường người học nhập, dùng trường correctedWord để trình bày chuẩn. [information](https://dictionary.cambridge.org/dictionary/english/information), [honey](https://dictionary.cambridge.org/dictionary/english/honey), [high school](https://dictionary.cambridge.org/dictionary/english/high-school) |
| compatible | noun | adjective. [Cambridge compatible](https://dictionary.cambridge.org/us/dictionary/english/compatible) |
| minimize | giảm thiểu đến mức tối đa | giảm xuống mức thấp nhất có thể; sửa cả lựa chọn bài tập tương ứng. [Cambridge minimize](https://dictionary.cambridge.org/dictionary/english/minimize) |

Các mục dễ gây nhầm như football, cock, boob, lemon được bổ sung vùng sử dụng/sắc thái/ngữ cảnh. Không xoá từ cá nhân. Các danh sách đồng nghĩa AI sai như husband–wife, football–tennis, salt–coffee được giữ trong dữ liệu gốc để tránh mất ghi chú, nhưng không đưa ra như nội dung chuẩn đã kiểm chứng.

Sửa quy tắc từ loại khái quát sai: không khẳng định sau mạo từ luôn lập tức là danh từ, sau be luôn là tính từ, hay sau mọi động từ luôn là trạng từ. Việc kiểm tra từ mới không còn dùng AI để tự ghi đè nghĩa chuẩn: mục có nguồn dùng bản đã biên tập; mục chưa có nguồn giữ nghĩa người học và trạng thái chưa kiểm chứng.

## Quy mô trước và sau

| Chỉ số | Trước | Sau |
|---|---:|---:|
| Nhóm chọn trực tiếp trên Practice | 3 | **15** |
| Nhóm ngữ pháp cơ bản mới trên Practice | 0 | **12** |
| Câu trong bảng Exercise | 200 | **440** |
| Câu mỗi nhóm cơ bản mới | 0 | **20** |
| Câu trong 56 bài/lượt kiểm tra của Roadmap | 709 | **769** |
| Câu Roadmap giai đoạn nền tảng | 366 | **386** |
| Câu Roadmap trung cấp | 343 | **383** |
| Câu mỗi lượt Practice/Roadmap | không thống nhất, có 3/4/8/10 câu | **đúng 5** |
| Word cá nhân | 115 | 115 |
| ContentItem | 338 | 338 |

12 nhóm mới: be, a/an, số nhiều, hiện tại đơn, phủ định hiện tại, Do/Does, hiện tại tiếp diễn, quá khứ đơn, đại từ tân ngữ, tính từ sở hữu, so sánh hơn, động từ sau can/must.

240 câu ngữ pháp mới là 20 câu phân biệt mỗi nhóm, gồm nhiều chủ ngữ/ngữ cảnh, đảo vị trí đáp án. Bốn lượt đầu của từng nhóm bao phủ đủ 20 câu, không trùng câu giữa bốn lượt. Ngân hàng hữu hạn sẽ xoay vòng sau khi đã đi hết, không phải câu mới vô hạn.

Roadmap thêm 20 câu đọc mới và tái sử dụng 40 câu từ ngân hàng 240 câu ở hai bài ngữ pháp vốn chỉ có 5 câu. Vì vậy **số câu mới độc lập là 260**, không cộng 240 và 60 thành 300. Số câu Roadmap tính cả câu được dùng trong bài kiểm tra; không phải số câu duy nhất toàn hệ thống. Một số ngân hàng Roadmap cũ vẫn nhỏ (tối thiểu 6 câu), nên độ đa dạng thấp hơn 12 nhóm mới.

## Luồng học và giải thích

- Cố định 5 câu ở API và giao diện, kể cả khi tham số limit yêu cầu số khác. Bài đọc được tính theo câu hỏi, không theo số đoạn văn. Chặn nộp Roadmap khi chưa chọn đủ 5 câu.
- Có lượt tiếp theo; đổi lượt đặt lại lựa chọn/kết quả. Sửa truyền round và định danh bộ lựa chọn để chấm đúng khi vượt lượt 10 hoặc thứ tự đáp án thay đổi.
- 240 câu mới có lý do riêng cho cả bốn lựa chọn, quy tắc, câu ví dụ hoàn chỉnh và nghĩa tiếng Việt. 200 câu Part 5 có thêm đáp án/câu hoàn chỉnh và phản hồi gắn với lựa chọn sai.
- Roadmap bổ sung đáp án rõ ràng, phản hồi đối chiếu lựa chọn với quy tắc đã có, và ví dụ Anh–Việt cho câu có mục từ đích. Không sinh thêm bản dịch không có căn cứ ở thời điểm chạy. Phần phản hồi của câu cũ vẫn dựa trên giải thích đã biên soạn trước đó; chưa có biên tập viên ngôn ngữ độc lập thẩm định toàn bộ.
- Drill gõ từ có gợi ý mục từ để giới hạn đáp án đang ôn; không coi bộ chấm khớp chuỗi là bộ đánh giá mọi cách diễn đạt tiếng Anh hợp lệ.
- Không trả rationaleVi/đáp án đúng trong API tải câu trắc nghiệm trước khi người học trả lời.
- Phát hiện thêm hai hàm kiểm tra quyền luôn trả true và route đăng nhập luôn thành công. Đã khôi phục kiểm tra phiên ký, kiểm tra mật khẩu, cookie HttpOnly, giới hạn thử đăng nhập và gắn hộp thoại đăng nhập sẵn có. Không đổi mật khẩu hay cấu hình bí mật hiện tại. Khi phiên chưa hợp lệ, việc lưu kết quả yêu cầu đăng nhập.

## Bảo toàn dữ liệu và cách áp dụng

Đã dùng SQLite backup API trước transaction, kiểm tra bản sao đọc được và integrity_check = ok. Bản sao trước sửa:

[content-audit-2026-10-05T00-52-47-062Z.db](C:/Users/admin/MyProject/LearningEnglish/backups/content-audit-2026-10-05T00-52-47-062Z.db)

[Script áp dụng](C:/Users/admin/MyProject/LearningEnglish/scripts/apply-content-audit.mjs) chạy transaction và kiểm tra dữ liệu người học trước commit. Không chạy full seed có thao tác lưu trữ/ẩn dữ liệu ngoài phạm vi. Không xoá hay tạo lại database.

Sau cập nhật và sau kiểm thử, so sánh toàn bộ từng hàng với bản sao xác nhận giữ nguyên: **148 Attempt, 115 ReviewState, 0 StudySession, 4 DailyActivity**; trường word/meaning/synonyms gốc, thẻ, ngày tạo và toàn bộ thông số SRS cũng giữ nguyên. Word chỉ đổi correctedWord/correctMeaning/explanation; ContentItem tương ứng cập nhật bản dùng để học. Khóa ngoại không có lỗi.

Mọi lần trả lời thử API/giao diện chạy trên `backups/audit-ui-test.db`, không đưa kết quả thử vào database thật. Chi tiết transaction và từng chuỗi nghĩa trước/sau: [nhật ký áp dụng](C:/Users/admin/MyProject/LearningEnglish/artifacts/audit/applied-2026-10-05T00-52-47-062Z.json).

## Kiểm tra

- **88/88 unit tests đạt**, gồm ngân hàng 12×20, bốn lượt không trùng, đủ 5 câu trong cả 56 bài, chấm lượt 11/1000, bảo toàn dữ liệu, phản hồi và đăng nhập thực.
- `typecheck`, `build`, `data:validate`, `data:verify`, `verify:frontend-boundary` đạt. Frontend bundle không chứa Prisma/libSQL/dev.db.
- Kiểm thử API trên bản sao: 15 nhóm, 53 câu trả lời, lượt 0/1/11/1000, phản hồi sau trả lời, tham số sai bị từ chối, sửa dark, không lộ đáp án/rationale trước khi trả lời, đăng nhập sai bị từ chối.
- Kiểm thử trình duyệt: đăng nhập, trả lời sai We + am, đọc lý do cần are cùng ví dụ tiếng Việt, hoàn thành đúng 5 câu, chuyển sang vòng 2 và thấy bộ câu khác bắt đầu lại từ câu 1/5.
- `git diff --check` không có lỗi whitespace.
- **Lint chưa sạch: 7 lỗi any có sẵn**, gồm 6 ở `shadowing-studio.tsx` và 1 ở `study-roadmap.test.ts`, cùng cảnh báo cũ. Không tuyên bố toàn bộ kiểm tra repository đã xanh. [Log lint](C:/Users/admin/MyProject/LearningEnglish/artifacts/audit/lint-final.log).

## Nguồn ngữ pháp và phần còn giới hạn

Quy tắc cho ngân hàng mới đối chiếu British Council LearnEnglish: [be](https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple-be), [a/an](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/indefinite-article), [hiện tại đơn](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-simple), [hiện tại tiếp diễn](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-continuous), [quá khứ đơn](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/past-simple), [đại từ](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/personal-pronouns), [sở hữu](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/possessives-adjectives), [so sánh hơn](https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/comparative-adjectives), [can/could](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/can-could).

Chưa xác minh toàn bộ phiên âm, mọi nghĩa hiếm và collocation của 701 mục giáo trình/kho lõi; chưa đánh giá nội dung do các tính năng AI hội thoại/shadowing khác sinh ra. Chưa kiểm thử cấu hình cookie/CORS trên các tên miền production. Các ngân hàng cũ nhỏ và giải thích cũ cần tiếp tục biên tập sâu theo từng câu; bản sửa này không phải chứng nhận chất lượng ngôn ngữ tuyệt đối.

## Thay đổi theo yêu cầu người dùng — 10/10/2026
Người dùng yêu cầu xoá đăng nhập vì liên tục quên mật khẩu. Đã xoá trang/API đăng nhập, hộp thoại và kiểm tra phiên; lưu kết quả và sửa từ vựng không còn yêu cầu mật khẩu. Giữ kiểm tra origin, giới hạn kích thước và tần suất yêu cầu. 84/84 tests, typecheck và build đạt. Mục mô tả sửa đăng nhập ở trên là lịch sử của lần rà soát 05/10, được thay thế bởi yêu cầu này.

