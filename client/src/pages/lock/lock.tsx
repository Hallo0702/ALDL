import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AbiItem } from 'web3-utils';

import { getLocksByBackground, setLocker } from '../../api/lock';
import Board from '../../components/common/Board';
import Button from '../../components/common/Button';
import { LockProps } from '../../components/place/Lock';
import places from '../../constant/places';
import { ABI } from '../../contract/ABI';
import { Bytecode } from '../../contract/Bytecode';
import Web3 from 'web3';
import { store } from '../../utils/contract';
const DynamicContainer = dynamic(
  () => import('../../components/place/DynamicContainer'),
  { ssr: false }
);

const Lock: NextPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [draggableLock, setDraggableLock] = useState<LockProps>();

  const router = useRouter();
  const [locks, setLocks] = useState([]);

  const onAction = async (locationX: number, locationY: number) => {
    const { content, title, image } = router.query;
    const storeRes = await store(
      '0xc3358af8becbab80cd6e3c6b2425368a6b6ac8f4aa8807e73ca1fd62347f39b5',
      '0xa6Af487111486Af3FEeEa15631EFaB3168801273',
      {
        imageSrc: image,
        content: content,
        title: title,
        lockType: draggableLock?.lockType,
        background: selectedPlace,
      }
    );
    const lockerHash = storeRes['_address'];
    const res = await setLocker({
      background: selectedPlace,
      lockType: draggableLock?.lockType,
      locationX,
      locationY,
      lockerHash,
    });
    console.log(res);
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await getLocksByBackground(selectedPlace);
      console.log(res.data);
      setLocks(res.data);
    };
    fetch();
  }, [selectedPlace]);

  useEffect(() => {
    if (!router.isReady) return;
    if (Object.keys(router.query).length === 0) {
      alert('잘못된 접근입니다.');
      router.push('/');
      return;
    }
    setDraggableLock({
      lockType: Number(router.query.lockType),
      locationY: 50,
      locationX: 50,
    });
    console.log(router.query);
  }, [router]);

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
        draggableLock={draggableLock}
        placeId={selectedPlace}
        onAction={onAction}
      />
    </>
  );
};
export default Lock;
