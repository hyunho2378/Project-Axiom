import Problem from '../sections/Problem.jsx';
import Research from '../sections/Research.jsx';
import Persona from '../sections/Persona.jsx';
import NextPageCTA from '../components/NextPageCTA.jsx';

export default function PageResearch() {
  return (
    <>
      <Problem />
      <Research />
      <Persona />
      <NextPageCTA to="/strategy" label="Strategy" hint="리서치가 전략이 되다" />
    </>
  );
}
