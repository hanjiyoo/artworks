/**
 * 이 파일은 웹사이트의 모든 콘텐츠를 관리하는 데이터 파일입니다.
 * 엑셀(Excel)이나 테이블에서 데이터를 복사하여 아래의 각 항목 사이에 붙여넣으세요.
 * 
 * [수정 가이드]
 * 1. 엑셀에서 내용을 복사(Ctrl+C)한 뒤, 백틱(``) 기호 사이에 붙여넣기(Ctrl+V) 하세요.
 * 2. 이미지 파일은 images/ 폴더 안에 넣고 파일명을 확장자까지 적어주세요. (예: work1.jpg)
 */

const SITE_CONFIG = {
    title: "GU | Portfolio",
    logoText: "GU", // 웹사이트 왼쪽 상단 로고 글자
    artistName: "Han Jiyoo", // Contact 섹션 등에 표시될 작가 이름
    email: "oz.hanny0828@gmail.com", // 메일 받을 주소
};

/**
 * [1. Works - 작품 데이터]
 * 엑셀 열 순서: 제목, 크기, 재료, 연도, 이미지파일명, Home 여부(선택)
 */
const WORKS_CSV = `
Home sweet home	116.8x91.0cm	Acrylic on Canvas	2022	dusty_Home sweet home_50F.jpg
This movie like my LIFE	116.8x91.0cm	Acrylic on Canvas	2023	dusty_This movie like my LIFE_50F.jpg
Simpson’s house	116.8x91.0cm	Acrylic on Canvas	2024	dusty_Simpson_s house_50F.jpg
Yarn box	91.0x91.0cm	Acrylic on Canvas	2023	dusty_Yarn box_50S.jpg
Frosted Flakes	91.0x116.8cm	Acrylic on Canvas	2023	dusty_Frosted Flakes_50F.jpg
Simpson amd Marge	90.9x72.7cm	Acrylic on Canvas	2024	dusty_Simpson and Marge_25F.jpg
Simpon’s Living room	80.3x65.1cm	Acrylic on Canvas	2024	dusty_Simpson_s Living room_20F.jpg
Very Dusty	100.0x80.3cm	Acrylic on Canvas	2022	dusty_Very Dusty_40F.jpg
The toy box	72.7x90.9cm	Acrylic on Canvas	2022	dusty_The toy box_30F.jpg
Photo Booth	60.6x72.7cm*2	Acrylic on Canvas	2023	dusty_Photo booth_1_20F.jpg / dusty_Photo booth_2_20F.jpg
Spill out	80.3x65.1cm	Acrylic on Canvas	2022	dusty_Spill out_25F.jpg
Vans box	60.6x60.6cm	Acrylic on Canvas	2022	dusty_Vans box_20S.jpg
Ta-da	53.0x65.1cm*3	Acrylic on Canvas	2022	dusty_Ta-da_1_15F.jpg / dusty_Ta-da_2_15F.jpg / dusty_Ta-da_3_15F.jpg
Locker	65.1x53.0cm	Acrylic on Canvas	2021	dusty_Locker_15F.jpg
Look at us!	31.8x31.8cm*2	Acrylic on Canvas	2022	dusty_Look at us_1_6S.jpg / dusty_Look at us_2_6S.jpg
Welcome	31.8x31.8cm	Acrylic on Canvas	2024	dusty_Welcome_6S.jpg
Peekaboo	31.8x31.8cm	Acrylic on Canvas	2026	dusty_Peekaboo_6S.jpg	Home
Come on in	24.4x24.4cm	Acrylic on Canvas	2024	dusty_Come on in_3S.jpg
Under the chair	24.4x24.4cm	Acrylic on Canvas	2024	dusty_Under the Chair_4S.jpg
Window	22.0x22.0cm*2	Acrylic on Canvas	2024	dusty_Window_1_3S.jpg / dusty_Window_2_3S.jpg
Home home	10.0x10.0cm*2	Acrylic on Canvas	2024	dusty_home home_1_1S.jpg / dusty_home home_2_1S.jpg
Hideaway	91.0x116.8cm	Oil pastel on Canvas	2025	BODY_001_50F.JPG
Hideaway	91.0x116.8cm	Oil pastel on Canvas	2025	BODY_002_50F.JPG
Body drawing 1		Oil pastel on Paper	2025	Body_drawing_001.jpg
Body drawing 2		Oil pastel on Paper	2025	Body_drawing_002.jpg
Body drawing 3		Oil pastel on Paper	2025	Body_drawing_003.jpg
Body drawing 4		Oil pastel on Paper	2025	Body_drawing_004.jpg
Body drawing 5		Oil pastel on Paper	2025	Body_drawing_005.jpg
Body drawing 6		Oil pastel on Paper	2025	Body_drawing_006.jpg
Body drawing 7		Oil pastel on Paper	2025	Body_drawing_007.jpg
Body drawing 8		Oil pastel on Paper	2025	Body_drawing_008.jpg
Body drawing 9		Oil pastel on Paper	2025	Body_drawing_009.jpg
Body drawing 10		Oil pastel on Paper	2025	Body_drawing_010.jpg
Body drawing 11		Oil pastel on Paper	2025	Body_drawing_011.jpg
Body drawing 12		Oil pastel on Paper	2025	Body_drawing_012.jpg
Body drawing 13		Oil pastel on Paper	2025	Body_drawing_013.jpg
Body drawing 14		Oil pastel on Paper	2025	Body_drawing_014.jpg
Body drawing 15		Oil pastel on Paper	2025	Body_drawing_015.jpg
Body drawing 16		Oil pastel on Paper	2025	Body_drawing_016.jpg
Body drawing 17		Oil pastel on Paper	2025	Body_drawing_017.jpg
Body drawing 18		Oil pastel on Paper	2025	Body_drawing_018.jpg
Body drawing 19		Oil pastel on Paper	2025	Body_drawing_019.jpg
Body drawing 20		Oil pastel on Paper	2025	Body_drawing_020.jpg
Body drawing 21		Oil pastel on Paper	2025	Body_drawing_021.jpg
Body drawing 22		Oil pastel on Paper	2025	Body_drawing_022.jpg
Body drawing 23		Oil pastel on Paper	2025	Body_drawing_023.jpg
Body drawing 24		Oil pastel on Paper	2025	Body_drawing_024.jpg
Body drawing 25		Oil pastel on Paper	2025	Body_drawing_025.jpg
`;

/**
 * [2. CV - 학력]
 * 학력 사항을 한 줄에 하나씩 입력하세요.
 */
const CV_EDUCATION_CSV = `
2026 홍익대학교 미술대학원 회화전공 재학중
`;

/**
 * [3. CV - 전시 경력]
 * 전시 경력을 한 줄에 하나씩 입력하세요.
 */
const CV_EXHIBITIONS_CSV = `
2025 단체전, <Frech Born>, 성남아트센터 갤러리 808, 경기도
2024 개인전, <Home Sweet Home>, 갤러리빈치, 서울
2024 단체전, <유토피아: 이상향을 꿈꾸다>, 다미담예술구, 전라남도 담양군
2023 개인전, <먼지입니다만?>, 연희동 스페이스 예술가의 시작, 서울
2022 개인전, <Dusty>, 갤러리 라메르, 서울
2022 단체전, <Art Festival from Paraguay>, Museo Nacional de Bellas Artes de Asunción, Paraguay
2021 단체전, <MOAF(Mullae One & Only Art Fair)>, 문래동 우체국, 서울
`;

/**
 * [4. CV - 수상 및 기타]
 * 수상 경력 등을 한 줄에 하나씩 입력하세요.
 */
const CV_AWARDS_CSV = `

`;


