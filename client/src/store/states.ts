import { atom } from 'recoil';

interface UserTypes {
  isLogined: boolean;
}

export const userState = atom<UserTypes>({
  key: 'userState',
  default: { isLogined: false },
});
