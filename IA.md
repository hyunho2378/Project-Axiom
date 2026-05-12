# IA.md — AXIOM Information Architecture v2

> 생성 기준: A1~A8 완료 후 App.jsx 실측 (2026-05-12)
> 실측 경로와 ROUTES.md 간 불일치 항목은 [불일치] 표시

---

## 화면 전체 목록

| # | 화면명 | 경로 | 파일 | 분류 | 진입 조건 | 주요 섹션 |
|---|--------|------|------|------|-----------|---------|
| 1 | Landing | `/` | Home.jsx | Public | 없음 | HeroIntro + 4섹션 + 인라인Footer |
| 2 | About | `/brand` | About.jsx | Public | 없음 | AboutHero + Philosophy + Voices + Approach + Features + AboutCTA |
| 3 | Aura Story | `/aura` | AuraStory.jsx | Public | 없음 | 브랜드 스토리 |
| 4 | Algorithm | `/algorithm` | Algorithm.jsx | Public | 없음 | glass-card 섹션 |
| 5 | Analysis | `/analysis` | Analysis.jsx | Public | 없음 | 5단계 quiz + 3D blob + AnalysisLoader |
| 6 | Analysis (alias) | `/diagnosis` | Analysis.jsx | Public | 없음 | Analysis와 동일 |
| 7 | Analysis (alias) | `/skin-analysis` | Analysis.jsx | Public | 없음 | Analysis와 동일 |
| 8 | Result | `/result` | Result.jsx | Public | state.skinTypeStr 필수 | 3D 결과 + 설명 + 상품 피드 |
| 9 | Curations | `/curations` | Curations.jsx | Public | 없음 | 카테고리 필터 + 상품 그리드 |
| 10 | Product Detail | `/curations/:id` | ProductDetail.jsx | Public | id 파라미터 | 상품 상세 |
| 11 | Shop | `/shop` | Shop.jsx | Public | 없음 | 전체 상품 |
| 12 | Shop Detail | `/shop/:id` | ProductDetail.jsx | Public | id 파라미터 | 상품 상세 |
| 13 | DataLab | `/datalab` | DataLab.jsx | Public | 없음 | 실시간 통계 API |
| 14 | Campaigns | `/campaigns` | Campaigns.jsx | Public | 없음 | 캠페인 목록 |
| 15 | Concierge | `/concierge` | Concierge.jsx | Public | 없음 | 채팅 인터페이스 |
| 16 | Dashboard | `/dashboard` | Dashboard.jsx | Protected* | 로그인 필요* | 피부 분석 대시보드 |
| 17 | Team | `/team-dyt` | TeamPage.jsx | Public | 없음 | 팀 소개 |
| 18 | Privacy | `/privacy` | Privacy.jsx | Public | 없음 | 개인정보처리방침 |
| 19 | Researcher Editorial | `/editorial` | ResearcherEditorial.jsx | Public | 없음 | 에디토리얼 |
| 20 | Humanity Data Map | `/data-map` | HumanityDataMap.jsx | Public | 없음 | 글로벌 통계 지도 |
| — | 없음 | `*` | — | Error | — | 404 라우트 없음 [미구현] |

> *Dashboard: 전용 ProtectedRoute 없음. 내부 useEffect 리디렉션 방식.

---

## [불일치] ROUTES.md vs 실측 App.jsx

| ROUTES.md 경로 | 실측 경로 | 실측 파일 | 비고 |
|---------------|----------|----------|------|
| `/about` | `/brand` | About.jsx | 경로명 불일치 — About.jsx가 `/brand`에 마운트 |
| `/product/:id` | `/curations/:id`, `/shop/:id` | ProductDetail.jsx | 두 경로가 동일 컴포넌트 |
| `/manifesto` | 없음 | — | 라우트 미존재 |
| `/aura-story` | `/aura` | AuraStory.jsx | 경로명 불일치 |
| `/profile` | 없음 | — | 라우트 미존재 |
| `/curation` | `/curations` | Curations.jsx | 경로명 불일치 |
| `/ritual` | 없음 | — | 라우트 미존재 |
| `*` (NotFound) | 없음 | — | 와일드카드 미구현 |

