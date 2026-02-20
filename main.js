// 초기화 로직 수정
document.addEventListener('DOMContentLoaded', () => {
    prepareData();
    initSite();
    initNavigation();
    initHomeFeed();
    initWorks();
    initCV();
    initContact();
    initModal();

    // 초기 라우팅 처리
    handleRouting();
    window.addEventListener('hashchange', handleRouting);
});

// 라우팅 처리 함수
function handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach(s => {
        s.classList.remove('active');
        if (s.id === hash) {
            s.classList.add('active');
        }
    });

    // 네비게이션 활성화 상태 업데이트
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${hash}`) {
            link.classList.add('active');
        }
    });

    // 페이지 상단으로 스크롤
    window.scrollTo(0, 0);

    // 섹션 전환 시 햄버거 메뉴 닫기 (모바일 전용)
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');
    if (nav && nav.classList.contains('active')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
}

// 사이트 기본 정보 설정
function initSite() {
    document.title = SITE_CONFIG.title;
    document.getElementById('site-logo').textContent = SITE_CONFIG.logoText;

    // Contact 정보 설정 (있을 경우만)
    const contactName = document.getElementById('contact-name');
    const contactEmail = document.getElementById('contact-email');
    if (contactName) contactName.textContent = SITE_CONFIG.artistName;
    if (contactEmail) contactEmail.textContent = SITE_CONFIG.email;
}

// 네비게이션 로직 (이벤트 위임 방식으로 간소화)
function initNavigation() {
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');

    // 햄버거 토글
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // 로고 클릭 시 홈으로 이동 (해시 변경)
    document.getElementById('site-logo').addEventListener('click', () => {
        window.location.hash = 'home';
    });
}



// 전역 데이터 관리
let FINAL_WORKS = [];
let HOME_WORK = null; // 홈 화면에 표시할 대표 작품
let CV_EDUCATION = [];
let CV_EXHIBITIONS = [];
let CV_AWARDS = [];

// 데이터 준비
function prepareData() {
    if (typeof WORKS_CSV !== 'undefined' && WORKS_CSV.trim()) {
        FINAL_WORKS = WORKS_CSV.trim().split('\n').filter(line => line.trim()).map((line, index) => {
            const parts = line.split(/[,\t]/).map(p => p.trim());
            const [title, size, material, year, imgPath, isHomeRaw] = parts;

            // 이미지 파일명이 여러 개인 경우 처리 ( / 로 구분)
            const images = imgPath.includes(' / ')
                ? imgPath.split(' / ').map(img => img.trim().startsWith('http') ? img.trim() : `images/${img.trim()}`)
                : [imgPath.startsWith('http') ? imgPath : `images/${imgPath}`];

            const work = {
                id: `csv-${index}`,
                title, size, material, year,
                images: images,
                image: images[0], // 첫 번째 이미지를 썸네일로 사용
                isHome: isHomeRaw === 'Home' || isHomeRaw === '홈' || isHomeRaw === '대표'
            };

            if (work.isHome) HOME_WORK = work;
            return work;
        });

        // 만약 대표 이미지로 설정된 게 없다면 첫 번째 작품을 사용
        if (!HOME_WORK && FINAL_WORKS.length > 0) {
            HOME_WORK = FINAL_WORKS[0];
        }
    }

    const parseCSV = (csv) => csv?.trim() ? csv.trim().split('\n').map(l => l.trim()).filter(Boolean) : [];
    CV_EDUCATION = parseCSV(CV_EDUCATION_CSV);
    CV_EXHIBITIONS = parseCSV(CV_EXHIBITIONS_CSV);
    CV_AWARDS = parseCSV(CV_AWARDS_CSV);
}

// 무한 스크롤 공통 로직
function setupInfiniteScroll(containerId, sentinelId, data, batchSize, renderFn) {
    const container = document.getElementById(containerId);
    const sentinel = document.getElementById(sentinelId);
    let loadedCount = 0;

    const loadBatch = () => {
        const batch = data.slice(loadedCount, loadedCount + batchSize);
        batch.forEach(item => container.appendChild(renderFn(item)));
        loadedCount += batch.length;
    };

    // 초기 데이터 로드 (첫 번째 배치는 즉시 로드)
    loadBatch();

    new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && loadedCount < data.length) loadBatch();
    }, {
        threshold: 0.1,
        rootMargin: '200px' // 미리 로드하여 끊김 방지
    }).observe(sentinel);
}

// Home: 대표 이미지 하나만 표시
function initHomeFeed() {
    const container = document.getElementById('home-feed');
    const sentinel = document.getElementById('sentinel-home');

    // 무한 스크롤 무력화 (센티넬 제거)
    if (sentinel) sentinel.parentNode.removeChild(sentinel);

    if (HOME_WORK) {
        const div = document.createElement('div');
        div.className = 'home-feed-item';
        div.innerHTML = `<img src="${HOME_WORK.image}" alt="${HOME_WORK.title}">`;
        container.appendChild(div);
    }
}

// Works: 무한 스크롤
function initWorks() {
    setupInfiniteScroll('works-grid', 'sentinel', FINAL_WORKS, 12, (work) => {
        const div = document.createElement('div');
        div.className = 'work-item';

        const thumbWrapper = document.createElement('div');
        thumbWrapper.className = 'work-thumb-wrapper';
        thumbWrapper.innerHTML = `<img src="${work.image}" alt="${work.title}" loading="lazy">`;

        const titleDiv = document.createElement('div');
        titleDiv.className = 'work-title-small';
        titleDiv.textContent = work.title; // textContent 사용

        div.appendChild(thumbWrapper);
        div.appendChild(titleDiv);

        div.onclick = () => openModal(work);
        return div;
    });
}

// CV 렌더링
function initCV() {
    const sections = [
        { title: 'Education', data: CV_EDUCATION },
        { title: 'Exhibitions', data: CV_EXHIBITIONS },
        { title: 'Awards', data: CV_AWARDS }
    ];

    const container = document.getElementById('cv-content');
    container.innerHTML = ''; // 초기화

    sections.forEach(s => {
        if (s.data.length > 0) {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'cv-section';

            const h3 = document.createElement('h3');
            h3.textContent = s.title;
            sectionDiv.appendChild(h3);

            const ul = document.createElement('ul');
            ul.className = 'cv-list';

            s.data.forEach(item => {
                const li = document.createElement('li');

                // 줄바꿈 시 타이틀 위치에 맞추기 위해 텍스트 분리
                let prefix = "";
                let content = item;

                if (s.title === 'Exhibitions' && item.includes(',')) {
                    // 전시의 경우 첫 번째 쉼표를 기준으로 나눔 (연도 구분, 전시제목...)
                    const commaIndex = item.indexOf(',');
                    prefix = item.substring(0, commaIndex + 1); // 쉼표 포함
                    content = item.substring(commaIndex + 1).trim();
                } else if (item.match(/^\d{4}/)) {
                    // 연도로 시작하는 경우 첫 공백을 기준으로 나눔
                    const spaceIndex = item.indexOf(' ');
                    if (spaceIndex > 0) {
                        prefix = item.substring(0, spaceIndex);
                        content = item.substring(spaceIndex + 1).trim();
                    }
                }

                if (prefix) {
                    const prefixSpan = document.createElement('span');
                    prefixSpan.className = 'cv-item-prefix';
                    prefixSpan.textContent = prefix;

                    const contentSpan = document.createElement('span');
                    contentSpan.className = 'cv-item-content';
                    contentSpan.textContent = content;

                    li.appendChild(prefixSpan);
                    li.appendChild(contentSpan);
                } else {
                    li.textContent = item;
                }

                ul.appendChild(li);
            });

            sectionDiv.appendChild(ul);
            container.appendChild(sectionDiv);
        }
    });
}

// Contact 메일 전송
function initContact() {
    document.getElementById('contact-email-btn').onclick = (e) => {
        e.preventDefault();
        location.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('[Portfolio Inquiry]')}`;
    };
}

// Modal 로직
function openModal(work) {
    const modal = document.getElementById('work-modal');
    const container = document.getElementById('modal-images-container');

    // 기존 이미지 삭제
    container.innerHTML = '';

    // 이미지들 추가
    if (work.images && work.images.length > 0) {
        if (work.images.length > 1) {
            container.classList.add('multi');
        } else {
            container.classList.remove('multi');
        }

        work.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = work.title;
            img.onclick = () => closeModal(); // 이미지 클릭 시 닫기
            container.appendChild(img);
        });
    }

    document.getElementById('modal-title').textContent = work.title;
    document.getElementById('modal-detail').textContent = `${work.material}, ${work.size}, ${work.year}`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('work-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function initModal() {
    const modal = document.getElementById('work-modal');
    window.onclick = (e) => { if (e.target === modal) closeModal(); };
}
