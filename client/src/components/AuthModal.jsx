import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AXIOM AuthModal — Glassmorphism Authentication
 *
 * Features:
 * - Heavy backdrop-blur glassmorphism (bg-white/5, backdrop-blur-2xl)
 * - Google Identity Services OAuth integration (VITE_GOOGLE_CLIENT_ID)
 * - 6-character minimum validation for email ID segment and password
 * - Professional research-grade error messaging
 */

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function parseGoogleJWT(token) {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}

function loadGoogleScript(callback) {
    if (window.google) { callback(); return; }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.head.appendChild(script);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(tab, formData) {
    if (tab === 'signup' && (!formData.name || formData.name.trim().length < 2)) {
        return '이름은 2자 이상 입력하여 주십시오.';
    }
    if (!formData.email || !EMAIL_RE.test(formData.email.trim())) {
        return '올바른 이메일 형식을 입력해주세요.';
    }
    if (!formData.password || formData.password.length < 6) {
        return '비밀번호는 6자 이상이어야 합니다.';
    }
    return null;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [googleReady, setGoogleReady] = useState(false);

    // Load Google GIS script when modal opens
    useEffect(() => {
        if (!isOpen || !GOOGLE_CLIENT_ID) return;
        loadGoogleScript(() => setGoogleReady(true));
    }, [isOpen]);

    // Handle Google credential response — decode JWT client-side, no server call
    const handleGoogleCredential = useCallback((response) => {
        try {
            const payload = parseGoogleJWT(response.credential);
            const user = { email: payload.email, name: payload.name || payload.email.split('@')[0] };
            onLoginSuccess(user, 'google-' + Date.now());
        } catch {
            setError('Google 인증 정보를 읽을 수 없습니다. 다시 시도하여 주십시오.');
        }
    }, [onLoginSuccess]);

    // Initialize Google One Tap / Button
    useEffect(() => {
        if (!googleReady || !isOpen || !GOOGLE_CLIENT_ID || !window.google) return;
        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCredential,
        });
        const btnEl = document.getElementById('axiom-google-btn');
        if (btnEl) {
            window.google.accounts.id.renderButton(btnEl, {
                type: 'standard',
                theme: 'filled_black',
                size: 'large',
                text: 'continue_with',
                shape: 'pill',
                width: btnEl.offsetWidth || 360,
            });
        }
    }, [googleReady, isOpen, handleGoogleCredential]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validate(activeTab, formData);
        if (validationError) { setError(validationError); return; }

        const user = { email: formData.email, name: formData.name || formData.email.split('@')[0] };
        onLoginSuccess(user, 'local-' + Date.now());
        resetForm();
    };

    const resetForm = () => {
        setFormData({ email: '', password: '', name: '' });
        setError('');
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
        setError('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={() => { onClose(); resetForm(); }}
                >
                    {/* Heavy backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />

                    {/* Modal card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 24 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.12),0_32px_80px_rgba(0,0,0,0.8)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={() => { onClose(); resetForm(); }}
                            className="absolute top-6 right-6 p-2 text-white/30 hover:text-white/80 transition-colors"
                            aria-label="Close"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Logo */}
                        <div className="text-center mb-8">
                            <p className="font-body text-[10px] text-[#3C7795] tracking-[0.3em] uppercase mb-2">AXIOM Laboratory</p>
                            <h2 className="font-title-en text-2xl text-white tracking-wide">
                                {activeTab === 'login' ? 'Welcome Back.' : 'Create Account.'}
                            </h2>
                        </div>

                        {/* Tabs */}
                        <div className="flex justify-center gap-8 mb-8 border-b border-white/8 pb-0">
                            {['login', 'signup'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => switchTab(tab)}
                                    className={`relative pb-4 text-xs font-body font-semibold tracking-[0.12em] uppercase transition-colors ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                                >
                                    {tab === 'login' ? 'Log In' : 'Sign Up'}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="tab-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#3C7795]"
                                            transition={{ type: 'spring', stiffness: 600, damping: 35 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 px-4 py-3 rounded-2xl bg-[#3C7795]/10 border border-[#3C7795]/30"
                                >
                                    <p className="font-body text-[11px] text-[#8AAEC0] tracking-wide text-center leading-relaxed">
                                        {error}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Google OAuth Button */}
                        {GOOGLE_CLIENT_ID ? (
                            <div className="mb-6">
                                <div
                                    id="axiom-google-btn"
                                    className="w-full flex justify-center"
                                    style={{ minHeight: '48px' }}
                                />
                            </div>
                        ) : (
                            <button
                                type="button"
                                disabled={isLoading}
                                className="w-full mb-6 flex items-center justify-center gap-3 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl font-body text-sm text-white/70 hover:text-white transition-all duration-200"
                                onClick={() => setError('Google 클라이언트 ID가 설정되지 않았습니다. 환경 변수를 확인하여 주십시오.')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>
                        )}

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-[1px] bg-white/8" />
                            <span className="font-body text-[9px] text-white/20 uppercase tracking-[0.2em]">or</span>
                            <div className="flex-1 h-[1px] bg-white/8" />
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                            {activeTab === 'signup' && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#3C7795] rounded-2xl px-4 py-3.5 text-sm font-body text-white placeholder-white/20 outline-none transition-colors"
                                    />
                                </div>
                            )}

                            <div>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#3C7795] rounded-2xl px-4 py-3.5 text-sm font-body text-white placeholder-white/20 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <input
                                    type="password"
                                    placeholder="Password (min. 6 characters)"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#3C7795] rounded-2xl px-4 py-3.5 text-sm font-body text-white placeholder-white/20 outline-none transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-glow w-full mt-2 py-4 disabled:opacity-40 font-body font-semibold text-sm tracking-[0.12em] uppercase rounded-2xl"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-t border-white rounded-2xl animate-spin" />
                                        Processing...
                                    </span>
                                ) : (
                                    activeTab === 'login' ? 'Log In' : 'Create Account'
                                )}
                            </button>
                        </form>

                        {/* Footer note */}
                        <p className="mt-6 text-center font-body text-[9px] text-white/15 tracking-wider leading-relaxed">
                            By continuing, you agree to AXIOM's{' '}
                            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#3C7795]/60 hover:text-[#3C7795] transition-colors underline underline-offset-2">
                                Privacy Policy
                            </a>
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
