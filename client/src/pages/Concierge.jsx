import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Concierge Page (/concierge) - "VIP Service"
 * 
 * Private 1:1 chat interface with elegant minimal design
 */
export default function Concierge({ user }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef(null);

    const userName = user?.name || 'Guest';

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = { type: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "Thank you for your question. Let me find the perfect solution tailored to your unique needs.",
                "I understand. Based on your skin profile, I would recommend exploring our Hydra Series.",
                "Excellent choice. Would you like me to schedule a personalized consultation with our skin experts?",
                "Your skin deserves the best. Let me curate a selection specifically for your Aura Type."
            ];

            const botMessage = {
                type: 'bot',
                text: responses[Math.floor(Math.random() * responses.length)]
            };

            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const suggestions = [
        "Find my perfect routine",
        "What's my Aura Type?",
        "Book a consultation",
        "Recommend products for dry skin"
    ];

    return (
        <div className="min-h-screen pt-24 flex flex-col">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#3C7795]/5 blur-[200px]" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-2xl">
                    {/* Hero Text */}
                    {messages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <p className="text-xs uppercase tracking-[0.4em] text-[#3C7795]/60 mb-6">
                                Concierge
                            </p>
                            <h1 className="font-title-en text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4 leading-tight">
                                How can we assist
                                <br />
                                <span className="italic text-white/70">your journey, {userName}?</span>
                            </h1>
                            <p className="text-white/40 max-w-md mx-auto">
                                Your personal beauty advisor. Ask anything about skincare, products, or book a private consultation.
                            </p>
                        </motion.div>
                    )}

                    {/* Messages Area */}
                    <AnimatePresence>
                        {messages.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mb-8 space-y-6 max-h-[400px] overflow-y-auto"
                            >
                                {messages.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`
                      max-w-[80%] p-5 rounded-2xl
                      ${msg.type === 'user'
                                                ? 'bg-white/10 border border-white/10'
                                                : 'bg-[#3C7795]/10 border border-[#3C7795]/20'}
                    `}>
                                            {msg.type === 'bot' && (
                                                <p className="text-xs text-[#8AAEC0]/80 mb-2">AXIOM Concierge</p>
                                            )}
                                            <p className="text-white/90 leading-relaxed">{msg.text}</p>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Typing Indicator */}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-[#3C7795]/10 border border-[#3C7795]/20 p-5 rounded-2xl">
                                            <div className="flex gap-1.5">
                                                <motion.div
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                                    className="w-2 h-2 rounded-full bg-[#8AAEC0]/60"
                                                />
                                                <motion.div
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                                    className="w-2 h-2 rounded-full bg-[#8AAEC0]/60"
                                                />
                                                <motion.div
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                                    className="w-2 h-2 rounded-full bg-[#8AAEC0]/60"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Suggestions */}
                    {messages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap justify-center gap-3 mb-10"
                        >
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={suggestion}
                                    onClick={() => {
                                        setInputValue(suggestion);
                                        inputRef.current?.focus();
                                    }}
                                    className="px-5 py-2.5 text-sm text-white/60 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* Input Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative flex items-center gap-3 p-2 rounded-2xl glass-card">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask anything..."
                                className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/30 outline-none text-base"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center
                  transition-all duration-300
                  ${inputValue.trim()
                                        ? 'bg-gradient-to-br from-[#1E5672] to-[#3C7795] text-white shadow-lg shadow-[#3C7795]/30'
                                        : 'bg-white/5 text-white/30'}
                `}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>
                        </div>

                        {/* Jewel Glow Effect */}
                        {inputValue.trim() && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-[#3C7795]/20 blur-xl pointer-events-none"
                            />
                        )}
                    </motion.div>

                    {/* Privacy Note */}
                    <p className="text-center text-xs text-white/30 mt-6">
                        Your conversations are private and secure.
                        <a href="/privacy" className="underline hover:text-white/50 ml-1">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
