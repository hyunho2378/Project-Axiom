import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../config/api';

/**
 * AuthModal Component
 * 
 * Glassmorphism authentication modal with real API integration
 */
export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/signup';
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                onLoginSuccess(data.user, data.token);
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/auth/social`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ provider })
            });

            const data = await response.json();

            if (data.success) {
                onLoginSuccess(data.user, data.token);
            }
        } catch (err) {
            setError('Social login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ email: '', password: '', name: '' });
        setError('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-overlay"
                    onClick={() => { onClose(); resetForm(); }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => { onClose(); resetForm(); }}
                            className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Logo */}
                        <h2 className="font-serif text-3xl text-center mb-8 tracking-wide">AURA</h2>

                        {/* Tabs */}
                        <div className="flex justify-center gap-8 mb-10">
                            {['login', 'signup'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => { setActiveTab(tab); setError(''); }}
                                    className={`
                    relative pb-2 text-sm font-medium tracking-wide uppercase
                    transition-colors
                    ${activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/60'}
                  `}
                                >
                                    {tab === 'login' ? 'Log In' : 'Sign Up'}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Social Login Buttons */}
                        <div className="space-y-3 mb-8">
                            <button
                                onClick={() => handleSocialLogin('Google')}
                                disabled={isLoading}
                                className="btn-social"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            <button
                                onClick={() => handleSocialLogin('Apple')}
                                disabled={isLoading}
                                className="btn-social"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                Continue with Apple
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex-1 h-[1px] bg-white/10" />
                            <span className="text-xs text-white/30 uppercase tracking-wider">or</span>
                            <div className="flex-1 h-[1px] bg-white/10" />
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {activeTab === 'signup' && (
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input-minimal"
                                />
                            )}

                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="input-minimal"
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="input-minimal"
                                required
                            />

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-primary mt-8"
                            >
                                <span>
                                    {isLoading ? 'Please wait...' : (activeTab === 'login' ? 'Log In' : 'Sign Up')}
                                </span>
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
