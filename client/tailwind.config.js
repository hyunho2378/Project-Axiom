/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Void 배경 계층 (기존 flat 유지 + deep/deepest 추가)
                void: '#050505',
                'void-light': '#0A0A0A',
                'void-lighter': '#121212',
                'void-deep': '#03070a',
                'void-deepest': '#000000',
                // Brand Blue — 3D blob + 액센트
                brand: {
                    100: '#C0F0FF',
                    200: '#A0D4E8',
                    300: '#8AAEC0',
                    400: '#5A9AB5',
                    500: '#3C7795',
                    600: '#2A6885',
                    700: '#1E5672',
                    800: '#0B3545',
                    900: '#082B35',
                },
                // Neon — blob Step 10, 터미널, 강조
                neon: {
                    cyan: '#00D4FF',
                    'cyan-bright': '#00E0FF',
                },
                // UI 텍스트 & 테두리
                ui: {
                    textPrimary: '#FFFFFF',
                    textSecondary: '#8AAEC0',
                    textMuted: '#5A9AB5',
                    border: '#222222',
                    borderSubtle: '#1E5672',
                    divider: '#0B3545',
                },
            },
            // 폰트 시스템: 2종 전용 (BentonModDisp + Pretendard Variable)
            fontFamily: {
                'title-en': ['BentonModDisp', 'serif'],
                'title-ko': ['"Pretendard Variable"', 'sans-serif'],
                'body': ['"Pretendard Variable"', 'sans-serif'],
                sans: ['"Pretendard Variable"', 'sans-serif'],
            },
            // 행간 시스템 (Leading)
            lineHeight: {
                'title': '1.3',
                'body': '1.2',
                'title-sm': '1.3',
                'title-lg': '1.4',
                'body-sm': '1.2',
                'body-lg': '1.25',
            },
            // 자간 시스템 (Tracking)
            letterSpacing: {
                'normal': '0em',
                'tightest': '-0.02em',
                'widest': '0.2em',
                'axiom': '0em',
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