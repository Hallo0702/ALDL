import API from './index';

export const createLock = async (body: {
  title: string;
  content: string;
  image: File | null;
  lock_design: number;
}) => {
  const res = await API.post('/locker/makelocker', body);
  return res;
};
