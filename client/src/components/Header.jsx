import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { contentData } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import { useCartStore } from '../store/useCartStore';

const MENU_PATHS = ['/', '/axiom', '/analysis', '/curations', '/datalab'];

const USER_MENU = {
    ko: { dashboard: '대시보드', profile: '내 프로필', logout: '로그아웃' },
    en: { dashboard: 'Dashboard', profile: 'My Profile', logout: 'Log Out' },
};

export default function Header({ onLoginClick, isLoggedIn, onLogout }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const location = useLocation();
    const { nav } = contentData;
    const { language, toggleLanguage } = useLanguage();
    const um = USER_MENU[language] || USER_MENU.en;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const cartCount = useCartStore(state => state.totalCount());
    const isActive = (href) => location.pathname === href;

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className={`
                    fixed top-0 left-0 right-0 z-50
                    transition-colors duration-500 ease-in-out
                    py-4
                    ${isScrolled
                        ? 'bg-[#0a0a0a]/70 backdrop-blur-md shadow-lg border-b border-white/10'
                        : 'bg-void-deep/80 backdrop-blur-md border-b border-transparent'}
                `}
            >
                <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/images/Axiom_logo.svg"
                            alt="AXIOM"
                            className="h-8 w-auto object-contain hover:opacity-80 transition-opacity"
                        />
                    </Link>

                    <div className="hidden lg:block flex-1" />

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-12">
                        <nav className="flex items-center gap-10">
                            {nav.menu.map((label, index) => (
                                <Link
                                    key={label}
                                    to={MENU_PATHS[index]}
                                    className={`
                                        relative text-[13px] tracking-[0.1em] uppercase font-body
                                        ${isActive(MENU_PATHS[index])
                                            ? 'text-[#3C7795]'
                                            : 'text-white/80'}
                                        hover:text-[#8AAEC0] transition-colors duration-300
                                    `}
                                >
                                    {label}
                                    {isActive(MENU_PATHS[index]) && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#3C7795]"
                                        />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        <div className="w-[1px] h-4 bg-white/15" />

                        <div className="flex items-center gap-4">
                            {/* Cart icon */}
                            <Link
                                to="/cart"
                                className="relative flex items-center justify-center p-0 m-0 text-white/50 hover:text-[#8AAEC0] transition-colors duration-300"
                                aria-label="Cart"
                            >
                                <svg className="w-5 h-5 block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#3C7795] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Language toggle */}
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center p-0 m-0 text-white/50 hover:text-[#8AAEC0] transition-colors duration-300"
                                aria-label="Toggle language"
                            >
                                <svg className="w-5 h-5 block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                            </button>

                            {/* User Icon — dropdown when logged in */}
                            {isLoggedIn ? (
                                <div ref={userMenuRef} className="relative flex items-center justify-center">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center justify-center p-0 m-0 text-[#8AAEC0] hover:text-white transition-colors duration-300"
                                        aria-label="My Page"
                                    >
                                        <svg className="w-5 h-5 block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </button>
                                    {isUserMenuOpen && (
                                        <div className="absolute top-8 right-0 bg-void-light border border-ui-border rounded-2xl py-2 min-w-[140px] z-50">
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 text-sm text-ui-textSecondary hover:bg-void-lighter transition-colors"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                {um.dashboard}
                                            </Link>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-ui-textSecondary hover:bg-void-lighter transition-colors"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                {um.profile}
                                            </Link>
                                            <div className="my-1 border-t border-ui-border" />
                                            <button
                                                onClick={onLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-ui-textSecondary hover:bg-void-lighter transition-colors"
                                            >
                                                {um.logout}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={onLoginClick}
                                    className="flex items-center justify-center w-5 h-5 p-0 m-0 text-white/50 hover:text-[#8AAEC0] transition-colors duration-300"
                                    aria-label="Log In"
                                >
                                    <svg className="w-5 h-5 block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile: globe + cart + login + hamburger */}
                    <div className="lg:hidden flex items-center gap-1">
                        <Link
                            to="/cart"
                            className="relative flex items-center justify-center p-3 min-h-[44px] min-w-[44px] text-white/50 hover:text-[#8AAEC0] transition-colors duration-300"
                            aria-label="Cart"
                        >
                            <svg className="w-4 h-4 block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-[#3C7795] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center justify-center p-3 min-h-[44px] min-w-[44px] text-white/50 hover:text-[#8AAEC0] transition-colors duration-300"
                            aria-label="Toggle language"
                        >
                            <svg className="w-4 h-4 block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </button>

                        {isLoggedIn ? (
                            <Link
                                to="/dashboard"
                                className="flex items-center justify-center p-3 min-h-[44px] min-w-[44px] text-[#8AAEC0] hover:text-white transition-colors duration-300"
                                aria-label="Dashboard"
                            >
                                <svg className="w-4 h-4 block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </Link>
                        ) : (
                            <button
                                onClick={onLoginClick}
                                className="flex items-center justify-center p-3 min-h-[44px] min-w-[44px] text-white/50 hover:text-[#8AAEC0] transition-colors duration-300"
                                aria-label="Log In"
                            >
                                <svg className="w-4 h-4 block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </button>
                        )}

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="flex flex-col items-end gap-1.5 p-3 -mr-2 min-h-[44px] min-w-[44px] justify-center"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                                className="w-6 h-[1.5px] bg-white/80 block origin-center"
                            />
                            <motion.span
                                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                                className="w-4 h-[1.5px] bg-white/50 block"
                            />
                            <motion.span
                                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                                className="w-6 h-[1.5px] bg-white/80 block origin-center"
                            />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile backdrop — closes menu on outside click */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[39] lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile dropdown — slides down from header */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                        className="fixed top-16 left-0 right-0 z-40 lg:hidden"
                    >
                        <div className="bg-black/95 backdrop-blur-xl border-b border-[rgba(90,154,181,0.15)]">
                            {nav.menu.map((label, index) => (
                                <Link
                                    key={label}
                                    to={MENU_PATHS[index]}
                                    className={`
                                        block px-8 py-4 font-body text-[11px] tracking-[0.25em] uppercase
                                        border-b border-[rgba(90,154,181,0.08)]
                                        transition-colors duration-200
                                        ${isActive(MENU_PATHS[index])
                                            ? 'text-[#3C7795]'
                                            : 'text-white/70 hover:text-[#8AAEC0] hover:bg-white/[0.02]'}
                                    `}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {label}
                                </Link>
                            ))}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
