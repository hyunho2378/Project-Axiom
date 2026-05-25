# PROGRESS.md — 강릉페이 포트폴리오 웹사이트 진행 기록

## 완료된 STEP

### STEP 1 — 부트스트랩 + Hero (완료)
- package.json / vite.config.js / tailwind.config.js / index.html
- src/tokens/web.js (color / font / type / layout 토큰)
- src/lib/useReveal.js · useParallax.js · useCountUp.js
- src/components/Nav.jsx (sticky, blur, iOS/Android CTA)
- src/sections/Hero.jsx
  - 좌텍스트 / 우폰2대(iOS z-index2 rotate-6deg, Android z-index1 translateY-40px rotate8deg, marginLeft overlap)
  - 하단 브랜드 블루 PROJECT DETAIL 메타블록 (STATS 카운터업 + 텍스트 메타)
- 빌드: 33 modules, 0오류

### STEP 2 — 02 ProjectOverview + 03 ServiceAnalysis + 04 TheTwist (완료)
- src/sections/ProjectOverview.jsx
  - eyebrow "Project Overview"
  - 영문 대헤드라인 clamp(40px,5vw,80px) / weight 800 / lh 1.22
  - 국문 부제: "강릉시 지역화폐 강릉페이를 처음부터 다시 설계했습니다."
  - 팀 메타: TEAM 마카모예 / PERIOD 2026.03.29~04.06 / PRESENTED 2026.05.31
  - background: color.white / 스크롤 reveal
- src/sections/ServiceAnalysis.jsx
  - eyebrow "Service Analysis"
  - 헤드라인: "강릉페이, 써보셨나요?"
  - 사진 placeholder 3장 (color.line, aspectRatio 2/3) + 레이블 (10% 캐시백 / 지역 한정 / 충전식 구조)
  - 카드 스태거 0.1s 간격 reveal
  - background: color.bg
- src/sections/TheTwist.jsx
  - 텍스트 중앙 정렬
  - eyebrow "The Twist"
  - 헤드라인: "리서치 도중, 강릉페이 앱이 / 전면 [리뉴얼]됐습니다." (리뉴얼 = color.brand)
  - 본문 (max-width 560px, centered): 3줄 인사이트 선별 스토리
  - background: color.white / 스크롤 reveal
- src/App.jsx 업데이트 (3섹션 추가)
- 빌드: 36 modules, 0오류

---

### STEP 3 — 05 DeskResearch + 06 UserResearch (완료)
- src/sections/DeskResearch.jsx
  - id="research" (Nav 앵커)
  - eyebrow "Desk Research"
  - 헤드라인: "10% 캐시백, 강력한 혜택. 그런데 왜 안 쓸까?"
  - 경쟁 비교표 4행 5열: 항목/강릉페이(brand강조)/삼성페이/토스/카카오페이
    - 강릉페이 열: header=color.brand, cells=color.brandPale+color.brand 텍스트
    - 테이블 border+overflow:hidden 카드 처리
  - 가로 타임라인: 카카오페이(3/23)→네이버페이(4/13)→삼성페이예정(7~8월, brand색)
  - 3단계 scroll reveal (헤더·테이블·타임라인)
  - background: color.bg
- src/sections/UserResearch.jsx
  - id="user-research"
  - eyebrow "User Research"
  - 헤드라인: "세 가지 방법으로 사용자를 만났습니다."
  - useCountUp 3개: 68(1500ms)·6(1200ms)·4(900ms) — clamp(60px,8vw,120px)/800/brand
  - 라벨 14px/inkMuted + 한 줄 설명 13px/inkFaint
  - 조사기간: 2026.03.29 — 04.06
  - background: color.white
- 빌드: 38 modules, 0오류

