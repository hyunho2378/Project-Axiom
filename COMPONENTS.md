# COMPONENTS.md — AXIOM Component Registry v2

> 생성 기준: A1~A8 완료 후 코드베이스 실측 (2026-05-12)
> 경로는 src/ 기준 상대 경로

---

## 컴포넌트 전체 목록

| 컴포넌트명 | 파일 경로 | 분류 | 주요 Props | 반응형 변형 | 3D 포함 | 의존 컴포넌트 |
|------------|-----------|------|-----------|------------|---------|--------------|
| AnalysisLoader | components/AnalysisLoader.jsx | Feature | onComplete | ❌ | ❌ | — |
| AuthModal | components/AuthModal.jsx | Feature | isOpen, onClose, onLoginSuccess | ✅ (바텀시트↔다이얼로그) | ❌ | — |
| BentoGrid | components/BentoGrid.jsx | Feature | language | ✅ | ❌ | — |
| ChronoBanner | components/ChronoBanner.jsx | Feature | className | ❌ | ❌ | — |
| Curations | components/Curations.jsx | Feature | language | ✅ | ❌ | — |
| EvolvingBlob | components/EvolvingBlob.jsx | 3D | step=0 | ❌ | ✅ | — |
| Starfield | components/EvolvingBlob.jsx | 3D | count=1200 | ❌ | ✅ | — |
| EvolvingParticles | components/EvolvingBlob.jsx | 3D | step=0, count=50 | ❌ | ✅ | — |
| Footer | components/Footer.jsx | Layout | — | ✅ (2→4col grid) | ❌ | — |
| Header | components/Header.jsx | Layout | onLoginClick, isLoggedIn, user | ✅ (햄버거↔상단nav) | ❌ | LanguageContext |
| Hero3D | components/Hero3D.jsx | 3D | — | ❌ | ✅ | Canvas (r3f) |
| HeroIntro | components/HeroIntro.jsx | Feature | — | ✅ (커서 hidden mobile) | ❌ | — |
| HowItWorks | components/HowItWorks.jsx | Feature | — | ✅ | ❌ | — |
| Manifesto | components/Manifesto.jsx | Feature | language | ❌ | ❌ | — |
| MissionSection | components/MissionSection.jsx | Feature | — | ✅ | ❌ | — |
| ProductFeedCard | components/ProductFeedCard.jsx | Feature | product | ❌ | ❌ | — |
| Scene3D | components/Scene3D.jsx | 3D | modelUrl, height, scale, position, rotation, isFixed, cameraPos, fov | ❌ | ✅ | useGLTF |
| ScrollToTop | components/ScrollToTop.jsx | UI Primitive | — | ❌ | ❌ | — |
| VideoSection | components/VideoSection.jsx | Feature | — | ✅ | ❌ | — |
| AboutCTA | components/about/AboutCTA.jsx | About | — | ❌ | ❌ | — |
| AboutHero | components/about/AboutHero.jsx | About | — | ✅ (커서 hidden mobile) | ❌ | — |
| Approach | components/about/Approach.jsx | About | — | ✅ (가로스크롤↔3col grid) | ❌ | — |
| Features | components/about/Features.jsx | About | — | ❌ | ❌ | — |
| Philosophy | components/about/Philosophy.jsx | About | — | ❌ | ❌ | — |
| Voices | components/about/Voices.jsx | About | — | ✅ (1col↔2col) | ❌ | — |
| About | pages/About.jsx | Page | — | ✅ | ❌ | AboutHero, Philosophy, Voices, Approach, Features, AboutCTA |
| Algorithm | pages/Algorithm.jsx | Page | — | ✅ | ❌ | — |
| Analysis | pages/Analysis.jsx | Page | — | ✅ | ✅ | EvolvingBlob, EvolvingParticles, Starfield, AnalysisLoader, ChronoBanner |
| AuraStory | pages/AuraStory.jsx | Page | — | ✅ | ❌ | — |
| BrandStory | pages/BrandStory.jsx | Page | — | ✅ | ❌ | — |
| Campaigns | pages/Campaigns.jsx | Page | — | ✅ | ❌ | — |
| Concierge | pages/Concierge.jsx | Page | user | ❌ | ❌ | — |
| CurationDetail | pages/CurationDetail.jsx | Page | — | ✅ | ❌ | — |
| Curations (page) | pages/Curations.jsx | Page | — | ✅ | ❌ | — |
| Dashboard | pages/Dashboard.jsx | Page | user, isLoggedIn | ✅ | ❌ | — |
| DataLab | pages/DataLab.jsx | Page | — | ✅ | ❌ | — |
| Diagnosis | pages/Diagnosis.jsx | Page | — | ✅ | ✅ | EvolvingBlob (legacy) |
| Home | pages/Home.jsx | Page | — | ✅ (CSS snap scroll) | ❌ | HeroIntro |
| HumanityDataMap | pages/HumanityDataMap.jsx | Page | — | ✅ | ❌ | — |
| Privacy | pages/Privacy.jsx | Page | — | ✅ | ❌ | — |
| ProductDetail | pages/ProductDetail.jsx | Page | — | ✅ | ❌ | — |
| ResearcherEditorial | pages/ResearcherEditorial.jsx | Page | — | ✅ | ❌ | — |
| Result | pages/Result.jsx | Page | — | ✅ (1col↔2col) | ✅ | EvolvingBlob, EvolvingParticles, Starfield, ProductFeedCard |
| Shop | pages/Shop.jsx | Page | — | ✅ | ❌ | — |
| TeamPage | pages/TeamPage.jsx | Page | — | ✅ | ❌ | — |

