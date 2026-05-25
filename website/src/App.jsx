// AXIOM Portfolio - build fix
import { colors, font } from './tokens/web.js';
import Nav from './components/Nav.jsx';
import Hero from './sections/Hero.jsx';
import StatsBar from './sections/StatsBar.jsx';
import Overview from './sections/Overview.jsx';
import Problem from './sections/Problem.jsx';
import Research from './sections/Research.jsx';
import Persona from './sections/Persona.jsx';
import UXStrategy from './sections/UXStrategy.jsx';
import BX from './sections/BX.jsx';
import DataLogic from './sections/DataLogic.jsx';
import AIProcess from './sections/AIProcess.jsx';
import UXFlow from './sections/UXFlow.jsx';
import Demo from './sections/Demo.jsx';
import Credits from './sections/Credits.jsx';

export default function App() {
  return (
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
      <main>
        <Hero />
        <StatsBar />
        <Overview />
        <Problem />
        <Research />
        <Persona />
        <UXStrategy />
        <BX />
        <DataLogic />
        <AIProcess />
        <UXFlow />
        <Demo />
        <Credits />
      </main>
    </div>
  );
}
