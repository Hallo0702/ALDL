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

export const uploadImage = async (formData: FormData) => {
  const res = await API.post('/upload', formData);
  return res;
};

export const getLocksByBackground = async (background: number) => {
  const res = await API.get(`/backgroundlocker?background=${background}`);
  return res;
};

export const setLocker = async (body: {
  background: number;
  lockType?: number;
  locationX: number;
  locationY: number;
  lockerHash: string;
}) => {
  const res = await API.post('/setlocker', body);
  return res;
};

export const saveLocker = async (lockerHash: string) => {
  const res = await API.post('/savelocker', { lockerHash });
  return res;
};

export const getMyLockers = async () => {
  const res = await API.get('/mylockers');
  return res;
};