---

## 분류별 상세 스펙

### UI Primitive

#### ScrollToTop
- **설명**: 라우트 변경 시 스크롤 포지션을 최상단으로 리셋
- **Props**: 없음
- **사용 위치**: App.jsx 내부 Router 하위에 항상 마운트
- **의존**: useLocation (react-router-dom)

---

### Layout

#### Header
- **Props**: `onLoginClick: () => void`, `isLoggedIn: boolean`, `user: object | null`
- **기능**: sticky top-0, 스크롤 감지 배경 전환, 모바일 햄버거 메뉴, 언어 토글 (useLanguage), 현재 경로 밑줄 (layoutId="nav-underline")
- **메뉴 경로**: `MENU_PATHS = ['/', '/brand', '/analysis', '/curations', '/datalab']`
- **반응형**: ~md 햄버거, md~ 상단 inline nav
- **AnimatePresence**: 모바일 메뉴 열림/닫힘
- **외부 의존**: LanguageContext, contentData

#### Footer
- **Props**: 없음
- **반응형**: 2col (mobile) → 4col grid (md+)
- **포함 링크**: /curations, /analysis, /shop, /brand, /datalab, /editorial, /data-map, /team-dyt, /privacy
- **주의**: Home 페이지는 HomeLayout 사용 → 전역 Footer 제외. Footer는 Home 섹션5에 인라인 통합.

---

### Feature

#### AnalysisLoader
- **Props**: `onComplete: () => void`
- **동작**: 3단계 phase (각 1500ms, 합계 4500ms), 진행바 애니메이션, 완료 시 onComplete 콜백
- **phases**: `['피부 데이터를 수집하고 있습니다', '고유 피부 축을 분석하고 있습니다', '맞춤 솔루션을 구성하고 있습니다']`
- **AnimatePresence**: phase 텍스트 교체 (mode="wait")

#### AuthModal
- **Props**: `isOpen: boolean`, `onClose: () => void`, `onLoginSuccess: (user) => void`
- **탭**: 'login' | 'signup' (layoutId="tab-indicator")
- **인증 방식**: Google Identity Services (VITE_GOOGLE_CLIENT_ID) + 이메일/비밀번호
- **검증**: 이름 2자 이상, 이메일 @앞 6자 이상, 비밀번호 6자 이상
- **API**: `${API_URL}/api/auth/login`, `/api/auth/register`, `/api/auth/google`
- **AnimatePresence**: 모달 마운트/언마운트, 에러 메시지

#### BentoGrid
- **Props**: `language: 'ko' | 'en'`
- **내용**: 6 Aura Types / AI Analysis / Precision Matching / Personalization 카드
- **애니메이션**: useInView (once: true, margin: -100px)

#### ChronoBanner
- **Props**: `className: string` (기본 '')
- **동작**: 로컬 시간 기반 3가지 테마 자동 전환 (morning 06-11, daytime 11-17, night 17-06)
- **사용처**: Analysis 페이지 인트로 하단

#### Curations (component)
- **Props**: `language: 'ko' | 'en'`
- **동작**: 세로 스크롤 → 가로 이동 변환 (useScroll + useTransform x축)
- **주의**: pages/Curations.jsx (상품 그리드 필터 페이지)와 별개 컴포넌트

