import API from './index';

export const login = async (params: { email: string; password: string }) => {
  const res = await API.get('/auth/login', { params });
  return res;
};

export const signup = async (body: {
  email: string;
  password: string;
  name: string;
  nickname: string;
}) => {
  const res = await API.post('/auth/signup', body);
  return res;
};

export const logout = async () => {
  try {
    const res = await API.delete('/auth/logout');
    return res;
  } catch (err) {
    throw err;
  }
};

export const refresh = async (body: { refreshToken: string }) => {
  try {
    const res = await API.post('/token/refresh', body);
    return res.data;
  } catch (err) {
    throw err;
  }
};
