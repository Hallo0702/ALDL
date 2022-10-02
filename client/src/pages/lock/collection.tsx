import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { v4 } from 'uuid';

import { userState } from '../../store/states';
import { getMyLockers, saveLocker } from '../../api/lock';
import Board from '../../components/common/Board';
import Button from '../../components/common/Button';
import ListCard from '../../components/common/ListCard';
import places from '../../constant/places';
import { useRouter } from 'next/router';
import { retrieve } from '../../utils/contract';
import LOCKS from '../../constant/locks';
import { AxiosError } from 'axios';

interface lock {
  imageSrc: string;
  title: string;
  content: string;
  background: number;
  lockType: number;
}

const Collection: NextPage = ({}) => {
  const [user, setUserstate] = useRecoilState(userState);
  const [selectedPlace, setSelectedPlace] = useState('all');
  const [toAddLockerHash, setToAddLokcerHash] = useState('');
  const [locks, setLocks] = useState<lock[]>([]);
  const [filteredLocks, setFilteredLocks] = useState<lock[]>([]);
  const [lockHashs, setLockHashs] = useState<string[]>([]);
  const router = useRouter();

  const saveLockerHandler = async () => {
    if (!toAddLockerHash) return;
    try {
      const res = await saveLocker(toAddLockerHash);
      setLockHashs((prev) => [...prev, toAddLockerHash]);
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
      setLockHashs(res.data);
    };
    fetchLockHashs();
  }, []);

  useEffect(() => {
    const fetchLock = async (hash: string) => {
      const lock = await retrieve(hash);
      setLocks((prev) => [...prev, lock]);
    };
    lockHashs.forEach((lockHash) => {
      fetchLock(lockHash);
    });
  }, [lockHashs]);

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
      <div className="text-center font-custom font-bold text-lg text-black mb-12">
        <h1>자물쇠 모아보기</h1>
      </div>
      <div className="flex items-start justify-center gap-20  font-bold mb-20">
        <h2 className="font-bold file:placeholder:text-lg pt-2">자물쇠 추가</h2>
        <div>
          <input
            type="text"
            className="w-96 h-10 rounded-full border-black border-2 p-4"
            value={toAddLockerHash}
            onChange={(e) => {
              setToAddLokcerHash(e.target.value);
            }}
          />
          <p className="text-center py-2 font-medium">
            공유받은 자물쇠 주소를 입력해주세요
          </p>
        </div>
        <Button
          label="추가"
          btnType="dark"
          btnSize="medium"
          customstyle="mt-0"
          onClick={saveLockerHandler}
        ></Button>
      </div>
      <Board>
        <div className="flex mb-4 w-full h-12 items-center text-xl font-bold justify-center">
          <label htmlFor="title" className="w-16 mr-4">
            위치
          </label>
          <div className="justify-self-start">
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
            tag={`#${lock.background}`}
            title={lock.title}
            imageSrc={LOCKS.find((v) => v.lockType === lock.lockType)?.imageSrc}
          />
        ))}
      </div>
    </>
  );
};
export default Collection;
