import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { contentData } from '../data/contentData';

/**
 * Sticky Header Component
 * - State A (Top): Transparent, py-6
 * - State B (Scrolled): Dark glassmorphism, py-4
 * 
 * BRAND COLORS:
 * - #0a0a0a (Dark BG)
 * - #8AAEC0 (Mist Blue Text)
 * - #3C7795 (Cyan Accent)
 */

const MENU_PATHS = ['/', '/brand', '/analysis', '/curations'];

export default function Header({ onLoginClick, isLoggedIn, onLogout, user }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();
    const location = useLocation();
    const { nav } = contentData;

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const isActive = (href) => location.pathname === href;

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className={`
                    fixed top-0 left-0 right-0 z-50
                    transition-all duration-500 ease-in-out
                    ${isScrolled
                        ? 'bg-[#0a0a0a]/70 backdrop-blur-md shadow-lg border-b border-white/10 py-4'
                        : 'bg-transparent py-6'}
                `}
            >
                <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 flex items-center justify-between">

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
                                        relative text-[13px] tracking-[0.1em] uppercase font-sans
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

                        <div className="flex items-center gap-5">
                            {/* Language Toggle */}
                            <button
                                onClick={toggleLanguage}
                                className="text-white/50 hover:text-[#8AAEC0] transition-colors duration-300"
                                aria-label="Toggle Language"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                            </button>

                            {/* User Icon */}
                            {isLoggedIn ? (
                                <Link
                                    to="/dashboard"
                                    className="text-white/50 hover:text-[#8AAEC0] transition-colors duration-300"
                                    aria-label="My Page"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </Link>
                            ) : (
                                <button
                                    onClick={onLoginClick}
                                    className="text-white/50 hover:text-[#8AAEC0] transition-colors duration-300"
                                    aria-label="Log In"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden flex flex-col items-end gap-1.5 p-3 -mr-2 min-h-[44px] min-w-[44px] justify-center"
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
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.nav
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="relative z-10 flex flex-col items-center justify-center h-full gap-8"
                        >
                            {nav.menu.map((label, index) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                >
                                    <Link
                                        to={MENU_PATHS[index]}
                                        className={`
                                            text-2xl tracking-[0.15em] uppercase font-sans
                                            ${isActive(MENU_PATHS[index])
                                                ? 'text-[#3C7795]'
                                                : 'text-white/80'}
                                            hover:text-[#8AAEC0] transition-colors duration-300
                                        `}
                                    >
                                        {label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8 flex items-center gap-6"
                            >
                                <button
                                    onClick={toggleLanguage}
                                    className="text-white/50 hover:text-[#8AAEC0] transition-colors"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="2" y1="12" x2="22" y2="12" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                </button>

                                {isLoggedIn ? (
                                    <Link
                                        to="/dashboard"
                                        className="text-white/50 hover:text-[#8AAEC0] transition-colors"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            onLoginClick();
                                        }}
                                        className="text-white/50 hover:text-[#8AAEC0] transition-colors"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </button>
                                )}
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
