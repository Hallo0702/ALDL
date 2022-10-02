import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Board from '../../components/common/Board';
import { retrieve } from '../../utils/contract';

interface data {
  imageSrc: string;
  title: string;
  content: string;
  background: number;
  lockType: number;
}

const Detail: NextPage = ({}) => {
  const router = useRouter();
  const [data, setData] = useState<data>();
  useEffect(() => {
    const hash = router.query.hash;
    const fetch = async () => {
      if (typeof hash === 'string') {
        const data = await retrieve(hash);
        setData(data);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <Head>
        <title>자물쇠 상세보기</title>
        <meta name="description" content="자물쇠 상세보기" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className="text-center font-custom font-bold text-lg text-black mb-12">
        <h1>자물쇠 상세보기</h1>
      </div>
      <Board>
        <div className="flex flex-col gap-8">
          <div className="flex w-full h-12 items-center text-xl font-bold">
            <label htmlFor="title" className="w-16 mr-4">
              제목
            </label>
            <div
              id="title"
              className="w-full border border-black rounded-lg h-full py-2 px-4 font-medium"
            >
              {data?.title}
            </div>
          </div>
          <div className="flex w-full min-h-48 h-auto text-xl font-bold">
            <label htmlFor="content" className="w-16 mr-4 self-start">
              내용
            </label>
            <div
              id="content"
              className="w-full border border-black rounded-lg  p-4 font-medium"
            >
              {data?.imageSrc && (
                <img
                  src={`${data?.imageSrc}`}
                  className="max-w-[50%] ml-8 float-right"
                  alt="부산"
                />
              )}
              {data?.content}
            </div>
          </div>
          <div className="flex w-full items-center text-xl font-bold">
            <label htmlFor="address" className="w-16 mr-4 self-start">
              주소
            </label>
            <p>{router.query.hash}</p>
          </div>
        </div>
      </Board>
    </>
  );
};
export default Detail;
