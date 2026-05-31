# AXIOM 포트폴리오 — 디자인 시스템

## 컬러 토큰 (전체 교체 대상)

### 배경
bg: #000000 (메인 배경)
bgDeep: #000000
bgCard: #0A0A0A
bgCardHover: #082B35

### 브랜드
brand: #00D4FF (Neon Primary)
brandStrong: #00E0FF (Neon Secondary)
brandPale: #C0F0FF
brandMid: #5A9AB5
brandDeep: #2A6885
brandVoid: #082B35

### 텍스트
ink: #FFFFFF
inkMuted: #8AAEC0 (로고 색상과 동일)
inkFaint: #2A6885

### 라벨 배경
labelBg1: #2E6A82
labelBg2: #357292
labelBg3: #28637E

### 상태
line: #082B35
warn: #8AAEC0
ok: #00D4FF

## 타이포그래피
영문 타이틀: BentonModDisp Semibold (CDN or local font)
본문 전체: Pretendard Variable (기존 유지)
clamp() 기반 반응형 유지

## 3D 에셋 embed 규칙
../3d-ref/*.html → <iframe> 태그
width: 100%, height: 400px (섹션별 조정)
border: none, background: transparent 처리
pointer-events: none (스크롤 방해 방지)

## 강릉페이 잔재 제거 대상
- #1D4ED8 계열 블루 전면 교체
- brandStrong/Pale/Sky/Alt → AXIOM 토큰으로 덮어쓰기
- bg: #F5F5F5 → #040A12 로 교체
- 강릉페이 전용 컴포넌트(지도, 카드결제 UI 등) → placeholder
