import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {AbiItem} from 'web3-utils'

import { getLocksByBackground, setLocker } from '../../api/lock';
import Board from '../../components/common/Board';
import Button from '../../components/common/Button';
import { LockProps } from '../../components/place/Lock';
import places from '../../constant/places';
import { ABI } from '../../contract/ABI';
import { Bytecode } from '../../contract/Bytecode';
import Web3 from 'web3';
const DynamicContainer = dynamic(
  () => import('../../components/place/DynamicContainer'),
  { ssr: false }
);

const Lock: NextPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [draggableLock, setDraggableLock] = useState<LockProps>();

  const router = useRouter();
  const [locks, setLocks] = useState([]);

  const onAction = async (locationX: number, locationY: number) => {
    const {content,title,image}=router.query;
    console.log(content, title, image, router);    
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://43.200.253.174:3000')
    );
    const Contract = await new web3.eth.Contract(ABI as AbiItem[]);
    // DB에 저장된 사용자의 privateKey를 적용
    web3.eth.accounts.wallet.add("0xc3358af8becbab80cd6e3c6b2425368a6b6ac8f4aa8807e73ca1fd62347f39b5");
    const deploy = Contract.deploy({
      data : '0x' + Bytecode.object
  // 사용자의 address값을 from에 적용
  }).send({
          from : "0xa6Af487111486Af3FEeEa15631EFaB3168801273",
          gas: 1000000,
          gasPrice : "1000000000"
      }, (err, transactionHash) =>{
          console.info('transactionHash', transactionHash);
      }).on('error', (error)=>{
          console.info('error', error);
      }).on('transactionHash', (transactionHash) =>{
          console.info('transactionHash', transactionHash);
      }).on('receipt', async (receipt) =>{
          console.info('receipt', receipt);
          const startContract = new web3.eth.Contract(ABI as AbiItem[], receipt.contractAddress);
          console.log("1", startContract);
          const res = await startContract.methods.store(image, title, content).send({
            // 사용자의 address값을 from에 적용
            from : "0xa6Af487111486Af3FEeEa15631EFaB3168801273",
            gas: 1000000,
            gasPrice : "1000000000" 
          });
          console.log("2", res)
          // 현재 사용자 address retrieve를 통해 url, title, content를 0, 1, 2로 확인
          const res1 = await startContract.methods.retrieve().call({from : "0xa6Af487111486Af3FEeEa15631EFaB3168801273" });
          console.log(res1);
        })
    // todo : web3js로 자물쇠 걸고 해쉬값받아서 API요청
    const lockerHash = 'temp';
    const res = await setLocker({
      background: selectedPlace,
      lockType: draggableLock?.lockType,
      locationX,
      locationY,
      lockerHash,
    });
    console.log(res);
  };
  // 내용 불러오기 테스트
  const test=async()=>{
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://43.200.253.174:3000')
    );
    const startContract = new web3.eth.Contract(ABI as AbiItem[], "0x0A2bfB91bA9904E633C1704Ef785063Bac00dB5E");
    // 받는 사람 지갑 address
    const res1 = await startContract.methods.retrieve().call({from : "0xb284A2af5385E18Ead9E6cf13B33D179ed1CB258" });
    console.log(res1);
  }
  useEffect(() => {
    const fetch = async () => {
      const res = await getLocksByBackground(selectedPlace);
      console.log(res.data);
      setLocks(res.data);
    };
    fetch();
  }, [selectedPlace]);

  useEffect(() => {
    if (!router.isReady) return;
    if (Object.keys(router.query).length === 0) {
      alert('잘못된 접근입니다.');
      router.push('/');
      return;
    }
    setDraggableLock({
      lockType: Number(router.query.lockType),
      locationY: 50,
      locationX: 50,
    });
    console.log(router.query);
  }, [router]);

  return (
    <>
      <Head>
        <title>자물쇠 걸기</title>
        <meta name="description" content="자물쇠 걸기" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className="text-center font-custom font-bold text-lg text-black mb-12">
        <h1>자물쇠 걸기</h1>
      </div>
      <Board>
        <div className="flex mb-4 w-full h-12 items-center text-xl font-bold justify-center">
          <label htmlFor="title" className="w-16 mr-4">
            위치
          </label>
          <div className="justify-self-start">
            {places.map((place) => (
              <Button
                key={place.id}
                label={`#${place.name}`}
                btnType={`${selectedPlace === place.id ? 'active' : 'normal'}`}
                btnSize="medium"
                onClick={() => {
                  setSelectedPlace(place.id);
                }}
              />
            ))}
          </div>
        </div>
      </Board>
      <DynamicContainer
        bgHeight={places[selectedPlace].height}
        bgWidth={places[selectedPlace].width}
        locks={locks}
        locksOpacity={70}
        draggableLock={draggableLock}
        placeId={selectedPlace}
        onAction={onAction}
      />
      <div className="flex justify-center content-center mt-12">
        <Button label="취소" btnType="normal" btnSize="medium" onClick={test}></Button>
        <Button label="걸기" btnType="active" btnSize="medium"></Button>
      </div>
    </>
  );
};
export default Lock;
