/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                void: '#050505',
                'void-light': '#0A0A0A',
                'void-lighter': '#121212',
            },
            // 폰트 시스템: Serif(영어/제목), Sans(한글/본문), Mono(데이터/테크)
            fontFamily: {
                serif: ['BentonModDisp', '"Playfair Display"', 'serif'], // AXIOM 시그니처 디스플레이
                sans: ['Pretendard', 'sans-serif'],     // 모던 테크니컬
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'], // 로우 데이터
            },
            // 행간 시스템 (Leading)
            lineHeight: {
                'title': '1.3', // 제목용 (130%)
                'body': '1.2',  // 본문용 (120%)
            },
            // 자간 시스템 (Tracking)
            letterSpacing: {
                'normal': '0em',      // 기본 본문
                'tightest': '-0.02em', // 굵은 제목용
                'widest': '0.2em',    // 테크 라벨용 (font-mono와 함께 사용)
            },
            backdropBlur: {
                'glass': '20px',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'glow-pulse': 'glowPulse 4s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '0.8' },
                },
            },
        },
    },
    plugins: [],
}