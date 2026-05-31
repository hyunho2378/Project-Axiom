import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const COPY = {
    ko: { tagline: '데이터가 보여주는 가장 아름다운 진실', privacy: '개인정보처리방침', terms: '이용약관' },
    en: { tagline: 'The most beautiful truth that data reveals.', privacy: 'Privacy Policy', terms: 'Terms of Use' },
};

export default function Footer() {
    const { language } = useLanguage();
    const c = COPY[language] || COPY.en;
    return (
        <footer className="w-full bg-black border-t border-[#111] py-16 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col space-y-6">

                {/* Top Row: Logo & Horizontal Slogan */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#222] pb-10">
                    <Link to="/" className="flex items-center hover:opacity-70 transition-opacity">
                        <img src="/images/Axiom_logo.svg" alt="AXIOM" className="h-7 w-auto object-contain" />
                    </Link>
                    <p className="font-body text-sm text-[#8AAEC0]/60 tracking-wide whitespace-nowrap mt-4 md:mt-0">
                        {c.tagline}
                    </p>
                </div>

                {/* Bottom Row: Minimal Copyright & Legal Links */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#8AAEC0]/30 space-y-4 md:space-y-0">
                    <div className="font-body tracking-wide">
                        © 2026 AXIOM Inc. All rights reserved.
                    </div>
                    <div className="flex space-x-6 font-body tracking-wide">
                        <Link to="/privacy" className="hover:text-[#8AAEC0] transition-colors duration-300">
                            {c.privacy}
                        </Link>
                        <Link to="/terms" className="hover:text-[#8AAEC0] transition-colors duration-300">
                            {c.terms}
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}