import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';
import { emailduplicate, nicknameduplicate, signup } from '../../api/auth';
import { createWallet } from '../../api/wallet';
import { requestEth } from '../../api/wallet';
import Link from 'next/link';
import Web3 from 'web3';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/states';
import { normalize } from 'path';

async function createUser(
  email: string,
  password: string,
  name: string,
  nickname: string
): Promise<any> {
  const response = await signup({ email, password, name, nickname });
}

const Signup: NextPage = ({}) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordCkInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [user, setUserstate] = useRecoilState(userState);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isEmailDpError, setIsEmailDpError] = useState(true);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordCkError, setIsPasswordCkError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [isNicknameDpError, setIsNicknameDpError] = useState(true);

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value || '';
    const enteredPassword = passwordInputRef.current?.value || '';
    const enteredPasswordCk = passwordCkInputRef.current?.value || '';
    const enteredName = nameInputRef.current?.value || '';
    const enteredNickname = nicknameInputRef.current?.value || '';

    if (isEmailError || enteredEmail.trim() === '') {
      alert('유효한 형식의 이메일을 입력해주세요.');
      if (emailInputRef.current) emailInputRef.current.focus();
      return;
    }
    if (isEmailDpError) {
      alert('이메일 중복 여부를 확인해주세요.');
      if (emailInputRef.current) emailInputRef.current.focus();
      return;
    }
    if (isPasswordError || enteredPassword.trim() === '') {
      alert('유효한 형식의 비밀번호를 입력해주세요.');
      return;
    }
    if (isPasswordCkError || enteredPasswordCk.trim() === '') {
      alert('비밀번호를 다시 확인해주세요.');
      return;
    }
    if (isNameError || enteredName.trim() === '') {
      alert('유효한 형식의 이름을 입력해주세요.');
      return;
    }
    if (isNicknameError || enteredNickname.trim() === '') {
      alert('유효한 형식의 닉네임을 입력해주세요.');
      return;
    }
    if (isNicknameDpError) {
      alert('닉네임 중복 여부를 확인해주세요.');
      return;
    }
    try {
      const response = await createUser(
        enteredEmail,
        enteredPassword,
        enteredName,
        enteredNickname
      );

      const web3 = new Web3(
        new Web3.providers.HttpProvider(
          process.env.NEXT_PUBLIC_BLOCKCHAIN_URI || ''
        )
      );
      const account = await web3.eth.accounts.create();
      const res = await web3.eth.accounts.privateKeyToAccount(
        account.privateKey
      );
      await createWallet({
        email: enteredEmail,
        address: res.address,
        privateKey: res.privateKey,
      });
      requestEth(res.address);
      router.push('/auth/login');
    } catch (error) {
      alert('다시 시도해주세요.');
    }
  }

  async function checkHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    select: string
  ) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value || '';
    const enteredPassword = passwordInputRef.current?.value || '';
    const enteredPasswordCk = passwordCkInputRef.current?.value || '';
    const enteredName = nameInputRef.current?.value || '';
    const enteredNickname = nicknameInputRef.current?.value || '';

    switch (select) {
      case 'email':
        setIsEmailDpError(true);
        if (
          /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/.test(
            enteredEmail
          )
        ) {
          setIsEmailError(false);
        } else {
          setIsEmailError(true);
        }
        break;
      case 'password':
        if (
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/.test(
            enteredPassword
          )
        ) {
          setIsPasswordError(false);
        } else {
          setIsPasswordError(true);
        }
        break;
      case 'passwordCk':
        if (enteredPassword === enteredPasswordCk) {
          setIsPasswordCkError(false);
        } else {
          setIsPasswordCkError(true);
        }
        break;
      case 'name':
        if (/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/.test(enteredName)) {
          setIsNameError(false);
        } else {
          setIsNameError(true);
        }
        break;
      case 'nickname':
        setIsNicknameDpError(true);
        if (/^[a-zA-Zㄱ-힣0-9-_.]{2,8}$/.test(enteredNickname)) {
          setIsNicknameError(false);
        } else {
          setIsNicknameError(true);
        }
        break;
    }
  }

  async function emailDpHandler(event: React.MouseEvent) {
    const enteredEmail = emailInputRef.current?.value || '';
    event.preventDefault();
    if (isEmailError) {
      alert('이메일 유효성을 먼저 확인해주세요.');
      return;
    }
    const response = await emailduplicate({ email: enteredEmail });
    if (response.data) {
      setIsEmailDpError(false);
      alert('사용 가능한 이메일입니다.');
    } else {
      setIsEmailDpError(true);
      alert('이미 가입된 이메일입니다.');
    }
  }

  async function nicknameDpHandler(event: React.MouseEvent) {
    const enteredNickname = nicknameInputRef.current?.value || '';
    event.preventDefault();
    if (isNameError) {
      alert('닉네임 유효성을 먼저 확인해주세요.');
      return;
    }
    const response = await nicknameduplicate({ nickname: enteredNickname });
    if (response.data) {
      setIsNicknameDpError(false);
      alert('사용 가능한 닉네임입니다.');
    } else {
      setIsNicknameDpError(true);
      alert('사용중인 닉네임입니다.');
    }
  }

  return (
    <>
      <Head>
        <title>회원가입</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <main>
        <div className="text-center font-custom font-bold text-lg text-black mb-12">
          회원가입
        </div>
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-center items-center"
        >
          <div className="pr-12">
            <div className="flex flex-row">
              <FormInput
                label="이메일"
                id="email"
                isError={isEmailError}
                errMsg="* 유효한 형식의 이메일을 입력해주세요."
                onChange={(e) => checkHandler(e, 'email')}
                ref={emailInputRef}
              ></FormInput>
              <Button
                label="중복 확인"
                btnType="normal"
                btnSize="medium"
                customstyle="mt-1"
                type="button"
                onClick={emailDpHandler}
              ></Button>
            </div>
            <div className="flex flex-row">
              <FormInput
                label="비밀번호"
                id="password"
                type="password"
                isError={isPasswordError}
                errMsg="* 영문자, 숫자, 특수문자 조합 8글자 이상"
                onChange={(e) => checkHandler(e, 'password')}
                ref={passwordInputRef}
              ></FormInput>
              <div className="w-24 h-10 m-2"></div>
            </div>
            <div className="flex flex-row">
              <FormInput
                label="비밀번호 확인"
                id="passwordCk"
                type="password"
                isError={isPasswordCkError}
                errMsg="* 비밀번호를 다시 확인해주세요."
                onChange={(e) => checkHandler(e, 'passwordCk')}
                ref={passwordCkInputRef}
              ></FormInput>
              <div className="w-24 h-10 m-2"></div>
            </div>
            <div className="flex flex-row">
              <FormInput
                label="이름"
                id="name"
                isError={isNameError}
                errMsg="* 2글자 이상의 한글을 입력해주세요."
                onChange={(e) => checkHandler(e, 'name')}
                ref={nameInputRef}
              ></FormInput>
              <div className="w-24 h-10 m-2"></div>
            </div>
            <div className="flex flex-row">
              <FormInput
                label="닉네임"
                id="nickname"
                isError={isNicknameError}
                errMsg="* 2~8글자의 닉네임을 입력해주세요."
                onChange={(e) => checkHandler(e, 'nickname')}
                ref={nicknameInputRef}
              ></FormInput>
              <Button
                label="중복 확인"
                btnType="normal"
                btnSize="medium"
                customstyle="mt-1"
                type="button"
                onClick={nicknameDpHandler}
              ></Button>
            </div>
          </div>
          <div className="flex justify-center content-center">
            <Link href="/auth/login">
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

export default Signup;
