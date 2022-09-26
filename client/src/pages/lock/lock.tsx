import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Board from '../../components/common/Board';
import Button from '../../components/common/Button';
import places from '../../constant/places';

const DynamicContainer = dynamic(
  () => import('../../components/place/DynamicContainer'),
  { ssr: false }
);

const Lock: NextPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(0);
  const locks = [
    { top: 0, left: 0 },
    { lockType: 'stripe', top: 15, left: 50 },
  ];
  const router = useRouter();
  const newLock = {
    ...router.query,
  };
  console.log(newLock);

  useEffect(() => {
    if (!router.isReady) return;
    if (Object.keys(router.query).length === 0) {
      alert('잘못된 접근입니다.');
      router.push('/');
      return;
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>자물쇠 걸기</title>
        <meta name="description" content="자물쇠 걸기" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className="text-center font-custom font-bold text-lg text-black mb-12">
        <h1>자물쇠 걸기</h1>
      </div>
      <Board>
        <div className="flex mb-4 w-full h-12 items-center text-xl font-bold justify-center">
          <label htmlFor="title" className="w-16 mr-4">
            위치
          </label>
          <div className="justify-self-start">
            {places.map((place) => (
              <Button
                key={place.id}
                label={`#${place.name}`}
                btnType={`${selectedPlace === place.id ? 'active' : 'normal'}`}
                btnSize="medium"
                onClick={() => {
                  setSelectedPlace(place.id);
                }}
              />
            ))}
          </div>
        </div>
      </Board>
      <DynamicContainer
        bgHeight={places[selectedPlace].height}
        bgWidth={places[selectedPlace].width}
        locks={locks}
        locksOpacity={70}
        placeId={selectedPlace}
      />
      <div className="flex justify-center content-center mt-12">
        <Button label="취소" btnType="normal" btnSize="medium"></Button>
        <Button label="걸기" btnType="active" btnSize="medium"></Button>
      </div>
    </>
  );
};
export default Lock;
