import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { ABI } from '../contract/ABI';
import { Bytecode } from '../contract/Bytecode';

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_BLOCKCHAIN_URI || '')
);

export const retrieve = async (hash: string) => {
  const contract = new web3.eth.Contract(ABI as AbiItem[], hash);
  const res = await contract.methods.retrieve().call();
  const { 0: imageSrc, 1: title, 2: content, 3: background, 4: lockType } = res;
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
    imageSrc: string | string[] | undefined;
    title: string | string[] | undefined;
    content: string | string[] | undefined;
    background: number | undefined;
    lockType: number | undefined;
  }
): Promise<any> => {
  const contract = new web3.eth.Contract(ABI as AbiItem[]);
  web3.eth.accounts.wallet.add(privateKey);
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
          // console.info('transactionHash', transactionHash);
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
            data.imageSrc,
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
