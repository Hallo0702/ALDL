import { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getLocksByBackground, setLocker } from '../../api/lock';
import Board from '../../components/common/Board';
import Button from '../../components/common/Button';
import { LockProps } from '../../components/place/Lock';
import places from '../../constant/places';
import { userState } from '../../store/states';
import { store } from '../../utils/contract';
const DynamicContainer = dynamic(
  () => import('../../components/place/DynamicContainer'),
  { ssr: false }
);

const Lock: NextPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [draggableLock, setDraggableLock] = useState<LockProps>();
  const [user, setUserstate] = useRecoilState(userState);

  const [isPending, setIsPending] = useState<boolean | null>(null);
  const [lockerHash, setLockerHash] = useState<string | null>(null);

  const router = useRouter();
  const [locks, setLocks] = useState<LockProps[]>([]);

  const onAction = async (locationX: number, locationY: number) => {
    setIsPending(true);
    const { content, title, image } = router.query;

    const res = await store(user.privateKey, user.address, {
      imageSrc: image,
      content: content,
      title: title,
      lockType: draggableLock?.lockType,
      background: selectedPlace,
    });
    const lockerHash = res['to'];
    setLockerHash(lockerHash);
    setLocker({
      background: selectedPlace,
      lockType: draggableLock?.lockType,
      locationX,
      locationY,
      lockerHash,
      lockerTitle: title,
    }).then(() => {
      setIsPending(false);
    });
  };

  useEffect(() => {
    if (isPending === false && lockerHash) {
      router.push(
        {
          pathname: '/lock/detail',
          query: {
            hash: lockerHash,
          },
        },
        '/lock/detail'
      );
    }
  }, [isPending, lockerHash]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getLocksByBackground(selectedPlace);
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
      {isPending && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-black/50"
        >
          <div className="relative w-full max-w-2xl h-full md:h-auto left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex justify-center items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-bold  text-gray-900 dark:text-white">
                  자물쇠를 거는중입니다.
                </h3>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 space-y-6"></div>
            </div>
          </div>
        </div>
      )}
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
