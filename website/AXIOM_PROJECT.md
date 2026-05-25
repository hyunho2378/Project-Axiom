# AXIOM 포트폴리오 웹사이트 — 프로젝트 지침

## 정체성
- 작품명: AXIOM: AI 피부 진단 기반 하이엔드 뷰티 큐레이션 플랫폼 UX 서비스 디자인
- 팀: 더 인스튜디오 | 한림대학교 디지털인문예술
- 라이브 서비스: https://project-axiom-puce.vercel.app/
- 목적: 전공 전시회 동아리 부문 출품 — 브랜딩 + UX + AI 프로세스 + 3D 시각 결과물 4축 통합 증명

## 플랫폼
B형 반응형 웹. 모바일 퍼스트.

## 기술 스택
React 18 + Vite + Tailwind CSS + tokens.js
Three.js 의존성 없음 — 3D는 ../3d-ref/*.html을 iframe embed로 처리

## 데이터 원칙
- 모든 텍스트/수치는 src/data/axiom.json 또는 src/data/userResearch.json에서만
- 컴포넌트 하드코딩 금지
- 수치는 출처 명시 (근거: 필드)

## 섹션 구조 (스크롤 순서, 총 12개)
01. Hero
02. Overview
03. Problem
04. Research (차트 인터랙션)
05. Persona + CJM
06. URQ + UX Strategy
07. BX (브랜딩 시스템)
08. DataLogic (진단 로직)
09. AIProcess (3D + Claude Code 협업)
10. UXFlow
11. Demo
12. Credits

## 절대 규칙
- 강릉페이 블루(#1D4ED8 계열) 잔재 전면 제거
- 다크 배경 (#040A12) 기반. 라이트 모드 없음
- 수치는 axiom.json 한 곳에서만 관리. 이중 관리 금지
- 인터뷰 발화 인용 시 코드(P01~P12) 반드시 명시
- 3D 에셋은 ../3d-ref/*.html → iframe embed (src 경로 상대경로)
