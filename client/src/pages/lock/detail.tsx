import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import { userState } from '../../store/states';
import Board from '../../components/common/Board';
import { retrieve } from '../../utils/contract';
import Button from '../../components/common/Button';

interface data {
  imageSrc: string;
  title: string;
  content: string;
  background: number;
  lockType: number;
}

const Detail: NextPage = ({}) => {
  const router = useRouter();
  const [user, setUserstate] = useRecoilState(userState);
  const [data, setData] = useState<data>();

  const copy = () => {
    const $textarea = document.createElement('textarea');
    document.body.appendChild($textarea);
    if (typeof router.query.hash === 'string')
      $textarea.value = router.query.hash;
    $textarea.select();
    document.execCommand('copy');
    document.body.removeChild($textarea);
    alert('주소가 복사되었습니다.');
  };

  useEffect(() => {
    const hash = router.query.hash;
    if (!user.isLogined) {
      alert('로그인이 필요한 페이지입니다.');
      router.push('/auth/login');
      return;
    }
    if (!hash) {
      alert('잘못된 접근입니다.');
      router.push('/');
      return;
    }
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
          <div className="flex w-full text-xl font-bold items-center">
            <label htmlFor="address" className="w-16 mr-4">
              주소
            </label>
            <p>{router.query.hash}</p>
            <Button
              btnSize="medium"
              btnType="dark"
              label="복사"
              onClick={copy}
            ></Button>
          </div>
        </div>
      </Board>
    </>
  );
};
export default Detail;
