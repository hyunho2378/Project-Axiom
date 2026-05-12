# ROUTES.md — AXIOM React Router v6 전체 라우팅

> 감사 기준: App.jsx에서 확인된 실측값 기준
> v2 변경사항: MySpace 라우트 삭제, About 재구축 반영
> [UNVERIFIED] 표시 항목은 Claude Code가 App.jsx 직접 확인 후 수정

---

## 전체 라우트 테이블

| # | Path | 컴포넌트 | 분류 | 인증 필요 | 레이아웃 | v2 변경 |
|---|------|----------|------|-----------|----------|---------|
| 1 | `/` | `Home` | Public | ❌ | Snap Scroll (5섹션) | HeroIntro 교체 |
| 2 | `/analysis` | `Analysis` | Public | ❌ | Full 반응형 | Step 10→Result 상태 인계 |
| 3 | `/result` | `Result` | Public | ❌ | Full 반응형 | AI 제거 → axiomData 직결 |
| 4 | `/dashboard` | `Dashboard` | Protected | ✅ | Full 반응형 | 유지 |
| 5 | `/about` | `About` | Public | ❌ | Full 반응형 | **전면 재구축** |
| 6 | `/products` | `Products` | Public | ❌ | Full 반응형 | 유지 |
| 7 | `/product/:id` | `ProductDetail` | Public | ❌ | Full 반응형 | 유지 |
| 8 | `/auth/callback` | `AuthCallback` | Auth | ❌ | None | Google OAuth |
| 9 | `/campaigns` | `Campaigns` | Public | ❌ | Full 반응형 | [UNVERIFIED] |
| 10 | `/manifesto` | `Manifesto` | Public | ❌ | Full 반응형 | [UNVERIFIED] |
| 11 | `/aura-story` | `AuraStory` | Public | ❌ | Full 반응형 | [UNVERIFIED] |
| 12 | `/privacy` | `Privacy` | Public | ❌ | Full 반응형 | [UNVERIFIED] |
| 13 | `/terms` | `Terms` | Public | ❌ | Full 반응형 | [UNVERIFIED] |
| 14 | `/profile` | `Profile` | Protected | ✅ | Full 반응형 | [UNVERIFIED] |
| 15 | `/curation` | `Curation` | Public | ❌ | Full 반응형 | [UNVERIFIED] |
| 16 | `/ritual` | `Ritual` | Public | ❌ | Full 반응형 | [UNVERIFIED] |
| 17 | `~~/my-space~~` | ~~`MySpace`~~ | ~~Protected~~ | — | — | **삭제** |
| 18 | `*` | `NotFound` | Error | ❌ | Minimal | 유지 |

미등록 파일 (App.jsx Route 없음 — 삭제 또는 등록 결정 필요):
- `BrandStory.jsx` — [UNVERIFIED] 미등록
- `Diagnosis.jsx` — [UNVERIFIED] Analysis로 대체된 구버전 추정
- `CurationDetail.jsx` — [UNVERIFIED] ProductDetail이 대신 사용 추정

---

## App.jsx 라우터 구조  

```jsx
// App.jsx — 참고용 구조 (실제 코드와 대조 필요)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"            element={<Home />} />
        <Route path="/analysis"    element={<Analysis />} />
        <Route path="/result"      element={<Result />} />
        <Route path="/about"       element={<About />} />          {/* 재구축 */}
        <Route path="/products"    element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/campaigns"   element={<Campaigns />} />       {/* UNVERIFIED */}
        <Route path="/manifesto"   element={<Manifesto />} />       {/* UNVERIFIED */}
        <Route path="/aura-story"  element={<AuraStory />} />       {/* UNVERIFIED */}
        <Route path="/privacy"     element={<Privacy />} />         {/* UNVERIFIED */}
        <Route path="/terms"       element={<Terms />} />           {/* UNVERIFIED */}
        <Route path="/curation"    element={<Curation />} />        {/* UNVERIFIED */}
        <Route path="/ritual"      element={<Ritual />} />          {/* UNVERIFIED */}

        {/* Protected — Dashboard만 useEffect 리디렉션 방식 (전용 ProtectedRoute 미존재) */}
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/profile"     element={<Profile />} />         {/* UNVERIFIED */}

        {/* Auth */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* ❌ 삭제 */}
        {/* <Route path="/my-space" element={<MySpace />} /> */}

        {/* Error */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Protected Route 현황 및 개선 권고

### 현재 구현 (감사 실측)
- Dashboard만 `useEffect` 내 리디렉션 방식
- 전용 `ProtectedRoute` 컴포넌트 없음
- JWT 없음, 토큰은 `localStorage` `aura_token` / `aura_user` 키로 보관

### v2 권고 (이번 리팩터에서 구현)
```jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('aura_token');
  return token ? children : <Navigate to="/" replace />;
}

// App.jsx 적용
<Route path="/dashboard" element={
  <ProtectedRoute><Dashboard /></ProtectedRoute>
} />
```

> localStorage 직접 사용은 임시 허용 (기존 인증 로직 유지). 신규 인증 코드는 zustand persist로 교체 예정.

---

## 네비게이션 플로우

```
Landing (/)
  ├─ "분석 시작" → /analysis
  │     └─ Step 0 → Step 1~10 (AnalysisLoader 4.5s)
  │           └─ /result (axiomData.js 직결)
  │                 └─ "맞춤 상품 보기" → 상품 피드 섹션 (스크롤)
  │                 └─ "다시하기" → /analysis
  │
  ├─ GNB: /about / /products / /campaigns (UNVERIFIED)
  │
  └─ Auth
        ├─ AuthModal (인라인) → Google GIS → /auth/callback
        └─ 성공 → /dashboard
        └─ 실패 → / (리디렉션)
```

---

## Google OAuth 플로우

| 단계 | 경로 | 설명 |
|------|------|------|
| 트리거 | 어느 페이지든 | AuthModal 내 Google 버튼 클릭 |
| GIS 리디렉션 | 외부 → | Google Identity Services |
| 콜백 | `/auth/callback` | `VITE_GOOGLE_CLIENT_ID` 필요 |
| 성공 | `/dashboard` | aura_token localStorage 저장 (임시) |
| 실패 | `/` | 에러 처리 |

---

## v2 삭제 항목 체크리스트

Claude Code 실행 시 아래 항목 반드시 확인:

- [ ] `src/pages/MySpace.jsx` 파일 삭제
- [ ] `App.jsx`에서 MySpace Route 제거
- [ ] MySpace import 제거
- [ ] Result 페이지 "나만의 공간 보러가기 →" 버튼 삭제
- [ ] GNB 메뉴에서 "나만의 공간" 항목 제거
- [ ] MySpace 관련 Link, navigate 호출 전체 grep 제거
  ```bash
  grep -rn "my-space\|MySpace\|mySpace" src/
  ```