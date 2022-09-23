import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import Board from '../../components/common/Board';
import Button from '../../components/common/Button';

const Create = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState('');

  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>자물쇠 등록</title>
        <meta name="description" content="자물쇠 등록" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className="text-center font-custom font-bold text-lg text-black mb-12">
        <h1>자물쇠 등록</h1>
      </div>
      <Board>
        <div className="flex mb-4 w-full h-12 items-center text-xl font-bold">
          <label htmlFor="title" className="w-16 mr-4">
            제목*
          </label>
          <input
            type="text"
            id="title"
            className="w-full border border-black rounded-lg h-full p-4"
          />
        </div>
        <div className="flex mb-4 w-full h-48 items-center text-xl font-bold">
          <label htmlFor="content" className="w-16 mr-4 self-start">
            내용*
          </label>
          <textarea
            id="content"
            className="w-full border border-black rounded-lg resize-none h-48 p-4"
          />
        </div>
        <div className="flex items-end gap-10">
          <div className="w-96 h-32 relative ml-20">
            <Image
              src="/images/upload.png"
              alt="메인 배경 이미지"
              layout="fill"
              objectFit="fill"
              objectPosition="center"
            />
          </div>
          <input
            ref={fileRef}
            name="file"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
          />
          <Button
            label="Browse"
            btnType="dark"
            btnSize="large"
            onClick={() => {
              if (fileRef.current) fileRef.current.click();
            }}
          ></Button>
        </div>

        {/* todo : 자물쇠 선택 */}
      </Board>
      <div className="flex justify-center content-center mt-12">
        <Button label="취소" btnType="normal" btnSize="medium"></Button>
        <Button label="등록" btnType="active" btnSize="medium"></Button>
      </div>
    </>
  );
};
export default Create;