### STEP 4 — 07 ServiceSafari + 08 AffinityDiagram (완료)
- src/sections/ServiceSafari.jsx
  - id="safari" / background: color.bg
  - eyebrow "Service Safari"
  - 헤드라인: "사용자의 손가락이 멈추는 곳을 기록했습니다."
  - 5개 미션 세로 리스트: 번호(clamp(36px,4vw,56px)/brand) + 미션명(h3) + 결과(14px/inkMuted) + 인용(13px/italic/inkFaint)
  - 인용 데이터 없음 → '인용 추후 기입' 플레이스홀더 (SETUP §8 실제값만 원칙 준수)
  - 핵심 수치 3개 (clamp(40px,5vw,72px)/brand): 0명·0명·62.5%
  - 3단계 reveal (헤더·리스트·수치)
- src/sections/AffinityDiagram.jsx
  - id="affinity" / background: color.white
  - eyebrow "Affinity Diagram"
  - 헤드라인: "87개 메모에서 5개의 패턴이 나왔습니다."
  - 5클러스터 세로 리스트: 대형 레터(clamp(64px,8vw,100px)) + 클러스터명(h3) + 설명(caption)
  - 클러스터 A: letter/name = color.brand, border-left = color.brand (발화 최다 강조)
  - 0.08s 스태거 reveal
  - 설명 텍스트는 SETUP §6 §07·08 INSIGHTS 데이터에서 파생
- 빌드: 40 modules, 0오류

### STEP 5 — 09 KeyInsights (완료)
- src/sections/KeyInsights.jsx
  - id="insights" (Nav 앵커)
  - 인사이트 3개 = 독립 div 3개 (카드 금지)
  - 배경 숫자: position:absolute / fontSize clamp(100px,14vw,200px) / color.brand / opacity 0.08 / zIndex 0
  - 컨텐츠: position:relative / zIndex 1 / 각자 useReveal(threshold:0.05)
  - 배경 순서: color.bg → color.white → color.bg (교체)
  - 헤드라인: clamp(32px,4vw,60px) / weight 800 / lh 1.22
  - INSIGHT 02 수치 강조: "62.5%" clamp(80px,10vw,140px)/brand
  - INSIGHT 03 수치 강조: "4인 전원" clamp(80px,10vw,140px)/brand
  - 인용: borderLeft 3px brand + italic
  - UR 태그: brandPale bg + brand 텍스트 pill
  - 빌드: 41 modules, 0오류

