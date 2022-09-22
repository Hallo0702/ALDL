import type { NextPage } from 'next';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Board from '../components/common/Board';
import ListCard from '../components/common/ListCard';

const Dummy: NextPage = ({}) => {
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          'https://aldl.kro.kr/api/emailduplicate?email=asfasd'
        );
        console.log(res);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(err.response?.data);
        }
      }
    };
    fetch();
  }, []);
  return (
    <>
      <div className="font-custom font-light text-xs">
        font-custom font-light text-xs 폰트
      </div>
      <div className="font-custom font-medium text-sm">
        font-custom font-medium text-sm 폰트
      </div>
      <div className="font-custom font-regular text-base">
        font-custom font-regular text-base 폰트
      </div>
      <div className="font-custom font-bold text-lg">
        font-custom font-bold text-lg 폰트
      </div>
      <div className="font-custom font-regular text-lg">
        font-custom font-regular text-lg 폰트
      </div>
      <div className="font-custom font-regular text-xl">
        font-custom font-regular text-xl 폰트
      </div>
      <div className="font-custom font-regular text-2xl">
        font-custom font-regular text-2xl 폰트
      </div>
      <div className="font-custom font-regular text-3xl">
        font-custom font-regular text-3xl 폰트
      </div>
      <div className="font-custom font-light text-4xl">
        font-custom font-light text-4xl 폰트
      </div>
      <div className="font-custom font-regular text-4xl">
        font-custom font-regular text-4xl 폰트
      </div>
      <div className="font-custom font-medium text-4xl">
        font-custom font-medium text-4xl 폰트
      </div>
      <div className="font-custom font-bold text-4xl">
        font-custom font-bold text-4xl 스포카 한 산스 네오
      </div>

      <div className="bg-peach w-40 h-40">
        <div className="text-gray-light">asdasfasd</div>
        <div className="text-gray-normal">asdasfasd</div>
        <div className="text-gray">asdasfasd</div>
        <div className="text-gray-dark">asdasfasd</div>
      </div>
      <div className="bg-peach w-40 h-80">
        <div className="text-gray-light">asdasfasd</div>
        <div className="text-gray-normal">asdasfasd</div>
        <div className="text-gray">asdasfasd</div>
        <div className="text-gray-dark">asdasfasd</div>
      </div>
      <form className="flex flex-col justify-center items-center">
        <FormInput
          label="비밀번호 확인"
          id="test"
          isError
          errMsg="* 올바른 이메일 형식을 확인하세요."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <FormInput
          label="test"
          id="test"
          isError
          errMsg="* 중복된 별명입니다."
        />
        <FormInput
          label="test"
          id="test"
          // isError
          errMsg="* 올바른 이메일 형식을 확인하세요."
        />
        <FormInput
          label="test"
          id="test"
          // isError
          errMsg="* 올바른 이메일 형식을 확인하세요."
          type="password"
        />
      </form>
      <span>{inputValue}</span>

      <Button label="복사" btnType="dark" btnSize="small"></Button>
      <Button label="취소" btnType="normal" btnSize="medium"></Button>
      <Button label="자물쇠 등록" btnType="active" btnSize="large"></Button>

      <Button label="취소" btnType="normal" btnSize="midium"></Button>
      <Button label="자물쇠 등록" btnType="active" btnSize="large"></Button>
      <Board>
        <div>asdasd</div>
      </Board>
      <ListCard
        tag="#광주"
        title="
        긴 제목입니다.
        긴 제목입니다.
        긴 제목입니다.
        긴 제목입니다.
        긴 제목입니다.
        긴 제목입니다.
        긴 제목입니다.
        "
        content="
        아무 내용없는 긴내용입니다.아무 내용없는 긴내용입니다.아무 내용없는 긴내용입니다.아무 내용없는 긴내용입니다.아무 내용없는 긴내용입니다.아무 내용없는 긴내용입니다.
        아무 내용없는 긴내용입니다.아무 내용없는 긴내용입니다.아무 내용없는 긴내용입니다.아무 내용없는 긴내용입니다.아무 내용없는 긴내용입니다.아무 내용없는 긴내용입니다.
        "
      />
    </>
  );
};
export default Dummy;
