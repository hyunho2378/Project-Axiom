# PATTERNS.md — AXIOM UI Patterns v2

> 생성 기준: A1~A8 완료 후 코드베이스 실측 (2026-05-12)
> 미구현 패턴은 [미구현] 표시. 코드 발췌는 실제 파일에서 직접 추출.

---

## 1. 카드 패턴

### Glass Card (글로벌 CSS 클래스)

**정의 위치**: `src/index.css:118`
**사용 위치**: Algorithm.jsx (glass-card), Concierge.jsx (glass-card), Hero3D.jsx (btn-glass)

```css
/* src/index.css */
.glass-card {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    box-shadow:
        inset 0px 1px 0px 0px rgba(255, 255, 255, 0.15),
        0 8px 24px -4px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
}
.glass-card:hover {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02));
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow:
        inset 0px 1px 0px 0px rgba(255, 255, 255, 0.2),
        0 12px 32px -4px rgba(0, 0, 0, 0.6);
    transform: translateY(-2px);
}
```

> 주의: DESIGN.md의 glassmorphism 값과 다름. DESIGN.md는 `bg: rgba(10,10,10,0.6)` 기준이나 index.css는 white/8 gradient. index.css 실측값이 현재 코드 기준.

### Glass Card (인라인 inline style — Voices, 타 컴포넌트)

**사용 위치**: Voices.jsx, Hero3D.jsx 내부

```jsx
// src/components/about/Voices.jsx:34
style={{ background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(12px)' }}
className="p-8 rounded-2xl border border-ui-border"
```

### Product Feed Card

**컴포넌트**: `src/components/ProductFeedCard.jsx`
**사용 위치**: Result.jsx 상품 캐러셀

```jsx
// 핵심 구조
<motion.div
    className="relative flex-shrink-0 w-56 rounded-2xl overflow-hidden bg-void-light border border-ui-border"
    whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(0, 212, 255, 0.15)', borderColor: '#2A6885' }}
    transition={{ duration: 0.25 }}
>
    {/* 이미지 영역: aspect-[5/6], imageColor 그라데이션 배경 */}
    {/* 정보 영역: category, nameKr, price (neon-cyan), desc */}
</motion.div>
```

**상품 필드**: id, nameKr, name, category, price, imageColor, tag, desc
**이미지**: `/images/placeholder-product.jpg` — onError hide (파일 없으면 imageColor 배경만 표시)

---

## 2. 리스트 패턴

### 상품 그리드 (Curations 페이지)

**사용 위치**: `src/pages/Curations.jsx`
**구조**: 카테고리 + 피부타입 필터 → 페이지네이션 → 상품 그리드
**필터 상태**: useState (activeCategory, activeSkinType, currentPage)

### Accordion List (Features)

**사용 위치**: `src/components/about/Features.jsx`
**구조**: 항목 클릭 → AnimatePresence height 0↔auto 확장
```jsx
<AnimatePresence>
    {activeIndex === i && (
        <motion.div
            layoutId={`feature-preview-${i}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
        >
            {/* preview image */}
        </motion.div>
    )}
</AnimatePresence>
```

---

## 3. 모달/오버레이 패턴

### AuthModal

**컴포넌트**: `src/components/AuthModal.jsx`
**트리거**: Header 로그인 버튼 → `isAuthModalOpen = true`
**반응형**: 모바일 바텀시트 형태, md+ 중앙 다이얼로그
**탭 인디케이터**: `layoutId="tab-indicator"` (framer-motion shared layout)
**에러**: useState(error) → AnimatePresence 에러 메시지 표시
**닫기**: onClose prop, 배경 클릭

```jsx
// AnimatePresence로 마운트/언마운트
<AnimatePresence>
    {isOpen && (
        <motion.div ... >
            {/* backdrop + 모달 내용 */}
        </motion.div>
    )}
