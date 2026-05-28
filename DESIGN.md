# DESIGN.md — AXIOM Design System v2

> 진실 소스: `src/tokens.js`
> 이 문서는 tokens.js의 의사결정 근거와 사용 규칙을 설명한다.
> 색상·간격·폰트 값을 직접 수정할 때는 tokens.js를 수정한다.

---

## 1. 플랫폼 확정

| 항목 | 값 |
|------|-----|
| 타입 | **B형 반응형 웹** |
| 기준 뷰포트 | 320px ~ 2560px 전 구간 |
| 예외 | Home 페이지만 CSS Snap Scroll (5섹션, window-isolated) |
| 프레임워크 | React 18.2.0 + Vite 5.0.0 |
| 스타일링 | Tailwind CSS 3.3.5 + tokens.js |
| 배포 | Vercel (FE) + Render (BE) |

---

## 2. 색상 팔레트

### Void — 배경 계층

| 토큰 | HEX | 역할 | 사용 위치 |
|------|-----|------|-----------|
| `colors.void.deepest` | `#000000` | 절대 블랙 | Three.js 씬 배경 |
| `colors.void.deep` | `#03070a` | 메인 배경 | Landing, Analysis |
| `colors.void.base` | `#05080a` | 표준 배경 | 전 페이지 기본 |
| `colors.void.dark` | `#050505` | Tailwind `void` | 섹션 배경 |
| `colors.void.light` | `#0A0A0A` | Tailwind `void-light` | 카드 배경 |
| `colors.void.lighter` | `#121212` | Tailwind `void-lighter` | hover 배경 |

### Brand Blue — 브랜드 딥 블루

| 토큰 | HEX | 역할 |
|------|-----|------|
| `colors.brand.900` | `#082B35` | blob Step 0~2, 글로우 기저 |
| `colors.brand.800` | `#0B3545` | blob Step 3~4 |
| `colors.brand.700` | `#1E5672` | blob Step 5~6, 브랜드 포인트 |
| `colors.brand.600` | `#2A6885` | **주 액센트** — 버튼, 언더라인, 글로우 |
| `colors.brand.500` | `#3C7795` | 보조 액센트 |
| `colors.brand.400` | `#5A9AB5` | Mist — 보조 텍스트, 테두리 |
| `colors.brand.300` | `#8AAEC0` | 비활성 텍스트 |
| `colors.brand.200` | `#A0D4E8` | blob Step 7~8 |
| `colors.brand.100` | `#C0F0FF` | blob Step 9~10 |

### Neon

| 토큰 | HEX | 역할 |
|------|-----|------|
| `colors.neon.cyan` | `#00D4FF` | blob Step 10 emissive, Analysis 터미널, 주 글로우 |
| `colors.neon.cyanBright` | `#00E0FF` | hover 강조, 선택 상태 |

### UI 텍스트 & 테두리

| 토큰 | HEX | 역할 |
|------|-----|------|
| `colors.ui.textPrimary` | `#FFFFFF` | 기본 텍스트 |
| `colors.ui.textSecondary` | `#8AAEC0` | 부제목, 설명 |
| `colors.ui.textMuted` | `#5A9AB5` | 비활성, placeholder |
| `colors.ui.border` | `#222222` | 기본 테두리 (YSL 얇은 선) |
| `colors.ui.borderSubtle` | `#1E5672` | 활성 테두리 |
| `colors.ui.divider` | `#0B3545` | 섹션 구분선 |

---

## 3. 타이포그래피

### 폰트 패밀리 — 2종 전용

> Playfair Display, 시스템 모노 폰트 전부 삭제. BentonModDisp + Pretendard만.

| 역할 | 폰트 | 웨이트 |
|------|------|--------|
| 영문 타이틀 | BentonModDisp | Semibold 600 |
| 한글 타이틀 | Pretendard Variable | Semibold 600 |
| 영문 본문 | Pretendard Variable | Regular 400 |
| 한글 본문 | Pretendard Variable | Regular 400 |
| 코드 디스플레이 | Pretendard Variable | Regular 400 |