---

## 화면별 상세

### Landing (`/`)

진입 조건: 없음
레이아웃: HomeLayout — 전역 Header/Footer 제외, Header는 별도 sticky 포함, Footer는 섹션5 인라인
구조:
```
Home (CSS snap scroll, h-screen, overflow-y-scroll)
├── 섹션1 (snap-start): <HeroIntro /> — AXIOM 로고타입, Begin Analysis CTA
├── 섹션2 (snap-start): "The Precision of Pure Science." — DATA INTELLIGENCE
├── 섹션3 (snap-start): "A Three-Phase Diagnosis System." — AXIOM PROTOCOL (01·02·03)
├── 섹션4 (snap-start): 추가 콘텐츠
└── 섹션5 (snap-start): 마지막 섹션 + 인라인 Footer
```
이탈 경로:
- → `/analysis` (HeroIntro MagneticButton)
- → `/curations` (Footer 링크, 섹션 내 링크)
- → `/brand`, `/datalab` etc (Footer 링크)
상태 관리: useLanguage (ko/en), body.overflow hidden (snap scroll 격리)

---

### About (`/brand`)

> [불일치] ROUTES.md는 `/about`으로 기록. 실측은 `/brand`.

진입 조건: 없음
레이아웃: AppLayout (전역 Header + Footer)
구조:
```
About (/brand)
├── AboutHero — 풀스크린, 커서 트래킹, MagneticButton
├── Philosophy — 50:50 분할, 단어별 stagger
├── Voices — 4개 후기, 2열 glass card
├── Approach — 6개 핵심 가치, 3D tilt
├── Features — 3개 기능, 아코디언
└── AboutCTA — "Ready to find your axiom?", MagneticButton
```
이탈 경로:
- → `/analysis` (MagneticButton × 2 in AboutHero, AboutCTA)

---

### Analysis (`/analysis`)

진입 조건: 없음
레이아웃: AppLayout
구조:
```
Analysis
├── 3D Canvas (왼쪽 / 전체 배경)
│   ├── Starfield (count=1200)
│   ├── EvolvingParticles (step=진행률)
│   └── EvolvingBlob (step=진행률, 0~9)
├── ChronoBanner (intro 화면 하단)
└── 오른쪽 패널 (quizPhase 기반 전환)
    ├── 'intro':  SYSTEM READY + Begin Analysis 버튼
    ├── 'gender': 성별 선택 (男/女/기타)
    ├── 'age':    연령대 선택 + ← Back
    ├── 'quiz':   질문 0~9 (AnimatePresence mode="wait")
    │             각 질문: 3지선다, 선택 시 자동 다음
    └── 'loading': <AnalysisLoader onComplete={navigate('/result', {state})} />
```
진단 흐름:
```
submitQuiz(answers)
→ analyzeSkin(answers) [내부 함수]
  → oilScore / sensScore 계산 (questions.js 10문항)
  → mainType: 건성/복합성/수부지/중성/지성
  → subType: 비민감/민감주의/민감/과민
  → getSkinDescription(finalType)
→ getRecommendedProducts(finalType)
→ POST /api/surveys/submit (실패 무시)
→ setResultData + setQuizPhase('loading')
→ AnalysisLoader 4.5s 후 navigate('/result', {state: resultData})
```
상태: quizPhase, currentQuestion, answers, userData(gender, age), isAnimating, selectedOption, resultData

---

### Result (`/result`)

진입 조건: `useLocation().state.skinTypeStr` — 없으면 `<Navigate to="/analysis" replace />`
레이아웃: AppLayout
state 구조:
```js
{
  skinTypeStr: string,   // ex. "건성 · 민감"
  description: string,
  products: Product[],
  oilPercent: number,
  sensPercent: number,
}
```
구조:
```
Result
├── 상단 (2col grid, 1col on mobile)
│   ├── 왼쪽: EvolvingBlob (step=10 고정) + Starfield + Particles
│   └── 오른쪽: 진단 결과 (skinTypeStr, description, 바 그래프)
├── Receipt 다운로드 버튼 (html2canvas → PNG)
└── 하단: 상품 피드
    ├── "Prescribed Solutions" 헤더
    └── 가로 스크롤 캐러셀 (overflow-x-auto + snap-x)
        └── ProductFeedCard × n (Link to /curations/${id})
```
이탈 경로:
- → `/analysis` (다시하기 — [UNVERIFIED — 버튼 존재 여부])
- → `/curations/:id` (상품 카드 클릭)

