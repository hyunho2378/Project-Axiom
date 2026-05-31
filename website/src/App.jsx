import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { colors, font } from './tokens/web.js';
import Nav from './components/Nav.jsx';
import ScrollToTop from './lib/ScrollToTop.jsx';
import PageOverview from './pages/PageOverview.jsx';
import PageResearch from './pages/PageResearch.jsx';
import PageStrategy from './pages/PageStrategy.jsx';
import PageBX from './pages/PageBX.jsx';
import PageDataLogic from './pages/PageDataLogic.jsx';
import PageDemo from './pages/PageDemo.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          background: colors.bg,
          fontFamily: font.family,
          minHeight: '100vh',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
        }}
      >
        <Nav />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/"           element={<PageOverview />} />
            <Route path="/research"   element={<PageResearch />} />
            <Route path="/strategy"   element={<PageStrategy />} />
            <Route path="/bx"         element={<PageBX />} />
            <Route path="/data-logic" element={<PageDataLogic />} />
            <Route path="/demo"       element={<PageDemo />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
