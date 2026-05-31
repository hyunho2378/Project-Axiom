import BX from '../sections/BX.jsx';
import NextPageCTA from '../components/NextPageCTA.jsx';

export default function PageBX() {
  return (
    <>
      <BX />
      <NextPageCTA to="/data-logic" label="Data Logic" hint="브랜드를 작동시키는 알고리즘" />
    </>
  );
}
