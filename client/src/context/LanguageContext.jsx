import { createContext, useContext, useState, useEffect } from 'react';
import uiText from '../data/ui_text.json';

/**
 * Language Context for AURA
 * 
 * Provides multi-language support with two modes:
 * - 'ko': Korean (Hybrid) - Primary language with English accents
 * - 'en': English (Global) - Full English interface
 */

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    // Default to English, persist preference in localStorage
    const [language, setLanguage] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('aura-language') || 'en';
        }
        return 'en';
    });

    // Persist language preference
    useEffect(() => {
        localStorage.setItem('aura-language', language);
    }, [language]);

    // Toggle between languages
    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
    };

    // Get text by path (e.g., 'navigation.menu.analysis')
    const t = (path) => {
        const keys = path.split('.');
        let result = uiText;

        for (const key of keys) {
            if (result && typeof result === 'object' && key in result) {
                result = result[key];
            } else {
                return path; // Return path as fallback
            }
        }

        // If result has language keys, return the appropriate one
        if (result && typeof result === 'object' && language in result) {
            return result[language];
        }

        return result || path;
    };

    const value = {
        language,
        setLanguage,
        toggleLanguage,
        t,
        isKorean: language === 'ko',
        isEnglish: language === 'en',
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export default LanguageContext;
