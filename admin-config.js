/**
 * ====================================================
 * 관리자 페이지 설정 파일 (admin-config.js)
 * ====================================================
 * 
 * ⚠️ 주의: 이 파일은 비밀번호를 포함합니다.
 *   GitHub에 공개 저장소라면 비밀번호가 외부에 노출될 수 있습니다.
 *   하지만 관리자 페이지 URL을 모르면 접근이 어렵고,
 *   GitHub PAT(토큰)는 이 파일에 저장되지 않으므로 실제 데이터는 보호됩니다.
 * 
 * [설정 방법]
 * 1. ADMIN_PASSWORD: 관리자 페이지 접속 비밀번호를 변경하세요.
 * 2. GITHUB_OWNER: GitHub 사용자명 (예: "hanjiyoo")
 * 3. GITHUB_REPO: 리포지토리 이름 (예: "artworks")
 * 4. GITHUB_BRANCH: 브랜치 이름 (보통 "main")
 */

const ADMIN_CONFIG = {
    // 🔑 관리자 페이지 접속 비밀번호 (원하는 비밀번호로 변경하세요)
    password: "admin1234",

    // 🐙 GitHub 리포지토리 정보
    github: {
        owner: "hanjiyoo",
        repo: "artworks",
        branch: "main",
    }
};
