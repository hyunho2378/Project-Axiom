# PROGRESS.md — AXIOM Build Status v2

> 기준: A1~A8 완료 후 코드베이스 실측
> 마지막 업데이트: 2026-05-12

---

## 구현 완료 (v2 기준)

- [x] Gemini API 제거 — axiomData.js 직결 (Analysis.jsx)
- [x] AnalysisLoader 4.5초 연출 (3단계 × 1500ms)
- [x] Analysis → Result 3D 상태 인계 (EvolvingBlob step=10 고정)
- [x] 폰트 2종 단순화 — BentonModDisp (font-title-en) + Pretendard Variable (font-title-ko, font-body)
- [x] Playfair Display Google Fonts 링크 제거 (index.html)
- [x] tailwind.config.js 전면 재작성 (전체 토큰 색상 + 2종 폰트 시스템)
- [x] 22개 파일 font-serif → font-title-en, font-mono → font-body 일괄 교체
- [x] 한글 heading 컨텍스트 수동 수정 (Result, ProductDetail, Privacy, CurationDetail)
- [x] ProductFeedCard 컴포넌트 신규 생성
- [x] Result 상품 피드 — 4열 그리드 → 가로 스크롤 캐러셀 교체
- [x] MySpacePage.jsx 삭제 (파일 + App.jsx Route + Diagnosis.jsx 버튼)
- [x] HeroIntro.jsx 신규 생성 (framer-motion, GSAP 대체)
- [x] Home.jsx 섹션1 — cinematic wordmark → HeroIntro 교체
- [x] About 페이지 전면 재구축 (6개 신규 컴포넌트)
  - AboutHero, Philosophy, Voices, Approach, Features, AboutCTA
- [x] A8 규칙 감사 완료 — localStorage 신규 0건, TS 0건, 삭제폰트 코드참조 0건, 이모지 0건

---

## 부분 구현

- [ ] **Dashboard** — mockData 하드코딩 사용 중
  - 현재: skinScore, skinMetrics, recommendations, savedProducts 전부 하드코딩 (src/pages/Dashboard.jsx:21)
  - 남은 작업: 실제 API 연동 (`GET /api/users/:id/dashboard`)

- [ ] **인증 흐름** — localStorage 임시 방식
  - 현재: `localStorage.getItem('aura_token')` / `aura_user` 키 직접 접근
  - Dashboard: useEffect 내 리디렉션 방식 (전용 ProtectedRoute 없음)
  - 남은 작업: zustand persist 마이그레이션, 전용 ProtectedRoute 구현

- [ ] **HumanityDataMap** — 실제 DB 통계 + mock 지역 노드 혼합
  - 현재: `/api/stats` 실제 연동, 지역별 사용자 수는 하드코딩
  - 남은 작업: 지역 데이터 실 DB 연동

---

## 미구현

- [ ] **JWT 인증** — 현재 서버에서 반환하는 토큰이 JWT인지 불명확. 클라이언트는 단순 문자열로 저장
- [ ] **/auth/callback 라우트** — Google OAuth 콜백 경로가 App.jsx에 존재하지 않음 [미등록]
- [ ] **404 NotFound 라우트** — App.jsx에 `path="*"` 와일드카드 없음
- [ ] **Resend API 이메일 발송** — DESIGN.md 언급, 코드 미발견
- [ ] **EmptyState 컴포넌트** — Curations/Shop/Dashboard 빈 결과 시 대체 UI 없음
- [ ] **ProtectedRoute 컴포넌트** — Dashboard만 useEffect 방식 보호, 전용 컴포넌트 미생성
- [ ] **MagneticButton 공유 컴포넌트** — HeroIntro, AboutCTA, AboutHero 3곳에 copy-paste
- [ ] **productsData.js 실제 이미지** — 현재 imageColor(그라데이션) + placeholder-product.jpg
- [ ] **skinAnalysisQuestions.js** — questions.js와 중복 추정, 정리 필요 [UNVERIFIED]

---

## 발견된 console.log 잔재

