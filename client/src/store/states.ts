import { atom } from 'recoil';

interface UserTypes {
  isLogined: boolean;
  address: string;
  privateKey: string;
}

export const userState = atom<UserTypes>({
  key: 'userState',
  default: { isLogined: false, address: '', privateKey: '' },
});
