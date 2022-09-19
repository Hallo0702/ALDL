import type { NextPage } from 'next';
import axios from 'axios';
import { useEffect } from 'react';

const Dummy: NextPage = ({}) => {
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
    </>
  );
};
export default Dummy;
