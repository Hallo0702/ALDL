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

import Locking from '../../assets/locks/locking.gif';
import Image from 'next/image';

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
    let { content, title, image } = router.query;
    if (typeof image !== 'string') image = '';
    if (typeof content !== 'string') content = '';
    if (typeof title !== 'string') title = '';

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
          <div className="relative w-full max-w-md h-full md:h-auto left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 ">
            <div className="relative bg-white rounded-xl shadow dark:bg-gray-700">
              <div className="flex flex-col justify-center items-center p-4 py-12 rounded-xl  dark:border-gray-600 border-black border-2 shadow-black shadow-[4px_4px_0px_#000000]">
                <div className="justify-self-center place-items-center">
                  <Image
                    src={Locking}
                    alt="lokcing"
                    width={200}
                    height={200}
                  ></Image>
                </div>
                <h3 className="text-xl font-bold place-self-center text-gray-900 dark:text-white">
                  자물쇠를 거는중입니다.
                </h3>
              </div>
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
