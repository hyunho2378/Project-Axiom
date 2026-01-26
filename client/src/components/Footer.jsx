import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Footer - STRICT 4-COLOR PALETTE
 * - #000000 (Background)
 * - #1E5672 (Not used in footer)
 * - #3C7795 (Hover)
 * - #8AAEC0 (Text)
 */
export default function Footer() {
    return (
        <footer className="w-full bg-black border-t border-[#8AAEC0]/10 pt-12 md:pt-20 pb-8 md:pb-10 relative z-10">

            {/* Subtle accent line - #3C7795 */}
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3C7795]/30 to-transparent" />

            <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="col-span-2 md:col-span-1"
                    >
                        <Link to="/" className="flex items-center">
                            <img src="/images/Axiom_logo.svg" alt="AXIOM" className="h-8 w-auto object-contain hover:opacity-80 transition-opacity" />
                        </Link>
                        <p className="font-sans text-sm text-[#8AAEC0]/70 mt-4 leading-relaxed max-w-[220px]" style={{ wordBreak: 'keep-all' }}>
                            Define Your Axis.<br />
                            데이터가 보여주는 가장 아름다운 진실
                        </p>
                    </motion.div>

                    {/* Shop Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[#8AAEC0]/50 font-sans mb-5">
                            Shop
                        </p>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/curations" className="font-sans text-sm text-[#8AAEC0]/70 hover:text-[#3C7795] transition-colors duration-300">
                                    전체 상품 보기
                                </Link>
                            </li>
                            <li>
                                <Link to="/analysis" className="font-sans text-sm text-[#8AAEC0]/70 hover:text-[#3C7795] transition-colors duration-300">
                                    AI 피부 진단
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop" className="font-sans text-sm text-[#8AAEC0]/70 hover:text-[#3C7795] transition-colors duration-300">
                                    맞춤 처방
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[#8AAEC0]/50 font-sans mb-5">
                            Company
                        </p>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/brand" className="font-sans text-sm text-[#8AAEC0]/70 hover:text-[#3C7795] transition-colors duration-300">
                                    브랜드 스토리
                                </Link>
                            </li>
                            <li>
                                <Link to="/analysis" className="font-sans text-sm text-[#8AAEC0]/70 hover:text-[#3C7795] transition-colors duration-300">
                                    AI 진단
                                </Link>
                            </li>
                            <li>
                                <Link to="/curations" className="font-sans text-sm text-[#8AAEC0]/70 hover:text-[#3C7795] transition-colors duration-300">
                                    큐레이션
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[#8AAEC0]/50 font-sans mb-5">
                            Follow
                        </p>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 text-[#8AAEC0]/70 hover:text-[#8AAEC0] transition-colors duration-300 group"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#8AAEC0]/60 group-hover:text-[#3C7795] transition-colors">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                    <span className="font-sans text-sm">Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 text-[#8AAEC0]/70 hover:text-[#8AAEC0] transition-colors duration-300 group"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#8AAEC0]/60 group-hover:text-[#3C7795] transition-colors">
                                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                                    </svg>
                                    <span className="font-sans text-sm">YouTube</span>
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-[#8AAEC0]/10"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="font-sans text-xs text-[#8AAEC0]/40">
                            © 2026 AXIOM Inc. All rights reserved. Designed by{' '}
                            <Link
                                to="/team-dyt"
                                className="text-[#8AAEC0]/40 hover:text-[#8AAEC0] hover:underline decoration-1 underline-offset-4 transition-colors duration-300"
                            >
                                Team DYT
                            </Link>
                        </p>

                        <div className="flex items-center gap-6">
                            <a href="#" className="font-sans text-xs text-[#8AAEC0]/40 hover:text-[#8AAEC0] transition-colors">
                                개인정보처리방침
                            </a>
                            <a href="#" className="font-sans text-xs text-[#8AAEC0]/40 hover:text-[#8AAEC0] transition-colors">
                                이용약관
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