#### HeroIntro
- **Props**: 없음
- **기능**: 커스텀 커서 (모바일 hidden), 마우스 추적 시차 오브, "AXIOM" display 타이틀, 카테고리 라벨 3개 (Diagnosis · Curation · Ritual), MagneticButton → /analysis, 스크롤 인디케이터
- **호환성**: CSS snap scroll `scrollSnapAlign: 'start'`, GSAP 미사용 (framer-motion 대체)
- **접근성**: useReducedMotion 전면 적용

#### HowItWorks
- **Props**: 없음 (contentData 내부 사용)
- **내용**: 3단계 흐름 (Capture → Analyze → Prescribe), btn-primary CTA
- **아이콘**: 인라인 SVG (lucide-react 미사용)

#### Manifesto
- **Props**: `language: 'ko' | 'en'`
- **동작**: 세로 스크롤 → 텍스트 블록 순차 fade (sticky parallax, useScroll + useTransform)

#### MissionSection
- **Props**: 없음
- **의존**: contentData.mission

#### ProductFeedCard
- **Props**: `product: { nameKr, name, category, price, imageColor, tag, desc }`
- **크기**: w-56, aspect-ratio 5:6
- **이미지**: `/images/placeholder-product.jpg` (onError hide), imageColor 그라데이션 배경
- **hover**: scale 1.02, neon-cyan box-shadow, border → brand-600
- **아이콘**: Heart (lucide-react, size=13)

#### VideoSection
- **Props**: 없음
- **동작**: 스크롤 진입/이탈 opacity + scale 전환 (useScroll + useTransform)

---

### 3D

#### EvolvingBlob (default export)
- **Props**: `step: 0~10` (기본값 0)
- **내부 구조**: SphereGeometry + MeshDistortMaterial, Float wrapper, 11단계 STAGES 배열
- **step → 속성**: scale(0.8→최대), distort, speed, color, emissive, emissiveIntensity, metalness, roughness
- **Step 10**: color `#00E0FF`, emissive `#00E0FF`, full radiance — Result 초기 화면과 동일
- **의존**: @react-three/fiber (useFrame), @react-three/drei (MeshDistortMaterial, Float), three

#### Starfield (named export)
- **Props**: `count: number` (기본값 1200)
- **동작**: 랜덤 Points geometry, 별 배경 효과
- **사용처**: Analysis, Result

#### EvolvingParticles (named export)
- **Props**: `step: 0~10`, `count: number` (기본값 50)
- **사용처**: Analysis, Result

#### Hero3D
- **Props**: 없음
- **동작**: TheOrb (유리구체) + 파티클 + Bloom 후처리, btn-glass CTA 포함
- **Canvas**: @react-three/fiber, EffectComposer + Bloom (@react-three/postprocessing)
- **경고**: 현재 라우팅에서 직접 사용되지 않음 [UNVERIFIED — Home에서 HeroIntro로 교체됨]

#### Scene3D
- **Props**: `modelUrl: string`, `height: string`, `scale: number`, `position: [x,y,z]`, `rotation: [x,y,z]`, `isFixed: boolean`, `cameraPos: [x,y,z]`, `fov: number`
- **동작**: GLTF 모델 렌더, isFixed=false 시 Float 애니메이션
- **의존**: @react-three/drei (useGLTF, Float, Environment, ContactShadows, Html)

---

### About (신규 — A7)

#### AboutHero
- **동작**: 풀스크린, "We craft personal beauty axioms." 타이틀, 커서 트래킹, MagneticButton → /analysis
- **접근성**: useReducedMotion

#### Philosophy
- **동작**: 50:50 분할 레이아웃, 텍스트 단어별 stagger reveal (splitWords)
- **접근성**: useReducedMotion (reduced 시 일반 표시)

#### Voices
- **내용**: 4개 사용자 후기, 2열 그리드
- **hover**: y:-8 translate, borderColor #2A6885, boxShadow
- **접근성**: useReducedMotion

#### Approach
- **내용**: 6개 핵심 가치 (Craft, Detail, Personalization, Luxury, Science, Trust)
- **모바일**: 가로 스크롤 (overflow-x-auto + snap-x)
- **데스크탑**: 3열 그리드
- **hover**: 3D tilt (useMotionValue + useTransform rotateX/Y, perspective 800)
- **접근성**: useReducedMotion

#### Features
- **내용**: 3개 기능 (Personalized Curation, Data-Driven Recommendation, Immersive 3D Experience)
- **동작**: 아코디언 (AnimatePresence + layoutId, height 0↔auto)
- **접근성**: useReducedMotion

#### AboutCTA
- **동작**: "Ready to find your axiom?", MagneticButton → /analysis
- **접근성**: useReducedMotion

---