Tailwind config 적용:
```js
fontFamily: {
  'title-en': ['BentonModDisp', 'serif'],
  'title-ko': ['Pretendard Variable', 'sans-serif'],
  'body':     ['Pretendard Variable', 'sans-serif'],
}
```

### 사이즈 스케일

| 레벨 | 값 | 사용처 |
|------|----|--------|
| Display | `clamp(80px, 12vw, 200px)` | Hero "AXIOM" 로고타입 |
| H1 | `clamp(40px, 6vw, 80px)` | 페이지 메인 타이틀 |
| H2 | `clamp(28px, 4vw, 56px)` | 섹션 타이틀 |
| H3 | `clamp(22px, 3vw, 40px)` | 서브 타이틀 |
| H4 | `clamp(18px, 2.5vw, 28px)` | 카드 타이틀 |
| Body Lg | `18px` | 리드 문장 |
| Body | `16px` | 기본 본문 |
| Body Sm | `14px` | 캡션, 설명 |
| Caption | `12px` | 레이블, 뱃지 |

### 행간 (Line-height)

| 구간 | 비율 | 적용 대상 |
|------|------|----------|
| Title Small | 1.3 | 타이틀 ~24px 이하 |
| Title Large | 1.4 | 타이틀 32px 이상 |
| Body Small | 1.2 | 본문 ~14px 이하 |
| Body Large | 1.25 | 본문 16px 이상 |

### 자간 (Letter-spacing)

| 적용 대상 | 값 |
|----------|-----|
| 전 타이틀 | `0em` |
| 전 본문 | `0em` |

---

## 4. 간격 시스템

4pt 배수 기준. Tailwind 기본 스케일 사용 + custom spacing 필요 시 tokens.js 추가.

```
4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128 (px)
```

---

## 5. 브레이크포인트

| 이름 | 값 | 기준 |
|------|----|------|
| xs | 320px | 구형 소형 폰 |
| sm | 390px | iPhone 14 |
| md | 768px | 태블릿 세로 |
| lg | 1024px | 태블릿 가로 / 소형 노트북 |
| xl | 1280px | 일반 노트북 (컨텐츠 max-width) |
| 2xl | 1440px | 와이드 노트북 |
| 3xl | 1920px | FHD 모니터 |
| 4xl | 2560px | QHD / 울트라와이드 |

### 네비게이션 변형

| 구간 | 패턴 |
|------|------|
| ~md | 햄버거 메뉴 |
| md~ | 상단 sticky header |

### 모달 변형

| 구간 | 패턴 |
|------|------|
| ~md | 바텀시트 슬라이드업 |
| md~ | 중앙 다이얼로그 (max-width 560px) |

---

## 6. 컴포넌트 스타일 규칙

### 글래스모피즘 (Glass Card)

```css
/* glass-card 클래스 (index.css) */
background: rgba(10, 10, 10, 0.6);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 14px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

### 버튼

| 종류 | 스타일 | 사용처 |
|------|--------|--------|
| `btn-primary` | bg `#2A6885`, hover bg `#3C7795`, glow `0 0 20px rgba(42,104,133,0.4)` | 주 CTA |
| `btn-glass` | glass-card 기반, border `#222`, hover border `#2A6885` | 보조 액션 |
| Magnetic Button | Framer Motion `useMotionValue` + translate | Hero CTA, About CTA |

### 테두리 규칙

- 기본: `1px solid #222222`
- 활성/hover: `1px solid #1E5672`
- 글로우 상태: `1px solid #2A6885` + `box-shadow: 0 0 32px rgba(0,212,255,0.3)`

### 네비게이션 바

```css
background: rgba(3, 7, 10, 0.85);
backdrop-filter: blur(20px);
border-bottom: 1px solid rgba(255, 255, 255, 0.04);
position: sticky;
top: 0;
z-index: 50;
```

