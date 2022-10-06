import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';
import { AxiosError } from 'axios';

import { userState } from '../../store/states';
import { getMyLockers, saveLocker } from '../../api/lock';
import Board from '../../components/common/Board';
import Button from '../../components/common/Button';
import ListCard from '../../components/common/ListCard';
import places from '../../constant/places';
import { retrieve } from '../../utils/contract';
import LOCKS from '../../constant/locks';
import PLACES from '../../constant/places';
import Title from '../../components/common/Title';

interface lock {
  imageSrc: string;
  title: string;
  content: string;
  background: number;
  lockType: number;
  hash: string;
}

const Collection: NextPage = ({}) => {
  const [user, setUserstate] = useRecoilState(userState);
  const [selectedPlace, setSelectedPlace] = useState('all');
  const [toAddLockerHash, setToAddLokcerHash] = useState('');
  const [locks, setLocks] = useState<lock[]>([]);
  const [filteredLocks, setFilteredLocks] = useState<lock[]>([]);
  const router = useRouter();

  const saveLockerHandler = async () => {
    if (!toAddLockerHash) return;
    try {
      const newLock = await retrieve(toAddLockerHash);
      await saveLocker(toAddLockerHash);
      setLocks((prev) => [{ ...newLock, hash: toAddLockerHash }, ...prev]);
    } catch (err) {
      if (err instanceof AxiosError) alert(err?.response?.data);
    }
  };

  useEffect(() => {
    if (!user.isLogined) {
      alert('로그인이 필요한 페이지입니다.');
      router.push('/auth/login');
    }

    const fetchLockHashs = async () => {
      const res = await getMyLockers();
      const lockHashs = res.data.map(
        (data: { lockerHash: string }) => data.lockerHash
      );
      const fetchLock = async (hash: string) => {
        const lock = await retrieve(hash);
        setLocks((prev) => [...prev, { ...lock, hash }]);
      };
      lockHashs.forEach((lockHash: string) => {
        fetchLock(lockHash);
      });
    };
    fetchLockHashs();
  }, []);

  useEffect(() => {
    setFilteredLocks(
      locks.filter(
        (lock) =>
          selectedPlace === 'all' || lock.background === Number(selectedPlace)
      )
    );
  }, [locks, selectedPlace]);
  return (
    <>
      <Head>
        <title>자물쇠 모아보기</title>
        <meta name="description" content="자물쇠 모아보기" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Title>자물쇠 모아보기</Title>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 md:gap-20  font-bold mb-20">
        <div>
          <input
            type="text"
            className="w-full max-w-[12rem] md:max-w-full md:w-96 h-10 rounded-full border-black border-2 p-4"
            value={toAddLockerHash}
            onChange={(e) => {
              setToAddLokcerHash(e.target.value);
            }}
          />
          <Button
            label="추가"
            btnType="dark"
            btnSize="medium"
            customstyle="mt-0"
            onClick={saveLockerHandler}
          ></Button>
          <p className="text-center py-2 font-medium">
            공유받은 자물쇠 주소를 입력해주세요
          </p>
        </div>
      </div>
      <Board>
        <div className="flex w-full items-center text-xl font-bold justify-center">
          <label htmlFor="title" className="hidden md:block w-16 mr-4">
            위치
          </label>
          <div className="flex flex-wrap md:justify-self-start">
            <Button
              label="전체"
              btnType={selectedPlace === 'all' ? 'active' : 'normal'}
              btnSize="medium"
              onClick={() => {
                setSelectedPlace('all');
              }}
            ></Button>
            {places.map((place) => (
              <Button
                key={place.id}
                label={`#${place.name}`}
                btnType={`${
                  Number(selectedPlace) === place.id ? 'active' : 'normal'
                }`}
                btnSize="medium"
                onClick={() => {
                  setSelectedPlace(place.id.toString());
                }}
              />
            ))}
          </div>
        </div>
      </Board>
      <div className="mt-20">
        {filteredLocks.map((lock) => (
          <ListCard
            key={v4()}
            tag={`#${
              PLACES.find((place) => place.id === lock.background)?.name
            }`}
            title={lock.title}
            imageSrc={LOCKS.find((v) => v.lockType === lock.lockType)?.imageSrc}
            onClick={() => {
              router.push(
                {
                  pathname: '/lock/detail',
                  query: {
                    hash: lock.hash,
                  },
                },
                '/lock/detail'
              );
            }}
          />
        ))}
      </div>
    </>
  );
};
export default Collection;