| 파일 | 줄 | 내용 |
|------|----|------|
| src/pages/Analysis.jsx | 66 | `console.log("DB save error", e)` — API 저장 실패 시 |
| src/pages/DataLab.jsx | 33 | `console.error("DataLab Fetch Error:", err)` |
| src/pages/Diagnosis.jsx | 124 | `console.log("🔥🔥🔥 FORCING REQUEST TO:", SUBMIT_URL)` — 레거시 |
| src/pages/Diagnosis.jsx | 125 | `console.log("📦 Payload:", ...)` — 레거시 |
| src/pages/Diagnosis.jsx | 140 | `console.log("✅ DB RESPONSE:", surveyData)` — 레거시 |
| src/pages/Diagnosis.jsx | 159 | `console.error("❌ SAVE FAILED:", error)` — 레거시 |
| src/pages/Result.jsx | 38 | `console.error('Receipt save failed:', e)` |

> Diagnosis.jsx는 레거시 미라우팅 파일이므로 낮은 우선순위.

---

## localStorage 사용 현황

| 파일 | 키 | 용도 | 허용 여부 |
|------|----|------|----------|
| src/context/LanguageContext.jsx | `'aura-language'` | ko/en 언어 설정 저장 | 기존 코드 유지 (DESIGN.md "절대금지"이나 pre-existing) |
| src/pages/App.jsx | `'aura_token'` | 인증 토큰 임시 저장 | 기존 코드 유지 (JWT 완성 전 임시) |
| src/pages/App.jsx | `'aura_user'` | 유저 정보 임시 저장 | 기존 코드 유지 (JWT 완성 전 임시) |

---

## 환경 변수 현황

| 변수명 | 파일 | 필수 여부 | 현황 |
|--------|------|----------|------|
| `VITE_GOOGLE_CLIENT_ID` | AuthModal.jsx | 필수 (Google OAuth) | .env 설정 필요 |
| API_URL | src/config/api.js | — | 하드코딩: `'https://project-axiom.onrender.com'` |

---

## 알려진 불일치

| 항목 | 문서 값 | 실측값 | 채택 |
|------|---------|--------|------|
| About 경로 | ROUTES.md `/about` | App.jsx `/brand` | 실측 `/brand` 우선 |
| Blob scale Step 10 | CLAUDE.md 4.8 | EvolvingBlob STAGES 코드 — 실측 | 실측 우선 |
| glass-card 배경 | DESIGN.md `rgba(10,10,10,0.6)` | index.css `linear-gradient(rgba(255,255,255,0.08)...)` | index.css 실측 우선 |
| btn-primary 색상 | tokens.js `#2A6885` | index.css `#3C7795` | index.css 실측 우선 |
| 아우라 경로 | ROUTES.md `/aura-story` | App.jsx `/aura` | 실측 `/aura` 우선 |

---

## 미라우팅 파일

| 파일 | 상태 | 권고 |
|------|------|------|
| src/pages/BrandStory.jsx | App.jsx 라우팅 없음 | 삭제 또는 라우트 등록 결정 필요 |
| src/pages/Diagnosis.jsx | App.jsx 라우팅 없음 (Analysis로 대체) | 삭제 권고 |
| src/pages/CurationDetail.jsx | App.jsx 라우팅 없음 (/curations/:id는 ProductDetail 처리) | 삭제 권고 |

---

## 다음 우선순위 권고 (v3)

1. **App.jsx 라우팅 정리**
   - `/auth/callback` 라우트 추가 (Google OAuth 콜백)
   - `path="*"` NotFound 라우트 추가
   - ROUTES.md 경로 불일치 수정 (`/about` → `/brand` 등)

2. **미라우팅 레거시 파일 삭제**
   - BrandStory.jsx, Diagnosis.jsx, CurationDetail.jsx

3. **MagneticButton 공유 컴포넌트 추출**
   - 3곳 copy-paste → `src/components/MagneticButton.jsx` 단일화

4. **Dashboard 실 데이터 연동**
   - mockData 제거, API 연동

5. **ProtectedRoute 구현**
   - zustand persist 마이그레이션과 동시 진행

6. **productsData.js 실제 상품 이미지 교체**
   - imageColor 그라데이션 → 실제 제품 이미지

7. **console.log 정리**
   - Analysis, Result, DataLab (Diagnosis는 파일 삭제로 자동 해결)
