import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { ModifyPassword } from '../../api/auth';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import Title from '../../components/common/Title';

const ResetPw: NextPage = ({}) => {
  // const currentPwInputRef = useRef<HTMLInputElement>(null);
  const resetPwInputRef = useRef<HTMLInputElement>(null);
  const resetPwCkInputRef = useRef<HTMLInputElement>(null);

  // const [isCurrentPwError, setIsCurrentPwError] = useState(false);
  const [isResetPwError, setIsResetPwError] = useState(false);
  const [isResetPwCkError, setIsResetPwCkError] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    if (Object.keys(router.query).length === 0) {
      alert('잘못된 접근입니다.');
      router.push('/');
      return;
    }
  }, [router]);

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    const enteredResetPw = resetPwInputRef.current?.value || '';
    const enteredResetPwCk = resetPwCkInputRef.current?.value || '';

    if (isResetPwError || enteredResetPw.trim() === '') {
      alert('유효한 형식의 비밀번호를 입력해주세요.');
      return;
    }
    if (isResetPwCkError || enteredResetPwCk.trim() === '') {
      alert('입력한 비밀번호가 다릅니다. 다시 확인해주세요.');
      return;
    }
    const response = await ModifyPassword({ new_password: enteredResetPw });
    try {
      if (response.data === '비밀번호 수정완료') {
        router.push('/user/mypage');
      } else {
        alert('다시 확인해주세요.');
      }
    } catch (error) {
      alert('다시 시도해주세요.');
    }
  }

  async function checkHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    select: string
  ) {
    event.preventDefault();
    const enteredResetPw = resetPwInputRef.current?.value || '';
    const enteredResetPwCk = resetPwCkInputRef.current?.value || '';
    switch (select) {
      case 'resetpw':
        if (
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/.test(
            enteredResetPw
          )
        ) {
          setIsResetPwError(false);
        } else {
          setIsResetPwError(true);
        }
        break;
      case 'resetpwCk':
        if (enteredResetPw === enteredResetPwCk) {
          setIsResetPwCkError(false);
        } else {
          setIsResetPwCkError(true);
        }
        break;
    }
  }
  return (
    <>
      <Head>
        <title>비밀번호 수정</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main>
        <Title>비밀번호 수정</Title>
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-center items-center"
        >
          <div>
            {/* <FormInput
              label="현재 비밀번호"
              id="currentpw"
              type="password"
              ref={currentPwInputRef}
            ></FormInput> */}
            <FormInput
              label="변경할 비밀번호"
              id="resetpw"
              type="password"
              isError={isResetPwError}
              errMsg="* 영문자, 숫자, 특수문자 조합 8글자 이상"
              onChange={(e) => checkHandler(e, 'resetpw')}
              ref={resetPwInputRef}
            ></FormInput>
            <FormInput
              label="비밀번호 확인"
              id="resetpwCk"
              type="password"
              isError={isResetPwCkError}
              errMsg="* 비밀번호를 다시 확인해주세요."
              onChange={(e) => checkHandler(e, 'resetpwCk')}
              ref={resetPwCkInputRef}
            ></FormInput>
          </div>
          <div className="flex justify-center content-center">
            <Link href="/user/mypage">
              <Button
                label="취소"
                btnType="normal"
                btnSize="medium"
                type="button"
              ></Button>
            </Link>
            <Button
              label="확인"
              btnType="active"
              btnSize="medium"
              type="submit"
            ></Button>
          </div>
        </form>
      </main>
    </>
  );
};

export default ResetPw;
