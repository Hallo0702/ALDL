import API from './index';

export const createWallet = async (body: { email: string; address: string; privateKey: string }) => {
    const res = await API.post('/wallet/create', body );
    return res;
  };

export const requestEth = async (address: string) => {
  const res = await API.put(`/wallet/requestEth/${address}` );
  return res;
};

export const myEth = async (address:string) => {
  const res = await API.get(`/wallet/myEth?address=${address}`);
  return res;
};