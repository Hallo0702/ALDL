import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { sendModifyPasswordMail } from '../../api/auth';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import Title from '../../components/common/Title';
import { userState } from '../../store/states';

const FindPw: NextPage = ({}) => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [user, setUserstate] = useRecoilState(userState);
  const router = useRouter();

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value || '';

    if (enteredEmail.trim().length === 0) {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (!user.isLogined) {
      const response = await sendModifyPasswordMail({ email: enteredEmail });
      if (response.data === '이메일전송완료') {
        alert(
          '입력하신 이메일로 임시 비밀번호가 전송되었습니다. 확인 후 로그인해주세요.'
        );
        router.push('/auth/login');
      } else {
        alert('존재하지 않는 회원입니다. 다시 확인해주세요.');
      }
    } else {
      alert('이미 로그인된 상태입니다. 메인 페이지로 이동합니다.');
      router.push('/');
      return;
    }
  }

  return (
    <>
      <Head>
        <title>비밀번호 찾기</title>
        <meta name="description" content="비밀번호 찾기" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main>
        <Title>비밀번호 찾기</Title>
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-center items-center"
        >
          <div className="pr-36">
            <FormInput
              label="이메일"
              id="email"
              ref={emailInputRef}
            ></FormInput>
          </div>
          <div className="flex justify-center content-center">
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

export default FindPw;
