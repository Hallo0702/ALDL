import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import Board from '../../components/common/Board';
import Button from '../../components/common/Button';
import ListCard from '../../components/common/ListCard';
import places from '../../constant/places';

const Collection: NextPage = ({}) => {
  const [selectedPlace, setSelectedPlace] = useState('all');
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
        <ListCard
          tag="#광주"
          title="자물쇠 제목"
          content="자물쇠 내용"
          imageSrc=""
        ></ListCard>
        <ListCard
          tag="#광주"
          title="자물쇠 제목"
          content="자물쇠 내용"
          imageSrc=""
        ></ListCard>
        <ListCard
          tag="#광주"
          title="자물쇠 제목"
          content="자물쇠 내용"
          imageSrc=""
        ></ListCard>
      </div>
    </>
  );
};
export default Collection;
