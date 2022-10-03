import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { userState } from '../../store/states';
import { uploadImage } from '../../api/lock';
import Board from '../../components/common/Board';
import Button from '../../components/common/Button';
import LockSvg from '../../components/common/LockSvg';
import locks from '../../constant/locks';

interface FormState {
  title: string;
  content: string;
  image: File | null;
  lockType: number;
}
const Create = () => {
  const [user, setUserstate] = useRecoilState(userState);
  const [dragOver, setDragOver] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    title: '',
    content: '',
    image: null,
    lockType: 0,
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      if (e.dataTransfer.items.length !== 1) {
        alert('한개의 파일만 업로드해주세요.');
        return;
      }
      if (e.dataTransfer.items[0].kind !== 'file') {
        alert('올바른 이미지를 업로드해주세요.');
        return;
      }
      const file = e.dataTransfer.items[0].getAsFile();
      if (file.type.indexOf('image') >= 0) {
        setFormState((prev) => ({ ...prev, image: file }));
      }
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const files = input.files;
      setFormState((prev) => ({ ...prev, image: files[0] }));
    }
  };

  const onLockClickHandler = (e: React.MouseEvent) => {
    if (e.currentTarget) {
      const lockType = Number(e.currentTarget.getAttribute('data-key'));
      setFormState((prev) => ({
        ...prev,
        lockType: lockType,
      }));
    }
  };

  const onCreateHandler = async () => {
    if (!formState.title) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!formState.content) {
      alert('내용을 입력해주세요.');
      return;
    }
    const formData = new FormData();
    try {
      if (formState.image) {
        formData.append('image', formState.image);
        const res = await uploadImage(formData);
        if (res && res.data) {
          const imageUrl = res.data;
          router.push(
            {
              pathname: '/lock/lock',
              query: {
                title: formState.title,
                content: formState.content,
                lockType: formState.lockType,
                image: imageUrl,
              },
            },
            '/lock/lock'
          );
        }
      } else {
        router.push(
          {
            pathname: '/lock/lock',
            query: {
              title: formState.title,
              content: formState.content,
              lockType: formState.lockType,
              image: '',
            },
          },
          '/lock/lock'
        );
      }
    } catch (err) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };
  useEffect(() => {
    if (!user.isLogined) {
      alert('로그인이 필요한 페이지입니다.');
      router.push('/auth/login');
      return;
    }
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
            <div
              className="w-96 h-32 relative ml-20"
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
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
            {formState.image && (
              <div>
                <span className="mb-2 font-medium">
                  {formState.image?.name}
                </span>
                <Button
                  label="삭제"
                  btnSize="small"
                  btnType="normal"
                  onClick={() =>
                    setFormState((prev) => ({ ...prev, image: null }))
                  }
                />
              </div>
            )}
            <Button
              label="Browse"
              btnType="dark"
              btnSize="large"
              onClick={() => {
                if (fileRef.current) fileRef.current.click();
              }}
            ></Button>
          </div>
          <div className="flex mb-4 w-full h-48 items-center text-xl font-bold">
            <label htmlFor="lock" className="w-20 self-start">
              자물쇠*
            </label>
            <div id="lock" className="flex gap-4 self-start">
              {locks.map((lock) => (
                <div
                  key={lock.lockType}
                  data-key={lock.lockType}
                  className={`w-32 h-32 relative ${
                    formState.lockType === lock.lockType
                      ? 'border-peach border-2'
                      : 'border-black border'
                  } cursor-pointer hover:border-peach`}
                  onClick={onLockClickHandler}
                >
                  <LockSvg
                    type={lock.lockType}
                    width="100%"
                    height="100%"
                  ></LockSvg>
                </div>
              ))}
            </div>
          </div>
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