</AnimatePresence>
```

### Feature Preview (About/Features 아코디언)

**구현**: AnimatePresence + layoutId (항목 내부 인라인 확장, 전통적 모달 아님)
**위치**: `src/components/about/Features.jsx`

---

## 4. 폼/입력 패턴

### AuthModal 입력 필드

**위치**: `src/components/AuthModal.jsx`

```jsx
// 공통 className
"w-full bg-white/5 border border-white/10 hover:border-white/20 
 focus:border-[#3C7795] rounded-xl px-4 py-3.5 text-sm font-sans 
 text-white placeholder-white/20 outline-none transition-colors"
```

**검증 규칙**:
- 이름: 2자 이상 (signup)
- 이메일: @앞 6자 이상
- 비밀번호: 6자 이상

### Concierge 채팅 입력

**위치**: `src/pages/Concierge.jsx`

```jsx
// 글래스카드 래퍼 내 투명 input
className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/30 outline-none text-base"
placeholder="Ask anything..."
```

---

## 5. 로딩 패턴

### AnalysisLoader

**컴포넌트**: `src/components/AnalysisLoader.jsx`
**위치**: Analysis → Result 전환 (quizPhase='loading')
**duration**: 4500ms 총합 (3단계 × 1500ms)

```jsx
// 3단계 텍스트 교체
const PHASES = [
    { text: '피부 데이터를 수집하고 있습니다', duration: 1500 },
    { text: '고유 피부 축을 분석하고 있습니다', duration: 1500 },
    { text: '맞춤 솔루션을 구성하고 있습니다', duration: 1500 },
];
// AnimatePresence mode="wait" 로 텍스트 교체
// 진행바: setInterval 50ms, elapsed/totalDuration * 100
```

### DataLab 로딩

**위치**: `src/pages/DataLab.jsx:44`
**구현**: `if (loading) return <대체 UI />`

### 이미지 에러 폴백

```jsx
// ProductFeedCard, Features 미리보기 이미지 공통
onError={(e) => { e.target.style.display = 'none'; }}
```

---

## 6. 빈 상태 패턴

[미구현] — 코드베이스에서 명시적 EmptyState 컴포넌트 발견되지 않음.
Curations, Shop, Dashboard의 빈 결과 처리 없음.

---

## 7. 에러 상태 패턴

### AuthModal 인라인 에러

```jsx
// AnimatePresence로 마운트 (src/components/AuthModal.jsx:200)
{error && (
    <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="..."
    >
        {error}
    </motion.p>
)}
```

에러 메시지 (실측):
- `'Google 인증에 실패하였습니다. 잠시 후 다시 시도하여 주십시오.'`
- `'네트워크 오류가 발생하였습니다. 연결 상태를 확인하여 주십시오.'`
- `'인증에 실패하였습니다. 입력 정보를 확인하여 주십시오.'`

### 이미지 로드 실패

```jsx
onError={(e) => { e.target.style.display = 'none'; }}
```

### API 실패 무시 (Analysis)

```jsx
// src/pages/Analysis.jsx:66
fetch(...).catch(e => console.log("DB save error", e));
// DB 저장 실패 시 진단 흐름 계속 진행
```

---

## 8. 점진적 공개 패턴 (Analysis Quiz)

Analysis 페이지 단계별 UI 변화:

| quizPhase | Blob Step | 터미널 텍스트 | 패널 내용 |
|-----------|----------|------------|---------|
| 'intro' | 0 | SYSTEM READY | Begin Analysis 버튼 |
| 'gender' | 1 | DEMOGRAPHICS | 성별 3버튼 |
| 'age' | 2 | DEMOGRAPHICS | 연령대 버튼 + Back |
| 'quiz' (q=0) | 3 | DATA POINT 1 | 질문 + 3지선다 |
| 'quiz' (q=5) | ~6 | DATA POINT 6 | 질문 + 3지선다 |
| 'quiz' (q=9) | 9 | DATA POINT 10 | 마지막 질문 |
| 'loading' | 9→(완료) | ANALYZING | AnalysisLoader 전체화면 |

Blob step 계산:
```js
quizPhase === 'intro' ? 0 :
quizPhase === 'gender' ? 1 :
quizPhase === 'age' ? 2 :
quizPhase === 'quiz' ? Math.min(3 + Math.round((currentQuestion / Math.max(questions.length - 1, 1)) * 6), 9) :
quizPhase === 'loading' ? 9 : 10
```

---

## 9. Magnetic Button 패턴

**사용 위치**: HeroIntro.jsx, AboutCTA.jsx, AboutHero.jsx
**상태**: 3개 파일에 각각 copy-paste (공유 컴포넌트 미추출)

```jsx
// 공통 구현 패턴 (HeroIntro.jsx:5~33)
function MagneticButton({ to, label }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const prefersReduced = useReducedMotion();

    const handleMouse = (e) => {
        if (prefersReduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.3); // 0.3 감쇠율
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            style={{ x, y }}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Link to={to} className="inline-block px-8 py-4 border border-brand-600 ...">
                {label}
            </Link>
        </motion.div>
    );
}
```

**개선 권고**: 3개 파일에 중복 — 공유 컴포넌트로 추출 권장 (components/MagneticButton.jsx)

---

## 10. 3D Tilt Hover 패턴

**위치**: `src/components/about/Approach.jsx` (TiltCard 내부 컴포넌트)

```jsx
// src/components/about/Approach.jsx:13~44
function TiltCard({ item, index, prefersReduced }) {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
    const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);

    const handleMouse = (e) => {
        if (prefersReduced || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    return (
        <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
            onMouseMove={handleMouse}
            onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
            whileHover={{ borderColor: '#2A6885' }}  // 기술적 예외: framer-motion 인라인 hex
        >
            ...
        </motion.div>
    );
}
```

---

## 11. Staggered Scroll Reveal 패턴

**구현**: `whileInView` + `viewport={{ once: true }}` + `transition={{ delay: i * 0.1 }}`

```jsx
// 공통 패턴 (전 컴포넌트 동일)
<motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
>
```

**사용 컴포넌트** (실측):
- Voices.jsx — 카드 4개 (delay 0, 0.1, 0.2, 0.3)
- Approach.jsx — TiltCard 6개 (delay 0~0.4)
- Features.jsx — 항목 3개 (delay 0, 0.1, 0.2)
- AboutCTA.jsx — 제목, 부제목, 버튼 (delay 0, 0.3, 0.45)
- Philosophy.jsx — 텍스트 블록, 단어별 stagger
- Footer.jsx — 4개 열 (delay stagger)
- HowItWorks.jsx — 3단계 카드
- Curations (component) — 상품 카드
- Algorithm.jsx, AuraStory.jsx, BrandStory.jsx, Privacy.jsx 등 전반

**Philosophy 단어별 stagger** (특수 패턴):
```jsx
// src/components/about/Philosophy.jsx
words.map((word, i) => (
    <motion.span
        key={i}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.04 }}
    >
        {word}{' '}
    </motion.span>
))
```

---

## 12. 가로 스크롤 캐러셀 패턴

**사용 위치 1**: `src/pages/Result.jsx` — 상품 피드
**사용 위치 2**: `src/components/about/Approach.jsx` — 모바일 핵심가치 (md+ 에서 grid로 전환)

```jsx
// Result.jsx:205
<div
    className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
