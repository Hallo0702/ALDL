import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import places from '../../constant/places';

const DynamicContainer = dynamic(
  () => import('../../components/place/DynamicContainer'),
  { ssr: false }
);

const PlaceName: NextPage = ({}) => {
  const router = useRouter();
  const place =
    places.find((place) => place.placeName === router.query.placeName) ||
    places[0];
  const locks = [
    { lockType: 1, top: 0, left: 0 },
    { lockType: 0, top: 15, left: 50 },
  ];

  return (
    <>
      <Head>
        <title>{place?.name}</title>
        <meta name="description" content={`알록달록 ${place?.name}`} />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <DynamicContainer
        bgHeight={place?.height}
        bgWidth={place?.width}
        locks={locks}
        placeId={place.id}
      ></DynamicContainer>
    </>
  );
};
export default PlaceName;
