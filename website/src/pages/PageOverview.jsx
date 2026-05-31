import Hero from '../sections/Hero.jsx';
import Overview from '../sections/Overview.jsx';
import NextPageCTA from '../components/NextPageCTA.jsx';

export default function PageOverview() {
  return (
    <>
      <Hero />
      <Overview />
      <NextPageCTA to="/research" label="Research" hint="프로젝트의 출발점이 된 데이터" />
    </>
  );
}
