import UXStrategy from '../sections/UXStrategy.jsx';
import UXFlow from '../sections/UXFlow.jsx';
import NextPageCTA from '../components/NextPageCTA.jsx';

export default function PageStrategy() {
  return (
    <>
      <UXStrategy />
      <UXFlow />
      <NextPageCTA to="/bx" label="Brand Experience" hint="전략을 언어와 형태로" />
    </>
  );
}
