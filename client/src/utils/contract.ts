import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { ABI } from '../contract/ABI';
import { Bytecode } from '../contract/Bytecode';
import Crypto from 'crypto-js';

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_BLOCKCHAIN_URI || '')
);

export const retrieve = async (hash: string) => {
  const contract = new web3.eth.Contract(ABI as AbiItem[], hash);
  const res = await contract.methods.retrieve().call();
  const {
    0: encImageSrc,
    1: title,
    2: content,
    3: background,
    4: lockType,
  } = res;
  const AESprivateKey = 'JUpViFIyRMB4NsMvwEFlmowYLa6N9UCb';
  const bytes = Crypto.AES.decrypt(encImageSrc, AESprivateKey);
  const imageSrc = Crypto.enc.Utf8.stringify(bytes);
  return {
    imageSrc,
    title,
    content,
    background: Number(background),
    lockType: Number(lockType),
  };
};

export const store = async (
  privateKey: string,
  walletAddres: string,
  data: {
    imageSrc: string;
    title: string;
    content: string;
    background: number | undefined;
    lockType: number | undefined;
  }
): Promise<any> => {
  const contract = new web3.eth.Contract(ABI as AbiItem[]);
  const AESprivateKey = 'JUpViFIyRMB4NsMvwEFlmowYLa6N9UCb';
  const bytes = Crypto.AES.decrypt(privateKey, AESprivateKey);
  const decrypted = Crypto.enc.Utf8.stringify(bytes);
  const encryptImageSrc = Crypto.AES.encrypt(
    data.imageSrc,
    AESprivateKey
  ).toString();
  web3.eth.accounts.wallet.add(decrypted);
  return new Promise<any>((resolve) => {
    contract
      .deploy({
        data: '0x' + Bytecode.object,
      })
      .send(
        {
          from: walletAddres,
          gas: 1000000,
          gasPrice: '1000000000',
        },
        (err, transactionHash) => {
          console.log('err', err);
          console.info('transactionHash', transactionHash);
        }
      )
      .on('error', (error) => {
        console.info('error', error);
      })
      .on('receipt', async (receipt) => {
        const startContract = new web3.eth.Contract(
          ABI as AbiItem[],
          receipt.contractAddress
        );
        const res: any = await startContract.methods
          .store(
            encryptImageSrc,
            data.title,
            data.content,
            data.background,
            data.lockType
          )
          .send({
            from: walletAddres,
            gas: 1000000,
            gasPrice: '1000000000',
          });

        resolve(res);
      });
  });
};