---

### Dashboard (`/dashboard`)

진입 조건: 내부 useEffect — `localStorage.getItem('aura_token')` 없으면 navigate('/')
레이아웃: AppLayout
주의: mockData 하드코딩 (skinScore, skinMetrics, recommendations, savedProducts)
상태: user (prop), isLoggedIn (prop)

---

### Curations (`/curations`)

진입 조건: 없음
레이아웃: AppLayout
상태: activeCategory, activeSkinType, currentPage
데이터: ALL_PRODUCTS (25개)
이탈: → `/curations/:id` (상품 카드)

---

### DataLab (`/datalab`)

진입 조건: 없음
API: `${API_URL}/api/stats` (GET)
상태: stats(null), loading(true), error(null)
로딩 처리: loading=true 시 대체 UI 렌더

---

## 네비게이션 플로우 다이어그램

```
Landing (/)
  ├─ "Begin Analysis" → /analysis
  │     intro → gender → age → quiz (10문항)
  │     → loading (AnalysisLoader 4.5s)
  │     └─ /result
  │           ├─ ProductFeedCard → /curations/:id (ProductDetail)
  │           └─ [다시하기] → /analysis [UNVERIFIED]
  │
  ├─ GNB: /brand / /curations / /datalab / /analysis
  │
  ├─ Footer: /curations / /shop / /brand / /datalab / /editorial / /data-map / /team-dyt / /privacy
  │
  └─ Auth (Header 로그인 버튼)
        └─ AuthModal
              ├─ Google GIS (VITE_GOOGLE_CLIENT_ID) → /auth/callback [미라우팅]
              │     성공: localStorage 'aura_token' + 'aura_user' 저장
              │     → /dashboard
              └─ 이메일/비밀번호 → /api/auth/login or /api/auth/register
```

---

## Analysis → Result 3D 상태 인계

```
Analysis (quizPhase='quiz')
  → EvolvingBlob step = Math.min(3 + Math.round(currentQuestion/9 * 6), 9)

Analysis (quizPhase='loading')
  → EvolvingBlob step = 9 (loading 중 고정)
  → AnalysisLoader 4.5s

navigate('/result', { state: resultData })
  → Result 마운트
  → EvolvingBlob step={10} 고정 (re-animation 없음)
  → Step 10: color #00D4FF, emissive #00D4FF, scale 최대
```

---

## 레이아웃 구조

```
App.jsx
├── HomeLayout (Home 전용)
│   ├── Header (sticky, 별도)
│   └── children (Home — 내부 5섹션 snap scroll + 인라인 Footer)
└── AppLayout (나머지 전체)
    ├── Header
    ├── children (각 페이지)
    └── Footer
```

---

## 데이터 파일 목록

| 파일 | export | 설명 |
|------|--------|------|
| data/axiomData.js | SKIN_TYPES, getSkinDescription, getRecommendedProducts | 20종 피부 타입 설명 + 상품 매칭 로직 |
| data/productsData.js | ALL_PRODUCTS | 25개 제품 (id, name, nameKr, category, price, skinType, tag, desc, fullDesc, imageColor) |
| data/questions.js | questions | 10문항 (q1-q10, oiliness 6 + sensitivity 4), 점수: 0/5/10 |
| data/skinAnalysisQuestions.js | — | 레거시 문항 파일 (questions.js로 대체된 것으로 추정) [UNVERIFIED] |
| data/contentData.js | contentData | Landing/Header/HowItWorks 텍스트 데이터 (ko/en) |
| data/ui_text.json | — | UI 텍스트 상수 (loading 등) |
| context/LanguageContext.jsx | LanguageProvider, useLanguage | ko/en 언어 전환, localStorage 'aura-language' 저장 |
| config/api.js | API_URL | 서버 베이스 URL |