### STEP 6 — 10 AS-IS AUDIT + 11 PERSONA + 12 USER JOURNEY MAP (완료)
- src/sections/AsIsAudit.jsx
  - id="audit" / background: color.bg
  - eyebrow "AS-IS AUDIT"
  - 헤드라인: "리뉴얼 이후에도 살아남은 구조적 결함"
  - 좌: 스크린샷 placeholder (grayscale, 9:16, 이미지 교체 예정)
  - 우: POINT 01·02·03 (번호 brand / 제목 h3 / 본문 / 휴리스틱 warn 태그)
  - 하단: 6건 위반 칩 (N#2 N#4 N#6 N#10 S#3 S#8 / warn 색)
  - 3단계 reveal (헤더·바디·위반칩)
- src/sections/Persona.jsx
  - id="persona" / background: color.white
  - eyebrow "PERSONA"
  - Primary (brandPale bg + brand border-left): 시니어 5060 — 핵심동기 / 페인포인트 3개
  - Secondary (bg): 2030 청년 — 이탈트리거 / 재유입조건
  - Reference 2개 (소상공인 / 여행객): borderTop line + 한 줄씩
  - 4단계 reveal (헤더·primary·secondary·ref)
- src/sections/UserJourneyMap.jsx
  - id="journey" / background: color.bg
  - eyebrow "USER JOURNEY MAP"
  - 5단계 grid (STAGE 01~05): STAGE번호 / 단계명 / 행동 / PROBLEM(warn) / IMPROVE(brand)
  - 하단 감정곡선: SVG viewBox 0 0 100 64 / 베지어 곡선 / brandPale fill + brand stroke
  - 데이터포인트 5개 (흰 원 + brand stroke) / 그리드라인 3개
  - 감정값: 0.55→0.3→0.15→0.45→0.65 (낮아졌다가 올라오는)
  - overflowX:auto minWidth 560 (모바일 가로스크롤)
- 빌드: 44 modules, 0오류

### STEP 7 — 13 DESIGN DIRECTION + 14 UX CONCEPT (완료)
- src/sections/DesignDirection.jsx
  - id="direction" / background: color.white
  - eyebrow "DESIGN DIRECTION"
  - 헤드라인: "두 개의 축으로 방향을 잡았습니다."
  - 2열 grid (auto-fit minmax 280px): AXIS 01·02
  - 각 축: 대형 번호 clamp(72px,10vw,140px)/brand + h3 title + accent bar(3px/brand) + 아이템 리스트
  - 아이템: — brand dash + inkMuted 텍스트, borderBottom line 구분
  - 0.18s 스태거 reveal
- src/sections/UxConcept.jsx
  - 풀블리드 섹션 (100%, no side padding)
  - background: color.ink (사진 placeholder — backgroundImage 교체 예정)
  - 오버레이: color.photoOverlay (토큰 신규 추가: rgba(0,0,0,0.42))
  - 텍스트: 중앙 정렬, 전부 white
  - eyebrow: color.whiteA60 / headline: clamp(48px,8vw,120px)/800 / statement: whiteA60
  - "강릉 바다·하늘 사진 교체 예정" placeholder 라벨 (우하단, whiteA50)
  - threshold 0.15 reveal
- tokens/web.js: photoOverlay 토큰 추가 (rgba(0,0,0,0.42))
- 빌드: 46 modules, 0오류

### STEP 8 — 15 UX STRATEGY (완료)
- src/sections/UxStrategy.jsx
  - id="strategy" / background: color.bg
  - eyebrow "UX STRATEGY"
  - 헤드라인: "7가지 전략으로 구체화했습니다."
  - useState(null) → openId. toggle(id) = 같은 id면 닫음. 한 번에 하나만 열림.
  - 닫힌 상태: 번호(clamp(36px,4.5vw,64px)/brand/width:2.5ch) + 전략명(h3) + 한줄(14px/inkMuted) + "+"
  - "+" → rotate(45deg) = "×" 전환 (CSS transition 0.35s)
  - 열린 상태 maxHeight: 0↔800px, opacity: 0↔1, cubic-bezier 애니메이션
  - 확장 내용 paddingLeft: clamp(64px,8vw,120px) (번호+gap 근사 정렬)
  - quote 있는 경우: borderLeft 3px brand + italic 인용 + attribution
  - evidence만 있는 경우: white bg + line border 인라인 칩
  - solution 본문 + UR 태그 (brandPale pill)
  - 미니렌더 placeholder: 9:16 / color.line / "미니렌더 STEP 10 교체"
  - useReveal (헤더·리스트 0.06s 스태거)
  - aria-expanded 접근성 속성
  - 빌드: 47 modules, 0오류

### STEP 9 — 16 USER REQUIREMENTS (완료)
- src/sections/UserRequirements.jsx
  - id="requirements" / background: color.white
  - eyebrow "USER REQUIREMENTS"
  - 헤드라인: "사용자 행동 데이터에서 도출한 요구사항"
  - P0 / P1 두 그룹으로 분리
  - 그룹 헤더: 대형 번호(clamp(40px,5.5vw,72px)/brand or inkMuted) + MUST/SHOULD HAVE eyebrow + N개 항목 카운트
  - P0 헤더: border-bottom 2px brand / P1: 2px color.line
  - UrRow 컴포넌트: code(13px/800/brand/width:7ch) + desc(flex:1) + badge(pill)
  - P0 badge: brandPale bg + brand 텍스트 / P1 badge: bg + inkMuted 텍스트
  - 0.05s 스태거 row reveal
  - 빌드: 48 modules, 0오류

### STEP 10 — 17 DESIGN SYSTEM + 18 KEY SCREENS (완료)
- website/src/mini/ 폴더 신규 생성
  - minitokens.js: app 토큰 인터페이스(colors/typography/spacing/layout/shadow) — web.js에서 brand/ok/white/brandStrong/bg/line/font 가져옴
  - PhoneFrame.jsx / ChargeMini.jsx / RefundMini.jsx / HomeCoachMini.jsx: client 원본 복제 + import 경로만 ./minitokens.js로 수정
- src/sections/DesignSystem.jsx
  - id="design-system" / background: color.bg
  - eyebrow "DESIGN SYSTEM"
  - 헤드라인: "타이포그래피와 컬러 시스템"
  - 타이포 스케일 표: Display/H1/H2/H3/Lead/Body/Caption/Eyebrow 8행
    - 레이블(6ch/inkFaint) + 라이브 샘플(token 그대로 렌더) + 스펙(size·weight·ls 우측 정렬)
    - 0.06s 스태거 row reveal
  - 컬러 팔레트: auto-fill grid minmax(120px,1fr) / 9칩
    - Brand/BrandPale/BrandSky/Bg/White/Ink/InkMuted/Warn/Ok
    - swatch(rMd, height clamp 72~120px) + hex 라벨 + 이름
    - 밝은 색(White/Bg/BrandSky/BrandPale) border: line 처리
    - 0.05s 스태거 chip reveal
- src/sections/KeyScreens.jsx
  - id="key-screens" / background: color.white
  - eyebrow "KEY SCREENS"
  - 헤드라인: "전략이 화면이 되는 순간"
  - 3쌍 AS-IS ↔ TO-BE (S2 환불 / S3 캐시백 / S4 충전)
    - AS-IS: grayscale(1) + opacity 0.7 + scale 0.9 + 스크린샷 placeholder
    - TO-BE: PhoneFrame(scale 0.62, screenHeight 640) + 실제 미니렌더
    - S2 → RefundMini(step='list'), S3 → HomeCoachMini(variant='charge'), S4 → ChargeMini(step=1)
    - 각 쌍 하단: 문제/해결 caption
    - 0.1s 스태거 pair reveal
- 빌드: 1602 modules, 0오류

### STEP 11 — 19 THE BUILD (완료)
- src/sections/TheBuild.jsx
  - id="build" / background: color.bg (section 레벨)
  - eyebrow "THE BUILD" / 헤드라인: "7개의 전략이 실제로 작동합니다."
  - S1~S7 각각 독립 서브섹션, 교번 배경 (bg/white)
  - 공통: StratNum(opacity 0.12 대형), FlowRow(warn AS-IS 칩 → brand TO-BE 칩), ImplBadge, UrBadge
  - S1 (phone-right):  HomeCoachMini(charge) / 인터뷰 A2 인용 / UR-U01
  - S2 (phone-left):   RefundMini(list) / 관찰 4인 전원 실패 / UR-U03
  - S3 (cashback strip): 5단계 아이콘(Bus/Coffee/Utensils/ShoppingBag/Smartphone) 가로 스트립, Coffee 레벨 확인 예시 강조 / UR-F03
  - S4 (phone-right):  ChargeMini(step=1) / 인터뷰 B1 인용 / UR-U04
  - S5 (before/after): isOverLimit 검증 — AS-IS(버튼 활성) vs TO-BE(disabled+빨간 안내) 카드, 62.5% 수치 / UR-U05
  - S6 (dataviz):
    - eyebrow "THE BUILD 06"
    - "13,021" useCountUp(13021, 2400) clamp(80px,12vw,160px)/800/brand
    - "개 실제 가맹점 데이터" 서브텍스트
    - 인터뷰 A1 인용 ("여기 강릉페이 돼요?" 발화)
    - Google Maps 클러스터 이미지 자리 (placeholder)
    - 12카테고리 칩: 음식점·카페·편의점·숙박·관광·마트·의료·미용·교통·생활·교육·기타
    - QR 216개 매장 배지 / UR-U06
  - S7 (phone-right): HomeCoachMini(cardApply) / ScreenContainer getBoundingClientRect / UR-U03
  - 빌드: 1603 modules, 0오류

### STEP 12 — 20 DUAL DESIGN SYSTEM + 21 AI HARNESS + 22 PROCESS (완료)
- src/sections/DualDesignSystem.jsx
  - eyebrow "DUAL DESIGN SYSTEM" / 헤드라인 "iOS HIG × Android MD3"
  - 7행 비교표: StatusBar / 헤더 / 버튼 / 폰트 / 생체인증 / 바텀시트 / 스낵바
  - iOS열 borderLeft brand, Android열 borderLeft ok
  - 하단 getPlatform() 코드 스니펫 (background ink / white 텍스트)
  - id="dual-system" / background: color.bg
- src/sections/AiHarness.jsx
  - eyebrow "AI HARNESS" / 헤드라인 "AI는 How를 잘한다. 사람은 Why를 결정한다."
  - 메트릭 스트립: 199건 spacing 자동검증 / 13,643→13,021 / 30분 Face ID
  - 4블록 2×2 그리드:
    - 01 문서 기반 컨텍스트 주입 — 8개 사양문서 리스트
    - 02 병렬 에이전트 — BN/MY/FX → VR(44항목) 다이어그램
    - 03 모델 선택 기준 — Sonnet vs Opus 2컬럼 카드
    - 04 자기검증 의무 — 6항목 체크리스트 (ok 색상)
  - 클로징 인용문 (borderLeft brand)
  - id="ai-harness" / background: color.white
- src/sections/Process.jsx
  - eyebrow "PROCESS" / 헤드라인 "리서치 → 설계 → 구현"
  - Phase 1(리서치)→2(설계)→3(구현) 가로 타임라인 3컬럼
  - Phase 2 "29개 이슈 → 전부 해결" warn 강조
  - 휴리스틱 위반 6건 Before/After 표 (N#2/N#4/N#6/N#10/S#3/S#8)
    - BEFORE: borderLeft warn / AFTER: borderLeft ok
  - id="process" / background: color.bg
- App.jsx: DualDesignSystem + AiHarness + Process 임포트 및 렌더 추가
- 빌드: 1606 modules, 0오류

---

### STEP 13 — 23 USER TEST + 24 PROTOTYPE + 25 CREDITS·OUTRO (완료)
- src/sections/UserTest.jsx
  - eyebrow "USER TEST" / 헤드라인 "사용성 평가를 진행할 예정입니다."
  - dashed border placeholder (COMING SOON + 예정 항목 설명)
  - id="user-test" / background: color.white
- src/sections/Prototype.jsx
  - eyebrow "PROTOTYPE" / 헤드라인 "직접 사용해보세요."
  - CTA 2개 2컬럼: iOS (brand 강조) / Android (ok 강조)
  - 각 CTA: accent borderTop + pill 버튼 + hover 그림자
  - iOS href=https://gangneung-pay.vercel.app
  - Android href=https://gangneung-pay-android.vercel.app
  - id="prototype" / background: color.bg
- src/sections/Outro.jsx
  - background: color.brand (#1D4ED8) 풀블리드 — 사이트 유일 예외
  - 대형 "GANGNEUNG PAY" clamp(48px,8vw,128px)/800
  - 서브 "강릉시 지역화폐, 다시 태어나다" white 72% opacity
  - TEAM MAKAMOYE: 6인 3×2 그리드 (김민경 팀장 / 주현호 UX/UI·FE / 윤현아 / 김성경 / 조영은 / 김호진)
  - 하단: 한림대학교 디지털인문예술전공 · 2026
  - id="outro"
- App.jsx: UserTest + Prototype + Outro 임포트 및 렌더 추가
- 빌드: 1609 modules, 0오류

---

## 다음 STEP

### 이후 순서
- STEP 14: 반응형 320~2560 전수 + WCAG AA + 빌드0 + Vercel 배포