### Page

#### Home (`/`)
- **레이아웃**: HomeLayout (전역 Header/Footer 제외, 섹션5에 Footer 인라인)
- **구조**: CSS snap scroll (5섹션, h-screen, overflow-y-scroll)
  - 섹션1: `<HeroIntro />` (CSS snap 첫 화면)
  - 섹션2: "The Precision of Pure Science." (DATA INTELLIGENCE)
  - 섹션3: "A Three-Phase Diagnosis System." (AXIOM PROTOCOL, 3단계)
  - 섹션4: 추가 콘텐츠 섹션
  - 섹션5: 마지막 섹션 (인라인 Footer 포함)
- **상태**: useLanguage (ko/en), 언어 토글

#### Analysis (`/analysis`, `/diagnosis`, `/skin-analysis`)
- **phases**: `'intro'` → `'gender'` → `'age'` → `'quiz'` → `'loading'` → navigate('/result')
- **blob step 매핑**: intro=0, gender=1, age=2, quiz=3~9(진행률), loading=9
- **상태**: quizPhase, currentQuestion, answers, userData, isAnimating, selectedOption, resultData
- **진단 로직**: `analyzeSkin(answers)` → oil/sensitivity 퍼센트 → 피부 타입 매핑
- **API**: `POST ${API_URL}/api/surveys/submit` (실패해도 진행)
- **데이터**: `questions.js` (10문항, oiliness 6개 + sensitivity 4개)
- **이탈**: navigate('/result', { state: resultData })

#### Result (`/result`)
- **진입 조건**: `state.skinTypeStr` 없으면 `<Navigate to="/analysis" replace />`
- **state 구조**: `{ skinTypeStr, description, products, oilPercent, sensPercent }`
- **blob**: step=10 고정 (A5 완료)
- **기능**: html2canvas receipt PNG 다운로드
- **상품 피드**: ProductFeedCard 가로 스크롤 캐러셀 (overflow-x-auto + snap-x)
- **링크**: `/curations/${product.id}` (CurationDetail이 아닌 ProductDetail 라우트)

#### Dashboard (`/dashboard`)
- **Props (page)**: user, isLoggedIn
- **주의**: `mockData` 하드코딩 (skinScore, skinMetrics, recommendations, savedProducts)
- **인증**: 전용 ProtectedRoute 없음, useEffect 리디렉션 방식

#### Curations (page) (`/curations`)
- **필터**: activeCategory, activeSkinType, currentPage (useState)
- **데이터**: ALL_PRODUCTS from productsData.js
- **링크**: `/curations/${product.id}` → ProductDetail

#### CurationDetail (미라우팅)
- `/curations/:id` 경로는 ProductDetail이 처리
- CurationDetail.jsx 파일은 존재하나 App.jsx 라우팅 없음 [UNVERIFIED — 삭제 필요 여부]

---

## 삭제된 컴포넌트

| 컴포넌트명 | 이유 |
|------------|------|
| MySpacePage | A4 — v2 설계에서 제거 |

---

## 미라우팅 페이지 파일

| 파일 | 상태 |
|------|------|
| BrandStory.jsx | App.jsx 라우팅 없음. About.jsx가 `/brand` 경로에서 About 역할 수행. |
| Diagnosis.jsx | 레거시. Analysis.jsx(`/analysis`)로 대체. App.jsx 라우팅 없음. |
| CurationDetail.jsx | 레거시. `/curations/:id` → ProductDetail이 처리. |

---

## 의존 관계도

```
App.jsx (Router)
├── Header (Layout)
│   └── LanguageContext
├── ScrollToTop
├── AuthModal
│   └── VITE_GOOGLE_CLIENT_ID
├── Home (/)
│   └── HeroIntro
│       └── MagneticButton (internal)
├── Analysis (/analysis)
│   ├── EvolvingBlob, EvolvingParticles, Starfield (3D)
│   ├── AnalysisLoader
│   └── ChronoBanner
├── Result (/result)
│   ├── EvolvingBlob, EvolvingParticles, Starfield (3D)
│   └── ProductFeedCard
├── About (/brand)
│   ├── AboutHero → MagneticButton (internal)
│   ├── Philosophy
│   ├── Voices
│   ├── Approach → TiltCard (internal)
│   ├── Features
│   └── AboutCTA → MagneticButton (internal)
├── Curations (/curations)
│   └── productsData.ALL_PRODUCTS
├── ProductDetail (/curations/:id, /shop/:id)
│   └── productsData.ALL_PRODUCTS
└── Footer (Layout)
```
