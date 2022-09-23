import Head from 'next/head';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { createLock } from '../../api/lock';

import Board from '../../components/common/Board';
import Button from '../../components/common/Button';

interface FormState {
  title: string;
  content: string;
  image: File | null;
  lock_design: number;
}
const Create = () => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    content: '',
    image: null,
    lock_design: 1,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const files = input.files;
      setFormState((prev) => ({ ...prev, image: files[0] }));
    }
  };

  const onCreateHandler = () => {
    createLock(formState);
  };
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
        <div className="flex flex-col gap-8">
          <div className="flex w-full h-12 items-center text-xl font-bold">
            <label htmlFor="title" className="w-16 mr-4">
              제목*
            </label>
            <input
              type="text"
              id="title"
              className="w-full border border-black rounded-lg h-full p-4"
              value={formState.title}
              onChange={(e) => {
                setFormState((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </div>
          <div className="flex w-full h-48 items-center text-xl font-bold">
            <label htmlFor="content" className="w-16 mr-4 self-start">
              내용*
            </label>
            <textarea
              id="content"
              className="w-full border border-black rounded-lg resize-none h-48 p-4"
              value={formState.content}
              onChange={(e) => {
                setFormState((prev) => ({ ...prev, content: e.target.value }));
              }}
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
              onChange={onImageChange}
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
        </div>
      </Board>
      <div className="flex justify-center content-center mt-12">
        <Button label="취소" btnType="normal" btnSize="medium"></Button>
        <Button
          label="등록"
          btnType="active"
          btnSize="medium"
          onClick={onCreateHandler}
        ></Button>
      </div>
    </>
  );
};
export default Create;
