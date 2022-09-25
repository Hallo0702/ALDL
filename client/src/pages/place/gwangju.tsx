import { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const DynamicContainer = dynamic(
  () => import('../../components/place/DynamicContainer'),
  { ssr: false }
);

const Gwangju: NextPage = ({}) => {
  const locks = [
    { top: 0, left: 0 },
    { lockType: 'stripe', top: 5, left: 0 },
  ];
  return (
    <>
      <Head>
        <title>광주</title>
        <meta name="description" content="알록달록 광주" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <DynamicContainer
        bgHeight={706}
        bgWidth={461}
        locks={locks}
      ></DynamicContainer>
    </>
  );
};

export default Gwangju;
