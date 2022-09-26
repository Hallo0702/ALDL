import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Board from '../../components/common/Board';
import Button from '../../components/common/Button';

const DynamicContainer = dynamic(
  () => import('../../components/place/DynamicContainer'),
  { ssr: false }
);

const Lock: NextPage = () => {
  const locks = [
    { top: 0, left: 0 },
    { lockType: 'stripe', top: 15, left: 50 },
  ];

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
            <Button label="#서울" btnType="active" btnSize="medium"></Button>
            <Button label="#광주" btnType="normal" btnSize="medium"></Button>
            <Button label="#대전" btnType="normal" btnSize="medium"></Button>
            <Button label="#구미" btnType="normal" btnSize="medium"></Button>
            <Button label="#부울경" btnType="normal" btnSize="medium"></Button>
          </div>
        </div>
      </Board>
      <DynamicContainer bgHeight={2000} bgWidth={3000} locks={locks} />
      <div className="flex justify-center content-center mt-12">
        <Button label="취소" btnType="normal" btnSize="medium"></Button>
        <Button label="걸기" btnType="active" btnSize="medium"></Button>
      </div>
    </>
  );
};
export default Lock;
