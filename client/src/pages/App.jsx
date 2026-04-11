import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Context (now relative to pages folder)
import { LanguageProvider } from '../context/LanguageContext';

// Components (now relative to pages folder)
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import ScrollToTop from '../components/ScrollToTop';

// Pages (now in same folder)
import Home from './Home';
import AuraStory from './AuraStory';
import About from './About';
import Shop from './Shop';
import Curations from './Curations';
import Dashboard from './Dashboard';
import Algorithm from './Algorithm';
import ProductDetail from './ProductDetail';
import Campaigns from './Campaigns';
import Concierge from './Concierge';
import Analysis from './Analysis';
import DataLab from './DataLab';
import TeamPage from './TeamPage';
import MySpacePage from './MySpacePage';
import Privacy from './Privacy';

/**
 * App Layout - Wraps all routes with Header and Footer
 * Background: Transparent (uses global Deep Navy from #root)
 */
function AppLayout({ children, onLoginClick, isLoggedIn, onLogout, user }) {
    return (
        <div className="relative min-h-screen bg-black">
            <Header
                onLoginClick={onLoginClick}
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
                user={user}
            />
            <main className="relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
}

/**
 * Main App Content
 */
function AppContent() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('aura_token');
        const savedUser = localStorage.getItem('aura_user');
        if (token && savedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLoginSuccess = (userData, token) => {
        localStorage.setItem('aura_token', token);
        localStorage.setItem('aura_user', JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
        setIsAuthModalOpen(false);
        navigate('/dashboard');
    };

    const handleLogout = () => {
        localStorage.removeItem('aura_token');
        localStorage.removeItem('aura_user');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
    };

    const layoutProps = {
        onLoginClick: () => setIsAuthModalOpen(true),
        isLoggedIn,
        onLogout: handleLogout,
        user
    };

    return (
        <>
            <Routes>
                {/* Home */}
                <Route path="/" element={<AppLayout {...layoutProps}><Home /></AppLayout>} />

                {/* Brand Story (new) */}
                <Route path="/brand" element={<AppLayout {...layoutProps}><About /></AppLayout>} />

                {/* Aura Story (legacy) */}
                <Route path="/aura" element={<AppLayout {...layoutProps}><AuraStory /></AppLayout>} />

                {/* Algorithm Lab */}
                <Route path="/algorithm" element={<AppLayout {...layoutProps}><Algorithm /></AppLayout>} />

                {/* AI Skin Analysis - All routes point to Analysis component */}
                <Route path="/diagnosis" element={<AppLayout {...layoutProps}><Analysis /></AppLayout>} />

                {/* AI Skin Analysis (Hybrid Architecture - New) */}
                <Route path="/skin-analysis" element={<AppLayout {...layoutProps}><Analysis /></AppLayout>} />
                <Route path="/analysis" element={<AppLayout {...layoutProps}><Analysis /></AppLayout>} />

                {/* Curations */}
                <Route path="/curations" element={<AppLayout {...layoutProps}><Curations /></AppLayout>} />
                <Route path="/curations/:id" element={<AppLayout {...layoutProps}><ProductDetail /></AppLayout>} />

                {/* Data Lab - Statistics Visualization */}
                <Route path="/datalab" element={<AppLayout {...layoutProps}><DataLab /></AppLayout>} />

                {/* Shop */}
                <Route path="/shop" element={<AppLayout {...layoutProps}><Shop /></AppLayout>} />
                <Route path="/shop/:id" element={<AppLayout {...layoutProps}><ProductDetail /></AppLayout>} />

                {/* Campaigns */}
                <Route path="/campaigns" element={<AppLayout {...layoutProps}><Campaigns /></AppLayout>} />

                {/* Concierge */}
                <Route path="/concierge" element={<AppLayout {...layoutProps}><Concierge user={user} /></AppLayout>} />

                {/* Dashboard */}
                <Route path="/dashboard" element={<AppLayout {...layoutProps}><Dashboard user={user} isLoggedIn={isLoggedIn} /></AppLayout>} />

                {/* Team DYT - Hidden Easter Egg */}
                <Route path="/team-dyt" element={<AppLayout {...layoutProps}><TeamPage /></AppLayout>} />

                {/* My Space - 3D Showroom */}
                <Route path="/my-space" element={<AppLayout {...layoutProps}><MySpacePage /></AppLayout>} />

                {/* Privacy Policy */}
                <Route path="/privacy" element={<AppLayout {...layoutProps}><Privacy /></AppLayout>} />
            </Routes>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </>
    );
}

function App() {
    return (
        <LanguageProvider>
            <Router>
                <ScrollToTop />
                <AppContent />
            </Router>
        </LanguageProvider>
    );
}

export default App;