---

## 7. 3D Blob 진화 단계 스펙

> Step 10 상태 = Result 페이지 초기 화면 (A5 적용)

| Step | 색상 | Emissive | Scale | 설명 |
|------|------|----------|-------|------|
| 0 | `#082B35` | `#000000` | 1.0 | 디폴트 — 질문 전 |
| 1~2 | `#082B35` → `#0B3545` | `#082B35` | 1.2 | 초기 질문 |
| 3~4 | `#0B3545` → `#1E5672` | `#0B3545` | 1.6 | 데이터 축적 |
| 5~6 | `#1E5672` → `#2A6885` | `#1E5672` | 2.0 | 중간 단계 |
| 7~8 | `#2A6885` → `#A0D4E8` | `#2A6885` | 2.6 | 고단계 |
| 9 | `#A0D4E8` → `#C0F0FF` | `#A0D4E8` | 3.0 | 거의 완성 |
| **10** | **`#00D4FF`** | **`#00D4FF`** | **3.5** | **완성된 축 — Result 초기 화면 동일** |

Scale 3.5 = 코드베이스 실측값. CLAUDE.md 명시 4.8은 불일치 → 실측 우선.

---

## 8. 접근성 (WCAG 2.1 AA)

- 색상 대비: 일반 텍스트 최소 4.5:1 / UI 컴포넌트 최소 3:1
- 모든 이미지 alt 텍스트 필수
- 모든 인터랙티브 요소 `focus-visible` 스타일 필수
- 키보드 네비게이션 완전 지원
- `prefers-reduced-motion` 미디어 쿼리 대응 필수 (Framer Motion / GSAP 애니메이션 전부)

---

## 9. 절대 금지

- `localStorage` / `sessionStorage` 직접 사용
- TypeScript (JSX 전용)
- 색상·간격·폰트 컴포넌트 내 하드코딩
- 이모지 아이콘 (lucide-react 또는 inline SVG만)
- BentonModDisp / Pretendard 이외 폰트 추가
- 320px ~ 2560px 구간 레이아웃 깨짐


### 아이콘 라이브러리

기본 사용 (필수)
- lucide-react — https://lucide.dev
  모든 인터페이스 아이콘은 여기서만 가져온다.

보조 허용 (사용 시 사용자 사전 승인 필요)
- Bootstrap Icons — https://icons.getbootstrap.com
- react-icons — https://react-icons.github.io/react-icons
- Heroicons — https://heroicons.com

규칙
- 한 페이지 내에서 아이콘 라이브러리 섞어 쓰지 않는다. 보조 라이브러리 도입 시 해당 페이지 내 모든 아이콘을 동일 라이브러리로 통일한다.
- AGENT는 임의로 보조 라이브러리 도입 금지. 사용자 승인 후에만 추가.
- 아이콘 사이즈 16 / 20 / 24 / 32 / 48px 다섯 단계만 사용. 임의 사이즈 금지.
- 아이콘 색상은 정의된 텍스트 토큰 (text-text-pri, text-text-sec, text-text-meta, text-primary, text-white) 중 하나만 사용.

### 일러스트 라이브러리

허용
- unDraw — https://undraw.co/illustrations
  컬러 변경 가능한 SVG 일러스트.

규칙
- 일러스트 사용 위치는 EmptyState, 가입/로그인 페이지, 온보딩 화면, 404/500 에러 페이지로 한정.
- 카드 그리드, 거점 상세, 패키지 상세 등 콘텐츠 페이지에서 일러스트 사용 금지.
- 일러스트 + 사진 한 화면 혼용 금지. 둘 중 하나만.
- 일러스트 메인 컬러는 프라이머리 #60A5FA 또는 흑백으로 통일. unDraw에서 다운로드 시 컬러를 #60A5FA로 변경한 후 사용. 알록달록한 다색 일러스트 절대 금지.
- 일러스트 파일은 SVG로 저장하여 `client/public/images/illustrations/` 에 보관.
