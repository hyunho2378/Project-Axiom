import DataLogic from '../sections/DataLogic.jsx';
import AIProcess from '../sections/AIProcess.jsx';
import NextPageCTA from '../components/NextPageCTA.jsx';

export default function PageDataLogic() {
  return (
    <>
      <DataLogic />
      <AIProcess />
      <NextPageCTA to="/demo" label="3D Gallery" hint="직접 경험하는 AXIOM" />
    </>
  );
}