>
    {products?.map((product) => (
        <Link key={product.id} to={`/curations/${product.id}`} className="snap-start flex-shrink-0">
            <ProductFeedCard product={product} />
        </Link>
    ))}
</div>
<p className="text-xs font-body text-ui-textMuted mt-2 text-right">스와이프하여 더 보기 →</p>
```

```jsx
// Approach.jsx:62 (모바일↔데스크탑 전환)
<div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory
                md:grid md:grid-cols-3 md:gap-6 md:overflow-x-visible"
     style={{ scrollbarWidth: 'none' }}
>
```

---

## 13. btn-primary / btn-glass 패턴

**정의**: `src/index.css:145~197`

```css
/* btn-primary */
.btn-primary {
    padding: 14px 32px;
    font-family: 'Pretendard', sans-serif;
    font-size: 14px; font-weight: 600; letter-spacing: 0.08em;
    color: #000000; background: #3C7795;
    border-radius: 50px;
    box-shadow: 0 4px 20px rgba(60, 119, 149, 0.30);
}
.btn-primary:hover {
    background: #8AAEC0;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(60, 119, 149, 0.45);
}

/* btn-glass: glass-card 기반 버튼 (border + backdrop) */
```

**사용 위치**:
- `btn-primary`: HowItWorks.jsx CTA, AuraStory.jsx, Campaigns.jsx
- `btn-glass`: Hero3D.jsx

---

## 14. layoutId 공유 레이아웃 패턴

framer-motion 공유 레이아웃 애니메이션 목록:

| layoutId | 위치 | 역할 |
|----------|------|------|
| `"nav-underline"` | Header.jsx:82 | 활성 nav 항목 밑줄 이동 |
| `"tab-indicator"` | AuthModal.jsx:189 | 로그인/회원가입 탭 전환 |
| `` `feature-preview-${i}` `` | Features.jsx:66 | 아코디언 미리보기 영역 |

---

## 15. EvolvingBlob + Canvas 래퍼 패턴

**사용 위치**: Analysis.jsx, Result.jsx (동일 패턴)

```jsx
// 공통 Canvas 래퍼 구조
<Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={0.3} />
    <pointLight position={[5, 5, 5]} intensity={1} color="#00D4FF" />
    <Environment preset="night" />
    <Suspense fallback={null}>
        <Starfield count={1200} />
        <EvolvingParticles step={step} count={50} />
        <EvolvingBlob step={step} />
    </Suspense>
    <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={1.5} />
    </EffectComposer>
</Canvas>
```

**Result에서 step 고정**:
```jsx
// src/pages/Result.jsx
<EvolvingBlob step={10} />  // 항상 최종 상태
```
